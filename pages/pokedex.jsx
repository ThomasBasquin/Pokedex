import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useSwipeable } from "react-swipeable";
import classNames from "classnames";
import { getPokemonData, preloadPokemonData } from "../services/pokemonApi";
import { getTypeColors, getTypeHex, POKEMON_TYPES } from "../utils/getTypeColor";
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
  const [displayType, setDisplayType] = useState(initialPokemonData.types[0] || "grass");
  const [isDebug, setIsDebug] = useState(false);
  const [debugDelay, setDebugDelay] = useState(0);
  const delayRef = useRef(0);
  const { loading, data = initialPokemonData } = usePokemonData(id);
  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    if (data) setPrimaryType(data.types[0] || "grass");
  }, [data]);

  useEffect(() => {
    setIsDebug(window.location.search.includes("debug"));
  }, []);

  useEffect(() => {
    delayRef.current = debugDelay;
  }, [debugDelay]);

  useEffect(() => {
    // Sentinel et fond changent dans le même render → zéro seam
    const t = setTimeout(() => setDisplayType(primaryType), delayRef.current);
    return () => clearTimeout(t);
  }, [primaryType]);

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

  const { primaryClass } = getTypeColors(displayType);
  const dynamicPrimaryColorClass = classNames(
    "flex", "flex-col", "h-screen", "w-screen", "tracking-wide", primaryClass, "backgroundFade",
  );

  const sentinelBase = {
    position: "fixed", left: 0, width: "100%",
    height: "6px", pointerEvents: "none", zIndex: 9999,
  };

  return (
    <>
      {POKEMON_TYPES.map((type) => (
        <React.Fragment key={type}>
          <div style={{ ...sentinelBase, top: 0, backgroundColor: getTypeHex(type), display: displayType === type ? "block" : "none" }} />
          <div style={{ ...sentinelBase, bottom: 0, backgroundColor: getTypeHex(type), display: displayType === type ? "block" : "none" }} />
        </React.Fragment>
      ))}

      {isDebug && (
        <div style={{ position: "fixed", bottom: 120, left: 16, zIndex: 99999, background: "rgba(0,0,0,0.85)", color: "white", padding: "12px 16px", borderRadius: "10px", fontSize: "14px", minWidth: "220px" }}>
          <div style={{ marginBottom: 8 }}>Delay : <strong>{debugDelay}ms</strong></div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <button type="button" onClick={() => setDebugDelay((v) => Math.max(0, v - 1))} style={{ padding: "4px 10px", borderRadius: 6, background: "#444", color: "white", border: "none", cursor: "pointer", fontSize: 16 }}>−</button>
            <input type="range" min="0" max="200" step="1" value={debugDelay} onChange={(e) => setDebugDelay(Number(e.target.value))} style={{ flex: 1 }} />
            <button type="button" onClick={() => setDebugDelay((v) => Math.min(200, v + 1))} style={{ padding: "4px 10px", borderRadius: 6, background: "#444", color: "white", border: "none", cursor: "pointer", fontSize: 16 }}>+</button>
          </div>
          <button
            type="button"
            onClick={() => {
              const next = primaryType === "fire" ? "grass" : "fire";
              setPrimaryType(next);
              setTimeout(() => setPrimaryType(primaryType), 1500);
            }}
            style={{ width: "100%", padding: "6px", borderRadius: 6, background: "#444", color: "white", border: "none", cursor: "pointer" }}
          >
            Test (grass ↔ fire)
          </button>
        </div>
      )}

      <div className="h-full fixed flex justify-center">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <div {...handleSwipe} className={dynamicPrimaryColorClass}>
          <Header pokemonId={id} setPokemonId={setId} />
          <PokemonDisplay
            pokemon={data}
            direction={direction}
            loading={loading}
            id={id}
            primaryType={displayType}
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
    </>
  );
}

export default Pokedex;

export async function getStaticProps() {
  const initialPokemonData = await getPokemonData(1);
  return { props: { initialPokemonData } };
}
