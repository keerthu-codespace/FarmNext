import React from 'react';
import { UserRole } from '../../types';

interface RoleVisualProps {
  role: UserRole;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RoleVisual: React.FC<RoleVisualProps> = ({
  role,
  size = 'md',
  className = ''
}) => {
  const heightMap = {
    sm: 'h-28 w-full',
    md: 'h-40 w-full',
    lg: 'h-52 w-full'
  };

  if (role === 'landowner') {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-[#FAF6E9] to-[#F3ECD5] border border-amber-200/80 flex items-center justify-center ${heightMap[size]} ${className}`}>
        <svg
          viewBox="0 0 320 180"
          className="w-full h-full object-cover"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Landowner overseeing agricultural acreage"
        >
          <defs>
            <linearGradient id="skyGradLo" x1="0" y1="0" x2="0" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF9E6" />
              <stop offset="60%" stopColor="#F8EBC4" />
              <stop offset="100%" stopColor="#E2D4A8" />
            </linearGradient>
            <linearGradient id="fieldGradLo" x1="0" y1="90" x2="0" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#52B788" />
              <stop offset="40%" stopColor="#2D6A4F" />
              <stop offset="100%" stopColor="#1B4332" />
            </linearGradient>
            <linearGradient id="terraceLo" x1="0" y1="110" x2="320" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D8F3DC" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1B4332" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Warm Karnataka Horizon Sky */}
          <rect width="320" height="180" fill="url(#skyGradLo)" />

          {/* Distant Deccan hills */}
          <path d="M-20 110 Q40 85 110 102 Q180 118 240 96 Q290 82 340 100 L340 180 L-20 180 Z" fill="#95D5B2" opacity="0.3" />
          <path d="M-10 118 Q70 100 160 112 Q250 124 330 108 L330 180 L-10 180 Z" fill="#74C69D" opacity="0.4" />

          {/* Agricultural Crop Plots with Boundary Lines */}
          <path d="M0 125 L320 125 L320 180 L0 180 Z" fill="url(#fieldGradLo)" />
          {/* Furrow / Terrace Lines */}
          <path d="M0 135 Q160 148 320 138" stroke="#74C69D" strokeWidth="2" opacity="0.6" />
          <path d="M0 150 Q160 164 320 152" stroke="#52B788" strokeWidth="2.5" opacity="0.7" />
          <path d="M0 168 Q160 182 320 170" stroke="#40916C" strokeWidth="2.5" opacity="0.8" />

          {/* Solar Irrigation Pump Structure in background */}
          <path d="M45 106 L55 106 L53 125 L47 125 Z" fill="#6B7280" />
          <rect x="40" y="98" width="20" height="8" rx="1" fill="#3B82F6" transform="rotate(-15 45 102)" />

          {/* Landowner Figure (Indian Farmer & Land Custodian) */}
          <g transform="translate(195, 48)">
            {/* Shadow */}
            <ellipse cx="40" cy="115" rx="32" ry="6" fill="#081C15" opacity="0.25" />

            {/* Traditional Nehru Vest / Jacket */}
            <path d="M22 62 L58 62 L64 112 L16 112 Z" fill="#78350F" />
            {/* Kurta Underneath */}
            <path d="M26 48 L54 48 L58 75 L22 75 Z" fill="#FDFBF7" />
            <path d="M38 48 L42 48 L42 85 L38 85 Z" fill="#D97706" />

            {/* Dhoti / Pants */}
            <path d="M18 110 L38 110 L36 126 L22 126 Z" fill="#F3F4F6" />
            <path d="M42 110 L62 110 L58 126 L44 126 Z" fill="#F3F4F6" />

            {/* Head & Traditional Turban / Pheta */}
            <circle cx="40" cy="36" r="14" fill="#B45309" />
            <ellipse cx="40" cy="38" rx="11" ry="12" fill="#D97706" />
            {/* Turban folds */}
            <path d="M28 32 Q40 24 52 30 Q48 38 40 38 Q32 38 28 32 Z" fill="#F59E0B" />
            <path d="M30 35 Q40 28 50 33" stroke="#B45309" strokeWidth="1.5" />

            {/* Field Management Board / Land Ownership Registry */}
            <rect x="52" y="68" width="22" height="30" rx="2" fill="#FAF5E8" stroke="#92400E" strokeWidth="1.5" />
            <line x1="56" y1="74" x2="70" y2="74" stroke="#92400E" strokeWidth="1.2" />
            <line x1="56" y1="79" x2="68" y2="79" stroke="#92400E" strokeWidth="1.2" />
            <line x1="56" y1="84" x2="65" y2="84" stroke="#92400E" strokeWidth="1.2" />
            <circle cx="67" cy="91" r="2" fill="#15803D" />

            {/* Arm holding clipboard */}
            <path d="M54 62 L60 76 L52 82" stroke="#D97706" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {/* Pointing gesture towards fields */}
            <path d="M24 64 L8 76 L2 72" stroke="#D97706" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Badge Overlay */}
          <g transform="translate(14, 14)">
            <rect width="110" height="24" rx="12" fill="#1B4332" fillOpacity="0.9" />
            <circle cx="12" cy="12" r="4" fill="#EAB308" />
            <text x="22" y="16" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="sans-serif">LANDOWNER</text>
          </g>
        </svg>
      </div>
    );
  }

  if (role === 'worker') {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-[#EBF5EE] to-[#D8F3DC] border border-emerald-200 flex items-center justify-center ${heightMap[size]} ${className}`}>
        <svg
          viewBox="0 0 320 180"
          className="w-full h-full object-cover"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Agricultural worker in lush crop field"
        >
          <defs>
            <linearGradient id="skyGradWk" x1="0" y1="0" x2="0" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="60%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#D1FAE5" />
            </linearGradient>
            <linearGradient id="cropRowWk" x1="0" y1="100" x2="0" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2D6A4F" />
              <stop offset="100%" stopColor="#081C15" />
            </linearGradient>
          </defs>

          {/* Morning Sky */}
          <rect width="320" height="180" fill="url(#skyGradWk)" />

          {/* Sunlight Morning Glow */}
          <circle cx="280" cy="30" r="38" fill="#FEF08A" opacity="0.6" />

          {/* Coconut palms in distance */}
          <path d="M260 110 L260 85 M260 85 Q250 75 240 82 M260 85 Q270 75 280 82 M260 85 Q260 70 262 68 M260 85 Q255 72 248 76" stroke="#2D6A4F" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M285 112 L285 90 M285 90 Q275 80 268 86 M285 90 Q295 80 302 88 M285 90 Q285 75 287 72" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

          {/* Lush Green Crop Rows */}
          <path d="M0 115 L320 115 L320 180 L0 180 Z" fill="url(#cropRowWk)" />

          {/* Individual Crop Bushes (Groundnut & Legumes) */}
          <g fill="#40916C">
            <ellipse cx="20" cy="140" rx="18" ry="12" />
            <ellipse cx="60" cy="142" rx="20" ry="13" />
            <ellipse cx="110" cy="144" rx="22" ry="14" />
            <ellipse cx="240" cy="140" rx="22" ry="13" />
            <ellipse cx="290" cy="142" rx="24" ry="15" />
          </g>
          <g fill="#74C69D" opacity="0.9">
            <ellipse cx="22" cy="136" rx="14" ry="8" />
            <ellipse cx="62" cy="138" rx="15" ry="9" />
            <ellipse cx="112" cy="140" rx="16" ry="10" />
            <ellipse cx="242" cy="136" rx="16" ry="9" />
            <ellipse cx="292" cy="138" rx="18" ry="10" />
          </g>

          {/* Drip Irrigation Pipe along furrow */}
          <line x1="0" y1="160" x2="320" y2="160" stroke="#1E293B" strokeWidth="3" />
          <circle cx="50" cy="160" r="2.5" fill="#38BDF8" />
          <circle cx="120" cy="160" r="2.5" fill="#38BDF8" />
          <circle cx="210" cy="160" r="2.5" fill="#38BDF8" />
          <circle cx="280" cy="160" r="2.5" fill="#38BDF8" />

          {/* Agricultural Field Worker Figure */}
          <g transform="translate(140, 42)">
            {/* Ground shadow */}
            <ellipse cx="32" cy="120" rx="28" ry="5" fill="#081C15" opacity="0.3" />

            {/* Practical Work Shirt & Rolled Sleeves */}
            <path d="M16 66 L48 66 L52 110 L12 110 Z" fill="#2563EB" />
            {/* Work Trousers */}
            <path d="M14 108 L30 108 L28 126 L16 126 Z" fill="#475569" />
            <path d="M34 108 L50 108 L48 126 L36 126 Z" fill="#475569" />

            {/* Head & Protective Cotton Turban / Romāl */}
            <circle cx="32" cy="38" r="13" fill="#92400E" />
            <path d="M20 34 Q32 22 44 32 Q40 42 32 42 Q24 42 20 34 Z" fill="#F87171" />
            <path d="M22 36 Q32 26 42 34" stroke="#DC2626" strokeWidth="1.5" />

            {/* Precision Soil Inspection / Drip Maintenance Tool in Hands */}
            <path d="M46 68 L58 84 L48 94" stroke="#92400E" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M18 68 L8 86 L18 94" stroke="#92400E" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="8" y1="94" x2="52" y2="94" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />

            {/* Digital Skill Passport Badge on Chest */}
            <rect x="22" y="74" width="12" height="15" rx="1.5" fill="#FFFFFF" stroke="#059669" strokeWidth="1" />
            <circle cx="28" cy="79" r="2" fill="#059669" />
            <line x1="24" y1="84" x2="32" y2="84" stroke="#059669" strokeWidth="1" />
          </g>

          {/* Badge Overlay */}
          <g transform="translate(14, 14)">
            <rect width="168" height="24" rx="12" fill="#1B4332" fillOpacity="0.9" />
            <circle cx="12" cy="12" r="4" fill="#10B981" />
            <text x="22" y="16" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="sans-serif">AGRICULTURAL WORKER</text>
          </g>
        </svg>
      </div>
    );
  }

  // Urban Co-Farmer
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE] border border-blue-200 flex items-center justify-center ${heightMap[size]} ${className}`}>
      <svg
        viewBox="0 0 320 180"
        className="w-full h-full object-cover"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Urban co-farmer monitoring remote farm telemetry"
      >
        <defs>
          <linearGradient id="skyGradUrb" x1="0" y1="0" x2="0" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EEF2FF" />
            <stop offset="70%" stopColor="#E0E7FF" />
            <stop offset="100%" stopColor="#C7D2FE" />
          </linearGradient>
          <linearGradient id="balconyGrad" x1="0" y1="120" x2="0" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
        </defs>

        {/* Crisp Urban Sky */}
        <rect width="320" height="180" fill="url(#skyGradUrb)" />

        {/* Bangalore Tech Skyline Silhouette in background */}
        <g fill="#94A3B8" opacity="0.35">
          <rect x="20" y="80" width="25" height="60" />
          <rect x="50" y="65" width="30" height="75" />
          <polygon points="65,48 50,65 80,65" />
          <rect x="85" y="85" width="22" height="55" />
          <rect x="112" y="70" width="35" height="70" />
          <rect x="235" y="75" width="28" height="65" />
          <rect x="270" y="60" width="35" height="80" />
          <line x1="287" y1="42" x2="287" y2="60" stroke="#64748B" strokeWidth="2" />
        </g>

        {/* Modern Terrace / Balcony Railing */}
        <path d="M0 135 L320 135 L320 180 L0 180 Z" fill="url(#balconyGrad)" />
        <line x1="0" y1="135" x2="320" y2="135" stroke="#64748B" strokeWidth="4" />
        <line x1="40" y1="135" x2="40" y2="180" stroke="#475569" strokeWidth="2" />
        <line x1="120" y1="135" x2="120" y2="180" stroke="#475569" strokeWidth="2" />
        <line x1="200" y1="135" x2="200" y2="180" stroke="#475569" strokeWidth="2" />
        <line x1="280" y1="135" x2="280" y2="180" stroke="#475569" strokeWidth="2" />

        {/* Balcony Potted Plant (Connecting to Greenery) */}
        <path d="M25 125 L45 125 L42 145 L28 145 Z" fill="#9A3412" />
        <circle cx="35" cy="118" r="10" fill="#16A34A" />
        <circle cx="30" cy="112" r="7" fill="#22C55E" />
        <circle cx="40" cy="114" r="6" fill="#4ADE80" />

        {/* Urban Participant Figure holding Tablet with Farm Telemetry */}
        <g transform="translate(135, 40)">
          {/* Floor Shadow */}
          <ellipse cx="36" cy="118" rx="28" ry="5" fill="#0F172A" opacity="0.3" />

          {/* Smart Casual Attire */}
          <path d="M18 64 L54 64 L58 108 L14 108 Z" fill="#0D9488" />
          <path d="M20 108 L34 108 L32 125 L22 125 Z" fill="#334155" />
          <path d="M38 108 L52 108 L50 125 L40 125 Z" fill="#334155" />

          {/* Head & Hair */}
          <circle cx="36" cy="36" r="13" fill="#B45309" />
          {/* Neat Modern Hairstyle */}
          <path d="M22 34 Q36 20 50 32 Q50 44 46 44 Q36 40 26 42 Z" fill="#1E293B" />

          {/* Tablet Device displaying Green Valley Plot Live Data */}
          <rect x="42" y="66" width="34" height="24" rx="2" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
          {/* Farm Graph on screen */}
          <polyline points="46,84 52,78 58,81 64,72 70,75" stroke="#4ADE80" strokeWidth="1.8" fill="none" />
          <circle cx="64" cy="72" r="1.5" fill="#FACC15" />

          {/* Hands holding tablet */}
          <path d="M48 64 L44 76" stroke="#B45309" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M24 64 L36 82 L42 80" stroke="#B45309" strokeWidth="3.5" strokeLinecap="round" />
        </g>

        {/* Holographic / Signal Waves to distant Farm */}
        <path d="M205 95 Q225 85 245 95" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
        <path d="M202 90 Q225 78 248 90" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />

        {/* Badge Overlay */}
        <g transform="translate(14, 14)">
          <rect width="144" height="24" rx="12" fill="#1B4332" fillOpacity="0.9" />
          <circle cx="12" cy="12" r="4" fill="#38BDF8" />
          <text x="22" y="16" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="sans-serif">URBAN CO-FARMER</text>
        </g>
      </svg>
    </div>
  );
};

export const RoleBadgeIcon: React.FC<{ role: UserRole; className?: string }> = ({ role, className = 'w-4 h-4' }) => {
  if (role === 'landowner') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Landowner">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M9 21v-5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5" />
      </svg>
    );
  }
  if (role === 'worker') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Agricultural Worker">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <polyline points="16 11 18 13 22 9" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Urban Co-Farmer">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <path d="m7 11 3-3 4 4 3-3" />
    </svg>
  );
};
