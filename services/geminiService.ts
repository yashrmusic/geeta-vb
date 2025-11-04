import { GoogleGenAI, Type } from "@google/genai";
import { GitaWisdom, Chapter } from '../types';

// Per instructions, API key must come from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const wisdomSchema = {
    type: Type.OBJECT,
    properties: {
        quote: {
            type: Type.STRING,
            description: "A profound and insightful quote from the Ashtavakra Gita chapter, in English."
        },
        explanation: {
            type: Type.STRING,
            description: "A simple, modern explanation of the quote's meaning and relevance."
        }
    },
    required: ["quote", "explanation"],
};

const chapterSchema = {
    type: Type.OBJECT,
    properties: {
        chapter_number: { type: Type.INTEGER },
        title: { type: Type.STRING },
        summary: { type: Type.STRING },
        verses: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    verse_number: { type: Type.INTEGER },
                    sanskrit: { type: Type.STRING, description: "The verse in Sanskrit (Devanagari script)." },
                    translation: { type: Type.STRING, description: "The English translation of the verse." }
                },
                required: ["verse_number", "sanskrit", "translation"]
            }
        }
    },
    required: ["chapter_number", "title", "summary", "verses"]
};


export const fetchWisdomForChapter = async (chapter: number): Promise<GitaWisdom> => {
    try {
        const prompt = `Generate a single profound quote and a modern explanation from Chapter ${chapter} of the Ashtavakra Gita. Focus on a key theme of the chapter.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", // Using gemini-2.5-flash for this task
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: wisdomSchema,
                temperature: 0.7,
            },
        });

        const jsonText = response.text.trim();
        const wisdom: GitaWisdom = JSON.parse(jsonText);
        return wisdom;
    } catch (error) {
        console.error("Error fetching wisdom from Gemini API:", error);
        // Fallback in case of API error
        return {
            quote: "The Self is the witness, all-pervading, perfect, one, free, conscious, actionless, unattached, desireless, and quiet.",
            explanation: "This quote encapsulates the core teaching of non-duality. It points to your true nature as pure awareness, untouched by the transient world of thoughts, feelings, and actions. Realizing this brings ultimate peace and freedom."
        };
    }
};

export const fetchChapterContent = async (chapter: number): Promise<Chapter> => {
    try {
        const prompt = `Provide the full content for Chapter ${chapter} of the Ashtavakra Gita. Include the chapter number, title, a brief summary, and a complete list of all verses. It is crucial that the 'verses' array in the JSON output contains EVERY SINGLE verse from the chapter, not just one or a sample. For each verse, include its verse number, original Sanskrit (in Devanagari script), and an English translation.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro", // Using pro for more complex, structured data
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: chapterSchema,
            },
        });

        const jsonText = response.text.trim();
        const chapterContent: Chapter = JSON.parse(jsonText);
        return chapterContent;
    } catch (error) {
        console.error(`Error fetching content for chapter ${chapter}:`, error);
        throw new Error(`Failed to load Chapter ${chapter}. Please try again.`);
    }
};