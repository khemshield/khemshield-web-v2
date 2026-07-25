import "server-only";

import { Resend } from "resend";

/**
 * Minimal Resend wrapper, mirroring backend/app/utils/emailService/sendResendEmail.ts
 * so the two behave the same way and read from the same env vars.
 *
 * Differences from the backend copy, both deliberate:
 *  - it returns a result object instead of throwing, because a failed invite
 *    email must not fail invite creation, the caller needs to report the send
 *    separately from the record it already wrote.
 *  - RESEND_FROM is accepted in either shape. The value in this project is
 *    already "Name <address>", so blindly wrapping it in another set of angle
 *    brackets would produce a malformed From header.
 *
 * TEMPORARY: moves to the backend along with app/lib/reviews/.
 */

export type SendResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

let cachedClient: Resend | null = null;

const getClient = (apiKey: string): Resend => {
  if (!cachedClient) cachedClient = new Resend(apiKey);
  return cachedClient;
};

/** True when both the key and the from address are configured. */
export const isEmailConfigured = (): boolean =>
  Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM);

/**
 * Build the From header.
 *
 * Accepts "accounts@example.com" or "Khemshield Edu <accounts@example.com>" and
 * produces a valid header either way.
 */
const buildFrom = (raw: string): string => {
  if (raw.includes("<") && raw.includes(">")) return raw.trim();
  const name = process.env.APP_NAME || "Khemshield";
  return `${name} <${raw.trim()}>`;
};

export const sendResendEmail = async ({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendResult> => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !from) {
    return {
      ok: false,
      error:
        "Email is not configured. Set RESEND_API_KEY and RESEND_FROM in web/.env.local.",
    };
  }

  // The Resend sending subdomain has no MX records, so a reply to the From
  // address would go nowhere. Fall back to the configured receiving inbox.
  const replyAddress = replyTo || process.env.RESEND_REPLY_TO;

  try {
    const { data, error } = await getClient(apiKey).emails.send({
      from: buildFrom(from),
      to: [to],
      subject,
      html,
      ...(replyAddress ? { replyTo: replyAddress } : {}),
    });

    if (error) {
      console.error("[email] Resend rejected the send:", error);
      return { ok: false, error: error.message || "Resend rejected the send." };
    }

    return { ok: true, id: data?.id };
  } catch (err) {
    console.error("[email] send threw:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown email error.",
    };
  }
};
