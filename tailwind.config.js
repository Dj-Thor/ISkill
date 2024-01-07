/*@type {import('tailwindcss').Config}*/
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  extend: {},
  theme: {
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
      'rajdhani': ['Rajdhani', 'sans-serif'],
      'dongle': ['Dongle', 'sans-serif'],
      'spectral': ['Spectral SC', 'serif'],
      'lato': ['Lato', 'sans-serif']
      }
  },
  plugins: [],
});

