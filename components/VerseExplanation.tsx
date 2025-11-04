import React, { useState } from 'react';
import { Verse } from '../types';
import { fetchVerseExplanation } from '../services/geminiService';

interface VerseExplanationProps {
  verse: Verse;
  chapterNumber: number;
}

const VerseExplanation: React.FC<VerseExplanationProps> = ({ verse, chapterNumber }) => {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExplain = async () => {
    if (explanation) {
      setIsExpanded(!isExpanded);
      return;
    }

    setIsLoading(true);
    try {
      const exp = await fetchVerseExplanation(verse, chapterNumber);
      setExplanation(exp);
      setIsExpanded(true);
    } catch (error) {
      console.error('Error fetching explanation:', error);
      setExplanation('Unable to generate explanation at this time.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleExplain}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-950/30 to-amber-900/20 border border-amber-500/20 rounded-lg text-sm text-amber-200/80 hover:text-amber-100 hover:border-amber-400/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>{isExpanded ? 'Hide' : 'AI'} Explanation</span>
          </>
        )}
      </button>
      
      {isExpanded && explanation && (
        <div className="mt-3 p-4 bg-gradient-to-br from-amber-950/40 via-amber-900/20 to-transparent border border-amber-500/20 rounded-lg">
          <div className="flex items-start gap-2 mb-2">
            <div className="w-0.5 h-5 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
            <h5 className="text-amber-200/90 text-sm font-light tracking-wide uppercase">Insight</h5>
          </div>
          <p className="text-amber-50/80 text-sm leading-relaxed font-light pl-3">{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default VerseExplanation;

