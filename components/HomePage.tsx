import React from 'react';
import Header from './Header';
import Footer from './Footer';
import HomeIntro from './HomeIntro';

interface HomePageProps {
  onEnterExperience: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onEnterExperience }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center w-full px-4 md:px-8 space-y-12 max-w-7xl pb-12">
        <HomeIntro />
        
        <div className="flex flex-col items-center gap-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-light text-white mb-4">
              <span className="bg-gradient-to-r from-white via-amber-50 to-amber-100 bg-clip-text text-transparent">
                Begin Your Journey
              </span>
            </h2>
            <p className="text-amber-100/70 text-lg font-light max-w-2xl">
              Explore the profound teachings of the Ashtavakra Gita through 20 chapters of timeless wisdom
            </p>
          </div>
          
          <button
            onClick={onEnterExperience}
            className="group relative px-12 py-4 bg-gradient-to-r from-amber-950/40 via-amber-900/30 to-amber-950/40 border border-amber-500/30 rounded-full text-base font-light text-amber-100/90 hover:text-amber-50 hover:border-amber-400/50 transition-all duration-500 overflow-hidden backdrop-blur-xl tracking-wider uppercase shadow-xl"
            style={{
              boxShadow: '0 8px 32px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(251, 191, 36, 0.2)'
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              Experience the Gita
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-purple-400/10 to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

