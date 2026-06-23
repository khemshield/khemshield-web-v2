"use client";

import { useEffect, useRef, useState, VideoHTMLAttributes } from "react";
import PlayPauseButton from "../Buttons/PlayPauseButton";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ref = videoRef.current;
    if (ref) {
      if (isPlaying) {
        ref.play();
      } else {
        ref.pause();
      }
    }

    const handleEnded = () => setIsPlaying(false);

    ref?.addEventListener("ended", handleEnded);

    return () => ref?.removeEventListener("ended", handleEnded);
  }, [isPlaying]);

  return (
    <section
      className="group relative h-[300px] w-full overflow-hidden rounded-2xl
      bg-primary-light shadow-khemshadow sm:h-[380px] lg:h-[460px]"
    >
      <div
        className={`absolute inset-0 z-[1] transition-opacity duration-300
        ${isPlaying ? "opacity-0" : "bg-primary-dark/20 opacity-100"}`}
      ></div>
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <PlayPauseButton
          isPlaying={isPlaying}
          togglePlay={() => setIsPlaying(!isPlaying)}
        />
      </div>

      <video
        poster="/assets/images/training_1.jpg"
        ref={videoRef}
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/assets/videos/training_1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
};

export default VideoPlayer;
