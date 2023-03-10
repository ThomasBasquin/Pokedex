/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fire: {
          100: "#b22f30",
          200: "#980a0b",
        },
      },
      fontFamily: {
        nunito: ["nunito", "sans-serif"],
      },
      backgroundImage: {
        "pokemon-bg": "url('/src/assets/pokemon-background.png')",
      },
    },
  },
  plugins: [],
};
