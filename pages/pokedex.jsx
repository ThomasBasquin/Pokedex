import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useSwipeable } from "react-swipeable";
import classNames from "classnames";
import { getPokemonData, preloadPokemonData } from "../services/pokemonApi";
import { getTypeColors } from "../utils/getTypeColor";
import { usePokemonData } from "../hooks/usePokemon";
import PokemonListMobile from "../components/mobile/pokemonListMobile";
import PokemonListDesktop from "../components/pc/pokemonListDesktop";
import PokemonListVertical from "../components/pc/pokemonListVertical";
import Header from "../components/Header";
import PokemonDisplay from "../components/PokemonDisplay";

function Pokedex({ initialPokemonData }) {
  const [id, setId] = useState(1);
  const [range, setRange] = useState("1");
  const [primaryType, setPrimaryType] = useState(
    initialPokemonData.types[0] || "grass",
  );
  const [direction, setDirection] = useState("right");
  const { loading, data = initialPokemonData } = usePokemonData(id);
  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    if (data) {
      setPrimaryType(data.types[0] || "grass");
    }
  }, [data]);

  useEffect(() => {
    const calculId = id + 1;
    let newRange = Math.ceil(calculId / 50) * 50 - 50;
    if (newRange < 1) {
      newRange = 1;
    }
    setRange(newRange.toString());
  }, [id]);

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

  const { primaryClass } = getTypeColors(primaryType);
  const dynamicPrimaryColorClass = classNames(
    "flex",
    "flex-col",
    "h-screen",
    "w-screen",
    "tracking-wide",
    primaryClass,
    "backgroundFade",
  );

  return (
    <div className="h-full fixed flex justify-center">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <div {...handleSwipe} className={dynamicPrimaryColorClass}>
        <Header pokemonId={id} setPokemonId={setId} />
        <PokemonDisplay
          pokemon={data}
          direction={direction}
          loading={loading}
          id={id}
          primaryType={primaryType}
          isMobile={isMobile}
        />
      </div>
      {isMobile ? (
        <PokemonListMobile
          selectedId={id}
          onPokemonSelect={setId}
          setDirection={setDirection}
        />
      ) : (
        <>
          <PokemonListVertical
            selectedId={id}
            onPokemonSelect={setId}
            setDirection={setDirection}
            selectedRange={range}
          />
          <PokemonListDesktop
            selectedRange={range}
            setSelectedRange={setRange}
            onPokemonSelect={setId}
          />
        </>
      )}
    </div>
  );
}

export default Pokedex;

export async function getStaticProps() {
  const initialPokemonData = await getPokemonData(1);
  return { props: { initialPokemonData } };
}
