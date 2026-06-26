"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import FormInput from "@/app/components/Inputs/FormInput";
import GroupInput from "@/app/components/Inputs/GroupInput";
import Label from "@/app/components/Inputs/Label";
import SelectInput from "@/app/components/Inputs/SelectInput";
import TextArea from "@/app/components/Inputs/TextArea";
import FieldError from "@/app/components/Inputs/FieldError";
import BaseSpacing from "@/app/components/Spacing/BaseSpacing";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import FormSubmitButton from "@/app/components/Buttons/FormSubmitButton";
import { requestQuoteAction, type RequestState } from "@/app/actions/request";

const SERVICES = [
  { label: "Cybersecurity Consulting", value: "Cybersecurity Consulting" },
  { label: "Personalized Solution", value: "Personalized Solution" },
  { label: "Training", value: "Training" },
  { label: "Mentorship", value: "Mentorship" },
];

const RequestForm = () => {
  const router = useRouter();
  const [state, formAction] = useFormState<RequestState, FormData>(
    requestQuoteAction,
    { message: "" }
  );

  useEffect(() => {
    if (state?.message?.toLowerCase() === "ok") {
      toast.success(
        "Thanks! We've received your request and will get back to you with a quote shortly.",
        { position: "top-center", duration: 5000 }
      );
      router.replace("/");
    }
  }, [state?.message, router]);

  const formError =
    state?.message && state.message.toLowerCase() !== "ok" ? state.message : "";

  return (
    <form action={formAction}>
      {formError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {formError}
        </div>
      )}
      <GroupInput>
        <Label label="Enter your full name" labelFor="fullname">
          <FormInput
            variant="name"
            id="fullname"
            name="fullName"
            error={state.errors?.fullName}
          />
        </Label>
        <Label label="Email Address" labelFor="email">
          <FormInput variant="email" name="email" error={state.errors?.email} />
        </Label>
      </GroupInput>
      <BaseSpacing />
      <GroupInput>
        <Label label="Phone number" labelFor="phone">
          <FormInput
            variant="phone"
            id="phone"
            name="phone"
            error={state.errors?.phone}
          />
        </Label>
        <Label label="Service Required" labelFor="service">
          <SelectInput name="service" options={SERVICES} />
          <FieldError message={state.errors?.service} />
        </Label>
      </GroupInput>
      <BaseSpacing />
      <GroupInput>
        <Label label="Preferred Start Date" labelFor="date">
          <FormInput variant="date" id="date" name="preferredDate" />
        </Label>
        <Label label="Budget Range (Optional)" labelFor="budget">
          <FormInput
            id="budget"
            name="budget"
            placeholder="Enter your budget range"
          />
        </Label>
      </GroupInput>
      <BaseSpacing />
      <Label label="Company Name (if applicable)">
        <FormInput name="company" placeholder="Enter your company name" />
      </Label>
      <BaseSpacing />
      <Label label="Project or Training Description">
        <TextArea
          name="description"
          placeholder="Enter a detailed description of your project"
        />
        <FieldError message={state.errors?.description} />
      </Label>
      <ContentSpacing />
      <FormSubmitButton>Submit request</FormSubmitButton>
    </form>
  );
};

export default RequestForm;
