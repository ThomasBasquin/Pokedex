import React, { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const PokemonList = ({ selectedId, onPokemonSelect }) => {
  const pokemons = [...Array(1008).keys()].map((i) => i + 1);

  const renderRow = ({ index, style }) => (
    <div
      onClick={() => onPokemonSelect(pokemons[index])}
      style={{ ...style }}
      className={`text-white text-[0.940rem] ${
        pokemons[index] === selectedId
          ? "font-bold"
          : "font-normal text-gray-300"
      }`}
    >
      {pokemons[index]}
    </div>
  );

  return (
    <div className="flex fixed justify-center w-full h-10 overflow-x-scroll bottom-5">
      <div className="w-3/4">
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
    </div>
  );
};

export default PokemonList;
