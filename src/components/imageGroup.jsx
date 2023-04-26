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
      flex flex-col items-center justify-center pt-24"
    >
      <p className="text-6xl font-[1000] text-fire-200 ">
        {japanesePokemonName}
      </p>
      <div className="flex flex-row items-center">
        <img className="w-60  -mt-6 z-10" src={url} alt="pokemon" />
        <div className="flex flex-col items-center -mt-32 -ml-8">
          {types.map((type) => {
            return (
              <img className="w-24" src={`assets/${type}.png`} alt={type} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageGroup;
