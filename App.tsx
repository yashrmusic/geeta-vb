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
    <div className="relative bg-gradient-to-br from-[#020024] via-[#090979] to-[#00d4ff] min-h-screen text-white font-sans flex flex-col items-center p-4 md:p-6 selection:bg-cyan-300 selection:text-black overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"></div>
      </div>
      
      {showProgressBar && <ProgressBar progress={progressToShow} />}
      <Header />
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center w-full px-4 md:px-8 space-y-8 max-w-7xl">
        <ChapterNavigation
          currentChapter={currentChapter}
          totalChapters={TOTAL_CHAPTERS}
          onChapterChange={handleChapterChange}
          disabled={isLoading}
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-96 space-y-6">
            <LoadingSpinner />
            <div className="text-center">
              <p className="text-gray-300 text-lg font-light tracking-wide">Summoning ancient wisdom...</p>
              <div className="mt-3 flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent border border-red-500/50 rounded-2xl p-8 backdrop-blur-sm max-w-md w-full">
            <div className="mb-4">
              <svg className="w-12 h-12 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="font-semibold text-red-300 mb-2">An Error Occurred</p>
            <p className="text-red-200/80 text-sm">{error}</p>
          </div>
        ) : viewMode === 'quote' && wisdom ? (
           <QuoteCard wisdom={wisdom} />
        ) : (
          <BookView chapter={currentChapter} onProgressUpdate={handleProgressUpdate}/>
        )}

        <div className="flex items-center gap-4 mt-6 md:mt-8">
            <button
                onClick={toggleViewMode}
                disabled={isLoading}
                className="group relative px-8 py-3 bg-gradient-to-r from-black/40 to-black/30 border border-white/20 rounded-full text-sm font-semibold text-gray-200 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden backdrop-blur-sm"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 212, 255, 0.1)'
                }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {viewMode === 'quote' ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Read Chapter
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Show Quote
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;