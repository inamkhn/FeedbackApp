import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function GET(req: Request) {
    try {
        // Add a random element to the prompt to encourage varied responses
        const randomSeed = Math.random().toString(36).substring(2, 15);
        const prompt = `Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment. Add a touch of randomness or variety to the questions, perhaps influenced by this seed: ${randomSeed}.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        return Response.json(
            { text, message: "success" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        Response.json(
            { success: false, message: "error occurred" },
            { status: 500 }
        );
    }
}
