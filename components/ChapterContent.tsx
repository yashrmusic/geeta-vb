import React from 'react';
import { Chapter } from '../types';
import VerseDisplay from './VerseDisplay';

interface ChapterContentProps {
  chapterData: Chapter;
}

const ChapterContent: React.FC<ChapterContentProps> = ({ chapterData }) => {
  if (!chapterData) {
    return null;
  }
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-cyan-300 mb-2">{chapterData.title}</h2>
        <p className="text-gray-300 italic">{chapterData.summary}</p>
      </div>
      <hr className="border-t border-gray-500/50" />
      <div className="space-y-6">
        {chapterData.verses.map((verse) => (
          <VerseDisplay key={verse.verse_number} verse={verse} />
        ))}
      </div>
    </div>
  );
};

export default ChapterContent;
