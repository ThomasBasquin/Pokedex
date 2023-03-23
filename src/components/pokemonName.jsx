import React from "react";
import { usePokemon } from "../hooks/usePokemon";

const PokemonName = ({ id }) => {
  const { loading, error, data } = usePokemon(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) return null;

  return <p>{data.name}</p>;
};

export default PokemonName;
