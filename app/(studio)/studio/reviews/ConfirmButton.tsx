"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";

export type ConfirmTone = "approve" | "danger" | "neutral";

const TRIGGER_TONES: Record<ConfirmTone, string> = {
  approve: "bg-green-600 text-white",
  danger: "border border-red-300 text-red-700",
  neutral: "border border-gray-300 text-gray-700",
};

const CONFIRM_TONES: Record<ConfirmTone, string> = {
  approve: "bg-green-600 text-white",
  danger: "bg-red-600 text-white",
  neutral: "bg-secondary-normal text-white",
};

/**
 * Watches the enclosing form's submission and closes the dialog once it lands.
 *
 * useFormStatus only reports on the form it is rendered inside, which is why the
 * confirm button lives in its own component. Closing on the falling edge of
 * `pending` (rather than on click) means the dialog stays up showing progress
 * while the server action runs, so a slow action cannot look like a no-op.
 */
const ConfirmActions = ({
  tone,
  confirmLabel,
  pendingLabel,
  onCancel,
  onSettled,
}: {
  tone: ConfirmTone;
  confirmLabel: string;
  pendingLabel: string;
  onCancel: () => void;
  onSettled: () => void;
}) => {
  const { pending } = useFormStatus();
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !pending) onSettled();
    wasPending.current = pending;
  }, [pending, onSettled]);

  return (
    <div className="mt-6 flex justify-end gap-3">
      <button
        type="button"
        onClick={onCancel}
        disabled={pending}
        className="h-10 rounded-lg border border-gray-300 px-4 text-sm
        text-gray-700 disabled:opacity-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={pending}
        className={`h-10 rounded-lg px-4 text-sm font-semibold
        disabled:opacity-60 ${CONFIRM_TONES[tone]}`}
      >
        {pending ? pendingLabel : confirmLabel}
      </button>
    </div>
  );
};

interface Props {
  /** Server action the confirmed form posts to. */
  action: (formData: FormData) => Promise<void>;
  /** Hidden inputs carried with the submission. */
  fields: Record<string, string>;
  label: string;
  tone: ConfirmTone;
  title: string;
  /** What the action will actually do. Shown in the dialog body. */
  description: ReactNode;
  confirmLabel: string;
  pendingLabel: string;
}

/**
 * Action button that explains itself before doing anything.
 *
 * Built on the native <dialog> element via showModal(), which supplies the focus
 * trap, Esc-to-close and top-layer stacking that a hand-rolled overlay would
 * have to reimplement. The submit button sits inside the dialog but within the
 * same form, so the confirmed click is an ordinary server action post and the
 * flow still works if the dialog never gets to hydrate.
 */
const ConfirmButton = ({
  action,
  fields,
  label,
  tone,
  title,
  description,
  confirmLabel,
  pendingLabel,
}: Readonly<Props>) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  // showModal() is what makes it modal. Setting the `open` attribute directly
  // renders the dialog inline with no backdrop and no focus containment.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <form action={action}>
      {Object.entries(fields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`h-9 rounded-lg px-4 text-sm font-medium ${TRIGGER_TONES[tone]}`}
      >
        {label}
      </button>

      <dialog
        ref={dialogRef}
        // Esc fires `cancel`, and the backdrop click is handled below. Both
        // route through the same state so the element never desyncs.
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        // A backdrop click reports the dialog itself as the target, anything in
        // the panel reports an inner node. The dialog therefore carries no
        // padding of its own, otherwise clicking the panel's own padding would
        // read as a backdrop click and close it.
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        className="w-[min(30rem,calc(100vw-2rem))] bg-transparent p-0
        backdrop:bg-black/50"
      >
        <div className="rounded-xl bg-white p-6 text-left shadow-xl">
          <h2 className="text-lg font-semibold text-secondary-normal">
            {title}
          </h2>
          <div className="mt-2 space-y-2 text-sm text-gray-600">
            {description}
          </div>

          <ConfirmActions
            tone={tone}
            confirmLabel={confirmLabel}
            pendingLabel={pendingLabel}
            onCancel={close}
            onSettled={close}
          />
        </div>
      </dialog>
    </form>
  );
};

export default ConfirmButton;
