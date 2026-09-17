import React, { useState } from 'react';
import {
  Eye,
  Camera,
  CheckCircle2,
  Clock,
  Circle,
  AlertTriangle,
  MapPin,
  Calendar,
  User,
  ShieldCheck,
  Sparkles,
  Maximize2,
  X,
  Upload,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EvidenceRecord } from '../../types';

export const MonitoringEvidence: React.FC = () => {
  const {
    evidence,
    selectedEvidenceForDetail,
    setSelectedEvidenceForDetail,
    addNewEvidence,
    workers,
    setCurrentView,
    t
  } = useApp();

  const [inspectModalOpen, setInspectModalOpen] = useState(false);
  const [activeEvidence, setActiveEvidence] = useState<EvidenceRecord | null>(evidence[0]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // New evidence form state
  const [newTaskName, setNewTaskName] = useState('Weeding & Pod Zone Soil Aeration');
  const [newWorkerId, setNewWorkerId] = useState('worker-ramesh');
  const [newLocationUnit, setNewLocationUnit] = useState('Farm Unit A23');
  const [newPhotoUrl, setNewPhotoUrl] = useState('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80');

  const timelineSteps = [
    { name: 'Project Created', status: 'Completed', date: '14 Jul 2026' },
    { name: 'Land Verified', status: 'Completed', date: '16 Jul 2026' },
    { name: 'Workers Assigned', status: 'Completed', date: '18 Jul 2026' },
    { name: 'Crop Planted', status: 'Completed', date: '22 Jul 2026' },
    { name: 'Irrigation', status: 'Completed', date: '24 Aug 2026' },
    { name: 'Weeding', status: 'In Progress', date: 'Current (29 Aug 2026)' },
    { name: 'Harvest', status: 'Upcoming', date: '10 Nov 2026' }
  ];

  const handleOpenInspect = (record: EvidenceRecord) => {
    setActiveEvidence(record);
    setInspectModalOpen(true);
  };

  const handleUploadNewEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    const worker = workers.find(w => w.id === newWorkerId);
    addNewEvidence({
      taskId: 'task-4',
      taskName: newTaskName,
      date: 'Today',
      timestamp: 'Just now (11:42 AM IST)',
      locationUnit: newLocationUnit,
      workerId: newWorkerId,
      workerName: worker ? worker.name : 'Ramesh Kumar',
      photoUrl: newPhotoUrl,
      aiStatus: 'AI consistency check passed',
      aiConfidenceScore: 95.8,
      aiNotes: 'Optical weed root eradication confirmed; soil crumb structure loosened without disturbance to subterranean pegging nodes.',
      verifiedBySupervisor: 'Basavarajappa Gowda (Verified)',
      gpsCoordinates: '12.5218° N, 76.8951° E'
    });
    setUploadModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-[#1B4332] border border-emerald-200">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-[#1B4332]">
                {t('evidence.title', 'Farm Monitoring & Transparency Evidence')}
              </h1>
              <p className="text-xs text-stone-500">
                {t('evidence.subtitle', 'Photographic ledger with automated AI consistency analysis and human supervisor sign-off.')}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="px-4 py-2 bg-[#1B4332] hover:bg-[#143427] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5 text-amber-400" />
          <span>{t('evidence.simulate_upload_btn', 'Simulate Upload Evidence')}</span>
        </button>
      </div>

      {/* Mandatory Philosophical Disclaimer */}
      <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-4 text-xs text-amber-950 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-amber-900 text-sm">
            {t('evidence.protocol_disclaimer', 'Autonomous Co-Farming Protocol Disclaimer')}
          </div>
          <p className="leading-relaxed">
            {t('evidence.disclaimer_quote', '“AI assists validation and flags inconsistencies. Human review remains available.”')}
          </p>
          <p className="text-[11px] text-amber-800 italic">
            {t('evidence.disclaimer_sub', 'Photographic proof acts as telemetry verification alongside IoT soil moisture sensors and field supervisor audits.')}
          </p>
        </div>
      </div>

      {/* 2-COLUMN LAYOUT: VERTICAL TIMELINE + EVIDENCE LEDGER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Vertical Farm Timeline */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="font-display text-sm font-bold text-stone-900 uppercase tracking-wider">
              {t('evidence.timeline_title', 'FARM ACTIVITY TIMELINE')}
            </h3>
            <p className="text-[11px] text-stone-500 mt-0.5">
              {t('evidence.timeline_subtitle', 'Sequence of planned & verified milestones')}
            </p>
          </div>

          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
            {timelineSteps.map((step, idx) => {
              const isCompleted = step.status === 'Completed';
              const isInProgress = step.status === 'In Progress';

              return (
                <div key={step.name} className="relative flex items-start gap-3 text-xs">
                  {/* Marker */}
                  <div
                    className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shadow-xs ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isInProgress
                        ? 'bg-[#D97706] text-white ring-4 ring-amber-100 animate-pulse'
                        : 'bg-white border-2 border-stone-300 text-stone-400'
                    }`}
                  >
                    {isCompleted ? '✓' : isInProgress ? '⏳' : '○'}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold uppercase tracking-tight ${
                        isInProgress ? 'text-[#D97706]' : isCompleted ? 'text-stone-900' : 'text-stone-400'
                      }`}>
                        {step.name}
                      </span>
                      {isInProgress && (
                        <span className="text-[9px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded">
                          {t('timeline.current', 'Current')}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-stone-400 font-medium">
                      {step.date}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Evidence Records Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#1B4332]" />
                <h3 className="font-display text-sm font-bold text-stone-900 uppercase tracking-wider">
                  {t('evidence.records_title', 'VERIFIED ACTIVITY EVIDENCE RECORDS')}
                </h3>
              </div>
              <span className="text-xs text-stone-500 font-medium">
                {evidence.length} {t('evidence.photo_records', 'Photo Records')}
              </span>
            </div>

            {/* Evidence Cards */}
            <div className="space-y-4">
              {evidence.map(rec => (
                <div
                  key={rec.id}
                  className="bg-[#FAF9F5] border border-stone-200 rounded-2xl p-4 space-y-3 hover:border-emerald-300 transition-colors shadow-2xs"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Thumbnail with inspect button */}
                    <div className="relative group w-full sm:w-44 h-36 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-900">
                      <img
                        src={rec.photoUrl}
                        alt={rec.taskName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <button
                        onClick={() => handleOpenInspect(rec)}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5 cursor-pointer backdrop-blur-2xs"
                      >
                        <Maximize2 className="w-4 h-4" />
                        <span>{t('evidence.inspect_btn', 'Inspect Evidence')}</span>
                      </button>
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-2 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-stone-900 text-sm">
                            {rec.taskName}
                          </h4>
                          <span className="text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded uppercase">
                            Demo Data · Simulated
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded-md">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          {rec.aiStatus}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-stone-600 text-[11px] bg-white p-2.5 rounded-xl border border-stone-200/80">
                        <div>
                          <span className="text-stone-400 block text-[10px]">{t('evidence.date_time', 'Date & Time')}</span>
                          <span className="font-semibold text-stone-800">{rec.date} · {rec.timestamp}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[10px]">{t('evidence.location_unit', 'Location Unit')}</span>
                          <span className="font-semibold text-stone-800">{rec.locationUnit}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[10px]">{t('evidence.responsible_worker', 'Responsible Worker')}</span>
                          <span className="font-semibold text-[#1B4332]">{rec.workerName}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[10px]">{t('evidence.gps_coords', 'GPS Coordinates')}</span>
                          <span className="font-mono text-stone-600">{rec.gpsCoordinates}</span>
                        </div>
                      </div>

                      {/* AI Consistency Notes */}
                      <div className="text-[11px] text-stone-700 bg-emerald-50/60 border border-emerald-200/70 p-2.5 rounded-xl">
                        <span className="font-bold text-emerald-900">{t('evidence.ai_telemetry_verif', 'AI Telemetry Verification')} ({rec.aiConfidenceScore}% match):</span> {rec.aiNotes}
                      </div>

                      {rec.verifiedBySupervisor && (
                        <div className="text-[10px] text-stone-500 flex items-center justify-between pt-1">
                          <span>{t('evidence.supervisor_signoff', 'Supervisor Sign-Off')}: <strong>{rec.verifiedBySupervisor}</strong></span>
                          <button
                            onClick={() => handleOpenInspect(rec)}
                            className="font-bold text-[#1B4332] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>{t('evidence.full_audit', 'Full Telemetry Audit')}</span>
                            <Maximize2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Next Step Workflow Banner */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#1B4332] flex items-center justify-center font-bold text-xs">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-stone-900">Work Verification & Photographic Evidence Reviewed</div>
            <div className="text-[11px] text-stone-500">Supervisor sign-off and AI consistency checks verified. Proceed to Crop Rotation Strategy.</div>
          </div>
        </div>
        <button
          onClick={() => setCurrentView('crop_rotation')}
          id="next-step-crop-rotation-btn"
          className="px-4 py-2 bg-[#1B4332] hover:bg-[#143427] text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <span>Evaluate Crop Rotation Strategy</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
        </button>
      </div>

      {/* INSPECT EVIDENCE MODAL */}
      {inspectModalOpen && activeEvidence && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-[#1B4332] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-amber-400" />
                <h3 className="font-display font-bold text-base">
                  {t('evidence.inspect_modal_title', 'Photographic Evidence Inspection')}
                </h3>
              </div>
              <button
                onClick={() => setInspectModalOpen(false)}
                className="text-stone-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="relative rounded-xl overflow-hidden border border-stone-200 max-h-72">
                <img
                  src={activeEvidence.photoUrl}
                  alt={activeEvidence.taskName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-[10px] font-mono">
                  GPS: {activeEvidence.gpsCoordinates} · Time: {activeEvidence.timestamp}
                </div>
              </div>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-2">
                <div className="font-bold text-sm text-stone-900">{activeEvidence.taskName}</div>
                <div className="grid grid-cols-2 gap-2 text-stone-600">
                  <div>{t('evidence.responsible_worker', 'Worker')}: <strong>{activeEvidence.workerName}</strong></div>
                  <div>{t('evidence.location_unit', 'Location')}: <strong>{activeEvidence.locationUnit}</strong></div>
                  <div>AI Status: <strong className="text-emerald-700">{activeEvidence.aiStatus}</strong></div>
                  <div>Confidence: <strong>{activeEvidence.aiConfidenceScore}%</strong></div>
                </div>
                <p className="text-stone-700 pt-1 border-t border-stone-200">
                  {activeEvidence.aiNotes}
                </p>
              </div>
            </div>

            <div className="bg-stone-50 border-t border-stone-200 p-4 text-right">
              <button
                onClick={() => setInspectModalOpen(false)}
                className="px-4 py-2 bg-[#1B4332] text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                {t('evidence.close_inspection', 'Close Inspection')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIMULATE UPLOAD EVIDENCE MODAL */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-[#1B4332] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-amber-400" />
                <h3 className="font-display font-bold text-base">
                  {t('evidence.upload_modal_title', 'Simulate Field Photo Upload')}
                </h3>
              </div>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="text-stone-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadNewEvidence} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">{t('evidence.task_activity', 'Task Activity')}</label>
                <input
                  type="text"
                  value={newTaskName}
                  onChange={e => setNewTaskName(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">{t('evidence.responsible_worker', 'Responsible Worker')}</label>
                <select
                  value={newWorkerId}
                  onChange={e => setNewWorkerId(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-lg"
                >
                  {workers.map(w => (
                    <option key={w.id} value={w.id}>{w.name} (Mandya)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">{t('evidence.farm_plot_unit', 'Farm Plot Unit')}</label>
                <input
                  type="text"
                  value={newLocationUnit}
                  onChange={e => setNewLocationUnit(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">{t('evidence.photo_url', 'Evidence Photo Image URL')}</label>
                <input
                  type="url"
                  value={newPhotoUrl}
                  onChange={e => setNewPhotoUrl(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-lg"
                  required
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg cursor-pointer"
                >
                  {t('common.cancel', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1B4332] text-white font-bold rounded-lg cursor-pointer"
                >
                  {t('evidence.submit_ai_val', 'Submit for AI Validation')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
