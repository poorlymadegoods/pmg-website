import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages at the custom domain poorlymadegoods.com
 * (see public/CNAME). Root domains serve from /, so no basePath. If the
 * site ever falls back to the project path poorlymadegoods.github.io/pmg-website,
 * re-add `basePath: "/pmg-website"` or every asset URL 404s.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
