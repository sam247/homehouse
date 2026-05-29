"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { ADMIN_ENTRY_PATH } from "@/lib/adminEntry";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Props = {
  action: string;
  initial?: {
    title?: string;
    slug?: string;
    excerpt?: string;
    coverImageUrl?: string;
    published?: boolean;
    bodyHtml?: string;
  };
};

const PRAYERS = [
  {
    dhikr: "Ya Hayyu Ya Qayyum",
    title: "The Living, The Sustainer",
    meaning: "O Living, O Self-Subsisting Sustainer.",
    focus:
      "Known as a Ism-e-Azam (Greatest Name), this chant is highly recommended for revitalizing the body, overcoming lethargy, and inviting life-force energy.",
  },
  {
    dhikr: "Ya Shaafi",
    title: "The Healer",
    meaning: "O Healer of all ills.",
    focus:
      "Used to address both physical and emotional disease, this mantra can be repeated to focus the intention of receiving divine restorative energy.",
  },
  {
    dhikr: "Salawat al-Tibbiyya",
    title: "The Healing Prayer",
    meaning:
      "O Allah, send prayers and peace upon our Master Muhammad, the medicine of hearts and their treatment, the soundness of bodies and their cure...",
    focus:
      "A deeply revered prayer in the Sufi tradition for holistic healing and restoring balance.",
  },
  {
    dhikr: "La Hawla Wa La Quwwata Illa Billah",
    title: "There is no power nor strength except by Allah",
    meaning: "Acknowledges that all healing and strength originate from the Divine.",
    focus:
      "Used to relieve stress, surrender to the healing process, and remove feelings of helplessness.",
  },
  {
    dhikr: "Dhikr of the Heart (La Ilaha Illa Allah)",
    title: "",
    meaning: "There is no god but God.",
    focus:
      "Often recited rhythmically to clear the mind of fear, release negative attachments, and calm a restless or anxious heart.",
  },
] as const;

function ToolbarButton({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "border border-border px-3 py-2 text-xs uppercase tracking-[0.25em] transition-colors",
        active ? "bg-foreground text-background" : "hover:border-accent",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function PrayerWidget() {
  const [dismissed, setDismissed] = useState(false);
  const prayer = useMemo(() => PRAYERS[Math.floor(Math.random() * PRAYERS.length)], []);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <TooltipProvider delayDuration={250}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="text-left w-[min(18rem,calc(100vw-3rem))] border border-border bg-background/70 backdrop-blur px-5 py-4 shadow-sm hover:bg-background/80 transition-colors"
            >
              <div className="text-base font-serif leading-tight">{prayer.dhikr}</div>
              {prayer.title ? (
                <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-foreground/70">
                  {prayer.title}
                </div>
              ) : null}
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="start"
            sideOffset={10}
            className="w-[min(20rem,calc(100vw-3rem))] whitespace-normal bg-background text-foreground border border-border px-5 py-4 shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="font-serif text-base leading-tight">{prayer.dhikr}</div>
                {prayer.title ? (
                  <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-foreground/70">
                    {prayer.title}
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                aria-label="Dismiss"
                className="shrink-0 border border-border px-2 py-1 text-xs text-foreground/70 hover:text-foreground hover:border-accent transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDismissed(true);
                }}
              >
                ×
              </button>
            </div>

            <div className="mt-3 space-y-3 text-sm font-light text-foreground/80">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/60">
                  Meaning
                </div>
                <div className="mt-1">{prayer.meaning}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/60">
                  Healing focus
                </div>
                <div className="mt-1">{prayer.focus}</div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export function PostEditor({ action, initial }: Props) {
  const [bodyHtml, setBodyHtml] = useState(initial?.bodyHtml ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(initial?.coverImageUrl ?? "");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingInline, setUploadingInline] = useState(false);
  const coverFileRef = useRef<HTMLInputElement | null>(null);
  const inlineFileRef = useRef<HTMLInputElement | null>(null);

  async function upload(file: File) {
    const form = new FormData();
    form.set("file", file);

    const res = await fetch(`${ADMIN_ENTRY_PATH}/media/upload`, { method: "POST", body: form });
    if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
    const json = (await res.json()) as { url?: string };
    if (!json.url) throw new Error("Upload failed");
    return json.url;
  }

  const extensions = useMemo(
    () => [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: false }),
    ],
    [],
  );

  const editor = useEditor({
    extensions,
    content: bodyHtml || "<p></p>",
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] outline-none prose prose-invert max-w-none prose-headings:font-serif prose-a:text-accent prose-blockquote:border-l prose-blockquote:border-border prose-blockquote:pl-4 prose-blockquote:italic",
      },
    },
    onUpdate({ editor }) {
      setBodyHtml(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if ((initial?.bodyHtml ?? "") !== bodyHtml) return;
    editor.commands.setContent(bodyHtml || "<p></p>");
  }, [editor, initial?.bodyHtml, bodyHtml]);

  return (
    <div className="relative">
      <PrayerWidget />
      <form method="post" action={action} className="mt-10 space-y-10">
        <div className="border border-border p-6 md:p-8">
          <label className="text-xs uppercase tracking-[0.25em] text-foreground/60">
            Title
            <input
              name="title"
              type="text"
              defaultValue={initial?.title ?? ""}
              required
              className="mt-3 w-full border border-border bg-background px-4 py-4 text-2xl font-serif outline-none focus:border-accent"
            />
          </label>

          <div className="mt-8 border border-border p-4 md:p-6">
            <div className="flex flex-wrap gap-2">
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleBold().run()}
                active={editor?.isActive("bold")}
              >
                Bold
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                active={editor?.isActive("italic")}
              >
                Italic
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                active={editor?.isActive("heading", { level: 2 })}
              >
                H2
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                active={editor?.isActive("bulletList")}
              >
                List
              </ToolbarButton>
              <ToolbarButton
                onClick={() => {
                  const url = window.prompt("Link URL");
                  if (!url) return;
                  editor?.chain().focus().setLink({ href: url }).run();
                }}
                active={editor?.isActive("link")}
              >
                Link
              </ToolbarButton>
              <ToolbarButton
                onClick={() => {
                  inlineFileRef.current?.click();
                }}
                active={uploadingInline}
              >
                Image
              </ToolbarButton>
            </div>

            <input
              ref={inlineFileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setUploadingInline(true);
                try {
                  const url = await upload(file);
                  editor?.chain().focus().setImage({ src: url }).run();
                } finally {
                  setUploadingInline(false);
                  e.target.value = "";
                }
              }}
            />

            <div className="mt-6">
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>

        <div className="border border-border p-6 md:p-8 space-y-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-foreground/60">
              Publishing
            </div>
            <div className="mt-2 text-sm text-foreground/70 font-light">
              Slug, excerpt, cover image, and publish settings.
            </div>
          </div>

          <label className="text-xs uppercase tracking-[0.25em] text-foreground/70">
            Slug
            <input
              name="slug"
              type="text"
              defaultValue={initial?.slug ?? ""}
              placeholder="leave blank to auto-generate"
              className="mt-2 w-full border border-border bg-background px-4 py-3 font-light outline-none focus:border-accent"
            />
          </label>

          <label className="text-xs uppercase tracking-[0.25em] text-foreground/70">
            Excerpt
            <textarea
              name="excerpt"
              defaultValue={initial?.excerpt ?? ""}
              rows={3}
              className="mt-2 w-full border border-border bg-background px-4 py-3 font-light outline-none focus:border-accent"
            />
          </label>

          <div className="grid gap-3">
            <div className="text-xs uppercase tracking-[0.25em] text-foreground/70">Cover image</div>
            <input type="hidden" name="coverImageUrl" value={coverImageUrl} />
            <input
              ref={coverFileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setUploadingCover(true);
                try {
                  const url = await upload(file);
                  setCoverImageUrl(url);
                } finally {
                  setUploadingCover(false);
                  e.target.value = "";
                }
              }}
            />
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={uploadingCover}
                className={[
                  "border border-border px-4 py-3 text-xs uppercase tracking-[0.25em] transition-colors",
                  uploadingCover ? "text-foreground/40" : "hover:border-accent",
                ].join(" ")}
                onClick={() => coverFileRef.current?.click()}
              >
                {uploadingCover ? "Uploading…" : coverImageUrl ? "Replace cover" : "Upload cover"}
              </button>
              {coverImageUrl ? (
                <a
                  href={coverImageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-accent hover:underline break-all font-light"
                >
                  View cover
                </a>
              ) : null}
            </div>
          </div>

          <label className="flex items-center justify-between border border-border px-4 py-3">
            <span className="text-xs uppercase tracking-[0.25em] text-foreground/70">
              Published
            </span>
            <input
              name="published"
              type="checkbox"
              defaultChecked={Boolean(initial?.published)}
              className="h-4 w-4 accent-[var(--color-accent)]"
            />
          </label>
        </div>

        <input type="hidden" name="bodyHtml" value={bodyHtml} />

        <button
          type="submit"
          className="w-full border border-border bg-foreground text-background px-4 py-4 text-xs uppercase tracking-[0.25em] hover:bg-foreground/90 transition-colors"
        >
          Save
        </button>
      </form>
    </div>
  );
}
