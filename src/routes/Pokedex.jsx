import { Link } from "react-router-dom";
import React, { useState } from "react";
import PokemonName from "../components/pokemonName";
import CapacityButton from "../components/capacityButton";
import ImageGroup from "../components/imageGroup";
import { preloadPokemonData } from "../services/pokemonApi";
import { preloadImage } from "../components/imageGroup";

function Pokedex() {
  const [id, setId] = useState(1);
  const [colorPrimary, setColorPrimary] = useState("");
  const [colorSecondary, setColorSecondary] = useState("");

  return (
    <div className=" w-screen h-screen bg-fire-100 tracking-wide">
      <img
        src="assets/Pokedex.png"
        alt="Pokedex"
        className="
        w-56 mx-auto pt-5 
        tab:w-80 tab:pt-11 
        laptop-sm:w-80 laptop-sm:pt-10 
        laptop-lg:w-3/12 "
      />
      <ImageGroup id={id} />
      <div className="flex flex-shrink justify-between mt-7">
        <PokemonName id={id} />
        <CapacityButton />
      </div>
      <button
        onClick={() => {
          setId(id + 1);
          preloadPokemonData(id + 2);

          const nextPaddedId = String(id + 2).padStart(3, "0");
          const nextImageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${nextPaddedId}.png`;
          preloadImage(nextImageUrl);
        }}
      >
        Pokemon suivant
      </button>
    </div>
  );
}

export default Pokedex;
