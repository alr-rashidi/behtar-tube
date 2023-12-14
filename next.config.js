/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/channel/:slug",
        destination: "/channel/:slug/videos",
        permanent: true,
      }
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yt.artemislena.eu",
        pathname: "/vi/**/**",
      },
      {
        protocol: "https",
        hostname: "**.ggpht.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
        pathname: "/ytc/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vid.puffyan.us",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
