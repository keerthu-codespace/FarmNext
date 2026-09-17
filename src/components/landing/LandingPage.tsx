import React from 'react';
import {
  Sprout,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Users,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Sparkles,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';
import { FarmNextLogo } from '../common/FarmNextLogo';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const LandingPage: React.FC = () => {
  const {
    setShowLanding,
    setCurrentRole,
    setRegistrationRole,
    setRegistrationModalOpen,
    setCurrentView,
    t
  } = useApp();

  const handleSelectRole = (role: UserRole) => {
    setRegistrationRole(role);
    setRegistrationModalOpen(true);
  };

  const handleDirectDemo = (role: UserRole, view: string = 'dashboard') => {
    setCurrentRole(role);
    setCurrentView(view);
    setShowLanding(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1C1917] flex flex-col justify-between">
      {/* Top Bar */}
      <nav className="border-b border-stone-200/80 bg-white/90 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FarmNextLogo variant="full" size="md" />
            <span className="text-[11px] font-semibold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full hidden sm:inline-block">
              Co-Farming Platform
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => handleDirectDemo('urban_cofarmer', 'dashboard')}
              className="px-4 py-2 text-xs font-semibold text-[#1B4332] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all cursor-pointer"
            >
              Direct Platform Access →
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-14 flex-1 flex flex-col justify-center">
        {/* Tagline & Headline */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#1B4332] text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('landing.tagline_pill', 'AI-Assisted Co-Farming Protocol')}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#1B4332] tracking-tight leading-[1.1] mb-4">
            {t('app.title', 'FARMNEXT')}
          </h1>

          <p className="font-display text-xl sm:text-2xl font-semibold text-stone-700 mb-4 leading-snug">
            {t('landing.headline', '“Bridging modern participation with agricultural roots.”')}
          </p>

          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {t('landing.description', 'Connect land, agricultural skills and urban participation through AI-assisted farm management, transparent task tracking, and evidence-verified workflows.')}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('role-selector');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-[#1B4332] hover:bg-[#143427] text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{t('landing.get_started', 'Get Started')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleDirectDemo('urban_cofarmer', 'ai_planner')}
              className="px-5 py-3 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-semibold rounded-xl text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-blue-600" />
              <span>{t('landing.explore_ai_planner', 'Explore AI Planner')}</span>
            </button>
          </div>
        </div>

        {/* 3 Core Roles Section */}
        <div id="role-selector" className="pt-6">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
              {t('landing.who_are_you', 'Who are you?')}
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              {t('landing.select_role_desc', 'Select your role to start or experience that perspective in the live demo')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. Landowner */}
            <div
              onClick={() => handleSelectRole('landowner')}
              className="group bg-white rounded-2xl p-6 border-2 border-stone-200 hover:border-amber-500 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -z-0 opacity-60 group-hover:scale-110 transition-transform"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-amber-100/80 text-amber-900 flex items-center justify-center text-3xl mb-4 shadow-2xs">
                  🌾
                </div>
                <div className="text-[11px] font-bold tracking-wider text-amber-800 uppercase mb-1">
                  {t('landing.land_custodian', 'Land Custodian')}
                </div>
                <h3 className="font-display text-xl font-bold text-stone-900 mb-2">
                  {t('role.landowner', 'LANDOWNER')}
                </h3>
                <p className="text-sm text-stone-600 italic font-medium mb-3">
                  {t('landing.landowner_quote', '“I have agricultural land”')}
                </p>
                <p className="text-xs text-stone-500 leading-relaxed mb-4">
                  {t('landing.landowner_card_desc', 'Put underutilized farmland to productive use. Get AI seasonal planning, vetted agricultural workers, and transparent co-farming management.')}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-800">
                <span>{t('landing.start_land_reg', 'Start Land Registration')}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 2. Agricultural Worker */}
            <div
              onClick={() => handleSelectRole('worker')}
              className="group bg-white rounded-2xl p-6 border-2 border-stone-200 hover:border-orange-500 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -z-0 opacity-60 group-hover:scale-110 transition-transform"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-orange-100/80 text-orange-900 flex items-center justify-center text-3xl mb-4 shadow-2xs">
                  👨🌾
                </div>
                <div className="text-[11px] font-bold tracking-wider text-orange-800 uppercase mb-1">
                  {t('landing.skilled_talent', 'Skilled Agri-Talent')}
                </div>
                <h3 className="font-display text-xl font-bold text-stone-900 mb-2">
                  {t('role.worker', 'AGRICULTURAL WORKER')}
                </h3>
                <p className="text-sm text-stone-600 italic font-medium mb-3">
                  {t('landing.worker_quote', '“I provide agricultural skills and labour”')}
                </p>
                <p className="text-xs text-stone-500 leading-relaxed mb-4">
                  {t('landing.worker_card_desc', 'Build a verified Agricultural Skill Passport. Get matched to quality farm tasks with fair wages, photographic proof of work, and skill progression.')}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-orange-800">
                <span>{t('landing.create_skill_passport', 'Create Skill Passport')}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 3. Urban Co-Farmer */}
            <div
              onClick={() => handleSelectRole('urban_cofarmer')}
              className="group bg-white rounded-2xl p-6 border-2 border-stone-200 hover:border-emerald-600 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-0 opacity-60 group-hover:scale-110 transition-transform"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100/80 text-emerald-900 flex items-center justify-center text-3xl mb-4 shadow-2xs">
                  👩💻
                </div>
                <div className="text-[11px] font-bold tracking-wider text-emerald-800 uppercase mb-1">
                  {t('landing.active_participant', 'Active Participant')}
                </div>
                <h3 className="font-display text-xl font-bold text-stone-900 mb-2">
                  {t('role.urban_cofarmer', 'URBAN CO-FARMER')}
                </h3>
                <p className="text-sm text-stone-600 italic font-medium mb-3">
                  {t('landing.urban_quote', '“I want to participate in agriculture”')}
                </p>
                <p className="text-xs text-stone-500 leading-relaxed mb-4">
                  {t('landing.urban_card_desc', 'Co-farm real plots remotely with transparent activity tracking, weekly photo evidence, AI yield forecasts, and occasional farm visits.')}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#1B4332]">
                <span>{t('landing.register_cofarmer', 'Register as Co-Farmer')}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Platform Quick Access */}
        <div className="mt-10 bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Direct Feature Navigation (Mandya Groundnut Co-Farming Farm)
              </h4>
            </div>
            <span className="text-[11px] text-stone-500 font-medium">
              Click any module to open:
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <button
              onClick={() => handleDirectDemo('urban_cofarmer', 'dashboard')}
              className="p-2.5 rounded-xl bg-stone-50 hover:bg-[#1B4332] hover:text-white text-stone-800 border border-stone-200 text-left transition-all cursor-pointer font-medium flex items-center gap-2"
            >
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>Co-Farmer Dashboard</span>
            </button>
            <button
              onClick={() => handleDirectDemo('urban_cofarmer', 'ai_planner')}
              className="p-2.5 rounded-xl bg-stone-50 hover:bg-[#1B4332] hover:text-white text-stone-800 border border-stone-200 text-left transition-all cursor-pointer font-medium flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-emerald-600" />
              <span>AI Farm & Workforce Planner</span>
            </button>
            <button
              onClick={() => handleDirectDemo('worker', 'skill_passport')}
              className="p-2.5 rounded-xl bg-stone-50 hover:bg-[#1B4332] hover:text-white text-stone-800 border border-stone-200 text-left transition-all cursor-pointer font-medium flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>Worker Skill Passport</span>
            </button>
            <button
              onClick={() => handleDirectDemo('urban_cofarmer', 'monitoring')}
              className="p-2.5 rounded-xl bg-stone-50 hover:bg-[#1B4332] hover:text-white text-stone-800 border border-stone-200 text-left transition-all cursor-pointer font-medium flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <span>Farm Monitoring & Evidence</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-4 px-4 text-center text-xs text-stone-500">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>{t('landing.footer_copyright', 'FARMNEXT © 2026 · AI-Assisted Co-Farming Protocol')}</span>
          <span className="text-stone-400">
            Field Telemetry & Agronomic Models Calibrated for Karnataka Soil Profiles
          </span>
        </div>
      </footer>
    </div>
  );
};
