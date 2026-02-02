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
import { useState, useEffect } from "react";
import { toast } from "sonner";
import FormSubmitButton from "@/app/components/Buttons/FormSubmitButton";

const ContactForm = () => {
  const router = useRouter();

  const [state, contactActionForm] = useFormState(contactAction, {
    message: "",
  });

  // Local state to manually reset the message
  const [hasError, setHasError] = useState(false);

  // Local state to manually reset the message
  useEffect(() => {
    if (state?.message) {
      // Safely check if state and message exist
      if (state.message.toLowerCase() !== "ok") {
        toast.error(state.message, { position: "top-center" });
        setHasError(true);
      } else if (state.message.toLowerCase() === "ok") {
        toast.success(
          `Thank you for registering for the Virtual Training in Web Development and Cybersecurity!`,
          { position: "top-center", duration: 5000 }
        );
        router.replace("/");
      }
    }
  }, [state?.message, router]);

  useEffect(() => {
    if (hasError) {
      // Reset the message after showing the error
      if (state?.message) state.message = "";
      setHasError(false);
    }
  }, [hasError, state]);

  // TODO: Compare above
  // useEffect(() => {
  //   try {
  //     if (state && state.message) {
  //       if (state.message.toLowerCase() !== "ok") {
  //         toast.error(state.message, { position: "top-center" });
  //         // Set the error state to true to trigger the reset
  //         setHasError(true);
  //       }

  //       if (state.message.toLowerCase() === "ok") {
  //         toast.success(
  //           `Thank you for reaching out! We've received your message and will get back to you shortly.`,
  //           {
  //             position: "top-center",
  //             duration: 5000,
  //           }
  //         );
  //         router.replace("/");
  //       }
  //     }
  //   } catch (error) {
  //     console.log("EventRegisterForm message", error);
  //   }
  // }, [state.message]);

  // useEffect(() => {
  //   try {
  //     if (hasError) {
  //       // Reset the message after showing the error
  //       state.message = "";
  //       setHasError(false);
  //     }
  //   } catch (error) {
  //     console.log("EventRegisterForm hasError", error);
  //   }
  // }, [hasError, state]);

  return (
    <section
      className="m-auto max-w-[95%] px-8 py-16 shadow-khemshadow
    lg:max-w-[830px] lg:px-32"
    >
      <ContactFormHeader />
      <ContentSpacing />
      <form action={contactActionForm}>
        <Label label="Full Name" labelFor="name">
          <FormInput
            variant="name"
            placeholder="Enter your full name"
            id="name"
            name="fullName"
          />
        </Label>
        <BaseSpacing />
        <Label label="Email Address" labelFor="email">
          <FormInput variant="email" id="email" name="email" />
        </Label>
        <BaseSpacing />
        <Label label="Phone Number" labelFor="phone">
          <FormInput variant="phone" id="phone" name="phone" />
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
        </Label>
        <BaseSpacing />
        <Label label="Send Us a Message" labelFor="description">
          <TextArea placeholder="Write Your Message" name="message" />
        </Label>
        <ContentSpacing />
        <FormSubmitButton>Send</FormSubmitButton>
      </form>
    </section>
  );
};

export default ContactForm;
