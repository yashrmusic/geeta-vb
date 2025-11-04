import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import QuoteCard from './components/QuoteCard';
import LoadingSpinner from './components/LoadingSpinner';
import ChapterNavigation from './components/ChapterNavigation';
import BookView from './components/BookView';
import ProgressBar from './components/ProgressBar';
import { fetchWisdomForChapter } from './services/geminiService';
import { GitaWisdom } from './types';

const TOTAL_CHAPTERS = 20;

const App: React.FC = () => {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [wisdom, setWisdom] = useState<GitaWisdom | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'quote' | 'book'>('quote');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);

  const loadWisdom = useCallback(async (chapter: number) => {
    setIsLoading(true);
    setError(null);
    setLoadingProgress(0);
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 200);

    try {
      const newWisdom = await fetchWisdomForChapter(chapter);
      setWisdom(newWisdom);
      setLoadingProgress(100);
    } catch (err) {
      setError('Failed to fetch wisdom. Please try again later.');
      console.error(err);
      setLoadingProgress(100); // complete progress bar even on error
    } finally {
      clearInterval(interval);
      setTimeout(() => {
        setIsLoading(false);
        setLoadingProgress(0); // Reset for next load
      }, 500); // Give time for fade out
    }
  }, []);

  useEffect(() => {
    loadWisdom(currentChapter);
  }, [currentChapter, loadWisdom]);

  const handleChapterChange = (chapter: number) => {
    if (chapter !== currentChapter) {
      setCurrentChapter(chapter);
    }
  };
  
  const toggleViewMode = () => {
    setViewMode(prev => prev === 'quote' ? 'book' : 'quote');
  };

  const handleProgressUpdate = useCallback((progress: number) => {
    setReadingProgress(progress);
  }, []);

  const progressToShow = isLoading ? loadingProgress : (viewMode === 'book' ? readingProgress : 0);
  const showProgressBar = isLoading || (viewMode === 'book' && !isLoading && !error);

  return (
    <div className="bg-gradient-to-br from-[#020024] via-[#090979] to-[#00d4ff] min-h-screen text-white font-sans flex flex-col items-center p-4 selection:bg-cyan-300 selection:text-black">
      {showProgressBar && <ProgressBar progress={progressToShow} />}
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center w-full px-4 md:px-8 space-y-8">
        <ChapterNavigation
          currentChapter={currentChapter}
          totalChapters={TOTAL_CHAPTERS}
          onChapterChange={handleChapterChange}
          disabled={isLoading}
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <LoadingSpinner />
            <p className="mt-4 text-gray-300">Summoning ancient wisdom...</p>
          </div>
        ) : error ? (
          <div className="text-center bg-red-500/20 border border-red-500 rounded-lg p-6">
            <p className="font-semibold">An Error Occurred</p>
            <p>{error}</p>
          </div>
        ) : viewMode === 'quote' && wisdom ? (
           <QuoteCard wisdom={wisdom} />
        ) : (
          <BookView chapter={currentChapter} onProgressUpdate={handleProgressUpdate}/>
        )}

        <div className="flex items-center gap-4 mt-4">
            <button
                onClick={toggleViewMode}
                disabled={isLoading}
                className="px-6 py-2 bg-black/20 border border-white/20 rounded-full text-sm font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50"
            >
                {viewMode === 'quote' ? 'Read Chapter' : 'Show Quote'}
            </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;