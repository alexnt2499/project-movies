/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#141414",
      },
      screens: { xxs: "352px",xs: "460px", ...defaultTheme.screens },
    },
  },
  plugins: [],
  darkMode: "class",
};
