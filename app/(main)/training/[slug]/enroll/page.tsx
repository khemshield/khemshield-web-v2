import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Wrapper from "@/app/components/Generics/Wrapper";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import { getCourse } from "../../course.api";
import EnrollForm from "./EnrollForm";
import CourseSummary from "./CourseSummary";

interface Params {
  params: { slug: string };
}

export const generateMetadata = async ({
  params,
}: Params): Promise<Metadata> => {
  const course = await getCourse(params.slug);
  return {
    title: course ? `Enroll: ${course.name}` : "Enroll",
    description: course
      ? `Enroll in the ${course.name} course at Khemshield.`
      : undefined,
    alternates: { canonical: `/training/${params.slug}/enroll` },
    robots: { index: false },
  };
};

const EnrollPage = async ({ params }: Params) => {
  const course = await getCourse(params.slug);
  if (!course) notFound();

  return (
    <section>
      <Wrapper>
        <ContentSpacing />
        <nav className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#8C94A3]">
          <Link href="/training" className="hover:text-primary-normal">
            Training
          </Link>{" "}
          /{" "}
          <Link
            href={`/training/${course.slug}`}
            className="hover:text-primary-normal"
          >
            {course.name}
          </Link>{" "}
          / <span>Enroll</span>
        </nav>

        <div className="mt-4 max-w-[640px]">
          <h1 className="font-display text-[2rem] font-extrabold leading-tight tracking-[-0.03em] text-secondary-normal sm:text-4xl">
            Enroll in {course.name}
          </h1>
          <p className="mt-3 text-secondary-normal/75">
            Tell us a little about yourself and choose how you&apos;d like to
            pay. It only takes a minute.
          </p>
        </div>

        <ContentSpacing />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">
          <div className="order-2 min-w-0 lg:order-1">
            <EnrollForm
              courseSlug={course.slug}
              courseName={course.name}
              price={course.price}
            />
          </div>
          <aside className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-28">
              <CourseSummary course={course} />
            </div>
          </aside>
        </div>
        <ContentSpacing />
      </Wrapper>
    </section>
  );
};

export default EnrollPage;
