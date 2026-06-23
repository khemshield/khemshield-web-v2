import React from "react";
import Wrapper from "./Wrapper";
import NavLink from "../Navigation/NavLink";
import Heading from "./Heading";
import { ArrowRight2 } from "iconsax-react";

interface Props {
  crumbs: { href: string; text: string }[];
  heading?: string;
}
const Breadcrumb = ({ crumbs, heading }: Props) => {
  return (
    <header className="hidden bg-support lg:block">
      <Wrapper styles="flex items-center justify-between gap-8 py-10">
        <Heading variant="h3">
          {heading || crumbs[crumbs.length - 1].text}
        </Heading>
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-helper/70">
            <li>
              <NavLink href="/">Home</NavLink>
            </li>
            {crumbs.map(({ text, href }, index) => {
              const isLast = index === crumbs.length - 1;
              return (
                <li key={text + index} className="flex items-center gap-2">
                  <ArrowRight2
                    size={14}
                    className="shrink-0 text-secondary-normal/40"
                  />
                  <NavLink href={href} bold={isLast} disabled={isLast}>
                    {text}
                  </NavLink>
                </li>
              );
            })}
          </ol>
        </nav>
      </Wrapper>
    </header>
  );
};

export default Breadcrumb;
