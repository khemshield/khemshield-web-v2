import HeaderContent from "../Generics/HeaderContent";
import Wrapper from "../Generics/Wrapper";
import ContentSpacing from "../Spacing/ContentSpacing";
import Services from "./Services";

const OurServices = () => {
  return (
    <Wrapper>
      <HeaderContent heading="Services we offer for you" center>
        End-to-end cybersecurity and AI services, from defending your systems to building secure, AI-powered software on solid cloud foundations.
      </HeaderContent>
      <ContentSpacing />
      <Services />
    </Wrapper>
  );
};

export default OurServices;
