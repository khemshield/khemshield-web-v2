/**
 * Server-side data access for the /training pages.
 *
 * Courses now live in the backend (managed from the admin dashboard). This
 * module fetches them over GraphQL and maps the backend shape onto the field
 * names the training UI already uses, so the page components barely change.
 *
 * Resilience: if the backend is unreachable, we fall back to the bundled static
 * `courseData.ts` so the public marketing site never goes blank. A successful
 * (even empty) backend response is trusted as the source of truth.
 */

import {
  courses as staticCourses,
  type Course as StaticCourse,
} from "./courseData";

export type CoursePhaseView = {
  title: string;
  subtitle?: string;
  topics: string[];
  tools?: string[];
};

/** The view model the /training components consume. */
export type CourseView = {
  slug: string;
  name: string;
  category: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  tagline?: string;
  overview?: string;
  audience?: string;
  level?: string;
  duration?: string;
  outcomes?: string[];
  prerequisites?: string[];
  tools?: string[];
  certifications?: string[];
  curriculum?: CoursePhaseView[];
};

// ── backend shape (only the fields we request) ──
type BackendDuration = { length: number; unit: string };
type BackendSection = {
  name: string;
  subtitle?: string | null;
  tools?: string[] | null;
  lectures?: { name: string }[] | null;
};
type BackendCourse = {
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
  price: number;
  rating?: number | null;
  reviewCount?: number | null;
  tagline?: string | null;
  description?: string | null;
  targetAudience?: string[] | null;
  level?: string | null;
  duration?: BackendDuration | null;
  objectives?: string[] | null;
  requirements?: string[] | null;
  tools?: string[] | null;
  certifications?: string[] | null;
  curriculum?: { sections?: BackendSection[] | null } | null;
};

const BASE_URL = process.env.KHEMSHIELD_BASE_URL || "http://localhost:5000";
const ENDPOINT = `${BASE_URL}/api/v1/graphql`;

const LEVEL_LABEL: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  beginner_intermediate: "Beginner / Intermediate",
  advance: "Advanced",
  advanced: "Advanced",
};

const formatLevel = (level?: string | null): string | undefined => {
  if (!level) return undefined;
  return LEVEL_LABEL[level] ?? level;
};

const formatDuration = (d?: BackendDuration | null): string | undefined => {
  if (!d?.length || !d?.unit) return undefined;
  const unit = d.length > 1 ? `${d.unit}s` : d.unit;
  return `${d.length} ${unit}`;
};

const clean = (arr?: (string | null)[] | null): string[] | undefined => {
  if (!arr) return undefined;
  const out = arr.filter((s): s is string => Boolean(s));
  return out.length ? out : undefined;
};

const FIELDS = `
  slug
  title
  category
  thumbnail
  price
  rating
  reviewCount
  tagline
  level
  duration { length unit }
`;

const DETAIL_FIELDS = `
  ${FIELDS}
  description
  targetAudience
  objectives
  requirements
  tools
  certifications
  curriculum { sections { name subtitle tools lectures { name } } }
`;

async function gql<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    // Revalidate every 5 minutes so admin edits surface without a redeploy.
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`GraphQL HTTP ${res.status}`);
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(json.errors[0].message);
  if (!json.data) throw new Error("GraphQL response had no data");
  return json.data;
}

const mapBackend = (c: BackendCourse): CourseView => ({
  slug: c.slug,
  name: c.title,
  category: c.category,
  image: c.thumbnail,
  price: c.price,
  rating: c.rating ?? 0,
  reviewCount: c.reviewCount ?? 0,
  tagline: c.tagline ?? undefined,
  overview: c.description ?? undefined,
  audience: clean(c.targetAudience)?.join(" "),
  level: formatLevel(c.level),
  duration: formatDuration(c.duration),
  outcomes: clean(c.objectives),
  prerequisites: clean(c.requirements),
  tools: clean(c.tools),
  certifications: clean(c.certifications),
  curriculum: c.curriculum?.sections?.length
    ? c.curriculum.sections.map((s) => ({
        title: s.name,
        subtitle: s.subtitle ?? undefined,
        topics: (s.lectures ?? []).map((l) => l.name),
        tools: clean(s.tools),
      }))
    : undefined,
});

// ── static fallback mapping (keeps the site alive if the backend is down) ──
const mapStatic = (c: StaticCourse): CourseView => ({
  slug: c.slug,
  name: c.name,
  category: c.category,
  image: c.image.src,
  price: c.price,
  rating: c.rating,
  reviewCount: c.reviewCount,
  tagline: c.tagline,
  overview: c.overview,
  audience: c.audience,
  level: c.level,
  duration: c.durationWeeks ? `${c.durationWeeks} weeks` : undefined,
  outcomes: c.outcomes,
  prerequisites: c.prerequisites,
  tools: c.tools,
  certifications: c.certifications,
  curriculum: c.curriculum?.map((p) => ({
    title: p.title,
    subtitle: p.subtitle,
    topics: p.topics,
    tools: p.tools,
  })),
});

export async function getCourses(): Promise<CourseView[]> {
  try {
    const data = await gql<{ courses: BackendCourse[] }>(
      `query { courses { ${FIELDS} } }`
    );
    return data.courses.map(mapBackend);
  } catch (err) {
    console.warn(
      "[training] backend courses fetch failed, using static fallback:",
      err
    );
    return staticCourses.map(mapStatic);
  }
}

export async function getCourse(slug: string): Promise<CourseView | null> {
  try {
    const data = await gql<{ courseBySlug: BackendCourse | null }>(
      `query ($slug: String!) { courseBySlug(slug: $slug) { ${DETAIL_FIELDS} } }`,
      { slug }
    );
    return data.courseBySlug ? mapBackend(data.courseBySlug) : null;
  } catch (err) {
    console.warn(
      `[training] backend course fetch failed for "${slug}", using static fallback:`,
      err
    );
    const found = staticCourses.find((c) => c.slug === slug);
    return found ? mapStatic(found) : null;
  }
}

export async function getCourseSlugs(): Promise<string[]> {
  try {
    const data = await gql<{ courses: { slug: string }[] }>(
      `query { courses { slug } }`
    );
    return data.courses.map((c) => c.slug);
  } catch {
    return staticCourses.map((c) => c.slug);
  }
}

export function getRelatedCourses(
  all: CourseView[],
  course: CourseView,
  n = 3
): CourseView[] {
  const sameCategory = all.filter(
    (c) => c.slug !== course.slug && c.category === course.category
  );
  const others = all.filter(
    (c) => c.slug !== course.slug && c.category !== course.category
  );
  return [...sameCategory, ...others].slice(0, n);
}
