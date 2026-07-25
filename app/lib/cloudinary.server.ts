import "server-only";

import { v2 as cloudinary } from "cloudinary";

import {
  ALLOWED_PHOTO_FORMATS,
  TESTIMONIAL_PHOTO_FOLDER,
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

export const isCloudinaryConfigured = (): boolean =>
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
