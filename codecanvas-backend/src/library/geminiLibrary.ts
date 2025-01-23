const { GoogleGenerativeAI } = require("@google/generative-ai");

export class geminiLibrary {
    constructor() {

    }

    async generateCode(prompt: string) {

        let secret_key = process.env.GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(secret_key);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        let new_prompt: string = `Generate separate HTML, CSS, and JavaScript code based on the following prompt: ${prompt}. Ensure that: Ensure the following: Every HTML element must have a unique class or ID. Do not apply CSS directly to tags like body, header, nav, or others. CSS must exclusively use these unique classes or IDs to style elements, avoiding generic tag-based selectors entirely. The HTML should be semantic, well-structured, and follow best practices for accessibility and readability. JavaScript must be modular and provide interactivity or functionality as described in the prompt. Label the output clearly as HTML, CSS, and JavaScript, ensuring the code is clean, modular, and adheres to the guidelines. Generate CSS for the following HTML structure, ensuring that styles are applied using classes and IDs assigned to each element. Avoid directly styling HTML tags like 'body', 'header', 'nav', etc.CSS Guidelines: Use a consistent naming convention for classes (e.g., 'page-header', 'section-title'). Consider using a CSS preprocessor (like Sass or Less) for better organization and maintainability. Ensure the CSS is well-formatted and easy to read.`
        console.log('new_prompt: ', new_prompt);

        const result = await model.generateContent(prompt);
        console.log('result: ', result);

        // let result = {
        //     response: {
        //         "candidates": [
        //             {
        //                 "content": {
        //                     "parts": [
        //                         {
        //                             "text": "This code provides a dark-themed header with a logo, login, and register buttons.  It uses HTML for structure, CSS for styling, and a placeholder for the logo image.  You'll need to replace `\"your-logo.png\"` with the actual path to your logo image.\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n<title>Dark Theme Header</title>\n<style>\nbody {\n  background-color: #222; /* Dark background */\n  color: #eee; /* Light text color */\n  font-family: sans-serif;\n}\n\nheader {\n  background-color: #333; /* Slightly lighter dark gray for header */\n  padding: 10px 20px;\n  display: flex;\n  justify-content: space-between; /* Distribute elements evenly */\n  align-items: center; /* Vertically align items */\n}\n\n.logo {\n  height: 40px;\n}\n\n.logo img {\n  max-height: 100%;\n  max-width: 100%;\n}\n\nbutton {\n  background-color: #555;\n  color: #eee;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: background-color 0.3s ease; /* Smooth transition on hover */\n}\n\nbutton:hover {\n  background-color: #777;\n}\n</style>\n</head>\n<body>\n\n<header>\n  <div class=\"logo\">\n    <img src=\"your-logo.png\" alt=\"Your Logo\">\n  </div>\n  <div>\n    <button>Login</button>\n    <button>Register</button>\n  </div>\n</header>\n\n</body>\n</html>\n```\n\nTo use this code:\n\n1. **Save the code:** Save this code as an HTML file (e.g., `header.html`).\n2. **Replace placeholder:**  Change `\"your-logo.png\"` to the correct path to your logo image.  Make sure the image is in the same directory as the HTML file, or adjust the path accordingly.\n3. **Open in browser:** Open the `header.html` file in your web browser to see the dark-themed header.\n\n\nThis is a basic example. You can customize it further by adding more styling, responsiveness (for different screen sizes), and JavaScript for more interactive features.  For example, you could add JavaScript to handle the login/register actions.\n"
        //                         }
        //                     ],
        //                     "role": "model"
        //                 },
        //                 "finishReason": "STOP",
        //                 "citationMetadata": {
        //                     "citationSources": [
        //                         {
        //                             "startIndex": 825,
        //                             "endIndex": 984,
        //                             "uri": "https://github.com/Apoorva-Kamat/Fproject"
        //                         },
        //                         {
        //                             "startIndex": 863,
        //                             "endIndex": 1013,
        //                             "uri": "https://github.com/anushka-jha/assignment"
        //                         }
        //                     ]
        //                 },
        //                 "avgLogprobs": -0.0706981691539797
        //             }
        //         ],
        //         "usageMetadata": {
        //             "promptTokenCount": 22,
        //             "candidatesTokenCount": 585,
        //             "totalTokenCount": 607
        //         },
        //         "modelVersion": "gemini-1.5-flash"
        //     }
        // }

        return result;
    }
}