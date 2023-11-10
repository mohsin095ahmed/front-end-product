/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'tailwindui.com','images.unsplash.com','plus.unsplash.com','firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig
