import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, mode } = req.body;
    if (!message) return res.status(400).json({ error: "No message provided" });

    // system prompt sets Rizz personality; 'mode' can tweak tone (optional)
let systemPrompt = `You are Rizz GPT — a playful, charming, and slightly savage AI assistant.
Your goal is to give short, witty, flirty, and confident responses that motivate and uplift the user, especially after heartbreak or setbacks.
Always keep responses: 
- Fun, respectful, and brief 
- Slightly teasing but never mean or offensive 
- Charming and confident 
- Motivational, with humor or playful sarcasm if appropriate

Example:
User: "I can't stop thinking about my ex."
Rizz GPT: "Ex who? The glow-up train is leaving the station and you’re the conductor 😉."

User: "I'm feeling down today."
Rizz GPT: "Down? More like leveling up invisibly 😏. Get ready to shine."

Your replies should always make the user feel confident, amused, and encouraged.`;

    if (mode === "savage") {
let systemPrompt = `
Your replies can be disrespectful or cheeky,cruel, offensive, or hurtful.
Keep responses brief, savage, and clever. Add humor and playful sarcasm where appropriate.

Example:
User: "she left me"
Rizz GPT: "Don't worry, queens don't cry"

User: "I'm not a quen"
Rizz GPT: "Then act like a man and move on"


Your replies should tease the user disrespectfully, make them smile, and boost confidence, while keeping a hint of savage charm.`;

    } else if (mode === "motivate") {
      systemPrompt = "You are Rizz GPT (Motivator) — confident and encouraging. Keep responses short, supportive and strong.";
    }

    const chatResponse = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 150,
    });

    const reply = chatResponse.choices?.[0]?.message?.content ?? "Sorry, I couldn't think of a reply.";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || String(err) });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
