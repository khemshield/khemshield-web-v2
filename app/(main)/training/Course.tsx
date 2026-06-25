import Heading from "@/app/components/Generics/Heading";
import Text from "@/app/components/Generics/Text";
import { formatNumber } from "@/app/lib/formatNumber";
import { Star1 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  slug: string;
  image: string;
  price: number;
  name: string;
  rating: number;
  category: string;
  tagline?: string;
  level?: string;
  duration?: string;
}

const Course = ({
  slug,
  name,
  price,
  rating,
  image,
  category,
  tagline,
  level,
  duration,
}: Props) => {
  return (
    <Link href={`/training/${slug}`} className="group block h-full">
      <article
        className="flex h-full flex-col overflow-hidden rounded-2xl bg-white
        shadow-khemshadow ring-1 ring-secondary-light/60 transition-all duration-300
        hover:-translate-y-1 hover:shadow-[0_14px_46px_0_rgba(0,0,0,0.10)] lg:max-w-[400px]"
      >
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 1024px) 100vw, 400px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col px-6 py-5">
          <div className="self-start rounded-full bg-primary-light px-3 py-1">
            <Text color="primary" variant="semibold" type="caption">
              {category}
            </Text>
          </div>

          <Heading variant="h4" styles="mt-3">
            <span className="transition-colors group-hover:text-primary-normal">
              {name}
            </span>
          </Heading>

          {tagline && (
            <Text color="gray" styles="mt-2 line-clamp-2 text-sm">
              {tagline}
            </Text>
          )}

          <div className="mt-auto pt-4">
            <div className="flex items-center gap-2 text-sm text-[#8C94A3]">
              <span className="flex items-center gap-1 font-medium text-secondary-normal">
                <Star1 size={15} variant="Bold" className="text-orange-400" />
                {rating}
              </span>
              {duration && (
                <>
                  <span aria-hidden>&middot;</span>
                  <span>{duration}</span>
                </>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between">
              {level ? (
                <Text color="gray" styles="text-sm">
                  {level}
                </Text>
              ) : (
                <span />
              )}
              <Text variant="bold" styles="text-lg">
                {formatNumber(price)}
              </Text>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Course;
