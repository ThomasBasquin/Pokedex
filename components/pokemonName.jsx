import React from "react";
import classNames from "classnames";
import { usePokemonData } from "../hooks/usePokemon";

function PokemonName({ id }) {
  const { error, data } = usePokemonData(id);

  if (error) return <p>Error : {error.message}</p>;
  if (!data) return null;

  const { name } = data;

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
      <span className="font-normal ml-3 laptop-sm:text-lg">#{id}</span>
      <span className="font-bold ml-3 laptop-sm:text-3xl laptop-sm:mt-2 laptop-sm:ml-0">
        {name}
      </span>
    </p>
  );
}

export default PokemonName;
