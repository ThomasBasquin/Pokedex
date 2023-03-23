import { Link } from "react-router-dom";
import React, { useState } from "react";
import PokemonName from "../components/pokemonName";
import CapacityButton from "../components/capacityButton";
import ImageGroup from "../components/imageGroup";

function Pokedex() {
  const [id, setId] = useState(1);
  const [colorPrimary, setColorPrimary] = useState("");
  const [colorSecondary, setColorSecondary] = useState("");

  return (
    <div>
      <img
        src="assets/Pokedex.png"
        alt="Pokedex"
        className="
        w-64 mx-auto pt-5 
        tab:w-80 tab:pt-11 
        laptop-sm:w-80 laptop-sm:pt-10 
        laptop-lg:w-3/12 "
      />
      <ImageGroup id={id} />
      <div className="flex justify-between  ">
        <PokemonName id={id} />
        <CapacityButton />
      </div>
      <button
        onClick={() => {
          setId(id + 1);
        }}
      >
        Pokemon suivant
      </button>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
}

export default Pokedex;
