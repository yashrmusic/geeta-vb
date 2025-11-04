import React, { useState, useEffect, useMemo } from 'react';
import { Chapter, Verse } from '../types';
import { fetchChapterContent } from '../services/geminiService';
import VerseDisplay from './VerseDisplay';
import LoadingSpinner from './LoadingSpinner';
import PodcastEmbeds from './PodcastEmbeds';
import ShareButton from './ShareButton';

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
    <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl w-full max-w-4xl min-h-[60vh] flex flex-col">
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
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Chapter {chapterData.chapter_number}</h2>
                    <p className="text-cyan-300">{chapterData.title}</p>
                </div>
                <ShareButton title={`Chapter ${chapterData.chapter_number}: ${chapterData.title}`} />
            </div>
             <p className="text-gray-300 italic text-sm mb-6">{chapterData.summary}</p>
             <hr className="border-t border-gray-500/50 my-4" />

            <div className="space-y-6 flex-grow">
                {currentVerses.map((verse) => (
                    <VerseDisplay key={verse.verse_number} verse={verse} />
                ))}
            </div>

            <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/10">
                <button onClick={goToPrevPage} disabled={currentPage === 1} className="px-4 py-2 bg-black/20 rounded-md text-sm hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Previous</button>
                <span className="text-sm text-gray-400">Page {currentPage} of {totalPages}</span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-black/20 rounded-md text-sm hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Next</button>
            </div>
            
            <hr className="border-t border-gray-500/50 my-8" />
            <PodcastEmbeds currentChapter={chapter} />
        </div>
      ) : null}
    </div>
  );
};

export default BookView;