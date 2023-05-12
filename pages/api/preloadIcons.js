import fetch from "node-fetch";
import redis from "./redis";

export default async (req, res) => {
  if (req.method === "POST") {
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

    const promises = types.map(async (type) => {
      const response = await fetch(`${req.headers.origin}/assets/${type}.png`);
      const arrayBuffer = await response.arrayBuffer();
      const base64Image = Buffer.from(arrayBuffer).toString("base64");
      await redis.set(`${type}-icon`, base64Image);
    });

    await Promise.all(promises);

    res.status(200).json({ message: "Icons preloaded and stored in Redis" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
