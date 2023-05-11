export const iconPreload = async () => {
  const types = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
  ];

  const promises = types.map((type) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = `assets/${type}.png`;
      img.onload = () => resolve();
    });
  });

  await Promise.all(promises);
};
