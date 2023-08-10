import React, { useState, useEffect } from "react";
import axios from "axios";
import { getPokemonId } from "../services/pokemonApi";
import Image from "next/image";

const SearchBar = ({ id, setId }) => {
  let [search, setSearch] = useState("");
  let [errorMessage, setErrorMessage] = useState("");
  let [errorMessageIsVisible, setErrorMessageIsVisible] = useState(false);

  function onlyLettersAndNumbers(str) {
    return /[A-Za-z]/.test(str) && /[0-9]/.test(str);
  }

  const searchPokemon = () => {
    search = search.toLowerCase();
    const previousId = id;
    if (search === "") {
      setErrorMessage("Veuillez rentrer un Nom ou un Id");
      setId(previousId);
      setSearch("");
      return;
    } else if (onlyLettersAndNumbers(search)) {
      setErrorMessage("Merci d'entrer seulement un nom ou un Id");
      setId(previousId);
      setSearch("");
    } else if (isNaN(search)) {
      axios
        .post("/api/translate", { text: search, source: "fr" })
        .then((res) => {
          getPokemonId(res.data.translatedText)
            .then(setId, setSearch(""))
            .catch((error) => {
              setErrorMessage("Désolé, ce nom de pokémon n'existe pas");
              setId(previousId);
              setSearch("");
            });
        });
    } else {
      search = parseInt(search);
      if (search < 1 || search > 898) {
        setId(previousId);
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
        className={`z-20 mt-4 h-9 flex w-full justify-center items-center relative animate__animated transition-transform ${
          errorMessageIsVisible ? "animate__headShake " : ""
        }`}
      >
        <input
          type="number"
          value={search}
          placeholder="Numéro du Pokémon"
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
        <img
          src="/assets/loupe.png"
          alt="loupe"
          onClick={() => {
            searchPokemon();
          }}
          className="h-5 absolute right-14 top-1/2 transform -translate-y-1/2 -rotate-90 active:scale-90 cursor-pointer"
        />
      </div>
      <div className="flex justify-center">
        <p
          className={`transition-opacity duration-1200 ${
            errorMessageIsVisible ? "opacity-100" : "opacity-0"
          } text-red-600 mt-1 align-middle z-50 font-bold`}
        >
          {errorMessage}
        </p>
      </div>
    </div>
  );
};

export default SearchBar;
