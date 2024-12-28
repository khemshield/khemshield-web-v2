"use client";

import { IoShareSocialOutline } from "react-icons/io5";
import ButtonSecondLight from "./ButtonSecondLight";

const ShareButton = () => {
  const handleShare = async () => {
    if (navigator.share && navigator.canShare({ url: location.href })) {
      await navigator.share({
        title: "Beautiful Products",
        url: ``,
        text:
          "I realy love this product: " + `title` + ", kindly check it out.",
      });
    } else {
      console.log("Your browser doesn't support native share");
    }
  };

  return (
    <ButtonSecondLight onClick={handleShare}>
      <IoShareSocialOutline size={24} />
    </ButtonSecondLight>
  );
};

export default ShareButton;
