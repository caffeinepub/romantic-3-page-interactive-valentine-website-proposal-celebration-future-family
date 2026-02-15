import { useState, useEffect, useRef } from 'react';

export function useAutoplayAudio(audioSrc: string) {
  const [isBlocked, setIsBlocked] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audioRef.current = audio;

    // Reset states
    setIsBlocked(false);
    setLoadError(null);
    setIsLoading(true);

    // Handle successful load
    const handleCanPlay = () => {
      setIsLoading(false);
      setLoadError(null);
    };

    // Handle load errors - these are real file/network issues
    const handleError = () => {
      setIsLoading(false);
      setLoadError('Unable to load audio file. Please check your connection and try again.');
      setIsBlocked(false);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    const attemptAutoplay = async () => {
      try {
        await audio.play();
        // Playback started successfully
        setIsBlocked(false);
        setLoadError(null);
      } catch (error) {
        // Distinguish between autoplay policy blocks and real errors
        if (error instanceof Error) {
          if (error.name === 'NotAllowedError') {
            // Browser autoplay policy blocked it - user interaction needed
            setIsBlocked(true);
            setLoadError(null);
          } else if (error.name === 'NotSupportedError') {
            // Audio format not supported or other media error
            setLoadError('Audio format not supported by your browser.');
            setIsBlocked(false);
          } else {
            // Other play errors
            setLoadError('Failed to play audio. Please try again.');
            setIsBlocked(false);
          }
        } else {
          // Unknown error, assume autoplay block
          setIsBlocked(true);
        }
      }
    };

    // Wait a bit for the audio to start loading
    const timeoutId = setTimeout(() => {
      if (audio.readyState >= 2) {
        attemptAutoplay();
      } else {
        // If not loaded yet, wait for canplay event
        audio.addEventListener('canplay', () => attemptAutoplay(), { once: true });
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
    };
  }, [audioSrc]);

  const play = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        // Successfully started playback - clear blocked state
        setIsBlocked(false);
        setLoadError(null);
      } catch (error) {
        console.error('Failed to play audio:', error);
        if (error instanceof Error) {
          if (error.name === 'NotAllowedError') {
            // Still blocked - keep showing the prompt
            setIsBlocked(true);
          } else if (error.name === 'NotSupportedError') {
            setLoadError('Audio format not supported by your browser.');
            setIsBlocked(false);
          } else {
            setLoadError('Failed to play audio. Please try again.');
            setIsBlocked(false);
          }
        }
      }
    }
  };

  const retry = () => {
    setLoadError(null);
    setIsBlocked(false);
    play();
  };

  return { isBlocked, loadError, isLoading, play, retry };
}
