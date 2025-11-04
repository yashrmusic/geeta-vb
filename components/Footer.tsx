import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center py-8 md:py-12 text-amber-200/40 text-xs">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400/20"></div>
          <p className="font-light tracking-[0.3em] uppercase">Eternal Truth</p>
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-amber-400/20"></div>
        </div>
        <p className="text-amber-200/30 text-[10px] tracking-widest font-extralight">Wisdom • Peace • Liberation</p>
        <div className="mt-4 pt-4 border-t border-amber-500/10 w-full max-w-md">
          <p className="text-amber-200/50 text-xs font-light italic leading-relaxed">
            This website was made by <span className="text-amber-200/80 font-medium">Yash Rakhiani</span> to share with family and friends.
          </p>
          <p className="text-amber-300/60 text-xs mt-2 font-light">with love</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
