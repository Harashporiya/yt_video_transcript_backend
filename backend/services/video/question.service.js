import { llm } from "../ai/llm.js";
import { getRepresentativeTranscript } from "../../utils/transcript.util.js";

export const generateQuestions = async (transcript) => {
  const representativeTranscript = getRepresentativeTranscript(transcript);
  const response = await llm.invoke(`
You are YouTube Video Transcripter, an expert AI interviewer and educational assistant.
Generate interview questions based on the provided transcript. The questions should test the user's understanding of the concepts discussed in the video transcript.
You MUST always generate the questions and answers in ENGLISH only, regardless of the language of the video transcript.
Generate response ONLY in valid JSON format. Provide exactly 3 easy, 3 medium, and 3 hard questions.

{
  "easyQuestions": [
    { "question": "", "answer": "" },
    { "question": "", "answer": "" },
    { "question": "", "answer": "" }
  ],
  "mediumQuestions": [
    { "question": "", "answer": "" },
    { "question": "", "answer": "" },
    { "question": "", "answer": "" }
  ],
  "hardQuestions": [
    { "question": "", "answer": "" },
    { "question": "", "answer": "" },
    { "question": "", "answer": "" }
  ]
}

Transcript:
${representativeTranscript}
`);

  const cleanData = response.content.replace(/```json/g, "").replace(/```/g, "").trim();

  return JSON.parse(cleanData);
};
