import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * Layout for the temporary admin pages.
 *
 * Deliberately bare: no TopNav, Footer, BottomNav or Toaster. This is an
 * internal tool, not part of the marketing site, and it must not look like one.
 *
 * TEMPORARY: delete this whole route group once the dashboard app takes over.
 */
export const metadata: Metadata = {
  title: "Khemshield Studio",
  robots: { index: false, follow: false, nocache: true },
};

const StudioLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <div className="min-h-screen bg-gray-50">
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="font-semibold text-secondary-normal">
          Khemshield Studio
        </span>
        <span className="text-xs text-gray-500">
          Temporary admin, moves to the dashboard when the API is back
        </span>
      </div>
    </header>
    <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
  </div>
);

export default StudioLayout;
