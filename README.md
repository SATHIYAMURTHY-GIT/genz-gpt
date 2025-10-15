# GenZ GPT — Full Working Codebase

This archive contains a minimal **GenZ GPT** project with:
- **client/** — React (Vite) frontend (simple chat UI)
- **server/** — Node.js + Express backend that forwards messages to the OpenAI API
🧠 1️⃣ Backend (server folder)

Go to:
cd D:\GenZ-gpt\server
npm install express cors dotenv openai

cd D:\GenZ-gpt\server


Then install these core libraries:

npm install express cors dotenv openai


✅ Library meanings:

express → for running your web server

cors → allows requests from your frontend (React)

dotenv → loads your .env file with your API key

openai → official OpenAI library to talk to GPT

(Optional, for better logging/debugging)

npm install nodemon


Then you can start your server with:

npx nodemon index.js


It will auto-restart when you edit code.

💻 2️⃣ Frontend (client folder)

Go to:

cd D:\GenZ-gpt\client


Install:

npm install react react-dom axios


✅ Library meanings:

react / react-dom → base libraries for your UI

axios → for sending chat messages to your backend
## Quick start (local)

### 1) Backend
```bash
cd GenZ-gpt/server
npm install
# create .env with your OpenAI API key:
# OPENAI_API_KEY=sk-...
npm run dev
Server runs on http://localhost:5000

### 2) Frontend
```bash
cd GenZ-gpt/client
npm install
npm run dev
```
Open the shown Vite URL (usually http://localhost:5173)

## Notes
- Replace `OPENAI_API_KEY` in `server/.env`.
- Frontend expects backend at http://localhost:5000. If you deploy, update the URL in `client/src/config.js`.
- This is a minimal starting point. Add Tailwind, auth, modes, or polish as you like.

Happy building — ask me to walk through any file or add features! — Sathiyamurthy's assistant
