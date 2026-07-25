"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Copy, TickCircle } from "iconsax-react";

import FieldError from "@/app/components/Inputs/FieldError";
import {
  createInviteAction,
  type EmailOutcome,
  type InviteFormState,
} from "./actions";

const FIELD =
  "mt-1 h-11 w-full rounded-lg border border-gray-300 px-3 text-sm";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="h-11 rounded-lg bg-primary-normal px-5 text-sm font-semibold
      text-white disabled:opacity-60"
    >
      {pending ? "Creating..." : "Create link"}
    </button>
  );
};

const EmailOutcomeNote = ({ email }: { email?: EmailOutcome }) => {
  if (!email || email.status === "skipped") {
    return (
      <p className="mb-2 text-xs text-green-700">
        No email address given, so nothing was sent. Copy the link below and send
        it yourself.
      </p>
    );
  }

  if (email.status === "sent") {
    return (
      <p className="mb-2 text-xs text-green-700">
        Emailed to {email.to}. The link below is the same one, in case you want to
        send it another way too.
      </p>
    );
  }

  return (
    <p className="mb-2 rounded border border-amber-300 bg-amber-50 px-2 py-1 text-xs text-amber-800">
      The invite was created, but the email to {email.to} did not send:{" "}
      {email.error} Send the link below by hand.
    </p>
  );
};

const CopyableLink = ({
  link,
  clientName,
  email,
}: {
  link: string;
  clientName?: string;
  email?: EmailOutcome;
}) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be blocked. The input below is selectable, so the
      // link is still reachable by hand.
      setCopied(false);
    }
  };

  return (
    <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
      <p className="text-sm font-semibold text-green-800">
        Link ready{clientName ? ` for ${clientName}` : ""}
      </p>
      <EmailOutcomeNote email={email} />
      <p className="mb-2 text-xs text-green-700">
        Single use. It stops working once they submit.
      </p>
      <div className="flex gap-2">
        <input
          readOnly
          value={link}
          onFocus={(event) => event.currentTarget.select()}
          className="h-10 flex-1 rounded-lg border border-green-300 bg-white
          px-3 font-mono text-xs"
        />
        <button
          type="button"
          onClick={copy}
          className="inline-flex h-10 shrink-0 items-center gap-1 rounded-lg
          border border-green-300 bg-white px-3 text-sm text-green-800"
        >
          {copied ? <TickCircle size={16} /> : <Copy size={16} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
};

const InviteForm = () => {
  const [state, formAction] = useFormState<InviteFormState, FormData>(
    createInviteAction,
    { message: "" }
  );

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="font-semibold text-secondary-normal">
        Invite a client to review
      </h2>

      <form action={formAction} className="mt-4">
        {state.message && state.message !== "ok" && (
          <p
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3
            text-sm text-red-600"
            role="alert"
          >
            {state.message}
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="clientName" className="text-sm text-gray-600">
              Client name
            </label>
            <input
              id="clientName"
              name="clientName"
              className={FIELD}
              placeholder="Bello Abdulsobur"
            />
            <FieldError message={state.errors?.clientName} />
          </div>

          <div>
            <label htmlFor="email" className="text-sm text-gray-600">
              Email (we send the link here)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={FIELD}
              placeholder="bello@example.com"
            />
            <FieldError message={state.errors?.email} />
          </div>

          <div>
            <label htmlFor="expiresInDays" className="text-sm text-gray-600">
              Expires in
            </label>
            <select
              id="expiresInDays"
              name="expiresInDays"
              defaultValue="14"
              className={FIELD}
            >
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
              <option value="90">90 days</option>
            </select>
            <FieldError message={state.errors?.expiresInDays} />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="note" className="text-sm text-gray-600">
            Internal note (optional, never shown to the client)
          </label>
          <input
            id="note"
            name="note"
            className={FIELD}
            placeholder="E-TopUp handover, follow up next week"
          />
          <FieldError message={state.errors?.note} />
        </div>

        <div className="mt-4">
          <SubmitButton />
        </div>
      </form>

      {state.message === "ok" && state.link && (
        <CopyableLink
          link={state.link}
          clientName={state.clientName}
          email={state.email}
        />
      )}
    </section>
  );
};

export default InviteForm;
