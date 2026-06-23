import Image, { StaticImageData } from "next/image";
import React from "react";

import Link from "next/link";
import IconHolder from "../Generics/IconHolder";

export type SocialType = {
  src: StaticImageData;
  alt: string;
  href: string;
};

interface Props {
  socials: SocialType[];
}

const Socials = ({ socials }: Readonly<Props>) => {
  return (
    <ul className=" flex items-center gap-4">
      {socials.map(({ src, alt, href }) => (
        <li key={alt}>
          <Link href={href} target="_blank" rel="noopener noreferrer">
            <IconHolder>
              <Image src={src} alt={alt} className=" w-4 h-4 object-contain" />
            </IconHolder>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Socials;
