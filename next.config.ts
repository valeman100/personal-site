import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  // Allow `.mdx` files to be resolved as pages/routes
  pageExtensions: ["ts", "tsx", "mdx"],
};

export default withMDX(nextConfig);
