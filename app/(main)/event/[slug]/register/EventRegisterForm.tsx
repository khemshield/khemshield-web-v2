"use client";

import { eventRegisterAction } from "@/app/actions/events";
import FormInput from "@/app/components/Inputs/FormInput";
import FormInputGroup from "@/app/components/Inputs/FormInputGroup";
import GroupInput from "@/app/components/Inputs/GroupInput";
import BaseSpacing from "@/app/components/Spacing/BaseSpacing";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import FormSubmitButton from "../../../../components/Buttons/FormSubmitButton";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { eventSlug } from "../../eventSlug";

const EventRegisterForm = () => {
  const router = useRouter();

  const [state, eventRegisterActionForm] = useFormState(eventRegisterAction, {
    message: "",
  });

  useEffect(() => {
    if (state?.message?.toLowerCase() === "ok") {
      toast.success(
        `Thank you for registering for the Virtual Training in Web Development and Cybersecurity.
          An email with event details has been sent to you.`,
        { position: "top-center", duration: 5000 }
      );
      router.replace(`/event/${eventSlug}`);
    }
  }, [state?.message, router]);

  const formError =
    state?.message && state.message.toLowerCase() !== "ok"
      ? state.message
      : "";

  return (
    <form action={eventRegisterActionForm}>
      {formError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {formError}
        </div>
      )}
      <FormInputGroup heading={"Contact Information"}>
        <GroupInput>
          <FormInput variant="email" name="email" error={state.errors?.email} />
          <FormInput variant="phone" name="phone" error={state.errors?.phone} />
        </GroupInput>
        <BaseSpacing />
        <GroupInput>
          <FormInput
            variant="name"
            name="firstName"
            placeholder="Enter your first name"
            error={state.errors?.firstName}
          />
          <FormInput
            variant="name"
            name="lastName"
            placeholder="Enter your last name"
            error={state.errors?.lastName}
          />
        </GroupInput>
        <BaseSpacing />
        <GroupInput>
          <FormInput
            variant="address"
            name="address"
            error={state.errors?.address}
          />
          <FormInput
            variant="address_select"
            name="state"
            placeholder="State"
            error={state.errors?.state}
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
