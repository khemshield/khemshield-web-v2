import type { ValidationError } from "joi";

/** Field name -> first error message for that field. */
export type FieldErrors = Record<string, string>;

/**
 * Turn a Joi validation error (collected with `abortEarly: false`) into a
 * per-field map the forms render inline. Keeps the first message per field.
 */
export const toFieldErrors = (error: ValidationError): FieldErrors => {
  const errors: FieldErrors = {};
  for (const detail of error.details) {
    const key = (detail.path[0] as string) ?? "form";
    if (!errors[key]) errors[key] = detail.message;
  }
  return errors;
};
