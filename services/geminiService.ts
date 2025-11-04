import { GoogleGenAI, Type } from "@google/genai";
import { GitaWisdom, Chapter } from '../types';

// Per instructions, API key must come from process.env.API_KEY
const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Mock data for when API key is not available
const mockWisdom: Record<number, GitaWisdom> = {
    1: {
        quote: "If you wish to be free, know you are the Self, the witness of all these, and be happy.",
        explanation: "This foundational teaching reminds us that true freedom comes from recognizing our essential nature as the witness, the pure awareness that observes all experiences without being affected by them."
    },
    2: {
        quote: "You are not bound by anything. What does a person free from desire want? A knowledge of the truth about themselves.",
        explanation: "The illusion of bondage exists only in the mind. When you realize your true nature, you see that you were never actually bound - you are already free, and the only thing needed is to recognize this truth."
    },
    3: {
        quote: "The Self is pure consciousness, the witness of all things. It is always free, always at peace, always complete.",
        explanation: "Your true Self is not something you need to create or achieve - it's what you already are. This awareness is always present, untouched by the changing world around you."
    },
    4: {
        quote: "You are already what you are seeking. Be content with what you are, and be happy.",
        explanation: "The search for happiness and fulfillment ends when you realize you are already complete. There's nothing to attain - only to recognize what you already are."
    },
    5: {
        quote: "Abide in the Self, the witness of all experiences. In this way, you will be free from all suffering.",
        explanation: "By resting in your true nature as the witness, you transcend all the ups and downs of life. Suffering only exists when you identify with the temporary experiences rather than the eternal witness."
    }
};

const getMockWisdom = (chapter: number): GitaWisdom => {
    return mockWisdom[chapter] || mockWisdom[1];
};

const getMockChapter = (chapter: number): Chapter => {
    // Different summaries for each chapter to show variety
    const summaries: Record<number, string> = {
        1: "The nature of the Self and the path to liberation through self-knowledge.",
        2: "The dissolution of attachment and the realization of freedom from all bonds.",
        3: "The understanding that the Self is beyond all dualities and distinctions.",
        4: "The recognition that seeking is unnecessary - you are already what you seek.",
        5: "The practice of abiding in the witness consciousness and transcending suffering.",
    };
    
    return {
        chapter_number: chapter,
        title: `Chapter ${chapter}: On the Nature of the Self`,
        summary: summaries[chapter] || `A profound teaching from Chapter ${chapter} of the Ashtavakra Gita on the nature of the Self and reality.`,
        verses: [
            {
                verse_number: 1,
                sanskrit: chapter === 1 ? "यदि मुक्तिमिच्छसि तात विषयेष्वसङ्गभावं भज" : "अहं ब्रह्मास्मि",
                translation: chapter === 1 
                    ? "If you wish to be free, my child, cultivate detachment from the objects of sense." 
                    : "I am Brahman - the ultimate reality."
            },
            {
                verse_number: 2,
                sanskrit: chapter === 2 ? "न त्वं देहो न देहस्त्वं नाहं कर्म न मे कर्म" : "तत्त्वमसि",
                translation: chapter === 2
                    ? "You are not the body, nor is the body yours. Neither are you the doer nor is action yours."
                    : "That thou art - you are that ultimate reality."
            },
            {
                verse_number: 3,
                sanskrit: "अयमात्मा ब्रह्म",
                translation: "This Self is Brahman - your true nature is the absolute."
            },
            {
                verse_number: 4,
                sanskrit: "स्वयं ज्योतिः स्वयं शान्तः",
                translation: "The Self is its own light, its own peace."
            },
            {
                verse_number: 5,
                sanskrit: "एकोऽहं सर्वदा मुक्तः",
                translation: "I am one, always free, without any conditions."
            }
        ]
    };
};

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
    // Use mock data if no API key is available
    if (!ai) {
        // Simulate a small delay for realism
        await new Promise(resolve => setTimeout(resolve, 800));
        return getMockWisdom(chapter);
    }
    
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
        // Fallback to mock data in case of API error
        return getMockWisdom(chapter);
    }
};

export const fetchChapterContent = async (chapter: number): Promise<Chapter> => {
    // Use mock data if no API key is available
    if (!ai) {
        // Simulate a small delay for realism
        await new Promise(resolve => setTimeout(resolve, 800));
        return getMockChapter(chapter);
    }
    
    try {
        const prompt = `You are providing the COMPLETE and ACCURATE text of Chapter ${chapter} of the Ashtavakra Gita (Ashtavakra Samhita). 

CRITICAL REQUIREMENTS - READ CAREFULLY:
1. You MUST provide EVERY SINGLE VERSE from Chapter ${chapter} - this is the most important requirement. The Ashtavakra Gita has multiple verses per chapter, typically 10-20 verses. Do NOT provide just 1-3 verses as a sample. Provide ALL verses.

2. Each verse must include:
   - verse_number: Sequential number (1, 2, 3, 4, 5... continuing for ALL verses in the chapter)
   - sanskrit: The original Sanskrit text in Devanagari script (e.g., "यदि मुक्तिमिच्छसि तात विषयेष्वसङ्गभावं भज")
   - translation: Accurate English translation

3. The chapter structure:
   - chapter_number: ${chapter}
   - title: The actual chapter title from Ashtavakra Gita (e.g., "Chapter 1: On the Nature of the Self" or the Sanskrit title)
   - summary: A brief summary of what this SPECIFIC chapter teaches (different from other chapters)

4. DO NOT:
   - Return only 1-3 verses as examples
   - Skip verses or have gaps in verse numbers
   - Use generic placeholder text
   - Return the same content for different chapters

5. The Ashtavakra Gita has 20 chapters. Each chapter has its own unique content and verses. Chapter ${chapter} has its own specific teachings that are different from other chapters.

Please provide the COMPLETE Chapter ${chapter} with ALL its verses from the original Ashtavakra Gita text. If you're unsure of the exact number of verses, provide at least 10-15 verses, ensuring they are accurate to the actual Ashtavakra Gita text.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro", // Using pro for more complex, structured data
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: chapterSchema,
                temperature: 0.3, // Lower temperature for more accurate, consistent content
            },
        });

        const jsonText = response.text.trim();
        const chapterContent: Chapter = JSON.parse(jsonText);
        
        // Validate that we got actual content
        if (!chapterContent.verses || chapterContent.verses.length === 0) {
            throw new Error(`No verses returned for chapter ${chapter}`);
        }
        
        return chapterContent;
    } catch (error) {
        console.error(`Error fetching content for chapter ${chapter}:`, error);
        // Fallback to mock data in case of API error
        return getMockChapter(chapter);
    }
};