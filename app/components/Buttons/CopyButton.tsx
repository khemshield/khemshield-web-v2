"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import ButtonSecondLight from "./ButtonSecondLight";
import { toast } from "sonner";

const CopyButton = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [fullUrl, setFullUrl] = useState("");

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      toast.message("Link copied to clipboard", { position: "top-center" });
    } catch (err) {}
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const baseUrl = window.location.origin;
      const query = searchParams.toString(); // Convert search params to string
      const fullUrlWithQuery = `${baseUrl}${pathname}${
        query ? `?${query}` : ""
      }`;
      setFullUrl(fullUrlWithQuery);
    }
  }, [pathname, searchParams]);

  return (
    <ButtonSecondLight onClick={copyText}>
      <div className=" flex gap-2 items-center">
        <IoCopyOutline size={24} className=" rotate-90" />
        <span>Copy link</span>
      </div>
    </ButtonSecondLight>
  );
};

export default CopyButton;
