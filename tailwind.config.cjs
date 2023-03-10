/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      red: "b22f30",
      "dark-red": "990a0c",
    },
    fontFamily: {
      nunito: ["nunito", "sans-serif"],
    },

    extend: {},
  },
  plugins: [],
};
