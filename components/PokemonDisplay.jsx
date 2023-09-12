import React from "react";
import PokemonName from "../components/pokemonName";
import PokemonInfo from "../components/pokemonInfo";
import CapacityButton from "../components/capacityButton";
import ImageGroup from "../components/imageGroup";
import { useTransition, animated } from "react-spring";
import { getTypeColors } from "../utils/getTypeColor";
import Loader from "./Loader";

function PokemonDisplay(props) {
  const { direction, loading, id, primaryType } = props;

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

  if (loading) return <Loader />;

  return (
    <>
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
    </>
  );
}

export default PokemonDisplay;
