"use client";

import { ArrowDown2 } from "iconsax-react";
import { ReactNode, useState } from "react";

interface Props {
  text: string;
  items: ReactNode[];
}
const Dropdown = ({ text, items }: Readonly<Props>) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <li className="relative">
      <button
        className={`${showMenu && "text-primary-normal"} flex gap-4 py-2`}
        onClick={() => setShowMenu(!showMenu)}
      >
        <span>{text}</span> <ArrowDown2 />
      </button>

      <div
        className={`${
          showMenu
            ? "max-w-[200px] w-[200px] max-h-[400px]"
            : "max-w-0 w-0 max-h-0"
        } duration-300 absolute top-full z-50 overflow-hidden rounded-lg 
        bg-white shadow-khemshadow`}
      >
        <ul className={`w-max px-7 py-4 text-secondary-normal`}>
          {items.map((item, index) => (
            <li
              onClick={() => setShowMenu(false)}
              key={index}
              className="mb-6 last-of-type:mb-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Dropdown;
