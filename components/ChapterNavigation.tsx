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
    <div className="w-full max-w-md mx-auto">
      <label htmlFor="chapter-select" className="block text-sm font-medium text-gray-300 mb-3 text-center tracking-wide">
        <span className="text-gray-400">Chapter</span>
        <span className="mx-2 text-cyan-400 font-semibold">{currentChapter}</span>
        <span className="text-gray-400">of {totalChapters}</span>
      </label>
      <div className="relative">
        <select
          id="chapter-select"
          value={currentChapter}
          onChange={(e) => onChapterChange(Number(e.target.value))}
          disabled={disabled}
          className="block w-full pl-5 pr-12 py-3.5 text-base border border-white/20 bg-black/50 text-white
                    focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 sm:text-sm rounded-xl
                    backdrop-blur-xl appearance-none transition-all hover:bg-black/60 hover:border-white/30
                    disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          style={{
            boxShadow: '0 4px 20px rgba(0, 212, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {chapters.map((chapterNum) => (
            <option key={chapterNum} value={chapterNum} className="bg-gray-900 text-white">
              Chapter {chapterNum}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-cyan-400">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChapterNavigation;
