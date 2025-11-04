import React, { useState, useEffect } from 'react';
import { Verse } from '../types';

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const PauseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
    </svg>
);


interface VerseDisplayProps {
  verse: Verse;
}

const VerseDisplay: React.FC<VerseDisplayProps> = ({ verse }) => {
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance();
        
        const onEnd = () => setIsPlaying(false);
        u.addEventListener('end', onEnd);

        setUtterance(u);

        return () => {
            u.removeEventListener('end', onEnd);
            synth.cancel();
        };
    }, []);

    const handlePlay = (text: string, lang: string) => {
        if (!utterance) return;
        const synth = window.speechSynthesis;
        
        if (synth.speaking) {
            synth.cancel();
            // If the same text was playing, it effectively pauses/stops it.
            // If we now want to play a *different* text, we continue.
            if (utterance.text === text && isPlaying) {
                 setIsPlaying(false);
                 return;
            }
        }
        
        utterance.text = text;
        utterance.lang = lang;
        utterance.rate = lang === 'sa-IN' ? 0.8 : 1.0;
        synth.speak(utterance);
        setIsPlaying(true);
    };


  return (
    <article className="p-4 bg-black/20 rounded-lg border border-white/10">
      <div className="flex justify-between items-baseline mb-3">
        <h4 className="font-semibold text-cyan-400">Verse {verse.verse_number}</h4>
      </div>
      <div className="flex items-start gap-3">
        <button 
          onClick={() => handlePlay(verse.sanskrit, 'sa-IN')}
          className="text-gray-400 hover:text-white transition-colors mt-1"
          aria-label="Play Sanskrit verse"
        >
          {isPlaying && utterance?.text === verse.sanskrit ? <PauseIcon /> : <PlayIcon />}
        </button>
        <p className="font-serif text-xl text-white flex-1 leading-loose">{verse.sanskrit}</p>
      </div>
      <div className="flex items-start gap-3 mt-4">
        <button 
           onClick={() => handlePlay(verse.translation, 'en-US')}
           className="text-gray-400 hover:text-white transition-colors mt-1"
           aria-label="Play English translation"
        >
           {isPlaying && utterance?.text === verse.translation ? <PauseIcon /> : <PlayIcon />}
        </button>
        <p className="text-gray-300 flex-1 leading-relaxed">{verse.translation}</p>
      </div>
    </article>
  );
};

export default VerseDisplay;