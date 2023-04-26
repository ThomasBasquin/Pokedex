import { Link } from "react-router-dom";
import React, { useState } from "react";
import PokemonName from "../components/pokemonName";
import PokemonInfo from "../components/pokemonInfo";
import CapacityButton from "../components/capacityButton";
import ImageGroup from "../components/imageGroup";
import { preloadPokemonData } from "../services/pokemonApi";

function Pokedex() {
  const [id, setId] = useState(1);
  const [colorPrimary, setColorPrimary] = useState("");
  const [colorSecondary, setColorSecondary] = useState("");

  return (
    <div className=" w-screen h-screen bg-fire-100 tracking-wide">
      <ImageGroup id={id} />
      <div className="flex flex-shrink justify-between mt-7">
        <PokemonName id={id} />
        <CapacityButton />
      </div>
      <PokemonInfo id={id} />
      <button
        onClick={() => {
          setId(id + 1);
          preloadPokemonData(id + 2);
        }}
      >
        Pokemon suivant
      </button>
    </div>
  );
}

export default Pokedex;
