import React, { useState, useEffect } from "react";
import axios from "axios";
import { getPokemonId } from "../services/pokemonApi";
import Fuse from "fuse.js";
import Image from "next/image";
import pokemonList from "../services/pokemonData.json";

const SearchBar = ({ id, setId }) => {
  let [search, setSearch] = useState("");
  let [errorMessage, setErrorMessage] = useState("");

  function onlyLettersAndNumbers(str) {
    return /[A-Za-z]/.test(str) && /[0-9]/.test(str);
  }

  const options = {
    includeScore: true,
    keys: ["id", "nameFr", "nameEn"],
  };

  const fuse = new Fuse(pokemonList, options);

  useEffect(() => {
    if (search.length > 0) {
      const result = fuse.search(search);
      if (result.length > 0) {
        setSearch(result[0].item.id.toString());
      }
    }
  }, [search]);

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
      if (search < 1 || search > 1008) {
        setId(previousId);
        setSearch("");
        setErrorMessage("Merci d'entrer l'id d'un des 899 Pokémon");
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
      <div className="z-20 mt-4 h-9 flex w-full justify-center items-center relative">
        <input
          type="text"
          value={search}
          placeholder="Nom ou numéro"
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchPokemon();
            }
          }}
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
          onClick={() => {
            searchPokemon();
          }}
          className="h-5 absolute right-14 top-1/2 transform -translate-y-1/2 -rotate-90 active:scale-90 cursor-pointer"
        />
      </div>
      <div>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default SearchBar;
