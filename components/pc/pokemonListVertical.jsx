import React, { useState, useEffect } from "react";
import { preloadPokemonData } from "../../services/pokemonApi";
import classNames from "classnames";

const PokemonListVertical = ({ selectedId, onPokemonSelect, setDirection }) => {
  const pokemons = [...Array(1008).keys()].map((i) => i + 1);
  const listRef = React.useRef();

  const handleClickOnId = (id) => {
    if (id !== selectedId) {
      if (id < selectedId) {
        setDirection("left");
        preloadPokemonData(id - 1);
        preloadPokemonData(id + 1);
      } else {
        setDirection("right");
        preloadPokemonData(id - 1);
        preloadPokemonData(id + 1);
      }

      onPokemonSelect(id);
    }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(selectedId - 1, "smart");
    }
  }, [selectedId]);

  const renderRow = ({ index, style }) => (
    <div
      onClick={() => handleClickOnId(pokemons[index])}
      style={{ ...style }}
      className={`flex justify-center text-white text-sm items-center laptop-sm:overflow-hidden ${
        pokemons[index] === selectedId
          ? "font-bold"
          : "font-normal text-gray-300 text-opacity-60"
      }`}
    >
      {pokemons[index]}
    </div>
  );

  return <></>;
};

export default PokemonListVertical;
