/**
 * Clean up a connection string copied into a hosting dashboard.
 *
 * `.env` files quote values and `dotenv` strips those quotes on read, but
 * dashboard env editors (Vercel, Render) store the value verbatim. Copying
 * `MONGODB_URL="mongodb+srv://..."` out of a `.env` file therefore yields a
 * value with a literal leading quote, and the driver rejects it with an
 * unhelpful "Invalid scheme" error.
 *
 * Trimming whitespace and matching surrounding quotes is unambiguous, since no
 * valid connection string starts with either, so it is corrected rather than
 * rejected. Anything still malformed after that throws with the likely cause
 * named, because guessing at the intent would be worse than a clear error.
 *
 * Kept free of `server-only` so it stays a plain, testable string function.
 */
export const normaliseMongoUrl = (raw: string): string => {
  let url = raw.trim();

  // [\s\S] rather than the `s` flag: this tsconfig sets no `target`, so the
  // dotAll flag is not available.
  const quoted = /^(['"])([\s\S]*)\1$/.exec(url);
  if (quoted) {
    url = quoted[2].trim();
    console.warn(
      "[db] MONGODB_URL was wrapped in quotes and has been unwrapped. Remove the quotes from the environment variable, dashboards store values literally."
    );
  }

  if (/^mongodb(\+srv)?:\/\//i.test(url)) return url;

  // Name the cause rather than repeating the driver's opaque complaint. The
  // value itself is never included, since it carries the password.
  let cause = "It must start with mongodb:// or mongodb+srv://.";
  if (/^['"]/.test(url)) {
    cause =
      "It starts with a quote character. Paste the value without surrounding quotes.";
  } else if (/^MONGODB_URL\s*=/i.test(url)) {
    cause =
      'It includes the "MONGODB_URL=" prefix. Paste only the part after the equals sign.';
  } else if (/^https?:\/\//i.test(url)) {
    cause =
      "It looks like a web URL. Use the driver connection string from Atlas (Connect, then Drivers), not a browser link.";
  }

  throw new Error(`MONGODB_URL is malformed. ${cause}`);
};

export default normaliseMongoUrl;
