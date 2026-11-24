import React, { useState, useEffect } from 'react';

/**
 * Reading progress indicator for long-form blog content.
 * Shows a thin gradient bar at the top of the viewport that fills
 * as the user scrolls through the page.
 */
const ReadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <progress
      className="fixed top-0 left-0 right-0 z-[60] w-full h-1 appearance-none bg-transparent [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-gradient-to-r [&::-webkit-progress-value]:from-brand-600 [&::-webkit-progress-value]:via-sky-500 [&::-webkit-progress-value]:to-brand-600 [&::-moz-progress-bar]:bg-gradient-to-r [&::-moz-progress-bar]:from-brand-600 [&::-moz-progress-bar]:via-sky-500 [&::-moz-progress-bar]:to-brand-600"
      value={progress}
      max="100"
      aria-hidden="true"
    />
  );
};

export default ReadingProgressBar;
