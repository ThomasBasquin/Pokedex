import React from "react";
import { usePokemonData } from "../hooks/usePokemon";
import classNames from "classnames";

const PokemonName = ({ id }) => {
  const { error, data } = usePokemonData(id);

  if (error) return <p>Error : {error.message}</p>;
  if (!data) return null;

  const { name: pokemonName } = data;

  const nameDivClasses = classNames(
    "text-base",
    "ml-11",
    "text-white",
    "tracking-normal",
    "fade",
    "laptop-sm:flex",
    "laptop-sm:flex-col",
    "laptop-sm:justify-center",
    "laptop-sm:tracking-wide",
  );

  return (
    <p className={nameDivClasses}>
      <span className="font-normal ml-3 laptop-sm:text-lg">#{id}</span>{" "}
      <span className="font-bold laptop-sm:text-2xl laptop-sm:mt-2">
        {pokemonName}
      </span>
    </p>
  );
};

export default PokemonName;
