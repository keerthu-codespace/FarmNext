import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Phone,
  User,
  MapPin,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building,
  Sprout,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';
import { FarmNextLogo } from '../common/FarmNextLogo';
import { RoleVisual, RoleBadgeIcon } from '../common/RoleVisual';
import { UserRole, UserAccount } from '../../types';
import { TEST_ACCOUNTS } from '../../data/testAccounts';
import { useApp } from '../../context/AppContext';

interface AuthScreenProps {
  initialMode?: 'login' | 'register';
  initialRole?: UserRole;
  onSuccess?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  initialMode = 'login',
  initialRole = 'landowner',
  onSuccess
}) => {
  const { setCurrentRole, setCurrentUser, setCurrentView, t } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('savitri.gowda@farmnext.in');
  const [loginPassword, setLoginPassword] = useState('••••••••••');
  const [loginError, setLoginError] = useState('');
  const [passwordHint, setPasswordHint] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Registration form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regLocation, setRegLocation] = useState('Mandya, Karnataka');
  const [regAcreage, setRegAcreage] = useState('2.0');
  const [regFarmName, setRegFarmName] = useState('Green Valley Farm');
  const [regSurveyNo, setRegSurveyNo] = useState('SY-142/B');
  const [regSkills, setRegSkills] = useState('Drip Irrigation, Precision Sowing, Micro-Weeding');
  const [regExperience, setRegExperience] = useState('6');
  const [regPreferences, setRegPreferences] = useState('Organic Pulses, Groundnut, Soil Regeneration');
  const [regContribution, setRegContribution] = useState('₹45,000');

  // Handle Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError('');

    setTimeout(() => {
      // Look up matching test account or infer role by identifier
      const matched = TEST_ACCOUNTS.find(
        acc =>
          acc.email.toLowerCase() === loginIdentifier.trim().toLowerCase() ||
          acc.phone.includes(loginIdentifier.trim())
      );

      if (matched) {
        setCurrentUser(matched);
        setCurrentRole(matched.role);
      } else {
        // Create custom session account
        const fallbackRole = selectedRole;
        const newAcc: UserAccount = {
          id: `usr-${Date.now()}`,
          name: loginIdentifier.split('@')[0] || 'FarmNext User',
          email: loginIdentifier,
          phone: '+91 98000 00000',
          role: fallbackRole,
          location: 'Karnataka, India',
          avatarInitials: 'FN',
          title: fallbackRole === 'landowner' ? 'Landowner' : fallbackRole === 'worker' ? 'Agricultural Worker' : 'Urban Co-Farmer'
        };
        setCurrentUser(newAcc);
        setCurrentRole(fallbackRole);
      }

      setIsSubmitting(false);
      if (onSuccess) {
        onSuccess();
      } else {
        setCurrentView('dashboard');
      }
    }, 450);
  };

  // One-click quick fill with verified test account
  const handleQuickSelectAccount = (account: UserAccount) => {
    setLoginIdentifier(account.email);
    setLoginPassword('••••••••••');
    setSelectedRole(account.role);
    setIsSubmitting(true);

    setTimeout(() => {
      setCurrentUser(account);
      setCurrentRole(account.role);
      setIsSubmitting(false);
      if (onSuccess) {
        onSuccess();
      } else {
        setCurrentView('dashboard');
      }
    }, 350);
  };

  // Handle Registration submission
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newAcc: UserAccount = {
        id: `usr-reg-${Date.now()}`,
        name: regName || (selectedRole === 'landowner' ? 'Savitri Gowda' : selectedRole === 'worker' ? 'Ramesh Kumar' : 'Ananya Sharma'),
        email: regEmail || `${(regName || 'user').toLowerCase().replace(/\s+/g, '.')}@farmnext.in`,
        phone: regPhone || '+91 94801 00000',
        role: selectedRole,
        location: regLocation,
        avatarInitials: (regName || 'FN').substring(0, 2).toUpperCase(),
        title: selectedRole === 'landowner' ? 'Landowner & Field Custodian' : selectedRole === 'worker' ? 'Certified Agricultural Worker' : 'Urban Co-Farmer',
        details: {
          landowner: selectedRole === 'landowner' ? {
            acreage: parseFloat(regAcreage) || 2.0,
            farmName: regFarmName,
            surveyNumber: regSurveyNo,
            soilType: 'Red Sandy Loam'
          } : undefined,
          worker: selectedRole === 'worker' ? {
            skills: regSkills.split(',').map(s => s.trim()),
            experienceYears: parseInt(regExperience) || 5,
            passportId: `FN-SKILL-${Date.now().toString().slice(-4)}`,
            reliabilityScore: 92,
            dailyWage: 650
          } : undefined,
          urbanCoFarmer: selectedRole === 'urban_cofarmer' ? {
            participatingFarmsCount: 1,
            preferences: regPreferences.split(',').map(s => s.trim()),
            totalContribution: regContribution
          } : undefined
        }
      };

      setCurrentUser(newAcc);
      setCurrentRole(selectedRole);
      setIsSubmitting(false);
      if (onSuccess) {
        onSuccess();
      } else {
        setCurrentView('dashboard');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col justify-between selection:bg-[#2D6A4F]/20 selection:text-[#1B4332]">
      {/* Top Brand Navigation */}
      <header className="border-b border-stone-200/80 bg-white/90 backdrop-blur-xs sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <button
            onClick={() => setCurrentView('welcome')}
            className="flex items-center gap-2 text-left cursor-pointer group"
            title="Return to Welcome"
          >
            <FarmNextLogo variant="full" size="md" />
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-50 transition-colors cursor-pointer"
            >
              {mode === 'login' ? 'Create Account' : 'Sign In'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Authentication Card Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-2xl bg-white rounded-3xl border border-stone-200 shadow-md p-6 sm:p-10">
          {mode === 'login' ? (
            /* LOGIN SCREEN */
            <div className="space-y-6">
              <div className="text-center space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-[#1B4332] rounded-full text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Secure Platform Authentication</span>
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-black text-[#1B4332] tracking-tight">
                  Login to FarmNext
                </h1>
                <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto">
                  Single unified entry for Landowners, Agricultural Workers, and Urban Co-Farmers.
                </p>
              </div>

              {/* Verified Quick-Access Test Accounts for Testing/Evaluation */}
              <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-stone-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">
                    Select Account Profile:
                  </span>
                  <span className="text-[10px] text-stone-500">Click to fill & authenticate</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {TEST_ACCOUNTS.map(acc => {
                    const isCurrent = loginIdentifier.toLowerCase() === acc.email.toLowerCase();
                    return (
                      <button
                        key={acc.id}
                        type="button"
                        onClick={() => handleQuickSelectAccount(acc)}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500/50 shadow-xs'
                            : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold text-[#1B4332] uppercase flex items-center gap-1">
                            <RoleBadgeIcon role={acc.role} className="w-3 h-3 text-[#2D6A4F]" />
                            {acc.role === 'urban_cofarmer' ? 'Co-Farmer' : acc.role}
                          </span>
                          <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.2 rounded font-mono">
                            {acc.avatarInitials}
                          </span>
                        </div>
                        <div className="font-bold text-xs text-stone-900 leading-snug">{acc.name}</div>
                        <div className="text-[10px] text-stone-500 truncate mt-0.5">{acc.location}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Standard Email / Mobile & Password Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Email / Mobile Number
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={e => setLoginIdentifier(e.target.value)}
                      placeholder="e.g. savitri.gowda@farmnext.in or +91 94801 23456"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent text-sm bg-white text-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-stone-700">Password</label>
                    <button
                      type="button"
                      onClick={() => setPasswordHint(prev => !prev)}
                      className="text-[11px] text-[#2D6A4F] hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      placeholder="Enter account password"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent text-sm bg-white text-stone-900"
                    />
                  </div>
                  {passwordHint && (
                    <div className="mt-2 p-2.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-[11px]">
                      Account credentials for test accounts are pre-authenticated. You can sign in directly or select any account profile above.
                    </div>
                  )}
                </div>

                {loginError && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-200">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="login-submit-btn"
                  className="w-full py-3 bg-[#1B4332] hover:bg-[#143427] text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Authenticating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Login to Platform</span>
                      <ArrowRight className="w-4 h-4 text-amber-300" />
                    </>
                  )}
                </button>
              </form>

              {/* Bottom toggle to registration */}
              <div className="pt-2 text-center border-t border-stone-200">
                <span className="text-xs text-stone-500">New to FarmNext? </span>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-xs font-bold text-[#1B4332] hover:underline cursor-pointer"
                >
                  Join FarmNext & Create Account
                </button>
              </div>
            </div>
          ) : (
            /* ACCOUNT CREATION / ROLE SELECTION SCREEN */
            <div className="space-y-6">
              <div className="text-center space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-full text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>New Stakeholder Onboarding</span>
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-black text-[#1B4332] tracking-tight">
                  Join FarmNext
                </h1>
                <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto">
                  Select your role to configure your verified profile and agricultural workspace.
                </p>
              </div>

              {/* Role Selection Visual Cards (Clean visuals, NO emojis) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  1. Select Your Role:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Landowner */}
                  <div
                    onClick={() => setSelectedRole('landowner')}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      selectedRole === 'landowner'
                        ? 'border-[#1B4332] bg-emerald-50/60 shadow-xs ring-1 ring-[#1B4332]'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <RoleVisual role="landowner" size="sm" />
                    <div className="mt-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-stone-900">Landowner</span>
                        {selectedRole === 'landowner' && (
                          <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                        Plot custodian managing arable acreage & crop planning.
                      </p>
                    </div>
                  </div>

                  {/* Agricultural Worker */}
                  <div
                    onClick={() => setSelectedRole('worker')}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      selectedRole === 'worker'
                        ? 'border-[#1B4332] bg-emerald-50/60 shadow-xs ring-1 ring-[#1B4332]'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <RoleVisual role="worker" size="sm" />
                    <div className="mt-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-stone-900">Agricultural Worker</span>
                        {selectedRole === 'worker' && (
                          <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                        Field specialist with certified Skill Passport verification.
                      </p>
                    </div>
                  </div>

                  {/* Urban Co-Farmer */}
                  <div
                    onClick={() => setSelectedRole('urban_cofarmer')}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      selectedRole === 'urban_cofarmer'
                        ? 'border-[#1B4332] bg-emerald-50/60 shadow-xs ring-1 ring-[#1B4332]'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <RoleVisual role="urban_cofarmer" size="sm" />
                    <div className="mt-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-stone-900">Urban Co-Farmer</span>
                        {selectedRole === 'urban_cofarmer' && (
                          <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                        Remote sponsor monitoring farm progress & harvest returns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Role-Specific Form Fields */}
              <form onSubmit={handleRegisterSubmit} className="space-y-4 pt-2 border-t border-stone-200">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  2. {selectedRole === 'landowner' ? 'Landowner' : selectedRole === 'worker' ? 'Agricultural Worker' : 'Urban Co-Farmer'} Profile Details:
                </label>

                {/* Common Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={e => setRegName(e.target.value)}
                      placeholder={selectedRole === 'landowner' ? 'e.g. Savitri Gowda' : selectedRole === 'worker' ? 'e.g. Ramesh Kumar' : 'e.g. Ananya Sharma'}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#1B4332] text-xs bg-white text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={e => setRegPhone(e.target.value)}
                      placeholder="+91 94801 23456"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#1B4332] text-xs bg-white text-stone-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={e => setRegEmail(e.target.value)}
                      placeholder="name@farmnext.in"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#1B4332] text-xs bg-white text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Location / District</label>
                    <input
                      type="text"
                      required
                      value={regLocation}
                      onChange={e => setRegLocation(e.target.value)}
                      placeholder="e.g. Mandya, Karnataka"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#1B4332] text-xs bg-white text-stone-900"
                    />
                  </div>
                </div>

                {/* ROLE-SPECIFIC FIELDS */}
                {selectedRole === 'landowner' && (
                  <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-3">
                    <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                      Land Ownership Particulars:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-stone-700 mb-1">Farm Name</label>
                        <input
                          type="text"
                          value={regFarmName}
                          onChange={e => setRegFarmName(e.target.value)}
                          placeholder="Green Valley Farm"
                          className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-stone-700 mb-1">Acreage Available</label>
                        <input
                          type="number"
                          step="0.1"
                          value={regAcreage}
                          onChange={e => setRegAcreage(e.target.value)}
                          placeholder="2.0"
                          className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-stone-700 mb-1">Survey / Khata No.</label>
                        <input
                          type="text"
                          value={regSurveyNo}
                          onChange={e => setRegSurveyNo(e.target.value)}
                          placeholder="SY-142/B"
                          className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedRole === 'worker' && (
                  <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200/80 space-y-3">
                    <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
                      Agricultural Competencies & Skill Passport:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-stone-700 mb-1">Primary Agronomic Skills</label>
                        <input
                          type="text"
                          value={regSkills}
                          onChange={e => setRegSkills(e.target.value)}
                          placeholder="Drip Irrigation, Precision Sowing, Micro-Weeding"
                          className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-stone-700 mb-1">Years of Field Experience</label>
                        <input
                          type="number"
                          value={regExperience}
                          onChange={e => setRegExperience(e.target.value)}
                          placeholder="8"
                          className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedRole === 'urban_cofarmer' && (
                  <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/80 space-y-3">
                    <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider block">
                      Co-Farming Participation & Crop Preferences:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-stone-700 mb-1">Farming Interests / Crops</label>
                        <input
                          type="text"
                          value={regPreferences}
                          onChange={e => setRegPreferences(e.target.value)}
                          placeholder="Organic Pulses, Groundnut, Soil Regeneration"
                          className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-stone-700 mb-1">Target Capital / Plot Allocation</label>
                        <input
                          type="text"
                          value={regContribution}
                          onChange={e => setRegContribution(e.target.value)}
                          placeholder="₹45,000"
                          className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="register-submit-btn"
                  className="w-full py-3 bg-[#1B4332] hover:bg-[#143427] text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Creating Profile & Configuring Dashboard...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Registration & Launch Platform</span>
                      <ArrowRight className="w-4 h-4 text-amber-300" />
                    </>
                  )}
                </button>
              </form>

              {/* Bottom toggle back to login */}
              <div className="pt-2 text-center border-t border-stone-200">
                <span className="text-xs text-stone-500">Already registered on FarmNext? </span>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-xs font-bold text-[#1B4332] hover:underline cursor-pointer"
                >
                  Sign In with Existing Account
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modern Product Footer */}
      <footer className="border-t border-stone-200 bg-white py-4 px-4 text-center text-xs text-stone-500">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FarmNextLogo variant="mark" size="xs" />
            <span>FARMNEXT Agricultural Technology Platform</span>
          </div>
          <div className="text-stone-400 text-[11px]">
            Karnataka Co-Farming Protocol · Transparency Ledger
          </div>
        </div>
      </footer>
    </div>
  );
};
