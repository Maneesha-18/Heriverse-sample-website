import React, { useState, useRef, useEffect } from "react";
import "./AIAssistant.css";
import { api } from "../../services/api";

function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Vanakkam! I am your HeriVerse AI Assistant. Ask me anything about the heritage temples, forts, festivals, and history of Tamil Nadu! 🏛"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setLoading(true);

    try {
      const data = await api.chat(userMessage);
      setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "I am having trouble connecting to the AI service right now. Please check if the backend is running and the Gemini API Key is configured."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ai-assistant-section" id="ai-assistant-section">
      <div className="ai-container">
        <div className="ai-header">
          <h3>🏛 HeriVerse Smart AI Guide</h3>

        </div>

        <div className="ai-chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`ai-message ${msg.sender}`}>
              <div className="avatar">
                {msg.sender === "ai" ? "🏛" : "👤"}
              </div>
              <div className="message-content">
                {msg.text.split("\n").map((line, lIdx) => (
                  <p key={lIdx}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          {loading && (
            <div className="ai-message ai loading">
              <div className="avatar">🏛</div>
              <div className="message-content">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form className="ai-input-form" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Ask about temples, history, best times to visit..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </section>
  );
}

export default AIAssistant;
