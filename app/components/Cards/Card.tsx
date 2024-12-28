import { PropsWithChildren } from "react";

const Card = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <section className="shadow-khemshadow rounded-2xl">{children}</section>
  );
};

export default Card;
