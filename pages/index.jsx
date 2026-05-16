/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useLayoutEffect } from "react";
import Head from "next/head";
import { useMediaQuery } from "react-responsive";
import { useSwipeable } from "react-swipeable";
import { getPokemonData, preloadPokemonData } from "../services/pokemonApi";
import { getTypeHex } from "../utils/getTypeColor";
import { usePokemonData } from "../hooks/usePokemon";
import PokemonListMobile from "../components/mobile/pokemonListMobile";
import PokemonListDesktop from "../components/pc/pokemonListDesktop";
import PokemonListVertical from "../components/pc/pokemonListVertical";
import Header from "../components/Header";
import PokemonDisplay from "../components/PokemonDisplay";

const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function Pokedex({ initialPokemonData }) {
  const [id, setId] = useState(1);
  const [range, setRange] = useState("1");
  const [direction, setDirection] = useState("right");
  const [primaryType, setPrimaryType] = useState(
    initialPokemonData.types[0] || "grass",
  );
  const { loading, data = initialPokemonData } = usePokemonData(id);
  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    if (data) setPrimaryType(data.types[0] || "grass");
  }, [data]);

  useEffect(() => {
    const images = [
      "/assets/bug.png",
      "/assets/dark.png",
      "/assets/dragon.png",
      "/assets/electric.png",
      "/assets/fairy.png",
      "/assets/fighting.png",
      "/assets/fire.png",
      "/assets/flying.png",
      "/assets/ghost.png",
      "/assets/grass.png",
      "/assets/ground.png",
      "/assets/ice.png",
      "/assets/normal.png",
      "/assets/poison.png",
      "/assets/psychic.png",
      "/assets/rock.png",
      "/assets/steel.png",
      "/assets/water.png",
    ];
    images.forEach((image) => {
      const link = document.createElement("link");
      link.href = image;
      link.rel = "prefetch";
      link.as = "image";
      document.head.appendChild(link);
    });
  }, []);

  useEffect(() => {
    document.documentElement.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
  }, []);

  useEffect(() => {
    const calculId = id + 1;
    let newRange = Math.ceil(calculId / 50) * 50 - 50;
    if (newRange < 1) newRange = 1;
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

  const typeHex = getTypeHex(primaryType);

  useBrowserLayoutEffect(() => {
    document.documentElement.style.setProperty(
      "--pokemon-theme-color",
      typeHex,
    );
    document.documentElement.style.backgroundColor = typeHex;
    document.body.style.backgroundColor = typeHex;

    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeColorMeta) {
      themeColorMeta = document.createElement("meta");
      themeColorMeta.setAttribute("name", "theme-color");
      document.head.appendChild(themeColorMeta);
    }
    themeColorMeta.setAttribute("content", typeHex);
  }, [typeHex]);

  return (
    <>
      <Head>
        <meta name="theme-color" content={typeHex} key="theme-color" />
      </Head>
      <div
        key={`top-${typeHex}`}
        aria-hidden="true"
        className="safari-theme-edge safari-theme-edge--top"
        style={{ "--safari-theme-color": typeHex }}
      />
      <div
        key={`bottom-${typeHex}`}
        aria-hidden="true"
        className="safari-theme-edge safari-theme-edge--bottom"
        style={{ "--safari-theme-color": typeHex }}
      />
      <div className="fixed inset-0 flex justify-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pokemon-viewport-background absolute inset-0"
          style={{ backgroundColor: typeHex }}
        />
        <div
          {...handleSwipe}
          className="relative z-10 flex flex-col h-full w-screen tracking-wide"
          style={{
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <Header pokemonId={id} setPokemonId={setId} surfaceColor={typeHex} />
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
            surfaceColor={typeHex}
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
    </>
  );
}

export default Pokedex;

export async function getStaticProps() {
  const initialPokemonData = await getPokemonData(1);
  return { props: { initialPokemonData } };
}
