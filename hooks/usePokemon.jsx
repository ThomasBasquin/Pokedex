import { useState, useEffect } from "react";
import { getPokemonData } from "../services/pokemonApi";

export const usePokemonData = (id) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const pokemonCache = {};

  useEffect(() => {
    const fetchPokemon = async () => {
      if (pokemonCache[id]) {
        setData(pokemonCache[id]);
        return;
      }

      setLoading(true);
      try {
        const pokemonData = await getPokemonData(id);
        pokemonCache[id] = pokemonData;
        setData(pokemonData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  return { loading, error, data };
};
