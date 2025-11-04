import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-cyan-400/20">
      <div
        className="h-full bg-cyan-400 shadow-[0_0_10px_#00c2ff,0_0_5px_#00c2ff] transition-all duration-150 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
