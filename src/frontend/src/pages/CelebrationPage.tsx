import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import GlassOverlay from '@/components/GlassOverlay';
import { uploadedImages, audioFile } from '@/content/uploadedMedia';
import { celebrationMessage } from '@/content/celebrationMessage';
import { useAutoplayAudio } from '@/hooks/useAutoplayAudio';
import { useSlideshowSequence } from '@/hooks/useSlideshowSequence';
import { Volume2, AlertCircle } from 'lucide-react';

interface CelebrationPageProps {
  onContinue: () => void;
}

export default function CelebrationPage({ onContinue }: CelebrationPageProps) {
  const { isBlocked, loadError, play, retry } = useAutoplayAudio(audioFile);
  const { currentIndex, isComplete } = useSlideshowSequence(uploadedImages.length, 1500);
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    if (isComplete) {
      setTimeout(() => setShowGrid(true), 500);
    }
  }, [isComplete]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-rose-100">
      {/* Audio Error Overlay */}
      {loadError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md">
            <AlertCircle className="mx-auto mb-4 text-red-600" size={64} />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Audio Error</h2>
            <p className="text-gray-600 mb-6">{loadError}</p>
            <Button
              onClick={retry}
              size="lg"
              className="bg-rose-600 hover:bg-rose-700 text-white text-xl px-12 py-6 rounded-full"
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Audio Blocked Overlay - Clearer prompt */}
      {isBlocked && !loadError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md">
            <Volume2 className="mx-auto mb-4 text-rose-600 animate-pulse" size={64} />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Let's Add Some Music! 🎵</h2>
            <p className="text-gray-600 mb-2 text-lg">
              Your browser needs permission to play audio.
            </p>
            <p className="text-gray-500 mb-6">
              Tap the button below to start the celebration with beautiful music!
            </p>
            <Button
              onClick={play}
              size="lg"
              className="bg-rose-600 hover:bg-rose-700 text-white text-xl px-12 py-6 rounded-full shadow-lg transform hover:scale-105 transition-all"
            >
              Play Music
            </Button>
          </div>
        </div>
      )}

      {/* Popup Animation Phase */}
      {!showGrid && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-gradient-to-br from-rose-200/90 via-pink-200/90 to-rose-200/90 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center p-4">
            <img
              src={uploadedImages[currentIndex]}
              alt={`Memory ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl border-8 border-white animate-scale-in"
            />
          </div>
        </div>
      )}

      {/* Grid Background + Overlay Phase */}
      {showGrid && (
        <>
          {/* Image Grid Background */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4">
              {uploadedImages.map((img, idx) => (
                <div key={idx} className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={img}
                    alt={`Memory ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Glassmorphism Overlay */}
          <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
            <GlassOverlay>
              <div className="max-w-3xl w-full space-y-8">
                <p className="text-lg md:text-xl leading-relaxed text-gray-800 whitespace-pre-wrap text-center font-serif">
                  {celebrationMessage}
                </p>
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={onContinue}
                    size="lg"
                    className="bg-rose-600 hover:bg-rose-700 text-white text-xl px-12 py-6 rounded-full shadow-xl transform hover:scale-105 transition-all"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </GlassOverlay>
          </div>
        </>
      )}
    </div>
  );
}
