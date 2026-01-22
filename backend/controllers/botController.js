import { replyFromAI, getTopFoods } from "../services/botService.js";

export const handleBotMessage = async (req, res) => {
  try {
    const { message = "", mood = "" } = req.body;

    // fetch top foods from DB
    const topFoods = await getTopFoods();

    const context = {
      message,
      mood,
      topFoods
    };

    const reply = await replyFromAI(context);

    res.json({ reply });

  } catch (error) {
    console.error("Bot Error:", error);
    res.status(500).json({ error: "Internal bot error" });
  }
};
