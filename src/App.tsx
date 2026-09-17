/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { RegistrationModal } from './components/registration/RegistrationModal';
import { SplashScreen } from './components/entry/SplashScreen';
import { WelcomeScreen } from './components/entry/WelcomeScreen';
import { AuthScreen } from './components/auth/AuthScreen';

// Views
import { DashboardHome } from './components/dashboard/DashboardHome';
import { WorkerDashboard } from './components/dashboard/WorkerDashboard';
import { UrbanCoFarmerDashboard } from './components/dashboard/UrbanCoFarmerDashboard';
import { AiFarmPlanner } from './components/planner/AiFarmPlanner';
import { WorkerMatching } from './components/workers/WorkerMatching';
import { SkillPassportView } from './components/workers/SkillPassportView';
import { MonitoringEvidence } from './components/evidence/MonitoringEvidence';
import { CropRotationView } from './components/rotation/CropRotationView';
import { YieldEstimationView } from './components/yield/YieldEstimationView';
import { TaskManagement } from './components/tasks/TaskManagement';
import { MyFarmView } from './components/farm/MyFarmView';
import { FarmReportsView } from './components/reports/FarmReportsView';
import { SettingsView } from './components/settings/SettingsView';

const AppContent: React.FC = () => {
  const { currentView, currentRole } = useApp();
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // Initial 3-second startup splash screen displaying new FarmNext logo
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // Full-page Entry Flow screens
  if (currentView === 'welcome') {
    return <WelcomeScreen />;
  }

  if (currentView === 'auth' || currentView === 'login' || currentView === 'register' || currentView === 'role_selection' || currentView === 'demo_login') {
    return <AuthScreen initialMode={currentView === 'register' ? 'register' : 'login'} />;
  }

  // If on landing screen, show the welcome landing interface
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col font-sans">
        <LandingPage />
        <RegistrationModal />
      </div>
    );
  }

  // Active Main App Layout
  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        if (currentRole === 'worker') return <WorkerDashboard />;
        if (currentRole === 'urban_cofarmer') return <UrbanCoFarmerDashboard />;
        return <DashboardHome />;
      case 'ai_planner':
        return <AiFarmPlanner />;
      case 'workers':
        return <WorkerMatching />;
      case 'skill_passport':
        return <SkillPassportView />;
      case 'monitoring':
        return <MonitoringEvidence />;
      case 'rotation':
      case 'crop_rotation':
        return <CropRotationView />;
      case 'estimated_yield':
        return <YieldEstimationView />;
      case 'tasks':
        return <TaskManagement />;
      case 'my_farm':
        return <MyFarmView />;
      case 'reports':
        return <FarmReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-stone-900">
      {/* Top Application Header */}
      <Header />

      {/* Main Structural Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 gap-6">
        {/* Left Navigation Sidebar */}
        <Sidebar />

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 min-w-0 pb-12">
          {renderCurrentView()}
        </main>
      </div>

      {/* Global Modals */}
      <RegistrationModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
