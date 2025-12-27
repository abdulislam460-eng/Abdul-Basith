
import { GoogleGenAI, Type } from "@google/genai";
import { PortfolioData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const portfolioSchema = {
  type: Type.OBJECT,
  properties: {
    fullName: { type: Type.STRING },
    tagline: { type: Type.STRING, description: "A catchy one-line headline about the person's expertise" },
    about: { type: Type.STRING, description: "A professional summary or about section" },
    email: { type: Type.STRING },
    location: { type: Type.STRING },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          company: { type: Type.STRING },
          role: { type: Type.STRING },
          duration: { type: Type.STRING },
          description: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["company", "role", "duration", "description"]
      }
    },
    skills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          level: { type: Type.NUMBER, description: "Skill level from 0-100 based on experience" },
          category: { type: Type.STRING, enum: ['Frontend', 'Backend', 'Design', 'DevOps', 'Tools', 'Other'] }
        },
        required: ["name", "level", "category"]
      }
    },
    projects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          techStack: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["title", "description", "techStack"]
      }
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          institution: { type: Type.STRING },
          degree: { type: Type.STRING },
          year: { type: Type.STRING }
        },
        required: ["institution", "degree", "year"]
      }
    }
  },
  required: ["fullName", "tagline", "about", "experience", "skills", "projects", "education"]
};

export async function extractPortfolioFromDocument(
  fileData: string,
  mimeType: string
): Promise<PortfolioData> {
  const prompt = `Extract all professional information from this resume/CV document and format it strictly into the requested JSON structure. If any fields are missing, make a best-guess based on context or leave them as professional placeholders. Ensure the tagline is inspiring.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        parts: [
          { inlineData: { data: fileData.split(',')[1], mimeType } },
          { text: prompt }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: portfolioSchema,
    }
  });

  return JSON.parse(response.text) as PortfolioData;
}

export async function extractPortfolioFromText(text: string): Promise<PortfolioData> {
  const prompt = `Extract all professional information from the following text and format it strictly into the requested JSON structure:\n\n${text}`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: portfolioSchema,
    }
  });

  return JSON.parse(response.text) as PortfolioData;
}
