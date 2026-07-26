import "server-only";

import { v2 as cloudinary } from "cloudinary";

import {
  ALLOWED_PHOTO_FORMATS,
  TESTIMONIAL_PHOTO_FOLDER,
  isTestimonialPhotoPublicId,
} from "./cloudinary";

/**
 * Server-side Cloudinary signing.
 *
 * The API secret never leaves the server. The browser asks for a signature,
 * then uploads the file straight to Cloudinary, so photo bytes never pass
 * through this app (which also keeps us under the server action body limit).
 */

export type PhotoUploadSignature = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
  allowedFormats: string;
  /** Where the browser POSTs the multipart form. */
  uploadUrl: string;
};

/**
 * Sign an upload into the testimonials folder.
 *
 * Cloudinary rebuilds the signature from the params it receives, so the browser
 * must send back exactly `folder`, `timestamp` and `allowed_formats` unchanged,
 * plus `api_key`, `signature` and `file`. Sending any extra or altered param
 * invalidates the signature. `allowed_formats` is signed deliberately: format
 * enforcement then happens at Cloudinary rather than being a client-side check
 * a determined caller could skip.
 */
export const signTestimonialPhotoUpload = (): PhotoUploadSignature => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in web/.env.local."
    );
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const allowedFormats = ALLOWED_PHOTO_FORMATS.join(",");

  const signature = cloudinary.utils.api_sign_request(
    {
      folder: TESTIMONIAL_PHOTO_FOLDER,
      timestamp,
      allowed_formats: allowedFormats,
    },
    apiSecret
  );

  return {
    cloudName,
    apiKey,
    timestamp,
    signature,
    folder: TESTIMONIAL_PHOTO_FOLDER,
    allowedFormats,
    uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
  };
};

/**
 * Permanently remove a testimonial photo from Cloudinary.
 *
 * Called when a review is deleted. Without this, "delete" would leave the
 * person's face publicly reachable on the CDN by URL, which is exactly what an
 * erasure request is asking you to stop.
 *
 * Guarded by the folder check so a tampered `photoPublicId` cannot be used to
 * destroy an unrelated asset in the account. Returns a result rather than
 * throwing: the database record is already gone by this point, so a Cloudinary
 * hiccup should be reported, not allowed to undo the deletion.
 */
export const destroyTestimonialPhoto = async (
  publicId: string
): Promise<{ ok: boolean; error?: string }> => {
  if (!isTestimonialPhotoPublicId(publicId)) {
    return {
      ok: false,
      error: `Refusing to delete "${publicId}", it is not in the testimonials folder.`,
    };
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return { ok: false, error: "Cloudinary is not configured." };
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    // "not found" means it is already gone, which satisfies the intent.
    if (result.result === "ok" || result.result === "not found") {
      return { ok: true };
    }
    return { ok: false, error: `Cloudinary returned "${result.result}".` };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown Cloudinary error.",
    };
  }
};

export const isCloudinaryConfigured = (): boolean =>
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
