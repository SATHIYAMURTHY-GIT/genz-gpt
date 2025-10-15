# GenZ GPT — Full Working Codebase

This archive contains a minimal **GenZ GPT** project with:
- **client/** — React (Vite) frontend (simple chat UI)
- **server/** — Node.js + Express backend that forwards messages to the OpenAI API

## Quick start (local)

### 1) Backend
```bash
cd rizz-gpt/server
npm install
# create .env with your OpenAI API key:
# OPENAI_API_KEY=sk-...
node index.js
```
Server runs on http://localhost:5000

### 2) Frontend
```bash
cd rizz-gpt/client
npm install
npm run dev
```
Open the shown Vite URL (usually http://localhost:5173)

## Notes
- Replace `OPENAI_API_KEY` in `server/.env`.
- Frontend expects backend at http://localhost:5000. If you deploy, update the URL in `client/src/config.js`.
- This is a minimal starting point. Add Tailwind, auth, modes, or polish as you like.

Happy building — ask me to walk through any file or add features! — Sathiyamurthy's assistant
