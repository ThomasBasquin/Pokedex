import React from "react";
import classNames from "classnames";

const CapacityButton = ({ color }) => {
  const dynamicSecondaryColorClass = classNames(
    "rounded-full",
    "text-white",
    "py-3",
    "px-5",
    "shadow-sm",
    color
  );

  return (
    <button type="button" className="tracking-wide font-normal text-base mr-4">
      <span className={dynamicSecondaryColorClass}>Ses capacités</span>
      <span className="hidden tab:inline">Voir ses capacités</span>
    </button>
  );
};

export default CapacityButton;
