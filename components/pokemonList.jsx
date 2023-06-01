import React, { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const PokemonList = ({ selectedId, onPokemonSelect }) => {
  const pokemons = [...Array(1008).keys()].map((i) => i + 1);

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
    <div className="flex fixed justify-center item-center w-full h-8 overflow-x-scroll bottom-5">
      <div
        className="text-white text-xl mr-6"
        onClick={() => onPokemonSelect(selectedId - 1)}
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
              itemSize={50}
              layout="horizontal"
            >
              {renderRow}
            </List>
          )}
        </AutoSizer>
      </div>
      <div
        className="text-white text-xl ml-6"
        onClick={() => onPokemonSelect(selectedId + 1)}
      >
        &gt;
      </div>
    </div>
  );
};

export default PokemonList;
