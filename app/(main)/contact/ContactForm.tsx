"use client";

import Button from "@/app/components/Buttons/Button";
import FormInput from "@/app/components/Inputs/FormInput";
import Label from "@/app/components/Inputs/Label";
import SelectInput from "@/app/components/Inputs/SelectInput";
import TextArea from "@/app/components/Inputs/TextArea";
import BaseSpacing from "@/app/components/Spacing/BaseSpacing";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import ContactFormHeader from "./ContactFormHeader";
import { useFormState } from "react-dom";
import { contactAction } from "@/app/actions/contact";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import FormSubmitButton from "@/app/components/Buttons/FormSubmitButton";
import FieldError from "@/app/components/Inputs/FieldError";

const ContactForm = () => {
  const router = useRouter();

  const [state, contactActionForm] = useFormState(contactAction, {
    message: "",
  });

  useEffect(() => {
    if (state?.message?.toLowerCase() === "ok") {
      toast.success(
        `Thank you for reaching out! We've received your message and will get back to you shortly.`,
        { position: "top-center", duration: 5000 },
      );
      router.replace("/");
    }
  }, [state?.message, router]);

  const formError =
    state?.message && state.message.toLowerCase() !== "ok"
      ? state.message
      : "";

  return (
    <section
      className="m-auto max-w-[95%] px-8 py-16 shadow-khemshadow
    lg:max-w-[830px] lg:px-32"
    >
      <ContactFormHeader />
      <ContentSpacing />
      <form action={contactActionForm}>
        {formError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {formError}
          </div>
        )}
        <Label label="Full Name" labelFor="name">
          <FormInput
            variant="name"
            placeholder="Enter your full name"
            id="name"
            name="fullName"
            error={state.errors?.fullName}
          />
        </Label>
        <BaseSpacing />
        <Label label="Email Address" labelFor="email">
          <FormInput
            variant="email"
            id="email"
            name="email"
            error={state.errors?.email}
          />
        </Label>
        <BaseSpacing />
        <Label label="Phone Number" labelFor="phone">
          <FormInput
            variant="phone"
            id="phone"
            name="phone"
            error={state.errors?.phone}
          />
        </Label>
        <BaseSpacing />
        <Label label="What Can we help you with" labelFor="helpwith">
          <SelectInput
            name="helpwith"
            id="helpwith"
            options={[
              {
                label: "Personalized Training",
                value: "Personalized Training",
              },
              {
                label: "Personalized Solution",
                value: "Personalized Solution",
              },
              {
                label: "Mentorship",
                value: "Mentorship",
              },
              {
                label: "Others",
                value: "Others",
              },
            ]}
          />
          <FieldError message={state.errors?.helpwith} />
        </Label>
        <BaseSpacing />
        <Label label="Send Us a Message" labelFor="description">
          <TextArea placeholder="Write Your Message" name="message" />
          <FieldError message={state.errors?.message} />
        </Label>
        <ContentSpacing />
        <FormSubmitButton>Send</FormSubmitButton>
      </form>
    </section>
  );
};

export default ContactForm;
