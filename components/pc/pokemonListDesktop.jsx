import React from "react";
import classNames from "classnames";

function PokemonListDesktop({
  selectedRange,
  setSelectedRange,
  onPokemonSelect,
}) {
  const handleRangeClick = (range) => {
    setSelectedRange(range);
    onPokemonSelect(parseInt(range, 10));
  };

  const rangeSeparatorStyle = {
    marginLeft: "9px",
    marginRight: "9px",
    cursor: "default",
  };

  return (
    <ul className="flex fixed bottom-5 justify-center text-white text-sm items-center overflow-hidden">
      {[
        "1",
        "50",
        "100",
        "150",
        "200",
        "250",
        "300",
        "350",
        "400",
        "450",
        "500",
        "550",
        "600",
        "650",
        "700",
        "750",
        "800",
        "850",
        "900",
        "950",
        "1000",
      ].map((range, index, array) => (
        <li
          className={classNames(
            "cursor-pointer",
            "range-item",
            "transition-all",
            "ease-in-out",
            "duration-300",
            {
              "font-bold": range === selectedRange,
              "font-normal text-gray-300 text-opacity-70":
                range !== selectedRange,
            },
          )}
          key={range}
        >
          <button type="button" onClick={() => handleRangeClick(range)}>
            {range}
            {index !== array.length - 1 && (
              <span style={rangeSeparatorStyle}>-</span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PokemonListDesktop;
