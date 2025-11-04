import React from 'react';

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
  const videoId = videoIds[currentChapter];
  const videoUrl = videoId ? `https://www.youtube.com/embed/${videoId}?list=${playlistId}` : '';

  return (
    <div>
      <h3 className="text-lg font-semibold text-cyan-300 mb-4">
        Watch & Reflect
      </h3>
      {videoUrl ? (
        <div className="relative aspect-video">
           <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={videoUrl}
              title={`Commentary for Chapter ${currentChapter}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen>
          </iframe>
        </div>
      ) : (
        <div className="bg-black/30 rounded-lg p-4 text-center text-gray-400">
          <p>No video commentary available for this chapter yet.</p>
        </div>
      )}
    </div>
  );
};

export default PodcastEmbeds;
