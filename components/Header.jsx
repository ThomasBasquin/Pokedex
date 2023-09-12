import React from "react";
import SearchBar from "../components/searchbar";
import PokemonName from "./PokemonName";

function Header(props) {
  const { pokemonId, setPokemonId } = props;

  return (
    <header>
      <div className="block laptop-sm:hidden">
        <SearchBar pokemonId={pokemonId} setId={setPokemonId} />
      </div>
      <div className="hidden laptop-sm:block">
        <div className="flex justify-between mt-7">
          <PokemonName id={pokemonId} />
          <SearchBar pokemonId={pokemonId} setId={setPokemonId} />
        </div>
      </div>
    </header>
  );
}

export default Header;
