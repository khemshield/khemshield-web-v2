/**
 * Authentication for the temporary /studio admin pages.
 *
 * This is deliberately not a user system. It is a single shared passphrase
 * (ADMIN_REVIEW_SECRET) guarding testimonial moderation while the Render backend
 * is down. The blast radius if it leaked is an unapproved testimonial appearing
 * on the homepage, which is visible immediately and trivially reversible.
 *
 * TO CHANGE THE PASSPHRASE: edit ADMIN_REVIEW_SECRET in web/.env.local (or the
 * deploy environment) and restart. Any phrase of at least MIN_SECRET_LENGTH
 * characters works. Because the session cookie holds a derivation of the secret
 * rather than a random session id, changing it invalidates every open session
 * automatically, there is no separate logout step and no session store to clear.
 *
 * TEMPORARY: delete along with app/(studio) once the dashboard app takes over
 * moderation against the backend's real admin JWT.
 *
 * Runs in both the Edge middleware and Node server actions, so it uses Web
 * Crypto rather than node:crypto and imports nothing else.
 */

export const STUDIO_COOKIE = "khemshield_studio";

/**
 * Floor on the passphrase length.
 *
 * Low enough that a memorable phrase is fine, high enough that "admin123" is
 * refused. Enforced at sign-in rather than at startup so a misconfiguration
 * surfaces as a clear message in the login form instead of a crashed build.
 */
export const MIN_SECRET_LENGTH = 12;

/** Why the configured secret is unusable, or null when it is fine. */
export const studioSecretProblem = (): string | null => {
  const secret = process.env.ADMIN_REVIEW_SECRET;

  if (!secret) {
    return "ADMIN_REVIEW_SECRET is not set on the server, so the studio cannot be opened. Add it to web/.env.local and restart.";
  }
  if (secret.trim().length < MIN_SECRET_LENGTH) {
    return `ADMIN_REVIEW_SECRET is too short. Use at least ${MIN_SECRET_LENGTH} characters, then restart.`;
  }
  return null;
};

const sha256Hex = async (input: string): Promise<string> => {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

/**
 * The value stored in the session cookie.
 *
 * A derivation of the secret rather than the secret itself, so a stolen cookie
 * cannot be turned back into the passphrase. The "studio:v1:" prefix domain
 * separates it, meaning the same secret hashed for another purpose later won't
 * produce a valid session.
 */
export const studioSessionToken = async (): Promise<string> => {
  const secret = process.env.ADMIN_REVIEW_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_REVIEW_SECRET is not set. Add it to web/.env.local to use /studio."
    );
  }
  return sha256Hex(`studio:v1:${secret}`);
};

/** Constant-time comparison of two equal-length hex digests. */
const safeEqualHex = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
};

/**
 * Check a submitted passphrase.
 *
 * Both sides are hashed before comparison so the comparison operates on
 * fixed-length digests, which keeps a wrong guess from leaking the secret's
 * length through timing or an early length check.
 */
export const isValidStudioPassphrase = async (
  submitted: string
): Promise<boolean> => {
  const secret = process.env.ADMIN_REVIEW_SECRET;
  if (!secret || studioSecretProblem() !== null) return false;
  const [a, b] = await Promise.all([
    sha256Hex(submitted),
    sha256Hex(secret),
  ]);
  return safeEqualHex(a, b);
};

/** Check a session cookie value against the expected derivation. */
export const isValidStudioSession = async (
  cookieValue: string | undefined
): Promise<boolean> => {
  if (!cookieValue) return false;
  try {
    return safeEqualHex(cookieValue, await studioSessionToken());
  } catch {
    return false;
  }
};

export const STUDIO_SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours
