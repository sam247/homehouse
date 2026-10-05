import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Privacy Notice | Home House Homestead",
  },
  description:
    "How Home House Homestead handles your personal information, which cookies we use, and the choices you have — including analytics that only run with your consent.",
  openGraph: {
    title: "Privacy Notice | Home House Homestead",
    description:
      "How Home House Homestead handles personal information, which cookies we use, and the choices you have.",
    url: "/privacy",
  },
  alternates: {
    canonical: "/privacy",
  },
};

const LAST_UPDATED = "5 October 2026";

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Privacy"
        title="Privacy notice"
        intro="What we collect, why we collect it, and how to change your mind."
      />

      <Band variant="cream">
        <Section className="max-w-3xl">
          <div className="reveal space-y-6 font-light leading-relaxed text-foreground/80">
            <p className="text-xs uppercase tracking-[0.25em] text-accent">
              Last updated {LAST_UPDATED}
            </p>

            <p>
              This notice explains how {SITE.name} handles personal information when you visit this website or get in
              touch with us. We are the data controller for that information. You can reach us at{" "}
              <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
                {SITE.email}
              </a>{" "}
              for anything covered here.
            </p>

            <h2 className="font-serif text-3xl leading-tight text-foreground">Cookies and analytics</h2>

            <p>
              We do not set any cookies over and above those needed to serve the site until you tell us that you are
              happy for us to. When you first visit, a notice appears in the corner of the screen letting you choose.
              Nothing is recorded if you select <strong>Essential only</strong>.
            </p>

            <p>
              If you accept analytics, we load Google Analytics 4. It records things like which pages are visited, how
              long a visit lasts, roughly where in the world a visitor is, the browser and device used, and which site
              or search brought someone here. We use it to understand which pages are useful and where people get
              stuck. IP addresses are anonymised.
            </p>

            <div className="border border-border bg-background/40 p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-accent">Cookies we may set</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="border-b border-border pb-3">
                  <span className="font-normal text-foreground">hhh-cookie-consent</span> — your cookie choice, held in
                  your browser&rsquo;s local storage rather than a cookie, so we can remember it. Not sent to us.
                </li>
                <li className="border-b border-border pb-3">
                  <span className="font-normal text-foreground">_ga, _ga_*</span> — Google Analytics. Set only after you
                  accept analytics, and used to distinguish visitors and sessions. Typically expires after up to two
                  years.
                </li>
              </ul>
            </div>

            <p>
              You can change your mind at any time by clearing this site&rsquo;s data in your browser settings, which
              brings the notice back so you can choose again. You can also install Google&rsquo;s{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                className="text-accent hover:underline"
                rel="noreferrer"
                target="_blank"
              >
                Analytics opt-out browser add-on
              </a>
              .
            </p>

            <h2 className="font-serif text-3xl leading-tight text-foreground">Information you send us</h2>

            <p>
              When you use an enquiry form on this site, we ask for your name and email address, and optionally a phone
              number, the number of guests, dates you have in mind, and a message. We also record which page you were
              on when you sent it, so we can understand what you were asking about.
            </p>

            <p>
              We use that information to reply to you, to answer questions about availability and retreats, and to
              arrange a booking if you decide to make one. We keep it for as long as we need it for those purposes,
              and then for a reasonable period afterwards for our own records and accounting. If you would like us to
              delete an enquiry you have sent, ask us and we will, unless we are required to keep it.
            </p>

            <p>
              Our legal basis for handling enquiry information is our legitimate interest in responding to people who
              contact us and in running the business, and — where a booking is made — taking steps towards a contract
              with you. Our basis for analytics is your consent.
            </p>

            <h2 className="font-serif text-3xl leading-tight text-foreground">Who else is involved</h2>

            <p>
              We use a small number of service providers to run the site. They handle information on our behalf and are
              not permitted to use it for their own purposes:
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="font-normal text-foreground">Hosting</strong> — our website and database are hosted
                with established providers in the cloud, who process requests on our instruction.
              </li>
              <li>
                <strong className="font-normal text-foreground">Database</strong> — enquiry details are stored in a
                managed PostgreSQL database so that we can track and reply to them.
              </li>
              <li>
                <strong className="font-normal text-foreground">Email delivery</strong> — enquiry notifications are
                delivered to us by a transactional email provider.
              </li>
              <li>
                <strong className="font-normal text-foreground">Analytics</strong> — Google Analytics, only if you
                accept it.
              </li>
            </ul>

            <p>
              Some of these providers are based outside the UK and the European Economic Area. Where that is the case,
              transfers are covered by appropriate safeguards such as the UK International Data Transfer Addendum or
              the European Commission&rsquo;s standard contractual clauses. We do not sell your information, and we do
              not share it for advertising.
            </p>

            <h2 className="font-serif text-3xl leading-tight text-foreground">How the site is built</h2>

            <p>
              The pages you are reading are served as plain HTML with the styling and fonts hosted alongside them, so
              reading the site does not require you to be tracked. The hero video is served as a single compressed file
              and does not use cookies.
            </p>

            <h2 className="font-serif text-3xl leading-tight text-foreground">Your rights</h2>

            <p>
              Under UK data protection law you have the right to ask for a copy of the information we hold about you,
              to have it corrected if it is wrong, to have it deleted, to restrict or object to how we use it, and to
              receive it in a portable format. To exercise any of these, email{" "}
              <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
                {SITE.email}
              </a>{" "}
              and we will respond within one month.
            </p>

            <p>
              If you are unhappy with how we have handled your information you can complain to the Information
              Commissioner&rsquo;s Office at{" "}
              <a href="https://ico.org.uk" className="text-accent hover:underline" rel="noreferrer" target="_blank">
                ico.org.uk
              </a>
              . We would appreciate the chance to put things right first.
            </p>

            <h2 className="font-serif text-3xl leading-tight text-foreground">Links to other sites</h2>

            <p>
              Some pages link out to other websites, such as Google reviews and Instagram. Once you follow those links,
              the privacy notices of those services apply rather than this one.
            </p>

            <h2 className="font-serif text-3xl leading-tight text-foreground">Changes</h2>

            <p>
              If we change how we handle information, we will update this page and the date at the top. If the change
              is significant, we will make that clear on the site.
            </p>

            <p className="pt-4">
              Questions about any of this?{" "}
              <Link href="/contact" className="text-accent hover:underline">
                Get in touch
              </Link>
              .
            </p>
          </div>
        </Section>
      </Band>
    </PageShell>
  );
}
