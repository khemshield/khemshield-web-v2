"use server";

import Joi from "joi";
import { toFieldErrors, type FieldErrors } from "@/app/lib/formErrors";

export type EnrollState = {
  message: string;
  errors?: FieldErrors;
  data?: {
    reference: string;
    amount: number;
    currency: string;
    totalAmount: number;
    balance: number;
    courseTitle: string;
    courseSlug: string;
    email: string;
    paymentOption: string;
    authorizationUrl: string | null;
  };
};

export const enrollAction = async (
  _prevState: EnrollState,
  formData: FormData
): Promise<EnrollState> => {
  const schema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    phone: Joi.string()
      .pattern(/^(?:\+?[1-9]{1,5})?\d{10,14}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Phone number must be a valid phone number with no spaces",
      }),
    courseSlug: Joi.string().trim().required(),
    paymentOption: Joi.string().valid("full", "deposit").default("full"),
  });

  const { value, error } = schema.validate(
    {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      courseSlug: formData.get("courseSlug"),
      paymentOption: formData.get("paymentOption"),
    },
    { abortEarly: false }
  );

  if (error) {
    return { message: "", errors: toFieldErrors(error) };
  }

  const query = `
    mutation EnrollGuest($input: GuestEnrollInput!) {
      enrollGuest(input: $input) {
        reference
        amount
        currency
        totalAmount
        balance
        courseTitle
        courseSlug
        email
        paymentOption
        authorizationUrl
      }
    }
  `;

  const baseUrl = process.env.KHEMSHIELD_BASE_URL || "http://localhost:5000";

  try {
    const res = await fetch(`${baseUrl}/api/v1/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { input: value } }),
      cache: "no-store",
    });

    const json = await res.json();

    if (json.errors) {
      return { message: json.errors[0].message };
    }

    return { message: "ok", data: json.data.enrollGuest };
  } catch (err) {
    console.error("[enroll] request failed:", err);
    return {
      message:
        "We couldn't reach the server. Please make sure the API is running and try again.",
    };
  }
};
