export const preloadJapaneseName = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

  return new Promise((resolve) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const japaneseName = data.names.find(
          (name) => name.language.name === "ja"
        );
        resolve(japaneseName.name);
      });
  });
};
