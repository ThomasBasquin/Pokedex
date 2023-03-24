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

  console.log(textData);

  return {
    name: textData.names[4].name,
    description: textData.flavor_text_entries[77].flavor_text,
    types: infoData.types.map((type) => type.type.name),
    abilities: infoData.abilities.map((ability) => ability.ability.name),
    taille: infoData.height,
    poids: infoData.weight,
  };
};
