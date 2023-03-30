import React from "react";
import { usePokemonData } from "../hooks/usePokemon";

const ImageGroup = ({ id }) => {
  const { loading, error, data } = usePokemonData(id);

  if (error) return <p>Error : {error.message}</p>;
  if (!data) return null;

  const { japaneseName: pokemonName, types: types } = data;

  const paddedId = String(id).padStart(3, "0");
  const url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;

  return (
    <div
      className="
      flex flex-col items-center justify-center mt-14"
    >
      <p className="text-6xl font-[1000] text-fire-200 ">{pokemonName}</p>
      <img className="-mt-9 w-64 -ml-14" src={url} alt="pokemon" />
      {/* for each types, check case and display type icon from assets */}
      {types.map((type) => {
        switch (type) {
          case "fire":
            return (
              <img
                className="w-16 h-16 -mt-16 -ml-20"
                src="assets/fire.png"
                alt="fire"
              />
            );
          case "water":
            return (
              <img
                className="w-16 h-16 -mt-16 -ml-20"
                src="assets/water.png"
                alt="water"
              />
            );
          case "grass":
            return (
              <img
                className="w-16 h-16 -mt-16 -ml-20"
                src="assets/grass.png"
                alt="grass"
              />
            );
          case "electric":
            return (
              <img
                className="w-16 h-16 -mt-16 -ml-20"
                src="assets/electric.png"
                alt="electric"
              />
            );
          case "ice":
            return (
              <img
                className="w-16 h-16 -mt-16 -ml-20"
                src="assets/ice.png"
                alt="ice"
              />
            );
          case "fighting":
            return (
              <img
                className="w-16 h-16 -mt-16 -ml-20"
                src="assets/fighting.png"
                alt="fighting"
              />
            );
          case "poison":
            return (
              <img
                className="w-16 h-16 -mt-16 -ml-20"
                src="assets/poison.png"
                alt="poison"
              />
            );
          case "ground":
            return (
              <img
                className="w-16 h-16 -mt-16 -ml-20"
                src="assets/ground.png"
                alt="ground"
              />
            );
          case "flying":
            return (
              <img
                className="w-16 h-16 -mt-16 -ml-20"
                src="assets/flying.png"
                alt="flying"
              />
            );
          case "psychic":
            return (
              <img
                className="w-16 h-16 -mt-16 -ml-20"
                src="assets/psychic.png"
                alt="psychic"
              />
            );
          case "bug":
            return (
              <img
                className="w-16 h-16 -mt-16 -ml-20"
                src="assets/bug.png"
                alt="bug"
              />
            );
          case "rock":
            return (
              <img
                className="w-16 h-16 -mt-16 -ml-20"
                src="assets/rock.png"
                alt="rock"
              />
            );
          case "ghost":
            return (
              <img
                className="w-16 h-16 -mt-16 -ml-20"
                src="assets/ghost.png"
                alt="ghost"
              />
            );
          case "dragon":
            return (
              <img
                className="w-16 h-16 -mt-16 -ml-20"
                src="assets/dragon.png"
                alt="dragon"
              />
            );
          case "dark":
            return (
              <img
                className="w-16 h-16 -mt-16 -ml-20"
                src="assets/dark.png"
                alt="dark"
              />
            );
          case "steel":
            return (
              <img
                className="w-16 h-16 -mt-16 -ml-20"
                src="assets/steel.png"
                alt="steel"
              />
            );
          case "fairy":
            return (
              <img
                className="w-16 h-16 -mt-16 -ml-20"
                src="assets/fairy.png"
                alt="fairy"
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default ImageGroup;
