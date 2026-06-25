"use client";

import useSideDrawerStore from "@/app/store/side-drawer";
import { Add } from "iconsax-react";
import { ReactNode } from "react";
import RequestQuoteButton from "../Buttons/RequestQuoteButton";
import NavLink from "./NavLink";
import Socials from "../Footer/Socials";
import { defaultSocials } from "../Footer/FooterAbout";
import Logo from "../Generics/Logo";

interface Props {
  items: { text: string; href: string; icon: ReactNode }[];
}

const SideDrawer = ({ items }: Readonly<Props>) => {
  const { handleClose, open } = useSideDrawerStore();
  return (
    <div className="lg:hidden">
      {/* Overlay */}
      <div
        onClick={handleClose}
        aria-hidden
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer panel */}
      <nav
        className={`fixed inset-y-0 left-0 z-50 flex w-[82%] max-w-xs flex-col bg-white shadow-[0_0_40px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-black/[0.06] px-6 py-5">
          <Logo withText />
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-full text-secondary-normal transition-colors hover:bg-support"
          >
            <Add size={28} className="rotate-45" />
          </button>
        </header>

        <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-6">
          {items.map(({ href, text }) => (
            <li key={text} onClick={handleClose}>
              <NavLink href={href} bold>
                <span className="block py-2 text-lg">{text}</span>
              </NavLink>
            </li>
          ))}

          <li className="mt-6 sm:hidden" onClick={handleClose}>
            <RequestQuoteButton />
          </li>
        </ul>

        <div className="flex items-center justify-center border-t border-black/[0.06] px-6 py-6">
          <Socials socials={defaultSocials} />
        </div>
      </nav>
    </div>
  );
};

export default SideDrawer;
