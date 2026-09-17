import React, { useState } from 'react';
import {
  TrendingUp,
  AlertCircle,
  Sparkles,
  Layers,
  CloudSun,
  Droplets,
  Sprout,
  Activity,
  ShieldCheck,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const YieldEstimationView: React.FC = () => {
  const { farm, setCurrentView, t } = useApp();

  const [weatherFactor, setWeatherFactor] = useState<number>(90); // 90%
  const [irrigationFactor, setIrrigationFactor] = useState<number>(95);
  const [weedingFactor, setWeedingFactor] = useState<number>(92);

  // Dynamic calculations based on factor sliders
  const compositeIndex = (weatherFactor * 0.35 + irrigationFactor * 0.35 + weedingFactor * 0.30) / 100;
  const dynamicExpected = (1.85 * compositeIndex).toFixed(2);
  const dynamicBest = (2.15 * Math.min(1.05, compositeIndex * 1.05)).toFixed(2);
  const dynamicRisk = (1.40 * Math.max(0.85, compositeIndex * 0.9)).toFixed(2);

  const resetSliders = () => {
    setWeatherFactor(90);
    setIrrigationFactor(95);
    setWeedingFactor(92);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
              <TrendingUp className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-[#1B4332]">
                {t('yield.title', 'Estimated Yield Modelling (Groundnut)')}
              </h1>
              <p className="text-xs text-stone-500">
                {t('yield.subtitle', 'Predictive biomass and pod formation trajectory based on sensor data, stage milestones, and verified task completions.')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#FAF9F5] px-3 py-1.5 rounded-xl border border-stone-200 text-xs">
          <span className="text-stone-500">{t('yield.farm', 'Farm')}:</span>
          <span className="font-bold text-[#1B4332]">{farm.name}</span>
          <span className="text-stone-300">|</span>
          <span className="text-stone-600">{farm.areaAcres} {t('planner.acres', 'Acres')}</span>
          <span className="text-stone-300">|</span>
          <span className="font-semibold text-emerald-700">{t('farm.progress', 'Progress')}: {farm.progressPercent}%</span>
        </div>
      </div>

      {/* THREE SCENARIO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* 1. Best Case */}
        <div className="bg-white rounded-2xl border-2 border-emerald-300 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                {t('yield.best_case', 'BEST CASE SCENARIO')}
              </span>
              <span className="text-[10px] text-stone-400">95th Percentile</span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display font-black text-4xl text-emerald-950">
                {dynamicBest}
              </span>
              <span className="text-sm font-bold text-emerald-800">{t('yield.tonnes', 'tonnes')}</span>
            </div>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              {t('yield.best_case_desc', 'Achieved under sustained optimal micro-climate conditions, timely weeding, and zero pest incidence.')}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-emerald-800 font-semibold">
            {t('yield.yield_density', 'Yield density')}: ~1.07 {t('yield.tonnes_acre', 'tonnes / acre')}
          </div>
        </div>

        {/* 2. Expected (Hero) */}
        <div className="bg-gradient-to-br from-[#1B4332] to-[#143427] text-white rounded-2xl border-3 border-amber-400 p-5 shadow-lg flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-2 right-2 bg-[#D97706] text-white font-black text-[10px] uppercase px-2 py-0.5 rounded shadow-xs">
            {t('yield.baseline_exp', 'Baseline Expectation')}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                {t('yield.expected_est', 'EXPECTED ESTIMATE')}
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display font-black text-4xl text-white">
                {dynamicExpected}
              </span>
              <span className="text-sm font-bold text-amber-200">{t('yield.tonnes', 'tonnes')}</span>
            </div>
            <p className="text-xs text-stone-200 mt-2 leading-relaxed">
              {t('yield.expected_desc', 'Standard telemetry benchmark reflecting 72% completed farm milestones at Day 45 pegging stage.')}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/20 text-[11px] text-amber-300 font-semibold flex items-center justify-between">
            <span>{t('yield.yield_density', 'Yield density')}: ~0.92 {t('yield.tonnes_acre', 'tonnes / acre')}</span>
            <span>Day 45 / 120</span>
          </div>
        </div>

        {/* 3. Risk Case */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-md">
                {t('yield.risk_case', 'RISK CASE SCENARIO')}
              </span>
              <span className="text-[10px] text-stone-400">10th Percentile</span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display font-black text-4xl text-stone-800">
                {dynamicRisk}
              </span>
              <span className="text-sm font-bold text-stone-600">{t('yield.tonnes', 'tonnes')}</span>
            </div>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
              {t('yield.risk_case_desc', 'Conservative estimate accounting for potential unseasonal rain deficits or delayed labor tasks.')}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500 font-semibold">
            {t('yield.yield_density', 'Yield density')}: ~0.70 {t('yield.tonnes_acre', 'tonnes / acre')}
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-4 text-xs text-amber-950 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
          <span className="font-bold text-sm">
            {t('yield.disclaimer_quote', '“These are scenario-based estimates and are not guaranteed outcomes.”')}
          </span>
        </div>
        <span className="text-[11px] text-amber-800">
          {t('yield.disclaimer_sub', 'Evaluated as production weight (tonnes), NOT revenue or financial guarantees.')}
        </span>
      </div>

      {/* VISUAL COMPARISON CHART */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h3 className="font-display text-sm font-bold text-stone-900 uppercase tracking-wider">
            {t('yield.comparison_chart_title', 'SCENARIO YIELD COMPARISON & HISTORICAL HARVEST BENCHMARK (Mandya District)')}
          </h3>
          <span className="text-xs text-stone-500 font-medium">{t('yield.unit_metric_tonnes', 'Unit: Metric Tonnes')}</span>
        </div>

        {/* Clean SVG Bar Chart */}
        <div className="space-y-4 pt-2">
          {/* Best Case Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-800">{t('yield.best_case_bar', 'Best Case (High Sunlight & Rapid Weeding)')}</span>
              <span className="font-bold text-emerald-950">{dynamicBest} t</span>
            </div>
            <div className="w-full bg-stone-100 h-6 rounded-lg overflow-hidden flex">
              <div
                className="bg-emerald-600 h-full rounded-lg transition-all duration-300 flex items-center justify-end pr-2 text-[10px] text-white font-bold"
                style={{ width: `${(parseFloat(dynamicBest) / 2.5) * 100}%` }}
              >
                {dynamicBest}t
              </div>
            </div>
          </div>

          {/* Expected Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#1B4332]">{t('yield.expected_bar', 'Expected Baseline (Current Trajectory)')}</span>
              <span className="font-bold text-[#1B4332]">{dynamicExpected} t</span>
            </div>
            <div className="w-full bg-stone-100 h-6 rounded-lg overflow-hidden flex">
              <div
                className="bg-[#1B4332] h-full rounded-lg transition-all duration-300 flex items-center justify-end pr-2 text-[10px] text-white font-bold"
                style={{ width: `${(parseFloat(dynamicExpected) / 2.5) * 100}%` }}
              >
                {dynamicExpected}t
              </div>
            </div>
          </div>

          {/* Risk Case Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-600">{t('yield.risk_bar', 'Risk Case (Delayed Moisture / Pest Stress)')}</span>
              <span className="font-bold text-stone-800">{dynamicRisk} t</span>
            </div>
            <div className="w-full bg-stone-100 h-6 rounded-lg overflow-hidden flex">
              <div
                className="bg-stone-400 h-full rounded-lg transition-all duration-300 flex items-center justify-end pr-2 text-[10px] text-white font-bold"
                style={{ width: `${(parseFloat(dynamicRisk) / 2.5) * 100}%` }}
              >
                {dynamicRisk}t
              </div>
            </div>
          </div>

          {/* Historical Regional Average */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-800">{t('yield.hist_bar', 'Historical District Average (Unmanaged Farms)')}</span>
              <span className="font-bold text-amber-900">1.35 t</span>
            </div>
            <div className="w-full bg-stone-100 h-6 rounded-lg overflow-hidden flex">
              <div
                className="bg-amber-400 h-full rounded-lg transition-all duration-300 flex items-center justify-end pr-2 text-[10px] text-stone-900 font-bold"
                style={{ width: `${(1.35 / 2.5) * 100}%` }}
              >
                1.35t
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FACTORS INFLUENCING ESTIMATE & INTERACTIVE SIMULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Factors list */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="font-display text-sm font-bold text-stone-900 uppercase tracking-wider">
              {t('yield.key_factors_title', 'KEY INFLUENCING FACTORS (Karnataka Model)')}
            </h3>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-600 font-medium">1. {t('yield.factor_crop_stage', 'Crop Stage')}</span>
              <span className="font-bold text-emerald-800">Pegging / Pod Initiation (Day 45)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-600 font-medium">2. {t('yield.factor_farm_progress', 'Farm Progress')}</span>
              <span className="font-bold text-stone-900">72% Tasks Verified On-Schedule</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-600 font-medium">3. {t('yield.factor_weather', 'Weather Conditions')}</span>
              <span className="font-bold text-stone-900">Favourable 28°C avg · Normal Monsoon</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-600 font-medium">4. {t('yield.factor_water_avail', 'Water Availability')}</span>
              <span className="font-bold text-blue-700">Drip Pressure Stable · Borewell 85%</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-600 font-medium">5. {t('yield.factor_hist_perf', 'Historical Crop Performance')}</span>
              <span className="font-bold text-[#1B4332]">KDG-123 cultivar averages 1.8t/2 acres</span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Scenario Simulation Sliders */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h3 className="font-display text-sm font-bold text-stone-900 uppercase tracking-wider">
                {t('yield.simulator_title', 'INTERACTIVE TELEMETRY SIMULATOR')}
              </h3>
              <p className="text-[11px] text-stone-500">{t('yield.simulator_subtitle', 'Test how variable field conditions alter estimates')}</p>
            </div>
            <button
              onClick={resetSliders}
              className="text-[11px] text-[#1B4332] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
            >
              <RotateCcw className="w-3 h-3" /> {t('yield.reset', 'Reset')}
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>{t('yield.slider_monsoon', 'Monsoon Rain & Sun Index')}</span>
                <span className="text-[#1B4332]">{weatherFactor}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="110"
                value={weatherFactor}
                onChange={e => setWeatherFactor(Number(e.target.value))}
                className="w-full accent-[#1B4332] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>{t('yield.slider_irrigation', 'Drip Irrigation & Soil Moisture')}</span>
                <span className="text-blue-700">{irrigationFactor}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="110"
                value={irrigationFactor}
                onChange={e => setIrrigationFactor(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>{t('yield.slider_weeding', 'Weeding & Canopy Aeration Efficiency')}</span>
                <span className="text-orange-700">{weedingFactor}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="110"
                value={weedingFactor}
                onChange={e => setWeedingFactor(Number(e.target.value))}
                className="w-full accent-orange-600 cursor-pointer"
              />
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900">
              {t('yield.composite_growth_index', 'Composite Growth Index')}: <strong>{(compositeIndex * 100).toFixed(0)}%</strong>. {t('yield.dynamic_recalc_note', 'Estimated yield dynamically recalculates above.')}
            </div>
          </div>
        </div>
      </div>

      {/* Next Step Workflow Banner */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#1B4332] flex items-center justify-center font-bold text-xs">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-stone-900">Estimated Yield Modelled & Calibrated</div>
            <div className="text-[11px] text-stone-500">Biomass curve and sensor sensitivity analyzed. Proceed to Farm Reports & Audit.</div>
          </div>
        </div>
        <button
          onClick={() => setCurrentView('reports')}
          id="next-step-reports-btn"
          className="px-4 py-2 bg-[#1B4332] hover:bg-[#143427] text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <span>Review Seasonal Reports & Transparency Summary</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
        </button>
      </div>
    </div>
  );
};
