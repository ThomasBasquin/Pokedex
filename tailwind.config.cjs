/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      tab: "768px",
      "tab-rotate": "1024px",
      "laptop-sm": "1280px",
      "laptop-md": "1366px",
      "laptop-lg": "1536px",
      desktop: "1920px",
      "desktop-xl": "2560px",
    },
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
