import os

# Build the system prompt by reading all knowledge files
_BASE_DIR = os.path.join(os.path.dirname(__file__), "..")


def _read_file(filename: str) -> str:
    path = os.path.join(_BASE_DIR, filename)
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read().strip()
    except FileNotFoundError:
        return ""


def build_system_instruction() -> str:
    """Combine all prompt/knowledge files into a single system instruction for Gemini."""

    role_prompt = _read_file("prompt.txt.txt")
    conversation_flow = _read_file("converstation_flow.md.txt")
    guardrails = _read_file("guardrails.txt.txt")
    project_knowledge = _read_file("seabreeze.txt.txt")

    system_instruction = f"""
{role_prompt}

===== CONVERSATION FLOW =====
Follow these stages naturally during the conversation:

{conversation_flow}

===== GUARDRAILS =====
You MUST follow these safety rules at ALL times:

{guardrails}

===== PROJECT KNOWLEDGE BASE =====
Use the following verified project data to answer user queries. Do NOT make up any data not listed here:

{project_knowledge}

===== ADDITIONAL INSTRUCTIONS =====
- When greeting the user, introduce yourself as the AI assistant for "Seabreeze by Godrej Bayview" and ask how you can help.
- Format your responses in a clean, readable way. Use bullet points where appropriate.
- If the user shares their name, address them by it throughout the conversation.
- When you've gathered enough lead info (budget, config, timeline), naturally suggest a site visit or callback.
- Keep responses concise — ideally under 150 words unless a detailed answer is needed.
""".strip()

    return system_instruction
