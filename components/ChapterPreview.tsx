import React, { useState, useEffect } from 'react';
import { fetchChapterPreview } from '../services/geminiService';

interface ChapterPreviewProps {
  chapterNumber: number;
  chapterTitle: string;
}

const ChapterPreview: React.FC<ChapterPreviewProps> = ({ chapterNumber, chapterTitle }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadPreview = async () => {
      // Check cache first
      const cacheKey = `preview-${chapterNumber}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        setPreview(cached);
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const previewText = await fetchChapterPreview(chapterNumber);
        setPreview(previewText);
        // Cache the result
        localStorage.setItem(cacheKey, previewText);
      } catch (error) {
        console.error('Error loading preview:', error);
        setPreview(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadPreview();
  }, [chapterNumber]);

  if (isLoading) {
    return (
      <div className="mb-8 p-6 bg-gradient-to-br from-amber-950/30 via-amber-900/20 to-transparent border border-amber-500/20 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-0.5 h-6 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
          <div className="flex-1">
            <h3 className="text-amber-200/90 text-sm font-light tracking-wide uppercase mb-2">Chapter Preview</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-400/60 rounded-full animate-pulse"></div>
              <span className="text-amber-200/60 text-xs">Loading preview...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!preview) return null;

  return (
    <div className="mb-8 p-6 bg-gradient-to-br from-amber-950/30 via-amber-900/20 to-transparent border border-amber-500/20 rounded-xl">
      <div className="flex items-start gap-3">
        <div className="w-0.5 h-full min-h-[60px] bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
        <div className="flex-1">
          <h3 className="text-amber-200/90 text-sm font-light tracking-wide uppercase mb-3">Chapter Preview</h3>
          <p className="text-amber-50/80 text-sm leading-relaxed font-light">{preview}</p>
        </div>
      </div>
    </div>
  );
};

export default ChapterPreview;

