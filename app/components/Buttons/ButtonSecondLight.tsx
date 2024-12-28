import { PropsWithChildren } from "react";

interface Props {
  onClick?: () => void;
  styles?: string;
}
const ButtonSecondLight = ({
  onClick,
  styles,
  children,
}: Readonly<PropsWithChildren<Props>>) => {
  return (
    <button
      onClick={onClick}
      className={`${styles} bg-secondary-light px-5 py-3`}
    >
      {children}
    </button>
  );
};

export default ButtonSecondLight;
