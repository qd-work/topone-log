import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Keep SEO and social metadata in <head> for every crawler and audit tool.
  // All metadata is local, so the blocking cost is negligible for this small site.
  htmlLimitedBots: /.*/,
  images: {
    // Every image ships with the project and is served directly from /public.
    // This avoids runtime image proxy dependencies in restricted networks.
    unoptimized: true
  },
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      }
    ];
  }
};

export default withNextIntl(nextConfig);
