import type { Metadata } from "next";
import Wrapper from "@/app/components/Generics/Wrapper";
import Heading from "@/app/components/Generics/Heading";
import Text from "@/app/components/Generics/Text";
import BlogCard from "./BlogCard";
import { blogPosts } from "./posts";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Learn new skills with clear, hands-on guides and interactive explainers from the Khemshield team.",
  alternates: { canonical: "/blog" },
};

const BlogPage = () => {
  return (
    <Wrapper styles="py-10 lg:py-16">
      {/* Hero */}
      <header className="mx-auto max-w-2xl text-center">
        <Text color="primary" styles="font-semibold">
          Khemshield Insights
        </Text>
        <div className="mt-3">
          <Heading variant="h1">Learn a new skill, one read at a time</Heading>
        </div>
        <p className="mx-auto mt-5 max-w-xl text-[#8C94A3]">
          Clear, practical guides and interactive explainers to help you
          understand technology and grow your skills, written for curious
          beginners and busy professionals alike.
        </p>
      </header>

      {/* Posts grid */}
      <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {blogPosts.length === 0 && (
        <p className="mt-16 text-center text-[#8C94A3]">
          No posts yet, check back soon.
        </p>
      )}
    </Wrapper>
  );
};

export default BlogPage;
