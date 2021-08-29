module.exports = {
  images: {
    domains: ['static-cdn.jtvnw.net'],
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
