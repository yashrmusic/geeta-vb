
import React, { useState, useEffect } from 'react';
import { GitaWisdom } from '../types';

interface QuoteCardProps {
  wisdom: GitaWisdom;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ wisdom }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // This creates a fade-in effect whenever the wisdom prop changes.
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 100); // Short delay to trigger transition
    return () => clearTimeout(timer);
  }, [wisdom]);

  return (
    <div
      className={`bg-gradient-to-br from-black/50 via-black/40 to-black/50 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl w-full max-w-3xl transition-all duration-700 ease-in-out ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{
        boxShadow: '0 20px 60px rgba(0, 212, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="relative">
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-cyan-400/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-purple-400/20 rounded-full blur-xl"></div>
        
        <blockquote className="mb-8 relative z-10">
          <div className="flex items-start gap-3 mb-4">
            <div className="text-cyan-400 text-4xl font-serif leading-none mt-1">"</div>
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl italic text-white leading-relaxed flex-1">
              {wisdom.quote}
            </p>
            <div className="text-cyan-400 text-4xl font-serif leading-none mt-auto">"</div>
          </div>
        </blockquote>
        
        <div className="relative z-10">
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent my-8"></div>
          
          <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"></div>
              <h3 className="text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
                Insight
              </h3>
            </div>
            <p className="text-gray-200 text-base md:text-lg leading-relaxed pl-3">
              {wisdom.explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
