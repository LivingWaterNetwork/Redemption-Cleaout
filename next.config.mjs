/** @type {import('next').NextConfig} */
const isPreview = process.env.VERCEL_ENV === "preview";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://www.google-analytics.com https://*.getjobber.com",
      "frame-src 'self' https://*.getjobber.com https://clienthub.getjobber.com",
      "form-action 'self' https://*.getjobber.com",
      "base-uri 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

if (isPreview) {
  securityHeaders.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });
}

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
