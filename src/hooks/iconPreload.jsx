export const iconPreload = async (types) => {
  const promises = types.map((type) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = `assets/${type}.png`;
      img.onload = () => resolve();
    });
  });

  await Promise.all(promises);
};
