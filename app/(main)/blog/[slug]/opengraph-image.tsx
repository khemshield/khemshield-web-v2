import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/app/og-template";
import { getPostBySlug } from "../posts";

// Rendered on demand at the edge (see app/opengraph-image.tsx for why).
export const runtime = "edge";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Khemshield Blog";

// Per-article social-share image showing the post title.
export default function Image({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  return renderOgImage({
    eyebrow: "Khemshield Blog",
    title: post?.title ?? "Khemshield Blog",
  });
}
