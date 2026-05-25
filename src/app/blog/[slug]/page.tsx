import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { getPostBySlug } from "@/lib/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: `${post.title} — Home House Homestead`,
      description: post.excerpt,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: `/blog/${slug}`,
        images: post.coverImage ? [post.coverImage] : undefined,
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <PageShell>
      <PageHero eyebrow="Blog" title={post.title} intro={post.excerpt} image={post.coverImage} />
      <Section className="max-w-3xl">
        <div className="text-foreground/80 font-light leading-relaxed space-y-6">
          <ReactMarkdown
            components={{
              h1: (props) => <h1 className="font-serif text-4xl text-foreground" {...props} />,
              h2: (props) => <h2 className="font-serif text-3xl text-foreground" {...props} />,
              h3: (props) => <h3 className="font-serif text-2xl text-foreground" {...props} />,
              a: (props) => <a className="text-accent hover:underline" {...props} />,
              ul: (props) => <ul className="list-disc pl-6 space-y-2" {...props} />,
              ol: (props) => <ol className="list-decimal pl-6 space-y-2" {...props} />,
              blockquote: (props) => (
                <blockquote className="border-l border-border pl-4 italic text-foreground/75" {...props} />
              ),
            }}
          >
            {post.body}
          </ReactMarkdown>
        </div>
      </Section>
    </PageShell>
  );
}
