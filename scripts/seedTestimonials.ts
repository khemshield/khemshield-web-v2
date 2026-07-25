/**
 * Load the two original testimonials into the database.
 *
 *   npm run seed:testimonials
 *
 * Idempotent: matches on `seedKey` and only writes on insert, so re-running
 * never overwrites a status you changed in the studio. If you unpublish a
 * seeded testimonial and run this again, it stays unpublished.
 *
 * Reads whatever MONGODB_URL is in the environment, so it seeds dev or
 * production depending on where you run it. The same convention as the
 * backend's seed scripts.
 *
 * Note this connects with mongoose directly rather than through
 * app/lib/db/connect.ts, because that module imports "server-only", which
 * throws outside a Next server bundle.
 */

import mongoose from "mongoose";

import Testimonial, {
  TestimonialRelationship,
  TestimonialSource,
  TestimonialStatus,
} from "../app/lib/reviews/testimonial.model";

/**
 * The wording is the clients' own, reproduced as it appeared on the site with
 * only two mechanical fixes: the stray unbalanced opening quote character is
 * gone (the card adds quotation styling itself now) and the hard-wrapped source
 * indentation is collapsed. Nothing has been reworded.
 *
 * The Franklin Hicks / Leptons Multiconcept entry from app/data/testimonials.ts
 * is deliberately not here. It was placeholder content.
 */
const ORIGINALS = [
  {
    seedKey: "adesola-raphael",
    order: 0,
    rating: 5,
    body: "Khem, your cybersecurity course has been a game-changer for me. Your dedication to teaching and shaping the curriculum has been invaluable. Thanks to your mentorship, I feel well-equipped to embark on my journey in this field.",
    author: {
      name: "Raphael Adelana Adesola",
      role: "Student",
      photoUrl: "/assets/images/testimonials/adesola.jpg",
    },
    relationship: TestimonialRelationship.Student,
    engagement: "Cybersecurity training",
  },
  {
    seedKey: "bello-abdulsobur-olalekan",
    order: 1,
    // Recorded as 4.5 in the original data file, preserved rather than rounded.
    rating: 4.5,
    body: "I appreciate Khemshield's commitment to the success of our E-TopUp project. Surprisingly, the work arrived earlier than expected, despite the initial promise for the end of January. I had anticipated its delivery around January 28th, 29th, or 30th, or even allowing for an additional week.",
    author: {
      name: "Bello Abdulsobur Olalekan",
      role: "CEO",
      company: "Universal Top-Up Communication",
      photoUrl: "/assets/images/testimonials/olabobo1.jpg",
    },
    relationship: TestimonialRelationship.Client,
    engagement: "E-TopUp platform",
  },
];

/**
 * These two predate the review system, so there is no form submission to point
 * at. Recording that honestly rather than fabricating a consent event: both were
 * sent directly to Khemshield for publication and were already live on the site.
 */
const LEGACY_CONSENT = {
  agreed: true,
  at: new Date("2024-01-23T00:00:00.000Z"),
  version: "legacy",
  text: "Consent predates the review system. Sent directly to Khemshield for publication and already live on khemshield.com before testimonials moved into the database.",
};

/** The date the originals were already on the site. Only breaks order ties. */
const LEGACY_PUBLISHED_AT = new Date("2024-01-23T00:00:00.000Z");

const run = async () => {
  const url = process.env.MONGODB_URL;
  if (!url) {
    console.error(
      "MONGODB_URL is not set. Is web/.env.local present and filled in?"
    );
    process.exit(1);
  }

  const dbName = url.match(/\/([^/?]+)\?/)?.[1] ?? "unknown";
  console.log(`Connecting to ${dbName}...`);
  await mongoose.connect(url);

  let inserted = 0;
  let skipped = 0;

  for (const original of ORIGINALS) {
    const result = await Testimonial.updateOne(
      { seedKey: original.seedKey },
      {
        $setOnInsert: {
          ...original,
          status: TestimonialStatus.Published,
          source: TestimonialSource.Seed,
          consent: LEGACY_CONSENT,
          publishedAt: LEGACY_PUBLISHED_AT,
        },
      },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      inserted += 1;
      console.log(`  + ${original.author.name}`);
    } else {
      skipped += 1;
      console.log(`  = ${original.author.name} (already present, left alone)`);
    }
  }

  const published = await Testimonial.countDocuments({
    status: TestimonialStatus.Published,
  });

  console.log(
    `\nDone. ${inserted} inserted, ${skipped} already present. ${published} testimonial(s) now published.`
  );

  await mongoose.disconnect();
};

run().catch(async (err) => {
  console.error("Seeding failed:", err);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
