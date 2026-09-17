import React from 'react';
import {
  ArrowRight,
  Globe,
  ShieldCheck,
  Cpu,
  Users,
  Sprout,
  TrendingUp,
  Award,
  Layers,
  Sparkles
} from 'lucide-react';
import { FarmNextLogo } from '../common/FarmNextLogo';
import { RoleVisual } from '../common/RoleVisual';
import { useApp } from '../../context/AppContext';
import { LANGUAGE_OPTIONS, Language } from '../../i18n/translations';

export const WelcomeScreen: React.FC = () => {
  const { setCurrentView, language, setLanguage, t } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col justify-between selection:bg-[#2D6A4F]/20 selection:text-[#1B4332]">
      {/* Top Header */}
      <header className="border-b border-stone-200/80 bg-white/90 backdrop-blur-xs sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FarmNextLogo variant="full" size="md" />
          </div>

          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-[#FAF9F5] border border-stone-200 rounded-xl px-2.5 py-1">
              <Globe className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-stone-700 text-xs font-semibold outline-hidden cursor-pointer"
                title="Select language"
              >
                {LANGUAGE_OPTIONS.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setCurrentView('auth')}
              className="px-4 py-2 bg-[#1B4332] hover:bg-[#143427] text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero & Value Proposition */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex-1 flex flex-col items-center justify-center text-center">
        {/* Brand Symbol & Title */}
        <div className="mb-6 flex flex-col items-center">
          <FarmNextLogo variant="mark" size="xl" className="mb-4" />
          <h1 className="font-display text-4xl sm:text-6xl font-black text-[#1B4332] tracking-tight">
            FARMNEXT
          </h1>
        </div>

        {/* Mandatory Tagline */}
        <p className="font-display text-xl sm:text-3xl font-bold text-stone-800 mb-4 max-w-2xl leading-snug">
          “Bridging the gap between the modern world and the roots that feed it”
        </p>

        {/* Mandatory Supporting Text */}
        <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed mb-8">
          An AI-powered co-farming platform connecting landowners, agricultural workers and urban co-farmers.
        </p>

        {/* Primary Call to Action */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center mb-14">
          <button
            onClick={() => setCurrentView('auth')}
            id="welcome-get-started-btn"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#1B4332] hover:bg-[#143427] text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-300" />
          </button>
        </div>

        {/* Three Pillars: Landowner, Agricultural Worker, Urban Co-Farmer (Professional Visuals, NO Emojis) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full text-left">
          {/* Landowner */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-3">
            <RoleVisual role="landowner" size="sm" />
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-[#1B4332]">Landowners</h3>
                <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Land Custodian
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Activate underutilized arable acreage with AI-optimized seasonal plans, soil health monitoring, and verified workforce coordination.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1 pt-1">
              <span>Managed Acreage & Yield Oversight</span>
            </div>
          </div>

          {/* Agricultural Worker */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-3">
            <RoleVisual role="worker" size="sm" />
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-[#1B4332]">Agricultural Workers</h3>
                <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Field Specialist
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Build verified digital Skill Passports, access fair scheduled daily wages, and gain recognized accreditation for precision field expertise.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1 pt-1">
              <span>Skill Passport & Direct Wage Security</span>
            </div>
          </div>

          {/* Urban Co-Farmer */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-3">
            <RoleVisual role="urban_cofarmer" size="sm" />
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-[#1B4332]">Urban Co-Farmers</h3>
                <span className="text-[10px] uppercase font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Remote Sponsor
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Sponsor regenerative crop cycles, track field telemetry with photographic verification, and participate directly in transparent harvest outcomes.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-blue-800 flex items-center gap-1 pt-1">
              <span>Photographic Telemetry & Harvest Share</span>
            </div>
          </div>
        </div>
      </main>

      {/* Product Footer */}
      <footer className="border-t border-stone-200 bg-white py-4 px-4 text-center text-xs text-stone-500">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FarmNextLogo variant="mark" size="xs" />
            <span>FARMNEXT © 2026 · AI-Assisted Co-Farming Platform</span>
          </div>
          <div className="text-stone-400 text-[11px]">
            Sustainable Agriculture · Verified Labor Standards · Transparency Ledger
          </div>
        </div>
      </footer>
    </div>
  );
};
