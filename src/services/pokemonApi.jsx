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

  // Filtrer les entrées de flavor text en français
  const frenchFlavorTextEntries = textData.flavor_text_entries.filter(
    (entry) => entry.language.name === "fr"
  );

  // Sélectionner le dernier élément du tableau ou utiliser une chaîne de caractères par défaut si non disponible
  const frenchFlavorText =
    frenchFlavorTextEntries.length > 0
      ? frenchFlavorTextEntries[frenchFlavorTextEntries.length - 1].flavor_text
      : "Description non disponible";

  return {
    name: textData.names[4].name,
    description: frenchFlavorText,
    types: infoData.types.map((type) => type.type.name),
    abilities: infoData.abilities.map((ability) => ability.ability.name),
    taille: infoData.height,
    poids: infoData.weight,
  };
};
