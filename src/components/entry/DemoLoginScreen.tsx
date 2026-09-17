import React from 'react';
import {
  Sprout,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoLoginScreen: React.FC = () => {
  const { setCurrentView, setCurrentRole, farm, t } = useApp();

  const handleContinueAsLandowner = () => {
    setCurrentRole('landowner');
    setCurrentView('dashboard');
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
            onClick={() => setCurrentView('role_selection')}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors px-3 py-1.5 rounded-lg border border-stone-200 bg-white cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex-1 flex flex-col items-center justify-center">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Step 2 of 2 · Demo Profile Authorization</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-black text-[#1B4332] tracking-tight">
            Welcome back
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            One-click demonstration profile for evaluating the Landowner Management Dashboard.
          </p>
        </div>

        {/* Demo Account Card */}
        <div className="w-full bg-white rounded-2xl border-2 border-[#1B4332]/30 p-6 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-0 opacity-70"></div>

          <div className="relative z-10 space-y-5">
            {/* Header info */}
            <div className="flex items-center gap-4 border-b border-stone-100 pb-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center text-3xl shadow-xs shrink-0">
                🌾
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
                    Role: Landowner
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <UserCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold text-stone-900 mt-1 truncate">
                  Savitri Gowda
                </h2>
                <p className="text-xs text-stone-500">
                  Registered Land Custodian & On-Site Supervisor
                </p>
              </div>
            </div>

            {/* Farm Plot Details associated with Savitri Gowda */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-stone-700">
                <span className="text-stone-500 font-medium">Role:</span>
                <strong className="text-stone-900 font-bold">Landowner</strong>
              </div>
              <div className="flex items-center justify-between text-stone-700">
                <span className="text-stone-500 font-medium">Name:</span>
                <strong className="text-stone-900 font-bold">Savitri Gowda</strong>
              </div>
              <div className="flex items-center justify-between text-stone-700">
                <span className="text-stone-500 font-medium">Land:</span>
                <span className="font-semibold text-stone-900 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#1B4332]" />
                  2.0 Acres, Mandya, Karnataka
                </span>
              </div>
              <div className="flex items-center justify-between text-stone-700">
                <span className="text-stone-500 font-medium">Current stage:</span>
                <span className="text-amber-800 font-bold">Day 45 (Pegging & Flower Initiation)</span>
              </div>
            </div>

            {/* Explanatory note */}
            <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl text-center">
              <p className="text-[11px] text-amber-900 font-medium">
                Demonstration Profile · Prototype simulation for judging and evaluation
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-2.5 pt-1">
              <button
                onClick={handleContinueAsLandowner}
                id="enter-landowner-demo-btn"
                className="w-full py-3.5 bg-[#1B4332] hover:bg-[#143427] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Enter Landowner Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-300" />
              </button>

              <button
                onClick={() => setCurrentView('role_selection')}
                className="w-full py-2.5 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs rounded-xl border border-stone-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-4 px-4 text-center text-xs text-stone-500">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>FARMNEXT © 2026 · Demo Landowner Login</span>
          <span className="text-stone-400">Targeting Savitri Gowda (Green Valley Farm, Mandya)</span>
        </div>
      </footer>
    </div>
  );
};
