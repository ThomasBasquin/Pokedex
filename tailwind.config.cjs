/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
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
          200: "#8a0917",
        },
        water: {
          100: "#002a4a",
          200: "#17607d",
        },
        grass: {
          100: "#4aa63a",
          200: "#198418",
        },
        electric: {
          100: "#FFC000",
          200: "#FFF1CE",
        },
        psychic: {
          100: "#E257A7",
          200: "#C2358C",
        },
        ice: {
          100: "#3DCDF0",
          200: "#07A1C7",
        },
        dragon: {
          100: "#6759D3",
          200: "#4D2EC3",
        },
        dark: {
          100: "#604438",
          200: "#412C20",
        },
        fairy: {
          100: "#F280D9",
          200: "#E860C9",
        },
        normal: {
          100: "#8C7A6C",
          200: "#B09D8E",
        },
        fighting: {
          100: "#D64700",
          200: "#FF9311",
        },
        flying: {
          100: "#6B8FD1",
          200: "#A3B9F3",
        },
        poison: {
          100: "#8C338C",
          200: "#6D166D",
        },
        ground: {
          100: "#B57E41",
          200: "#D49A64",
        },
        rock: {
          100: "#8A704A",
          200: "#A68A6A",
        },
        bug: {
          100: "#8C9A16",
          200: "#6E790E",
        },
        ghost: {
          100: "#7A29D6",
          200: "#511F8A",
        },
        steel: {
          100: "#9E9EAE",
          200: "#7D7D8E",
        },
      },
      fontFamily: {
        nunito: ["nunito", "sans-serif"],
      },
      backgroundImage: {
        "pokemon-bg": "url('/assets/pokemon-background.png')",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
