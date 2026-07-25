/**
 * The exact wording a client agrees to when submitting a review.
 *
 * Stored on every testimonial alongside the timestamp, so if someone later asks
 * for their review to be taken down we have a record of what they actually
 * agreed to and when. Never edit an existing version in place: add a new
 * version constant and bump CONSENT_VERSION, otherwise older records will claim
 * agreement to wording their author never saw.
 */

export const CONSENT_VERSION = "v1";

export const CONSENT_TEXT =
  "I confirm this review is my own honest opinion, and I give Khemshield permission to publish it along with my name, role, company and photo on its website and marketing material.";
