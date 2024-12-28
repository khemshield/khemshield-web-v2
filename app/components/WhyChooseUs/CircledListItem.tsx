import { PropsWithChildren } from "react";
import Heading from "../Generics/Heading";
import Text from "../Generics/Text";
import BaseSpacing from "../Spacing/BaseSpacing";
import ListItem from "../Generics/ListItem";

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
    <ListItem
      doubleGap
      heading={heading}
      icon={
        <div
          className="h-9 min-h-9 min-w-9 w-9 rounded-full bg-primary-light flex 
            items-center justify-center text-primary-normal font-semibold"
        >
          {number}
        </div>
      }
    >
      {children}
    </ListItem>
  );
};

export default CircledListItem;
