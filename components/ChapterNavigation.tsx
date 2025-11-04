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
      <label htmlFor="chapter-select" className="block text-xs font-light text-amber-200/50 mb-4 text-center tracking-[0.2em] uppercase">
        <span className="text-amber-200/40">Chapter</span>
        <span className="mx-3 text-amber-400/80 font-light text-base">{currentChapter}</span>
        <span className="text-amber-200/40">of {totalChapters}</span>
      </label>
      <div className="relative">
        <select
          id="chapter-select"
          value={currentChapter}
          onChange={(e) => onChapterChange(Number(e.target.value))}
          disabled={disabled}
          className="block w-full pl-6 pr-12 py-4 text-base border border-amber-500/20 bg-slate-900/50 text-amber-50/90
                    focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400/40 sm:text-sm rounded-2xl
                    backdrop-blur-xl appearance-none transition-all duration-300 hover:bg-slate-900/70 hover:border-amber-400/30
                    disabled:opacity-40 disabled:cursor-not-allowed shadow-xl font-light tracking-wide"
          style={{
            boxShadow: '0 4px 20px rgba(251, 191, 36, 0.08), inset 0 1px 0 rgba(251, 191, 36, 0.1)'
          }}
        >
          {chapters.map((chapterNum) => (
            <option key={chapterNum} value={chapterNum} className="bg-slate-900 text-amber-50">
              Chapter {chapterNum}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-amber-400/60">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChapterNavigation;
