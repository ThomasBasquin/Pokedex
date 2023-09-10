import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import PokemonName from "../components/pokemonName";
import PokemonInfo from "../components/pokemonInfo";
import CapacityButton from "../components/capacityButton";
import ImageGroup from "../components/imageGroup";
import SearchBar from "../components/searchbar";
import { getPokemonData, preloadPokemonData } from "../services/pokemonApi";
import { usePokemonData } from "../hooks/usePokemon";
import classNames from "classnames";
import PokemonListMobile from "../components/mobile/pokemonListMobile";
import PokemonListDesktop from "../components/pc/pokemonListDesktop";
import PokemonListVertical from "../components/pc/pokemonListVertical";
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
  const [range, setRange] = useState("0");
  const listRef = useRef(null);
  const [primaryType, setPrimaryType] = useState(
    initialPokemonData.types[0] || "grass"
  );
  const [direction, setDirection] = useState("right");
  const { loading, data = initialPokemonData } = usePokemonData(id);
  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    if (data) {
      setPrimaryType(data.types[0] || "grass");
    }
  }, [data]);

  const handleSwipe = useSwipeable({
    onSwipedLeft: () =>
      setId((prevId) => {
        if (prevId < 1008) {
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
    // "items-center",
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
        <div className="block laptop-sm:hidden">
          <SearchBar id={id} setId={setId} />
        </div>
        <div className="hidden laptop-sm:block">
          <div className="flex justify-between mt-7">
            <PokemonName id={id} />
            <SearchBar id={id} setId={setId} />
          </div>
        </div>

        <PokemonListVertical
          selectedId={id}
          onPokemonSelect={setId}
          setDirection={setDirection}
          selectedRange={range}
        />

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
            <div className="flex laptop-sm:hidden  flex-shrink justify-between mt-7">
              <PokemonName id={id} />
              {!loading && (
                <CapacityButton color={secondaryBackgroundClass} id={id} />
              )}
            </div>
            <PokemonInfo id={id} />
          </animated.div>
        ))}
      </div>
      {isMobile ? (
        <PokemonListMobile
          selectedId={id}
          onPokemonSelect={setId}
          setDirection={setDirection}
        />
      ) : (
        <PokemonListDesktop selectedRange={range} setSelectedRange={setRange} />
      )}
    </div>
  );
};

export default Pokedex;

export async function getStaticProps() {
  const initialPokemonData = await getPokemonData(1);
  return { props: { initialPokemonData } };
}
