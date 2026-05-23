import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey:process.env.GOOGLE_GEMINI_API_KEY,
    model: "gemini-embedding-001",
});