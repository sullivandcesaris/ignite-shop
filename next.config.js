/** @type {import('next').NextConfig} */
const nextConfig = {
  newNextLinkBehavior: true,
  images: {
    domains: [
      'files.stripe.com'
    ]
  },

  reactStrictMode: true,
}

module.exports = nextConfig
