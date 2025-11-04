import React from 'react';

interface ChapterNavigationProps {
  currentChapter: number;
  totalChapters: number;
  onChapterChange: (chapter: number) => void;
  disabled: boolean;
}

const ChapterNavigation: React.FC<ChapterNavigationProps> = ({
  currentChapter,
  totalChapters,
  onChapterChange,
  disabled,
}) => {
  const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-sm mx-auto">
      <label htmlFor="chapter-select" className="block text-sm font-medium text-gray-300 mb-2 text-center">
        Select a Chapter
      </label>
      <div className="relative">
        <select
          id="chapter-select"
          value={currentChapter}
          onChange={(e) => onChapterChange(Number(e.target.value))}
          disabled={disabled}
          className="block w-full pl-4 pr-10 py-2.5 text-base border-gray-500/50 bg-black/40 text-white
                    focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-lg
                    backdrop-blur-md appearance-none transition-all"
        >
          {chapters.map((chapterNum) => (
            <option key={chapterNum} value={chapterNum} className="bg-gray-800 text-white">
              Chapter {chapterNum}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChapterNavigation;
