import HeaderContent from "@/app/components/Generics/HeaderContent";
import FormInput from "@/app/components/Inputs/FormInput";
import GroupInput from "@/app/components/Inputs/GroupInput";
import Label from "@/app/components/Inputs/Label";
import SelectInput from "@/app/components/Inputs/SelectInput";
import TextArea from "@/app/components/Inputs/TextArea";
import type { Metadata } from "next";
import BaseSpacing from "@/app/components/Spacing/BaseSpacing";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import React from "react";

export const metadata: Metadata = {
  title: "Start Your Request",
  description:
    "Tell Khemshield about your project and we will get back to you with a personalized quote tailored to your needs.",
  robots: { index: false, follow: true },
};

const page = () => {
  return (
    <>
      <HeaderContent heading="Let’s Start Building Your Solution" center>
        Complete the form below, and we&apos;ll get back to you shortly with a
        personalized quote tailored to your needs.
      </HeaderContent>
      <ContentSpacing />
      <section
        className=" m-auto flex justify-center 
      lg:w-[80%]"
      >
        <form action="">
          <GroupInput>
            <Label label="Enter your full name" labelFor="fullname">
              <FormInput variant="name" id="fullname" />
            </Label>
            <Label label="Email Address" labelFor="email">
              <FormInput variant="email" />
            </Label>
          </GroupInput>
          <BaseSpacing />
          <GroupInput>
            <Label label="Phone number" labelFor="phone">
              <FormInput variant="phone" id="phone" />
            </Label>
            <Label label="Service Required" labelFor="service">
              <SelectInput
                options={[
                  {
                    label: "Cybersecurity Consulting",
                    value: "Cybersecurity Consulting",
                  },
                  {
                    label: "Personalized Solution",
                    value: "Personalized Solution",
                  },
                  {
                    label: "Training",
                    value: "Training",
                  },
                  {
                    label: "Mentorship",
                    value: "Mentorship",
                  },
                ]}
              />
            </Label>
          </GroupInput>
          <BaseSpacing />
          <GroupInput>
            <Label label="Preferred Start Date" labelFor="date">
              <FormInput variant="date" id="date" />
            </Label>
            <Label label="Budget Range (Optional)" labelFor="email">
              <FormInput placeholder="Enter your budget range" />
            </Label>
          </GroupInput>
          <BaseSpacing />
          <Label label="Company Name (if applicable)">
            <FormInput placeholder="Enter your company name" />
          </Label>
          <BaseSpacing />
          <Label label="Upload any document that will help us understand your project better">
            <input type="file" />
          </Label>
          <BaseSpacing />
          <Label label="Project or Training Description">
            <TextArea placeholder="Enter a detailed description of your project" />
          </Label>
        </form>
      </section>
    </>
  );
};

export default page;
