import React, { useEffect, useState } from 'react';
import { FarmNextLogo } from '../common/FarmNextLogo';

interface SplashScreenProps {
  onFinish: () => void;
  durationMs?: number;
}

/**
 * FarmNext Initial App Splash Screen
 * 
 * Displays the new FarmNext logo and brand title on application startup
 * for approximately 3 seconds before smoothly transitioning to the Welcome / Sign In screen.
 */
export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  durationMs = 3000
}) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Initiate gentle fade-out 350ms before duration completion
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, Math.max(durationMs - 350, 1000));

    // Complete splash screen and transition to the Welcome screen
    const finishTimer = setTimeout(() => {
      onFinish();
    }, durationMs);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [durationMs, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF9F5] transition-opacity duration-350 ease-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="region"
      aria-label="FarmNext Splash Screen"
    >
      <div className="flex flex-col items-center text-center px-4 max-w-sm">
        {/* New FarmNext Smartphone + Agriculture Vector Emblem */}
        <div className="relative mb-6 transform hover:scale-105 transition-transform duration-300">
          <FarmNextLogo variant="mark" customIconSize={108} />
        </div>

        {/* Brand Display Title */}
        <div className="font-display font-black text-3xl sm:text-4xl tracking-tight text-[#1B4332] flex items-center justify-center">
          <span>FARM</span>
          <span className="text-[#2D6A4F] ml-1">NEXT</span>
        </div>

        {/* Subtle, Minimal 3-Second Loading Bar */}
        <div className="w-44 h-1 bg-stone-200/80 rounded-full mt-8 overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-[#1B4332] via-[#2D6A4F] to-[#52B788] rounded-full transition-all ease-linear"
            style={{
              animation: `fnSplashProgress ${durationMs}ms cubic-bezier(0.2, 0.8, 0.4, 1) forwards`
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes fnSplashProgress {
          0% { width: 0%; }
          40% { width: 55%; }
          80% { width: 88%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};
