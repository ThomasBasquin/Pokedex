import React from "react";
import classNames from "classnames";

const CapacityButton = ({ color }) => {
  const dynamicSecondaryColorClass = classNames(
    "rounded-full",
    "text-white",
    "py-3",
    "px-7",
    "shadow-sm",
    color
  );

  return (
    <button type="button" className="tracking-wide font-normal text-base mr-5">
      <span className={dynamicSecondaryColorClass}>Capacités</span>
      <span className="hidden tab:inline">Voir ses capacités</span>
    </button>
  );
};

export default CapacityButton;
