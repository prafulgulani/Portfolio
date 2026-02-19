import { createGoogleGenerativeAI } from '@ai-sdk/google'; // Changed import
import { streamText } from 'ai';
import profileData from '../../data/profile.json';

// 1. Manually initialize the Google provider with your key
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATED_AI_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
    model: google('gemini-2.5-flash'), 
    system: `You are Praful's assistant. Data: ${JSON.stringify(profileData)}`,
    messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}