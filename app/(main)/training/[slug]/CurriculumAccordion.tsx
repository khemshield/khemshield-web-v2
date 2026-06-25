"use client";

import { useState } from "react";
import { ArrowDown2 } from "iconsax-react";
import type { CoursePhaseView } from "../course.api";

const CurriculumAccordion = ({ phases }: { phases: CoursePhaseView[] }) => {
  // First phase open by default; each can be toggled independently.
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <ol className="mt-7 flex flex-col gap-4">
      {phases.map((phase, i) => {
        const isOpen = open.has(i);
        return (
          <li
            key={phase.title}
            className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-khemshadow"
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light font-mono text-sm font-semibold text-primary-normal">
                {(i + 1).toString().padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-lg font-bold text-secondary-normal">
                  {phase.title}
                </span>
                {phase.subtitle && (
                  <span className="mt-0.5 block text-sm text-[#8C94A3]">
                    {phase.subtitle}
                  </span>
                )}
              </span>
              <ArrowDown2
                size={18}
                className={`shrink-0 text-secondary-normal transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-6 pl-[4.25rem] sm:px-6 sm:pl-[5rem]">
                <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                  {phase.topics.map((t) => (
                    <li
                      key={t}
                      className="flex gap-2 text-sm text-secondary-normal"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-normal" />
                      {t}
                    </li>
                  ))}
                </ul>
                {phase.tools && phase.tools.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {phase.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full bg-support px-2.5 py-1 font-mono text-[0.66rem] text-secondary-normal"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default CurriculumAccordion;
