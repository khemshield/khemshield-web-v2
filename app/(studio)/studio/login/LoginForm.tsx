"use client";

import { useFormState, useFormStatus } from "react-dom";

import { studioLoginAction, type LoginState } from "./actions";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="h-12 w-full rounded-lg bg-primary-normal font-semibold
      text-white disabled:opacity-60"
    >
      {pending ? "Checking..." : "Open studio"}
    </button>
  );
};

const LoginForm = ({ next }: Readonly<{ next?: string }>) => {
  const [state, formAction] = useFormState<LoginState, FormData>(
    studioLoginAction,
    { message: "" }
  );

  return (
    <form action={formAction}>
      {state.message && (
        <p
          className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3
          text-sm text-red-600"
          role="alert"
        >
          {state.message}
        </p>
      )}

      {next && <input type="hidden" name="next" value={next} />}

      <label htmlFor="passphrase" className="text-sm text-gray-600">
        Passphrase
      </label>
      <input
        id="passphrase"
        name="passphrase"
        type="password"
        autoComplete="current-password"
        autoFocus
        className="mb-4 mt-1 h-12 w-full rounded-lg border border-gray-300 px-4"
      />

      <SubmitButton />
    </form>
  );
};

export default LoginForm;
