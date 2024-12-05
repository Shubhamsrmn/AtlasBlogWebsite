/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "400px",
      sm1: "540px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {},
      fontFamily: {
        urbanist: ['"Urbanist"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
