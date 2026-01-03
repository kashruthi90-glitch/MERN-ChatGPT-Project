const GenAi = require("@google/genai");

async function geminiGenerateContent(prompt) {
  const ai = new GenAi.GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
}

async function geminiGenerateImage(prompt) {
  const ai = new GenAi.GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: prompt,
  });
  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const base64Image = Buffer.from(imageData, "base64");
      // res.status(200).json({
      //   image: `data:image/png;base64,${base64Image}`
      // });
      return base64Image;
    }
  }
}

module.exports = {
  geminiGenerateContent,
  geminiGenerateImage
};