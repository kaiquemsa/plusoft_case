import { GoogleGenerativeAI }  from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export default class GeminiAIController {
  async handle(request, response) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});

      const prompt = request.body.prompt;
    
      const result = await model.generateContent(prompt);

      const content = await result.response.text();

      response.json({ message: content });
    } catch (error) {
      response.status(400).json({ error: error?.message });
    }
  }
}

