import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemonText = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/pokemon-species/${id}`);
  return response.data;
};

export const getPokemonInfo = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/pokemon/${id}`);
  return response.data;
};

export const getPokemonData = async (id) => {
  const [textData, infoData] = await Promise.all([
    getPokemonText(id),
    getPokemonInfo(id),
  ]);

  const frenchName = textData.names.find((name) => name.language.id === 5);

  return {
    name: frenchName.name,
    info: infoData,
  };
};
