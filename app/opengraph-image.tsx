import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "./og-template";

// Rendered on demand at the edge: avoids the @vercel/og font-loading bug that
// breaks ImageResponse during the Node build-time prerender on Windows.
export const runtime = "edge";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Khemshield | Secure IT Solutions & Tech Training";

// Default social-share image for the whole site (any route without its own).
export default function Image() {
  return renderOgImage({
    eyebrow: "Khemshield",
    title: "Secure IT Solutions & Tech Training",
  });
}
