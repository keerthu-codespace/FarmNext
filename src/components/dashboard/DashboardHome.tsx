import React from 'react';
import {
  TrendingUp,
  Cpu,
  Users,
  CheckSquare,
  Eye,
  RefreshCw,
  Award,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Camera,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  Sprout
} from 'lucide-react';
import { RoleBadgeIcon } from '../common/RoleVisual';
import { useApp } from '../../context/AppContext';
import { FarmOverviewCard } from './FarmOverviewCard';

export const DashboardHome: React.FC = () => {
  const {
    farm,
    tasks,
    evidence,
    workers,
    workforcePlan,
    currentRole,
    setCurrentView,
    setSelectedWorkerForPassport,
    setSelectedEvidenceForDetail,
    t
  } = useApp();

  const currentWeedingTask = tasks.find(t => t.id === 'task-4');
  const recentEvidence = evidence[0];
  const rameshWorker = workers.find(w => w.id === 'worker-ramesh');

  const farmStages = [
    { name: t('stage.land_prep', 'Land Preparation'), completed: true, active: false },
    { name: t('stage.sowing', 'Sowing'), completed: true, active: false },
    { name: t('stage.irrigation', 'Irrigation'), completed: true, active: false },
    { name: t('stage.growing', 'Growing'), completed: true, active: true },
    { name: t('stage.weeding', 'Weeding'), completed: false, active: true },
    { name: t('stage.crop_monitoring', 'Crop Monitoring'), completed: false, active: false },
    { name: t('stage.harvest', 'Harvest'), completed: false, active: false }
  ];

  return (
    <div className="space-y-6">
      {/* Role Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-amber-300 flex items-center justify-center text-xl font-bold">
            <RoleBadgeIcon role={currentRole} className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-lg font-bold text-[#1B4332]">
                {currentRole === 'urban_cofarmer'
                  ? t('dashboard.urban_title', 'Urban Co-Farmer Dashboard')
                  : currentRole === 'landowner'
                  ? t('dashboard.landowner_title', 'Landowner Management Dashboard')
                  : t('dashboard.worker_title', 'Agricultural Worker Hub')}
              </h1>
              <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                {t('dashboard.cycle_badge', 'Karnataka Groundnut Cycle')}
              </span>
            </div>
            <p className="text-xs text-stone-500">
              {currentRole === 'urban_cofarmer'
                ? t('dashboard.urban_desc', 'Co-farming 2 Acres in Mandya with verified worker passports and AI-guided task monitoring.')
                : currentRole === 'landowner'
                ? t('dashboard.landowner_desc', 'Managing land plot allocation, supervisor verifications and seasonal crop rotation.')
                : t('dashboard.worker_desc', 'Tracking assigned farm tasks, photographic evidence submissions, and verified skill growth.')}
            </p>
          </div>
        </div>

        {/* Quick Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('ai_planner')}
            className="px-3.5 py-2 bg-[#1B4332] hover:bg-[#143427] text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('nav.ai_planner', 'AI Farm Planner')}</span>
          </button>
        </div>
      </div>

      {/* RECOMMENDED WORKFLOW: NEXT ACTION PROMPT */}
      <div className="bg-gradient-to-r from-[#1B4332] via-[#245740] to-[#2D6A4F] text-white p-5 rounded-2xl border border-emerald-800/80 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-stone-900 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                Next Recommended Step
              </span>
              <span className="text-emerald-200 text-xs font-medium">
                {farm.landownerName} · Green Valley Farm ({farm.areaAcres} Acres, Mandya)
              </span>
            </div>
            <h2 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
              Run AI Farm & Workforce Planner
            </h2>
            <p className="text-xs text-stone-200 leading-relaxed">
              Generate the seasonal workforce requirements, inspect matched certified agricultural specialists, and coordinate crop stages for Day 45 (Pegging & Flowering).
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCurrentView('ai_planner')}
              id="start-farm-planning-btn"
              className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer group"
            >
              <Cpu className="w-4 h-4 text-emerald-950" />
              <span>Open AI Farm Planner</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Quick Module Navigation */}
        <div className="mt-4 pt-3.5 border-t border-emerald-700/60 flex items-center gap-2 overflow-x-auto text-[11px] pb-1">
          <span className="text-emerald-300 font-semibold shrink-0">Workflow Modules:</span>
          {[
            { id: 'ai_planner', label: 'AI Farm Planner' },
            { id: 'workers', label: 'Worker Recommendations' },
            { id: 'tasks', label: 'Task Management' },
            { id: 'monitoring', label: 'Monitoring Evidence' },
            { id: 'crop_rotation', label: 'Crop Rotation' },
            { id: 'estimated_yield', label: 'Estimated Yield' },
            { id: 'reports', label: 'Reports & Transparency' }
          ].map(module => (
            <button
              key={module.id}
              onClick={() => setCurrentView(module.id)}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium shrink-0 transition-colors cursor-pointer border border-white/10"
            >
              {module.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Farm Overview Card */}
      <FarmOverviewCard />

      {/* ESTIMATED YIELD HERO SECTION */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-700" />
              <h3 className="font-display text-base font-bold text-stone-900">
                {t('yield.title', 'ESTIMATED YIELD (Groundnut Crop)')}
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              {t('yield.subtitle', 'Calibrated for 2.0 Acres in Mandya, Karnataka based on Day 45 vegetative & pegging indices')}
            </p>
          </div>

          <button
            onClick={() => setCurrentView('estimated_yield')}
            className="text-xs font-semibold text-[#1B4332] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{t('yield.view_full_analysis', 'View Full Yield Analysis')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Scenario Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Best Case */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <span>{t('yield.best_case', 'BEST CASE')}</span>
              <span className="text-[10px] bg-emerald-200/80 px-2 py-0.5 rounded text-emerald-900">
                {t('yield.optimal_weather', 'Optimal Weather')}
              </span>
            </div>
            <div className="mt-2 text-3xl font-display font-black text-emerald-950">
              {farm.yieldEstimate.bestCaseTonnes} <span className="text-sm font-semibold text-emerald-800">{t('yield.tonnes', 'tonnes')}</span>
            </div>
            <p className="text-[11px] text-emerald-800 mt-1">
              {t('yield.best_desc', 'Requires continued on-time weeding & timely post-monsoon terminal watering.')}
            </p>
          </div>

          {/* 2. Expected (Hero) */}
          <div className="p-4 rounded-xl bg-[#1B4332] text-white border-2 border-amber-400/80 shadow-md relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-[#D97706] text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded">
              {t('yield.current_baseline', 'Current Baseline')}
            </div>
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              {t('yield.expected', 'EXPECTED YIELD')}
            </div>
            <div className="mt-2 text-3xl font-display font-black text-white">
              {farm.yieldEstimate.expectedTonnes} <span className="text-sm font-semibold text-amber-200">{t('yield.tonnes', 'tonnes')}</span>
            </div>
            <p className="text-[11px] text-stone-200 mt-1">
              {t('yield.expected_desc', '72% farm progress on Day 45 aligns with high pod development trajectory.')}
            </p>
          </div>

          {/* 3. Risk Case */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div className="flex items-center justify-between text-xs font-bold text-stone-600 uppercase tracking-wider">
              <span>{t('yield.risk_case', 'RISK CASE')}</span>
              <span className="text-[10px] bg-stone-200 px-2 py-0.5 rounded text-stone-700">
                {t('yield.adverse_climate', 'Adverse Climate')}
              </span>
            </div>
            <div className="mt-2 text-3xl font-display font-black text-stone-800">
              {farm.yieldEstimate.riskCaseTonnes} <span className="text-sm font-semibold text-stone-600">{t('yield.tonnes', 'tonnes')}</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              {t('yield.risk_desc', 'Potential 24% dip in case of unseasonal dry spell or delayed weeding.')}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="font-semibold">
              {t('yield.disclaimer', 'Indicative estimates, not guaranteed outcomes.')}
            </span>
          </div>
          <span className="text-[11px] text-amber-800">
            {t('yield.telemetry_note', 'Production yield metric based on agronomist field telemetry.')}
          </span>
        </div>
      </div>

      {/* FARM TIMELINE / FARMING CYCLE */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#1B4332]" />
            <h3 className="font-display text-base font-bold text-stone-900">
              {t('timeline.title', 'FARM CYCLE TIMELINE')}
            </h3>
          </div>
          <span className="text-xs font-semibold text-[#1B4332] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {t('timeline.current_stage', 'Current Stage: Growing / Pegging (Day 45)')}
          </span>
        </div>

        {/* Timeline Sequence */}
        <div className="pt-2 overflow-x-auto pb-2">
          <div className="flex items-center min-w-[650px] justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-stone-200 -z-0"></div>

            {farmStages.map((stg, idx) => (
              <div key={stg.name} className="relative z-10 flex flex-col items-center text-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-xs transition-all ${
                    stg.active
                      ? 'bg-[#1B4332] text-white ring-4 ring-emerald-200 ring-offset-1 scale-110'
                      : stg.completed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white border-2 border-stone-300 text-stone-400'
                  }`}
                >
                  {stg.completed ? '✓' : idx + 1}
                </div>
                <div
                  className={`text-[11px] font-bold mt-2 uppercase tracking-tight max-w-[80px] ${
                    stg.active ? 'text-[#1B4332]' : stg.completed ? 'text-stone-700' : 'text-stone-400'
                  }`}
                >
                  {stg.name}
                </div>
                {stg.active && (
                  <span className="text-[9px] bg-amber-500 text-white px-1.5 py-0.2 rounded font-semibold mt-0.5">
                    {t('role.active', 'Active')}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2-Column Section: AI Planner Trigger & Evidence Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: AI Farm Engine Workforce Recommendation */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                <Cpu className="w-4 h-4 text-blue-600" />
                <span>{t('dashboard.ai_alert_title', 'AI Farm Engine: Workforce Alert')}</span>
              </div>
              <span className="text-[10px] uppercase font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                {t('dashboard.week_action', 'Week 6 Action')}
              </span>
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
              <div className="text-xs font-bold text-blue-950">
                {t('dashboard.crucial_task', 'CRUCIAL TASK: Pegging Stage Weeding & Pod Zone Aeration')}
              </div>
              <p className="text-xs text-blue-900 leading-snug">
                {t('dashboard.ai_rec_desc', 'AI Engine recommends 4 workers with high groundnut experience. 1 worker already assigned, 3 slots available.')}
              </p>
              <div className="text-[11px] text-blue-800 flex items-center gap-2">
                <span>{t('dashboard.best_matches', 'Best Matches')}: <strong>Ramesh, Suresh, Mahesh, Anil</strong></span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentView('workers')}
              className="px-4 py-2 bg-[#1B4332] hover:bg-[#143427] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('dashboard.view_workers', 'View Recommended Workers')}</span>
            </button>

            <button
              onClick={() => setCurrentView('ai_planner')}
              className="text-xs font-semibold text-stone-700 hover:text-stone-900 underline cursor-pointer"
            >
              {t('dashboard.open_plan', 'Open Full AI Plan →')}
            </button>
          </div>
        </div>

        {/* Right: Latest Verified Evidence Record */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <Camera className="w-4 h-4 text-[#1B4332]" />
                <span>{t('dashboard.evidence_spotlight', 'Latest Verified Farm Evidence')}</span>
              </div>
              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                {t('evidence.ai_passed', 'AI Consistency Passed')}
              </span>
            </div>

            {recentEvidence && (
              <div
                onClick={() => {
                  setSelectedEvidenceForDetail(recentEvidence);
                  setCurrentView('monitoring');
                }}
                className="group flex gap-3 p-3 bg-stone-50 hover:bg-emerald-50/50 border border-stone-200 hover:border-emerald-300 rounded-xl transition-all cursor-pointer"
              >
                <img
                  src={recentEvidence.photoUrl}
                  alt="Evidence thumbnail"
                  className="w-20 h-20 rounded-lg object-cover border border-stone-200 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="text-xs space-y-1">
                  <div className="font-bold text-stone-900 group-hover:text-[#1B4332] line-clamp-1">
                    {recentEvidence.taskName}
                  </div>
                  <div className="text-stone-500 text-[11px]">
                    {t('evidence.worker', 'Worker')}: <strong>{recentEvidence.workerName}</strong> · {recentEvidence.date}
                  </div>
                  <div className="text-[11px] text-emerald-800 font-medium line-clamp-2">
                    {recentEvidence.aiNotes}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
            <span className="text-[11px] text-stone-500">
              {t('evidence.unit', 'Unit')}: <strong>Farm Unit A23</strong>
            </span>

            <button
              onClick={() => setCurrentView('monitoring')}
              className="text-xs font-bold text-[#1B4332] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{t('dashboard.view_monitoring', 'View All Farm Monitoring')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
