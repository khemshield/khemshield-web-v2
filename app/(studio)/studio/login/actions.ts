"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  STUDIO_COOKIE,
  STUDIO_SESSION_MAX_AGE,
  isValidStudioPassphrase,
  studioSecretProblem,
  studioSessionToken,
} from "@/app/lib/studioAuth";

export type LoginState = { message: string };

/**
 * Naive per-IP attempt limiter.
 *
 * In-memory on purpose. It resets on redeploy and is per serverless instance, so
 * it is a speed bump against a script hammering the form, not a real defence. It
 * is adequate here because the passphrase is a 32-character random string, which
 * is not guessable at any rate this would allow.
 */
const attempts = new Map<string, { count: number; firstAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;

const tooManyAttempts = (ip: string): boolean => {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record || now - record.firstAt > WINDOW_MS) {
    attempts.set(ip, { count: 1, firstAt: now });
    return false;
  }

  record.count += 1;
  return record.count > MAX_ATTEMPTS;
};

/** Only allow redirects back into the studio, never to an arbitrary URL. */
const safeNext = (next: string | null): string => {
  if (next && next.startsWith("/studio/") && !next.startsWith("/studio//")) {
    return next;
  }
  return "/studio/reviews";
};

export const studioLoginAction = async (
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> => {
  const configProblem = studioSecretProblem();
  if (configProblem) {
    return { message: configProblem };
  }

  const ip =
    headers().get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (tooManyAttempts(ip)) {
    return {
      message: "Too many attempts. Wait a few minutes and try again.",
    };
  }

  const passphrase = String(formData.get("passphrase") ?? "");
  if (!passphrase) {
    return { message: "Enter the passphrase." };
  }

  if (!(await isValidStudioPassphrase(passphrase))) {
    return { message: "That passphrase is not correct." };
  }

  attempts.delete(ip);

  cookies().set(STUDIO_COOKIE, await studioSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/studio",
    maxAge: STUDIO_SESSION_MAX_AGE,
  });

  redirect(safeNext(formData.get("next") as string | null));
};

export const studioLogoutAction = async () => {
  cookies().delete({ name: STUDIO_COOKIE, path: "/studio" });
  redirect("/studio/login");
};
