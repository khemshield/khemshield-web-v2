"use client";

import { eventRegisterAction } from "@/app/actions/events";
import FormInput from "@/app/components/Inputs/FormInput";
import FormInputGroup from "@/app/components/Inputs/FormInputGroup";
import GroupInput from "@/app/components/Inputs/GroupInput";
import BaseSpacing from "@/app/components/Spacing/BaseSpacing";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import FormSubmitButton from "../../../../components/Buttons/FormSubmitButton";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { eventSlug } from "../../eventSlug";

const EventRegisterForm = () => {
  const router = useRouter();

  const [state, eventRegisterActionForm] = useFormState(eventRegisterAction, {
    message: "",
  });
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
          `Thank you for registering for the Virtual Training in Web Development and Cybersecurity. 
          An email with event details has been sent to you.`,
          { position: "top-center", duration: 5000 }
        );
        router.replace(`/event/${eventSlug}`);
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

  return (
    <form action={eventRegisterActionForm}>
      <FormInputGroup heading={"Contact Information"}>
        <GroupInput>
          <FormInput variant="email" name="email" />
          <FormInput variant="phone" name="phone" />
        </GroupInput>
        <BaseSpacing />
        <GroupInput>
          <FormInput
            variant="name"
            name="firstName"
            placeholder="Enter your first name"
          />
          <FormInput
            variant="name"
            name="lastName"
            placeholder="Enter your last name"
          />
        </GroupInput>
        <BaseSpacing />
        <GroupInput>
          <FormInput variant="address" name="address" />
          <FormInput
            variant="address_select"
            name="state"
            placeholder="State"
          />
        </GroupInput>
        {/* <GroupInput>
          <FormInput
            variant="address_select"
            name="state"
            placeholder="State"
          />
          <FormInput variant="address_select" name="city" placeholder="City" />
        </GroupInput> */}
      </FormInputGroup>
      <ContentSpacing />
      <FormSubmitButton>Register</FormSubmitButton>
    </form>
  );
};

export default EventRegisterForm;
