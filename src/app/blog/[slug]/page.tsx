import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { AuthorStrip } from "@/components/AuthorStrip";
import { GuideFooter } from "@/components/GuideFooter";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { getPostBySlug, isGuidePost } from "@/lib/blog";
import { extractFaqFromMarkdown } from "@/lib/blogFaq";
import { getSiteUrl } from "@/lib/siteUrl";

export const dynamic = "force-dynamic";

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
      robots: post.noindex ? { index: false, follow: false } : undefined,
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

  if (post.noindex) notFound();

  const guide = isGuidePost(post);
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
    author: guide
      ? { "@type": "Organization", name: "Home House Homestead", url: siteUrl }
      : { "@type": "Person", name: post.author ?? "Hawa Hummingbird" },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: guide ? "Guides" : "Journal", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  const isHtml = post.body.trim().startsWith("<");
  const faq =
    !isHtml && slug === "how-long-should-you-go-on-a-retreat-for"
      ? extractFaqFromMarkdown(post.body)
      : [];
  const faqJsonLd =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${postUrl}#faq`,
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }
      : null;

  return (
    <PageShell>
      <SeoJsonLd data={breadcrumbJsonLd} />
      <SeoJsonLd data={blogPostingJsonLd} />
      {faqJsonLd ? <SeoJsonLd data={faqJsonLd} /> : null}
      <PageHero
        eyebrow={guide ? "Guide" : "Journal"}
        title={post.title}
        intro={post.excerpt}
        image={post.coverImage}
      />
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
                  table: (props) => (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm" {...props} />
                    </div>
                  ),
                  th: (props) => (
                    <th className="border border-border bg-foreground/5 px-3 py-2 text-left font-normal" {...props} />
                  ),
                  td: (props) => <td className="border border-border px-3 py-2 align-top" {...props} />,
                }}
              >
                {post.body}
              </ReactMarkdown>
            )}
          </div>
          <div className="mt-12">{guide ? <GuideFooter /> : <AuthorStrip full />}</div>
        </Section>
      </Band>
    </PageShell>
  );
}
