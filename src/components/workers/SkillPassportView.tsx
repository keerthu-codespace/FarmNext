import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Star,
  Layers,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Camera,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WorkerProfile } from '../../types';

export const SkillPassportView: React.FC = () => {
  const {
    workers,
    selectedWorkerForPassport,
    setSelectedWorkerForPassport,
    setSelectedEvidenceForDetail,
    setCurrentView,
    t
  } = useApp();

  // Default to Ramesh Kumar if none selected
  const activeWorker: WorkerProfile = selectedWorkerForPassport || workers[0];

  return (
    <div className="space-y-6">
      {/* Top Header with Worker Selector */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
            <Award className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl font-bold text-[#1B4332]">
                {t('passport.title', 'Agricultural Skill Passport')}
              </h1>
              <span className="text-[10px] uppercase font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
                {t('passport.verified_ledger', 'Verified Credential Ledger')}
              </span>
            </div>
            <p className="text-xs text-stone-500">
              {t('passport.subtitle', 'Portable agricultural identity built on photographic proof of work, crop-specific verifications, and supervisor validations.')}
            </p>
          </div>
        </div>

        {/* Worker Switcher */}
        <div className="flex items-center gap-2 bg-[#FAF9F5] p-2 rounded-xl border border-stone-200">
          <span className="text-xs font-semibold text-stone-600">{t('passport.select_worker', 'Select Worker')}:</span>
          <select
            value={activeWorker.id}
            onChange={e => {
              const w = workers.find(item => item.id === e.target.value);
              if (w) setSelectedWorkerForPassport(w);
            }}
            className="text-xs font-bold text-[#1B4332] bg-white px-3 py-1.5 rounded-lg border border-stone-200 outline-hidden"
          >
            {workers.map(w => (
              <option key={w.id} value={w.id}>
                {w.name} ({w.yearsOfExperience} {t('workers.yrs_exp', 'yrs exp')} · {t('passport.score_short', 'Score')}: {w.successScore})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* PASSPORT HERO CREDENTIAL CARD */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#24523E] to-[#143427] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border-4 border-amber-400/40">
        {/* Background Watermark Pattern */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none">
          <Award className="w-80 h-80 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Worker Avatar & Identity */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={activeWorker.avatarUrl}
                alt={activeWorker.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-3 border-amber-400 shadow-lg"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-2 -right-2 bg-amber-500 text-stone-950 p-1.5 rounded-xl shadow-md">
                <ShieldCheck className="w-4 h-4 font-bold" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold tracking-widest text-amber-300 uppercase">
                {t('passport.banner_badge', 'FARMNEXT VERIFIED AGRI-PASSPORT')}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-white">
                {activeWorker.name.toUpperCase()}
              </h2>
              <div className="flex items-center gap-2 text-xs text-stone-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{activeWorker.location}</span>
                <span>•</span>
                <span>ID: <strong>FN-AGRI-{activeWorker.id.slice(-6).toUpperCase()}</strong></span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeWorker.badges.map(b => (
                  <span
                    key={b}
                    className="text-[10px] font-semibold bg-white/15 border border-white/20 text-white px-2 py-0.5 rounded-md"
                  >
                    ✦ {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Passport Vitals */}
          <div className="grid grid-cols-3 gap-3 bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center w-full md:w-auto">
            <div className="px-3">
              <span className="text-[10px] text-stone-300 uppercase font-semibold block">{t('passport.experience', 'Experience')}</span>
              <span className="font-display font-black text-xl text-white block mt-0.5">
                {activeWorker.yearsOfExperience} <span className="text-xs font-normal">{t('passport.years_unit', 'Years')}</span>
              </span>
            </div>
            <div className="px-3 border-x border-white/15">
              <span className="text-[10px] text-stone-300 uppercase font-semibold block">{t('workers.verified_jobs', 'Verified Jobs')}</span>
              <span className="font-display font-black text-xl text-amber-400 block mt-0.5">
                {activeWorker.verifiedJobs}
              </span>
            </div>
            <div className="px-3">
              <span className="text-[10px] text-stone-300 uppercase font-semibold block">{t('workers.success_score', 'Success Score')}</span>
              <span className="font-display font-black text-xl text-emerald-400 block mt-0.5">
                {activeWorker.successScore} <span className="text-xs font-normal">/100</span>
              </span>
            </div>
          </div>
        </div>

        {/* Philosophy Note Banner */}
        <div className="mt-6 pt-4 border-t border-white/15 text-xs text-stone-300 flex items-center justify-between flex-wrap gap-2">
          <span className="italic">
            {t('passport.quote', '“The Skill Passport evolves from verified work history.”')}
          </span>
          <span className="text-amber-300 font-semibold text-[11px]">
            {t('passport.protocol_tag', 'Autonomous Agricultural Verification Protocol')}
          </span>
        </div>
      </div>

      {/* VERIFICATION TIMELINE SEQUENCE */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
        <h3 className="font-display text-sm font-bold text-stone-900 uppercase tracking-wider">
          {t('passport.how_evolves', 'HOW THE SKILL PASSPORT EVOLVES')}
        </h3>

        <div className="p-4 bg-[#FAF9F5] rounded-xl border border-stone-200 flex items-center justify-around text-center flex-wrap gap-4">
          <div className="space-y-1">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-sm mx-auto shadow-2xs">
              1
            </div>
            <div className="font-bold text-xs text-stone-900">{t('passport.step1_title', 'Job Completed')}</div>
            <p className="text-[10px] text-stone-500 max-w-[130px]">
              {t('passport.step1_desc', 'Worker performs task (e.g., Weeding on Unit A23)')}
            </p>
          </div>

          <div className="text-stone-300 font-bold text-lg hidden sm:block">↓</div>

          <div className="space-y-1">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm mx-auto shadow-2xs">
              2
            </div>
            <div className="font-bold text-xs text-stone-900">{t('passport.step2_title', 'Photo & AI Verified')}</div>
            <p className="text-[10px] text-stone-500 max-w-[130px]">
              {t('passport.step2_desc', 'AI consistency check + supervisor field validation')}
            </p>
          </div>

          <div className="text-stone-300 font-bold text-lg hidden sm:block">↓</div>

          <div className="space-y-1">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#1B4332] flex items-center justify-center font-bold text-sm mx-auto shadow-2xs">
              3
            </div>
            <div className="font-bold text-xs text-stone-900">{t('passport.step3_title', 'Skill Profile Updated')}</div>
            <p className="text-[10px] text-stone-500 max-w-[130px]">
              {t('passport.step3_desc', 'Reputation score increments & badge tier ascends')}
            </p>
          </div>
        </div>
      </div>

      {/* 2 COLUMNS: SKILLS MATRIX & VERIFIED WORK HISTORY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Crop Skills & Mastery Levels */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="font-display text-sm font-bold text-stone-900">
                {t('passport.competencies_title', 'Verified Skill Competencies')}
              </h3>
            </div>
            <span className="text-xs text-stone-500">
              {activeWorker.skills.length} {t('passport.core_domains', 'core domains')}
            </span>
          </div>

          <div className="space-y-3">
            {activeWorker.skills.map(sk => {
              const percentage =
                sk.level === 'Expert' ? 95 : sk.level === 'Advanced' ? 80 : sk.level === 'Intermediate' ? 60 : 40;

              return (
                <div key={sk.name} className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-900">{sk.name}</span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.2 rounded ${
                          sk.level === 'Expert'
                            ? 'bg-emerald-100 text-emerald-800'
                            : sk.level === 'Advanced'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {sk.level}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        ({sk.verifiedJobsCount} {t('reports.of_tasks', 'jobs')})
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        sk.level === 'Expert'
                          ? 'bg-[#1B4332]'
                          : sk.level === 'Advanced'
                          ? 'bg-blue-600'
                          : 'bg-stone-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Crop Expertise Badges */}
          <div className="pt-2">
            <span className="text-xs font-bold text-stone-700 block mb-2">{t('workers.crop_expertise', 'Verified Crop Expertise')}:</span>
            <div className="flex flex-wrap gap-2">
              {activeWorker.cropExpertise.map(crop => (
                <span
                  key={crop}
                  className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-xs font-semibold"
                >
                  🌿 {crop}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Verified Work History Ledger */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-700" />
              <h3 className="font-display text-sm font-bold text-stone-900">
                {t('passport.history_title', 'Verified Work History Ledger')}
              </h3>
            </div>
            <span className="text-xs text-stone-500">
              {t('passport.audit_verified', 'Audit Verified')}
            </span>
          </div>

          <div className="space-y-3">
            {activeWorker.workHistory.map(wh => (
              <div
                key={wh.id}
                className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">
                      {wh.taskType}
                    </h4>
                    <p className="text-stone-500 text-[11px]">
                      {t('evidence.farm_label', 'Farm')}: <strong>{wh.farmName}</strong> ({wh.crop}) · {wh.completedDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200 font-bold text-[11px]">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                    <span>{wh.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 text-stone-600 border-t border-stone-200/60">
                  <span>{t('evidence.supervisor', 'Supervisor')}: {wh.supervisor}</span>
                  <span className="font-mono text-[10px] text-stone-400">
                    {wh.verificationHash}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
            <div className="font-bold text-emerald-950 flex items-center gap-1.5 mb-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{t('passport.stamp_title', 'Immutable Verification Stamp')}</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-snug">
              {t('passport.stamp_desc', 'Every job record is cryptographically stamped upon supervisor signature and image validation, ensuring fair compensation and reputation.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
