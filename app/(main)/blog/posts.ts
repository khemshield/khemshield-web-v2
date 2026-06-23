/**
 * Blog registry, the single source of truth for every post on the site.
 *
 * Two kinds of posts are supported so the blog stays flexible:
 *
 *  - type "custom"  → a fully bespoke, standalone HTML page (its own design /
 *                     interactivity). The file lives in `public/blog-posts/<slug>.html`
 *                     and is served full-bleed. `href` points straight at it.
 *
 *  - type "article" → a normal prose article written in Markdown at
 *                     `content/blog/<slug>.md`. It is rendered through the shared,
 *                     on-brand template at `/blog/[slug]`.
 *
 * To add a post: drop the file in the right place and add ONE entry below.
 * (Order in this array = order shown on the blog index, newest first.)
 *
 * Later, this array can be replaced by a fetch from the GraphQL backend without
 * touching any of the rendering code, everything reads from `blogPosts`.
 */

export type PostType = "custom" | "article";

export interface BlogPost {
  /** URL-safe id. For articles this is also the route: /blog/<slug> */
  slug: string;
  title: string;
  excerpt: string;
  type: PostType;
  /** Where the card links. Custom → /blog-posts/x.html, Article → /blog/x */
  href: string;
  /** ISO date string, e.g. "2026-06-22" */
  date: string;
  /** Human read-time label, e.g. "8 min read". Articles can compute this. */
  readTime: string;
  tags: string[];
  author: string;
  /** Optional cover image in /public. If omitted, an on-brand gradient is used. */
  cover?: string;
  /** Tailwind gradient classes for the placeholder cover when `cover` is unset. */
  accent?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-ai-works",
    title: "How AI Actually Works",
    excerpt:
      "A visual, step-by-step walk through what really happens between your prompt and the AI's answer, tokens, vectors, attention, and prediction, no maths degree required.",
    type: "custom",
    href: "/blog-posts/how-ai-works.html",
    date: "2026-06-22",
    readTime: "12 min read",
    tags: ["AI", "Fundamentals", "Explainer"],
    author: "Khemshield",
    accent: "from-[#a78bfa] via-[#6366f1] to-[#2dd4bf]",
  },
  {
    slug: "temperature-and-top-p",
    title: "Temperature & Top-p, Explained",
    excerpt:
      "Two dials control how creative or predictable an AI's writing is. Play with the interactive sliders to see exactly how temperature and top-p reshape what the model says.",
    type: "custom",
    href: "/blog-posts/temperature-and-top-p.html",
    date: "2026-06-22",
    readTime: "8 min read",
    tags: ["AI", "Parameters", "Interactive"],
    author: "Khemshield",
    accent: "from-[#f97316] via-[#fb923c] to-[#6366f1]",
  },
  // ─────────────────────────────────────────────────────────────────────────
  // Example of a Markdown article. Edit content/blog/getting-started-with-llms.md,
  // or delete this entry + that file if you don't want it. It demonstrates the
  // on-brand templated article path at /blog/getting-started-with-llms.
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "getting-started-with-llms",
    title: "Getting Started with Large Language Models",
    excerpt:
      "New to AI? Here's a friendly, jargon-light primer on what large language models are, what they can (and can't) do, and how to start using them to learn faster.",
    type: "article",
    href: "/blog/getting-started-with-llms",
    date: "2026-06-20",
    readTime: "5 min read",
    tags: ["AI", "Beginner", "Guide"],
    author: "Khemshield",
    accent: "from-primary-normal via-primary-dark to-secondary-normal",
  },
];

/** Look up a single post by slug. */
export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

/** Only the Markdown-rendered posts (used to pre-build /blog/[slug] routes). */
export const getArticleSlugs = (): string[] =>
  blogPosts.filter((p) => p.type === "article").map((p) => p.slug);
