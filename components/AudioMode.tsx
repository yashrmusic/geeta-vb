import React, { useState, useEffect } from 'react';
import { fetchChapterAudioExplanation } from '../services/geminiService';

interface AudioModeProps {
  chapterNumber: number;
  chapterTitle: string;
}

const AudioMode: React.FC<AudioModeProps> = ({ chapterNumber, chapterTitle }) => {
  const [audioText, setAudioText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAudio = async () => {
    setIsGenerating(true);
    setIsLoading(true);
    try {
      const explanation = await fetchChapterAudioExplanation(chapterNumber, chapterTitle);
      setAudioText(explanation);
    } catch (error) {
      console.error('Error generating audio explanation:', error);
    } finally {
      setIsGenerating(false);
      setIsLoading(false);
    }
  };

  const handlePlay = () => {
    if (!audioText) {
      generateAudio();
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(audioText);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Try to use a high-quality voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.includes('Google') || 
      v.name.includes('Microsoft') || 
      v.name.includes('Samantha') ||
      v.name.includes('Daniel')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  useEffect(() => {
    // Load voices when component mounts
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="mb-8 p-6 bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-sm border border-amber-500/20 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-0.5 h-8 bg-gradient-to-b from-amber-400 to-purple-400 rounded-full"></div>
          <div>
            <h3 className="text-amber-200/90 text-sm font-light tracking-wide uppercase">Audio Mode</h3>
            <p className="text-amber-200/50 text-xs mt-1">High-quality chapter explanation</p>
          </div>
        </div>
        <button
          onClick={handlePlay}
          disabled={isGenerating}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-950/40 to-amber-900/30 border border-amber-500/30 rounded-lg text-sm font-light text-amber-100/90 hover:text-amber-50 hover:border-amber-400/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating...</span>
            </>
          ) : isPlaying ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Stop</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>Listen to Chapter</span>
            </>
          )}
        </button>
      </div>
      {audioText && !isPlaying && (
        <div className="mt-4 p-4 bg-black/20 rounded-lg border border-amber-500/10">
          <p className="text-amber-50/70 text-xs leading-relaxed">{audioText.substring(0, 150)}...</p>
        </div>
      )}
    </div>
  );
};

export default AudioMode;

