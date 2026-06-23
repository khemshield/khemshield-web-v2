import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "iconsax-react";
import type { BlogPost } from "./posts";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const BlogCard = ({ post }: { post: BlogPost }) => {
  const isCustom = post.type === "custom";

  const card = (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white
      shadow-khemshadow ring-1 ring-secondary-light/60 transition-all duration-300
      hover:-translate-y-1 hover:shadow-[0_12px_50px_0_rgba(0,0,0,0.10)]"
    >
      {/* Cover */}
      <div className="relative h-44 w-full overflow-hidden">
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`h-full w-full bg-gradient-to-br ${
              post.accent ?? "from-primary-normal to-primary-dark"
            }`}
          />
        )}
        <span
          className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-xs
          font-medium text-white backdrop-blur-sm"
        >
          {isCustom ? "Interactive" : "Article"}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary-container px-2.5 py-1 text-xs
              font-medium text-primary-dark"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3
          className="text-lg font-semibold text-secondary-normal transition-colors
          group-hover:text-primary-normal"
        >
          {post.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm text-[#8C94A3]">{post.excerpt}</p>

        <div className="mt-auto pt-5">
          <div className="mb-4 flex items-center gap-2 text-xs text-[#8C94A3]">
            <span className="font-medium text-secondary-normal">
              {post.author}
            </span>
            <span aria-hidden>·</span>
            <span>{formatDate(post.date)}</span>
            <span aria-hidden>·</span>
            <span>{post.readTime}</span>
          </div>
          <span
            className="inline-flex items-center gap-1.5 text-sm font-semibold
            text-primary-normal"
          >
            Read more
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </article>
  );

  // Custom posts are standalone static HTML pages → plain anchor (full page load).
  // Article posts are internal Next routes → Link (client nav + prefetch).
  return isCustom ? (
    <a href={post.href} className="block h-full">
      {card}
    </a>
  ) : (
    <Link href={post.href} className="block h-full">
      {card}
    </Link>
  );
};

export default BlogCard;
