import { PropsWithChildren, ReactNode } from "react";
import Heading from "./Heading";
import BaseSpacing from "../Spacing/BaseSpacing";
import Text from "./Text";

interface Props {
  icon?: ReactNode;
  heading?: string;
  doubleGap?: boolean;
  center?: boolean;
}

const ListItem = ({
  children,
  icon,
  heading,
  doubleGap,
  center,
}: Readonly<PropsWithChildren<Props>>) => {
  return (
    <li
      className={`${doubleGap ? "gap-4" : "gap-2"} ${
        center && "items-center"
      } flex my-2`}
    >
      {icon && <span>{icon}</span>}
      <div>
        {heading && (
          <>
            <Heading variant="h4">{heading}</Heading>
            <BaseSpacing />
          </>
        )}

        <Text>{children}</Text>
      </div>
    </li>
  );
};

export default ListItem;
