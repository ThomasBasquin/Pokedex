import React, { useRef, useEffect } from "react";
import classNames from "classnames";
import { preloadPokemonData } from "../../services/pokemonApi";

function PokemonListVertical({
  selectedId,
  onPokemonSelect,
  setDirection,
  selectedRange,
}) {
  const pokemons = [...Array(1008).keys()].map((i) => i + 1);
  const pokemonIdsInSelectedRange =
    selectedRange === "0"
      ? pokemons.slice(0, 49)
      : pokemons.slice(selectedRange - 1, selectedRange - 1 + 50);

  const refs = pokemons.reduce((acc, value) => {
    acc[value] = useRef();
    return acc;
  }, {});

  useEffect(() => {
    if (selectedId && refs[selectedId] && refs[selectedId].current) {
      refs[selectedId].current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedId]);

  const handleClickOnId = (id) => {
    if (id !== selectedId) {
      if (id < selectedId) {
        setDirection("left");
        preloadPokemonData(id - 1);
        preloadPokemonData(id + 1);
      } else {
        setDirection("right");
        preloadPokemonData(id - 1);
        preloadPokemonData(id + 1);
      }

      onPokemonSelect(id);
    }
  };

  return (
    <aside className="flex flex-col justify-center h-[55vh] overflow-y-auto w-fit absolute right-0 top-[50%] transform translate-y-[-50%] z-50 mr-2 p-2 custom-scrollbar">
      <ul className="h-full">
        {pokemonIdsInSelectedRange.map((id) => (
          <li
            key={id}
            ref={refs[id]}
            className={classNames(
              "cursor-pointer",
              "text-center",
              "range-item",
              "transition-all",
              "ease-in-out",
              "duration-300",
              "text-white",
              "my-1",
              {
                "font-bold": id === selectedId,
                "font-normal text-gray-300 text-opacity-50": id !== selectedId,
              },
            )}
          >
            <button type="button" onClick={() => handleClickOnId(id)}>
              {id}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default PokemonListVertical;
