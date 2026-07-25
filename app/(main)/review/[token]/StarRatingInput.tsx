"use client";

import { Star1 } from "iconsax-react";
import { useState } from "react";

import FieldError from "@/app/components/Inputs/FieldError";
import Text from "@/app/components/Generics/Text";

interface Props {
  name: string;
  error?: string;
}

const LABELS = ["Poor", "Fair", "Good", "Very good", "Excellent"];

/**
 * Whole-star rating picker.
 *
 * Built on a real radio group rather than buttons, so it is keyboard navigable
 * with arrow keys, announced correctly by screen readers, and submits with the
 * form even if the JS hover preview never hydrates.
 */
const StarRatingInput = ({ name, error }: Readonly<Props>) => {
  const [value, setValue] = useState(0);
  const [hovered, setHovered] = useState(0);

  const shown = hovered || value;

  return (
    <div>
      <fieldset onMouseLeave={() => setHovered(0)}>
        <legend className="sr-only">Overall rating, 1 to 5 stars</legend>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <label
              key={star}
              onMouseEnter={() => setHovered(star)}
              className="cursor-pointer p-1"
            >
              <input
                type="radio"
                name={name}
                value={star}
                checked={value === star}
                onChange={() => setValue(star)}
                className="peer sr-only"
              />
              <span
                className="block rounded peer-focus-visible:ring-2
                peer-focus-visible:ring-primary-normal
                peer-focus-visible:ring-offset-2"
              >
                <Star1
                  variant="Bold"
                  size={32}
                  className={`duration-150 ${
                    star <= shown ? "text-orange-400" : "text-gray-300"
                  }`}
                />
              </span>
              <span className="sr-only">
                {star} star{star > 1 ? "s" : ""}, {LABELS[star - 1]}
              </span>
            </label>
          ))}

          {shown > 0 && (
            <Text inline styles="ml-3" color="gray">
              {LABELS[shown - 1]}
            </Text>
          )}
        </div>
      </fieldset>
      <FieldError message={error} />
    </div>
  );
};

export default StarRatingInput;
