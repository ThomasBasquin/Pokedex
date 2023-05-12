import redis from "./redis";

export default async (req, res) => {
  if (req.method === "GET") {
    const { type } = req.query;
    const base64Image = await redis.get(`${type}-icon`);

    if (base64Image) {
      res.status(200).json({ base64Image });
    } else {
      res.status(404).json({ message: "Type icon not found" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
