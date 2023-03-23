import React from "react";

const CapacityButton = ({ color }) => {
  return (
    <button type="button" className={`font-medium  text-xl mr-6`}>
      <span className="tab:hidden rounded-full bg-red-500 text-white py-2 px-4">
        Ses capacités
      </span>
      <span className="hidden tab:inline">Voir ses capacités</span>
    </button>
  );
};

export default CapacityButton;
