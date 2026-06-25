import Image from "next/image";
import { Star1, Clock, TickCircle, ShieldTick } from "iconsax-react";

import { formatNumber } from "@/app/lib/formatNumber";
import type { CourseView } from "../../course.api";

const CourseSummary = ({ course }: { course: CourseView }) => {
  const deposit = Math.round(course.price * 0.5);
  const included = course.outcomes?.slice(0, 4) ?? [];

  return (
    <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-khemshadow">
      <div className="relative h-40 w-full">
        <Image
          src={course.image}
          alt={course.name}
          fill
          sizes="380px"
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <span className="inline-block rounded-full bg-primary-light px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-primary-normal">
          {course.category}
        </span>

        <h2 className="mt-3 font-display text-xl font-extrabold leading-tight text-secondary-normal">
          {course.name}
        </h2>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#8C94A3]">
          <span className="flex items-center gap-1 font-medium text-secondary-normal">
            <Star1 size={15} variant="Bold" className="text-orange-400" />
            {course.rating}
          </span>
          {course.duration && (
            <span className="flex items-center gap-1">
              <Clock size={15} />
              {course.duration}
            </span>
          )}
          {course.level && <span>{course.level}</span>}
        </div>

        <div className="mt-5 border-t border-black/[0.07] pt-5">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-[#8C94A3]">Tuition</span>
            <span className="font-display text-2xl font-extrabold text-secondary-normal">
              {formatNumber(course.price)}
            </span>
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-sm text-[#8C94A3]">or 50% deposit</span>
            <span className="font-semibold text-secondary-normal">
              {formatNumber(deposit)}
            </span>
          </div>
        </div>

        {included.length > 0 && (
          <div className="mt-5 border-t border-black/[0.07] pt-5">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[#8C94A3]">
              What you&apos;ll gain
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {included.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm text-secondary-normal"
                >
                  <TickCircle
                    size={17}
                    variant="Bold"
                    className="mt-0.5 shrink-0 text-primary-normal"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-5 flex items-center gap-1.5 border-t border-black/[0.07] pt-4 text-xs text-[#8C94A3]">
          <ShieldTick size={15} variant="Bold" className="text-primary-normal" />
          Secure payment by card or bank transfer.
        </p>
      </div>
    </div>
  );
};

export default CourseSummary;
