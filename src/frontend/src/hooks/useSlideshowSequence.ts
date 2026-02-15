import { useState, useEffect } from 'react';

export function useSlideshowSequence(totalImages: number, intervalMs: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex >= totalImages - 1) {
      setIsComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, intervalMs);

    return () => clearTimeout(timer);
  }, [currentIndex, totalImages, intervalMs]);

  return { currentIndex, isComplete };
}
