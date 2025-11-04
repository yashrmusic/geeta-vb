import React, { useState, useEffect, useRef } from 'react';

interface PodcastEmbedsProps {
  currentChapter: number;
}

// YouTube Video IDs for the playlist: https://www.youtube.com/watch?v=pPzDLL_K5_Y&list=PLAQW7o4sNH26gfnPWD_5grj-6Y9fsOWLq
const playlistId = 'PLAQW7o4sNH26gfnPWD_5grj-6Y9fsOWLq';
const videoIds: { [key: number]: string } = {
  1: 'pPzDLL_K5_Y',
  2: 'g9z3yP0nB8A',
  3: 'q8j02pS9q_M',
  4: 'wzU4L1a-w3I',
  5: 'Y7B_x20a-M4',
  6: 'g4NBTwryeC8',
  7: 'f0GjUvbu_90',
  8: 'GvM2GzDjnRk',
  9: 'v3-9yBtuo58',
  10: 'GvR6gWzRuwE',
  11: '93fA3D-i9oE',
  12: 't-eR5lixhWk',
  13: 'q3-yVlXGq-U',
  14: '98d5-akD6-U',
  15: 'L2l4y_K-hX0',
  16: 'c30B9f-C-eU',
  17: 'yM3g-Y03nVo',
  18: 'J3iF7-dYFPU',
  19: 'v-b0_yZ30dI',
  20: 'B5U_31S5j-M',
};

const PodcastEmbeds: React.FC<PodcastEmbedsProps> = ({ currentChapter }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset when chapter changes
    setShouldLoad(false);
    
    // Lazy load: only load when user scrolls near or clicks to expand
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading 200px before it's visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [currentChapter]);

  const videoId = videoIds[currentChapter];
  // Use YouTube nocookie domain and lazy loading parameters
  const videoUrl = videoId 
    ? `https://www.youtube-nocookie.com/embed/${videoId}?list=${playlistId}&modestbranding=1&rel=0&loading=lazy` 
    : '';

  return (
    <div ref={containerRef}>
      <h3 className="text-lg font-semibold text-amber-200/90 mb-4 font-light tracking-wide">
        Watch & Reflect
      </h3>
      {videoUrl ? (
        <div className="relative aspect-video bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-xl overflow-hidden border border-amber-500/10">
          {shouldLoad ? (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={videoUrl}
              title={`Commentary for Chapter ${currentChapter}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin">
            </iframe>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-2 border-amber-400/30 border-t-amber-400/70 rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-amber-200/60 text-sm font-light">Loading video...</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-xl p-6 text-center text-amber-200/50 border border-amber-500/10">
          <p className="font-light">No video commentary available for this chapter yet.</p>
        </div>
      )}
    </div>
  );
};

export default PodcastEmbeds;
