/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['spatial.io','lh3.googleusercontent.com','randomuser.me','cloudflare-ipfs.com'],
  },
}

module.exports = nextConfig
