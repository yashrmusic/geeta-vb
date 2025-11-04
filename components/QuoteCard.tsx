import React, { useState, useEffect } from 'react';
import { GitaWisdom } from '../types';

interface QuoteCardProps {
  wisdom: GitaWisdom;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ wisdom }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, [wisdom]);

  return (
    <div
      className={`w-full max-w-4xl transition-all duration-1000 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Main quote card */}
      <div className="relative">
        {/* Subtle glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-transparent rounded-3xl blur-xl opacity-50"></div>
        
        {/* Card container */}
        <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-2xl border border-amber-500/20 rounded-3xl p-10 md:p-16 shadow-2xl">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-amber-400/30 rounded-tl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-amber-400/30 rounded-br-3xl"></div>
          
          {/* Quote section */}
          <blockquote className="relative z-10 mb-12">
            <div className="flex items-start">
              {/* Opening quote mark */}
              <div className="text-amber-400/40 text-7xl md:text-8xl font-serif leading-none mr-4 -mt-4 font-light select-none">
                "
              </div>
              
              <div className="flex-1">
                <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-white/95 leading-relaxed font-light italic mb-6 tracking-wide">
                  {wisdom.quote}
                </p>
                
                {/* Elegant divider */}
                <div className="flex items-center gap-4 my-8">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>
                  <div className="w-2 h-2 bg-amber-400/40 rounded-full"></div>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent via-amber-400/30 to-transparent"></div>
                </div>
              </div>
              
              {/* Closing quote mark */}
              <div className="text-amber-400/40 text-7xl md:text-8xl font-serif leading-none ml-4 -mb-4 font-light select-none self-end">
                "
              </div>
            </div>
          </blockquote>
          
          {/* Insight section */}
          <div className="relative z-10">
            <div className="bg-gradient-to-br from-amber-950/30 via-amber-900/20 to-transparent rounded-2xl p-8 border border-amber-500/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-0.5 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
                <h3 className="text-amber-200/90 text-lg md:text-xl font-light tracking-wider uppercase letter-spacing">
                  Reflection
                </h3>
              </div>
              <p className="text-amber-50/80 text-lg md:text-xl leading-relaxed font-light pl-4 tracking-wide">
                {wisdom.explanation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
