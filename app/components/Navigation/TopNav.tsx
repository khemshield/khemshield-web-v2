import React from "react";
import Logo from "../Generics/Logo";
import NavItems from "./NavItems";
import { Menu } from "iconsax-react";
import MenuTrigger from "../Buttons/MenuTrigger";
import RequestQuoteButton from "../Buttons/RequestQuoteButton";

const TopNav = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink text-white">
      <div className="mx-auto flex h-20 max-w-[1180px] items-center justify-between gap-6 px-6 lg:px-12">
        <Logo withText />
        <NavItems />
        <div className="flex items-center gap-4">
          <div className="hidden xs:block">
            <RequestQuoteButton />
          </div>
          <MenuTrigger>
            <Menu
              size={32}
              variant="Bulk"
              className="text-primary-normal
            lg:hidden"
            />
          </MenuTrigger>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
