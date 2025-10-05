/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable build trace collection to avoid Vercel issues
  experimental: {
    buildTrace: false,
  },
  // Disable static optimization for problematic pages
  trailingSlash: false,
}

module.exports = nextConfig
