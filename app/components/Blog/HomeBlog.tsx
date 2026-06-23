import HeaderContent from "../Generics/HeaderContent";
import Wrapper from "../Generics/Wrapper";
import ContentSpacing from "../Spacing/ContentSpacing";
import Button from "../Buttons/Button";
import BlogCard from "@/app/(main)/blog/BlogCard";
import { blogPosts } from "@/app/(main)/blog/posts";

const HomeBlog = () => {
  const latest = blogPosts.slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <Wrapper>
      <HeaderContent heading="Learn something new from our blog" center>
        Practical guides and interactive explainers to help you build real
        skills, from how AI works to the tools shaping the future.
      </HeaderContent>
      <ContentSpacing />
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Button elementType="link" href="/blog" variant="primary">
          Explore all articles
        </Button>
      </div>
    </Wrapper>
  );
};

export default HomeBlog;
