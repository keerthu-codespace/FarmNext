import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  Sprout,
  User,
  MapPin,
  Sparkles,
  Shield,
  Layers,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole, SkillLevel } from '../../types';

export const RegistrationModal: React.FC = () => {
  const {
    registrationModalOpen,
    setRegistrationModalOpen,
    registrationRole,
    setRegistrationRole,
    setCurrentRole,
    setCurrentView,
    setShowLanding,
    triggerConfetti,
    t
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Landowner Form State
  const [landownerData, setLandownerData] = useState({
    fullName: 'Basavarajappa Gowda',
    phone: '+91 98451 22910',
    email: 'basavaraj.gowda@karnataka-agri.in',
    location: 'Mandya District, Karnataka',
    farmLocation: 'Survey No. 42/1, Maddur Taluk, Mandya',
    landArea: '2 Acres',
    soilType: 'Red Loamy Soil with High Phosphorus',
    waterAvailability: 'Borewell with Drip System + Canal access',
    previousCrop: 'Ragi (Finger Millet)',
    availabilityPeriod: 'August 2026 – March 2027',
    preferredCrop: 'Groundnut (KDG-123) / Pulses',
    expectedBudget: '₹45,000 / acre',
    labourRequirement: '4-6 skilled workers for weeding & harvest',
    farmingDuration: '4 months (120 days)'
  });

  // Agricultural Worker Form State
  const [workerData, setWorkerData] = useState({
    fullName: 'Ramesh Kumar',
    phone: '+91 94812 40182',
    location: 'Mandya, Karnataka',
    yearsOfExperience: '7',
    cropExpertise: ['Groundnut', 'Tomato', 'Ragi'],
    skillLevels: {
      'Groundnut Cultivation': 'Expert' as SkillLevel,
      'Weeding & Hoeing': 'Expert' as SkillLevel,
      'Irrigation & Drip Care': 'Advanced' as SkillLevel,
      'Fertilization & Spraying': 'Advanced' as SkillLevel,
      'Harvesting & Grading': 'Advanced' as SkillLevel
    },
    expectedWage: '₹580 / day',
    availableDates: 'Immediate / Full 2026 Kharif-Rabi Season',
    previousWorkExperience: '7 years on South Karnataka dryland & irrigated tracts',
    completedJobs: '34'
  });

  // Urban Co-Farmer Form State
  const [coFarmerData, setCoFarmerData] = useState({
    fullName: 'Ananya Sharma',
    phone: '+91 98110 54321',
    email: 'ananya.sharma@techpulse.io',
    location: 'Bengaluru, Karnataka (Indiranagar)',
    occupation: 'Senior Product Designer',
    farmingInterests: 'Sustainable Oilseeds, Regenerative Pulses & Natural Farming',
    availableBudget: '₹60,000 resource contribution',
    preferredDuration: '4 months (120 days)',
    preferredCrops: ['Groundnut', 'Ragi', 'Organic Pulses'],
    participationPreference: 'Remote monitoring + occasional farm visits',
    riskPreference: 'Moderate (Focus on Soil Health & Transparency)'
  });

  if (!registrationModalOpen) return null;

  const totalSteps = registrationRole === 'landowner' ? 4 : 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setIsSubmitted(true);
      triggerConfetti();
    }
  };

  const handleFinishRegistration = () => {
    setCurrentRole(registrationRole);
    setRegistrationModalOpen(false);
    setShowLanding(false);
    setCurrentView('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#1B4332] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-bold text-xl">
              {registrationRole === 'landowner' ? '🌾' : registrationRole === 'worker' ? '👨🌾' : '👩💻'}
            </div>
            <div>
              <h3 className="font-display font-bold text-lg leading-tight">
                {registrationRole === 'landowner'
                  ? 'Landowner Registration'
                  : registrationRole === 'worker'
                  ? 'Agricultural Worker Skill Registration'
                  : 'Urban Co-Farmer Registration'}
              </h3>
              <p className="text-xs text-stone-300">
                FARMNEXT Co-Farming Protocol · Karnataka Demonstration Farm
              </p>
            </div>
          </div>

          <button
            onClick={() => setRegistrationModalOpen(false)}
            className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Stepper Header */}
        {!isSubmitted && (
          <div className="bg-stone-50 border-b border-stone-200 px-6 py-3">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
              {registrationRole === 'landowner' ? (
                <>
                  <span className={step >= 1 ? 'text-[#1B4332] font-bold' : ''}>1. PERSONAL</span>
                  <span className="text-stone-300">→</span>
                  <span className={step >= 2 ? 'text-[#1B4332] font-bold' : ''}>2. LAND INFO</span>
                  <span className="text-stone-300">→</span>
                  <span className={step >= 3 ? 'text-[#1B4332] font-bold' : ''}>3. REQUIREMENTS</span>
                  <span className="text-stone-300">→</span>
                  <span className={step >= 4 ? 'text-[#1B4332] font-bold' : ''}>4. REVIEW</span>
                </>
              ) : registrationRole === 'worker' ? (
                <>
                  <span className={step >= 1 ? 'text-[#1B4332] font-bold' : ''}>1. PROFILE</span>
                  <span className="text-stone-300">→</span>
                  <span className={step >= 2 ? 'text-[#1B4332] font-bold' : ''}>2. SKILLS & CROPS</span>
                  <span className="text-stone-300">→</span>
                  <span className={step >= 3 ? 'text-[#1B4332] font-bold' : ''}>3. WAGE & REVIEW</span>
                </>
              ) : (
                <>
                  <span className={step >= 1 ? 'text-[#1B4332] font-bold' : ''}>1. ABOUT YOU</span>
                  <span className="text-stone-300">→</span>
                  <span className={step >= 2 ? 'text-[#1B4332] font-bold' : ''}>2. FARMING INTERESTS</span>
                  <span className="text-stone-300">→</span>
                  <span className={step >= 3 ? 'text-[#1B4332] font-bold' : ''}>3. PARTICIPATION</span>
                </>
              )}
            </div>
            {/* Progress bar */}
            <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#1B4332] h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-sm">
          {isSubmitted ? (
            /* Submission Status View */
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#1B4332] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h4 className="font-display text-2xl font-bold text-[#1B4332]">
                  {registrationRole === 'landowner'
                    ? 'Landowner Profile & Plot Registered!'
                    : registrationRole === 'worker'
                    ? 'Agricultural Skill Passport Created!'
                    : 'Urban Co-Farmer Profile Active!'}
                </h4>
                <p className="text-xs text-stone-500 max-w-md mx-auto mt-1">
                  Your details have been recorded in the FARMNEXT Karnataka regional coordination registry.
                </p>
              </div>

              {/* Status Verification Checklist */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 max-w-md mx-auto text-left space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Profile created and verified</span>
                </div>

                {registrationRole === 'landowner' && (
                  <>
                    <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Land details submitted (2.0 Acres, Red Loamy)</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-800 font-semibold bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Regional surveyor verification verified & active</span>
                    </div>
                  </>
                )}

                {registrationRole === 'worker' && (
                  <>
                    <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Initial skills registered (Groundnut, Weeding, Irrigation)</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-800 font-semibold bg-blue-50 p-2 rounded-lg border border-blue-200">
                      <Award className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>“Your Agricultural Skill Passport will update as verified jobs are completed.”</span>
                    </div>
                  </>
                )}

                {registrationRole === 'urban_cofarmer' && (
                  <>
                    <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Linked to Green Valley Farm (Karnataka)</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Remote monitoring & AI yield alerts enabled</span>
                    </div>
                  </>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={handleFinishRegistration}
                  className="px-6 py-3 bg-[#1B4332] hover:bg-[#143427] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2 mx-auto cursor-pointer"
                >
                  <span>Enter {registrationRole === 'landowner' ? 'Landowner' : registrationRole === 'worker' ? 'Worker' : 'Urban Co-Farmer'} Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Step Forms */
            <div>
              {/* ================= LANDOWNER FLOW ================= */}
              {registrationRole === 'landowner' && (
                <>
                  {step === 1 && (
                    <div className="space-y-4">
                      <h4 className="font-bold text-stone-800">Step 1: Personal / Identity Details</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Full Name</label>
                          <input
                            type="text"
                            value={landownerData.fullName}
                            onChange={e => setLandownerData({ ...landownerData, fullName: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Phone Number</label>
                          <input
                            type="text"
                            value={landownerData.phone}
                            onChange={e => setLandownerData({ ...landownerData, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Email Address</label>
                          <input
                            type="email"
                            value={landownerData.email}
                            onChange={e => setLandownerData({ ...landownerData, email: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Resident Location</label>
                          <input
                            type="text"
                            value={landownerData.location}
                            onChange={e => setLandownerData({ ...landownerData, location: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <h4 className="font-bold text-stone-800">Step 2: Land & Soil Information</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Farm Location / Survey Details</label>
                          <input
                            type="text"
                            value={landownerData.farmLocation}
                            onChange={e => setLandownerData({ ...landownerData, farmLocation: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Land Area</label>
                          <input
                            type="text"
                            value={landownerData.landArea}
                            onChange={e => setLandownerData({ ...landownerData, landArea: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Soil Type</label>
                          <input
                            type="text"
                            value={landownerData.soilType}
                            onChange={e => setLandownerData({ ...landownerData, soilType: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Water Availability</label>
                          <input
                            type="text"
                            value={landownerData.waterAvailability}
                            onChange={e => setLandownerData({ ...landownerData, waterAvailability: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Previous Crop</label>
                          <input
                            type="text"
                            value={landownerData.previousCrop}
                            onChange={e => setLandownerData({ ...landownerData, previousCrop: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <h4 className="font-bold text-stone-800">Step 3: Farm Requirements</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Preferred Crop</label>
                          <input
                            type="text"
                            value={landownerData.preferredCrop}
                            onChange={e => setLandownerData({ ...landownerData, preferredCrop: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Expected Farming Budget</label>
                          <input
                            type="text"
                            value={landownerData.expectedBudget}
                            onChange={e => setLandownerData({ ...landownerData, expectedBudget: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Labour Requirement</label>
                          <input
                            type="text"
                            value={landownerData.labourRequirement}
                            onChange={e => setLandownerData({ ...landownerData, labourRequirement: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Farming Duration</label>
                          <input
                            type="text"
                            value={landownerData.farmingDuration}
                            onChange={e => setLandownerData({ ...landownerData, farmingDuration: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-3">
                      <h4 className="font-bold text-stone-800">Step 4: Review Details Before Submission</h4>
                      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
                        <div className="grid grid-cols-2 gap-2">
                          <div><strong>Landowner:</strong> {landownerData.fullName}</div>
                          <div><strong>Contact:</strong> {landownerData.phone}</div>
                          <div><strong>Location:</strong> {landownerData.farmLocation}</div>
                          <div><strong>Area:</strong> {landownerData.landArea}</div>
                          <div><strong>Soil:</strong> {landownerData.soilType}</div>
                          <div><strong>Water:</strong> {landownerData.waterAvailability}</div>
                          <div><strong>Previous Crop:</strong> {landownerData.previousCrop}</div>
                          <div><strong>Target Crop:</strong> {landownerData.preferredCrop}</div>
                        </div>
                      </div>
                      <p className="text-[11px] text-stone-500 italic">
                        * In this hackathon demo, submitting enters the prototype verification simulation.
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* ================= WORKER FLOW ================= */}
              {registrationRole === 'worker' && (
                <>
                  {step === 1 && (
                    <div className="space-y-4">
                      <h4 className="font-bold text-stone-800">Step 1: Personal & Experience</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Full Name</label>
                          <input
                            type="text"
                            value={workerData.fullName}
                            onChange={e => setWorkerData({ ...workerData, fullName: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Location / Village</label>
                          <input
                            type="text"
                            value={workerData.location}
                            onChange={e => setWorkerData({ ...workerData, location: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Years of Experience</label>
                          <input
                            type="number"
                            value={workerData.yearsOfExperience}
                            onChange={e => setWorkerData({ ...workerData, yearsOfExperience: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Completed Past Jobs</label>
                          <input
                            type="number"
                            value={workerData.completedJobs}
                            onChange={e => setWorkerData({ ...workerData, completedJobs: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-stone-800">Step 2: Skills & Proficiency Levels</h4>
                        <p className="text-xs text-stone-500 mt-0.5">
                          Set your verified skill levels (Beginner, Intermediate, Advanced, Expert)
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        {Object.entries(workerData.skillLevels).map(([skill, level]) => (
                          <div key={skill} className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                            <span className="font-semibold text-xs text-stone-800">{skill}</span>
                            <div className="flex gap-1">
                              {(['Beginner', 'Intermediate', 'Advanced', 'Expert'] as SkillLevel[]).map(lvl => (
                                <button
                                  key={lvl}
                                  type="button"
                                  onClick={() =>
                                    setWorkerData({
                                      ...workerData,
                                      skillLevels: { ...workerData.skillLevels, [skill]: lvl }
                                    })
                                  }
                                  className={`px-2 py-1 rounded text-[11px] font-medium transition-all cursor-pointer ${
                                    level === lvl
                                      ? 'bg-[#1B4332] text-white font-bold'
                                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                                  }`}
                                >
                                  {lvl}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>
                          <strong>Passport Guarantee:</strong> “Your Agricultural Skill Passport will update as verified jobs are completed.”
                        </span>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <h4 className="font-bold text-stone-800">Step 3: Wage Expectation & Availability</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Expected Daily Wage</label>
                          <input
                            type="text"
                            value={workerData.expectedWage}
                            onChange={e => setWorkerData({ ...workerData, expectedWage: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Available Dates</label>
                          <input
                            type="text"
                            value={workerData.availableDates}
                            onChange={e => setWorkerData({ ...workerData, availableDates: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Previous Work Experience</label>
                          <textarea
                            rows={2}
                            value={workerData.previousWorkExperience}
                            onChange={e => setWorkerData({ ...workerData, previousWorkExperience: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* ================= URBAN CO-FARMER FLOW ================= */}
              {registrationRole === 'urban_cofarmer' && (
                <>
                  {step === 1 && (
                    <div className="space-y-4">
                      <h4 className="font-bold text-stone-800">Step 1: Personal & Occupation</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Full Name</label>
                          <input
                            type="text"
                            value={coFarmerData.fullName}
                            onChange={e => setCoFarmerData({ ...coFarmerData, fullName: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Location</label>
                          <input
                            type="text"
                            value={coFarmerData.location}
                            onChange={e => setCoFarmerData({ ...coFarmerData, location: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Occupation</label>
                          <input
                            type="text"
                            value={coFarmerData.occupation}
                            onChange={e => setCoFarmerData({ ...coFarmerData, occupation: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Available Resource Budget</label>
                          <input
                            type="text"
                            value={coFarmerData.availableBudget}
                            onChange={e => setCoFarmerData({ ...coFarmerData, availableBudget: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <h4 className="font-bold text-stone-800">Step 2: Farming Interests & Crops</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Farming Interests</label>
                          <input
                            type="text"
                            value={coFarmerData.farmingInterests}
                            onChange={e => setCoFarmerData({ ...coFarmerData, farmingInterests: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Preferred Project Duration</label>
                          <input
                            type="text"
                            value={coFarmerData.preferredDuration}
                            onChange={e => setCoFarmerData({ ...coFarmerData, preferredDuration: e.target.value })}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B4332] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Preferred Crop Category</label>
                          <input
                            type="text"
                            value="Groundnut (Legume oilseed)"
                            readOnly
                            className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-lg text-xs text-stone-700"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <h4 className="font-bold text-stone-800">Step 3: Participation & Risk Preference</h4>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Participation Preference</label>
                          <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-1">
                            <span className="font-bold text-[#1B4332]">Remote monitoring + occasional farm visits</span>
                            <p className="text-stone-500 text-[11px]">
                              Receive weekly photographic evidence, AI consistency validation, and join planned weekend farm walkthroughs.
                            </p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Risk Preference</label>
                          <div className="flex gap-3">
                            {['Conservative', 'Moderate', 'Exploratory'].map(pref => (
                              <button
                                key={pref}
                                type="button"
                                onClick={() => setCoFarmerData({ ...coFarmerData, riskPreference: pref })}
                                className={`flex-1 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                                  coFarmerData.riskPreference.startsWith(pref)
                                    ? 'border-[#1B4332] bg-emerald-50 text-[#1B4332]'
                                    : 'border-stone-200 bg-white text-stone-600'
                                }`}
                              >
                                {pref}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        {!isSubmitted && (
          <div className="bg-stone-50 border-t border-stone-200 p-4 flex items-center justify-between">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                step === 1 ? 'text-stone-300 cursor-not-allowed' : 'text-stone-700 hover:bg-stone-200 cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="px-5 py-2.5 bg-[#1B4332] hover:bg-[#143427] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{step === totalSteps ? 'Submit for Verification' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
