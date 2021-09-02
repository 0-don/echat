module.exports = {
  images: {
    domains: ['static-cdn.jtvnw.net', 'placeimg.com', 'images.igdb.com'],
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
