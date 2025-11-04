import React from 'react';
import { Verse } from '../types';
import VerseExplanation from './VerseExplanation';

interface VerseDisplayProps {
  verse: Verse;
  chapterNumber: number;
}

const VerseDisplay: React.FC<VerseDisplayProps> = ({ verse, chapterNumber }) => {
  // Simple, elegant audio mode - removed TTS completely
  // Audio feature can be added later with actual audio files if needed

  return (
    <article className="p-6 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 backdrop-blur-sm border border-amber-500/10 rounded-xl shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-light text-amber-300/90 text-base tracking-wide">Verse {verse.verse_number}</h4>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="font-serif text-xl md:text-2xl text-white/95 leading-relaxed mb-2">{verse.sanskrit}</p>
        </div>
        
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"></div>
        
        <div>
          <p className="text-amber-50/80 text-base md:text-lg leading-relaxed font-light">{verse.translation}</p>
        </div>
      </div>

      <VerseExplanation verse={verse} chapterNumber={chapterNumber} />
    </article>
  );
};

export default VerseDisplay;