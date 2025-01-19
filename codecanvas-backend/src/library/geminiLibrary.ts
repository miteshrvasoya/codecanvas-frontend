const { GoogleGenerativeAI } = require("@google/generative-ai");

export class geminiLibrary {
    constructor() {

    }

    async generateCode(prompt: string) {

        let secret_key = process.env.GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(secret_key);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);

        return result;
    }
}