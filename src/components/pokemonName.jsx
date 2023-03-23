import React from "react";
import { usePokemon } from "../hooks/usePokemon";

const PokemonName = ({ id, color }) => {
  const { loading, error, data } = usePokemon(id);

  const textColorClass = color === "primary" ? "text-white" : "text-black";

  if (error) return <p>Error : {error.message}</p>;
  if (!data) return null;

  return (
    <p className={`${textColorClass} text-xl m-3 ml-6`}>
      <span className="font-bold">#{id}</span>{" "}
      <span className="font-medium">- {data.name}</span>
    </p>
  );
};

export default PokemonName;
