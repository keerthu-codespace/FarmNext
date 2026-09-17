import React, { useState } from 'react';
import {
  CheckSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
  Calendar,
  Camera,
  Filter,
  Search,
  Plus,
  X,
  UserCheck,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FarmTask, TaskStatus } from '../../types';

export const TaskManagement: React.FC = () => {
  const {
    tasks,
    workers,
    evidence,
    updateTaskStatus,
    assignWorkerToTask,
    setSelectedEvidenceForDetail,
    setCurrentView,
    t
  } = useApp();

  const [filterStage, setFilterStage] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedTask, setSelectedTask] = useState<FarmTask | null>(null);
  const [workerToAssignId, setWorkerToAssignId] = useState<string>('');

  const filteredTasks = tasks.filter(task => {
    const stageMatch = filterStage === 'All' || task.stage === filterStage;
    const statusMatch = filterStatus === 'All' || task.status === filterStatus;
    return stageMatch && statusMatch;
  });

  const getWorkerNames = (workerIds: string[]) => {
    if (workerIds.length === 0) return t('tasks.unassigned', 'Unassigned');
    return workerIds
      .map(id => {
        const w = workers.find(item => item.id === id);
        return w ? w.name : id;
      })
      .join(', ');
  };

  const handleAssignWorkerFromModal = () => {
    if (selectedTask && workerToAssignId) {
      assignWorkerToTask(workerToAssignId, selectedTask.id);
      setSelectedTask(prev =>
        prev ? { ...prev, assignedWorkers: [...prev.assignedWorkers, workerToAssignId] } : null
      );
      setWorkerToAssignId('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-orange-50 text-orange-700 border border-orange-200">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-[#1B4332]">
                {t('tasks.page_title', 'Farm Task Management & Verification Ledger')}
              </h1>
              <p className="text-xs text-stone-500">
                {t('tasks.page_subtitle', 'Transparent milestone tracking connecting agricultural workers, landowners, and co-farmers.')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl font-semibold">
            {tasks.filter(task => task.status === 'Completed').length} / {tasks.length} {t('timeline.completed', 'Completed')}
          </span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-stone-500" />
          <span className="text-stone-600 font-semibold">{t('tasks.filter_stage', 'Filter Stage')}:</span>
          <select
            value={filterStage}
            onChange={e => setFilterStage(e.target.value)}
            className="p-1.5 bg-stone-50 border border-stone-200 rounded-lg outline-hidden font-medium"
          >
            <option value="All">{t('tasks.all_stages', 'All Stages')}</option>
            <option value="Land Preparation">Land Preparation</option>
            <option value="Sowing">Sowing</option>
            <option value="Irrigation">Irrigation</option>
            <option value="Growing">Growing</option>
            <option value="Weeding">Weeding</option>
            <option value="Crop Monitoring">Crop Monitoring</option>
            <option value="Harvest">Harvest</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-stone-600 font-semibold">{t('reports.status', 'Status')}:</span>
          <div className="flex gap-1">
            {['All', 'Completed', 'In Progress', 'Pending'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  filterStatus === status
                    ? 'bg-[#1B4332] text-white font-bold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {status === 'All' ? t('workers.filter_all', 'All') : status === 'Completed' ? t('timeline.completed', 'Completed') : status === 'In Progress' ? t('timeline.in_progress', 'In Progress') : t('timeline.pending', 'Pending')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TASKS TABLE */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">{t('tasks.task_name_col', 'Task Name')}</th>
                <th className="py-3.5 px-4">{t('tasks.stage_col', 'Stage')}</th>
                <th className="py-3.5 px-4">{t('tasks.assigned_workers_col', 'Assigned Worker(s)')}</th>
                <th className="py-3.5 px-4">{t('tasks.due_date_col', 'Due Date')}</th>
                <th className="py-3.5 px-4">{t('reports.status', 'Status')}</th>
                <th className="py-3.5 px-4">{t('tasks.evidence_col', 'Evidence')}</th>
                <th className="py-3.5 px-4 text-right">{t('tasks.action_col', 'Action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredTasks.map(task => {
                const isCompleted = task.status === 'Completed';
                const isInProgress = task.status === 'In Progress';
                const hasEvidence = task.evidenceId || isCompleted;

                return (
                  <tr
                    key={task.id}
                    id={`task-row-${task.id}`}
                    className="hover:bg-[#FAF9F5] transition-colors cursor-pointer"
                    onClick={() => setSelectedTask(task)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900 text-xs">{task.title}</div>
                      <div className="text-[11px] text-stone-400">Week {task.week} · {task.estimatedHours} {t('tasks.hrs_est', 'hrs est.')}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="bg-stone-100 text-stone-700 font-semibold px-2 py-0.5 rounded text-[11px]">
                        {task.stage}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-stone-800">
                        {getWorkerNames(task.assignedWorkers)}
                      </div>
                      <div className="text-[10px] text-stone-400">
                        {task.assignedWorkers.length} of {task.requiredWorkers} workers
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-stone-600 font-medium">
                      {task.dueDate}
                    </td>

                    <td className="py-3.5 px-4">
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </span>
                      ) : isInProgress ? (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full font-bold text-[11px]">
                          <Clock className="w-3.5 h-3.5" /> In Progress
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full font-medium text-[11px]">
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {hasEvidence ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                          <Camera className="w-3.5 h-3.5" /> {t('tasks.photo_verified', 'Photo Verified')}
                        </span>
                      ) : (
                        <span className="text-stone-400 text-[11px]">{t('tasks.awaiting_completion', 'Awaiting Completion')}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedTask(task);
                        }}
                        className="px-3 py-1 rounded-lg border border-stone-200 font-semibold text-stone-700 hover:bg-stone-200 transition-colors text-[11px] cursor-pointer"
                      >
                        {t('tasks.details_btn', 'Details')}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Next Step Workflow Banner */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#1B4332] flex items-center justify-center font-bold text-xs">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-stone-900">Task Management & Assignments Active</div>
            <div className="text-[11px] text-stone-500">Tasks assigned & progress tracked. Proceed to inspect photographic work verification.</div>
          </div>
        </div>
        <button
          onClick={() => setCurrentView('monitoring')}
          id="next-step-monitoring-btn"
          className="px-4 py-2 bg-[#1B4332] hover:bg-[#143427] text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <span>Review Work Verification & Evidence</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
        </button>
      </div>

      {/* TASK DETAILS & ASSIGNMENT MODAL */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            {/* Header */}
            <div className="bg-[#1B4332] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  {selectedTask.stage} · Week {selectedTask.week}
                </span>
                <h3 className="font-display font-bold text-base mt-0.5">
                  {selectedTask.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="text-stone-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              <p className="text-stone-600 leading-relaxed">
                {selectedTask.description}
              </p>

              <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <span className="text-stone-400 block text-[10px]">{t('tasks.due_date_col', 'Due Date')}</span>
                  <span className="font-bold text-stone-800">{selectedTask.dueDate}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">{t('tasks.est_hours', 'Estimated Work Hours')}</span>
                  <span className="font-bold text-stone-800">{selectedTask.estimatedHours} Hours</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">{t('planner.req_workers', 'Required Workers')}</span>
                  <span className="font-bold text-stone-800">{selectedTask.requiredWorkers} Workers</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">{t('tasks.current_status', 'Current Status')}</span>
                  <span className="font-bold text-[#1B4332]">{selectedTask.status}</span>
                </div>
              </div>

              {/* Recommended Skills */}
              <div>
                <span className="font-semibold text-stone-700 block mb-1">{t('tasks.rec_skill_tags', 'Recommended Skill Passport Tags')}:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTask.recommendedSkills.map(sk => (
                    <span key={sk} className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-medium">
                      ✦ {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Assign Worker Section */}
              <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xl space-y-2">
                <span className="font-bold text-stone-800 block text-xs">
                  {t('tasks.assigned_workers_col', 'Assigned Workers')} ({selectedTask.assignedWorkers.length}/{selectedTask.requiredWorkers}):
                </span>
                <div className="text-stone-700 font-medium">
                  {getWorkerNames(selectedTask.assignedWorkers)}
                </div>

                <div className="pt-2 flex gap-2">
                  <select
                    value={workerToAssignId}
                    onChange={e => setWorkerToAssignId(e.target.value)}
                    className="flex-1 p-2 bg-white border border-stone-300 rounded-lg text-xs"
                  >
                    <option value="">{t('tasks.select_worker_pool', 'Select worker from pool...')}</option>
                    {workers
                      .filter(w => !selectedTask.assignedWorkers.includes(w.id))
                      .map(w => (
                        <option key={w.id} value={w.id}>
                          {w.name} ({w.yearsOfExperience} yrs exp · ₹{w.dailyWage}/day)
                        </option>
                      ))}
                  </select>
                  <button
                    onClick={handleAssignWorkerFromModal}
                    disabled={!workerToAssignId}
                    className="px-4 py-2 bg-[#1B4332] text-white font-bold rounded-lg disabled:opacity-40 cursor-pointer"
                  >
                    {t('tasks.assign_btn', 'Assign')}
                  </button>
                </div>
              </div>

              {/* Status Toggle Buttons */}
              <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                <span className="font-semibold text-stone-700">{t('tasks.update_status', 'Update Status')}:</span>
                <div className="flex gap-2">
                  {(['Pending', 'In Progress', 'Completed'] as TaskStatus[]).map(st => (
                    <button
                      key={st}
                      onClick={() => {
                        updateTaskStatus(selectedTask.id, st);
                        setSelectedTask(prev => (prev ? { ...prev, status: st } : null));
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                        selectedTask.status === st
                          ? 'bg-[#1B4332] text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {st === 'Pending' ? t('timeline.pending', 'Pending') : st === 'In Progress' ? t('timeline.in_progress', 'In Progress') : t('timeline.completed', 'Completed')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-stone-50 border-t border-stone-200 p-4 text-right">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-5 py-2 bg-[#1B4332] text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                {t('tasks.close_btn', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
