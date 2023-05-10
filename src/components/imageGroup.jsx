import React, { useEffect, useState } from "react";
import { usePokemonData } from "../hooks/usePokemon";
import { preloadPokemonImage } from "../services/pokemonImage";
import typeToColorClass from "../assets/typeColors";
import classNames from "classnames";

const ImageGroup = ({ id }) => {
  const [primaryType, setPrimaryType] = useState("grass");
  const { loading, error, data } = usePokemonData(id);

  useEffect(() => {
    if (id < 1281) {
      preloadPokemonImage(id + 1);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      setPrimaryType(data.types[0] || "grass");
    }
  }, [data]);

  if (error) return <p>Error : {error.message}</p>;
  if (!data) return null;

  const { japaneseName: japanesePokemonName, types: types } = data;
  const txtColorClass =
    `text-${typeToColorClass[primaryType].replace("-100", "-200")}` ||
    "text-grass-200";

  const dynamicTxtColorClass = classNames(
    "text-6xl",
    "font-[1000]",
    txtColorClass
  );

  const paddedId = String(id).padStart(3, "0");
  const url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;

  return (
    <div
      className="
      flex flex-col items-center justify-center pt-24"
    >
      <p className={dynamicTxtColorClass}>{japanesePokemonName}</p>
      <div className="flex flex-row items-start h-56">
        <img className="w-60  -mt-8 z-10" src={url} alt="pokemon" />
        <div className="flex flex-col items-center -ml-4 mb-16">
          {types.map((type) => {
            return (
              <img className="w-20" src={`assets/${type}.png`} alt={type} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageGroup;
