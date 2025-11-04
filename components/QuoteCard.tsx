
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
      className={`bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl w-full max-w-2xl transition-opacity duration-700 ease-in-out ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <blockquote className="mb-6">
        <p className="font-serif text-2xl md:text-3xl italic text-white leading-relaxed">
          “{wisdom.quote}”
        </p>
      </blockquote>
      <hr className="border-t border-gray-500/50 my-6" />
      <div>
        <h3 className="text-lg font-semibold text-blue-300 mb-2">Insight</h3>
        <p className="text-gray-300 text-base md:text-lg leading-loose">
          {wisdom.explanation}
        </p>
      </div>
    </div>
  );
};

export default QuoteCard;
