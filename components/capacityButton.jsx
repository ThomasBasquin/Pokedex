import React, { useState, useEffect } from "react";
import classNames from "classnames";

const CapacityButton = ({ color, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dynamicSecondaryColorClass = classNames(
    "rounded-full",
    "text-white",
    "py-3",
    "px-[1.6rem]",
    "shadow-lg",
    color
  );

  function handleClick() {
    // play sound from file
    const audio = new Audio(`/assets/sounds/${id}.ogg`);
    audio.play();
  }

  const buttonClasses = classNames(
    "tracking-normal",
    "font-normal",
    "text-sm",
    "mr-5",
    "transition-transform",
    "duration-100   ",
    "active:scale-95",
    "whitespace-nowrap"
  );

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={buttonClasses}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <span className={dynamicSecondaryColorClass}>Écouter le cri</span>
        <span className="hidden tab:inline">Écouter</span>
      </button>
    </>
  );
};

export default CapacityButton;
