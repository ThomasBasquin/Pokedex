import React from "react";

const CapacityButton = ({ color }) => {
  return (
    <button type="button" className="tracking-wide font-normal text-base mr-3">
      <span className="tab:hidden rounded-full bg-fire-200 text-white py-3 px-5">
        Ses capacités
      </span>
      <span className="hidden tab:inline">Voir ses capacités</span>
    </button>
  );
};

export default CapacityButton;
