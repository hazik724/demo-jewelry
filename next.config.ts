import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images:{
    unoptimized: true,
    domains:["images.unsplash.com","cdn.sanity.io"],
    qualities:[75, 90]
  }
};

export default nextConfig;
