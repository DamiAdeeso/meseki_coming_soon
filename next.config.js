/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is enabled by default in Next.js 13.4+
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Enable compression
  compress: true,
}

module.exports = nextConfig
