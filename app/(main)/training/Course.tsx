import Heading from "@/app/components/Generics/Heading";
import Text from "@/app/components/Generics/Text";
import BaseSpacing from "@/app/components/Spacing/BaseSpacing";
import { formatNumber } from "@/app/lib/formatNumber";
import { Star1 } from "iconsax-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface Props {
  slug: string;
  image: StaticImageData;
  price: number;
  name: string;
  rating: number;
  category: string;
}

const Course = ({
  slug,
  name,
  price,
  rating,
  image,
  category,
}: Props) => {
  return (
    <Link href={`/training/${slug}`} className="group block h-full">
      <article
        className="flex h-full flex-col overflow-hidden rounded-2xl bg-white
        shadow-khemshadow ring-1 ring-secondary-light/60 transition-all duration-300
        hover:-translate-y-1 hover:shadow-[0_14px_46px_0_rgba(0,0,0,0.10)] lg:max-w-[400px]"
      >
        <div className="overflow-hidden">
          <Image
            src={image}
            alt={name}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="bg-primary-light px-[6px] py-1">
              <Text color="primary">{category}</Text>
            </div>
            <Heading variant="h4">{formatNumber(price)}</Heading>
          </div>
          <BaseSpacing />
          <Heading variant="h4">
            <span className="transition-colors group-hover:text-primary-normal">
              {name}
            </span>
          </Heading>
          <BaseSpacing />
          <div className="mt-auto flex items-center gap-1 pt-2">
            <Star1 size={16} variant="Bold" className="text-orange-400" />
            <span>{rating}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Course;
