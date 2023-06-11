import React, { use, useEffect, useState } from "react";
import { usePokemonData } from "../hooks/usePokemon";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";

const ImageGroup = ({ id, color }) => {
  const { loading, error, data } = usePokemonData(id);

  useEffect(() => {
    const nextId = id + 1;

    if (nextId <= 1008) {
      const nextPaddedId = String(nextId).padStart(3, "0");
      const nextPokemonImageUrl = `/assets/pokemonImage/${nextPaddedId}.png`;

      const link = document.createElement("link");
      link.href = nextPokemonImageUrl;
      link.rel = "prefetch";
      link.as = "image";
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [id]);

  const dynamicSecondaryColorClass = classNames(
    "text-6xl",
    "font-[1000]",
    "backgroundFade",
    color
  );

  if (error) return <p>Error : {error.message}</p>;
  if (!data) return null;

  const { japaneseName: japanesePokemonName, types: types } = data;

  const paddedId = String(id).padStart(3, "0");
  const pokemonImageUrl = `/assets/pokemonImage/${paddedId}.png`;

  return (
    <div
      className="
      flex flex-col items-center justify-center pt-24"
    >
      <p className={dynamicSecondaryColorClass}>{japanesePokemonName}</p>
      <div className="flex flex-row items-start h-56">
        <Image
          className="w-60 -mt-8 z-10"
          src={pokemonImageUrl}
          alt="pokemon"
          width={240}
          height={240}
          priority
        />
        <div className="flex flex-col items-center -ml-4 mb-16">
          {types.map((type, index) => {
            return (
              <Image
                key={index}
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
