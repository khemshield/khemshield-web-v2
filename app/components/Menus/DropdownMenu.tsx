"use client";

import { ArrowDown2 } from "iconsax-react";
import { useEffect, useState } from "react";
import { IoCheckmark } from "react-icons/io5";

interface Props {
  items: string[];
  onSelectItem: (selectedItem: string) => void;
}
const DropdownMenu = ({ items, onSelectItem }: Readonly<Props>) => {
  const [selectedItem, setSelectedTIem] = useState(items[0]);
  const [openMenu, setOpenMenu] = useState(false);

  const handleSelectItem = (selectedItem: string) => {
    setSelectedTIem(selectedItem);
    onSelectItem(selectedItem);
    setOpenMenu(false);
  };

  return (
    <nav className="relative">
      <button
        onClick={() => setOpenMenu(!openMenu)}
        className="border py-2 px-4 rounded-lg flex 
        items-center gap-2 bg-primary-light/50 min-w-full"
      >
        <div className="flex justify-between min-w-full">
          <span>{selectedItem}</span>
          <ArrowDown2
            variant="Bulk"
            size={28}
            className=" text-primary-normal"
          />
        </div>
      </button>

      <ul
        className={`${
          openMenu
            ? "max-h-52 overflow-y-scroll has-scrollbar"
            : "max-h-0 h-0 overflow-hidden"
        } bg-white shadow-khemshadow absolute z-50 min-w-full my-1
          duration-200
          lg:min-w-max `}
      >
        {items.map((item) => {
          const isSelected = item === selectedItem;
          return (
            <li
              key={item}
              onClick={() => handleSelectItem(item)}
              className={`${
                isSelected && "bg-primary-light"
              } hover:bg-primary-light px-4 py-2 cursor-pointer
              flex gap-3 justify-between items-center`}
            >
              <span>{item}</span> {isSelected && <IoCheckmark size={22} />}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DropdownMenu;
