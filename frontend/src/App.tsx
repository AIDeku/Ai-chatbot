import { useState } from "react";
import "./styles/index.css";
import type { Message, ChatRequestPayload, ChatResponsePayload } from "./types";
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import InputBar from "./components/InputBar";

const API_URL = import.meta.env.DEV ? "http://localhost:8000" : "";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      text,
      timestamp: new Date(),
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    // Build history for API (exclude the latest user message — it goes as `message`)
    const history = updatedMessages.slice(0, -1).map((m) => ({
      role: m.role,
      text: m.text,
    }));

    try {
      const payload: ChatRequestPayload = { message: text, history };
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: "Unknown error" }));
        throw new Error(err.detail || `HTTP ${res.status}`);
      }

      const data: ChatResponsePayload = await res.json();

      const botMessage: Message = {
        id: generateId(),
        role: "model",
        text: data.reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err: unknown) {
      const errorText =
        err instanceof Error ? err.message : "Something went wrong";
      const errorMessage: Message = {
        id: generateId(),
        role: "model",
        text: `⚠️ ${errorText}\n\nPlease make sure the backend server is running on ${API_URL}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="chat-container">
        <Header />
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onQuickAction={sendMessage}
        />
        <InputBar onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
