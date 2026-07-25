"use client";

import { useCallback, useRef, useState } from "react";
import { useFormState } from "react-dom";

import FormSubmitButton from "@/app/components/Buttons/FormSubmitButton";
import Text from "@/app/components/Generics/Text";
import Checkbox from "@/app/components/Inputs/Checkbox";
import FieldError from "@/app/components/Inputs/FieldError";
import FormInput from "@/app/components/Inputs/FormInput";
import Label from "@/app/components/Inputs/Label";
import SelectInput from "@/app/components/Inputs/SelectInput";
import TextArea from "@/app/components/Inputs/TextArea";
import BaseSpacing from "@/app/components/Spacing/BaseSpacing";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import { submitReviewAction, type ReviewState } from "@/app/actions/review";
import { CONSENT_TEXT } from "@/app/lib/reviews/consent";

import PhotoUpload from "./PhotoUpload";
import ReviewPreview, { type PreviewValues } from "./ReviewPreview";
import StarRatingInput from "./StarRatingInput";

interface Props {
  token: string;
  clientName: string;
}

const RELATIONSHIPS = [
  { value: "", label: "Prefer not to say" },
  { value: "client", label: "Services client" },
  { value: "student", label: "Training student" },
];

const EMPTY_PREVIEW: PreviewValues = {
  rating: 0,
  body: "",
  name: "",
  role: "",
  company: "",
  headline: "",
  engagement: "",
};

const ReviewForm = ({ token, clientName }: Readonly<Props>) => {
  const [state, formAction] = useFormState<ReviewState, FormData>(
    submitReviewAction,
    { message: "" }
  );

  const formRef = useRef<HTMLFormElement>(null);
  const [preview, setPreview] = useState<PreviewValues>({
    ...EMPTY_PREVIEW,
    name: clientName,
  });

  /**
   * Read the whole form on any change.
   *
   * Reading FormData rather than holding a controlled value per field keeps every
   * input uncontrolled, so the browser's own autofill and undo still work, and
   * adding a field to the form does not mean adding another piece of state.
   *
   * The photo is excluded here and arrives by callback instead, because it lands
   * asynchronously after the upload and React state changes do not emit DOM
   * change events.
   */
  const syncPreview = useCallback(() => {
    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);
    const read = (key: string) => String(data.get(key) ?? "");

    setPreview((current) => ({
      ...current,
      rating: Number(data.get("rating") ?? 0),
      body: read("body"),
      name: read("name"),
      role: read("role"),
      company: read("company"),
      headline: read("headline"),
      engagement: read("engagement"),
    }));
  }, []);

  const handlePhotoChange = useCallback((photoUrl?: string) => {
    setPreview((current) => ({ ...current, photoUrl }));
  }, []);

  return (
    <form ref={formRef} action={formAction} onChange={syncPreview}>
      {state.message && (
        <div
          className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3
          text-sm text-red-600"
          role="alert"
        >
          {state.message}
        </div>
      )}

      <input type="hidden" name="token" value={token} />

      <Label label="How would you rate working with us?">
        <StarRatingInput name="rating" error={state.errors?.rating} />
      </Label>
      <BaseSpacing />

      <Label label="Your review" labelFor="body">
        <TextArea
          id="body"
          name="body"
          maxLength={1000}
          placeholder="What did we do for you, and how did it go? Specific details help other people more than general praise."
        />
        <FieldError message={state.errors?.body} />
      </Label>
      <BaseSpacing />

      <Label label="Sum it up in a line (optional)" labelFor="headline">
        <FormInput
          id="headline"
          name="headline"
          maxLength={80}
          placeholder="e.g. Delivered ahead of schedule"
          error={state.errors?.headline}
        />
      </Label>
      <ContentSpacing />

      <Label label="Your full name" labelFor="name">
        <FormInput
          variant="name"
          id="name"
          name="name"
          defaultValue={clientName}
          placeholder="Enter your full name"
          error={state.errors?.name}
        />
      </Label>
      <BaseSpacing />

      <Label label="Your role or job title" labelFor="role">
        <FormInput
          id="role"
          name="role"
          placeholder="e.g. CEO, Project Manager, Student"
          error={state.errors?.role}
        />
      </Label>
      <BaseSpacing />

      <Label label="Company or organisation (optional)" labelFor="company">
        <FormInput
          id="company"
          name="company"
          placeholder="Where you work"
          error={state.errors?.company}
        />
      </Label>
      <BaseSpacing />

      <Label label="How do you know us? (optional)" labelFor="relationship">
        <SelectInput
          id="relationship"
          name="relationship"
          options={RELATIONSHIPS}
        />
        <FieldError message={state.errors?.relationship} />
      </Label>
      <BaseSpacing />

      <Label label="What did we work on together? (optional)" labelFor="engagement">
        <FormInput
          id="engagement"
          name="engagement"
          maxLength={120}
          placeholder="e.g. E-TopUp platform, Cybersecurity training"
          error={state.errors?.engagement}
        />
      </Label>
      <ContentSpacing />

      <Label label="Your photo">
        <PhotoUpload
          token={token}
          error={state.errors?.photoUrl}
          onPhotoChange={handlePhotoChange}
        />
      </Label>
      <ContentSpacing />

      <ReviewPreview values={preview} />
      <ContentSpacing />

      <div className="flex items-start gap-3">
        <span className="mt-1 shrink-0">
          <Checkbox htmlFor="consent" name="consent" small />
        </span>
        <label htmlFor="consent" className="cursor-pointer">
          <Text type="caption">{CONSENT_TEXT}</Text>
        </label>
      </div>
      <FieldError message={state.errors?.consent} />
      <ContentSpacing />

      <FormSubmitButton>Submit my review</FormSubmitButton>
    </form>
  );
};

export default ReviewForm;
