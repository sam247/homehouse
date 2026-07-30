#!/usr/bin/env python3
"""Update homehouse_seo July tab and create August tab."""

from __future__ import annotations

import json
import subprocess
import urllib.error
import urllib.parse
import urllib.request

SPREADSHEET_ID = "1hVYEI6mh6cusBFFEKjOuWCtiXexxqGUVaGyMF00KV_A"
JULY_SHEET_ID = 639682041


def token() -> str:
    return subprocess.check_output(
        ["gcloud", "auth", "print-access-token"], text=True
    ).strip()


def api(method: str, path: str, body: dict | None = None):
    url = f"https://sheets.googleapis.com/v4/spreadsheets/{SPREADSHEET_ID}{path}"
    data = None if body is None else json.dumps(body).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {token()}",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req) as resp:
            raw = resp.read().decode("utf-8")
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8")
        raise SystemExit(f"{method} {path} failed: {e.code}\n{detail}") from e


def values_update(range_a1: str, rows: list[list[str]], raw: bool = False):
    input_option = "RAW" if raw else "USER_ENTERED"
    encoded = urllib.parse.quote(range_a1)
    return api(
        "PUT",
        f"/values/{encoded}?valueInputOption={input_option}",
        {"range": range_a1, "majorDimension": "ROWS", "values": rows},
    )


def batch_update(requests: list[dict]):
    return api("POST", ":batchUpdate", {"requests": requests})


def get_meta(fields: str = "properties.title,sheets.properties(sheetId,title,index)"):
    encoded = urllib.parse.quote(fields, safe=",()")
    return api("GET", f"?fields={encoded}")


def close_july():
    # Refresh baseline + mark priority statuses Done / Monitor / Carried.
    values_update(
        "July!C3:K3",
        [
            [
                "Performance trend",
                "sc-domain:homehouse.org.uk",
                "CLOSE BASELINE 2026-07-02 to 2026-07-30: 31 clicks, 442 impressions. 14d (Jul 16-30): 12 clicks, 209 impressions. Home canonical 15/109 CTR 13.8% pos 24.4. /retreats 0/20 pos 15.6. /stays 0/14 pos 22.7. Spokes still 0 GSC page data. Legacy http://www still splits short-window reporting.",
                "Shorter windows still look stronger than the early baseline, and impressions grew vs the prior 30-day note, but clicks stayed flat and spokes are not yet visible.",
                "Trend stays positive and canonical URLs gain share vs legacy.",
                "S",
                "Closed",
                "Frozen 2026-07-30 after Pass 2-5 close-out",
            ]
        ],
    )

    status_updates = {
        # row: status, notes
        7: ("Done", "Redirects live; continue MoM legacy decay watch into August"),
        8: ("Done", "Pass 1 + Pass 3 H2 cleanup (Norfolk Retreats & Countryside Stays)"),
        9: ("Done", "Pass 2 spoke relatedLinks live 2026-07-30"),
        10: ("Done", "Pass 1 + Pass 3 metadata/FAQ differentiation"),
        11: ("Done", "30d review completed 2026-07-30; spokes still awaiting first impressions"),
        12: ("Done", "Markdown SEO posts now served via FS+Neon merge; no new thin pages"),
        15: ("Done", "Baseline refresh: 15 clicks / 109 impr / CTR 13.8% / pos 24.4"),
        16: ("Done", "Early visibility confirmed (0/20 pos 15.6); continue in August"),
        17: ("Done", "Early visibility confirmed (0/14 pos 22.7)"),
        18: ("Monitor", "Still no page-level GSC data"),
        19: ("Monitor", "Support role only"),
        35: ("Done", "14d check completed during July close-out"),
        36: ("Done", "30d baseline frozen 2026-07-30"),
        37: ("Carried", "Move full 60d page-group review into August cadence"),
        44: ("Done", "Pass 2-5 completed 2026-07-30; August tab owns next cycle"),
    }

    data = []
    for row, (status, notes) in status_updates.items():
        data.append(
            {
                "range": f"July!I{row}:J{row}",
                "majorDimension": "ROWS",
                "values": [[status, notes]],
            }
        )

    api(
        "POST",
        "/values:batchUpdate",
        {"valueInputOption": "USER_ENTERED", "data": data},
    )

    # Append Pass 2-5 implementation log under existing Pass 1 block.
    values_update(
        "July!A46:I54",
        [
            [],
            [
                "Pass 2-5 close-out",
                "Status",
                "Repo file",
                "What changed",
                "Why it matters",
                "Verification",
                "Date",
                "Notes",
            ],
            [
                "Spoke linking",
                "Done",
                "src/lib/retreatPages.ts + RetreatLandingPage.tsx",
                "Added relatedLinks on all four spokes with women's↔solo cross-links and hub/stays/events bridges.",
                "Helps spokes reinforce each other and improve discovery of the cluster.",
                "Playwright spoke cross-link assertions added.",
                "2026-07-30",
                "Pass 2 complete",
            ],
            [
                "Metadata review",
                "Done",
                "page.tsx / retreats / stays",
                "Replaced wellness H2; differentiated retreats and stays titles/descriptions; expanded retreat FAQ for norfolk retreats intent.",
                "Improves SERP differentiation and query alignment.",
                "Checklist Pass 3 marked done.",
                "2026-07-30",
                "Pass 3 complete",
            ],
            [
                "Support posts live",
                "Done",
                "src/lib/blog.ts + content/blog/*.md",
                "Blog now merges Neon + markdown so Phase 2/3 SEO articles no longer 404 when DATABASE_URL is set.",
                "Gets already-written commercial support content into crawl/index paths.",
                "Sitemap assertions for homestead + solo planning posts.",
                "2026-07-30",
                "Pass 4 complete",
            ],
            [
                "Measurement",
                "Done",
                "GSC + July sheet",
                "Froze July close baseline and updated statuses from Next to Done/Monitor/Carried.",
                "Gives August a clean comparison point.",
                "GSC MCP 28d window Jul 2-30.",
                "2026-07-30",
                "Pass 5 complete",
            ],
            [
                "July outcome",
                "Closed",
                "Whole site",
                "Phase 2 passes 1-5 complete. No new commercial URLs. August owns discovery/indexation and CTR follow-through.",
                "Keeps strategy evidence-led.",
                "Deploy remaining code changes, then request indexing for spokes + support posts.",
                "2026-07-30",
                "Hand off to August tab",
            ],
        ],
    )


def build_august_rows() -> list[list[str]]:
    return [
        [
            "Section",
            "Priority",
            "Workstream",
            "Page / Area",
            "Action",
            "Why it matters",
            "Success metric",
            "Effort",
            "Status",
            "Notes",
        ],
        [
            "Phase 3 summary",
            "P1",
            "Strategy",
            "Whole site",
            "August is a discovery month. Keep the existing commercial cluster, get support posts and spokes indexed, finish any residual CTR polish, and avoid page sprawl.",
            "July closed Pass 1-5. Impressions are rising faster than clicks and spokes still have no GSC page data.",
            "Spokes and support URLs appear in GSC; canonical share rises vs legacy; clicks grow vs July baseline.",
            "S",
            "Active",
            "Built 2026-07-30 from July close-out",
        ],
        [
            "Current signal",
            "P1",
            "Performance trend",
            "sc-domain:homehouse.org.uk",
            "July close baseline (2026-07-02 to 2026-07-30): 31 clicks / 442 impressions. Home 15/109 CTR 13.8% pos 24.4. /retreats 0/20 pos 15.6. /stays 0/14 pos 22.7. Spokes 0. Legacy http://www still splits short windows.",
            "Need a stable month-start comparison after Pass 1-5 landed.",
            "Re-check at Aug 15 and Aug 31 against this exact baseline.",
            "S",
            "Current",
            "Do not reset mid-month unless a tracking issue appears",
        ],
        [
            "Diagnosis",
            "P1",
            "Technical plus content",
            "Whole site",
            "Primary gap is indexation/discovery of spokes and support articles, plus homepage depth/CTR while position sits around 24-31. Not a missing-page problem.",
            "Prevents another round of thin expansion before current URLs earn visibility.",
            "Decisions stay tied to page-level GSC evidence.",
            "S",
            "Current",
            "Default deny on new commercial URLs",
        ],
        [],
        [
            "Top priorities",
            "Priority",
            "Area",
            "Primary URL",
            "Action",
            "Why now",
            "Success metric",
            "Effort",
            "Status",
            "Notes",
        ],
        [
            "Priority action",
            "P0",
            "Deploy and index",
            "Blog merge + spokes + support posts",
            "Deploy the July close-out code. Confirm the 8 SEO markdown posts return 200. Request indexing for /retreats, 4 spokes, and key support posts.",
            "Without deploy/indexation, July's content fix cannot earn August impressions.",
            "Support posts live in production sitemap; at least hub + 1 spoke enter GSC pages.",
            "S",
            "Next",
            "Do this first in August week 1",
        ],
        [
            "Priority action",
            "P1",
            "Commercial CTR",
            "Homepage",
            "Second-pass title/description and above-the-fold clarity for peaceful Norfolk retreats / countryside stays while position remains soft (~24-31).",
            "Homepage still carries almost all clicks.",
            "Homepage CTR and clicks rise vs July baseline.",
            "S",
            "Next",
            "No wellness framing",
        ],
        [
            "Priority action",
            "P1",
            "Cluster discovery",
            "Retreat hub + spokes",
            "Keep strengthening /retreats as the absorber for norfolk retreats / retreats in norfolk. Use internal links and support posts to pull spokes into the index.",
            "Hub is early-visible; spokes are not.",
            "One or more spoke URLs show impressions by Aug 31.",
            "M",
            "Next",
            "Core August growth lever",
        ],
        [
            "Priority action",
            "P1",
            "Support content activation",
            "Blog support cluster",
            "Ensure the live support posts internally link to /retreats, /stays, and /norfolk-holidays. Do not write a large new batch yet.",
            "Content already exists; activation beats net-new writing.",
            "Support posts indexed and referring crawl equity into money pages.",
            "S",
            "Next",
            "Activation over expansion",
        ],
        [
            "Priority action",
            "P1",
            "Stays bridge",
            "/stays",
            "Keep accommodation / restful-break language and continue routing comparisons into /retreats.",
            "Stays is starting to surface (14 impressions) and supports both intents.",
            "Stays impressions rise; assists retreat cluster.",
            "S",
            "Next",
            "Support commercial page",
        ],
        [
            "Priority action",
            "P2",
            "Legacy decay",
            "http(s)://www and old paths",
            "Monthly host/path split report only. Redirects already exist.",
            "Legacy still muddies short-window reporting.",
            "Legacy share of clicks/impressions declines MoM.",
            "S",
            "Monitor",
            "No rebuild",
        ],
        [
            "Priority action",
            "P2",
            "Content gate",
            "Blog / new URLs",
            "Max 1-2 new support articles only if a query gains impressions without a destination. Default deny on spiritual/yoga/wellness niche pages.",
            "Protects against thin sprawl after July's foundation work.",
            "Any new URL has mapped money-page destination before draft.",
            "M",
            "Planned",
            "Evidence-led only",
        ],
        [],
        [
            "Page focus",
            "Priority",
            "URL or area",
            "Observed signal",
            "Recommended next step",
            "Notes",
            "Success metric",
            "Effort",
            "Status",
            "Notes 2",
        ],
        [
            "Page focus",
            "P1",
            "https://homehouse.org.uk/",
            "15 clicks / 109 impressions / 13.8% CTR / pos 24.4 in July close window.",
            "CTR and depth pass; keep routing into /retreats and /stays.",
            "Still the strongest entry point.",
            "Clicks and CTR up vs July baseline.",
            "S",
            "Next",
            "Best current page",
        ],
        [
            "Page focus",
            "P1",
            "https://homehouse.org.uk/retreats",
            "0 clicks / 20 impressions / pos 15.6.",
            "Absorb norfolk retreats intent; push spoke discovery.",
            "Main commercial hub.",
            "Impressions and first clicks on canonical hub.",
            "S",
            "Next",
            "Main acquisition page",
        ],
        [
            "Page focus",
            "P1",
            "https://homehouse.org.uk/stays",
            "0 clicks / 14 impressions / pos 22.7.",
            "Keep guest-house / retreat-accommodation language and cluster links.",
            "Supports retreat and holiday intent.",
            "Impressions increase.",
            "S",
            "Next",
            "Support the retreat cluster",
        ],
        [
            "Page focus",
            "P1",
            "Retreat spokes (4)",
            "No GSC page data yet.",
            "Indexation + cross-links + support-article references.",
            "Women's, solo, private, rest.",
            "At least one spoke appears in GSC pages.",
            "M",
            "Next",
            "Primary discovery goal",
        ],
        [
            "Page focus",
            "P1",
            "SEO support posts (8)",
            "Were 404 on production before July close-out merge.",
            "Confirm live after deploy; request indexing; keep money-page links.",
            "Homestead / solo / women's / pack / stay-vs-retreat / weekend / detox / holidays.",
            "All eight return 200 and enter sitemap/GSC.",
            "S",
            "Next",
            "Activation priority",
        ],
        [
            "Page focus",
            "P2",
            "https://homehouse.org.uk/norfolk-holidays",
            "Not in GSC page report yet.",
            "Keep linked; do not expand holiday cluster.",
            "Watch page only.",
            "First page-level impressions before any expansion.",
            "S",
            "Monitor",
            "Watch, do not overbuild",
        ],
        [],
        [
            "Query watchlist",
            "Priority",
            "Query",
            "Current signal",
            "Decision",
            "Mapped page",
            "Notes",
            "Status",
            "",
            "",
        ],
        [
            "Watchlist",
            "P1",
            "norfolk retreats",
            "Core commercial term from July watchlist; still priority.",
            "Strengthen hub + spokes + support posts.",
            "/retreats + spokes",
            "Highest-fit directional term.",
            "Track",
            "",
            "",
        ],
        [
            "Watchlist",
            "P1",
            "retreats in norfolk",
            "Appears in query set; aligns with hub.",
            "Keep on /retreats FAQ and intro.",
            "/retreats",
            "Treat with norfolk retreats as one cluster.",
            "Track",
            "",
            "",
        ],
        [
            "Watchlist",
            "P1",
            "homestead retreat",
            "Brand-adjacent semantic term; support article now live.",
            "Use naturally; do not force a new landing page.",
            "/retreats + /blog/what-is-a-homestead-retreat",
            "Support article should help.",
            "Track",
            "",
            "",
        ],
        [
            "Watchlist",
            "P1",
            "wellness retreat norfolk",
            "Has earned a click historically; keep careful on-brand language only.",
            "Do not create a dedicated wellness page.",
            "Homepage + /retreats",
            "Copy only; no niche expansion.",
            "Watch",
            "",
            "",
        ],
        [
            "Watchlist",
            "P2",
            "solo / women's near-me variants",
            "Sparse impressions; good for cross-linking.",
            "Support via existing spokes, not new URLs.",
            "solo + women's spoke pages",
            "Cross-intent support.",
            "Track",
            "",
            "",
        ],
        [
            "Watchlist",
            "P2",
            "spiritual / yoga / meditation retreat norfolk",
            "Noise or off-brand risk.",
            "Default deny unless offer is explicit.",
            "None",
            "Guardrail remains active.",
            "Watch",
            "",
            "",
        ],
        [],
        [
            "Content guardrails",
            "Priority",
            "Area",
            "Rule",
            "Why it matters",
            "Applied decision",
            "Status",
            "",
            "",
            "",
        ],
        [
            "Guardrail",
            "P1",
            "Content creation",
            "No new page unless real query signal + commercial/support role + internal-link destination.",
            "Prevents thin doorway content.",
            "Use existing cluster harder before adding surface area.",
            "Active",
            "",
            "",
            "",
        ],
        [
            "Guardrail",
            "P1",
            "Brand fit",
            "No yoga/christian/spiritual/generic wellness pages unless the offer is real.",
            "Avoids relevance drift.",
            "Keep language honest and grounded.",
            "Active",
            "",
            "",
            "",
        ],
        [
            "Guardrail",
            "P1",
            "Internal linking",
            "Every support article must strengthen a money page.",
            "Keeps blog commercially useful.",
            "Map destination URL before drafting.",
            "Active",
            "",
            "",
            "",
        ],
        [],
        [
            "Measurement plan",
            "Priority",
            "Window",
            "Check",
            "What to look for",
            "Decision trigger",
            "Status",
            "",
            "",
            "",
        ],
        [
            "Review",
            "P1",
            "Aug 1",
            "Freeze July close baseline in this tab.",
            "Clean month-start comparison point.",
            "August tab becomes the active plan.",
            "Done",
            "",
            "",
            "",
        ],
        [
            "Review",
            "P1",
            "Aug 15 (14d)",
            "Check spoke + support-post impressions; legacy share; homepage CTR.",
            "Early discovery after deploy/indexation.",
            "If no spoke impressions, audit indexation/links before writing more.",
            "Planned",
            "",
            "",
            "",
        ],
        [
            "Review",
            "P1",
            "Aug 31 (30d)",
            "Compare clicks/impr/CTR/pos vs July baseline; identify winning URL group.",
            "Whether discovery converted into clicks.",
            "Only then consider one tightly scoped support batch or a single new spoke.",
            "Planned",
            "",
            "",
            "",
        ],
    ]


def create_august():
    meta = get_meta()
    existing = {s["properties"]["title"] for s in meta.get("sheets", [])}
    if "August" not in existing:
        batch_update(
            [
                {
                    "addSheet": {
                        "properties": {
                            "title": "August",
                            "index": 2,
                            "gridProperties": {"rowCount": 80, "columnCount": 10},
                        }
                    }
                }
            ]
        )

    rows = build_august_rows()
    # Clear then write so stale cells do not linger if the tab already existed.
    api(
        "POST",
        "/values:batchClear",
        {"ranges": ["August!A1:J80"]},
    )
    values_update("August!A1", rows)

    # Freeze header row and set column widths for readability.
    meta = get_meta()
    august_id = next(
        s["properties"]["sheetId"]
        for s in meta["sheets"]
        if s["properties"]["title"] == "August"
    )
    batch_update(
        [
            {
                "updateSheetProperties": {
                    "properties": {
                        "sheetId": august_id,
                        "gridProperties": {"frozenRowCount": 1},
                    },
                    "fields": "gridProperties.frozenRowCount",
                }
            },
            {
                "updateDimensionProperties": {
                    "range": {
                        "sheetId": august_id,
                        "dimension": "COLUMNS",
                        "startIndex": 4,
                        "endIndex": 5,
                    },
                    "properties": {"pixelSize": 360},
                    "fields": "pixelSize",
                }
            },
            {
                "updateDimensionProperties": {
                    "range": {
                        "sheetId": JULY_SHEET_ID,
                        "dimension": "COLUMNS",
                        "startIndex": 4,
                        "endIndex": 5,
                    },
                    "properties": {"pixelSize": 360},
                    "fields": "pixelSize",
                }
            },
        ]
    )


def main():
    close_july()
    create_august()
    meta = get_meta()
    titles = [s["properties"]["title"] for s in meta["sheets"]]
    print("Sheets now:", titles)
    print("July closed and August created/updated.")


if __name__ == "__main__":
    main()
