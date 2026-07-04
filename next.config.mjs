import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async rewrites() {
    return [
      {source: "/", destination: "/en"},
      {source: "/services", destination: "/en/services"},
      {source: "/services/:slug", destination: "/en/services/:slug"},
      {source: "/routes", destination: "/en/routes"},
      {source: "/about", destination: "/en/about"},
      {source: "/contact", destination: "/en/contact"}
    ];
  }
};

export default withNextIntl(nextConfig);
