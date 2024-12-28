import Image from "next/image";
import uiux from "@/public/assets/images/training/uiux.jpg";

const CourseThumbnailTrailer = () => {
  return (
    <section className=" h-full">
      <Image
        src={uiux}
        alt="Course thumbnail"
        className=" 
        object-cover w-full h-[322px]
        lg:w-full lg:h-full"
      />
    </section>
  );
};

export default CourseThumbnailTrailer;
