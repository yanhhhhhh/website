/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {},
    colors: {
      primary: '#1761FF',
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
