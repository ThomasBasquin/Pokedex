/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { preloadPokemonData } from "../../services/pokemonApi";

function PokemonListMobile({ selectedId, onPokemonSelect, setDirection }) {
  const pokemons = [...Array(1008).keys()].map((i) => i + 1);
  const listRef = React.useRef();
  const [isLeftAnimated, setIsLeftAnimated] = useState(false);
  const [isRightAnimated, setIsRightAnimated] = useState(false);

  const handleLeftClick = () => {
    setIsLeftAnimated(false);
    setTimeout(() => {
      setIsLeftAnimated(true);
    }, 10);
  };

  const handleRightClick = () => {
    setIsRightAnimated(false);
    setTimeout(() => {
      setIsRightAnimated(true);
    }, 10);
  };

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

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(selectedId - 1, "smart");
    }
  }, [selectedId]);

  const renderRow = ({ index, style }) => (
    <button
      type="button"
      onClick={() => handleClickOnId(pokemons[index])}
      style={{ ...style }}
      className={`flex justify-center text-white text-sm items-center laptop-sm:overflow-hidden ${
        pokemons[index] === selectedId
          ? "font-bold"
          : "font-normal text-gray-300 text-opacity-60"
      }`}
    >
      {pokemons[index]}
    </button>
  );

  return (
    <div
      className="flex fixed justify-center w-11/12 overflow-auto bottom-5 py-1
      laptop-sm:w-1/2"
      style={{
        background: "rgba(0, 0, 0, 0.25)",
        borderRadius: "16px",
        boxShadow: "0 4px 23px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(7.4px)",
        WebkitBackdropFilter: "blur(7.4px)",
      }}
    >
      <button
        type="button"
        tabIndex={0}
        className={`text-white text-2xl mr-5 mb-1 animate__animated transform active:scale-75 transition-transform ${
          isLeftAnimated ? "animate__headShake" : ""
        }`}
        onClick={() => {
          if (selectedId > 1) {
            setDirection("left");
            onPokemonSelect(selectedId - 1);
            preloadPokemonData(selectedId - 2);
          } else {
            handleLeftClick();
          }
        }}
      >
        &lt;
      </button>
      <div
        className="w-8/12
      laptop-sm:w-9/12 laptop-sm:overflow-hidden"
      >
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={listRef}
              width={width}
              height={height}
              itemCount={pokemons.length}
              itemSize={45}
              layout="horizontal"
            >
              {renderRow}
            </List>
          )}
        </AutoSizer>
      </div>
      <button
        type="button"
        className={`text-white text-2xl ml-5 mb-1 animate__animated transform active:scale-75 transition-transform ${
          isRightAnimated ? "animate__headShake" : ""
        }`}
        onClick={() => {
          if (selectedId < 1008) {
            setDirection("right");
            onPokemonSelect(selectedId + 1);
            preloadPokemonData(selectedId + 2);
          } else {
            handleRightClick();
          }
        }}
      >
        &gt;
      </button>
    </div>
  );
}

export default PokemonListMobile;
