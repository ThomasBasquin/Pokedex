import React from "react";
import { usePokemonData } from "../hooks/usePokemon";
import classNames from "classnames";
import PokemonSizeWeight from "./PokemonSizeWeight";

const PokemonInfo = (props) => {
  const { id, isMobile } = props;
  const { error, data } = usePokemonData(id);

  if (error) return <p>Error : {error.message}</p>;
  if (!data) return null;

  const { description: pokemonDescription } = data;

  const descriptionDivClasses = classNames(
    "mt-9",
    "flex",
    "flex-col",
    "justify-between",
    "h-[8.5rem]",
    "fade",
    "font-IBM",
    "laptop-sm:max-w-lg",
  );

  return (
    <div className={descriptionDivClasses}>
      <div className="flex justify-center ">
        <p className="text-[0.890rem] w-[85%] text-white tracking-normal max-h-[4rem] overflow-scroll laptop-sm:overflow-hidden laptop-sm:max-w-md center ">
          <span className="">{pokemonDescription}</span>
        </p>
      </div>
      {isMobile && <PokemonSizeWeight id={id} />}
    </div>
  );
};

export default PokemonInfo;
