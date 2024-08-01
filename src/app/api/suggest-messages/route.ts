// import { openai } from '@ai-sdk/openai';
// import { StreamingTextResponse, streamText, StreamData } from 'ai';
// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;
// export async function POST(req: Request) {
//   const { messages } = await req.json();
//   const result = await streamText({
//     model: openai('gpt-4-turbo'),
//     messages,
//   });
//   const data = new StreamData();
//   data.append({ test: 'value' });
//   const stream = result.toAIStream({
//     onFinal(_) {
//       data.close();
//     },
//   });
//   return new StreamingTextResponse(stream, {}, data);
// }
import { GoogleGenerativeAI } from "@google/generative-ai"

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const prompt = "Write a story about an AI and magic"
        
        const result = await model.generateContent(messages);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        return Response.json(
          { text, message: "success" },
          { status: 200 }
        );
    } catch (error) {
        console.log(error)
        Response.json(
            { success:false, message: "error occurred" },
            { status: 500 }
          );
    }

}