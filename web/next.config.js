module.exports = {
  images: {
    domains: ["static-cdn.jtvnw.net"],
  },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
  },
  target: "node",
  browser: {
    fs: false,
    path: false,
    os: false,
  },
};
