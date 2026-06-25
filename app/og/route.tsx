import { renderOgImage } from "../og-template";

export const runtime = "edge";

/**
 * Parametrized OG image endpoint: /og?title=...&eyebrow=...
 *
 * Used by the standalone HTML blog posts in public/blog-posts/, which are
 * served outside the Next routing tree and so cannot use the
 * opengraph-image file convention. They point og:image here.
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Khemshield";
  const eyebrow = searchParams.get("eyebrow") ?? "Khemshield Insights";
  return renderOgImage({ title, eyebrow });
}
