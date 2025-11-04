// Define and export the data structures for GitaWisdom, Chapter, and Verse.
export interface GitaWisdom {
    quote: string;
    explanation: string;
}

export interface Verse {
    verse_number: number;
    sanskrit: string;
    translation: string;
}

export interface Chapter {
    chapter_number: number;
    title: string;
    summary: string;
    verses: Verse[];
}
