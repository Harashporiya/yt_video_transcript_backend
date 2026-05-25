# YouTube Video Transcripter

A powerful, AI-driven full-stack web application designed to automatically extract YouTube video transcripts, generate insightful summaries, and provide an interactive ChatGPT-like experience to converse with video content.

<img src="./frontend/public/home.png" width="800" />

## 🚀 Features

- **Advanced Transcript Extraction:** Automatically extracts English subtitles for fast processing, with a robust fallback mechanism utilizing Apify to handle missing or multilingual transcripts.
- **AI-Powered Insights:** Employs LangChain and Google GenAI to generate keypoint summaries and facilitate deep, interactive Q&A (chat) and interview workflows based on video content.
- **Vector Search & RAG:** Integrates Pinecone for vector storage, enabling highly accurate retrieval-augmented generation (RAG) for querying long video transcripts.
- **Premium User Interface:** A modern, conversion-focused landing page with a bento-grid layout, stunning dark-mode aesthetics, and sleek micro-animations inspired by high-end SaaS platforms.
- **Robust Authentication:** Secure, persistent authentication flow using NextAuth.js and Google OAuth.
- **Video History Management:** Intuitive dashboard to track processed videos with inline management tools.

## 🏗️ Architecture Pipeline

Here is the complete data flow and architectural pipeline of the YouTube Video Transcripter:

```mermaid
flowchart TB
    %% Definitions
    User((User))
    
    subgraph Frontend["Frontend (Next.js)"]
        UI["Landing Page & UI"]
        Auth["NextAuth.js\n(Google OAuth)"]
        Dash["Dashboard\n(Chat & Summary)"]
    end
    
    subgraph Backend["Backend (Node.js/Express)"]
        API["API Endpoints"]
        Extractor["Transcript\nExtractor"]
        LLM["LangChain &\nAI Services"]
    end

    subgraph External["External APIs"]
        YT["YouTube\n(Native Subtitles)"]
        Apify["Apify Actor\n(Fallback Scraper)"]
        Gemini["Google GenAI\n(Gemini)"]
    end

    subgraph Databases["Databases"]
        PG[("PostgreSQL via Prisma\n(Users, Videos, Chats)")]
        Vector[("Pinecone\n(Vector DB)")]
    end

    %% User Interaction
    User -->|Visits| UI
    User -->|Authenticates| Auth
    User -->|Submits Video URL| Dash
    User -->|Chats with AI| Dash

    %% Frontend to Backend
    Auth <-->|Stores/Reads User| PG
    Dash <-->|REST Requests| API

    %% Backend Pipeline (Video Processing)
    API -->|1. Process Video| Extractor
    Extractor -->|1a. Fetch Subtitles| YT
    Extractor -->|1b. Fallback Extract| Apify
    Extractor -->|2. Clean Transcript| LLM
    
    %% AI Processing
    LLM -->|3. Generate Summaries| Gemini
    LLM -->|4. Chunk & Embed| Vector
    LLM -->|5. Store Metadata| PG

    %% Chat Pipeline (RAG)
    API -->|Chat Message| LLM
    LLM -->|Search Similar Chunks| Vector
    Vector -->|Relevant Context| LLM
    LLM -->|Prompt + Context| Gemini
    Gemini -->|AI Response| API
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js](https://nextjs.org/) (v16) & React (v19)
- **Styling:** Tailwind CSS (v4), Radix UI, Class Variance Authority
- **Authentication:** NextAuth.js
- **Icons & Animation:** Phosphor Icons, Lucide React, TW Animate CSS

### Backend
- **Framework:** Node.js with Express
- **Database & ORM:** PostgreSQL managed via Prisma
- **AI & Vector DB:** LangChain (Core & Community), Google GenAI, Pinecone Database
- **Data Scraping:** Apify Client, YouTube Transcript utilities

## 📦 Getting Started

### Prerequisites
Before running the application, ensure you have the following installed and configured:
- Node.js (v18+ recommended)
- PostgreSQL
- API Keys: Pinecone, Google Gemini, Apify, Google OAuth (Client ID & Secret)

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables (`.env` file):
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/yt_ai?schema=public"
   PORT=5000
   PINECONE_API_KEY="your_pinecone_api_key"
   GOOGLE_API_KEY="your_gemini_api_key"
   APIFY_API_TOKEN="your_apify_token"
   # Add other required variables
   ```
4. Generate Prisma client and push the schema to your database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables (`.env.local` file):
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:5000"
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚢 Deployment

- **Frontend:** Optimized for deployment on [Vercel](https://vercel.com).
- **Backend:** Configured for deployment on [Render](https://render.com) or similar Node.js hosting environments. Ensure CORS is appropriately configured in the backend to accept requests from your production frontend domain.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License

This project is licensed under the [ISC License](LICENSE).
