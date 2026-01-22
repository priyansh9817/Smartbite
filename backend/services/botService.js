import axios from "axios";
import Order from "../models/orderModel.js";

// TOP SELLING ITEMS FUNCTION
export const getTopFoods = async () => {
  try {
    const result = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.foodId",
          name: { $first: "$items.name" },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    return result.map(item => ({
      id: item._id,
      name: item.name,
      count: item.count
    }));
  } catch (err) {
    console.error("Top foods error:", err);
    return [];
  }
};

// AI BOT USING GROQ (FREE)
export const replyFromAI = async ({ message, mood, topFoods }) => {
  try {
    const foodList =
      topFoods.length > 0
        ? topFoods.map((x, i) => `${i + 1}. ${x.name} (${x.count} orders)`).join("\n")
        : "No data available";

    const systemPrompt = `
You are SmartFoodBot, a food recommendation assistant.
Use user mood + top-selling foods to suggest dishes.
Reply in short, friendly style.
`;

    const userPrompt = `
User message: ${message}
User mood: ${mood}

Top selling foods:
${foodList}

Respond with:
- 2-3 recommended dishes
- short reason
- 1-line call to action
`;

    // GROQ API CALL
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: process.env.LLAMA_MODEL || "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("🔥 GROQ API Error:", error.response?.data || error.message);
    return "Sorry, I'm having trouble responding right now.";
  }
};
