import { Link } from "react-router-dom";
import React from "react";
import PokemonName from "../components/pokemonName";

function Pokedex() {
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
      <PokemonName id="16" />
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
}

export default Pokedex;
