/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN,
    CAPTCHAKEY: process.env.CAPTCHAKEY,
    PAGINATION_LIMIT: process.env.PAGINATION_LIMIT,
  },
  images: {
    minimumCacheTTL: 999999999,
    domains: ["api.alesari.croonus.com", "scontent.cdninstagram.com"],
    unoptimized: true
  },
};

export default nextConfig;
