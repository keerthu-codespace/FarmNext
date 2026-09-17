import React, { useState } from 'react';
import {
  Users,
  Award,
  CheckCircle2,
  MapPin,
  Calendar,
  Star,
  ShieldCheck,
  Search,
  Filter,
  UserCheck,
  X,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WorkerProfile, FarmTask } from '../../types';

export const WorkerMatching: React.FC = () => {
  const {
    workers,
    tasks,
    assignWorkerToTask,
    setSelectedWorkerForPassport,
    setCurrentView,
    t
  } = useApp();

  const [selectedTaskToAssign, setSelectedTaskToAssign] = useState<FarmTask | null>(
    tasks.find(t => t.id === 'task-4') || tasks[0]
  );
  const [workerToConfirm, setWorkerToConfirm] = useState<WorkerProfile | null>(null);
  const [filterCrop, setFilterCrop] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredWorkers = workers.filter(w => {
    const matchesSearch =
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCrop = filterCrop === 'All' || w.cropExpertise.includes(filterCrop);
    return matchesSearch && matchesCrop;
  });

  const handleOpenAssignModal = (worker: WorkerProfile) => {
    setWorkerToConfirm(worker);
  };

  const handleConfirmAssignment = () => {
    if (workerToConfirm && selectedTaskToAssign) {
      assignWorkerToTask(workerToConfirm.id, selectedTaskToAssign.id);
      setWorkerToConfirm(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-orange-50 text-orange-700 border border-orange-200">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-[#1B4332]">
                {t('workers.title', 'Recommended Agricultural Workers')}
              </h1>
              <p className="text-xs text-stone-500">
                {t('workers.subtitle', 'AI matching algorithm ranks local workers by verified crop expertise, skill passport ratings, and reliability.')}
              </p>
            </div>
          </div>
        </div>

        {/* Task target selector */}
        <div className="flex items-center gap-2 bg-[#FAF9F5] p-2 rounded-xl border border-stone-200">
          <span className="text-xs font-semibold text-stone-600">{t('workers.assigning_for', 'Assigning for')}:</span>
          <select
            value={selectedTaskToAssign?.id || ''}
            onChange={e => {
              const matchedTask = tasks.find(item => item.id === e.target.value);
              if (matchedTask) setSelectedTaskToAssign(matchedTask);
            }}
            className="text-xs font-bold text-[#1B4332] bg-white px-2.5 py-1.5 rounded-lg border border-stone-200 outline-hidden"
          >
            {tasks.map(taskItem => (
              <option key={taskItem.id} value={taskItem.id}>
                {taskItem.stage}: {taskItem.title.slice(0, 35)}... ({taskItem.assignedWorkers.length}/{taskItem.requiredWorkers} assigned)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={t('workers.search_placeholder', 'Search by worker name, location...')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-stone-200 rounded-lg outline-hidden focus:border-[#1B4332]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-stone-500" />
          <span className="text-stone-600 font-semibold">{t('workers.crop_expertise', 'Crop Expertise')}:</span>
          <div className="flex gap-1">
            {['All', 'Groundnut', 'Ragi', 'Tomato', 'Rice'].map(crop => (
              <button
                key={crop}
                onClick={() => setFilterCrop(crop)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filterCrop === crop
                    ? 'bg-[#1B4332] text-white font-bold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {crop === 'All' ? t('workers.filter_all', 'All') : crop}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Worker Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredWorkers.map(worker => {
          const isAssignedToCurrentTask = selectedTaskToAssign?.assignedWorkers.includes(worker.id);

          return (
            <div
              key={worker.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Top Worker Profile Info */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={worker.avatarUrl}
                      alt={worker.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-stone-200 shadow-2xs"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-display font-bold text-base text-stone-900">
                          {worker.name}
                        </h3>
                        <span title="Verified Skill Passport" className="text-emerald-600">
                          <ShieldCheck className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{worker.location}</span>
                        <span>•</span>
                        <span className="font-semibold text-stone-700">{worker.yearsOfExperience} {t('workers.yrs_exp', 'yrs exp')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Success Score Badge */}
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-xl font-display font-black text-sm">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{worker.successScore}</span>
                      <span className="text-[10px] text-emerald-600 font-normal">/100</span>
                    </div>
                    <div className="text-[10px] text-stone-400 mt-0.5">
                      {worker.verifiedJobs} {t('workers.verified_jobs', 'verified jobs')}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-stone-600 leading-snug mb-3">
                  {worker.bio}
                </p>

                {/* Crop Expertise Tags */}
                <div className="mb-3">
                  <div className="text-[11px] font-semibold text-stone-500 mb-1">{t('workers.crop_expertise', 'Crop Expertise')}:</div>
                  <div className="flex flex-wrap gap-1">
                    {worker.cropExpertise.map(c => (
                      <span
                        key={c}
                        className={`text-[11px] px-2 py-0.5 rounded-md font-semibold ${
                          c === 'Groundnut'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Detailed Skills Matrix */}
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1.5 mb-4 text-xs">
                  {worker.skills.slice(0, 3).map(sk => (
                    <div key={sk.name} className="flex items-center justify-between">
                      <span className="text-stone-700 font-medium">{sk.name}</span>
                      <span
                        className={`font-bold text-[11px] px-2 py-0.2 rounded ${
                          sk.level === 'Expert'
                            ? 'bg-emerald-100 text-emerald-800'
                            : sk.level === 'Advanced'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {sk.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px]">{t('workers.expected_wage', 'Expected Daily Wage')}</span>
                  <span className="font-bold text-stone-800 text-sm">₹{worker.dailyWage} / {t('workers.day_unit', 'day')}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedWorkerForPassport(worker);
                      setCurrentView('skill_passport');
                    }}
                    className="px-3 py-1.5 rounded-lg border border-stone-200 text-stone-700 font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    {t('workers.view_profile', 'View Profile')}
                  </button>

                  <button
                    onClick={() => handleOpenAssignModal(worker)}
                    disabled={isAssignedToCurrentTask}
                    id={`assign-to-task-btn-${worker.id}`}
                    className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      isAssignedToCurrentTask
                        ? 'bg-emerald-100 text-emerald-800 cursor-default'
                        : 'bg-[#1B4332] hover:bg-[#143427] text-white shadow-xs'
                    }`}
                  >
                    {isAssignedToCurrentTask ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{t('workers.assigned', 'Assigned')}</span>
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>{t('workers.assign_to_task', 'Assign to Task')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Step Workflow Banner */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#1B4332] flex items-center justify-center font-bold text-xs">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-stone-900">Workers Verified & Available</div>
            <div className="text-[11px] text-stone-500">Agricultural specialists matched to active crop cycle. Proceed to Task Management.</div>
          </div>
        </div>
        <button
          onClick={() => setCurrentView('tasks')}
          id="next-step-tasks-btn"
          className="px-4 py-2 bg-[#1B4332] hover:bg-[#143427] text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <span>Review Farm Tasks & Assignments</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
        </button>
      </div>

      {/* ASSIGNMENT CONFIRMATION MODAL */}
      {workerToConfirm && selectedTaskToAssign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            {/* Header */}
            <div className="bg-[#1B4332] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-amber-400" />
                <h3 className="font-display font-bold text-base">
                  {t('workers.confirm_assign_title', 'Confirm Worker Assignment')}
                </h3>
              </div>
              <button
                onClick={() => setWorkerToConfirm(null)}
                className="text-stone-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4 text-xs">
              <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                <img
                  src={workerToConfirm.avatarUrl}
                  alt={workerToConfirm.name}
                  className="w-12 h-12 rounded-xl object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">
                    {workerToConfirm.name}
                  </h4>
                  <p className="text-stone-500 text-[11px]">
                    {t('workers.success_score', 'Success Score')}: <strong>{workerToConfirm.successScore}/100</strong> · {workerToConfirm.yearsOfExperience} {t('workers.yrs_exp', 'yrs experience')}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-950">
                <div className="font-bold text-sm text-[#1B4332] mb-1">
                  {t('workers.assign_question', 'Assign')} {workerToConfirm.name} {t('reports.of_tasks', 'to')} {selectedTaskToAssign.stage}?
                </div>
                <p className="text-xs text-amber-900 leading-snug">
                  {t('tasks.title', 'Task')}: <strong>{selectedTaskToAssign.title}</strong>
                </p>
                <div className="mt-2 text-[11px] text-amber-800 space-y-0.5">
                  <div>• Farm: Green Valley Farm (2.0 Acres)</div>
                  <div>• Daily Wage: ₹{workerToConfirm.dailyWage} / day</div>
                  <div>• Skill Passport: Verified history will link to photo evidence upon completion.</div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="bg-stone-50 border-t border-stone-200 p-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setWorkerToConfirm(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
              >
                {t('common.cancel', 'Cancel')}
              </button>
              <button
                onClick={handleConfirmAssignment}
                className="px-5 py-2 text-xs font-bold text-white bg-[#1B4332] hover:bg-[#143427] rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t('workers.assign_worker_btn', 'Assign Worker')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
