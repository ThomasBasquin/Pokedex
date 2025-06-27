/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";
import PokemonName from "./pokemonName";
import PokemonInfo from "./pokemonInfo";
import PokemonSizeWeight from "./PokemonSizeWeight";
import CapacityButton from "./capacityButton";
import ImageGroup from "./imageGroup";
import { getTypeColors } from "../utils/getTypeColor";
import Loader from "./Loader";

function PokemonDisplay(props) {
  const { direction, loading, id, primaryType, isMobile } = props;
  const [windowHeight, setWindowHeight] = useState(0);

  const { secondaryTextClass, secondaryBackgroundClass } =
    getTypeColors(primaryType);

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
      position: "relative",
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

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <Loader />;

  const renderMobileContent = (pokemonId) => (
    <>
      <ImageGroup id={pokemonId} color={secondaryTextClass} />
      <div className="flex laptop-sm:hidden flex-shrink justify-between mt-7">
        <PokemonName id={pokemonId} />
        {!loading && (
          <CapacityButton color={secondaryBackgroundClass} id={pokemonId} />
        )}
      </div>
      <PokemonInfo id={pokemonId} isMobile={isMobile} />
    </>
  );

  const renderDesktopContent = (pokemonId) => (
    <div className="flex flex-row justify-around -translate-y-5 gap-8">
      <ImageGroup id={pokemonId} color={secondaryTextClass} />
      <div className="flex flex-col  justify-center gap-[8rem] mt-48 -translate-x-4">
        <PokemonInfo id={pokemonId} isMobile={isMobile} />
        <div className="flex flex-row justify-around items-center ">
          <PokemonSizeWeight id={pokemonId} />
          <CapacityButton color={secondaryBackgroundClass} id={pokemonId} />
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{ height: `${windowHeight - 120}px` }}
      className="relative flex justify-center items-center"
    >
      {transitions((style, pokemonId) => (
        <animated.div style={style}>
          {isMobile
            ? renderMobileContent(pokemonId)
            : renderDesktopContent(pokemonId)}
        </animated.div>
      ))}
    </div>
  );
}

export default PokemonDisplay;
