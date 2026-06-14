/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep Prisma out of the bundler so its query engine is traced into the
  // serverless function on Vercel (prevents runtime "engine not found" errors).
  serverExternalPackages: ["@prisma/client", "prisma"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
};

export default nextConfig;
