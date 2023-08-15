import React from "react";
import { usePokemonData } from "../hooks/usePokemon";
import classNames from "classnames";

const PokemonInfo = ({ id }) => {
  const { loading, error, data } = usePokemonData(id);

  if (error) return <p>Error : {error.message}</p>;
  if (!data) return null;

  const { description: pokemonDescription } = data;
  const { taille: pokemonHeight } = data;
  const { poids: pokemonWeight } = data;

  const descriptionDivClasses = classNames(
    "mt-9",
    "flex",
    "flex-col",
    "justify-between",
    "h-[8.5rem]",
    "fade",
    "font-IBM"
  );

  return (
    <div className={descriptionDivClasses}>
      <div className="flex justify-center">
        <p className="text-[0.890rem] w-[85%] text-white tracking-normal max-h-[4rem] overflow-scroll ">
          <span className="">{pokemonDescription}</span>
        </p>
      </div>
      <div className="flex flex-col text-right mr-7 mt-5">
        <p className="text-sm ml-3 text-white tracking-wide">
          <span className="font-bold mr-1">Taille : </span>{" "}
          <span className="font-normal">{pokemonHeight / 10} m</span>
        </p>
        <p className="text-sm ml-3 text-white tracking-wide">
          <span className="font-bold mr-1">Poids : </span>{" "}
          <span className="font-normal">{pokemonWeight / 10} kg</span>
        </p>
      </div>
    </div>
  );
};

export default PokemonInfo;
