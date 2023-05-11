import React, { useEffect, useState } from "react";
import { usePokemonData } from "../hooks/usePokemon";
import { preloadPokemonImage } from "../services/pokemonImage";
import classNames from "classnames";
import Image from "next/image";

const ImageGroup = ({ id }) => {
  const [primaryType, setPrimaryType] = useState("grass");
  const { loading, error, data } = usePokemonData(id);

  const getTypeColors = (type) => {
    const primaryClass = `primary${
      type.charAt(0).toUpperCase() + type.slice(1)
    }`;
    const secondaryClass = `secondary${
      type.charAt(0).toUpperCase() + type.slice(1)
    }`;
    return { primaryClass, secondaryClass };
  };

  const { primaryClass, secondaryClass } = getTypeColors(primaryType);
  const dynamicPrimaryColorClass = classNames(primaryClass);
  const dynamicSecondaryColorClass = classNames(
    "text-6xl",
    "font-[1000]",
    secondaryClass
  );

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

  const paddedId = String(id).padStart(3, "0");
  const url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;

  return (
    <div
      className="
      flex flex-col items-center justify-center pt-24"
    >
      <p className={dynamicSecondaryColorClass}>{japanesePokemonName}</p>
      <div className="flex flex-row items-start h-56">
        <Image
          className="w-60  -mt-8 z-10"
          src={url}
          alt="pokemon"
          width={240}
          height={240}
        />
        <div className="flex flex-col items-center -ml-4 mb-16">
          {types.map((type) => {
            return (
              <Image
                className="w-20"
                src={`/assets/${type}.png`}
                alt={type}
                width={80}
                height={80}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageGroup;
