import React, { useState } from 'react';
import {
  Cpu,
  Sparkles,
  Users,
  Calendar,
  Layers,
  CheckCircle2,
  Clock,
  ArrowRight,
  RefreshCw,
  Sliders,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AiFarmPlanner: React.FC = () => {
  const {
    farm,
    workforcePlan,
    workers,
    setCurrentView,
    recalculateAiPlan,
    isAiRecalculating,
    setSelectedWorkerForPassport,
    t
  } = useApp();

  const [selectedCrop, setSelectedCrop] = useState<string>('Groundnut (KDG-123 High-Yield)');
  const [selectedSoil, setSelectedSoil] = useState<string>('Red Loamy Soil');
  const [selectedWater, setSelectedWater] = useState<string>('Borewell + Drip Irrigation');

  const handleRecalculate = () => {
    recalculateAiPlan(selectedCrop, selectedSoil);
  };

  const getWorkerName = (workerId: string) => {
    const w = workers.find(w => w.id === workerId);
    return w ? w.name : workerId;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-[#1B4332]">
                {t('planner.title', 'AI Farm & Workforce Planner')}
              </h1>
              <p className="text-xs text-stone-500">
                {t('planner.subtitle', 'Predictive agronomy engine calculating seasonal labor requirements, skills matching, and task milestones.')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRecalculate}
            disabled={isAiRecalculating}
            id="run-ai-optimization-btn"
            className="px-4 py-2 bg-[#1B4332] hover:bg-[#143427] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-75"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAiRecalculating ? 'animate-spin' : ''}`} />
            <span>{isAiRecalculating ? 'Analyzing farm conditions...' : 'Run AI Optimization'}</span>
          </button>
        </div>
      </div>

      {/* Loading state indicator */}
      {isAiRecalculating && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-xs text-amber-950 flex items-center gap-3 animate-pulse">
          <RefreshCw className="w-5 h-5 text-amber-700 animate-spin shrink-0" />
          <div>
            <div className="font-bold text-sm text-amber-900">Analyzing farm conditions...</div>
            <div className="text-[11px] text-amber-800">Recalibrating labor demand curves across Mandya plot telemetry, Day 45 pegging schedule, and labor cluster skills.</div>
          </div>
        </div>
      )}

      {/* SECTION 1: INPUTS PANEL */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#D97706]" />
            <h3 className="font-display text-sm font-bold text-stone-900 uppercase tracking-wider">
              1. {t('planner.inputs_title', 'INPUTS (Farm Operational Baseline)')}
            </h3>
          </div>
          <span className="text-[11px] text-stone-500 font-medium">
            {t('planner.regional_model', 'Karnataka Regional Model (Mandya Tract)')}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {/* Farm Area */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-stone-500 font-medium text-[11px] block">{t('farm.cultivated_area', 'Farm Area')}</span>
            <span className="font-bold text-stone-900 text-sm mt-0.5 block">{farm.areaAcres} Acres</span>
            <span className="text-[10px] text-stone-400">Plot Unit A & B</span>
          </div>

          {/* Target Crop */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-stone-500 font-medium text-[11px] block">{t('planner.target_crop', 'Target Crop')}</span>
            <span className="font-bold text-[#1B4332] text-sm mt-0.5 block truncate" title={farm.currentCrop}>
              {farm.currentCrop.split(' ')[0]}
            </span>
            <span className="text-[10px] text-stone-400">{t('crop.oilseed_legume', 'Oilseed Legume')}</span>
          </div>

          {/* Soil Type */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-stone-500 font-medium text-[11px] block">{t('farm.soil_category', 'Soil Type')}</span>
            <span className="font-bold text-stone-900 text-sm mt-0.5 block truncate" title={farm.soilType}>
              Red Loamy Soil
            </span>
            <span className="text-[10px] text-stone-400">{t('farm.high_phosphorus', 'High Phosphorus')}</span>
          </div>

          {/* Water Availability */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-stone-500 font-medium text-[11px] block">{t('planner.water_avail', 'Water Availability')}</span>
            <span className="font-bold text-stone-900 text-sm mt-0.5 block">Borewell + Drip</span>
            <span className="text-[10px] text-stone-400">{t('farm.adequate', 'Adequate')}</span>
          </div>

          {/* Season */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-stone-500 font-medium text-[11px] block">{t('planner.season_label', 'Season')}</span>
            <span className="font-bold text-stone-900 text-sm mt-0.5 block">Kharif – Rabi 2026</span>
            <span className="text-[10px] text-stone-400">120 {t('farm.days_unit', 'Days')} duration</span>
          </div>

          {/* Current Stage */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-stone-500 font-medium text-[11px] block">{t('overview.stage', 'Current Stage')}</span>
            <span className="font-bold text-emerald-800 text-sm mt-0.5 block">{farm.currentStage}</span>
            <span className="text-[10px] text-stone-400">{t('timeline.day_unit', 'Day')} 45 of 120</span>
          </div>

          {/* Previous Crop */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-stone-500 font-medium text-[11px] block">{t('planner.prev_crop', 'Previous Crop')}</span>
            <span className="font-bold text-stone-900 text-sm mt-0.5 block">Ragi (Finger Millet)</span>
            <span className="text-[10px] text-stone-400">Harvested June 2026</span>
          </div>

          {/* Worker Availability */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-stone-500 font-medium text-[11px] block">{t('planner.worker_pool', 'Worker Pool')}</span>
            <span className="font-bold text-orange-900 text-sm mt-0.5 block">5 {t('planner.verified_avail', 'Verified Available')}</span>
            <span className="text-[10px] text-stone-400">Mandya Cluster</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: AI FARM ENGINE BANNER */}
      <div className="bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#1B4332] text-white p-5 rounded-2xl shadow-md space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h3 className="font-display text-base font-bold tracking-tight">
              {t('planner.banner_title', 'AI FARM ENGINE · WORKFORCE OPTIMIZATION MATRIX')}
            </h3>
          </div>
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-semibold border border-white/30 backdrop-blur-xs">
            {t('planner.model_confidence', 'Model Confidence: 94.2%')}
          </span>
        </div>
        <p className="text-xs text-stone-200 max-w-3xl leading-relaxed">
          {t('planner.banner_desc', 'The engine maps vegetative growth curves to labour requirements. Weeding during the pegging stage is critical to ensure pod penetration without root damage.')}
        </p>
      </div>

      {/* SECTION 3: WORKFORCE PLAN OUTPUT */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#1B4332]" />
            <h3 className="font-display text-sm font-bold text-stone-900 uppercase tracking-wider">
              2. {t('planner.schedule_title', 'WORKFORCE PLAN (Seasonal Schedule)')}
            </h3>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            {t('planner.total_tasks_stat', 'Total 24 tasks · 18 completed')}
          </span>
        </div>

        {/* Weekly Plan List */}
        <div className="space-y-3">
          {workforcePlan.map(plan => {
            const isCurrent = plan.status === 'Current';
            const isCompleted = plan.status === 'Completed';

            return (
              <div
                key={plan.weekNumber}
                className={`p-4 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-amber-50/50 border-amber-400 ring-2 ring-amber-300/40 shadow-xs'
                    : isCompleted
                    ? 'bg-stone-50/70 border-stone-200 opacity-90'
                    : 'bg-white border-stone-200'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  {/* Left: Week & Activity */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          isCurrent
                            ? 'bg-[#D97706] text-white'
                            : isCompleted
                            ? 'bg-emerald-700 text-white'
                            : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {plan.weekLabel}
                      </span>
                      <h4 className="font-bold text-stone-900 text-sm">
                        {plan.activity}
                      </h4>
                    </div>
                    <p className="text-xs text-stone-500">
                      {plan.notes}
                    </p>
                  </div>

                  {/* Right: Status Pill */}
                  <div>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {t('timeline.completed', 'Completed')}
                      </span>
                    )}
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-200 px-2.5 py-1 rounded-full animate-pulse">
                        <Clock className="w-3.5 h-3.5" /> {t('planner.action_req', 'Action Required Now')}
                      </span>
                    )}
                    {!isCompleted && !isCurrent && (
                      <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
                        {t('planner.upcoming_stage', 'Upcoming Stage')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Task Metrics Row */}
                <div className="mt-3 pt-3 border-t border-stone-200/70 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-stone-500 block text-[11px]">{t('planner.req_workers', 'Required Workers')}</span>
                    <span className="font-bold text-stone-900 text-sm">
                      {plan.requiredWorkers} {t('workers.title', 'workers')}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-500 block text-[11px]">{t('planner.rec_skills', 'Recommended Skills')}</span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {plan.recommendedSkills.map(sk => (
                        <span key={sk} className="bg-stone-100 text-stone-700 px-1.5 py-0.2 rounded text-[10px] font-medium">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-stone-500 block text-[11px]">{t('planner.avail_workers', 'Available Workers')}</span>
                    <span className="font-semibold text-emerald-800">
                      {plan.availableWorkersCount} {t('planner.in_pool', 'in cluster pool')}
                    </span>
                  </div>

                  {/* Best Matches / Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-2">
                    {isCurrent ? (
                      <button
                        onClick={() => setCurrentView('workers')}
                        id="view-recommended-workers-btn"
                        className="px-3.5 py-1.5 bg-[#1B4332] hover:bg-[#143427] text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        <span>{t('planner.view_rec_workers', 'View Recommended Workers')}</span>
                      </button>
                    ) : (
                      <div className="text-[11px] text-stone-500">
                        {t('planner.top_matches', 'Top Matches')}: {plan.bestMatches.slice(0, 3).map(id => getWorkerName(id).split(' ')[0]).join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Step Workflow Banner */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#1B4332] flex items-center justify-center font-bold text-xs">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-stone-900">Workforce Requirements Ready</div>
            <div className="text-[11px] text-stone-500">Labor curve established for Day 45 pegging stage. Review matched worker candidates.</div>
          </div>
        </div>
        <button
          onClick={() => setCurrentView('workers')}
          id="next-step-workers-btn"
          className="px-4 py-2 bg-[#1B4332] hover:bg-[#143427] text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <span>Proceed to Worker Recommendations</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
        </button>
      </div>
    </div>
  );
};
