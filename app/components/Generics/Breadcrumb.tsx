import React from "react";
import Wrapper from "./Wrapper";
import Text from "./Text";
import NavLink from "../Navigation/NavLink";
import Heading from "./Heading";

interface Props {
  crumbs: { href: string; text: string }[];
  heading?: string;
}
const Breadcrumb = ({ crumbs, heading }: Props) => {
  return (
    <header className="hidden lg:block">
      <Wrapper styles="flex items-center h-28 bg-support justify-between">
        <ul className="flex items-center gap-3 min-w-[50%]">
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          {crumbs.map(({ text, href }, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <li key={text + index} className="flex items-center">
                <div
                  className=" border-[7px] border-secondary-normal 
              border-t-transparent border-b-transparent border-r-transparent"
                ></div>
                <NavLink href={href} bold={isLast} disabled={isLast}>
                  {text}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="min-w-[50%]">
          <Heading variant="h4">
            {heading || heading?.length == 0
              ? heading
              : crumbs[crumbs.length - 1].text}
          </Heading>
        </div>
      </Wrapper>
    </header>
  );
};

export default Breadcrumb;
