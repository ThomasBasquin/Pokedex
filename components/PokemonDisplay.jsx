/* eslint-disable import/no-unresolved */
import React from "react";
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

  if (loading) return <Loader />;

  const renderMobileContent = () => (
    <>
      <ImageGroup id={id} color={secondaryTextClass} />
      <div className="flex laptop-sm:hidden flex-shrink justify-between mt-7">
        <PokemonName id={id} />
        {!loading && (
          <CapacityButton color={secondaryBackgroundClass} id={id} />
        )}
      </div>
      <PokemonInfo id={id} isMobile={isMobile} />
    </>
  );

  const renderDesktopContent = () => (
    <div className="flex flex-row justify-around -translate-y-5 gap-8">
      <ImageGroup id={id} color={secondaryTextClass} />
      <div className="flex flex-col justify-center gap-[8rem] mt-48 -translate-x-4">
        <PokemonInfo id={id} isMobile={isMobile} />
        <div className="flex flex-row justify-around items-center ">
          <PokemonSizeWeight id={id} />
          <CapacityButton color={secondaryBackgroundClass} id={id} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {transitions((style, i) => (
        <animated.div style={style}>
          {isMobile
            ? renderMobileContent(
                i,
                secondaryTextClass,
                secondaryBackgroundClass,
                loading,
              )
            : renderDesktopContent(i)}
        </animated.div>
      ))}
    </div>
  );
}

export default PokemonDisplay;
