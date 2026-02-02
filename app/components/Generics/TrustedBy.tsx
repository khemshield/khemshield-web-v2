import Image from "next/image";
import ContentSpacing from "../Spacing/ContentSpacing";
import HeaderContent from "./HeaderContent";

import partner_1 from "@/public/assets/images/partners/partner_1.png";
import partner_2 from "@/public/assets/images/partners/partner_2.png";
import partner_3 from "@/public/assets/images/partners/partner_3.png";
import partner_4 from "@/public/assets/images/partners/partner_4.png";
import partner_5 from "@/public/assets/images/partners/partner_5.png";
import partner_6 from "@/public/assets/images/partners/partner_6.png";
import partner_7 from "@/public/assets/images/partners/partner_7.png";
import partner_8 from "@/public/assets/images/partners/partner_8.png";

const partners = [
  partner_1,
  partner_2,
  partner_3,
  partner_4,
  partner_5,
  partner_6,
  partner_7,
  partner_8,
  // partner_9,
];

const TrustedBy = () => {
  return (
    <section>
      <HeaderContent heading="Trusted by Leading Companies" center>
        We&apos;re proud to have partnered with some of the industry&apos;s top
        organizations, delivering secure IT solutions and training that make a
        difference. Here are just a few of the companies that trust us to
        protect their infrastructure and develop their talent.
      </HeaderContent>
      <ContentSpacing />
      <div
        className="whitespace-nowrap flex gap-8 py-4 overflow-hidden relative
        animation-play-state-paused-group

        before:content-[''] before:top-0 before:bottom-0 before:left-0 
        before:w-20 before:z-10 before:absolute
        before:bg-gradient-to-left-transparent-white
      
        after:content-[''] after:top-0 after:bottom-0 after:right-0 
        after:w-20 after:z-10 after:absolute
        after:bg-gradient-to-right-transparent-white"
      >
        <ul
          className="flex items-center gap-8 justify-between 
        flex-nowrap animate-slide-infinte animation-play-state-paused"
        >
          {partners.map((partner, index) => (
            <li key={index}>
              <Image
                src={partner}
                alt={`Partner ${index + 1}`}
                className="h-24 min-w-28 object-contain hover:scale-105"
              />
            </li>
          ))}
        </ul>

        <ul
          className="flex items-center gap-8 justify-between
        flex-nowrap animate-slide-infinte animation-play-state-paused"
        >
          {partners.map((partner, index) => (
            <li key={index}>
              <Image
                src={partner}
                alt={`Partner ${index + 1}`}
                className="h-24 min-w-28 object-contain hover:scale-105"
              />
            </li>
          ))}
        </ul>
        <ul
          className="items-center gap-8 justify-between hidden lg:flex
        flex-nowrap animate-slide-infinte animation-play-state-paused"
        >
          {partners.map((partner, index) => (
            <li key={index}>
              <Image
                src={partner}
                alt={`Partner ${index + 1}`}
                className="h-24 min-w-28 object-contain hover:scale-105"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrustedBy;
