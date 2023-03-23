import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemons = async (limit = 20, offset = 0) => {
  const response = await axios.get(`${API_BASE_URL}/pokemon`, {
    params: { limit, offset },
  });
  return response.data;
};

export const getPokemonById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/pokemon/${id}`);
  return response.data;
};
