import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PokemonName from "../components/pokemonName";
import PokemonInfo from "../components/pokemonInfo";
import CapacityButton from "../components/capacityButton";
import ImageGroup from "../components/imageGroup";
import { preloadPokemonData } from "../services/pokemonApi";
import { usePokemonData } from "../hooks/usePokemon";
import typeToColorClass from "../assets/typeColors";

function Pokedex() {
  const [id, setId] = useState(1);
  const [primaryType, setPrimaryType] = useState("fire");

  const { loading, error, data } = usePokemonData(id);

  useEffect(() => {
    if (data) {
      setPrimaryType(data.types[0] || "poison");
    }
  }, [data]);

  const bgColorClass = typeToColorClass[primaryType] || "bg-fire-100";

  return (
    <div className={`w-screen h-screen bg-${bgColorClass} tracking-wide`}>
      <ImageGroup id={id} />
      <div className="flex flex-shrink justify-between mt-7">
        <PokemonName id={id} />
        <CapacityButton />
      </div>
      <PokemonInfo id={id} />
      <button
        onClick={() => {
          if (id < 1281) {
            setId(id + 1);
          }
          if (id < 1280) {
            preloadPokemonData(id + 2);
          }
        }}
      >
        Pokemon suivant
      </button>
    </div>
  );
}

export default Pokedex;
