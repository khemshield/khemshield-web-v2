import { NextResponse } from "next/server";

import connectDB from "@/app/lib/db/connect";
import { lookupInvite } from "@/app/lib/reviews/review.service";
import {
  isCloudinaryConfigured,
  signTestimonialPhotoUpload,
} from "@/app/lib/cloudinary.server";

/**
 * Issue a short-lived Cloudinary upload signature for one review link.
 *
 * Gated on the invite token so the endpoint can't be used as a free upload
 * signature service: only somebody holding a live review link gets a signature,
 * and only into the testimonials folder.
 *
 * TEMPORARY: moves to the backend along with app/lib/reviews/.
 */
export async function POST(
  _request: Request,
  { params }: { params: { token: string } }
) {
  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      {
        message:
          "Photo upload is not configured yet. You can submit your review without a photo.",
      },
      { status: 503 }
    );
  }

  try {
    await connectDB();
    const { state } = await lookupInvite(params.token);

    if (state !== "valid") {
      return NextResponse.json(
        { message: "This review link is no longer active." },
        { status: 403 }
      );
    }

    return NextResponse.json(signTestimonialPhotoUpload());
  } catch (err) {
    console.error("[reviews] photo signature failed:", err);
    return NextResponse.json(
      { message: "Could not prepare the upload. Please try again." },
      { status: 500 }
    );
  }
}
