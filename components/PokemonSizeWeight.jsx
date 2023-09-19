import React from "react";
import { usePokemonData } from "../hooks/usePokemon";

const PokemonSizeWeight = ({ id }) => {
  const { error, data } = usePokemonData(id);

  if (error) return <p>Error : {error.message}</p>;
  if (!data) return null;

  const { taille: pokemonHeight, poids: pokemonWeight } = data;

  return (
    <div className="flex flex-col text-right mr-7 mt-5 laptop-sm:w-36 laptop-sm:mr-0 laptop-sm:mt-0">
      <p className="text-sm ml-3 text-white tracking-wide laptop-sm:ml-0 ">
        <span className="font-bold mr-1">Taille : </span>
        <span className="font-normal">{pokemonHeight / 10} m</span>
      </p>
      <p className="text-sm ml-3 text-white tracking-wide laptop-sm:ml-0">
        <span className="font-bold mr-1">Poids : </span>
        <span className="font-normal">{pokemonWeight / 10} kg</span>
      </p>
    </div>
  );
};

export default PokemonSizeWeight;
