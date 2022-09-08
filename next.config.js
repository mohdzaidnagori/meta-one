/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['spatial.io','lh3.googleusercontent.com','randomuser.me','cloudflare-ipfs.com'],
  },
}

module.exports = nextConfig
