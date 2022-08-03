/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'static-cdn.jtvnw.net',
      'placeimg.com',
      'images.igdb.com',
      'res.cloudinary.com',
    ],
  },
  async redirects() {
    return [
      {
        source: '/browse',
        destination: '/browse/league-of-legends',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
