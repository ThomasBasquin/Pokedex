import React, { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import classNames from "classnames";

const PokemonList = ({ selectedId, onPokemonSelect }) => {
  const pokemons = [...Array(1008).keys()].map((i) => i + 1);
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

  const renderRow = ({ index, style }) => (
    <div
      onClick={() => onPokemonSelect(pokemons[index])}
      style={{ ...style }}
      className={`flex text-white text-[0.940rem] text-center items-center ${
        pokemons[index] === selectedId
          ? "font-bold"
          : "font-normal text-gray-300 text-opacity-60"
      }`}
    >
      {pokemons[index]}
    </div>
  );

  return (
    <div className="flex fixed justify-center w-full h-8 overflow-x-scroll bottom-5">
      <div
        className={`text-white text-xl mr-5 animate__animated ${
          isLeftAnimated ? "animate__headShake" : ""
        }`}
        onClick={() => {
          if (selectedId > 1) {
            onPokemonSelect(selectedId - 1);
          } else {
            handleLeftClick();
          }
        }}
      >
        &lt;
      </div>
      <div className=" w-8/12 pokemon-list-container">
        <AutoSizer>
          {({ height, width }) => (
            <List
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
      <div
        className={`text-white text-xl ml-5 animate__animated ${
          isRightAnimated ? "animate__headShake" : ""
        }`}
        onClick={() => {
          if (selectedId < 1008) {
            onPokemonSelect(selectedId + 1);
          } else {
            handleRightClick();
          }
        }}
      >
        &gt;
      </div>
    </div>
  );
};

export default PokemonList;
