import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages at the project path
 * poorlymadegoods.github.io/pmg-website. If the site moves to a custom
 * domain (or any root domain), REMOVE the basePath line — root domains
 * serve from / and basePath would break every asset URL.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/pmg-website",
  images: { unoptimized: true },
};

export default nextConfig;
