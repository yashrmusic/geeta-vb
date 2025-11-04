import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 md:py-12 text-center">
      <div className="relative inline-block">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight">
          <span className="bg-gradient-to-r from-cyan-300 via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Ashtavakra Gita
          </span>
        </h1>
        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>
      </div>
      <p className="mt-4 text-gray-300 text-sm md:text-base font-light tracking-wide">
        Ancient Wisdom for the Modern Soul
      </p>
    </header>
  );
};

export default Header;