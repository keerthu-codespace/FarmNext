import React, { useState } from 'react';
import {
  FileText,
  Download,
  ShieldCheck,
  Award,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Printer,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FarmReportsView: React.FC = () => {
  const { farm, evidence, workers, tasks, setCurrentView, t } = useApp();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadReport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-[#1B4332]">
                {t('reports.title', 'Farm Reports & Transparency Audit Trail')}
              </h1>
              <p className="text-xs text-stone-500">
                {t('reports.subtitle', 'Official seasonal summary, photo telemetry verification logs, and crop milestone certificates.')}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleDownloadReport}
          className="px-4 py-2 bg-[#1B4332] hover:bg-[#143427] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          <span>{downloadSuccess ? t('reports.downloaded', 'Summary Exported ✓') : t('reports.export_btn', 'Export Full Report (PDF)')}</span>
        </button>
      </div>

      {/* CO-FARMING AUDIT SUMMARY CARD */}
      <div className="bg-white rounded-3xl border-2 border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Certificate Style Header */}
        <div className="text-center space-y-2 border-b border-stone-200 pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-300 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            {t('reports.badge', 'FARMNEXT CO-FARMING TRANSPARENCY REPORT')}
          </div>
          <h2 className="font-display text-2xl font-black text-[#1B4332]">
            {farm.name} — {t('reports.audit_title', 'Mid-Season Agronomy Audit')}
          </h2>
          <p className="text-xs text-stone-500">
            {t('reports.audit_ref', 'Audit Reference')}: <strong>FN-AUDIT-2026-MND-092</strong> · {t('reports.certified_cycle', 'Certified for Kharif-Rabi Cycle')}
          </p>
        </div>

        {/* 4 Summary Vitals */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-center">
            <span className="text-stone-400 block text-[11px] uppercase font-semibold">{t('farm.cultivated_area', 'Cultivated Land')}</span>
            <span className="font-display font-black text-2xl text-stone-900 block mt-0.5">{farm.areaAcres} Acres</span>
            <span className="text-[10px] text-stone-500">{farm.location}</span>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-center">
            <span className="text-stone-400 block text-[11px] uppercase font-semibold">{t('overview.overall_progress', 'Current Progress')}</span>
            <span className="font-display font-black text-2xl text-emerald-800 block mt-0.5">72%</span>
            <span className="text-[10px] text-emerald-600 font-medium">18 {t('reports.of_tasks', 'of')} 24 {t('tasks.title', 'tasks')} {t('tasks.done', 'done')}</span>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-center">
            <span className="text-stone-400 block text-[11px] uppercase font-semibold">{t('overview.workers_matched', 'Active Workers')}</span>
            <span className="font-display font-black text-2xl text-[#1B4332] block mt-0.5">4 {t('workers.title', 'Workers')}</span>
            <span className="text-[10px] text-stone-500">{t('reports.passports_verified', 'Passports Verified')}</span>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 text-center">
            <span className="text-amber-800 block text-[11px] uppercase font-semibold">{t('overview.estimated_yield', 'Expected Yield')}</span>
            <span className="font-display font-black text-2xl text-amber-950 block mt-0.5">1.85 {t('yield.tonnes_unit', 'tonnes')}</span>
            <span className="text-[10px] text-amber-800 font-medium">{t('yield.metric_label', 'Production Metric')}</span>
          </div>
        </div>

        {/* Stakeholders Table */}
        <div className="space-y-3 pt-2">
          <h3 className="font-display text-sm font-bold text-stone-900 uppercase tracking-wider">
            1. {t('reports.stakeholder_dir', 'CO-FARMING STAKEHOLDER DIRECTORY')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
              <span className="text-stone-400 text-[10px] uppercase font-bold block">{t('role.landowner', 'Landowner')}</span>
              <span className="font-bold text-stone-900 text-sm">{farm.landownerName}</span>
              <p className="text-stone-500 text-[11px] mt-0.5">{t('reports.landowner_role', 'Plot Custodian & Field Supervisor')}</p>
            </div>
            <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
              <span className="text-stone-400 text-[10px] uppercase font-bold block">{t('role.urban_cofarmer', 'Urban Co-Farmer')}</span>
              <span className="font-bold text-stone-900 text-sm">{farm.urbanCoFarmerName}</span>
              <p className="text-stone-500 text-[11px] mt-0.5">{t('reports.cofarmer_role', 'Remote Co-Farm Sponsor (Bangalore)')}</p>
            </div>
            <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200">
              <span className="text-stone-400 text-[10px] uppercase font-bold block">{t('reports.lead_workers', 'Lead Field Workers')}</span>
              <span className="font-bold text-stone-900 text-sm">Ramesh Kumar, Suresh Gowda</span>
              <p className="text-stone-500 text-[11px] mt-0.5">{t('reports.verified_holders', 'Verified Skill Passport Holders')}</p>
            </div>
          </div>
        </div>

        {/* Evidence Verification Log Summary */}
        <div className="space-y-3 pt-2">
          <h3 className="font-display text-sm font-bold text-stone-900 uppercase tracking-wider">
            2. {t('reports.photo_telemetry_title', 'PHOTOGRAPHIC TELEMETRY LOG (RECENT ENTRIES)')}
          </h3>
          <div className="space-y-2 text-xs">
            {evidence.slice(0, 3).map(ev => (
              <div
                key={ev.id}
                className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between flex-wrap gap-2"
              >
                <div>
                  <div className="font-bold text-stone-900">{ev.taskName}</div>
                  <div className="text-[11px] text-stone-500">
                    {ev.date} · {ev.timestamp} · {t('evidence.worker_label', 'Worker')}: <strong>{ev.workerName}</strong> · {ev.locationUnit}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-800 text-[11px] bg-emerald-100 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3" /> {ev.aiStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mandatory Transparency Note */}
        <div className="p-4 bg-stone-100 rounded-xl text-stone-600 text-xs leading-relaxed border border-stone-200">
          <strong>{t('reports.transparency_notice_title', 'Transparency Notice:')}</strong> {t('reports.transparency_notice_desc', 'FarmNext generates this audit trail by aggregating field sensor logs, worker photograph telemetry, and supervisor signatures. It acts as an open coordination ledger for regenerative co-farming.')}
        </div>
      </div>

      {/* Farm Status & Actions Banner */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#1B4332] flex items-center justify-center font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <div className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <span>Farm Audit Trail & Reports Synchronized</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Ledger Verified
              </span>
            </div>
            <div className="text-xs text-stone-500 mt-0.5">
              Co-farming audit logs, supervisor signatures, and labor allocations recorded for Green Valley Farm.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentView('dashboard')}
            id="back-to-dashboard-btn"
            className="px-4 py-2 bg-[#1B4332] hover:bg-[#143427] text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>Return to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
