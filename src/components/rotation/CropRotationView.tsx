import React, { useState } from 'react';
import {
  RefreshCw,
  Sprout,
  ArrowDown,
  ShieldCheck,
  Droplets,
  Bug,
  Sparkles,
  Info,
  ChevronRight,
  Layers,
  Award,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CropRotationView: React.FC = () => {
  const { cropRotation, setCurrentView, t } = useApp();
  const [explanationModalOpen, setExplanationModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-[#1B4332]">
                {t('rotation.title', 'Crop Rotation & Soil Regeneration')}
              </h1>
              <p className="text-xs text-stone-500">
                {t('rotation.subtitle', 'AI agronomy engine analyzing soil nitrogen recovery, pest cycle disruption, and seasonal water requirements.')}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setExplanationModalOpen(true)}
          className="px-4 py-2 bg-[#1B4332] hover:bg-[#143427] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Info className="w-3.5 h-3.5 text-amber-400" />
          <span>{t('rotation.view_explanation_btn', 'View Rotation Explanation')}</span>
        </button>
      </div>

      {/* ROTATION SEQUENCE */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
        <h3 className="font-display text-sm font-bold text-stone-900 uppercase tracking-wider">
          {t('rotation.sequence_title', 'SEASONAL ROTATION SEQUENCE (Plot Unit A & B)')}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* 1. Previous Crop */}
          <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 relative">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-200 px-2 py-0.5 rounded">
              {t('rotation.previous_crop', 'PREVIOUS CROP (COMPLETED)')}
            </span>
            <div className="font-display font-black text-xl text-stone-800 mt-1">
              {cropRotation.previousCrop.name}
            </div>
            <p className="text-xs text-stone-500">
              {t('rotation.duration', 'Duration')}: {cropRotation.previousCrop.duration}
            </p>
            <div className="text-[11px] text-stone-600 bg-white p-2.5 rounded-xl border border-stone-200/80">
              <strong>{t('rotation.soil_impact', 'Soil Impact')}:</strong> {cropRotation.previousCrop.soilImpact}
            </div>
            <div className="text-xs font-semibold text-emerald-800">
              {t('rotation.yield', 'Yield')}: {cropRotation.previousCrop.harvestYield}
            </div>
          </div>

          {/* 2. Current Crop */}
          <div className="p-5 bg-[#1B4332] text-white rounded-2xl border-2 border-amber-400 shadow-md space-y-2 relative">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-black/30 px-2 py-0.5 rounded">
              {t('rotation.current_crop', 'CURRENT CROP (ACTIVE · DAY 45/120)')}
            </span>
            <div className="font-display font-black text-xl text-white mt-1">
              {cropRotation.currentCrop.name}
            </div>
            <p className="text-xs text-stone-200">
              {t('tasks.stage_col', 'Stage')}: {cropRotation.currentCrop.stage}
            </p>
            <div className="text-[11px] text-emerald-100 bg-white/10 p-2.5 rounded-xl border border-white/20">
              <strong>{t('rotation.rhizosphere_effect', 'Rhizosphere Effect')}:</strong> {cropRotation.currentCrop.benefits}
            </div>
            <div className="text-xs font-semibold text-amber-300">
              {t('rotation.bio_n_fix', 'Active Biological Nitrogen Fixation')}
            </div>
          </div>

          {/* 3. Recommended Next Crop */}
          <div className="p-5 bg-emerald-50 rounded-2xl border-2 border-emerald-500 space-y-2 relative">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded">
              {t('rotation.recommended_crop', 'RECOMMENDED NEXT CROP (AI OPTIMAL)')}
            </span>
            <div className="font-display font-black text-xl text-emerald-950 mt-1">
              {cropRotation.recommendedNextCrop.name}
            </div>
            <p className="text-xs text-emerald-800">
              {t('rotation.target_window', 'Target Window')}: {cropRotation.recommendedNextCrop.recommendedMonth}
            </p>
            <div className="text-[11px] text-emerald-900 bg-white p-2.5 rounded-xl border border-emerald-200">
              <strong>{t('rotation.soil_boost', 'Soil Boost')}:</strong> {cropRotation.recommendedNextCrop.soilHealthBoost}
            </div>
            <div className="text-xs font-semibold text-emerald-900">
              {t('rotation.water_req', 'Water Req')}: <strong>{cropRotation.recommendedNextCrop.waterRequirement}</strong> · {cropRotation.recommendedNextCrop.diseaseInterruptionScore}
            </div>
          </div>
        </div>
      </div>

      {/* RECOMMENDATION FACTORS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Factor 1: Soil Health */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-stone-900">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span>1. {t('rotation.factor_soil', 'Soil Health')}</span>
          </div>
          <p className="text-stone-600 text-[11px] leading-relaxed">
            {t('rotation.factor_soil_desc', 'Preserves beneficial mycorrhizae fungi and restores organic humus after oilseed harvest.')}
          </p>
          <div className="font-semibold text-emerald-700 text-[11px]">+28% Biomass Index</div>
        </div>

        {/* Factor 2: Nutrient Mgmt */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-stone-900">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>2. {t('rotation.factor_nutrient', 'Nutrient Mgmt')}</span>
          </div>
          <p className="text-stone-600 text-[11px] leading-relaxed">
            {t('rotation.factor_nutrient_desc', 'Alternates nitrogen-fixing root nodules with high-potassium consumers to prevent chemical exhaustion.')}
          </p>
          <div className="font-semibold text-blue-700 text-[11px]">85% Nitrogen Balance</div>
        </div>

        {/* Factor 3: Disease Risk */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-stone-900">
            <Bug className="w-4 h-4 text-orange-600" />
            <span>3. {t('rotation.factor_disease', 'Disease Risk')}</span>
          </div>
          <p className="text-stone-600 text-[11px] leading-relaxed">
            {t('rotation.factor_disease_desc', 'Starves Cercospora and Tikka fungal spores by rotating botanical crop families.')}
          </p>
          <div className="font-semibold text-orange-700 text-[11px]">92% Pest Cycle Interruption</div>
        </div>

        {/* Factor 4: Crop Diversity */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-stone-900">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>4. {t('rotation.factor_diversity', 'Crop Diversity')}</span>
          </div>
          <p className="text-stone-600 text-[11px] leading-relaxed">
            {t('rotation.factor_diversity_desc', 'Balances cereal grains (Ragi) with legume oilseeds (Groundnut) and short-cycle pulses.')}
          </p>
          <div className="font-semibold text-amber-700 text-[11px]">Multi-Crop Biodiversity</div>
        </div>

        {/* Factor 5: Water Requirements */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-stone-900">
            <Droplets className="w-4 h-4 text-cyan-600" />
            <span>5. {t('rotation.factor_water', 'Water Req.')}</span>
          </div>
          <p className="text-stone-600 text-[11px] leading-relaxed">
            {t('rotation.factor_water_desc', 'Pulses require low supplemental watering, utilizing winter dew and preserved subsoil moisture.')}
          </p>
          <div className="font-semibold text-cyan-700 text-[11px]">Low Water Footprint</div>
        </div>
      </div>

      {/* Next Step Workflow Banner */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#1B4332] flex items-center justify-center font-bold text-xs">
            <RefreshCw className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-stone-900">Crop Rotation Strategy Evaluated</div>
            <div className="text-[11px] text-stone-500">Soil nitrogen regeneration & chickpea succession planned. Proceed to Yield Estimation.</div>
          </div>
        </div>
        <button
          onClick={() => setCurrentView('estimated_yield')}
          id="next-step-yield-btn"
          className="px-4 py-2 bg-[#1B4332] hover:bg-[#143427] text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <span>Review Estimated Yield</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
        </button>
      </div>

      {/* EXPLANATION MODAL */}
      {explanationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-[#1B4332] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-amber-400" />
                <h3 className="font-display font-bold text-base">
                  {t('rotation.modal_title', 'Agronomic Rotation Explanation')}
                </h3>
              </div>
              <button
                onClick={() => setExplanationModalOpen(false)}
                className="text-stone-300 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-stone-700 leading-relaxed">
              <p className="font-medium text-stone-900 text-sm">
                {cropRotation.rotationExplanation}
              </p>

              <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200 space-y-2">
                <h4 className="font-bold text-stone-900 text-xs">{t('rotation.key_benefits', 'Key Agronomic Benefits for Co-Farmers')}:</h4>
                <ul className="space-y-1.5 list-disc pl-4 text-stone-600 text-[11px]">
                  {cropRotation.recommendedNextCrop.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-[11px]">
                <strong>AI Planning Note:</strong> Transitioning to pulses immediately after November groundnut harvest preserves ground moisture without requiring expensive diesel pump irrigation.
              </div>
            </div>

            <div className="bg-stone-50 border-t border-stone-200 p-4 text-right">
              <button
                onClick={() => setExplanationModalOpen(false)}
                className="px-4 py-2 bg-[#1B4332] text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                {t('rotation.got_it_btn', 'Got It')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
