import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer ring */}
      <div className="absolute w-24 h-24 border border-amber-400/10 rounded-full"></div>
      
      {/* Spinning ring */}
      <div className="absolute w-24 h-24 border-2 border-transparent border-t-amber-400/40 border-r-amber-400/20 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
      
      {/* Inner counter-spinning ring */}
      <div className="absolute w-16 h-16 border border-transparent border-b-amber-400/30 border-l-amber-400/20 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      
      {/* Center dot */}
      <div className="absolute w-3 h-3 bg-amber-400/40 rounded-full animate-pulse"></div>
    </div>
  );
};

export default LoadingSpinner;
