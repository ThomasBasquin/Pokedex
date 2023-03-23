import React from "react";

const ImageGroup = ({ id }) => {
  const paddedId = String(id).padStart(3, "0");
  const url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;

  return <img src={url} alt="pokemon" />;
};

export default ImageGroup;
