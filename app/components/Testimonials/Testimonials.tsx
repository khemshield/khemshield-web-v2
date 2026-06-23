"use client";

import { testimonialsData } from "@/app/data/testimonials";
import { useRef, useState } from "react";
import Wrapper from "../Generics/Wrapper";
import ContentSpacing from "../Spacing/ContentSpacing";
import Testimonial from "./Testimonial";

const Testimonials = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const container = testimonialsRef.current;
    if (!container) return;
    // Find the slide whose center is closest to the container's center.
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    let closest = 0;
    let closestDistance = Infinity;
    Array.from(container.children).forEach((child, i) => {
      const childRect = child.getBoundingClientRect();
      const childCenter = childRect.left + childRect.width / 2;
      const distance = Math.abs(childCenter - containerCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = i;
      }
    });
    setActiveIndex(closest);
  };

  const scrollToIndex = (index: number) => {
    const container = testimonialsRef.current;
    const target = container?.children[index] as HTMLElement | undefined;
    if (container && target) {
      const delta =
        target.getBoundingClientRect().left -
        container.getBoundingClientRect().left;
      container.scrollTo({
        left: container.scrollLeft + delta,
        behavior: "smooth",
      });
    }
  };

  return (
    <Wrapper>
      <section
        onScroll={handleScroll}
        ref={testimonialsRef}
        className=" flex overflow-x-auto has-hidden-scrollbar
        scroll-snap-type-inline-mandatory overscroll-behavior-inline-contain"
      >
        {testimonialsData.map((testimonial) => (
          <Testimonial key={testimonial.user.name} testimonial={testimonial} />
        ))}
      </section>
      <ContentSpacing />
      <div className=" w-max m-auto flex gap-2">
        {testimonialsData.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={activeIndex === i}
            onClick={() => scrollToIndex(i)}
            className={`${
              activeIndex === i
                ? "bg-primary-normal w-8 h-3"
                : "bg-primary-light  w-3 h-3"
            }  rounded-lg duration-200`}
          ></button>
        ))}
      </div>
    </Wrapper>
  );
};

export default Testimonials;
