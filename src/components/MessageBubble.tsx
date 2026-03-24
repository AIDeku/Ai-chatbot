import ReactMarkdown from "react-markdown";
import type { Message } from "../types";

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";
  const time = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`message-row ${message.role}`}>
      <div
        className={`message-avatar ${isUser ? "user-avatar" : "bot-avatar"}`}
      >
        {isUser ? "👤" : "🏠"}
      </div>
      <div className="message-content">
        <div className={`message-bubble ${message.role}`}>
          {isUser ? (
            message.text
          ) : (
            <div className="md-content">
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          )}
        </div>
        <span className="message-time">{time}</span>
      </div>
    </div>
  );
}
