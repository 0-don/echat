module.exports = {
  // docker hot reload fix
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },
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
