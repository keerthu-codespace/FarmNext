import React from 'react';
import {
  MapPin,
  Sprout,
  Droplets,
  Layers,
  Phone,
  ShieldCheck,
  Calendar,
  Activity,
  CheckCircle2,
  TrendingUp,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MyFarmView: React.FC = () => {
  const { farm, setCurrentView, t } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-[#1B4332] border border-emerald-200">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-[#1B4332]">
                {farm.name} — {t('farm.spec_title', 'Plot Specification & Vitals')}
              </h1>
              <p className="text-xs text-stone-500">
                {farm.location} · {farm.areaAcres} {t('farm.acres_under_protocol', 'Acres Under Co-Farming Protocol')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            {t('farm.verified_plot', 'Verified Land Registry Plot')}
          </span>
        </div>
      </div>

      {/* Plot Visual Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div className="relative h-64 rounded-xl overflow-hidden border border-stone-200 bg-stone-900">
            <img
              src={farm.imageUrl}
              alt="Green Valley Farmland"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider bg-[#D97706] text-white px-2 py-0.5 rounded">
                {t('farm.plot_grid_tag', 'Plot Unit A & B Grid')}
              </span>
              <h3 className="font-display text-xl font-bold mt-1 text-white">
                {farm.name} {t('farm.precision_plot', 'Precision Groundnut Plot')}
              </h3>
              <p className="text-xs text-stone-300">
                {farm.location}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-400 block text-[10px]">{t('farm.cultivated_area', 'Cultivated Area')}</span>
              <span className="font-bold text-stone-900 text-sm">{farm.areaAcres} Acres</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-400 block text-[10px]">{t('farm.current_cultivar', 'Current Cultivar')}</span>
              <span className="font-bold text-[#1B4332] text-sm">KDG-123 {t('crop.groundnut', 'Groundnut')}</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-400 block text-[10px]">{t('farm.crop_duration', 'Crop Duration')}</span>
              <span className="font-bold text-stone-900 text-sm">120 {t('farm.days_unit', 'Days')} (Day {farm.cycleDay})</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-400 block text-[10px]">{t('farm.soil_category', 'Soil Category')}</span>
              <span className="font-bold text-stone-900 text-sm">{farm.soilType}</span>
            </div>
          </div>
        </div>

        {/* Landowner Contact & Governance Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                {t('landing.land_custodian', 'Land Custodian')}
              </span>
              <h3 className="font-display font-bold text-base text-stone-900 mt-2">
                {farm.landownerName}
              </h3>
              <p className="text-xs text-stone-500">
                {t('farm.landowner_subtitle', 'Landowner & On-Site Supervisor')}
              </p>
            </div>

            <div className="space-y-2 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#1B4332]" />
                <span>{farm.landownerPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1B4332]" />
                <span>Mandya District, Karnataka</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#1B4332]" />
                <span>{t('farm.cycle_label', 'Cycle')}: {farm.projectStartDate} – {farm.expectedHarvestDate}</span>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 space-y-1">
              <div className="font-bold text-stone-900">{t('farm.agreement_title', 'Co-Farming Agreement')}:</div>
              <div>• {t('farm.cofarmer_label', 'Urban Co-Farmer')}: <strong>{farm.urbanCoFarmerName}</strong></div>
              <div>• {t('farm.stewardship_label', 'Land Stewardship')}: <strong>{farm.landownerName}</strong></div>
              <div>• {t('farm.yield_est_label', 'Yield Estimate')}: <strong>1.85 {t('yield.tonnes_unit', 'metric tonnes')}</strong></div>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('ai_planner')}
            id="open-ai-farm-planner-btn"
            className="w-full py-2.5 bg-[#1B4332] hover:bg-[#143427] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('landing.explore_ai_planner', 'Open AI Farm Planner')}</span>
          </button>
        </div>
      </div>

      {/* Plot Sensor Telemetry & Soil Chemistry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              {t('farm.soil_chemistry', 'Soil Chemistry (Volumetric)')}
            </span>
            <Layers className="w-4 h-4 text-amber-600" />
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>{t('farm.nitrogen', 'Nitrogen (Rhizobium Active)')}</span>
              <strong className="text-emerald-700">{t('farm.optimal', 'Optimal')} (85/100)</strong>
            </div>
            <div className="flex justify-between">
              <span>{t('farm.phosphorus', 'Phosphorus Availability')}</span>
              <strong className="text-stone-800">{t('farm.high', 'High')} (78/100)</strong>
            </div>
            <div className="flex justify-between">
              <span>{t('farm.potassium', 'Potassium Index')}</span>
              <strong className="text-stone-800">{t('farm.very_high', 'Very High')} (92/100)</strong>
            </div>
            <div className="flex justify-between">
              <span>{t('farm.soil_ph', 'Soil pH Level')}</span>
              <strong className="text-stone-800">6.7 ({t('farm.neutral_loam', 'Neutral Loam')})</strong>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              {t('farm.water_network', 'Water Network (Micro-Drip)')}
            </span>
            <Droplets className="w-4 h-4 text-blue-600" />
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>{t('farm.moisture_sat', 'Field Moisture Saturation')}</span>
              <strong className="text-blue-700">68.2% ({t('farm.adequate', 'Adequate')})</strong>
            </div>
            <div className="flex justify-between">
              <span>{t('farm.water_table', 'Borewell Water Table')}</span>
              <strong className="text-stone-800">220 ft ({t('farm.stable', 'Stable')})</strong>
            </div>
            <div className="flex justify-between">
              <span>{t('farm.drip_pressure', 'Drip Line Pressure')}</span>
              <strong className="text-stone-800">1.8 bar ({t('farm.normal', 'Normal')})</strong>
            </div>
            <div className="flex justify-between">
              <span>{t('farm.next_irrigation', 'Next Scheduled Irrigation')}</span>
              <strong className="text-[#1B4332]">18 Oct ({t('crop.pod_plumping', 'Pod Plumping')})</strong>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              {t('farm.agronomy_milestones', 'Agronomy Milestones')}
            </span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>{t('farm.pegging_init', 'Pegging Initiation')}</span>
              <strong className="text-emerald-700">{t('farm.confirmed', 'Confirmed')} ({t('timeline.day_unit', 'Day')} 45)</strong>
            </div>
            <div className="flex justify-between">
              <span>{t('farm.weeding_window', 'Weeding Window')}</span>
              <strong className="text-amber-700">{t('farm.active', 'Active')} ({t('farm.week_unit', 'Week')} 6)</strong>
            </div>
            <div className="flex justify-between">
              <span>{t('farm.chlorosis_risk', 'Canopy Chlorosis Risk')}</span>
              <strong className="text-stone-800">{t('farm.low', 'Low')} (&lt;2%)</strong>
            </div>
            <div className="flex justify-between">
              <span>{t('farm.est_harvest', 'Estimated Harvest Date')}</span>
              <strong className="text-stone-800">12 Nov 2026</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Next Step Workflow Banner */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#1B4332] flex items-center justify-center font-bold text-xs">
            <Sprout className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-stone-900">Farm Plot Parameters & Soil Telemetry Synchronized</div>
            <div className="text-[11px] text-stone-500">2.0-Acre Mandya plot parameters verified. Proceed to AI Farm & Workforce Planner.</div>
          </div>
        </div>
        <button
          onClick={() => setCurrentView('ai_planner')}
          id="next-step-ai-planner-btn"
          className="px-4 py-2 bg-[#1B4332] hover:bg-[#143427] text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <span>Open AI Farm & Workforce Planner</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
        </button>
      </div>
    </div>
  );
};
