import React from 'react';

interface ShareButtonProps {
  title: string;
}

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
  </svg>
);


const ShareButton: React.FC<ShareButtonProps> = ({ title }) => {
  const handleShare = async () => {
    const shareData = {
      title: 'Ashtavakra Gita',
      text: `Discovering wisdom from ${title} of the Ashtavakra Gita.`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      // alert('Could not share at this time.');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 bg-black/20 border border-white/20 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
      aria-label="Share this chapter"
    >
      <ShareIcon />
      <span>Share</span>
    </button>
  );
};

export default ShareButton;