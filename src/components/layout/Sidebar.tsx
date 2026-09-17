import React from 'react';
import {
  LayoutDashboard,
  Sprout,
  Cpu,
  Users,
  Award,
  CheckSquare,
  Eye,
  RefreshCw,
  TrendingUp,
  FileText,
  Sliders,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, currentRole, tasks, workforcePlan, t } = useApp();

  const activeTasksCount = tasks.filter(t => t.status === 'In Progress' || t.status === 'Pending').length;

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: t('nav.dashboard', 'Dashboard'),
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      id: 'my_farm',
      label: t('nav.my_farm', 'My Farm'),
      icon: <Sprout className="w-4 h-4" />
    },
    {
      id: 'ai_planner',
      label: t('nav.ai_planner', 'AI Farm Planner'),
      icon: <Cpu className="w-4 h-4" />,
      badge: t('nav.ai_active', 'AI Active'),
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'workers',
      label: t('nav.workers', 'Workers & Match'),
      icon: <Users className="w-4 h-4" />
    },
    {
      id: 'skill_passport',
      label: t('nav.skill_passport', 'Skill Passport'),
      icon: <Award className="w-4 h-4" />,
      badge: t('nav.verified', 'Verified'),
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'tasks',
      label: t('nav.tasks', 'Tasks'),
      icon: <CheckSquare className="w-4 h-4" />,
      badge: activeTasksCount > 0 ? `${activeTasksCount}` : undefined,
      badgeColor: 'bg-orange-100 text-orange-800'
    },
    {
      id: 'monitoring',
      label: t('nav.monitoring', 'Monitoring & Evidence'),
      icon: <Eye className="w-4 h-4" />
    },
    {
      id: 'crop_rotation',
      label: t('nav.crop_rotation', 'Crop Rotation'),
      icon: <RefreshCw className="w-4 h-4" />
    },
    {
      id: 'estimated_yield',
      label: t('nav.estimated_yield', 'Estimated Yield'),
      icon: <TrendingUp className="w-4 h-4" />,
      badge: '1.85t',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'reports',
      label: t('nav.reports', 'Reports & Logs'),
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: 'settings',
      label: t('nav.settings', 'Platform Settings'),
      icon: <Sliders className="w-4 h-4" />
    }
  ];

  return (
    <aside className="w-full md:w-60 bg-white border-r border-stone-200 flex flex-col justify-between shrink-0">
      {/* Navigation Links */}
      <div className="p-3 space-y-1">
        <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400">
          {t('nav.protocol', 'Farm Protocol')}
        </div>

        <nav className="space-y-0.5">
          {navItems.map(item => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer group ${
                  isActive
                    ? 'bg-[#1B4332] text-white shadow-xs font-semibold'
                    : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-[#EAB308]' : 'text-stone-500 group-hover:text-stone-800'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold tracking-tight ${
                      isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Role Context & Ecosystem Card */}
      <div className="p-3 border-t border-stone-200 bg-[#FAF9F5]/70">
        <div className="bg-white rounded-xl p-3 border border-stone-200/80 shadow-2xs">
          <div className="flex items-center gap-2 text-[11px] font-bold text-stone-800 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>{t('nav.ai_cofarming_active', 'AI Co-Farming Active')}</span>
          </div>
          <p className="text-[11px] text-stone-500 leading-snug">
            {t('nav.transparency_desc', '3-way transparency connecting land, labor skills & urban co-farmers.')}
          </p>
          <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-600">
            <span>{t('nav.cycle_day', 'Cycle Day:')} <strong>45 / 120</strong></span>
            <span className="text-[#1B4332] font-semibold">{t('nav.stage_growing', 'Stage: Growing')}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
