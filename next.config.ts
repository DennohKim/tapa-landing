import type { NextConfig } from "next";

// The home page is the static site in public/ (index.html, band.js, assets/). No app route claims "/",
// so this afterFiles rewrite serves public/index.html there while keeping the URL clean.
const nextConfig: NextConfig = {
  rewrites() {
    return [{ source: "/", destination: "/index.html" }];
  },
};

export default nextConfig;
