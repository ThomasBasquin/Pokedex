import { useState, useEffect } from "react";
import { getPokemons, getPokemonById } from "../services/pokemonApi";

export const usePokemons = (limit, offset) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const pokemons = await getPokemons(limit, offset);
        setData(pokemons);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [limit, offset]);

  return { loading, error, data };
};

export const usePokemon = (id) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const pokemon = await getPokemonById(id);
        setData(pokemon);
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
