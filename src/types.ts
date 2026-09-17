export type UserRole = 'urban_cofarmer' | 'landowner' | 'worker';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  location: string;
  avatarInitials: string;
  title: string;
  details?: {
    landowner?: {
      acreage: number;
      farmName: string;
      surveyNumber?: string;
      soilType?: string;
    };
    worker?: {
      skills: string[];
      experienceYears: number;
      passportId: string;
      reliabilityScore: number;
      dailyWage: number;
    };
    urbanCoFarmer?: {
      participatingFarmsCount: number;
      preferences: string[];
      totalContribution?: string;
    };
  };
}

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface WorkerSkill {
  name: string;
  level: SkillLevel;
  verifiedJobsCount: number;
}

export interface WorkHistoryItem {
  id: string;
  farmName: string;
  crop: string;
  taskType: string;
  completedDate: string;
  supervisor: string;
  rating: number;
  evidencePhotoUrl?: string;
  verificationHash: string;
}

export interface WorkerProfile {
  id: string;
  name: string;
  avatarUrl: string;
  location: string;
  yearsOfExperience: number;
  dailyWage: number; // in INR (₹)
  phone: string;
  availability: 'Available' | 'Assigned' | 'On Leave';
  successScore: number; // e.g. 91%
  verifiedJobs: number;
  cropExpertise: string[];
  skills: WorkerSkill[];
  bio: string;
  workHistory: WorkHistoryItem[];
  badges: string[];
  assignedTasksCount: number;
}

export type TaskStatus = 'Completed' | 'In Progress' | 'Pending' | 'Flagged';

export interface FarmTask {
  id: string;
  title: string;
  week: number;
  stage: 'Land Preparation' | 'Sowing' | 'Irrigation' | 'Growing' | 'Weeding' | 'Crop Monitoring' | 'Harvest';
  dueDate: string;
  requiredWorkers: number;
  assignedWorkers: string[]; // Worker IDs
  recommendedSkills: string[];
  status: TaskStatus;
  evidenceId?: string;
  description: string;
  notes?: string;
  estimatedHours: number;
}

export interface EvidenceRecord {
  id: string;
  taskId: string;
  taskName: string;
  date: string;
  timestamp: string;
  locationUnit: string;
  workerId: string;
  workerName: string;
  photoUrl: string;
  aiStatus: 'AI consistency check passed' | 'Flagged for inconsistency' | 'Pending Review';
  aiConfidenceScore: number;
  aiNotes: string;
  verifiedBySupervisor?: string;
  gpsCoordinates: string;
}

export interface WorkforcePlanWeek {
  weekNumber: number;
  weekLabel: string;
  activity: string;
  stage: string;
  requiredWorkers: number;
  availableWorkersCount: number;
  recommendedSkills: string[];
  bestMatches: string[]; // Worker IDs
  status: 'Completed' | 'Current' | 'Upcoming';
  notes: string;
}

export interface CropRotationPlan {
  previousCrop: {
    name: string;
    duration: string;
    harvestYield: string;
    soilImpact: string;
  };
  currentCrop: {
    name: string;
    stage: string;
    day: number;
    totalDays: number;
    benefits: string;
  };
  recommendedNextCrop: {
    name: string;
    recommendedMonth: string;
    benefits: string[];
    soilHealthBoost: string;
    nitrogenFixation: string;
    waterRequirement: 'Low' | 'Medium' | 'High';
    diseaseInterruptionScore: string;
  };
  rotationExplanation: string;
  nutrientBalanceFactors: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    organicMatter: number;
  };
}

export interface YieldScenario {
  bestCaseTonnes: number;
  expectedTonnes: number;
  riskCaseTonnes: number;
  confidenceInterval: string;
  lastUpdated: string;
  influencingFactors: {
    cropStage: string;
    farmProgressPercent: number;
    weatherCondition: string;
    waterAvailability: string;
    soilNutrientIndex: string;
    pestRiskIndex: string;
    workerEfficiency: string;
  };
}

export interface FarmProject {
  id: string;
  name: string;
  tagline: string;
  location: string;
  state: string;
  district: string;
  areaAcres: number;
  currentCrop: string;
  currentStage: 'Land Preparation' | 'Sowing' | 'Irrigation' | 'Growing' | 'Weeding' | 'Crop Monitoring' | 'Harvest';
  currentDay: number;
  totalDays: number;
  progressPercent: number;
  cropHealth: 'Good' | 'Fair' | 'Poor';
  waterStatus: 'Adequate' | 'Deficit' | 'Surplus';
  soilType: string;
  activeWorkersCount: number;
  totalWorkersAllocated: number;
  tasksCompleted: number;
  totalTasks: number;
  nextActivity: string;
  imageUrl: string;
  yieldEstimate: YieldScenario;
  landownerName: string;
  landownerPhone: string;
  urbanCoFarmerName: string;
  projectStartDate: string;
  expectedHarvestDate: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'ai' | 'task' | 'evidence' | 'worker';
}
