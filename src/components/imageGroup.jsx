import React from "react";
import { usePokemonData } from "../hooks/usePokemon";

const ImageGroup = ({ id }) => {
  const { loading, error, data } = usePokemonData(id);

  if (error) return <p>Error : {error.message}</p>;
  if (!data) return null;

  const { japaneseName: japanesePokemonName, types: types } = data;

  const paddedId = String(id).padStart(3, "0");
  const url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;

  return (
    <div
      className="
      flex flex-col items-center justify-center mt-12"
    >
      <p className="text-6xl font-[1000] text-fire-200 ">
        {japanesePokemonName}
      </p>
      <img className="-mt-9 w-60 -ml-14" src={url} alt="pokemon" />
      {types.map((type) => {
        return (
          <img
            className="
          w-10 h-10
          "
            src={`assets/${type}.png`}
            alt={type}
          />
        );
      })}
    </div>
  );
};

export default ImageGroup;
