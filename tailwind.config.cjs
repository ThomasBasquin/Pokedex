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
        water: {
          100: "#2966ad",
          200: "#1f5598",
        },
        grass: {
          100: "#4aa63a",
          200: "#2a8929",
        },
        electric: {
          100: "#d3b920",
          200: "#c3a010",
        },
        psychic: {
          100: "#e257a7",
          200: "#c2358c",
        },
        ice: {
          100: "#4bc2c2",
          200: "#2a9e9e",
        },
        dragon: {
          100: "#6759d3",
          200: "#4d3ec3",
        },
        dark: {
          100: "#604438",
          200: "#4a3528",
        },
        fairy: {
          100: "#f280d9",
          200: "#db6ec3",
        },
        normal: {
          100: "#918866",
          200: "#7a7448",
        },
        fighting: {
          100: "#a7281f",
          200: "#851915",
        },
        flying: {
          100: "#9d82d0",
          200: "#7a62b0",
        },
        poison: {
          100: "#8c338c",
          200: "#702370",
        },
        ground: {
          100: "#c6a754",
          200: "#9d8444",
        },
        rock: {
          100: "#9e8c26",
          200: "#7d6e1e",
        },
        bug: {
          100: "#8c9a16",
          200: "#6e790e",
        },
        ghost: {
          100: "#5e4980",
          200: "#433568",
        },
        steel: {
          100: "#9e9eae",
          200: "#7d7d8e",
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
