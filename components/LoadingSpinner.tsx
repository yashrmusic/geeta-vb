import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute w-20 h-20 border-4 border-cyan-400/20 border-solid rounded-full"></div>
      <div className="absolute w-20 h-20 border-4 border-transparent border-t-cyan-400 border-r-cyan-400 rounded-full animate-spin"></div>
      <div className="absolute w-12 h-12 border-4 border-transparent border-b-purple-400 border-l-purple-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
      <div className="absolute w-6 h-6 bg-cyan-400 rounded-full animate-pulse"></div>
    </div>
  );
};

export default LoadingSpinner;
