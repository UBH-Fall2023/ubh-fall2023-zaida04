/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:
    // catchall
    {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
    "eslint": {
      "ignoreDuringBuilds": true
    }
};

module.exports = nextConfig;
