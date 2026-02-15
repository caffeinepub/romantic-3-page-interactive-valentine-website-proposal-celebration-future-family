import { useState, useEffect, useRef } from 'react';

export function useAutoplayAudio(audioSrc: string) {
  const [isBlocked, setIsBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audioRef.current = audio;

    const attemptAutoplay = async () => {
      try {
        await audio.play();
        setIsBlocked(false);
      } catch (error) {
        setIsBlocked(true);
      }
    };

    attemptAutoplay();

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audioSrc]);

  const play = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsBlocked(false);
      } catch (error) {
        console.error('Failed to play audio:', error);
      }
    }
  };

  return { isBlocked, play };
}
