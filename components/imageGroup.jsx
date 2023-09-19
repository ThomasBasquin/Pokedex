import React, { useEffect } from "react";
import { usePokemonData } from "../hooks/usePokemon";
import classNames from "classnames";
import Image from "next/image";

const ImageGroup = ({ id, color }) => {
  const { error, data } = usePokemonData(id);

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
    "whitespace-nowrap",
    color,
    "laptop-sm:text-[9rem]",
  );

  if (error) return <p>Error : {error.message}</p>;
  if (!data) return null;

  const { japaneseName: japanesePokemonName, types: types } = data;

  const paddedId = String(id).padStart(3, "0");
  const pokemonImageUrl = `/assets/pokemonImage/${paddedId}.png`;

  return (
    <div
      className="
      flex flex-col items-center justify-center pt-24 laptop-sm:max-w-xl laptop-sm:pt-16"
    >
      <p className={dynamicSecondaryColorClass}>{japanesePokemonName}</p>
      <div className="flex flex-row items-start h-56">
        <Image
          className="w-60 -mt-24 z-10 laptop-sm:w-[28rem]"
          src={pokemonImageUrl}
          alt="pokemon"
          width={448}
          height={448}
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
