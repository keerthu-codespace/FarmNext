import React, { useState } from 'react';
import {
  Settings,
  User,
  Globe,
  Bell,
  Cpu,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { RoleBadgeIcon } from '../common/RoleVisual';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const SettingsView: React.FC = () => {
  const { currentRole, setCurrentRole, resetDemoData, language, setLanguage, t } = useApp();
  const [evidenceAlerts, setEvidenceAlerts] = useState(true);
  const [aiRecalculationAlerts, setAiRecalculationAlerts] = useState(true);
  const [resetFeedback, setResetFeedback] = useState(false);

  const handleReset = () => {
    resetDemoData();
    setResetFeedback(true);
    setTimeout(() => setResetFeedback(false), 3000);
  };

  const languageItems = [
    { code: 'en' as const, label: 'English' },
    { code: 'kn' as const, label: 'ಕನ್ನಡ (Kannada)' },
    { code: 'hi' as const, label: 'हिन्दी (Hindi)' },
    { code: 'te' as const, label: 'తెలుగు (Telugu)' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-stone-100 text-stone-700 border border-stone-200">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-[#1B4332]">
                {t('settings.title', 'Platform Settings & Account Profile')}
              </h1>
              <p className="text-xs text-stone-500">
                {t('settings.subtitle', 'Configure active stakeholder profile, regional localization, and agronomic telemetry.')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Role Persona Switcher */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <h3 className="font-display text-sm font-bold text-stone-900 uppercase tracking-wider">
          {t('settings.section_role', '1. ACTIVE STAKEHOLDER PROFILE')}
        </h3>
        <p className="text-xs text-stone-500">
          {t('settings.role_desc', 'Switching profiles adapts the interface views, metric priorities, and operational actions across the platform.')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              role: 'urban_cofarmer' as UserRole,
              title: t('role.urban_cofarmer', 'Urban Co-Farmer'),
              desc: t('settings.urban_desc', 'Focus on transparency photo streams, soil telemetry, and yield estimates.')
            },
            {
              role: 'landowner' as UserRole,
              title: t('role.landowner', 'Landowner'),
              desc: t('settings.landowner_desc', 'Focus on plot land utilization, supervisor sign-offs, and crop rotation.')
            },
            {
              role: 'worker' as UserRole,
              title: t('role.worker', 'Agricultural Worker'),
              desc: t('settings.worker_desc', 'Focus on assigned tasks, photo evidence submission, and Skill Passport.')
            }
          ].map(item => (
            <div
              key={item.role}
              onClick={() => setCurrentRole(item.role)}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                currentRole === item.role
                  ? 'bg-amber-50/50 border-[#1B4332] shadow-xs'
                  : 'bg-stone-50 border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#1B4332] text-amber-300 flex items-center justify-center">
                  <RoleBadgeIcon role={item.role} className="w-5 h-5 text-amber-300" />
                </div>
                {currentRole === item.role && (
                  <span className="text-[10px] font-bold uppercase bg-[#1B4332] text-white px-2 py-0.5 rounded">
                    {t('role.active', 'Active')}
                  </span>
                )}
              </div>
              <h4 className="font-bold text-stone-900 text-sm">{item.title}</h4>
              <p className="text-xs text-stone-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Language & Regional Localization */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <h3 className="font-display text-sm font-bold text-stone-900 uppercase tracking-wider">
          {t('settings.section_lang', '2. LANGUAGE & LOCALIZATION (Karnataka Mandya Cluster)')}
        </h3>

        <div className="flex flex-wrap gap-2 text-xs">
          {languageItems.map(item => (
            <button
              key={item.code}
              onClick={() => setLanguage(item.code)}
              className={`px-4 py-2 rounded-xl font-semibold border transition-all cursor-pointer ${
                language === item.code
                  ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4 text-xs">
        <h3 className="font-display text-sm font-bold text-stone-900 uppercase tracking-wider">
          {t('settings.section_notif', '3. REAL-TIME AI TELEMETRY NOTIFICATIONS')}
        </h3>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
            <div>
              <span className="font-bold text-stone-900 block">{t('settings.notif_evidence', 'Photographic Evidence Alerts')}</span>
              <span className="text-stone-500 text-[11px]">{t('settings.notif_evidence_desc', 'Notify when workers upload new photos with AI consistency scores')}</span>
            </div>
            <input
              type="checkbox"
              checked={evidenceAlerts}
              onChange={e => setEvidenceAlerts(e.target.checked)}
              className="accent-[#1B4332] w-4 h-4 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
            <div>
              <span className="font-bold text-stone-900 block">{t('settings.notif_ai', 'AI Farm Engine Optimization Alerts')}</span>
              <span className="text-stone-500 text-[11px]">{t('settings.notif_ai_desc', 'Notify when weather shift or crop growth trigger workforce schedule recalculations')}</span>
            </div>
            <input
              type="checkbox"
              checked={aiRecalculationAlerts}
              onChange={e => setAiRecalculationAlerts(e.target.checked)}
              className="accent-[#1B4332] w-4 h-4 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Platform State Reset Control */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-display text-sm font-bold text-stone-900 uppercase tracking-wider">
              {t('settings.section_demo', '4. SYSTEM BASELINE RESET')}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {t('settings.demo_desc', 'Reset all assigned workers, evidence records, and crop calculations back to baseline.')}
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{resetFeedback ? 'System State Reset ✓' : 'Reset Platform Data'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
