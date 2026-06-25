import { InputHTMLAttributes, ReactNode } from "react";
import FieldError from "./FieldError";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  iconRight?: boolean;
  error?: string;
}

const Input = ({ icon, iconRight, error, ...rest }: Props) => {
  return (
    <div className="flex-grow">
      <div className="relative">
        <span
          className={`${
            iconRight ? " right-6" : " left-6 "
          } absolute text-2xl text-secondary-normal top-0 bottom-0
          flex justify-center items-center`}
        >
          {icon}
        </span>
        <input
          {...rest}
          aria-invalid={error ? true : undefined}
          className={`${icon ? "px-[3.8rem]" : "px-4"} border ${
            error ? "border-red-500" : "border-secondary-normal"
          } h-12 w-full min-w-full rounded-lg
          text-secondary-normal placeholder:text-secondary-normal`}
        />
      </div>
      <FieldError message={error} />
    </div>
  );
};

export default Input;
