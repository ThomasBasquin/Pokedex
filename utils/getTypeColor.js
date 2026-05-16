const capitalize = (type) => type.charAt(0).toUpperCase() + type.slice(1);

const TYPE_HEX = {
  fire: "#b22f30",
  water: "#002a4a",
  grass: "#3aa938",
  electric: "#fabc00",
  psychic: "#e257a7",
  ice: "#32afcf",
  dragon: "#6759d3",
  dark: "#604438",
  fairy: "#e698d5",
  normal: "#8c7a6c",
  fighting: "#d64700",
  flying: "#6b8fd1",
  poison: "#9c389c",
  ground: "#b57e41",
  rock: "#8a704a",
  bug: "#8c9a16",
  ghost: "#7a29d6",
  steel: "#9e9eae",
};

export const getTypeHex = (type) => TYPE_HEX[type] ?? "#8c7a6c";

export const POKEMON_TYPES = Object.keys(TYPE_HEX);

export const darkenHex = (hex, opacity) => {
  const normalizedHex = hex.replace("#", "");
  const red = parseInt(normalizedHex.slice(0, 2), 16);
  const green = parseInt(normalizedHex.slice(2, 4), 16);
  const blue = parseInt(normalizedHex.slice(4, 6), 16);
  const multiplier = 1 - opacity;

  return `rgb(${Math.round(red * multiplier)}, ${Math.round(
    green * multiplier,
  )}, ${Math.round(blue * multiplier)})`;
};

export const getTypeColors = (type) => {
  const capType = capitalize(type);
  return {
    primaryClass: `primary${capType}`,
    secondaryTextClass: `secondaryText${capType}`,
    secondaryBackgroundClass: `secondaryBackground${capType}`,
  };
};
