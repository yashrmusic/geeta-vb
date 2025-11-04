import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';
import QuoteCard from './QuoteCard';
import LoadingSpinner from './LoadingSpinner';
import ChapterNavigation from './ChapterNavigation';
import BookView from './BookView';
import ProgressBar from './ProgressBar';
import { fetchWisdomForChapter } from '../services/geminiService';
import { GitaWisdom } from '../types';

interface GitaExperienceProps {
  onBackToHome: () => void;
}

const TOTAL_CHAPTERS = 20;

const GitaExperience: React.FC<GitaExperienceProps> = ({ onBackToHome }) => {
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
      setLoadingProgress(100);
    } finally {
      clearInterval(interval);
      setTimeout(() => {
        setIsLoading(false);
        setLoadingProgress(0);
      }, 500);
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
    <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen text-white font-sans flex flex-col items-center p-4 md:p-8 selection:bg-amber-400/30 selection:text-white overflow-hidden">
      {/* Elegant background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/5 via-transparent to-slate-950/50"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-400/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {showProgressBar && <ProgressBar progress={progressToShow} />}
      
      {/* Back to Home button */}
      <div className="relative z-20 w-full max-w-7xl mb-4">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 px-4 py-2 text-amber-200/70 hover:text-amber-100 transition-colors text-sm font-light"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span>Back to Home</span>
        </button>
      </div>
      
      <Header />
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center w-full px-4 md:px-8 space-y-8 max-w-7xl">
        <ChapterNavigation
          currentChapter={currentChapter}
          totalChapters={TOTAL_CHAPTERS}
          onChapterChange={handleChapterChange}
          disabled={isLoading}
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-96 space-y-8">
            <LoadingSpinner />
            <div className="text-center">
              <p className="text-amber-200/60 text-base font-light tracking-widest uppercase">Seeking Wisdom</p>
              <div className="mt-6 flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-400/60 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                <div className="w-1.5 h-1.5 bg-amber-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-1.5 h-1.5 bg-amber-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center bg-gradient-to-br from-red-950/40 via-red-900/20 to-transparent border border-red-500/20 rounded-2xl p-10 backdrop-blur-xl max-w-md w-full shadow-xl">
            <div className="mb-6">
              <svg className="w-14 h-14 text-red-400/70 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="font-light text-red-300/90 mb-3 text-lg tracking-wide">An Error Occurred</p>
            <p className="text-red-200/70 text-sm font-light">{error}</p>
          </div>
        ) : viewMode === 'quote' && wisdom ? (
           <QuoteCard wisdom={wisdom} />
        ) : (
          <BookView chapter={currentChapter} onProgressUpdate={handleProgressUpdate}/>
        )}

        <div className="flex items-center gap-4 mt-10 md:mt-12">
            <button
                onClick={toggleViewMode}
                disabled={isLoading}
                className="group relative px-10 py-4 bg-gradient-to-r from-amber-950/30 via-amber-900/20 to-amber-950/30 border border-amber-500/20 rounded-full text-sm font-light text-amber-100/90 hover:text-amber-50 hover:border-amber-400/40 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-amber-400/30 disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden backdrop-blur-xl tracking-wider uppercase"
                style={{
                  boxShadow: '0 4px 20px rgba(251, 191, 36, 0.1), inset 0 1px 0 rgba(251, 191, 36, 0.1)'
                }}
            >
              <span className="relative z-10 flex items-center gap-3">
                {viewMode === 'quote' ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Read Full Chapter
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    View Quote
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GitaExperience;

