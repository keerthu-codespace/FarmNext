import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserRole,
  UserAccount,
  FarmProject,
  WorkerProfile,
  FarmTask,
  EvidenceRecord,
  WorkforcePlanWeek,
  CropRotationPlan,
  AppNotification,
  TaskStatus
} from '../types';
import { TEST_ACCOUNTS } from '../data/testAccounts';
import {
  Language,
  getTranslation
} from '../i18n/translations';
import {
  INITIAL_FARM,
  INITIAL_WORKERS,
  INITIAL_TASKS,
  INITIAL_EVIDENCE,
  WORKFORCE_PLAN_WEEKS,
  INITIAL_CROP_ROTATION,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

interface AppContextType {
  currentUser: UserAccount | null;
  setCurrentUser: (user: UserAccount | null) => void;
  logout: () => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  farm: FarmProject;
  setFarm: React.Dispatch<React.SetStateAction<FarmProject>>;
  workers: WorkerProfile[];
  tasks: FarmTask[];
  evidence: EvidenceRecord[];
  workforcePlan: WorkforcePlanWeek[];
  cropRotation: CropRotationPlan;
  notifications: AppNotification[];
  showLanding: boolean;
  setShowLanding: (show: boolean) => void;
  registrationModalOpen: boolean;
  setRegistrationModalOpen: (open: boolean) => void;
  registrationRole: UserRole;
  setRegistrationRole: (role: UserRole) => void;
  selectedWorkerForPassport: WorkerProfile | null;
  setSelectedWorkerForPassport: (worker: WorkerProfile | null) => void;
  selectedTaskForDetail: FarmTask | null;
  setSelectedTaskForDetail: (task: FarmTask | null) => void;
  selectedEvidenceForDetail: EvidenceRecord | null;
  setSelectedEvidenceForDetail: (evidence: EvidenceRecord | null) => void;
  assignWorkerToTask: (workerId: string, taskId: string) => void;
  removeWorkerFromTask: (workerId: string, taskId: string) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  addNewEvidence: (record: Omit<EvidenceRecord, 'id'>) => void;
  markNotificationRead: (id: string) => void;
  triggerConfetti: () => void;
  isAiRecalculating: boolean;
  recalculateAiPlan: (cropOverride?: string, soilOverride?: string) => Promise<void>;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(TEST_ACCOUNTS[0]); // Default to Savitri Gowda
  const [currentRole, setCurrentRole] = useState<UserRole>('landowner');
  const [currentView, setCurrentView] = useState<string>('welcome');

  const logout = () => {
    setCurrentUser(null);
    setCurrentRole('landowner');
    setCurrentView('welcome');
  };
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('farmnext_language');
      if (saved && (saved === 'en' || saved === 'kn' || saved === 'hi' || saved === 'te')) {
        return saved as Language;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem('farmnext_language', newLang);
    } catch {
      // ignore
    }
  };

  const t = (key: string, fallback?: string): string => {
    return getTranslation(key, language, fallback);
  };

  const [farm, setFarm] = useState<FarmProject>(INITIAL_FARM);
  const [workers, setWorkers] = useState<WorkerProfile[]>(INITIAL_WORKERS);
  const [tasks, setTasks] = useState<FarmTask[]>(INITIAL_TASKS);
  const [evidence, setEvidence] = useState<EvidenceRecord[]>(INITIAL_EVIDENCE);
  const [workforcePlan, setWorkforcePlan] = useState<WorkforcePlanWeek[]>(WORKFORCE_PLAN_WEEKS);
  const [cropRotation, setCropRotation] = useState<CropRotationPlan>(INITIAL_CROP_ROTATION);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [registrationModalOpen, setRegistrationModalOpen] = useState<boolean>(false);
  const [registrationRole, setRegistrationRole] = useState<UserRole>('urban_cofarmer');

  const [selectedWorkerForPassport, setSelectedWorkerForPassport] = useState<WorkerProfile | null>(null);
  const [selectedTaskForDetail, setSelectedTaskForDetail] = useState<FarmTask | null>(null);
  const [selectedEvidenceForDetail, setSelectedEvidenceForDetail] = useState<EvidenceRecord | null>(null);
  const [isAiRecalculating, setIsAiRecalculating] = useState<boolean>(false);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#1B4332', '#2D6A4F', '#D97706', '#EAB308', '#2563EB']
      });
    } catch {
      // ignore
    }
  };

  const assignWorkerToTask = (workerId: string, taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(t => {
        if (t.id === taskId) {
          const alreadyAssigned = t.assignedWorkers.includes(workerId);
          const newAssigned = alreadyAssigned ? t.assignedWorkers : [...t.assignedWorkers, workerId];
          const newStatus: TaskStatus = newAssigned.length >= t.requiredWorkers ? 'In Progress' : t.status;
          return {
            ...t,
            assignedWorkers: newAssigned,
            status: newStatus
          };
        }
        return t;
      })
    );

    setWorkers(prevWorkers =>
      prevWorkers.map(w => {
        if (w.id === workerId) {
          return {
            ...w,
            availability: 'Assigned',
            assignedTasksCount: w.assignedTasksCount + 1
          };
        }
        return w;
      })
    );

    // Add notification
    const worker = workers.find(w => w.id === workerId);
    const task = tasks.find(t => t.id === taskId);
    if (worker && task) {
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          title: 'Worker Assigned',
          message: `${worker.name} assigned to "${task.title}". Skill Passport linked for verification.`,
          timestamp: 'Just now',
          read: false,
          type: 'worker'
        },
        ...prev
      ]);
    }

    triggerConfetti();
  };

  const removeWorkerFromTask = (workerId: string, taskId: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          return {
            ...t,
            assignedWorkers: t.assignedWorkers.filter(id => id !== workerId)
          };
        }
        return t;
      })
    );
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          return { ...t, status };
        }
        return t;
      })
    );

    // Update farm tasks completed count if completed
    const completedCount = tasks.filter(t => (t.id === taskId ? status === 'Completed' : t.status === 'Completed')).length;
    setFarm(prev => ({
      ...prev,
      tasksCompleted: completedCount,
      progressPercent: Math.round((completedCount / prev.totalTasks) * 100)
    }));
  };

  const addNewEvidence = (record: Omit<EvidenceRecord, 'id'>) => {
    const newRecord: EvidenceRecord = {
      ...record,
      id: `ev-${Date.now()}`
    };
    setEvidence(prev => [newRecord, ...prev]);

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Evidence Uploaded',
        message: `${newRecord.workerName} submitted evidence for ${newRecord.taskName}. AI Status: ${newRecord.aiStatus}.`,
        timestamp: 'Just now',
        read: false,
        type: 'evidence'
      },
      ...prev
    ]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const recalculateAiPlan = async (cropOverride?: string, soilOverride?: string) => {
    setIsAiRecalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1200));

    if (cropOverride) {
      setFarm(prev => ({
        ...prev,
        currentCrop: cropOverride,
        soilType: soilOverride || prev.soilType
      }));
    }

    setIsAiRecalculating(false);
    triggerConfetti();

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'AI Workforce Re-Optimized',
        message: 'Workforce allocation and skill scoring updated against latest field parameters.',
        timestamp: 'Just now',
        read: false,
        type: 'ai'
      },
      ...prev
    ]);
  };

  const resetDemoData = () => {
    setFarm(INITIAL_FARM);
    setWorkers(INITIAL_WORKERS);
    setTasks(INITIAL_TASKS);
    setEvidence(INITIAL_EVIDENCE);
    setWorkforcePlan(WORKFORCE_PLAN_WEEKS);
    setCropRotation(INITIAL_CROP_ROTATION);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCurrentRole('landowner');
    setCurrentView('welcome');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        logout,
        currentRole,
        setCurrentRole,
        currentView,
        setCurrentView,
        language,
        setLanguage,
        t,
        farm,
        setFarm,
        workers,
        tasks,
        evidence,
        workforcePlan,
        cropRotation,
        notifications,
        showLanding,
        setShowLanding,
        registrationModalOpen,
        setRegistrationModalOpen,
        registrationRole,
        setRegistrationRole,
        selectedWorkerForPassport,
        setSelectedWorkerForPassport,
        selectedTaskForDetail,
        setSelectedTaskForDetail,
        selectedEvidenceForDetail,
        setSelectedEvidenceForDetail,
        assignWorkerToTask,
        removeWorkerFromTask,
        updateTaskStatus,
        addNewEvidence,
        markNotificationRead,
        triggerConfetti,
        isAiRecalculating,
        recalculateAiPlan,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
