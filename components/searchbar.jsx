/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import Fuse from "fuse.js";
import pokemonList from "../services/pokemonData.json";

function Searchbar({ setId }) {
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageIsVisible, setErrorMessageIsVisible] = useState(false);

  function onlyLettersAndNumbers(str) {
    return /[A-Za-z]/.test(str) && /[0-9]/.test(str);
  }

  const options = {
    includeScore: true,
    keys: ["id", "nameFr", "nameEn"],
  };

  const fuse = new Fuse(pokemonList, options);

  const searchPokemon = () => {
    setSearch(search.toLowerCase());

    if (search.length > 0 && isNaN(search)) {
      if (onlyLettersAndNumbers(search)) {
        setErrorMessage("Merci d'entrer seulement un nom ou un Id");
        setSearch("");
        setErrorMessageIsVisible(true);
        setTimeout(() => {
          setErrorMessageIsVisible(false);
        }, 2000);
        return;
      }
      const result = fuse.search(search);
      if (result.length > 0) {
        setSearch(result[0].item.id.toString());
        setId(result[0].item.id);
        setSearch("");
      }
    } else if (search.length > 0 && !isNaN(search)) {
      setSearch(parseInt(search, 10));
      if (search < 1 || search > 1008) {
        setSearch("");
        setErrorMessage("Numéro invalide");
        setErrorMessageIsVisible(true);
        setTimeout(() => {
          setErrorMessageIsVisible(false);
        }, 2000);
      } else {
        setId(search);
        setSearch("");
      }
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div
        className={`z-20 text-[0.900rem] mt-4 h-9 flex w-full justify-center items-center relative animate__animated transition-transform
        laptop-sm:w-96 laptop-sm:mt-0  ${
          errorMessageIsVisible ? "animate__headShake " : ""
        }`}
      >
        <input
          type="text"
          value={search}
          placeholder="Nom ou numéro du Pokémon"
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchPokemon();
            }
          }}
          className={`transition-border-color duration-500 border w-4/5 h-full text-white px-4 placeholder:text-gray-300 placeholder:text-opacity-60 ${
            errorMessageIsVisible
              ? "border-red-600 border-2"
              : "border-transparent border-0"
          }}`}
          style={{
            background: "rgba(0, 0, 0, 0.35)",
            borderRadius: "16px",
            boxShadow: "0 4px 23px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(7.4px)",
            WebkitBackdropFilter: "blur(7.4px)",
          }}
        />
        <button
          type="button"
          onClick={() => {
            searchPokemon();
          }}
        >
          <img
            src="/assets/loupe.png"
            alt="loupe"
            className="h-4 absolute right-14 top-1/2 opacity-75 transform -translate-y-1/2 -rotate-90 active:scale-90 cursor-pointer"
          />
        </button>
      </div>
      <div className="flex justify-center">
        <p
          className={`transition-opacity duration-1200 ${
            errorMessageIsVisible ? "opacity-100" : "opacity-0"
          } text-white text-xs mt-2 align-middle z-50`}
        >
          {errorMessage}
        </p>
      </div>
    </div>
  );
}

export default Searchbar;
