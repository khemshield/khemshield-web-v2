import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star1, TickCircle, Clock, Profile2User, ArrowRight } from "iconsax-react";

import Heading from "@/app/components/Generics/Heading";
import Text from "@/app/components/Generics/Text";
import Button from "@/app/components/Buttons/Button";
import { formatNumber } from "@/app/lib/formatNumber";
import Course from "../Course";
import {
  courses,
  getCourseBySlug,
  getRelatedCourses,
  type Course as CourseType,
} from "../courseData";

interface Params {
  params: { slug: string };
}

// Enrollment goes through WhatsApp for now. Number: +234 810 261 8131
const WHATSAPP_NUMBER = "2348102618131";
const enrollHref = (courseName: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Khemshield, I'd like to enroll in the ${courseName} course.`
  )}`;

export const generateStaticParams = () =>
  courses.map((c) => ({ slug: c.slug }));

export const generateMetadata = ({ params }: Params): Metadata => {
  const course = getCourseBySlug(params.slug);
  if (!course) return { title: "Training" };
  const description = course.tagline ?? course.overview;
  // The course's own photo is the social-share image. metadataBase (set in the
  // root layout) turns the static `.src` path into an absolute URL, and the
  // width/height let scrapers like WhatsApp render a large preview card.
  const image = {
    url: course.image.src,
    width: course.image.width,
    height: course.image.height,
    alt: course.name,
  };
  return {
    title: { absolute: `${course.name} | Khemshield Training` },
    description,
    alternates: { canonical: `/training/${course.slug}` },
    openGraph: {
      title: `${course.name} | Khemshield Training`,
      description,
      url: `/training/${course.slug}`,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.name} | Khemshield Training`,
      description,
      images: [image],
    },
  };
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary-normal">
    {children}
  </p>
);

const TrainingDetailPage = ({ params }: Params) => {
  const course = getCourseBySlug(params.slug);
  if (!course) notFound();

  const c: CourseType = course;
  const related = getRelatedCourses(c);

  return (
    <article>
      {/* ───────── Hero (dark) ───────── */}
      <section className="relative -mt-10 overflow-hidden bg-ink text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(244,51,52,0.16),transparent_62%)]"
        />
        <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-12 lg:py-20">
          <div>
            <nav className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/45">
              <Link href="/" className="hover:text-white">
                Home
              </Link>{" "}
              /{" "}
              <Link href="/training" className="hover:text-white">
                Training
              </Link>{" "}
              / <span className="text-white/70">{c.category}</span>
            </nav>

            <div className="mt-6">
              <span className="rounded-full bg-primary-normal/15 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-primary-normal">
                {c.category}
              </span>
            </div>

            <h1 className="mt-4 font-display text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-5xl">
              {c.name}
            </h1>

            {c.tagline && (
              <p className="mt-5 max-w-[46ch] leading-relaxed text-white/65">
                {c.tagline}
              </p>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-white/60">
              <span className="flex items-center gap-1.5">
                <Star1 size={15} variant="Bold" className="text-orange-400" />
                {c.rating} rating
              </span>
              <span className="flex items-center gap-1.5">
                <Profile2User size={15} />
                {formatNumber(c.reviewCount, { decimal: true })} students
              </span>
              {c.durationWeeks && (
                <span className="flex items-center gap-1.5">
                  <Clock size={15} />
                  {c.durationWeeks} weeks
                </span>
              )}
              {c.level && <span>{c.level}</span>}
            </div>

            <div className="mt-8 flex flex-col gap-4 xs:flex-row">
              <Button
                elementType="link"
                href={enrollHref(c.name)}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                Enroll now
              </Button>
              <Button
                elementType="link"
                href="/contact"
                variant="border"
                styles="!border-white/30 !text-white hover:!border-white"
              >
                Talk to us &rarr;
              </Button>
            </div>
          </div>

          <div className="relative">
            <Image
              src={c.image}
              alt={c.name}
              className="h-[260px] w-full rounded-2xl object-cover shadow-[0_30px_70px_rgba(0,0,0,0.45)] lg:h-[360px]"
            />
          </div>
        </div>
      </section>

      {/* ───────── Body ───────── */}
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[1fr_320px] lg:gap-16 lg:px-12 lg:py-20">
        {/* Main column */}
        <div className="min-w-0">
          {c.overview && (
            <section>
              <Eyebrow>Overview</Eyebrow>
              <div className="mt-3">
                <Heading variant="h3" styles="font-display">
                  About this course
                </Heading>
              </div>
              <Text styles="mt-4">{c.overview}</Text>
              {c.audience && (
                <p className="mt-4 text-sm text-[#8C94A3]">
                  <span className="font-semibold text-secondary-normal">
                    Who it&apos;s for:{" "}
                  </span>
                  {c.audience}
                </p>
              )}
            </section>
          )}

          {c.outcomes && c.outcomes.length > 0 && (
            <section className="mt-14">
              <Eyebrow>What you&apos;ll learn</Eyebrow>
              <div className="mt-3">
                <Heading variant="h3" styles="font-display">
                  Skills you&apos;ll walk away with
                </Heading>
              </div>
              <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {c.outcomes.map((o) => (
                  <li key={o} className="flex gap-3">
                    <TickCircle
                      size={20}
                      variant="Bold"
                      className="mt-0.5 shrink-0 text-primary-normal"
                    />
                    <span className="text-secondary-normal">{o}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {c.curriculum && c.curriculum.length > 0 && (
            <section className="mt-14">
              <Eyebrow>Curriculum</Eyebrow>
              <div className="mt-3">
                <Heading variant="h3" styles="font-display">
                  Your step-by-step learning path
                </Heading>
              </div>
              <ol className="mt-7 flex flex-col gap-4">
                {c.curriculum.map((phase, i) => (
                  <li
                    key={phase.title}
                    className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-khemshadow"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light font-mono text-sm font-semibold text-primary-normal">
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <Heading variant="h4" styles="font-display">
                          {phase.title}
                        </Heading>
                        {phase.subtitle && (
                          <p className="mt-1 text-sm text-[#8C94A3]">
                            {phase.subtitle}
                          </p>
                        )}
                        <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                          {phase.topics.map((t) => (
                            <li
                              key={t}
                              className="flex gap-2 text-sm text-secondary-normal"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-normal" />
                              {t}
                            </li>
                          ))}
                        </ul>
                        {phase.tools && phase.tools.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {phase.tools.map((tool) => (
                              <span
                                key={tool}
                                className="rounded-full bg-support px-2.5 py-1 font-mono text-[0.66rem] text-secondary-normal"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {c.tools && c.tools.length > 0 && (
            <section className="mt-14">
              <Eyebrow>Tools &amp; technologies</Eyebrow>
              <div className="mt-3">
                <Heading variant="h3" styles="font-display">
                  What you&apos;ll work with
                </Heading>
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {c.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 font-mono text-xs text-secondary-normal"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sticky aside */}
        <aside className="lg:relative">
          <div className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-khemshadow">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#8C94A3]">
                Tuition
              </p>
              <p className="mt-1 font-display text-3xl font-extrabold text-secondary-normal">
                {formatNumber(c.price)}
              </p>

              <dl className="mt-6 flex flex-col gap-3 border-t border-black/[0.07] pt-5 text-sm">
                {c.level && (
                  <div className="flex justify-between">
                    <dt className="text-[#8C94A3]">Level</dt>
                    <dd className="font-medium text-secondary-normal">
                      {c.level}
                    </dd>
                  </div>
                )}
                {c.durationWeeks && (
                  <div className="flex justify-between">
                    <dt className="text-[#8C94A3]">Duration</dt>
                    <dd className="font-medium text-secondary-normal">
                      {c.durationWeeks} weeks
                    </dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-[#8C94A3]">Category</dt>
                  <dd className="font-medium text-secondary-normal">
                    {c.category}
                  </dd>
                </div>
                {c.prerequisites && c.prerequisites.length > 0 && (
                  <div>
                    <dt className="text-[#8C94A3]">Prerequisites</dt>
                    <dd className="mt-1 font-medium text-secondary-normal">
                      {c.prerequisites.join(" · ")}
                    </dd>
                  </div>
                )}
              </dl>

              <div className="mt-6">
                <Button
                  elementType="link"
                  href={enrollHref(c.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  full
                >
                  Enroll now
                </Button>
              </div>

              {c.certifications && c.certifications.length > 0 && (
                <p className="mt-4 text-xs leading-relaxed text-[#8C94A3]">
                  {c.certifications[0]}
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* ───────── Related ───────── */}
      {related.length > 0 && (
        <section className="bg-support py-16 lg:py-20">
          <div className="mx-auto max-w-[1180px] px-6 lg:px-12">
            <Eyebrow>Keep exploring</Eyebrow>
            <div className="mt-3">
              <Heading variant="h3" styles="font-display">
                Related courses
              </Heading>
            </div>
            <ul className="mt-8 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rc) => (
                <li key={rc.slug}>
                  <Course
                    slug={rc.slug}
                    category={rc.category}
                    image={rc.image}
                    price={rc.price}
                    name={rc.name}
                    rating={rc.rating}
                    review_count={rc.reviewCount}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ───────── Closing CTA (dark) ───────── */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-[1180px] px-6 py-16 text-center lg:px-12 lg:py-20">
          <Eyebrow>Start here</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-[18ch] font-display text-3xl font-extrabold tracking-[-0.03em] lg:text-4xl">
            Ready to start {c.name}?
          </h2>
          <p className="mx-auto mt-4 max-w-[42ch] text-white/65">
            Join the next cohort, or talk to us about the right path for your
            goals.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button
              elementType="link"
              href={enrollHref(c.name)}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              Enroll now
            </Button>
            <Button
              elementType="link"
              href="/training"
              variant="border"
              styles="!border-white/30 !text-white hover:!border-white"
            >
              Browse all courses <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
};

export default TrainingDetailPage;
