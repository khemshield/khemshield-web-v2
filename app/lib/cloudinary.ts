/**
 * Cloudinary constants and URL helpers for testimonial photos.
 *
 * Safe to import from client components: no credentials, no SDK. Signing lives
 * in cloudinary.server.ts.
 */

/** Every testimonial photo lands here. Used to sign uploads and to validate
 * that a public id submitted by the browser is one we actually issued. */
export const TESTIMONIAL_PHOTO_FOLDER = "khemshield/testimonials";

/**
 * Delivery transform for the round avatar on the site.
 *
 * c_fill + g_face crops to the face rather than the geometric centre, which
 * matters because clients send phone photos with the head off to one side.
 * f_auto/q_auto let Cloudinary pick format and quality per browser.
 */
export const TESTIMONIAL_PHOTO_TRANSFORM =
  "c_fill,g_face,w_512,h_512,q_auto,f_auto";

export const ALLOWED_PHOTO_FORMATS = ["jpg", "jpeg", "png", "webp"] as const;

export const ALLOWED_PHOTO_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

/**
 * Insert a transform into a Cloudinary delivery URL.
 *
 * Anything that isn't a Cloudinary upload URL passes through untouched, which is
 * what makes the seeded originals work: they are site-relative /assets paths,
 * already correctly sized, and must not be rewritten.
 */
export const withCloudinaryTransform = (
  url: string,
  transform: string
): string => {
  const marker = "/image/upload/";
  if (!url.includes(marker)) return url;
  // Don't stack transforms if one was already applied.
  const [base, rest] = url.split(marker);
  if (rest.startsWith(`${transform}/`)) return url;
  return `${base}${marker}${transform}/${rest}`;
};

/** The URL the site should render for a testimonial author's photo. */
export const testimonialPhotoUrl = (url?: string): string | undefined =>
  url ? withCloudinaryTransform(url, TESTIMONIAL_PHOTO_TRANSFORM) : undefined;

/**
 * Guard against a client posting an arbitrary public id in the hidden form
 * field. Only ids inside our own folder are accepted, so a submission cannot
 * point the testimonial at some unrelated asset in the account.
 */
export const isTestimonialPhotoPublicId = (publicId: string): boolean =>
  new RegExp(`^${TESTIMONIAL_PHOTO_FOLDER}/[A-Za-z0-9_-]{1,120}$`).test(
    publicId
  );

/** Matches a Cloudinary secure_url pointing at our folder. */
export const isTestimonialPhotoUrl = (url: string): boolean =>
  /^https:\/\/res\.cloudinary\.com\/[A-Za-z0-9_-]+\/image\/upload\//.test(url) &&
  url.includes(`/${TESTIMONIAL_PHOTO_FOLDER}/`);
