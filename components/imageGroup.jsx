import React, { useEffect } from "react";
import classNames from "classnames";
import Image from "next/image";
import { usePokemonData } from "../hooks/usePokemon";

function ImageGroup({ id, color }) {
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
    return undefined;
  }, [id]);

  const dynamicSecondaryColorClass = classNames(
    "text-6xl",
    "font-[1000]",
    "backgroundFade",
    "whitespace-nowrap",
    color,
    "laptop-sm:text-[9rem]",
    "laptop-sm:ml-6",
  );

  if (error) return <p>Error : {error.message}</p>;
  if (!data) return null;

  const { japaneseName: japanesePokemonName, types } = data;

  const paddedId = String(id).padStart(3, "0");
  const pokemonImageUrl = `/assets/pokemonImage/${paddedId}.png`;

  return (
    <div
      className="
      flex flex-col items-center justify-center laptop-sm:max-w-xl laptop-sm:ml-28"
    >
      <p className={dynamicSecondaryColorClass}>{japanesePokemonName}</p>
      <div className="flex flex-row items-start h-56 laptop-sm:h-auto">
        <Image
          className="w-60 -mt-8 z-10 laptop-sm:ml-28 laptop-sm:w-[24rem] laptop-sm:order-2"
          src={pokemonImageUrl}
          alt="pokemon"
          width={800}
          height={800}
          priority
        />
        <div className="flex flex-col items-center -ml-4 mb-16 laptop-sm:mt-4 laptop-sm:translate-x-8 ">
          {types.map((type) => (
            <Image
              key={type}
              className="w-20 laptop-sm:w-28"
              src={`/assets/${type}.png`}
              alt={type}
              width={80}
              height={80}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageGroup;
