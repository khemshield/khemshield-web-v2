"use server";

import Joi from "joi";
import { toFieldErrors, type FieldErrors } from "@/app/lib/formErrors";

export type RequestState = { message: string; errors?: FieldErrors };

export const requestQuoteAction = async (
  _prevState: RequestState,
  formData: FormData
): Promise<RequestState> => {
  const schema = Joi.object({
    fullName: Joi.string().trim().min(3).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    phone: Joi.string()
      .pattern(/^(?:\+?[1-9]{1,5})?\d{10,14}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Phone number must be a valid phone number with no spaces",
      }),
    service: Joi.string().trim().required(),
    description: Joi.string().trim().min(10).required().messages({
      "string.min": "Please describe your project (at least 10 characters)",
    }),
    preferredDate: Joi.string().allow("").optional(),
    budget: Joi.string().allow("").optional(),
    company: Joi.string().allow("").optional(),
  });

  const { value, error } = schema.validate(
    {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      description: formData.get("description"),
      preferredDate: formData.get("preferredDate"),
      budget: formData.get("budget"),
      company: formData.get("company"),
    },
    { abortEarly: false }
  );

  if (error) {
    return { message: "", errors: toFieldErrors(error) };
  }

  const query = `
    mutation CreateQuoteRequest($input: QuoteRequestInput!) {
      createQuoteRequest(input: $input) { _id }
    }
  `;

  const baseUrl = process.env.KHEMSHIELD_BASE_URL || "http://localhost:5000";

  try {
    const res = await fetch(`${baseUrl}/api/v1/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: {
          input: {
            fullName: value.fullName,
            email: value.email,
            phone: value.phone,
            service: value.service,
            description: value.description,
            preferredDate: value.preferredDate || undefined,
            budget: value.budget || undefined,
            company: value.company || undefined,
          },
        },
      }),
      cache: "no-store",
    });

    const json = await res.json();
    if (json.errors) {
      return { message: json.errors[0].message };
    }
    return { message: "ok" };
  } catch (err) {
    console.error("[request] submission failed:", err);
    return {
      message:
        "We couldn't reach the server. Please try again in a moment.",
    };
  }
};
