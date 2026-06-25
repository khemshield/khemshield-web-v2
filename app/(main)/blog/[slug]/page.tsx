import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "iconsax-react";
import Wrapper from "@/app/components/Generics/Wrapper";
import Heading from "@/app/components/Generics/Heading";
import { getArticleSlugs, getPostBySlug } from "../posts";

interface Params {
  params: { slug: string };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/** Read a Markdown article body from content/blog/<slug>.md, or null if missing. */
const readArticleBody = (slug: string): string | null => {
  const file = path.join(process.cwd(), "content", "blog", `${slug}.md`);
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return null;
  }
};

// Pre-build a static page for every article in the registry.
export const generateStaticParams = () =>
  getArticleSlugs().map((slug) => ({ slug }));

export const generateMetadata = ({ params }: Params): Metadata => {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Insights" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      ...(post.cover ? { images: [{ url: post.cover, alt: post.title }] } : {}),
    },
  };
};

const ArticlePage = ({ params }: Params) => {
  const post = getPostBySlug(params.slug);

  // Only Markdown "article" posts render here. Custom posts are static HTML.
  if (!post || post.type !== "article") notFound();

  const body = readArticleBody(params.slug);
  if (!body) notFound();

  return (
    <Wrapper styles="py-10 lg:py-16">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium
          text-[#8C94A3] transition-colors hover:text-primary-normal"
        >
          <ArrowLeft size={16} />
          Back to blog
        </Link>

        {/* Header */}
        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary-container px-2.5 py-1 text-xs
              font-medium text-primary-dark"
            >
              {tag}
            </span>
          ))}
        </div>

        <Heading variant="h1">{post.title}</Heading>

        <div className="mt-5 flex items-center gap-2 text-sm text-[#8C94A3]">
          <span className="font-medium text-secondary-normal">
            {post.author}
          </span>
          <span aria-hidden>·</span>
          <span>{formatDate(post.date)}</span>
          <span aria-hidden>·</span>
          <span>{post.readTime}</span>
        </div>

        <hr className="my-8 border-secondary-light" />

        {/* Body */}
        <div
          className="prose prose-neutral max-w-none
          prose-headings:text-secondary-normal prose-headings:font-semibold
          prose-a:text-primary-normal prose-a:no-underline hover:prose-a:underline
          prose-strong:text-secondary-normal
          prose-blockquote:border-l-primary-normal prose-blockquote:text-secondary-normal
          prose-code:text-primary-dark prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-secondary-normal prose-pre:text-white"
        >
          <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
        </div>
      </article>
    </Wrapper>
  );
};

export default ArticlePage;
