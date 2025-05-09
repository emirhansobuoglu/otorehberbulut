import createJiti from "jiti";
import { fileURLToPath } from "node:url";

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./src/env/server.ts");

/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  output: "standalone",
  generateEtags: false,
  webpack(config, { isServer }) {
    if (!isServer) {
      config.module.rules.push({
        test: /\.html$/,
        use: "html-loader",
      });
    }
    return config;
  },
};

export default nextConfig;
