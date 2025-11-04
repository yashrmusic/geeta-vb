import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-0.5 z-50 bg-amber-900/20">
      <div
        className="h-full bg-gradient-to-r from-amber-500/60 via-amber-400/80 to-amber-500/60 transition-all duration-300 ease-out shadow-[0_0_8px_rgba(251,191,36,0.3)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
