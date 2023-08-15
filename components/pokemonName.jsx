import React from "react";
import { usePokemonData } from "../hooks/usePokemon";
import classNames from "classnames";

const PokemonName = ({ id, color }) => {
  const { loading, error, data } = usePokemonData(id);

  if (error) return <p>Error : {error.message}</p>;
  if (!data) return null;

  const { name: pokemonName } = data;

  const nameDivClasses = classNames(
    "text-base",
    "ml-5",
    "text-white",
    "tracking-normal",
    "fade"
  );

  return (
    <p className={nameDivClasses}>
      <span className="font-normal">#{id}</span>{" "}
      <span className="font-bold">- {pokemonName}</span>
    </p>
  );
};

export default PokemonName;
