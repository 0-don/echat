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
      purple: {
        // unkwnonw
        light: '#85d7ff',
        // Button Text
        DEFAULT: '#9147ff',
        // Button:Mouseover Text:hover Input:Border
        dark: '#772ce8',
      },
      dark: {
        // Input:normal
        light: '#464649',
        // containers
        DEFAULT: '#18181b',
        // Background Input:Focus
        dark: '#0e0e10',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
