import { useState, useEffect } from "react";
import { getPokemonData } from "../services/pokemonApi";

export const usePokemonData = (id) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const pokemonData = await getPokemonData(id);
        setData(pokemonData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  console.log(data);

  return { loading, error, data };
};
