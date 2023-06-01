import React from "react";
import { usePokemonData } from "../hooks/usePokemon";

const PokemonName = ({ id, color }) => {
  const { loading, error, data } = usePokemonData(id);

  if (error) return <p>Error : {error.message}</p>;
  if (!data) return null;

  const { name: pokemonName } = data;

  return (
    <p className="text-lg ml-5 text-white tracking-wide">
      <span className="font-normal">#{id}</span>{" "}
      <span className="font-bold">- {pokemonName}</span>
    </p>
  );
};

export default PokemonName;
