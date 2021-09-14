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
      red: colors.red,
      purple: {
        // unkwnonw
        light: '#85d7ff',
        // Button Text
        DEFAULT: '#9147ff',
        // Button:Mouseover Text:hover Input:Border
        dark: '#772ce8',
      },
      lightGray: {
        DEFAULT: '#5e5e60',
      },
      dark: {
        // Input:normal
        light: '#464649',
        // containers
        DEFAULT: '#18181b',
        // Background Input:Focus
        dark: '#0e0e10',
      },
      black: colors.black,
      yellow: colors.yellow,
      white: colors.white,
      gray: colors.coolGray,
      indigo: colors.indigo,
      green: colors.emerald,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
