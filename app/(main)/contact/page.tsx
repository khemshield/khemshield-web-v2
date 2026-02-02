import Breadcrumb from "@/app/components/Generics/Breadcrumb";
import HeaderContent from "@/app/components/Generics/HeaderContent";
import Text from "@/app/components/Generics/Text";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import ContactForm from "./ContactForm";

const ContactPage = () => {
  return (
    <section>
      <Breadcrumb
        crumbs={[{ href: "", text: "Contact" }]}
        heading="Contact Us"
      />
      <ContentSpacing />
      <HeaderContent heading="Talk to Us" center>
        Let us know how we can help and we will get right back to you
      </HeaderContent>
      <ContentSpacing />
      <section
        className="flex flex-col justify-center items-center gap-5
       lg:flex-row"
      >
        <div className="min-w-[230px] max-w-[230px] py-2 text-center border border-primary-normal rounded-lg">
          <Text>Email Us</Text>
          <Text variant="semibold">contact@khemshield.com</Text>
        </div>

        <div className="min-w-[230px] max-w-[230px] py-2 text-center border border-primary-normal rounded-lg">
          <Text>Call us</Text>
          <Text variant="semibold">+234 810 261 8131</Text>
        </div>
      </section>
      <ContentSpacing />
      <ContactForm />
    </section>
  );
};

export default ContactPage;
