import React, { useState } from 'react';
import HomePage from './components/HomePage';
import GitaExperience from './components/GitaExperience';

const App: React.FC = () => {
  const [showExperience, setShowExperience] = useState(false);

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen text-white font-sans selection:bg-amber-400/30 selection:text-white overflow-hidden">
      {/* Elegant background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/5 via-transparent to-slate-950/50"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-400/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {showExperience ? (
        <GitaExperience onBackToHome={() => setShowExperience(false)} />
      ) : (
        <HomePage onEnterExperience={() => setShowExperience(true)} />
      )}
    </div>
  );
};

export default App;