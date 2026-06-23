import { ImageResponse } from "next/og";

/**
 * Shared Open Graph image renderer (1200x630), on brand: near-black surface,
 * Khemshield red as the single signal color, white display title, optional
 * topic tag and subtitle, plus a subtle neural-dot motif so the card reads as
 * designed rather than a bare title.
 *
 * Used by the file-convention images (app/opengraph-image.tsx,
 * blog/[slug]/opengraph-image.tsx) and by the parametrized /og route that the
 * static HTML blog posts point at.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

interface OgOptions {
  /** Small uppercase label above the brand mark, e.g. "Khemshield Blog". */
  eyebrow?: string;
  /** The headline. */
  title: string;
  /** Optional supporting line under the title. */
  subtitle?: string;
  /** Optional category pill, e.g. "AI / Guide". */
  tag?: string;
}

export function renderOgImage({
  eyebrow = "Khemshield",
  title,
  subtitle,
  tag,
}: OgOptions) {
  const clippedTitle = title.length > 90 ? `${title.slice(0, 87)}...` : title;
  const clippedSubtitle =
    subtitle && subtitle.length > 116
      ? `${subtitle.slice(0, 113)}...`
      : subtitle;

  // Decorative neural-dot field (top-right). Purely cosmetic texture.
  const COLS = 8;
  const ROWS = 6;
  const dots = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const accent = (r + c) % 4 === 0;
      dots.push(
        <div
          key={`${r}-${c}`}
          style={{
            width: 10,
            height: 10,
            borderRadius: 9999,
            background: accent
              ? "rgba(244,51,52,0.55)"
              : "rgba(255,255,255,0.10)",
          }}
        />
      );
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#191919",
          padding: "70px",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Left red accent rail */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 12,
            height: "100%",
            background: "#F43334",
          }}
        />

        {/* Decorative dot field */}
        <div
          style={{
            position: "absolute",
            top: 58,
            right: 58,
            display: "flex",
            flexWrap: "wrap",
            width: COLS * 26,
            gap: 16,
          }}
        >
          {dots}
        </div>

        {/* Top: brand mark + eyebrow */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 66,
              height: 66,
              background: "#F43334",
              borderRadius: 16,
              color: "#ffffff",
              fontSize: 40,
              fontWeight: 800,
              marginRight: 22,
            }}
          >
            K
          </div>
          <div
            style={{
              display: "flex",
              color: "#F43334",
              fontSize: 25,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
        </div>

        {/* Middle: tag + title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {tag ? (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                color: "#d6d6d6",
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: "uppercase",
                border: "1px solid rgba(255,255,255,0.22)",
                borderRadius: 999,
                padding: "8px 20px",
                marginBottom: 26,
              }}
            >
              {tag}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: clippedTitle.length > 52 ? 60 : 72,
              fontWeight: 800,
              lineHeight: 1.07,
              letterSpacing: -1.5,
              maxWidth: 1000,
            }}
          >
            {clippedTitle}
          </div>
          {clippedSubtitle ? (
            <div
              style={{
                display: "flex",
                color: "#a3a3a3",
                fontSize: 30,
                lineHeight: 1.35,
                marginTop: 22,
                maxWidth: 940,
              }}
            >
              {clippedSubtitle}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", color: "#8c8c8c", fontSize: 27 }}>
            khemshield.com
          </div>
          <div
            style={{
              display: "flex",
              width: 130,
              height: 8,
              background: "#F43334",
              borderRadius: 999,
            }}
          />
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
