import React from 'react';

interface FarmNextLogoProps {
  variant?: 'full' | 'mark' | 'stacked';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  theme?: 'light' | 'dark';
  showSubtitle?: boolean;
  className?: string;
  customIconSize?: number;
}

/**
 * FarmNext Official App Logo
 * 
 * Concept: Technology + Agriculture + Connection
 * - Modern smartphone/mobile device (technology)
 * - Agricultural landscape with green crops, furrow rows & rising sprout inside the screen (agriculture)
 * - Radiating signal arcs & telemetry nodes (connection between people and agriculture)
 */
export const FarmNextLogo: React.FC<FarmNextLogoProps> = ({
  variant = 'full',
  size = 'md',
  theme = 'light',
  showSubtitle = false,
  className = '',
  customIconSize
}) => {
  // Dimensions mapping
  const sizeMap: Record<string, { icon: number; font: string; sub: string }> = {
    xs: { icon: 22, font: 'text-base', sub: 'text-[9px]' },
    sm: { icon: 28, font: 'text-lg', sub: 'text-[10px]' },
    md: { icon: 38, font: 'text-xl', sub: 'text-[11px]' },
    lg: { icon: 48, font: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 60, font: 'text-3xl', sub: 'text-sm' },
    '2xl': { icon: 96, font: 'text-5xl', sub: 'text-base' }
  };

  const { icon: defaultIcon, font, sub } = sizeMap[size] || sizeMap.md;
  const icon = customIconSize || defaultIcon;

  // New Vector Emblem: Modern Smartphone with Agricultural Landscape & Growing Crop
  const SymbolSvg = (
    <svg
      width={icon}
      height={icon}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200 group-hover:scale-105 select-none"
      aria-label="FarmNext Technology + Agriculture Logo"
    >
      <defs>
        {/* Smartphone Chassis Gradient */}
        <linearGradient id="fnPhoneBody" x1="13" y1="7" x2="51" y2="59" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1B4332" />
          <stop offset="50%" stopColor="#143427" />
          <stop offset="100%" stopColor="#0D281E" />
        </linearGradient>

        {/* Screen Clip Path */}
        <clipPath id="fnScreenClip">
          <rect x="16" y="13" width="32" height="40" rx="4.5" />
        </clipPath>

        {/* Dawn / Sky Gradient */}
        <linearGradient id="fnSkyGrad" x1="16" y1="13" x2="48" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EBF5EE" />
          <stop offset="60%" stopColor="#D8F3DC" />
          <stop offset="100%" stopColor="#B7E4C7" />
        </linearGradient>

        {/* Radiant Horizon Sun / Network Beacon */}
        <linearGradient id="fnSunGrad" x1="26" y1="22" x2="38" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Distant Agrarian Hills */}
        <linearGradient id="fnHillFar" x1="16" y1="30" x2="48" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#74C69D" />
          <stop offset="100%" stopColor="#40916C" />
        </linearGradient>

        {/* Foreground Fertile Soil & Contoured Field */}
        <linearGradient id="fnHillNear" x1="16" y1="38" x2="48" y2="53" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2D6A4F" />
          <stop offset="100%" stopColor="#1B4332" />
        </linearGradient>

        {/* Primary Sprout Leaf Gradient */}
        <linearGradient id="fnSproutMain" x1="24" y1="28" x2="32" y2="39" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#74C69D" />
          <stop offset="50%" stopColor="#52B788" />
          <stop offset="100%" stopColor="#2D6A4F" />
        </linearGradient>

        {/* Secondary Sprout Leaf Gradient */}
        <linearGradient id="fnSproutSecond" x1="40" y1="24" x2="32" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#95D5B2" />
          <stop offset="60%" stopColor="#52B788" />
          <stop offset="100%" stopColor="#40916C" />
        </linearGradient>

        {/* Digital Connection Signal Waves */}
        <linearGradient id="fnSignalGrad" x1="23" y1="2" x2="41" y2="5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#52B788" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#52B788" />
        </linearGradient>

        {/* Drop shadow filter for depth */}
        <filter id="fnDeviceShadow" x="8" y="4" width="48" height="58" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#1B4332" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* 1. Subtle Digital Connection / Telemetry Waves (Technology connecting to Agriculture) */}
      <g opacity="0.95">
        <path
          d="M 23 4.5 C 26 1.8, 38 1.8, 41 4.5"
          stroke="url(#fnSignalGrad)"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 27 2.5 C 29 1.1, 35 1.1, 37 2.5"
          stroke="#52B788"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <circle cx="32" cy="0.9" r="1.1" fill="#F59E0B" />
      </g>

      {/* 2. Modern Smartphone Hardware Chassis */}
      <g filter="url(#fnDeviceShadow)">
        {/* Side Hardware Buttons */}
        <rect x="11.5" y="18" width="1.5" height="5" rx="0.75" fill="#2D6A4F" />
        <rect x="11.5" y="25" width="1.5" height="5" rx="0.75" fill="#2D6A4F" />
        <rect x="51" y="21" width="1.5" height="7" rx="0.75" fill="#2D6A4F" />

        {/* Main Phone Body */}
        <rect
          x="13"
          y="7"
          width="38"
          height="52"
          rx="8.5"
          fill="url(#fnPhoneBody)"
          stroke="#2D6A4F"
          strokeWidth="1.2"
        />

        {/* Top Speaker / Dynamic Island Pill */}
        <rect x="27" y="9.5" width="10" height="2" rx="1" fill="#0D281E" />
        <circle cx="34.5" cy="10.5" r="0.6" fill="#40916C" />
      </g>

      {/* 3. Screen Viewport: The Agricultural World Inside Technology */}
      <g clipPath="url(#fnScreenClip)">
        {/* Morning Agricultural Sky */}
        <rect x="16" y="13" width="32" height="40" fill="url(#fnSkyGrad)" />

        {/* Rising Sun / Agronomic Connectivity Beacon */}
        <circle cx="32" cy="27" r="6" fill="url(#fnSunGrad)" />
        <circle
          cx="32"
          cy="27"
          r="8.5"
          stroke="#F59E0B"
          strokeWidth="0.7"
          strokeDasharray="1.5 1.5"
          opacity="0.55"
        />

        {/* Distant Rolling Terraced Farmland */}
        <path
          d="M 16 35 C 22 32, 26 34, 32 32 C 38 30, 42 34, 48 33 L 48 53 L 16 53 Z"
          fill="url(#fnHillFar)"
        />

        {/* Agricultural Furrows / Precision Crop Rows (Perspective Convergence) */}
        <path d="M 23 53 L 28 35" stroke="#2D6A4F" strokeWidth="0.9" opacity="0.35" strokeLinecap="round" />
        <path d="M 32 53 L 32 34" stroke="#1B4332" strokeWidth="1.1" opacity="0.4" strokeLinecap="round" />
        <path d="M 41 53 L 36 35" stroke="#2D6A4F" strokeWidth="0.9" opacity="0.35" strokeLinecap="round" />

        {/* Foreground Rich Soil Contour */}
        <path
          d="M 16 42 C 22 39, 28 41, 34 39 C 40 37, 44 41, 48 40 L 48 53 L 16 53 Z"
          fill="url(#fnHillNear)"
        />

        {/* Contoured Field Terraces */}
        <path d="M 16 47 C 24 45, 34 46, 48 44" stroke="#40916C" strokeWidth="0.8" fill="none" opacity="0.45" />
        <path d="M 16 51 C 26 49, 36 50, 48 48" stroke="#52B788" strokeWidth="0.8" fill="none" opacity="0.45" />

        {/* Thriving Agricultural Crop / Sprout Rising Through the Screen */}
        <path d="M 32 49 Q 32 38 32 31" stroke="#74C69D" strokeWidth="2.2" strokeLinecap="round" />
        {/* Left Leaf */}
        <path d="M 32 39 C 25 38 21 33 24 28 C 28 28 32 33 32 39 Z" fill="url(#fnSproutMain)" />
        {/* Right Leaf */}
        <path d="M 32 35 C 39 34 43 29 40 24 C 36 24 32 30 32 35 Z" fill="url(#fnSproutSecond)" />
        {/* Bud / Telemetry Node at Stem Apex */}
        <circle cx="32" cy="28" r="1.8" fill="#F59E0B" />
        <circle cx="32" cy="28" r="0.75" fill="#FFFFFF" />

        {/* Phone Bottom Home Bar */}
        <rect x="26" y="49.5" width="12" height="1.4" rx="0.7" fill="#EBF5EE" opacity="0.8" />
      </g>
    </svg>
  );

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {SymbolSvg}
      </div>
    );
  }

  const textColorMain = theme === 'dark' ? 'text-white' : 'text-[#1B4332]';
  const textColorNext = theme === 'dark' ? 'text-amber-400' : 'text-[#2D6A4F]';
  const subtextColor = theme === 'dark' ? 'text-stone-300' : 'text-stone-500';

  return (
    <div
      className={`inline-flex ${
        variant === 'stacked' ? 'flex-col items-center text-center' : 'items-center gap-3'
      } ${className}`}
    >
      {SymbolSvg}
      <div className={variant === 'stacked' ? 'mt-2' : ''}>
        <div className={`font-display font-black tracking-tight ${font} ${textColorMain} leading-none flex items-center`}>
          <span>FARM</span>
          <span className={`${textColorNext} ml-0.5`}>NEXT</span>
        </div>
        {showSubtitle && (
          <div className={`font-sans font-medium uppercase tracking-wider ${sub} ${subtextColor} mt-0.5`}>
            AI Co-Farming Platform
          </div>
        )}
      </div>
    </div>
  );
};
