"use client";

import { ArrowDown2 } from "iconsax-react";
import { useState } from "react";

const listCur = [
  "Course outline",
  "Designers vs Developers",
  "Design resources",
  "Meet the client",
  "Practice Project",
];

const Curriculum = () => {
  const [shouldExpand, setShouldExpand] = useState(false);

  return (
    <section className=" border px-4">
      <header
        onClick={() => setShouldExpand(!shouldExpand)}
        className="flex items-center gap-2 py-4 cursor-pointer"
      >
        <ArrowDown2
          className={`${
            shouldExpand
              ? "rotate-180 text-primary-normal font-semibold"
              : " rotate-0"
          } duration-300`}
        />
        <p
          className={`${
            shouldExpand ? " text-primary-normal font-semibold" : ""
          } duration-300`}
        >
          Get started
        </p>
      </header>

      <ul
        className={`${
          shouldExpand ? "max-h-[500px] duration-1000" : "max-h-0 duration-300"
        } overflow-hidden `}
      >
        {listCur.map((item) => (
          <li key={item} className="mb-[14px]">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Curriculum;
