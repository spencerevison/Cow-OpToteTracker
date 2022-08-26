/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = {
  experimental: { optimizeCss: true },
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { svgo: false } }],
    });

    return config;
  },
};

module.exports = withPWA(nextConfig);
