"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import FormInput from "@/app/components/Inputs/FormInput";
import BaseSpacing from "@/app/components/Spacing/BaseSpacing";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import FormSubmitButton from "@/app/components/Buttons/FormSubmitButton";
import Button from "@/app/components/Buttons/Button";
import { formatNumber } from "@/app/lib/formatNumber";
import { enrollAction, type EnrollState } from "@/app/actions/enroll";

const WHATSAPP_NUMBER = "2348102618131";

interface Props {
  courseSlug: string;
  courseName: string;
  price: number;
}

const EnrollForm = ({ courseSlug, courseName, price }: Props) => {
  const [state, formAction] = useFormState<EnrollState, FormData>(enrollAction, {
    message: "",
  });
  const [option, setOption] = useState<"full" | "deposit">("full");

  const deposit = Math.round(price * 0.5);

  useEffect(() => {
    // Paystack configured: send the user straight to checkout.
    if (state?.message === "ok" && state.data?.authorizationUrl) {
      window.location.assign(state.data.authorizationUrl);
    }
  }, [state?.message, state?.data?.authorizationUrl]);

  const formError =
    state?.message && state.message.toLowerCase() !== "ok"
      ? state.message
      : "";

  // ── Redirecting to Paystack checkout ──
  if (state?.message === "ok" && state.data?.authorizationUrl) {
    return (
      <div className="rounded-2xl border border-black/[0.08] bg-white p-8 text-center shadow-khemshadow">
        <p className="font-display text-xl font-bold text-secondary-normal">
          Taking you to secure checkout…
        </p>
        <p className="mt-2 text-sm text-[#8C94A3]">
          If you are not redirected,{" "}
          <a
            href={state.data.authorizationUrl}
            className="font-semibold text-primary-normal hover:underline"
          >
            click here to pay
          </a>
          .
        </p>
      </div>
    );
  }

  // ── Success: enrollment intent created (Paystack not configured) ──
  if (state?.message === "ok" && state.data) {
    const d = state.data;
    const waText = encodeURIComponent(
      `Hi Khemshield, I'd like to complete my enrollment for ${d.courseTitle}. ` +
        `Payment reference: ${d.reference}. Amount due now: ${formatNumber(d.amount)}.`
    );
    return (
      <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-khemshadow sm:p-8">
        <h2 className="font-display text-2xl font-extrabold text-secondary-normal">
          You&apos;re almost there
        </h2>
        <p className="mt-2 text-secondary-normal/80">
          We&apos;ve reserved your spot in <strong>{d.courseTitle}</strong>.
          Complete your payment to confirm your place.
        </p>

        <dl className="mt-6 flex flex-col gap-2 rounded-xl bg-support p-5 text-sm">
          <div className="flex justify-between">
            <dt className="text-[#8C94A3]">Amount due now</dt>
            <dd className="font-bold text-secondary-normal">
              {formatNumber(d.amount)}
            </dd>
          </div>
          {d.balance > 0 && (
            <div className="flex justify-between">
              <dt className="text-[#8C94A3]">Balance after deposit</dt>
              <dd className="font-medium text-secondary-normal">
                {formatNumber(d.balance)}
              </dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-[#8C94A3]">Reference</dt>
            <dd className="font-mono text-secondary-normal">{d.reference}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-col gap-3 xs:flex-row">
          <Button
            elementType="link"
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            Complete payment on WhatsApp
          </Button>
          <Button elementType="link" href="/training" variant="border">
            Back to courses
          </Button>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-[#8C94A3]">
          Card and bank-transfer checkout is being set up. For now, our team
          confirms your payment over WhatsApp using the reference above. A
          confirmation email will follow once payment is received.
        </p>
      </div>
    );
  }

  // ── Form ──
  return (
    <form
      action={formAction}
      className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-khemshadow sm:p-8"
    >
      <input type="hidden" name="courseSlug" value={courseSlug} />

      {formError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {formError}
        </div>
      )}

      <h2 className="font-display text-xl font-extrabold text-secondary-normal">
        Your details
      </h2>
      <ContentSpacing />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormInput
          variant="name"
          name="firstName"
          placeholder="First name"
          error={state.errors?.firstName}
        />
        <FormInput
          variant="name"
          name="lastName"
          placeholder="Last name"
          error={state.errors?.lastName}
        />
      </div>
      <BaseSpacing />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormInput variant="email" name="email" error={state.errors?.email} />
        <FormInput variant="phone" name="phone" error={state.errors?.phone} />
      </div>

      <ContentSpacing />
      <h2 className="font-display text-xl font-extrabold text-secondary-normal">
        Payment option
      </h2>
      <p className="mt-1 text-sm text-[#8C94A3]">
        Pay in full, or reserve your seat with a deposit and clear the balance
        later.
      </p>

      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        <label
          className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg border px-3.5 py-2.5 transition-colors ${
            option === "full"
              ? "border-primary-normal bg-primary-light/30"
              : "border-black/[0.1]"
          }`}
        >
          <input
            type="radio"
            name="paymentOption"
            value="full"
            checked={option === "full"}
            onChange={() => setOption("full")}
            className="sr-only"
          />
          <span className="text-sm font-semibold text-secondary-normal">
            Pay in full
          </span>
          <span className="font-bold text-secondary-normal">
            {formatNumber(price)}
          </span>
        </label>

        <label
          className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg border px-3.5 py-2.5 transition-colors ${
            option === "deposit"
              ? "border-primary-normal bg-primary-light/30"
              : "border-black/[0.1]"
          }`}
        >
          <input
            type="radio"
            name="paymentOption"
            value="deposit"
            checked={option === "deposit"}
            onChange={() => setOption("deposit")}
            className="sr-only"
          />
          <span className="text-sm font-semibold text-secondary-normal">
            50% deposit
            <span className="block text-xs font-normal text-[#8C94A3]">
              Balance {formatNumber(price - deposit)} later
            </span>
          </span>
          <span className="font-bold text-secondary-normal">
            {formatNumber(deposit)}
          </span>
        </label>
      </div>

      <ContentSpacing />
      <FormSubmitButton>Continue to payment</FormSubmitButton>

      <p className="mt-4 text-center text-sm text-[#8C94A3]">
        Prefer to talk first?{" "}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            `Hi Khemshield, I have a question about the ${courseName} course.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary-normal hover:underline"
        >
          Chat with us on WhatsApp
        </a>
      </p>
    </form>
  );
};

export default EnrollForm;
