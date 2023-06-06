import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import PokemonName from "../components/pokemonName";
import PokemonInfo from "../components/pokemonInfo";
import CapacityButton from "../components/capacityButton";
import ImageGroup from "../components/imageGroup";
import { getPokemonData, preloadPokemonData } from "../services/pokemonApi";
import { usePokemonData } from "../hooks/usePokemon";
import classNames from "classnames";
import PokemonList from "../components/pokemonList";
import { useTransition, animated } from "react-spring";

export default function Pokedex({ initialPokemonData }) {
  const [id, setId] = useState(1);
  const listRef = React.useRef(null);
  const [primaryType, setPrimaryType] = useState(
    initialPokemonData.types[0] || "grass"
  );
  const [direction, setDirection] = useState(null);
  const { loading, error, data = initialPokemonData } = usePokemonData(id);

  // --------------------------- Type Color ---------------------------

  useEffect(() => {
    if (data) {
      setPrimaryType(data.types[0] || "grass");
    }
  }, [data]);

  const getTypeColors = (type) => {
    const primaryClass = `primary${
      type.charAt(0).toUpperCase() + type.slice(1)
    }`;
    const secondaryTextClass = `secondaryText${
      type.charAt(0).toUpperCase() + type.slice(1)
    }`;
    const secondaryBackgroundClass = `secondaryBackground${
      type.charAt(0).toUpperCase() + type.slice(1)
    }`;
    return { primaryClass, secondaryTextClass, secondaryBackgroundClass };
  };

  const { primaryClass, secondaryTextClass, secondaryBackgroundClass } =
    getTypeColors(primaryType);
  const dynamicPrimaryColorClass = classNames(
    "flex",
    "flex-col",
    "h-screen",
    "w-screen",
    "tracking-wide",
    primaryClass
  );

  // handle for list pokemon
  const handlePokemonSelect = (pokemonId) => {
    setDirection(pokemonId > id ? "right" : "left");
    setId(pokemonId);
  };

  const transitions = useTransition(id, {
    from: {
      opacity: 0,
      transform:
        direction === "right"
          ? "translate3d(100%,0,0)"
          : "translate3d(-100%,0,0)",
    },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: {
      opacity: 0,
      transform:
        direction === "right"
          ? "translate3d(-50%,0,0)"
          : "translate3d(50%,0,0)",
    },
  });

  // ------------------------------------------------------

  return (
    <div className="h-full fixed">
      {transitions((style, i) => (
        <animated.div style={style}>
          <div className={dynamicPrimaryColorClass}>
            <ImageGroup id={i} color={secondaryTextClass} />
            <div className="flex flex-shrink justify-between mt-7">
              <PokemonName id={i} />
              <CapacityButton color={secondaryBackgroundClass} />
            </div>
            <PokemonInfo id={i} />
          </div>
        </animated.div>
      ))}
      <PokemonList selectedId={id} onPokemonSelect={handlePokemonSelect} />
    </div>
  );

  // return (
  //   <div className="h-full fixed">
  //     <div className={dynamicPrimaryColorClass}>
  //       <ImageGroup id={id} color={secondaryTextClass} />
  //       <div className="flex flex-shrink justify-between mt-7">
  //         <PokemonName id={id} />
  //         <CapacityButton color={secondaryBackgroundClass} />
  //       </div>
  //       <PokemonInfo id={id} />
  //       <PokemonList selectedId={id} onPokemonSelect={handlePokemonSelect} />
  //     </div>
  //   </div>
  // );
}

export async function getStaticProps() {
  const initialPokemonData = await getPokemonData(1);

  return {
    props: {
      initialPokemonData,
    },
  };
}
