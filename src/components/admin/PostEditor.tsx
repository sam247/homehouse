"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

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

    const res = await fetch("/admin/media/upload", { method: "POST", body: form });
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
    <form method="post" action={action} className="mt-10 space-y-8">
      <div className="grid gap-4">
        <label className="text-xs uppercase tracking-[0.25em] text-foreground/70">
          Title
          <input
            name="title"
            type="text"
            defaultValue={initial?.title ?? ""}
            required
            className="mt-2 w-full border border-border bg-background px-4 py-3 font-light outline-none focus:border-accent"
          />
        </label>

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

        <label className="text-xs uppercase tracking-[0.25em] text-foreground/70">
          Cover image URL
          <input
            name="coverImageUrl"
            type="url"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            className="mt-2 w-full border border-border bg-background px-4 py-3 font-light outline-none focus:border-accent"
          />
        </label>

        <div className="grid gap-2">
          <div className="text-xs uppercase tracking-[0.25em] text-foreground/70">Cover image upload</div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <input
              ref={coverFileRef}
              type="file"
              accept="image/*"
              className="w-full border border-border bg-background px-4 py-3 text-sm font-light file:mr-4 file:border-0 file:bg-transparent file:text-foreground/70"
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
            <button
              type="button"
              disabled={uploadingCover}
              className={[
                "border border-border px-4 py-3 text-xs uppercase tracking-[0.25em] transition-colors",
                uploadingCover ? "text-foreground/40" : "hover:border-accent",
              ].join(" ")}
              onClick={() => coverFileRef.current?.click()}
            >
              {uploadingCover ? "Uploading…" : "Choose file"}
            </button>
          </div>
          {coverImageUrl && (
            <a
              href={coverImageUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-accent hover:underline break-all font-light"
            >
              {coverImageUrl}
            </a>
          )}
        </div>

        <label className="flex items-center justify-between border border-border px-4 py-3">
          <span className="text-xs uppercase tracking-[0.25em] text-foreground/70">Published</span>
          <input
            name="published"
            type="checkbox"
            defaultChecked={Boolean(initial?.published)}
            className="h-4 w-4 accent-[var(--color-accent)]"
          />
        </label>
      </div>

      <div className="border border-border p-4 md:p-6">
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
              const url = window.prompt("Image URL");
              if (!url) return;
              editor?.chain().focus().setImage({ src: url }).run();
            }}
          >
            Image
          </ToolbarButton>
          <ToolbarButton
            onClick={() => {
              inlineFileRef.current?.click();
            }}
            active={uploadingInline}
          >
            Upload
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

      <input type="hidden" name="bodyHtml" value={bodyHtml} />

      <button
        type="submit"
        className="w-full border border-border bg-foreground text-background px-4 py-4 text-xs uppercase tracking-[0.25em] hover:bg-foreground/90 transition-colors"
      >
        Save
      </button>
    </form>
  );
}
