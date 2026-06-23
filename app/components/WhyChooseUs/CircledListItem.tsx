import { PropsWithChildren } from "react";
import Heading from "../Generics/Heading";
import Text from "../Generics/Text";
import BaseSpacing from "../Spacing/BaseSpacing";

interface Props {
  heading: string;
  number: number;
}
const CircledListItem = ({
  number,
  heading,
  children,
}: Readonly<PropsWithChildren<Props>>) => {
  return (
    <li className="flex gap-4 border-b border-black/[0.07] py-5 last:border-0">
      <div
        className="flex h-9 min-h-9 w-9 min-w-9 items-center justify-center
        rounded-full bg-primary-light font-mono text-sm font-semibold text-primary-normal"
      >
        {number}
      </div>
      <div>
        <Heading variant="h4">{heading}</Heading>
        <BaseSpacing />
        <Text>{children}</Text>
      </div>
    </li>
  );
};

export default CircledListItem;
