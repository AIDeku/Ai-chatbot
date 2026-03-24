import { useEffect, useRef } from "react";
import type { Message } from "../types";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

interface Props {
  messages: Message[];
  isLoading: boolean;
  onQuickAction: (text: string) => void;
}

const QUICK_ACTIONS = [
  "What's the price?",
  "Show amenities",
  "Where is it located?",
  "Schedule a visit",
];

export default function ChatWindow({
  messages,
  isLoading,
  onQuickAction,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="chat-window">
        <div className="welcome-container">
          <div className="welcome-icon">🌊</div>
          <h2 className="welcome-title">Welcome to Seabreeze</h2>
          <p className="welcome-text">
            I'm your AI real estate consultant for{" "}
            <strong>Seabreeze by Godrej Bayview</strong>, Vashi. Ask me about
            pricing, amenities, location, or schedule a site visit!
          </p>
          <div className="welcome-chips">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action}
                className="welcome-chip"
                onClick={() => onQuickAction(action)}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {isLoading && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
