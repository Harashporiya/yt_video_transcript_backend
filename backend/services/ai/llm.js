import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const llm = new ChatGoogleGenerativeAI({
    apiKey:process.env.GOOGLE_GEMINI_API_KEY,
    // model: "gemini-2.5-flash-lite",
    model:"gemini-3.1-flash-lite-preview",
    temperature: 0.1,
});