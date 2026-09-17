import React from 'react';
import {
  MapPin,
  Calendar,
  Activity,
  Droplets,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FarmOverviewCard: React.FC = () => {
  const { farm, setCurrentView, currentRole, t } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
      {/* Top Banner / Farm Visual Header */}
      <div className="relative h-48 sm:h-56 bg-stone-900 overflow-hidden">
        <img
          src={farm.imageUrl}
          alt={farm.name}
          className="w-full h-full object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="bg-[#1B4332]/90 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            {t('farm.stage', 'Stage')}: {farm.currentStage} ({t('nav.cycle_day', 'Day')} {farm.currentDay}/{farm.totalDays})
          </span>
          <span className="bg-[#D97706]/90 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {farm.areaAcres} {t('yield.acres', 'Acres')} · {farm.currentCrop}
          </span>
        </div>

        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-xs text-[#1B4332] text-xs font-bold px-2.5 py-1 rounded-full border border-stone-200 flex items-center gap-1 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            {t('farm.verified_plot', 'Verified Plot')}
          </span>
        </div>

        {/* Title Info overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight leading-none text-white drop-shadow-md">
              {farm.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-stone-200 mt-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{farm.location}</span>
              <span>•</span>
              <span>{t('farm.landowner', 'Landowner')}: {farm.landownerName}</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('my_farm')}
            id="view-farm-details-btn"
            className="px-3.5 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold rounded-lg border border-white/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>{t('farm.view_farm_details', 'View Farm Details')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Farm Progress Tracker Bar */}
      <div className="bg-[#FAF9F5] px-5 py-3.5 border-b border-stone-200">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-semibold text-stone-700 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-[#1B4332]" />
            {t('farm.cycle_progress', 'Seasonal Farm Cycle Progress')}
          </span>
          <span className="font-bold text-[#1B4332] text-sm">
            {farm.progressPercent}% {t('farm.completed', 'Completed')}
          </span>
        </div>
        <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#1B4332] h-full rounded-full transition-all duration-500"
            style={{ width: `${farm.progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Key Farm Vitals Grid */}
      <div className="p-5 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        {/* 1. Crop Health */}
        <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
          <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wide">
            {t('farm.crop_health', 'Crop Health')}
          </div>
          <div className="text-base font-bold text-emerald-950 mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{farm.cropHealth}</span>
          </div>
          <div className="text-[10px] text-emerald-700 mt-1">
            {t('farm.no_fungal', 'No fungal spread')}
          </div>
        </div>

        {/* 2. Water Status */}
        <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
          <div className="text-[11px] font-semibold text-blue-800 uppercase tracking-wide">
            {t('farm.water_status', 'Water Status')}
          </div>
          <div className="text-base font-bold text-blue-950 mt-0.5 flex items-center gap-1">
            <Droplets className="w-4 h-4 text-blue-600" />
            <span>{farm.waterStatus}</span>
          </div>
          <div className="text-[10px] text-blue-700 mt-1">
            {t('farm.drip_moisture', 'Drip moisture 68%')}
          </div>
        </div>

        {/* 3. Active Workers */}
        <div className="p-3 bg-orange-50/70 border border-orange-200 rounded-xl">
          <div className="text-[11px] font-semibold text-orange-800 uppercase tracking-wide">
            {t('farm.active_workers', 'Active Workers')}
          </div>
          <div className="text-base font-bold text-orange-950 mt-0.5 flex items-center gap-1">
            <Users className="w-4 h-4 text-orange-600" />
            <span>{farm.activeWorkersCount} / {farm.totalWorkersAllocated}</span>
          </div>
          <div className="text-[10px] text-orange-700 mt-1">
            {t('farm.skill_verified', 'All Skill-verified')}
          </div>
        </div>

        {/* 4. Tasks Completed */}
        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl">
          <div className="text-[11px] font-semibold text-amber-800 uppercase tracking-wide">
            {t('farm.tasks_completed', 'Tasks Completed')}
          </div>
          <div className="text-base font-bold text-amber-950 mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
            <span>{farm.tasksCompleted} / {farm.totalTasks}</span>
          </div>
          <div className="text-[10px] text-amber-700 mt-1">
            {t('farm.on_track', 'On scheduled track')}
          </div>
        </div>

        {/* 5. Next Activity */}
        <div className="p-3 bg-stone-100 border border-stone-200 rounded-xl col-span-2 sm:col-span-1">
          <div className="text-[11px] font-semibold text-stone-600 uppercase tracking-wide">
            {t('farm.next_activity', 'Next Activity')}
          </div>
          <div className="text-xs font-bold text-stone-900 mt-0.5 truncate" title={farm.nextActivity}>
            {farm.nextActivity}
          </div>
          <div className="text-[10px] text-[#1B4332] font-semibold mt-1">
            {t('farm.due_2_days', 'Due in 2 days')}
          </div>
        </div>
      </div>
    </div>
  );
};
