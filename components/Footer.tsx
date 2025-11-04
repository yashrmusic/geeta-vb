import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center py-6 md:py-8 text-gray-400 text-sm">
      <div className="flex flex-col items-center gap-2">
        <p className="text-gray-500 font-light">Wisdom from the Ages</p>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
          <span>Powered by AI</span>
          <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
