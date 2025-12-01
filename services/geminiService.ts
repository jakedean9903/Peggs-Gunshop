import { GoogleGenAI, Type } from "@google/genai";
import { AspectRatio, ImageSize } from "../types";

// Helper to get API key (env or user provided)
const getAiClient = (customKey?: string) => {
  const key = customKey || process.env.API_KEY;
  if (!key) {
    throw new Error("API Key is missing.");
  }
  return new GoogleGenAI({ apiKey: key });
};

// --- Chatbot with Grounding ---
export const sendMessageToGemini = async (
  history: { role: string; parts: { text: string }[] }[],
  newMessage: string,
  useGrounding: boolean = true
) => {
  const ai = getAiClient();
  
  // Choose model based on task complexity. 
  // Using gemini-3-pro-preview for advanced reasoning in chat.
  // Using gemini-2.5-flash if we strictly wanted fast grounding, but 3-pro can handle tools too.
  // Per instructions: "Use gemini-2.5-flash (with googleSearch tool)" for search grounding explicitly.
  // But "Use gemini-3-pro-preview" for chatbot.
  // We will mix based on intent, but for a general chatbot that *might* need grounding, 
  // we will use gemini-3-pro-preview which is capable, or strictly follow the grounding instruction which says use 2.5-flash.
  
  // Strategy: Default to 2.5-flash for grounding queries (news/laws) to strictly follow that instruction,
  // but use 3-pro-preview for general chat if grounding isn't explicitly triggered. 
  // For simplicity and compliance with "Use gemini-2.5-flash (with googleSearch tool)" instruction:
  
  const modelName = useGrounding ? 'gemini-2.5-flash' : 'gemini-3-pro-preview';
  
  const tools = [];
  if (useGrounding) {
    // Adding both search and maps as potential tools
    tools.push({ googleSearch: {} });
    tools.push({ googleMaps: {} });
  }

  const systemInstruction = `You are the AI assistant for Peggs Gun Shop in Walkertown, NC. 
  Your tone is helpful, conservative, safety-conscious, and respectful. 
  Do not discuss politics. Focus on firearm safety, responsible ownership, and product information.
  If asked about laws, use the Search tool to find the most current North Carolina and Federal firearm laws.
  If asked about location/directions, use the Maps tool.
  Business Address: 3053 Old Hollow Road, Walkertown, NC.
  Phone: (336) 772-1789.
  Email: Peggsgunshop@yahoo.com.
  ALWAYS emphasize that we follow all state and federal laws including background checks.`;

  const response = await ai.models.generateContent({
    model: modelName,
    contents: [
      ...history.map(h => ({ role: h.role, parts: h.parts })),
      { role: 'user', parts: [{ text: newMessage }] }
    ],
    config: {
      systemInstruction,
      tools: tools.length > 0 ? tools : undefined,
    }
  });

  return response;
};

// --- Image Analysis (Trade-In Estimator) ---
export const analyzeGunImage = async (base64Image: string, prompt: string) => {
  const ai = getAiClient();
  // Instruction: "Use gemini-3-pro-preview" for image understanding
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg', // Assuming jpeg for simplicity from canvas/input
            data: base64Image
          }
        },
        { text: `You are an expert gunsmith at Peggs Gun Shop. Analyze this image. ${prompt}. Keep it professional and emphasize safety.` }
      ]
    }
  });

  return response.text;
};

// --- Image Generation (Custom Holster/Engraving Preview) ---
export const generateCustomImage = async (
  prompt: string, 
  aspectRatio: AspectRatio, 
  imageSize: ImageSize,
  apiKey: string // User MUST provide key for this feature
) => {
  const ai = getAiClient(apiKey);
  // Instruction: "Use gemini-3-pro-image-preview"
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: aspectRatio,
        imageSize: imageSize
      }
    }
  });

  // Extract image
  const parts = response.candidates?.[0]?.content?.parts;
  if (parts) {
    for (const part of parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }
  return null;
};
