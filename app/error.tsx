"use client";

import React from "react";
import Button from "./components/Buttons/Button";
import ContentSpacing from "./components/Spacing/ContentSpacing";

interface Props {
  error: Error;
  reset: () => void;
}
const error = ({ error, reset }: Readonly<Props>) => {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-800 font-bold text-2xl">
                It seems we&apos;ve encountered an unexpected issue. This could
                be due to a server failure or a connection problem.
              </h1>
              <p className="my-2 text-gray-800">
                Please try refreshing the page.
              </p>
              <ContentSpacing />
              <Button variant="primary" onClick={reset}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default error;
