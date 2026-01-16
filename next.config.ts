import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  transpilePackages: ["shiki"],
  experimental: {
    mdxRs: {
      mdxType: "gfm",
    },
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
