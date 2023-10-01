import React from "react";
import { useTransition, animated } from "react-spring";
import PokemonName from "./PokemonName";
import PokemonInfo from "./PokemonInfo";
import PokemonSizeWeight from "./PokemonSizeWeight";
import CapacityButton from "./CapacityButton";
import ImageGroup from "./ImageGroup";
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
      <div className="flex laptop-sm:hidden  flex-shrink justify-between mt-7">
        <PokemonName id={id} />
        {!loading && (
          <CapacityButton color={secondaryBackgroundClass} id={id} />
        )}
      </div>
      <PokemonInfo id={id} isMobile={isMobile} />
    </>
  );

  const renderDesktopContent = () => (
    <div className="flex flex-row justify-between items-center">
      <PokemonSizeWeight id={id} />
      <ImageGroup id={id} color={secondaryTextClass} />
      <PokemonInfo id={id} isMobile={isMobile} />
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
