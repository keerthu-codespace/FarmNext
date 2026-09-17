import React, { useState } from 'react';
import {
  Sprout,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RoleSelectionScreen: React.FC = () => {
  const { setCurrentView, setCurrentRole, t } = useApp();
  const [selectedRole, setSelectedRole] = useState<'landowner' | 'worker' | 'urban_cofarmer'>('landowner');
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const handleSelectRole = (role: 'landowner' | 'worker' | 'urban_cofarmer') => {
    setSelectedRole(role);
    if (role !== 'landowner') {
      setInfoMessage(
        role === 'worker'
          ? 'The Agricultural Worker live flow is scheduled next. For this 2-minute demonstration, Landowner is the primary end-to-end pathway.'
          : 'The Urban Co-Farmer live flow is scheduled next. For this 2-minute demonstration, Landowner is the primary end-to-end pathway.'
      );
    } else {
      setInfoMessage(null);
    }
  };

  const handleContinue = () => {
    if (selectedRole === 'landowner') {
      setCurrentRole('landowner');
      setCurrentView('demo_login');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1C1917] flex flex-col justify-between selection:bg-amber-200">
      {/* Top Header */}
      <header className="border-b border-stone-200/80 bg-white/90 backdrop-blur-xs sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-[#EAB308] flex items-center justify-center font-bold text-xl shadow-xs">
              <Sprout className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="font-display font-black text-2xl tracking-tight text-[#1B4332]">
                {t('app.title', 'FARMNEXT')}
              </span>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('welcome')}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors px-3 py-1.5 rounded-lg border border-stone-200 bg-white cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('common.back', 'Back')}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-14 flex-1 flex flex-col justify-center">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1B4332] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Step 1 of 2 · Ecosystem Participant</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#1B4332] tracking-tight">
            How would you like to participate?
          </h1>

          <p className="text-sm sm:text-base text-stone-600 mt-3">
            Select your role to explore the FarmNext co-farming ecosystem and seasonal planning workflows.
          </p>
        </div>

        {/* 3 Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto w-full">
          {/* 1. Landowner (PRIMARY WORKING PATH) */}
          <div
            id="role-card-landowner"
            onClick={() => handleSelectRole('landowner')}
            className={`rounded-2xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between relative bg-white shadow-xs ${
              selectedRole === 'landowner'
                ? 'border-[#1B4332] ring-2 ring-[#1B4332]/20 shadow-lg'
                : 'border-stone-200 hover:border-stone-400 hover:shadow-md'
            }`}
          >
            {/* Primary Demo Path Badge */}
            <div className="absolute top-3.5 right-3.5">
              <span className="bg-[#1B4332] text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-800">
                Primary Demo Flow
              </span>
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-100/80 text-amber-900 flex items-center justify-center text-3xl mb-4 shadow-2xs">
                🌾
              </div>
              <div className="text-[11px] font-bold tracking-wider text-amber-800 uppercase mb-1">
                Land Custodian
              </div>
              <h2 className="font-display text-xl font-bold text-stone-900 mb-3">
                Landowner
              </h2>

              {/* Exact Bullets */}
              <ul className="space-y-2 text-xs text-stone-600 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>List and manage agricultural land</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Monitor farming progress</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectRole('landowner');
                  handleContinue();
                }}
                id="continue-as-landowner-btn"
                className="w-full py-2.5 bg-[#1B4332] hover:bg-[#143427] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Continue as Landowner</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </button>
            </div>
          </div>

          {/* 2. Agricultural Worker */}
          <div
            id="role-card-worker"
            onClick={() => handleSelectRole('worker')}
            className={`rounded-2xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between relative bg-white shadow-xs ${
              selectedRole === 'worker'
                ? 'border-orange-500 ring-2 ring-orange-400/20 shadow-md'
                : 'border-stone-200 hover:border-stone-300'
            }`}
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-orange-100/80 text-orange-900 flex items-center justify-center text-3xl mb-4 shadow-2xs">
                👨🌾
              </div>
              <div className="text-[11px] font-bold tracking-wider text-orange-800 uppercase mb-1">
                Agri-Specialist
              </div>
              <h2 className="font-display text-xl font-bold text-stone-900 mb-3">
                Agricultural Worker
              </h2>

              {/* Exact Bullets */}
              <ul className="space-y-2 text-xs text-stone-600 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <span>Find suitable farm work</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <span>Build a verified work profile</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <div className="py-2.5 px-3 bg-stone-100 text-stone-500 font-semibold text-xs rounded-xl text-center flex items-center justify-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>Demo flow coming soon</span>
              </div>
            </div>
          </div>

          {/* 3. Urban Co-Farmer */}
          <div
            id="role-card-urban-cofarmer"
            onClick={() => handleSelectRole('urban_cofarmer')}
            className={`rounded-2xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between relative bg-white shadow-xs ${
              selectedRole === 'urban_cofarmer'
                ? 'border-blue-500 ring-2 ring-blue-400/20 shadow-md'
                : 'border-stone-200 hover:border-stone-300'
            }`}
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100/80 text-emerald-900 flex items-center justify-center text-3xl mb-4 shadow-2xs">
                👩💻
              </div>
              <div className="text-[11px] font-bold tracking-wider text-emerald-800 uppercase mb-1">
                Urban Participant
              </div>
              <h2 className="font-display text-xl font-bold text-stone-900 mb-3">
                Urban Co-Farmer
              </h2>

              {/* Exact Bullets */}
              <ul className="space-y-2 text-xs text-stone-600 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Participate in farming opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Monitor farm progress remotely</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <div className="py-2.5 px-3 bg-stone-100 text-stone-500 font-semibold text-xs rounded-xl text-center flex items-center justify-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>Demo flow coming soon</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notice for non-landowner selection */}
        {infoMessage && (
          <div className="mt-6 max-w-lg mx-auto bg-amber-50 border border-amber-300 rounded-xl p-3 text-xs text-amber-900 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{infoMessage}</span>
          </div>
        )}

        {/* Back and Direct Action Controls */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            onClick={() => setCurrentView('welcome')}
            className="px-5 py-2.5 border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Welcome</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-4 px-4 text-center text-xs text-stone-500">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>FARMNEXT © 2026 · Role Selection</span>
          <span className="text-stone-400">Green Valley Farm (2 Acres · Mandya, Karnataka)</span>
        </div>
      </footer>
    </div>
  );
};
