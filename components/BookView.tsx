import React, { useState, useEffect, useMemo } from 'react';
import { Chapter, Verse } from '../types';
import { fetchChapterContent } from '../services/geminiService';
import VerseDisplay from './VerseDisplay';
import LoadingSpinner from './LoadingSpinner';
import PodcastEmbeds from './PodcastEmbeds';
import ShareButton from './ShareButton';
import ChapterPreview from './ChapterPreview';
import AudioMode from './AudioMode';

interface BookViewProps {
  chapter: number;
  onProgressUpdate: (progress: number) => void;
}

const VERSES_PER_PAGE = 3;

const BookView: React.FC<BookViewProps> = ({ chapter, onProgressUpdate }) => {
  const [chapterData, setChapterData] = useState<Chapter | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadChapter = async () => {
      setIsLoading(true);
      setError(null);
      setChapterData(null);
      setCurrentPage(1); // Reset to first page
      try {
        const data = await fetchChapterContent(chapter);
        setChapterData(data);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred.');
        }
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadChapter();
  }, [chapter]);

  const { totalPages, currentVerses } = useMemo(() => {
    if (!chapterData?.verses) {
      return { totalPages: 0, currentVerses: [] };
    }
    const total = Math.ceil(chapterData.verses.length / VERSES_PER_PAGE);
    const start = (currentPage - 1) * VERSES_PER_PAGE;
    const end = start + VERSES_PER_PAGE;
    const verses = chapterData.verses.slice(start, end);
    return { totalPages: total, currentVerses: verses };
  }, [chapterData, currentPage]);
  
  useEffect(() => {
    if (totalPages > 0) {
      onProgressUpdate(totalPages === 1 ? 100 : (currentPage / totalPages) * 100);
    } else {
       onProgressUpdate(0);
    }
  }, [currentPage, totalPages, onProgressUpdate]);


  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-2xl border border-amber-500/20 rounded-3xl p-8 md:p-12 shadow-2xl w-full max-w-4xl min-h-[60vh] flex flex-col">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center flex-grow">
          <LoadingSpinner />
          <p className="mt-4 text-gray-300">Loading chapter content...</p>
        </div>
      ) : error ? (
        <div className="text-center bg-red-500/20 border border-red-500 rounded-lg p-6 m-auto">
          <p className="font-semibold">Could not load chapter</p>
          <p>{error}</p>
        </div>
      ) : chapterData ? (
        <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-light text-white mb-2">Chapter {chapterData.chapter_number}</h2>
                    <p className="text-amber-200/80 text-lg font-light">{chapterData.title}</p>
                </div>
                <ShareButton title={`Chapter ${chapterData.chapter_number}: ${chapterData.title}`} />
            </div>
             <p className="text-amber-100/70 italic text-base mb-6 leading-relaxed">{chapterData.summary}</p>
             <div className="h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent mb-6"></div>
             
             <ChapterPreview chapterNumber={chapterData.chapter_number} chapterTitle={chapterData.title} />
             
             <AudioMode chapterNumber={chapterData.chapter_number} chapterTitle={chapterData.title} />
             
             <div className="h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent mb-6"></div>

            <div className="space-y-6 flex-grow">
                {currentVerses.map((verse) => (
                    <VerseDisplay key={verse.verse_number} verse={verse} chapterNumber={chapterData.chapter_number} />
                ))}
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-amber-500/20">
                <button onClick={goToPrevPage} disabled={currentPage === 1} className="px-6 py-2.5 bg-amber-950/30 border border-amber-500/20 rounded-lg text-sm font-light text-amber-200/80 hover:text-amber-100 hover:border-amber-400/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300">Previous</button>
                <span className="text-sm text-amber-200/60 font-light tracking-wide">Page {currentPage} of {totalPages}</span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages} className="px-6 py-2.5 bg-amber-950/30 border border-amber-500/20 rounded-lg text-sm font-light text-amber-200/80 hover:text-amber-100 hover:border-amber-400/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300">Next</button>
            </div>
            
            <div className="h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent my-8"></div>
            <PodcastEmbeds currentChapter={chapter} />
        </div>
      ) : null}
    </div>
  );
};

export default BookView;