import { FarmProject, WorkerProfile, FarmTask, EvidenceRecord, WorkforcePlanWeek, CropRotationPlan, AppNotification } from '../types';

export const INITIAL_FARM: FarmProject = {
  id: 'farm-green-valley',
  name: 'Green Valley Farm',
  tagline: 'Precision Groundnut Cultivation & Natural Soil Enrichment',
  location: 'Mandya District, Karnataka',
  state: 'Karnataka',
  district: 'Mandya',
  areaAcres: 2,
  currentCrop: 'Groundnut (KDG-123 High-Yield)',
  currentStage: 'Growing',
  currentDay: 45,
  totalDays: 120,
  progressPercent: 72,
  cropHealth: 'Good',
  waterStatus: 'Adequate',
  soilType: 'Red Loamy Soil with High Phosphorus Index',
  activeWorkersCount: 4,
  totalWorkersAllocated: 4,
  tasksCompleted: 18,
  totalTasks: 24,
  nextActivity: 'Weeding & Pod Zone Aeration',
  imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
  landownerName: 'Savitri Gowda',
  landownerPhone: '+91 98451 22910',
  urbanCoFarmerName: 'Ananya Sharma',
  projectStartDate: '14 Jul 2026',
  expectedHarvestDate: '12 Nov 2026',
  yieldEstimate: {
    bestCaseTonnes: 2.15,
    expectedTonnes: 1.85,
    riskCaseTonnes: 1.40,
    confidenceInterval: '88% AI Predictive Accuracy',
    lastUpdated: 'Today at 09:30 AM',
    influencingFactors: {
      cropStage: 'Pegging / Early Pod Formation (Day 45)',
      farmProgressPercent: 72,
      weatherCondition: 'Favourable monsoon showers (28°C avg)',
      waterAvailability: 'Drip & Borewell replenishment adequate',
      soilNutrientIndex: 'Optimal Rhizobium nodulation detected',
      pestRiskIndex: 'Low (Tikka leaf spot suppressed)',
      workerEfficiency: '94% timely task completion'
    }
  }
};

export const INITIAL_WORKERS: WorkerProfile[] = [
  {
    id: 'worker-ramesh',
    name: 'Ramesh Kumar',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    location: 'Mandya, Karnataka',
    yearsOfExperience: 7,
    dailyWage: 580,
    phone: '+91 94812 40182',
    availability: 'Available',
    successScore: 91,
    verifiedJobs: 34,
    cropExpertise: ['Groundnut', 'Tomato', 'Ragi', 'Rice'],
    skills: [
      { name: 'Groundnut Cultivation', level: 'Expert', verifiedJobsCount: 14 },
      { name: 'Weeding & Intercultural', level: 'Expert', verifiedJobsCount: 10 },
      { name: 'Irrigation & Moisture Mgmt', level: 'Advanced', verifiedJobsCount: 8 },
      { name: 'Fertilization & Foliar Spray', level: 'Advanced', verifiedJobsCount: 6 }
    ],
    bio: '7 years of specialized experience in dryland legume crops and micro-irrigation management in South Karnataka.',
    badges: ['Verified Skill Passport', 'Master Weeder', 'Drip Specialist', 'Top Rated 2026'],
    assignedTasksCount: 2,
    workHistory: [
      {
        id: 'wh-1',
        farmName: 'Green Valley Farm',
        crop: 'Groundnut',
        taskType: 'Irrigation & Sensor Moisture Check',
        completedDate: '24 Aug 2026',
        supervisor: 'Savitri Gowda (Landowner)',
        rating: 4.9,
        evidencePhotoUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
        verificationHash: 'FN-VER-8821-KRN'
      },
      {
        id: 'wh-2',
        farmName: 'Kaveri Agro Unit 4',
        crop: 'Tomato',
        taskType: 'Trellising & Pruning',
        completedDate: '10 Jun 2026',
        supervisor: 'Nagaraj Swamy',
        rating: 5.0,
        evidencePhotoUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef231f8?auto=format&fit=crop&w=800&q=80',
        verificationHash: 'FN-VER-7301-MND'
      },
      {
        id: 'wh-3',
        farmName: 'Cauvery Basin Farm',
        crop: 'Groundnut',
        taskType: 'Basal Fertilization & Ridge Forming',
        completedDate: '18 Jul 2026',
        supervisor: 'Savitri Gowda',
        rating: 4.8,
        evidencePhotoUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
        verificationHash: 'FN-VER-6490-KRN'
      }
    ]
  },
  {
    id: 'worker-suresh',
    name: 'Suresh Gowda',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    location: 'Maddur, Karnataka',
    yearsOfExperience: 9,
    dailyWage: 600,
    phone: '+91 97410 88231',
    availability: 'Assigned',
    successScore: 94,
    verifiedJobs: 42,
    cropExpertise: ['Groundnut', 'Ragi', 'Sugarcane', 'Pulses'],
    skills: [
      { name: 'Sowing & Seed Treatment', level: 'Expert', verifiedJobsCount: 16 },
      { name: 'Land Preparation & Tillage', level: 'Expert', verifiedJobsCount: 15 },
      { name: 'Weeding & Manual Hoeing', level: 'Advanced', verifiedJobsCount: 8 },
      { name: 'Harvest & Pod Threshing', level: 'Expert', verifiedJobsCount: 11 }
    ],
    bio: 'Veteran farm operator with extensive knowledge of seed drill calibration and moisture conservation.',
    badges: ['Verified Skill Passport', 'Soil Prep Master', '100% On-Time Record'],
    assignedTasksCount: 1,
    workHistory: [
      {
        id: 'wh-4',
        farmName: 'Green Valley Farm',
        crop: 'Groundnut',
        taskType: 'Precision Seed Inoculation & Sowing',
        completedDate: '22 Jul 2026',
        supervisor: 'Savitri Gowda',
        rating: 5.0,
        evidencePhotoUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
        verificationHash: 'FN-VER-5112-KRN'
      }
    ]
  },
  {
    id: 'worker-mahesh',
    name: 'Mahesh Patil',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    location: 'Pandavapura, Karnataka',
    yearsOfExperience: 5,
    dailyWage: 540,
    phone: '+91 91480 33491',
    availability: 'Assigned',
    successScore: 89,
    verifiedJobs: 26,
    cropExpertise: ['Groundnut', 'Rice', 'Tomato'],
    skills: [
      { name: 'Irrigation & Drainage', level: 'Expert', verifiedJobsCount: 12 },
      { name: 'Weeding', level: 'Advanced', verifiedJobsCount: 7 },
      { name: 'Bio-Fertilizer Spray', level: 'Intermediate', verifiedJobsCount: 5 }
    ],
    bio: 'Dedicated agricultural worker specializing in canal and precision drip water delivery networks.',
    badges: ['Verified Skill Passport', 'Water Management Pro'],
    assignedTasksCount: 1,
    workHistory: [
      {
        id: 'wh-5',
        farmName: 'Green Valley Farm',
        crop: 'Groundnut',
        taskType: 'Lateral Drip Pressure Flush & Inspection',
        completedDate: '15 Aug 2026',
        supervisor: 'Basavarajappa G.',
        rating: 4.8,
        evidencePhotoUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
        verificationHash: 'FN-VER-4902-KRN'
      }
    ]
  },
  {
    id: 'worker-anil',
    name: 'Anil Naik',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    location: 'Srirangapatna, Karnataka',
    yearsOfExperience: 6,
    dailyWage: 560,
    phone: '+91 96112 77019',
    availability: 'Available',
    successScore: 92,
    verifiedJobs: 30,
    cropExpertise: ['Groundnut', 'Pulses', 'Millets'],
    skills: [
      { name: 'Weeding & De-topping', level: 'Expert', verifiedJobsCount: 14 },
      { name: 'Pest Scouting & Trap Setting', level: 'Advanced', verifiedJobsCount: 9 },
      { name: 'Harvesting', level: 'Advanced', verifiedJobsCount: 7 }
    ],
    bio: 'Expert in manual weeding techniques that protect delicate peg formations in groundnut fields.',
    badges: ['Verified Skill Passport', 'Crop Health Sentinel'],
    assignedTasksCount: 0,
    workHistory: [
      {
        id: 'wh-6',
        farmName: 'Deccan Agrofield 2',
        crop: 'Groundnut',
        taskType: 'Pegging Stage Weeding & Soil Mulch',
        completedDate: '02 Aug 2026',
        supervisor: 'Kiran Rao',
        rating: 4.9,
        evidencePhotoUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
        verificationHash: 'FN-VER-3921-SRA'
      }
    ]
  },
  {
    id: 'worker-priya',
    name: 'Priya Devi',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    location: 'Mandya, Karnataka',
    yearsOfExperience: 8,
    dailyWage: 590,
    phone: '+91 98801 12344',
    availability: 'Available',
    successScore: 96,
    verifiedJobs: 48,
    cropExpertise: ['Groundnut', 'Ragi', 'Vegetables', 'Pulses'],
    skills: [
      { name: 'Weeding & Canopy Care', level: 'Expert', verifiedJobsCount: 22 },
      { name: 'Integrated Pest Management', level: 'Expert', verifiedJobsCount: 18 },
      { name: 'Harvest Grading', level: 'Expert', verifiedJobsCount: 15 }
    ],
    bio: 'Community agro-trainer and certified IPM scout with expertise in soil microbiology and natural crop protection.',
    badges: ['Verified Skill Passport', 'Lead Agri-Worker', 'Zero Pesticide Certified'],
    assignedTasksCount: 0,
    workHistory: []
  }
];

export const INITIAL_TASKS: FarmTask[] = [
  {
    id: 'task-1',
    title: 'Deep Summer Ploughing & Soil Solarization',
    week: 1,
    stage: 'Land Preparation',
    dueDate: '16 Jul 2026',
    requiredWorkers: 3,
    assignedWorkers: ['worker-suresh', 'worker-ramesh'],
    recommendedSkills: ['Land Preparation & Tillage', 'Soil Health'],
    status: 'Completed',
    evidenceId: 'ev-1',
    description: 'Prepare 2-acre plot with disc plough followed by cultivator to break hardpan and aerate root zone.',
    estimatedHours: 18
  },
  {
    id: 'task-2',
    title: 'Seed Treatment with Trichoderma & Precision Sowing',
    week: 2,
    stage: 'Sowing',
    dueDate: '22 Jul 2026',
    requiredWorkers: 4,
    assignedWorkers: ['worker-suresh', 'worker-ramesh'],
    recommendedSkills: ['Sowing & Seed Treatment', 'Groundnut Cultivation'],
    status: 'Completed',
    evidenceId: 'ev-2',
    description: 'Sow certified KDG-123 seeds at 30cm row-to-row and 10cm plant-to-plant spacing with bio-inoculant coating.',
    estimatedHours: 24
  },
  {
    id: 'task-3',
    title: 'Secondary Vegetative Irrigation & Sensor Moisture Calibration',
    week: 3,
    stage: 'Irrigation',
    dueDate: '15 Aug 2026',
    requiredWorkers: 2,
    assignedWorkers: ['worker-mahesh', 'worker-ramesh'],
    recommendedSkills: ['Irrigation & Moisture Mgmt'],
    status: 'Completed',
    evidenceId: 'ev-3',
    description: 'Provide 35mm equivalent drip irrigation across Unit A & B, clearing micro-emitters and verifying soil field capacity.',
    estimatedHours: 12
  },
  {
    id: 'task-4',
    title: 'Crucial Pegging Stage Weeding & Gentle Soil Loosening',
    week: 6,
    stage: 'Weeding',
    dueDate: '29 Aug 2026',
    requiredWorkers: 4,
    assignedWorkers: ['worker-ramesh'], // Needs 3 more workers
    recommendedSkills: ['Groundnut Cultivation', 'Weeding & Intercultural'],
    status: 'In Progress',
    evidenceId: 'ev-4',
    description: 'Manual hand-hoeing to eliminate broadleaf weeds while ensuring underground peg penetration is undisturbed.',
    estimatedHours: 32
  },
  {
    id: 'task-5',
    title: 'Canopy Density & Pest Scouting (Tikka Leaf Spot check)',
    week: 8,
    stage: 'Crop Monitoring',
    dueDate: '12 Sep 2026',
    requiredWorkers: 2,
    assignedWorkers: [],
    recommendedSkills: ['Pest Scouting & Trap Setting', 'Crop Health Sentinel'],
    status: 'Pending',
    description: 'Systematic 10-point field scouting to assess canopy chlorosis, pheromone trap catches, and pod set density.',
    estimatedHours: 14
  },
  {
    id: 'task-6',
    title: 'Final Pod Maturation Irrigation & Field Drainage Prep',
    week: 11,
    stage: 'Irrigation',
    dueDate: '18 Oct 2026',
    requiredWorkers: 3,
    assignedWorkers: [],
    recommendedSkills: ['Irrigation & Drainage'],
    status: 'Pending',
    description: 'Controlled terminal watering to plump pod kernels followed by furrows clearing for easy harvest lifting.',
    estimatedHours: 20
  },
  {
    id: 'task-7',
    title: 'Mechanical & Manual Pod Digging, Inversion & Sun Curing',
    week: 14,
    stage: 'Harvest',
    dueDate: '10 Nov 2026',
    requiredWorkers: 8,
    assignedWorkers: [],
    recommendedSkills: ['Harvest & Pod Threshing', 'Harvest Grading'],
    status: 'Pending',
    description: 'Tractor-drawn blade digging, inversion of groundnut vines for 4-day solar drying, followed by mechanized pod stripping.',
    estimatedHours: 64
  }
];

export const INITIAL_EVIDENCE: EvidenceRecord[] = [
  {
    id: 'ev-3',
    taskId: 'task-3',
    taskName: 'Secondary Vegetative Irrigation & Sensor Moisture Calibration',
    date: '24 Aug 2026',
    timestamp: '10:42 AM IST',
    locationUnit: 'Farm Unit A23 (North-East Quadrant)',
    workerId: 'worker-ramesh',
    workerName: 'Ramesh Kumar',
    photoUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1000&q=80',
    aiStatus: 'AI consistency check passed',
    aiConfidenceScore: 96.4,
    aiNotes: 'Optical moisture saturation matches IoT sensor telemetry (68.2% volumetric water content). Drip lines clear of silt sediment.',
    verifiedBySupervisor: 'Savitri Gowda (Verified in field)',
    gpsCoordinates: '12.5218° N, 76.8951° E'
  },
  {
    id: 'ev-2',
    taskId: 'task-2',
    taskName: 'Seed Treatment with Trichoderma & Precision Sowing',
    date: '22 Jul 2026',
    timestamp: '04:15 PM IST',
    locationUnit: 'Farm Unit A & B (All 2 Acres)',
    workerId: 'worker-suresh',
    workerName: 'Suresh Gowda',
    photoUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80',
    aiStatus: 'AI consistency check passed',
    aiConfidenceScore: 94.8,
    aiNotes: 'Row symmetry index 98.2%. Seed spacing variance within ±1.5cm of recommended agronomist protocol.',
    verifiedBySupervisor: 'Savitri Gowda',
    gpsCoordinates: '12.5215° N, 76.8949° E'
  },
  {
    id: 'ev-1',
    taskId: 'task-1',
    taskName: 'Deep Summer Ploughing & Soil Solarization',
    date: '16 Jul 2026',
    timestamp: '11:20 AM IST',
    locationUnit: 'Farm Unit A, B & Boundary Furrows',
    workerId: 'worker-suresh',
    workerName: 'Suresh Gowda',
    photoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    aiStatus: 'AI consistency check passed',
    aiConfidenceScore: 98.1,
    aiNotes: 'Tillage depth measured ~22cm. Clod pulverization meets standard criteria for red loamy groundnut beds.',
    verifiedBySupervisor: 'Savitri Gowda',
    gpsCoordinates: '12.5212° N, 76.8945° E'
  }
];

export const WORKFORCE_PLAN_WEEKS: WorkforcePlanWeek[] = [
  {
    weekNumber: 1,
    weekLabel: 'Week 1',
    activity: 'Land Preparation & Tillage',
    stage: 'Land Preparation',
    requiredWorkers: 3,
    availableWorkersCount: 4,
    recommendedSkills: ['Land Preparation & Tillage', 'Soil Health'],
    bestMatches: ['worker-suresh', 'worker-ramesh', 'worker-mahesh'],
    status: 'Completed',
    notes: 'Soil broken to 22cm depth, bio-manure incorporated.'
  },
  {
    weekNumber: 2,
    weekLabel: 'Week 2',
    activity: 'Sowing & Rhizobium Inoculation',
    stage: 'Sowing',
    requiredWorkers: 4,
    availableWorkersCount: 5,
    recommendedSkills: ['Sowing & Seed Treatment', 'Groundnut Cultivation'],
    bestMatches: ['worker-suresh', 'worker-ramesh', 'worker-priya', 'worker-anil'],
    status: 'Completed',
    notes: 'High germination rate (92%) confirmed on Day 7.'
  },
  {
    weekNumber: 3,
    weekLabel: 'Week 3',
    activity: 'Vegetative Irrigation & Sensor Calibration',
    stage: 'Irrigation',
    requiredWorkers: 2,
    availableWorkersCount: 4,
    recommendedSkills: ['Irrigation & Moisture Mgmt'],
    bestMatches: ['worker-mahesh', 'worker-ramesh'],
    status: 'Completed',
    notes: 'Moisture telemetry connected to dashboard.'
  },
  {
    weekNumber: 6,
    weekLabel: 'Week 6 (Current)',
    activity: 'Pegging Stage Weeding & Soil Aeration',
    stage: 'Weeding',
    requiredWorkers: 4,
    availableWorkersCount: 5,
    recommendedSkills: ['Groundnut Cultivation', 'Weeding & Intercultural'],
    bestMatches: ['worker-ramesh', 'worker-anil', 'worker-priya', 'worker-suresh'],
    status: 'Current',
    notes: 'Crucial window before gynophores penetrate soil.'
  },
  {
    weekNumber: 8,
    weekLabel: 'Week 8',
    activity: 'Canopy Density & Pest Scouting',
    stage: 'Crop Monitoring',
    requiredWorkers: 2,
    availableWorkersCount: 5,
    recommendedSkills: ['Pest Scouting & Trap Setting', 'Crop Health Sentinel'],
    bestMatches: ['worker-priya', 'worker-anil'],
    status: 'Upcoming',
    notes: 'Early warning surveillance for defoliator pests.'
  },
  {
    weekNumber: 11,
    weekLabel: 'Week 11',
    activity: 'Final Pod Maturation Irrigation',
    stage: 'Irrigation',
    requiredWorkers: 3,
    availableWorkersCount: 4,
    recommendedSkills: ['Irrigation & Drainage'],
    bestMatches: ['worker-mahesh', 'worker-ramesh', 'worker-suresh'],
    status: 'Upcoming',
    notes: 'Pre-harvest moisture optimization.'
  },
  {
    weekNumber: 14,
    weekLabel: 'Week 14',
    activity: 'Harvest & Pod Threshing',
    stage: 'Harvest',
    requiredWorkers: 8,
    availableWorkersCount: 9,
    recommendedSkills: ['Harvest & Pod Threshing', 'Harvest Grading'],
    bestMatches: ['worker-ramesh', 'worker-suresh', 'worker-anil', 'worker-priya', 'worker-mahesh'],
    status: 'Upcoming',
    notes: 'Combined manual pulling and mechanical pod detachment.'
  }
];

export const INITIAL_CROP_ROTATION: CropRotationPlan = {
  previousCrop: {
    name: 'Ragi (Finger Millet)',
    duration: 'March – June 2026 (110 Days)',
    harvestYield: '1.45 tonnes / acre',
    soilImpact: 'Left abundant root biomass; consumed moderate potassium; suppressed soil-borne fungal pathogens.'
  },
  currentCrop: {
    name: 'Groundnut (KDG-123 Legume)',
    stage: 'Growing (Day 45 / 120)',
    day: 45,
    totalDays: 120,
    benefits: 'Active atmospheric nitrogen fixation (~42 kg N/hectare); builds organic humus layer; ideal intermediate break-crop.'
  },
  recommendedNextCrop: {
    name: 'Pulses (Black Gram / Green Gram)',
    recommendedMonth: 'December 2026 (Rabi Season)',
    benefits: [
      'Further amplifies soil nitrogen levels without requiring heavy synthetic fertilizers',
      'Short 65-75 day duration allows moisture capture before peak summer dry period',
      'Breaks lifecycle of common groundnut leaf spot pests',
      'Minimal water requirement perfectly aligned with winter dew and remaining groundwater'
    ],
    soilHealthBoost: '+28% Organic Carbon & Nitrate Retention',
    nitrogenFixation: '35–45 kg N / ha natural enrichment',
    waterRequirement: 'Low',
    diseaseInterruptionScore: '92% Pest Cycle Interruption'
  },
  rotationExplanation: 'Rotational sequencing from Ragi (cereal grain) to Groundnut (oilseed legume) to Pulses (short-duration legume) creates a balanced nutrient recovery cycle. Groundnuts fix nitrogen into the rhizosphere, while the subsequent pulse crop consumes minimal water and locks in organic carbon, reducing external fertilizer dependency by up to 40%.',
  nutrientBalanceFactors: {
    nitrogen: 85,
    phosphorus: 78,
    potassium: 92,
    organicMatter: 88
  }
};

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'AI Workforce Recommendation',
    message: 'Optimal workforce plan for Week 6 Weeding is ready. 4 workers recommended based on skill match scores.',
    timestamp: '15 mins ago',
    read: false,
    type: 'ai'
  },
  {
    id: 'notif-2',
    title: 'Evidence Verified',
    message: 'Ramesh Kumar uploaded photo evidence for Secondary Irrigation on Unit A23. AI consistency score: 96.4%.',
    timestamp: '2 hours ago',
    read: false,
    type: 'evidence'
  },
  {
    id: 'notif-3',
    title: 'Yield Estimation Calibrated',
    message: 'Groundnut pegging progression on Day 45 confirms expected yield trajectory at 1.85 tonnes.',
    timestamp: 'Yesterday',
    read: true,
    type: 'ai'
  }
];
