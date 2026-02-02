import Button from "../Buttons/Button";
import Heading from "../Generics/Heading";
import Text from "../Generics/Text";
import VideoPlayer from "../Medias/VideoPlayer";
import BaseSpacing from "../Spacing/BaseSpacing";

const HomeBanner = () => {
  return (
    <section
      className="flex flex-col justify-between gap-24
    lg:flex-row"
    >
      <section className="lg:w-1/2 lg:pr-6">
        <p className=" text-primary-normal font-semibold">
          Welcome to Khemshield
        </p>
        <BaseSpacing />
        <Heading variant="h2">
          Your Partner in Secure IT Solutions and Skill Development
        </Heading>
        <Text styles="my-6">
          From developing secure web and mobile applications to comprehensive
          cybersecurity consulting and infrastructure protection, we ensure your
          business stays safe. We also offer specialized training programs for
          students eager to master these essential skills.
        </Text>
        <div className="flex flex-col xs:flex-row items-center gap-4">
          <Button
            elementType="link"
            href="/request"
            variant="primary"
            styles="text-xs md:text-sm lg:text-base py-4 lg:py-2"
          >
            Schedule a Consultation
          </Button>

          <Button
            elementType="link"
            href="/training"
            variant="border"
            styles="text-xs md:text-sm lg:text-base py-4 lg:py-2"
          >
            Explore Our Training Programs
          </Button>
        </div>
      </section>
      <VideoPlayer />
    </section>
  );
};

export default HomeBanner;
