import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { getRandomPosition, checkOverlap } from '@/utils/positioning';

interface ProposalPageProps {
  onYes: () => void;
}

type HeaderText = 'Will you be my Valentine?' | 'Think again' | 'Last chance';

export default function ProposalPage({ onYes }: ProposalPageProps) {
  const [headerText, setHeaderText] = useState<HeaderText>('Will you be my Valentine?');
  const [noClickCount, setNoClickCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonPositioned, setIsNoButtonPositioned] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = () => {
    if (!noButtonRef.current || !yesButtonRef.current) return;

    const noRect = noButtonRef.current.getBoundingClientRect();
    const yesRect = yesButtonRef.current.getBoundingClientRect();

    let newPosition;
    let attempts = 0;
    const maxAttempts = 50;

    do {
      newPosition = getRandomPosition(noRect.width, noRect.height);
      attempts++;
    } while (
      checkOverlap(newPosition, noRect.width, noRect.height, yesRect) &&
      attempts < maxAttempts
    );

    setNoButtonPosition(newPosition);
    setIsNoButtonPositioned(true);
  };

  const handleNoHover = () => {
    if (noClickCount < 3) {
      moveNoButton();
    }
  };

  const handleNoClick = () => {
    if (noClickCount === 0) {
      setHeaderText('Think again');
      setNoClickCount(1);
      moveNoButton();
    } else if (noClickCount === 1) {
      setHeaderText('Last chance');
      setNoClickCount(2);
      moveNoButton();
    } else if (noClickCount === 2) {
      setNoClickCount(3);
    }
  };

  useEffect(() => {
    if (!isNoButtonPositioned && noButtonRef.current && yesButtonRef.current) {
      const noRect = noButtonRef.current.getBoundingClientRect();
      setNoButtonPosition({ x: noRect.left, y: noRect.top });
      setIsNoButtonPositioned(true);
    }
  }, [isNoButtonPositioned]);

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: 'url(/assets/generated/tulips-roses-pattern.dim_1920x1080.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50/40 via-pink-50/30 to-rose-50/40" />

      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full">
        {/* Header Image */}
        <div className="mb-8 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 backdrop-blur-sm">
          <img
            src="/assets/generated/hugging-couple-header.dim_1200x1600.png"
            alt="Nick and Judy"
            className="w-full max-w-md h-auto object-contain"
          />
        </div>

        {/* Question Text */}
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-12 text-rose-900 drop-shadow-lg font-serif animate-pulse">
          {headerText}
        </h1>

        {/* Buttons Container */}
        <div className="relative w-full h-48 flex items-center justify-center">
          {/* Yes Button - Stationary */}
          <Button
            ref={yesButtonRef}
            onClick={onYes}
            size="lg"
            className="absolute bg-rose-600 hover:bg-rose-700 text-white text-2xl px-16 py-8 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 font-bold border-4 border-rose-800"
          >
            <Heart className="mr-3 fill-current" size={32} />
            Yes!
          </Button>

          {/* No Button - Moving or Second Yes */}
          {noClickCount < 3 ? (
            <button
              ref={noButtonRef}
              onClick={handleNoClick}
              onMouseEnter={handleNoHover}
              onTouchStart={(e) => {
                e.preventDefault();
                handleNoHover();
              }}
              style={
                isNoButtonPositioned
                  ? {
                      position: 'fixed',
                      left: `${noButtonPosition.x}px`,
                      top: `${noButtonPosition.y}px`,
                      transition: 'all 0.3s ease-out',
                    }
                  : {}
              }
              className="bg-gray-400 hover:bg-gray-500 text-white text-xl px-12 py-6 rounded-full shadow-xl font-bold border-4 border-gray-600 cursor-pointer touch-none"
            >
              No
            </button>
          ) : (
            <Button
              onClick={onYes}
              size="lg"
              className="absolute left-1/2 -translate-x-1/2 top-24 bg-rose-600 hover:bg-rose-700 text-white text-2xl px-16 py-8 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 font-bold border-4 border-rose-800"
            >
              <Heart className="mr-3 fill-current" size={32} />
              Yes!
            </Button>
          )}
        </div>
      </div>

      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-rose-400/30 animate-float"
            size={Math.random() * 30 + 20}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
