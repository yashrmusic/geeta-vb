import React from 'react';
import InstallButton from './InstallButton';

const Header: React.FC = () => {
  return (
    <header className="py-12 md:py-16 text-center relative">
      <div className="relative inline-block">
        {/* Decorative elements */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>
        
        <h1 className="text-6xl md:text-8xl font-extralight text-white mb-4 tracking-wider leading-tight">
          <span className="relative inline-block">
            <span className="bg-gradient-to-b from-white via-amber-50 to-amber-100 bg-clip-text text-transparent drop-shadow-lg">
              Ashtavakra
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></span>
          </span>
          <br />
          <span className="text-5xl md:text-7xl font-light text-amber-200/90 tracking-widest mt-2 block">
            GITA
          </span>
        </h1>
      </div>
      <p className="mt-6 text-amber-100/70 text-sm md:text-base font-light tracking-[0.2em] uppercase letter-spacing-wider">
        Timeless Wisdom • Eternal Truth
      </p>
      <div className="mt-6 flex items-center justify-center gap-2">
        <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400/40"></div>
        <div className="w-1.5 h-1.5 bg-amber-400/60 rounded-full"></div>
        <div className="w-8 h-px bg-gradient-to-l from-transparent to-amber-400/40"></div>
      </div>
      <div className="mt-6 flex justify-center">
        <InstallButton />
      </div>
    </header>
  );
};

export default Header;