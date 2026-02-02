import React from "react";
import BottomNavItems from "./BottomNavItems";

const BottomNav = () => {
  return (
    <div className="h-8 lg:hidden">
      <nav
        className="fixed bottom-0 right-0 left-0 w-full bg-white flex justify-evenly z-40
      py-2 items-center rounded-t-lg border"
      >
        <BottomNavItems />
      </nav>
    </div>
  );
};

export default BottomNav;
