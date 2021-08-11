const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      purple: {
        light: '#85d7ff',
        DEFAULT: '#24afff',
        dark: '#009eeb',
      },
      dark: {
        light: '#ff7ce5',
        DEFAULT: '#ff49db',
        dark: '#ff16d1',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
