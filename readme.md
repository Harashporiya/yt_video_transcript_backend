# YouTube Video Transcripter

Ever found yourself scrubbing through a 2-hour long YouTube video just to find one specific answer, or wishing you could just search a tutorial like a textbook? That's exactly why we built this.

This is a full-stack AI tool that pulls transcripts from any YouTube video, generates neat summaries, and opens up a chat window where you can ask questions directly about the video content — like ChatGPT, but powered by that specific video. It even generates sample interview questions to help you study or prepare.

![Landing Page](./frontend/public/home.png)

---

## ⚡ What it does

- **Smart Transcript Extraction:** First tries to grab official/auto-generated YouTube subtitles directly. If that fails (due to YouTube blocks or region settings), it falls back to Apify scraper as a safety net.
- **Interactive Video Q&A (RAG):** Chunks the transcript, embeds it into Pinecone using HuggingFace, and uses Groq (Llama 3.3) to answer your questions with precise context — Retrieval-Augmented Generation done right.
- **Clean Summary & Key Takeaways:** Creates structured summaries so you can understand a video's core content in under 30 seconds.
- **Interview Preparation:** Generates practice questions (Easy, Medium, and Hard) based on the video's content.
- **Usage Limits:** Each user can process 1 video and send up to 3 chat messages per video — keeping the platform fair and sustainable.
- **Premium Dark Mode UI:** Minimal black-on-black aesthetic, smooth animations, and a clean bento-grid layout.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js (v16) & React (v19)
- **Styling:** Tailwind CSS (v4) + custom dark theme
- **Auth:** NextAuth.js with Google OAuth Provider
- **Icons:** Phosphor Icons & Lucide React

### Backend
- **Framework:** Node.js + Express
- **Database & ORM:** PostgreSQL (Neon) + Prisma ORM
- **LLM:** Groq API — `llama-3.3-70b-versatile` (fast, free-tier friendly)
- **Embeddings:** HuggingFace Inference API — `BAAI/bge-small-en-v1.5` (384-dim vectors)
- **Vector Store:** Pinecone
- **AI Orchestration:** LangChain
- **Transcript Fallback:** Apify Client

---

## 🏗️ Architecture Pipeline

```
User pastes YouTube URL
        ↓
Backend fetches Video Info (title, thumbnail) via youtubei.js
        ↓
Transcript extracted (youtube-transcript → Apify fallback)
        ↓
Transcript split into chunks (RecursiveCharacterTextSplitter)
        ↓
Chunks embedded via HuggingFace (BAAI/bge-small-en-v1.5)
        ↓
Vectors stored in Pinecone (namespace = userId-videoId)
        ↓
Summary generated via Groq LLM (llama-3.3-70b-versatile)
        ↓
Video + Summary saved to PostgreSQL via Prisma
        ↓
Frontend shows chat interface ← User asks questions
        ↓
Question embedded → Pinecone similarity search → Top 5 chunks
        ↓
Groq LLM answers with context (RAG)
```

---

## 🚀 Running Locally

### 1. Backend Setup

1. Go into the backend folder:
   ```bash
   cd backend
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder:
   ```env
   PORT=3001
   DATABASE_URL="postgresql://user:password@localhost:5432/db_name?sslmode=require"
   JWT_SECRET="your_custom_jwt_secret"
   GROQ_API_KEY="your_groq_api_key"
   HUGGINGFACE_API_KEY="your_huggingface_api_key"
   PINECONE_API_KEY="your_pinecone_api_key"
   APIFY_API_TOKEN="your_apify_api_token"
   LOCAL_FRONTEND_URL="http://localhost:3000"
   FRONTEND_DEPLOY_URL="https://your-production-app.vercel.app"
   ```
4. Push the DB schema and generate Prisma client:
   ```bash
   npx prisma db push
   npx prisma generate
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

Backend will be running at `http://localhost:3001`.

### 2. Frontend Setup

1. Go into the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder:
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
   GOOGLE_CLIENT_ID="your_google_oauth_client_id"
   GOOGLE_CLIENT_SECRET="your_google_oauth_client_secret"
   NEXTAUTH_SECRET="your_nextauth_secret_key"
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```

Open `http://localhost:3000` and you're good to go!

---

## 🚢 Deployment

- **Frontend:** Deploy on [Vercel](https://vercel.com) — connect your GitHub repo and set the env variables.
- **Backend:** Works on [Render](https://render.com) or [Railway](https://railway.app). Make sure `LOCAL_FRONTEND_URL` and `FRONTEND_DEPLOY_URL` are set correctly to avoid CORS issues.

> **Note:** The Pinecone index must have **384 dimensions** to match the HuggingFace `BAAI/bge-small-en-v1.5` embedding model.
