import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, APICallError, RetryError } from "ai"; // Added imports
import profileData from "../../data/profile.json";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATED_AI_API_KEY || "",
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const models = [
    "gemma-3-27b-it", // 3. Gemma 3 (27 Billion, Instruction Tuned)
    "gemini-3-flash-preview", // 1. Newest Gemini 3 (Check AI Studio for latest)
    "gemini-2.5-flash", // 2. Your current primary
    "gemma-3-12b-it", // 4. Gemma 3 (12 Billion, Instruction Tuned)
    "gemma-3-4b-it", // 5. Gemma 3 (4 Billion, Instruction Tuned)
  ];

  // 1. Define your "Source of Truth" instructions here once
  const systemPrompt = `
    You are Praful's personal assistant. 
    Use this data to answer questions: ${JSON.stringify(profileData)}.

    STRICT RULES:
    1. ONLY answer questions related to Praful's professional life, projects, skills, and education found in the DATA.
    2. If a user asks about unrelated topics (like coffee, weather, cooking, or general advice), politely say: "I'm sorry, I am only programmed to answer questions about Praful's professional background and projects."
    3. Keep responses brief and professional. 
    4. If the user greets you, greet them back warmly and ask how you can help them learn about Praful.
  `;

  for (const modelId of models) {
    try {
      const isGemma = modelId.startsWith("gemma");

      const result = streamText({
        model: google(modelId),

        // 2. Conditional Instruction Handling
        // Gemini gets the official field. Gemma gets nothing here to prevent errors.
        system: isGemma ? undefined : systemPrompt,

        // 3. Message Injection for Gemma
        // We put the instructions at the very start of the conversation for Gemma.
        messages: isGemma
          ? [
              { role: "user", content: `INSTRUCTIONS: ${systemPrompt}` },
              {
                role: "assistant",
                content: "Understood. I will follow these instructions.",
              },
              ...messages,
            ]
          : messages,

        maxRetries: 0,
      });

      // Pre-flight check
      const iterator = result.textStream[Symbol.asyncIterator]();
      await iterator.next();

      return result.toDataStreamResponse();
    } catch (error: any) {
      const errorMsg = error.message || "";
      const isQuota =
        error.status === 429 ||
        errorMsg.includes("429") ||
        errorMsg.includes("quota");

      // 3. IMPORTANT: Also catch the "Developer instruction" error specifically
      const isGemmaSystemError = errorMsg.includes("Developer instruction");

      if (isQuota || isGemmaSystemError) {
        console.warn(`⚠️ ${modelId} failed/unsupported. Trying next...`);
        continue;
      }

      console.error(`❌ Permanent error with ${modelId}:`, errorMsg);
      break;
    }
  }

  return new Response("All models exhausted.", { status: 429 });
}
