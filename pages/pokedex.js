import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
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

const capitalize = (type) => type.charAt(0).toUpperCase() + type.slice(1);

const getTypeColors = (type) => {
  const capType = capitalize(type);
  return {
    primaryClass: `primary${capType}`,
    secondaryTextClass: `secondaryText${capType}`,
    secondaryBackgroundClass: `secondaryBackground${capType}`,
  };
};

const Pokedex = ({ initialPokemonData }) => {
  const [id, setId] = useState(1);
  const listRef = useRef(null);
  const [primaryType, setPrimaryType] = useState(
    initialPokemonData.types[0] || "grass"
  );
  const [direction, setDirection] = useState("right");
  const { loading, data = initialPokemonData } = usePokemonData(id);

  useEffect(() => {
    if (data) {
      setPrimaryType(data.types[0] || "grass");
    }
  }, [data]);

  const handleSwipe = useSwipeable({
    onSwipedLeft: () =>
      setId((prevId) => {
        if (prevId < 1007) {
          setDirection("right");
          preloadPokemonData(prevId + 2);
          return prevId + 1;
        }
        return prevId;
      }),
    onSwipedRight: () =>
      setId((prevId) => {
        if (prevId > 1) {
          setDirection("left");
          preloadPokemonData(prevId - 2);
          return prevId - 1;
        }
        return prevId;
      }),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

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
    config: { duration: 300 },
  });

  return (
    <div className="h-full fixed flex justify-center">
      <div {...handleSwipe} className={dynamicPrimaryColorClass}>
        {loading && (
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
            <Image
              src="/assets/loading.gif"
              alt="loading"
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
      <PokemonList
        selectedId={id}
        onPokemonSelect={setId}
        setDirection={setDirection}
      />
    </div>
  );
};

export default Pokedex;

export async function getStaticProps() {
  const initialPokemonData = await getPokemonData(1);
  return { props: { initialPokemonData } };
}
