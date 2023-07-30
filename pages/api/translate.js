import axios from "axios";
import { decode } from "he";

const API_KEY = process.env.TRANSLATE_API_KEY;

export default async (req, res) => {
  const { text, source } = req.body;
  const target = source === "en" ? "fr" : "en";

  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        q: text,
        source: source,
        target: target,
      }
    );

    let translatedText = response.data.data.translations[0].translatedText;
    translatedText = decode(translatedText);

    res.status(200).json({ translatedText });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while translating the text." });
  }
};
