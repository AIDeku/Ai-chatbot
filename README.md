# 🌊 Seabreeze AI Chatbot

An AI-powered real estate consultant chatbot for **Seabreeze by Godrej Bayview**, Vashi. Built with React + TypeScript frontend and Python FastAPI backend, powered by Google Gemini via OpenRouter.

![Chat UI](https://img.shields.io/badge/React-TypeScript-blue?style=flat-square) ![Python](https://img.shields.io/badge/Python-FastAPI-green?style=flat-square) ![AI](https://img.shields.io/badge/Gemini_2.5_Flash-AI_Powered-purple?style=flat-square)

---

## ✨ Features

- **AI Real Estate Consultant** — answers pricing, amenities, location, and connectivity queries
- **Lead Qualification** — gradually captures budget, configuration, timeline preferences
- **Conversation Flow** — 7-stage pipeline from greeting to conversion
- **Guardrails** — no hallucination, stays in role, never gives legal/financial advice
- **Markdown Rendering** — bot responses render with proper bold, lists, and formatting
- **Premium UI** — dark ocean-blue theme with glassmorphism, animations, and responsive design

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, Vite |
| Styling | Vanilla CSS (custom design system) |
| Backend | Python, FastAPI |
| AI Model | Google Gemini 2.5 Flash (via OpenRouter) |
| Deployment | Vercel (serverless) |

---

## 📁 Project Structure

```
Ai chatbot/
├── api/
│   └── chat.py                 # Vercel serverless function
├── backend/
│   ├── main.py                 # FastAPI server (local dev)
│   ├── config.py               # API key & model config
│   ├── prompts.py              # System prompt builder
│   └── .env                    # API key (not committed)
├── frontend/
│   ├── src/
│   │   ├── App.tsx             # Main app + state management
│   │   ├── components/
│   │   │   ├── Header.tsx      # Branded header
│   │   │   ├── ChatWindow.tsx  # Messages + welcome screen
│   │   │   ├── MessageBubble.tsx # User/bot message rendering
│   │   │   ├── InputBar.tsx    # Chat input
│   │   │   └── TypingIndicator.tsx
│   │   ├── styles/
│   │   │   └── index.css       # Full design system
│   │   └── types.ts
│   ├── index.html
│   └── vite.config.ts
├── prompt.txt.txt              # System prompt definition
├── converstation_flow.md.txt   # 7-stage conversation flow
├── guardrails.txt.txt          # Safety rules
├── seabreeze.txt.txt           # Project knowledge base
├── vercel.json                 # Vercel deployment config
├── requirements.txt            # Python deps (serverless)
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- An [OpenRouter](https://openrouter.ai/) API key

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd "Ai chatbot"

# Frontend
cd frontend
npm install

# Backend
cd ../backend
pip install -r requirements.txt
```

### 2. Configure API Key

Create `backend/.env`:

```env
OPENROUTER_API_KEY=sk-or-v1-your_key_here
```

### 3. Run Locally

```bash
# Terminal 1 — Backend
cd backend
python main.py
# Runs on http://localhost:8000

# Terminal 2 — Frontend
cd frontend
npm run dev
# Runs on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Deploying to Vercel

1. Push the project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your repo
3. Vercel auto-detects `vercel.json` — no additional config needed
4. Add environment variable: **`OPENROUTER_API_KEY`** = your key
5. Click **Deploy**

Your chatbot will be live at `https://your-project.vercel.app` 🎉

---

## 🤖 How It Works

1. User sends a message via the React chat UI
2. Frontend calls `/api/chat` with the message and conversation history
3. Backend builds an OpenAI-compatible request with the system prompt (role, guardrails, project knowledge)
4. OpenRouter forwards to Google Gemini 2.5 Flash
5. Response is rendered as formatted markdown in the chat bubble

---

## 📋 Knowledge Base

The chatbot is trained on verified project data for **Seabreeze by Godrej Bayview**:

| Detail | Info |
|--------|------|
| Location | Sector 9, Vashi |
| Developer | Godrej Properties |
| 2 BHK | 874+ sq ft, ~₹3.20 Cr+ |
| 3 BHK | 1266+ sq ft, ~₹4.75 Cr+ |
| Amenities | 52+ across 3 levels |
| Highlights | Private decks, sea & city views |

---

## 📄 License

This project is for demonstration purposes.
