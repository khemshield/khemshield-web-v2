import { ImageResponse } from "next/og";

/**
 * Shared Open Graph image renderer (1200x630), on brand: near-black surface,
 * Khemshield red as the single signal color, white display title.
 *
 * Used by the file-convention images (app/opengraph-image.tsx,
 * blog/[slug]/opengraph-image.tsx) and by the parametrized /og route that the
 * static HTML blog posts point at.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

interface OgOptions {
  /** Small uppercase label above the title, e.g. "Khemshield Insights". */
  eyebrow?: string;
  /** The headline. */
  title: string;
}

export function renderOgImage({ eyebrow = "Khemshield", title }: OgOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#191919",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand mark + eyebrow */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "68px",
              height: "68px",
              background: "#F43334",
              borderRadius: "16px",
              color: "#ffffff",
              fontSize: "42px",
              fontWeight: 800,
              marginRight: "22px",
            }}
          >
            K
          </div>
          <div
            style={{
              display: "flex",
              color: "#F43334",
              fontSize: "26px",
              fontWeight: 700,
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: title.length > 52 ? "60px" : "72px",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-1.5px",
            maxWidth: "1010px",
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", color: "#9a9a9a", fontSize: "28px" }}>
            khemshield.com
          </div>
          <div
            style={{
              display: "flex",
              width: "130px",
              height: "8px",
              background: "#F43334",
              borderRadius: "99px",
            }}
          />
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
