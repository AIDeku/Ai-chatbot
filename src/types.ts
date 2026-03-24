export interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

export interface ChatRequestPayload {
  message: string;
  history: { role: string; text: string }[];
}

export interface ChatResponsePayload {
  reply: string;
}
