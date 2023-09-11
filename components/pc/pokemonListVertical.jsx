import React from "react";

const PokemonListVertical = ({ selectedRange }) => {
  const pokemons = [...Array(1008).keys()].map((i) => i + 1);
  const pokemonsInSelectedRange =
    selectedRange === "0"
      ? pokemons.slice(0, 49)
      : pokemons.slice(selectedRange - 1, selectedRange - 1 + 50);

  console.log(pokemonsInSelectedRange);

  return <></>;
};

export default PokemonListVertical;
