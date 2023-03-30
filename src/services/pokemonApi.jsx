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

  // Trouver la première entrée de flavor text en français ou utiliser une chaîne de caractères par défaut si non disponible
  const frenchFlavorTextEntry = textData.flavor_text_entries.find(
    (entry) => entry.language.name === "fr"
  ) || { flavor_text: "Description non disponible" };

  // Trouver le nom en français ou utiliser une chaîne de caractères par défaut si non disponible
  const frenchNameEntry = textData.names.find(
    (nameEntry) => nameEntry.language.name === "fr"
  ) || { name: "Nom non disponible" };

  // trouver le nom en japonais ou utiliser une chaîne de caractères par défaut si non disponible
  const japaneseNameEntry = textData.names.find(
    (nameEntry) => nameEntry.language.name === "ja"
  ) || { name: "Nom non disponible" };

  return {
    name: frenchNameEntry.name,
    japaneseName: japaneseNameEntry.name,
    description: frenchFlavorTextEntry.flavor_text,
    types: infoData.types.map((type) => type.type.name),
    abilities: infoData.abilities.map((ability) => ability.ability.name),
    taille: infoData.height,
    poids: infoData.weight,
  };
};
