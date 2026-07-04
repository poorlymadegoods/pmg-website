import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages at a root domain (custom domain or
 * username.github.io). If this ever moves to a project path
 * (username.github.io/repo-name), add `basePath: "/repo-name"` here.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
