import Heading from "@/app/components/Generics/Heading";
import Text from "@/app/components/Generics/Text";
import BaseSpacing from "@/app/components/Spacing/BaseSpacing";
import { formatNumber } from "@/app/lib/formatNumber";
import { Star1, User } from "iconsax-react";
import Image, { StaticImageData } from "next/image";

interface Props {
  image: StaticImageData;
  price: number;
  name: string;
  rating: number;
  review_count: number;
  category: string;
}

const Course = ({
  name,
  price,
  rating,
  review_count,
  image,
  category,
}: Props) => {
  return (
    <article className=" shadow-khemshadow lg:w-[400px] ">
      <Image
        src={image}
        alt="Mobile App"
        className="w-full h-60 object-cover rounded-t-lg"
      />
      <div className=" py-3 px-6">
        <div className="flex items-center justify-between">
          <div className="py-1 px-[6px] bg-primary-light ">
            <Text color="primary">{category}</Text>
          </div>
          <Heading variant="h4">{formatNumber(price)}</Heading>
        </div>
        <BaseSpacing />
        <Heading variant="h4" styles="line-clamp-2">
          {name}
        </Heading>
        <BaseSpacing />
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center">
            <Star1 size={16} variant="Bold" className=" text-orange-400" />
            <span>{rating}</span>
          </div>

          <div className=" flex items-center gap-1">
            <User size={20} className=" text-blue-400" />
            <Text>{formatNumber(review_count, { decimal: true })}</Text>
            <Text color="gray"> students</Text>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Course;
