/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Course thumbnails may be admin-uploaded to S3 (absolute URLs). Allow the
    // project bucket so next/image can optimise them. Seeded courses use
    // same-origin /public paths, which need no config.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
