import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All imagery is vendored under /public/img, so no remote patterns are needed.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
