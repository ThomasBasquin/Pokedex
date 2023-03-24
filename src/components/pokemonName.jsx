import React from "react";
import { usePokemonData } from "../hooks/usePokemon";

const PokemonName = ({ id, color }) => {
  const { loading, error, data } = usePokemonData(id);

  if (error) return <p>Error : {error.message}</p>;
  if (!data) return null;

  return (
    <p className={`text-xl m-3 ml-4 text-white`}>
      <span className="font-bold">#{id}</span>{" "}
      <span className="font-normal">- {data.name}</span>
    </p>
  );
};

export default PokemonName;
