from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests

from config import OPENROUTER_API_KEY, OPENROUTER_BASE_URL, MODEL
from prompts import build_system_instruction

# ── App Setup ──────────────────────────────────────────────
app = FastAPI(title="Seabreeze AI Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── System Prompt ──────────────────────────────────────────
system_instruction = build_system_instruction()


# ── Request / Response Models ──────────────────────────────
class ChatMessage(BaseModel):
    role: str  # "user" or "model"
    text: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []


class ChatResponse(BaseModel):
    reply: str


# ── Routes ─────────────────────────────────────────────────
@app.get("/api/health")
def health():
    return {"status": "ok", "model": MODEL, "provider": "openrouter"}


@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    if not OPENROUTER_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="OPENROUTER_API_KEY is not set. Please add it to backend/.env",
        )

    try:
        # Build messages array for OpenAI-compatible API
        messages = [{"role": "system", "content": system_instruction}]

        # Add conversation history
        for msg in req.history:
            role = "assistant" if msg.role == "model" else "user"
            messages.append({"role": role, "content": msg.text})

        # Add the new user message
        messages.append({"role": "user", "content": req.message})

        # Call OpenRouter API
        response = requests.post(
            OPENROUTER_BASE_URL,
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:5173",
                "X-Title": "Seabreeze AI Chatbot",
            },
            json={
                "model": MODEL,
                "messages": messages,
                "temperature": 0.7,
                "max_tokens": 1024,
            },
            timeout=30,
        )

        data = response.json()

        if response.status_code != 200:
            error_detail = data.get("error", {}).get("message", str(data))
            print(f"[ERROR] OpenRouter API error ({response.status_code}): {error_detail}")
            raise HTTPException(
                status_code=response.status_code,
                detail=f"API error: {error_detail}",
            )

        reply = data["choices"][0]["message"]["content"]
        return ChatResponse(reply=reply)

    except HTTPException:
        raise
    except Exception as e:
        error_msg = str(e)
        print(f"[ERROR] Chat request failed: {error_msg}")
        raise HTTPException(status_code=500, detail=f"Error: {error_msg}")


# ── Run ────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
