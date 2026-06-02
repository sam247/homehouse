import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { AuthorStrip } from "@/components/AuthorStrip";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getSiteUrl } from "@/lib/siteUrl";

export const revalidate = 3600;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: post.title,
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
  const siteUrl = getSiteUrl();

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  const postUrl = `${siteUrl}/blog/${slug}`;
  const coverImage = post.coverImage
    ? post.coverImage.startsWith("http")
      ? post.coverImage
      : `${siteUrl}${post.coverImage}`
    : undefined;

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: coverImage ? [coverImage] : undefined,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: "Hawa Hummingbird" },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  const isHtml = post.body.trim().startsWith("<");

  return (
    <PageShell>
      <SeoJsonLd data={breadcrumbJsonLd} />
      <SeoJsonLd data={blogPostingJsonLd} />
      <PageHero eyebrow="Blog" title={post.title} intro={post.excerpt} image={post.coverImage} />
      <Band variant="cream">
        <Section className="max-w-3xl">
          <div className="text-foreground/80 font-light leading-relaxed space-y-6">
            {isHtml ? (
              <div
                className="space-y-6 [&_h1]:font-serif [&_h1]:text-4xl [&_h2]:font-serif [&_h2]:text-3xl [&_h3]:font-serif [&_h3]:text-2xl [&_a]:text-accent [&_a]:hover:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_blockquote]:border-l [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-foreground/75"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            ) : (
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
            )}
          </div>
          <div className="mt-12">
            <AuthorStrip full />
          </div>
        </Section>
      </Band>
    </PageShell>
  );
}
