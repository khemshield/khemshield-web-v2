import React from "react";
import styles from "./EventOngoing.module.css";

const EventOngoing = () => {
  return (
    <div className="flex items-center gap-1">
      <div className=" h-20 w-20 relative">
        <div className={`${styles.growAndFadeCircle1} bg-primary-normal`}></div>
        <div
          className={`${styles.growAndFadeCircle2}  bg-primary-normal`}
        ></div>
        <div className={`${styles.growAndFadeCircle3} bg-primary-normal`}></div>
      </div>
      <p className=" text-xl animate-pulse text-primary-dark">ongoing</p>
    </div>
  );
};

export default EventOngoing;
