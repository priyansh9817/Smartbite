import axios from "axios";

const API_BASE = "http://localhost:4000";

export const sendMessageToBot = async ({ message, mood }) => {
  const res = await axios.post(`${API_BASE}/api/bot/message`, {
    message,
    mood,
  });
  return res.data;
};
