import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, use } from "react";
import PokemonName from "../components/pokemonName";
import PokemonInfo from "../components/pokemonInfo";
import CapacityButton from "../components/capacityButton";
import ImageGroup from "../components/imageGroup";
import { getPokemonData, preloadPokemonData } from "../services/pokemonApi";
import { usePokemonData } from "../hooks/usePokemon";
import classNames from "classnames";
import PokemonList from "../components/pokemonList";
import { useTransition, animated } from "react-spring";
import { useSwipeable } from "react-swipeable";

export default function Pokedex({ initialPokemonData }) {
  const [id, setId] = useState(1);
  const listRef = React.useRef(null);
  const [primaryType, setPrimaryType] = useState(
    initialPokemonData.types[0] || "grass"
  );
  const [direction, setDirection] = useState("right");
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
    primaryClass,
    "backgroundFade"
  );

  // handle for list pokemon
  const handlePokemonSelect = (pokemonId) => {
    setDirection(pokemonId > id ? "right" : "left");
    setId(pokemonId);
  };

  const handleSwipe = useSwipeable({
    onSwipedLeft: () => {
      if (id < 1007) {
        setDirection("right");
        setId(id + 1);
      }
    },
    onSwipedRight: () => {
      if (id > 1) {
        setDirection("left");
        setId(id - 1);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const transitions = useTransition(id, {
    from: {
      position: "absolute",
      opacity: 0,
      transform:
        direction === "right"
          ? "translate3d(100%,0,0)"
          : "translate3d(-100%,0,0)",
    },
    enter: {
      position: "absolute",
      opacity: 1,
      transform: "translate3d(0%,0,0)",
    },
    leave: {
      position: "absolute",
      opacity: 0,
      transform:
        direction === "right"
          ? "translate3d(-50%,0,0)"
          : "translate3d(50%,0,0)",
    },
    config: {
      duration: 300,
    },
  });
  // ------------------------------------------------------

  return (
    <div className="h-full fixed">
      <div {...handleSwipe} className={dynamicPrimaryColorClass}>
        {loading && (
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
            <Image
              src="/assets/loading.gif"
              width={250}
              height={250}
              className=""
            />
          </div>
        )}
        {transitions((style, i) => (
          <animated.div style={style}>
            <ImageGroup id={i} color={secondaryTextClass} />
            <div className="flex flex-shrink justify-between mt-7">
              <PokemonName id={id} />
              {!loading && <CapacityButton color={secondaryBackgroundClass} />}
            </div>
            <PokemonInfo id={id} />
          </animated.div>
        ))}
      </div>
      <PokemonList selectedId={id} onPokemonSelect={handlePokemonSelect} />
    </div>
  );
}

export async function getStaticProps() {
  const initialPokemonData = await getPokemonData(1);

  return {
    props: {
      initialPokemonData,
    },
  };
}
