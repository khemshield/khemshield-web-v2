import { PropsWithChildren } from "react";

const NormSpacing = ({ children }: Readonly<PropsWithChildren>) => {
  return <div className=" my-6">{children}</div>;
};

export default NormSpacing;
