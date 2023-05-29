import React, { useEffect, useState } from "react";
import { usePokemonData } from "../hooks/usePokemon";
import { preloadJapaneseName } from "../services/japaneseName";
import classNames from "classnames";
import Image from "next/image";

const ImageGroup = ({ id, secondaryClass }) => {
  const { loading, error, data } = usePokemonData(id);

  const dynamicSecondaryColorClass = classNames(
    "text-6xl",
    "font-[1000]",
    secondaryClass
  );

  const maxPokemonId = 1007;

  useEffect(() => {
    if (id < maxPokemonId) {
      preloadJapaneseName(id + 1);
      preloadJapaneseName(id + 2);
      preloadJapaneseName(id + 3);
    }
  }, [id]);

  if (error) return <p>Error : {error.message}</p>;
  if (!data) return null;

  const { japaneseName: japanesePokemonName, types: types } = data;

  const paddedId = String(id).padStart(3, "0");
  const url = `/assets/pokemonImage/${paddedId}.png`;

  return (
    <div
      className="
      flex flex-col items-center justify-center pt-24"
    >
      <p className={dynamicSecondaryColorClass}>{japanesePokemonName}</p>
      <div className="flex flex-row items-start h-56">
        <Image
          className="w-60 -mt-8 z-10"
          src={url}
          alt="pokemon"
          width={240}
          height={240}
          priority
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
