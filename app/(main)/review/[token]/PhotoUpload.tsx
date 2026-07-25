"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Gallery, Trash } from "iconsax-react";

import FieldError from "@/app/components/Inputs/FieldError";
import Text from "@/app/components/Generics/Text";
import {
  ALLOWED_PHOTO_MIME_TYPES,
  MAX_PHOTO_BYTES,
  testimonialPhotoUrl,
} from "@/app/lib/cloudinary";

interface Props {
  token: string;
  error?: string;
  /**
   * Reported by callback rather than read off the hidden inputs, because the
   * upload finishes asynchronously and setting React state does not fire a
   * change event the parent form could listen for.
   */
  onPhotoChange?: (url?: string) => void;
}

type Status =
  | { kind: "idle" }
  | { kind: "uploading" }
  | { kind: "done"; url: string; publicId: string }
  | { kind: "error"; message: string };

type SignatureResponse = {
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
  allowedFormats: string;
  uploadUrl: string;
};

const MB = 1024 * 1024;

/**
 * Photo picker that uploads straight to Cloudinary.
 *
 * The file is uploaded when it is *selected*, not when the form is submitted.
 * Two reasons: the bytes never pass through this app (so we stay well under the
 * server action body limit and don't pay the bandwidth), and the client sees the
 * real face-cropped result before committing, rather than discovering a bad crop
 * once it is live on the site.
 *
 * The resulting URL and public id ride along in hidden inputs. Both are
 * re-validated server-side, see isTestimonialPhotoPublicId.
 */
const PhotoUpload = ({ token, error, onPhotoChange }: Readonly<Props>) => {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setStatus({ kind: "idle" });
    if (inputRef.current) inputRef.current.value = "";
    onPhotoChange?.(undefined);
  };

  const fail = (message: string) => {
    setStatus({ kind: "error", message });
    onPhotoChange?.(undefined);
  };

  const handleFile = async (file: File) => {
    const allowedTypes: readonly string[] = ALLOWED_PHOTO_MIME_TYPES;
    if (!allowedTypes.includes(file.type)) {
      fail("Please choose a JPG, PNG or WebP image.");
      return;
    }

    if (file.size > MAX_PHOTO_BYTES) {
      fail(
        `That image is ${(file.size / MB).toFixed(1)}MB. Please choose one under ${MAX_PHOTO_BYTES / MB}MB.`
      );
      return;
    }

    setStatus({ kind: "uploading" });

    try {
      const signRes = await fetch(`/api/reviews/${token}/photo-signature`, {
        method: "POST",
      });

      if (!signRes.ok) {
        const body = await signRes.json().catch(() => ({}));
        fail(
          body.message ??
            "Could not prepare the upload. You can still submit without a photo."
        );
        return;
      }

      const sign: SignatureResponse = await signRes.json();

      // Cloudinary rebuilds the signature from these fields, so they must be
      // sent back exactly as issued. Adding or changing one invalidates it.
      const payload = new FormData();
      payload.append("file", file);
      payload.append("api_key", sign.apiKey);
      payload.append("timestamp", String(sign.timestamp));
      payload.append("signature", sign.signature);
      payload.append("folder", sign.folder);
      payload.append("allowed_formats", sign.allowedFormats);

      const uploadRes = await fetch(sign.uploadUrl, {
        method: "POST",
        body: payload,
      });

      if (!uploadRes.ok) {
        fail("The upload was rejected. Please try a different image.");
        return;
      }

      const uploaded = await uploadRes.json();

      setStatus({
        kind: "done",
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
      });
      onPhotoChange?.(uploaded.secure_url);
    } catch {
      fail(
        "Upload failed, please check your connection and try again. You can also submit without a photo."
      );
    }
  };

  const preview =
    status.kind === "done" ? testimonialPhotoUrl(status.url) : undefined;

  return (
    <div>
      {status.kind === "done" && preview ? (
        <div className="flex items-center gap-4">
          <Image
            src={preview}
            alt="Your photo as it will appear"
            width={96}
            height={96}
            className="h-24 w-24 rounded-full object-cover"
          />
          <div>
            <Text type="caption" color="gray">
              This is how it will appear on the site.
            </Text>
            <button
              type="button"
              onClick={reset}
              className="mt-1 inline-flex items-center gap-1 text-sm
              text-primary-normal hover:underline"
            >
              <Trash size={16} />
              Remove and choose another
            </button>
          </div>

          <input type="hidden" name="photoUrl" value={status.url} />
          <input type="hidden" name="photoPublicId" value={status.publicId} />
        </div>
      ) : (
        <label
          className="flex cursor-pointer items-center gap-3 rounded-lg border
          border-dashed border-secondary-normal px-4 py-5
          hover:bg-primary-container/40"
        >
          <input
            ref={inputRef}
            type="file"
            accept={ALLOWED_PHOTO_MIME_TYPES.join(",")}
            className="sr-only"
            disabled={status.kind === "uploading"}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void handleFile(file);
            }}
          />
          <Gallery className="shrink-0 text-secondary-normal" />
          <span>
            <Text variant="semibold">
              {status.kind === "uploading"
                ? "Uploading your photo..."
                : "Add a photo (optional)"}
            </Text>
            <Text type="caption" color="gray">
              JPG, PNG or WebP, up to {MAX_PHOTO_BYTES / MB}MB. A clear
              head-and-shoulders shot works best.
            </Text>
          </span>
        </label>
      )}

      <FieldError
        message={status.kind === "error" ? status.message : error}
      />
    </div>
  );
};

export default PhotoUpload;
