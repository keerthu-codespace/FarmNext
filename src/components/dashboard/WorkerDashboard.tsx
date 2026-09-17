import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Camera,
  ShieldCheck,
  Briefcase,
  AlertCircle,
  FileCheck,
  ChevronRight,
  TrendingUp,
  UserCheck,
  Phone,
  Bell
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FarmTask, TaskStatus } from '../../types';

export const WorkerDashboard: React.FC = () => {
  const { currentUser, farm, tasks, workers, evidence, updateTaskStatus, setCurrentView, t } = useApp();

  // Find worker profile matching current user or fallback to Ramesh Kumar
  const currentWorker =
    workers.find(w => w.name.toLowerCase() === (currentUser?.name || '').toLowerCase()) ||
    workers[0]; // Ramesh Kumar

  // Filter tasks assigned to this worker
  const assignedTasks = tasks.filter(t => t.assignedWorkers.includes(currentWorker.id));
  const activeTasks = assignedTasks.filter(t => t.status === 'In Progress' || t.status === 'Pending');
  const completedTasks = assignedTasks.filter(t => t.status === 'Completed');

  // Filter evidence submitted by this worker
  const workerEvidence = evidence.filter(e => e.workerId === currentWorker.id || e.workerName.includes(currentWorker.name));

  const [selectedTaskToUpdate, setSelectedTaskToUpdate] = useState<FarmTask | null>(null);
  const [evidenceSubmittedSuccess, setEvidenceSubmittedSuccess] = useState(false);

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    updateTaskStatus(taskId, newStatus);
    setEvidenceSubmittedSuccess(true);
    setTimeout(() => setEvidenceSubmittedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Worker Profile Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#1B4332] text-amber-300 flex items-center justify-center font-bold text-2xl font-display shadow-xs">
            {currentWorker.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-[#1B4332]">
                {currentWorker.name}
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                Verified Skill Passport
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5 flex flex-wrap items-center gap-2">
              <span>{currentWorker.bio}</span>
              <span className="text-stone-300">·</span>
              <span className="flex items-center gap-1 text-stone-600">
                <MapPin className="w-3 h-3 text-stone-400" />
                {currentWorker.location}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right px-3 py-1.5 bg-[#FAF9F5] rounded-xl border border-stone-200">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Daily Standard Wage</span>
            <span className="font-display font-black text-lg text-[#1B4332]">₹{currentWorker.dailyWage}</span>
          </div>
          <button
            onClick={() => setCurrentView('skill_passport')}
            className="px-4 py-2.5 bg-[#1B4332] hover:bg-[#143427] text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>View Full Passport</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Vitals Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Assigned Farm Plot</span>
            <MapPin className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="font-display font-bold text-base text-stone-900 truncate">{farm.name}</div>
          <div className="text-[11px] text-stone-500 mt-0.5">{farm.location} · {farm.currentCrop}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Pending & Active Tasks</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-display font-bold text-2xl text-amber-700">{activeTasks.length} Tasks</div>
          <div className="text-[11px] text-stone-500 mt-0.5">Due this week</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Verified Work History</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-display font-bold text-2xl text-[#1B4332]">{currentWorker.verifiedJobs} Jobs</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Supervisor certified</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Skill Reliability Score</span>
            <Award className="w-4 h-4 text-blue-600" />
          </div>
          <div className="font-display font-bold text-2xl text-blue-800">{currentWorker.successScore}%</div>
          <div className="text-[11px] text-blue-600 font-medium mt-0.5">Tier 1 Agricultural Specialist</div>
        </div>
      </div>

      {/* Main Split: Assigned Tasks & Work Schedule vs. Skill Verification & Evidence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Active Assigned Tasks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Field Tasks */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h2 className="font-display text-base font-bold text-[#1B4332]">
                  Current Field Assignments ({activeTasks.length})
                </h2>
                <p className="text-xs text-stone-500">
                  Tasks scheduled for {farm.name} during {farm.currentCrop} {farm.currentStage}.
                </p>
              </div>
              <button
                onClick={() => setCurrentView('tasks')}
                className="text-xs font-semibold text-[#1B4332] hover:underline flex items-center gap-1"
              >
                <span>All Tasks</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {evidenceSubmittedSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Task status updated successfully. Telemetry logged in verification trail.</span>
              </div>
            )}

            <div className="space-y-3">
              {activeTasks.length === 0 ? (
                <div className="p-6 text-center text-stone-500 text-xs bg-stone-50 rounded-2xl">
                  No active pending tasks. All scheduled assignments for this stage are up to date!
                </div>
              ) : (
                activeTasks.map(task => (
                  <div
                    key={task.id}
                    className="p-4 rounded-2xl border border-stone-200 hover:border-emerald-300 transition-colors bg-[#FAF9F5] space-y-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-stone-900">{task.title}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              task.status === 'In Progress'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {task.status}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 mt-1">{task.description}</p>
                      </div>

                      <div className="text-right text-xs">
                        <span className="text-stone-400 block text-[10px] uppercase">Due Date</span>
                        <span className="font-semibold text-stone-800">{task.dueDate}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200/80 text-xs">
                      <div className="flex items-center gap-2 text-stone-500 text-[11px]">
                        <span>Stage: <strong>{task.stage}</strong></span>
                        <span>·</span>
                        <span>Est. Duration: <strong>{task.estimatedHours} hrs</strong></span>
                      </div>

                      <div className="flex items-center gap-2">
                        {task.status !== 'In Progress' && (
                          <button
                            onClick={() => handleStatusChange(task.id, 'In Progress')}
                            className="px-3 py-1.5 bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                          >
                            Start Work
                          </button>
                        )}
                        <button
                          onClick={() => handleStatusChange(task.id, 'Completed')}
                          className="px-3 py-1.5 bg-[#1B4332] hover:bg-[#143427] text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                          <span>Mark Complete</span>
                        </button>
                        <button
                          onClick={() => setCurrentView('monitoring')}
                          title="Upload photo evidence"
                          className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
                        >
                          <Camera className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Upcoming Work Schedule */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h2 className="font-display text-base font-bold text-[#1B4332]">
                  Upcoming Field Schedule
                </h2>
                <p className="text-xs text-stone-500">
                  Agreed agricultural milestones for {farm.name}.
                </p>
              </div>
              <span className="text-xs bg-emerald-50 text-[#1B4332] font-semibold px-2.5 py-1 rounded-lg border border-emerald-200">
                Groundnut Cycle: Day 45/110
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-emerald-700" />
                  <div>
                    <div className="font-bold text-stone-900">Peg Formation & Gypsum Top-Dressing</div>
                    <div className="text-[11px] text-stone-500">Mandya Plot B · 50 kg/acre calcium sulfate placement</div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-stone-600">Day 50-55</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-blue-700" />
                  <div>
                    <div className="font-bold text-stone-900">Subsurface Moisture Optimization & Drip Calibration</div>
                    <div className="text-[11px] text-stone-500">Ensuring steady 38-42% volumetric moisture around root zone</div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-stone-600">Day 60</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-amber-700" />
                  <div>
                    <div className="font-bold text-stone-900">Pre-Harvest Pod Maturity Sampling</div>
                    <div className="text-[11px] text-stone-500">Hull scraping color test for harvest readiness</div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-stone-600">Day 95-100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Skill Passport & Verified Work History */}
        <div className="space-y-6">
          {/* Skill Passport Summary */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-bold text-[#1B4332] flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Skill Passport Competencies</span>
              </h3>
              <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Verified
              </span>
            </div>

            <div className="space-y-2.5">
              {currentWorker.skills.map((skill, idx) => (
                <div key={idx} className="p-2.5 bg-[#FAF9F5] rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-stone-900">{skill.name}</span>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                      {skill.level}
                    </span>
                  </div>
                  <div className="text-[10px] text-stone-500 flex justify-between">
                    <span>Verified Tasks Completed:</span>
                    <strong className="text-stone-700">{skill.verifiedJobsCount} jobs</strong>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentView('skill_passport')}
              className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl transition-colors text-center block cursor-pointer"
            >
              Open Full Cryptographic Passport
            </button>
          </div>

          {/* Recent Work Verification Stream */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-3">
            <h3 className="font-display text-sm font-bold text-[#1B4332] flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Supervisor Verification Logs</span>
            </h3>

            <div className="space-y-2">
              {workerEvidence.slice(0, 3).map(ev => (
                <div key={ev.id} className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                  <div className="flex items-center justify-between font-bold text-stone-900">
                    <span className="truncate">{ev.taskName}</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold shrink-0">
                      Approved
                    </span>
                  </div>
                  <div className="text-[10px] text-stone-500 mt-1 flex justify-between">
                    <span>{ev.date} · {ev.locationUnit}</span>
                    <span className="font-mono text-stone-400">Score: {ev.aiConfidenceScore}%</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentView('monitoring')}
              className="w-full py-2 text-xs font-semibold text-[#1B4332] hover:underline text-center cursor-pointer"
            >
              View Photo Verification Logs →
            </button>
          </div>

          {/* Field Supervisor Contact */}
          <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-stone-200 text-xs space-y-2">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Field Coordinator & Landowner</span>
            <div className="font-bold text-stone-900">{farm.landownerName}</div>
            <div className="text-stone-500 flex items-center gap-1">
              <Phone className="w-3 h-3 text-stone-400" />
              <span>{farm.landownerPhone}</span>
            </div>
            <div className="text-[11px] text-stone-500">Plot B, Mandya District, Karnataka</div>
          </div>
        </div>
      </div>
    </div>
  );
};
