import React from "react";
import { usePokemonData } from "../hooks/usePokemon";

const PokemonName = ({ id, color }) => {
  const { loading, error, data } = usePokemonData(id);

  if (error) return <p>Error : {error.message}</p>;
  if (!data) return null;

  const { name: pokemonName } = data;

  return (
    <p className="text-xl ml-3 text-white tracking-wide">
      <span className="font-bold">#{id}</span>{" "}
      <span className="font-normal">- {pokemonName}</span>
    </p>
  );
};

export default PokemonName;
