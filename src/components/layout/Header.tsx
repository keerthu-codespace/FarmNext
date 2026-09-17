import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  MapPin,
  ChevronDown,
  ShieldCheck,
  User,
  LogOut,
  Sparkles,
  Award,
  Globe
} from 'lucide-react';
import { FarmNextLogo } from '../common/FarmNextLogo';
import { RoleBadgeIcon } from '../common/RoleVisual';
import { useApp } from '../../context/AppContext';
import { UserRole, UserAccount } from '../../types';
import { TEST_ACCOUNTS } from '../../data/testAccounts';
import { LANGUAGE_OPTIONS, Language } from '../../i18n/translations';

export const Header: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    currentUser,
    setCurrentUser,
    logout,
    farm,
    notifications,
    markNotificationRead,
    setCurrentView,
    language,
    setLanguage,
    t
  } = useApp();

  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roleLabels: Record<UserRole, { label: string; badgeBg: string }> = {
    urban_cofarmer: {
      label: 'Urban Co-Farmer',
      badgeBg: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    landowner: {
      label: 'Landowner',
      badgeBg: 'bg-amber-50 border-amber-200 text-amber-900'
    },
    worker: {
      label: 'Agricultural Worker',
      badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-900'
    }
  };

  const activeAccount = currentUser || TEST_ACCOUNTS.find(acc => acc.role === currentRole) || TEST_ACCOUNTS[0];

  const handleSwitchAccount = (account: UserAccount) => {
    setCurrentUser(account);
    setCurrentRole(account.role);
    setProfileDropdownOpen(false);
  };

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
      {/* Top micro-bar for Agronomic Platform Status */}
      <div className="bg-[#1B4332] text-stone-200 px-4 py-1 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-stone-300 font-medium">
            FARMNEXT — AI-Assisted Co-Farming Platform
          </span>
          <span className="text-emerald-400 hidden md:inline">·</span>
          <span className="text-stone-400 text-[11px] hidden md:inline">
            Karnataka Agricultural Network (Mandya Cluster)
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-stone-300 text-[11px]">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>AI Agronomic Engine: Active</span>
          </div>

          {/* Quick Language Toggle */}
          <div className="flex items-center gap-1 text-[11px]">
            <Globe className="w-3 h-3 text-stone-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-[#143427] text-stone-200 border border-stone-600 rounded px-1.5 py-0.5 text-[11px] cursor-pointer"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code} className="bg-stone-900 text-white">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main header toolbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand Logo & Farm Location */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2 text-left group cursor-pointer"
            title="Go to Dashboard"
          >
            <FarmNextLogo variant="full" size="md" showSubtitle />
          </button>

          {/* Current Farm Pill */}
          <div className="hidden lg:flex items-center gap-2 bg-[#FAF9F5] border border-stone-200 px-3 py-1.5 rounded-xl text-xs">
            <div className="flex items-center gap-1 text-stone-800 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-[#1B4332]" />
              <span>{farm.name}</span>
            </div>
            <span className="text-stone-300">|</span>
            <span className="text-stone-600">{farm.location}</span>
            <span className="text-stone-300">|</span>
            <span className="bg-emerald-100 text-[#1B4332] px-1.5 py-0.5 rounded font-medium text-[11px]">
              {farm.areaAcres} Acres · {farm.currentCrop}
            </span>
          </div>
        </div>

        {/* Right Section: Notifications & Authenticated User Account Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer border border-stone-200"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-stone-200 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100 mb-2">
                  <span className="font-semibold text-xs text-stone-800">
                    Farm Activity & Agronomic Alerts
                  </span>
                  <span className="text-[10px] text-stone-400">
                    {unreadCount} unread
                  </span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                        notif.read ? 'bg-stone-50 text-stone-600' : 'bg-amber-50/70 border border-amber-200 text-stone-900'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold text-[11px]">
                        <span className="text-[#1B4332]">{notif.title}</span>
                        <span className="text-[10px] text-stone-400 font-normal">{notif.timestamp}</span>
                      </div>
                      <p className="mt-1 text-stone-600 leading-snug">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Authenticated User Account Menu (Replaces arbitrary role switcher) */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-all cursor-pointer bg-white"
            >
              {/* User Avatar Initial */}
              <div className="w-8 h-8 rounded-xl bg-[#1B4332] text-amber-300 flex items-center justify-center font-bold text-xs font-display">
                {activeAccount.avatarInitials}
              </div>

              {/* User Name & Role Badge */}
              <div className="text-left hidden sm:block">
                <div className="font-bold text-xs text-stone-900 leading-tight">
                  {activeAccount.name}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.2 rounded border ${roleLabels[currentRole].badgeBg}`}>
                    <RoleBadgeIcon role={currentRole} className="w-2.5 h-2.5" />
                    {roleLabels[currentRole].label}
                  </span>
                </div>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-stone-200 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                {/* Active Profile Info */}
                <div className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-amber-300 flex items-center justify-center font-bold text-sm font-display">
                      {activeAccount.avatarInitials}
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-bold text-xs text-stone-900 truncate">{activeAccount.name}</div>
                      <div className="text-[10px] text-stone-500 truncate">{activeAccount.email}</div>
                      <div className="text-[10px] text-emerald-800 font-medium">{activeAccount.location}</div>
                    </div>
                  </div>
                </div>

                {/* Switch Test Account (Evaluation) */}
                <div className="py-2 border-t border-stone-100">
                  <div className="text-[10px] uppercase font-bold text-stone-400 px-2 pb-1.5 tracking-wider">
                    Switch Account (Evaluation Profile):
                  </div>
                  <div className="space-y-1">
                    {TEST_ACCOUNTS.map(acc => {
                      const isCurrent = activeAccount.email.toLowerCase() === acc.email.toLowerCase();
                      return (
                        <button
                          key={acc.id}
                          onClick={() => handleSwitchAccount(acc)}
                          className={`w-full p-2 rounded-xl text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                            isCurrent
                              ? 'bg-emerald-50 text-[#1B4332] font-bold border border-emerald-200'
                              : 'hover:bg-stone-50 text-stone-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <RoleBadgeIcon role={acc.role} className="w-3.5 h-3.5 text-[#2D6A4F]" />
                            <div>
                              <div>{acc.name}</div>
                              <div className="text-[10px] text-stone-400 font-normal">{roleLabels[acc.role].label}</div>
                            </div>
                          </div>
                          {isCurrent && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-semibold">
                              Active
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sign Out */}
                <div className="pt-2 border-t border-stone-100">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                    }}
                    className="w-full p-2 text-stone-600 hover:text-red-700 hover:bg-red-50 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out to Welcome</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
