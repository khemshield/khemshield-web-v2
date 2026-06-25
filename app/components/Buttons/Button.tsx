import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type CommonProps = {
  variant: ButtonVariantType;
  full?: boolean;
  styles?: string;
  shouldDisable?: boolean;
};

// Attributes specific to button
interface ButtonAttributes extends ButtonHTMLAttributes<HTMLButtonElement> {
  elementType?: "button";
}

// Attributes specific to link
interface LinkAttributes extends AnchorHTMLAttributes<HTMLAnchorElement> {
  elementType?: "link";
  href: string;
}

type Props = CommonProps & (ButtonAttributes | LinkAttributes);

type ButtonVariantType = "primary" | "border";

const Button = ({
  children,
  variant,
  elementType,
  full,
  styles,
  shouldDisable,
  ...rest
}: Readonly<Props>) => {
  const baseStyle = `${styles} inline-flex items-center justify-center gap-2 whitespace-nowrap ${
    full ? "w-full" : ""
  } py-2.5 px-5 rounded-full font-semibold
  transition-all duration-200
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-normal focus-visible:ring-offset-2
  disabled:cursor-not-allowed`;

  const btnStyle: { [key in ButtonVariantType]: string } = {
    primary: `${
      shouldDisable
        ? "bg-gray-300 text-secondary-normal/50 cursor-not-allowed"
        : "bg-primary-normal text-white shadow-[0_8px_26px_rgba(244,51,52,0.28)] hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-[0_12px_34px_rgba(244,51,52,0.34)]"
    } `,
    border: `${
      shouldDisable
        ? "border border-gray-300 text-secondary-normal/50 cursor-not-allowed"
        : "border border-secondary-normal/25 text-secondary-normal hover:border-secondary-normal hover:-translate-y-0.5"
    }`,
  };

  switch (elementType) {
    case "link": {
      const resprops = rest as LinkAttributes;
      return (
        <Link {...resprops} className={`${btnStyle[variant]} ${baseStyle}`}>
          {children}
        </Link>
      );
    }

    default: {
      const resprops = rest as ButtonAttributes;
      return (
        <button {...resprops} className={`${btnStyle[variant]} ${baseStyle}`}>
          {children}
        </button>
      );
    }
  }
};

export default Button;
