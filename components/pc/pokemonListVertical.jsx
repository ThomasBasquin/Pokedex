import React from "react";

const PokemonListVertical = ({ selectedRange }) => {
  const pokemons = [...Array(1008).keys()].map((i) => i + 1);
  const pokemonIdsInSelectedRange =
    selectedRange === "0"
      ? pokemons.slice(0, 49)
      : pokemons.slice(selectedRange - 1, selectedRange - 1 + 50);

  return (
    <aside className="flex flex-col justify-center h-[50vh] overflow-y-auto w-fit scrollbar-hide self-end">
      <div className="h-[50%]">
        {pokemonIdsInSelectedRange.map((id) => (
          <div
            key={id}
            className="flex justify-center text-gray-300 opacity-90 font-bold"
          >
            {id}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default PokemonListVertical;
