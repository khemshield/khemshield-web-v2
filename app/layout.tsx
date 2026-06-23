import "./globals.css";
import type { Metadata } from "next";
import { Jost, Archivo, IBM_Plex_Mono } from "next/font/google";

const SITE_URL = "https://www.khemshield.com";
const SITE_NAME = "Khemshield";
const DEFAULT_TITLE = "Khemshield | Secure IT Solutions & Tech Training";
const DEFAULT_DESCRIPTION =
  "Khemshield is your partner in secure IT solutions and skill development, offering cybersecurity, software engineering, consulting, and hands-on training.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Khemshield",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Khemshield",
    "cybersecurity",
    "software engineering",
    "IT solutions",
    "tech training",
    "ethical hacking",
    "AI engineering",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    // og:image is supplied by app/opengraph-image.tsx (and per-segment overrides).
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    // twitter:image is supplied by the opengraph-image file convention.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Favicon is supplied by the app/icon.png file convention.
};

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${archivo.variable} ${plexMono.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
