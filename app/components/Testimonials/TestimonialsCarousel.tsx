"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";

interface Props {
  /** Number of slides, so the dot row can be rendered without inspecting DOM. */
  count: number;
  children: ReactNode;
}

/**
 * Scroll-snap carousel with dot navigation.
 *
 * Only the scroll tracking needs the client, so the slides themselves stay
 * server-rendered and are passed in as children.
 */
const TestimonialsCarousel = ({ count, children }: Readonly<Props>) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll fires many times per gesture and each pass measures every slide, so
  // the work is coalesced into one frame rather than run per event.
  const handleScroll = useCallback(() => {
    if (frameRef.current !== null) return;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;

      const track = trackRef.current;
      if (!track) return;

      const trackBox = track.getBoundingClientRect();
      const trackCentre = trackBox.left + trackBox.width / 2;

      let closest = 0;
      let closestDistance = Infinity;

      Array.from(track.children).forEach((slide, index) => {
        const box = slide.getBoundingClientRect();
        const distance = Math.abs(box.left + box.width / 2 - trackCentre);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = index;
        }
      });

      setActiveIndex(closest);
    });
  }, []);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    const target = track?.children[index] as HTMLElement | undefined;
    if (!track || !target) return;

    const delta =
      target.getBoundingClientRect().left - track.getBoundingClientRect().left;

    track.scrollTo({ left: track.scrollLeft + delta, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto has-hidden-scrollbar
        scroll-snap-type-inline-mandatory overscroll-behavior-inline-contain"
      >
        {children}
      </div>

      {count > 1 && (
        <div className="m-auto mt-10 flex w-max gap-2">
          {Array.from({ length: count }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to testimonial ${index + 1} of ${count}`}
              aria-current={activeIndex === index}
              onClick={() => scrollToIndex(index)}
              className={`${
                activeIndex === index
                  ? "h-3 w-8 bg-primary-normal"
                  : "h-3 w-3 bg-primary-light"
              } rounded-lg duration-200`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsCarousel;
