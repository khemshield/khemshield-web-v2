import BaseSpacing from "@/app/components/Spacing/BaseSpacing";
import { PlayCircle, Profile2User, Star1 } from "iconsax-react";
import Image, { StaticImageData } from "next/image";
import Text from "@/app/components/Generics/Text";
import Heading from "@/app/components/Generics/Heading";

interface Props {
  instructor: {
    name: string;
    image: string | StaticImageData;
    description: string;
  };
}

const CourseInstructor = ({
  instructor: { name, image, description },
}: Readonly<Props>) => {
  return (
    <article className="flex gap-7 scroll-snap-align-start p-8 rounded-xl border">
      <div
        className="min-w-[65px] min-h-[65px]
      
      lg:min-w-[138px] lg:min-h-[138px]"
      >
        <Image
          src={image}
          alt={name}
          className="w-[65px] h-[65px] rounded-full object-cover
          lg:w-[138px] lg:h-[138px]"
        />
      </div>

      <div>
        <div>
          <Heading variant="h4">{name}</Heading>
          <Text>Entrepreneur & Designer</Text>
        </div>
        <BaseSpacing />
        <div className="flex items-center gap-1">
          <Star1 variant="Bold" className=" text-orange-400" size={20} />
          <Star1 variant="Bold" className=" text-orange-400" size={20} />
          <Star1 variant="Bold" className=" text-orange-400" size={20} />
          <Star1 variant="Bold" className=" text-orange-400" size={20} />
          <Star1 variant="Bold" className=" text-orange-400" size={20} />
        </div>
        <BaseSpacing />
        <div>
          <div className="flex items-center gap-2">
            <Profile2User size="24" className=" text-blue-400" />
            <div className="flex items-center gap-1">
              <Text variant="semibold">5,342</Text> <Text>Students</Text>
            </div>
          </div>
          <BaseSpacing />
          <div className="flex items-center gap-2">
            <PlayCircle
              size="24"
              variant="Bold"
              className=" text-primary-normal"
            />

            <div className="flex items-center gap-1">
              <Text variant="semibold">01</Text> <Text>Course</Text>
            </div>
          </div>
          <BaseSpacing />
          <Text>
            {description}{" "}
            <button className=" text-primary-normal">Read more</button>
          </Text>
        </div>
        <BaseSpacing />
      </div>
    </article>
  );
};

export default CourseInstructor;
