import React, { useState, useEffect } from "react";
import Image from "next/image";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const searchPokemon = () => {};

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="z-20 mt-4 h-9 flex w-full justify-center items-center relative">
      <input
        type="text"
        value={search}
        placeholder="Nom ou numéro"
        onChange={handleChange}
        className="w-4/5 h-full text-white px-4 placeholder:text-gray-300 placeholder:text-opacity-60"
        style={{
          background: "rgba(0, 0, 0, 0.35)",
          borderRadius: "16px",
          boxShadow: "0 4px 23px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(7.4px)",
          WebkitBackdropFilter: "blur(7.4px)",
        }}
      />
      <img
        src="/assets/loupe.png"
        alt="loupe"
        className="h-5 absolute right-14 top-1/2 transform -translate-y-1/2 -rotate-90"
      />
    </div>
  );
};

export default SearchBar;
