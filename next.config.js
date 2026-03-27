/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Allow images from any domain (for map tiles, listing images, etc.)
  images: {
    domains: ['*'],
    unoptimized: true,
  },
  // Allow larger API payloads for file uploads
  experimental: {
    serverComponentsExternalPackages: ['mysql2', 'bcryptjs'],
  },
};

module.exports = nextConfig;
