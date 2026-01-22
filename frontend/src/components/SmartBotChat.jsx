import React, { useState, useEffect, useRef } from "react";
import { sendMessageToBot } from "../api/botApi";

export default function SmartBotChat({ onClose }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Welcome to SmartBite! What would you like to have today? Choose a category below 🍽️" },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState("");
  const bottomRef = useRef(null);

  const categories = [
    "Pizza",
    "Burger",
    "North Indian",
    "South Indian",
    "Chinese",
    "Desserts",
  ];

  const moodOptions = [
    "Happy",
    "Sad",
    "Tired",
    "Angry",
    "Romantic",
    "Healthy",
    "Hungry",
  ];

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => scrollToBottom(), [messages]);

  const send = async (msg) => {
    const text = typeof msg === "string" ? msg : input;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { from: "user", text }]);
    setLoading(true);

    try {
      const res = await sendMessageToBot({ message: text, mood });
      setMessages(prev => [...prev, { from: "bot", text: res.reply }]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { from: "bot", text: "⚠️ Sorry, something went wrong. Please try again later." },
      ]);
    }

    setLoading(false);
    setInput("");
  };

  const sendCategory = (item) => send(`I want to eat ${item}`);
  const askMoodInstead = () => {
    setMessages(prev => [
      ...prev,
      { from: "bot", text: "Sure! Then tell me your mood and I will suggest the perfect meal for you ✨" },
    ]);
  };

  return (
    <div className="smartbot-chat-ui">

      {/* Category Selector */}
      <div className="food-heading">🍴 Food categories</div>
      <div className="bot-category-container">
        {categories.map((c) => (
          <span key={c} className="category-chip" onClick={() => sendCategory(c)}>
            {c}
          </span>
        ))}
        <span className="mood-trigger" onClick={askMoodInstead}>
          Suggest based on mood 😊
        </span>
      </div>

      {/* Mood Selection */}
      <div className="mood-dropdown">
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="">Select your mood (optional)</option>
          {moodOptions.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Chat Messages */}
      <div className="bot-message-area">
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.from}`}>
            <p>{m.text}</p>
          </div>
        ))}
        {loading && <div className="bubble bot"><p>⏳ Preparing suggestions...</p></div>}
        <div ref={bottomRef}></div>
      </div>

      {/* Chat Input */}
      <div className="bot-input-box">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => send()} disabled={loading}>
          Send
        </button>
      </div>

      <div className="smartbot-footer">
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
