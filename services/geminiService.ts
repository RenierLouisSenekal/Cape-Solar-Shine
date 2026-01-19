
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are 'SolarBot', the AI Assistant for Cape-SolarShine, a professional solar panel cleaning company. Note: We do NOT clean windows.
      
      Company Info:
      - Name: Cape-SolarShine
      - Tagline: Sparkling Solar, Endless Energy.
      - Contact: 084 826 3153 | jaco@cape-solarshine.co.za
      - Offer: First clean discount code "H2Oclean".
      
      Key Services & Benefits:
      - We specialize exclusively in solar panel maintenance.
      - We use purified de-ionised water (Eco-friendly, no chemicals, no residue, safe for anti-reflective coatings).
      - Benefits: Increased efficiency (more sunlight = more energy), Extended lifespan, Cost-effective, System health check included.
      - Residential & Commercial services.
      - We use specialized professional equipment.
      
      FAQ Knowledge:
      - Rainwater is NOT enough. It doesn't clean effectively.
      - De-ionised water prevents streaks and spots.
      - DIY cleaning voids warranty and is dangerous; we have safety gear.
      - Important: We do not offer window cleaning services.
      
      Tone: Professional, Eco-conscious, Helpful, Efficient. Use emojis like ☀️, 💧, 🌱, 🔋.
      Keep responses short (under 50 words) and helpful.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Solar systems offline. (Missing API Key)";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Connection cloudy.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sunlight blocked. Try again later.";
  }
};
