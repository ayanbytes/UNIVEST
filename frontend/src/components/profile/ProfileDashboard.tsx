import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfileHero } from './ProfileHero';
import { TrustCenter } from './TrustCenter';
import { QuickActions } from './QuickActions';
import { ProfileOverview } from './ProfileOverview';
import { PersonalDetails } from './PersonalDetails';
import { VerificationStatus } from './VerificationStatus';
import { BankAccounts } from './BankAccounts';
import { BrokerAccounts } from './BrokerAccounts';
import { Documents } from './Documents';
import { ActivityTimeline } from './ActivityTimeline';

interface ProfileDashboardProps {
  onAddFunds?: () => void;
}

export const ProfileDashboard: React.FC<ProfileDashboardProps> = ({ onAddFunds }) => {
  const [activeTab, setActiveTab] = useState<
    'Overview' | 'Personal Details' | 'Verification' | 'Bank Accounts' | 'Broker Accounts' | 'Documents' | 'Account Activity'
  >('Overview');

  const tabs = [
    'Overview',
    'Personal Details',
    'Verification',
    'Bank Accounts',
    'Broker Accounts',
    'Documents',
    'Account Activity'
  ] as const;

  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in duration-500 pb-16">
      {/* 1. Profile Hero (Personal Investment Identity Center) */}
      <ProfileHero onAddFunds={onAddFunds} />

      {/* 2. My Account Dashboard (4 Summary Cards) */}
      <TrustCenter />

      {/* 3. Quick Actions Grid */}
      <QuickActions onActionClick={(tab: any) => setActiveTab(tab)} onAddFunds={onAddFunds} />

      {/* 4. 7 Identity Profile Tabs (Segmented Control) */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white border border-[#E2E8F0] rounded-2xl w-full shadow-sm relative mt-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2.5 rounded-xl text-xs font-black transition-colors duration-300 flex-1 md:flex-none text-center ${
                isActive ? 'text-white' : 'text-slate-500 hover:text-[#0F172A]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="profileTabBubble"
                  className="absolute inset-0 bg-[#0F172A] rounded-xl shadow-sm"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">{tab}</span>
            </button>
          );
        })}
      </div>

      {/* 5. Dynamic Profile Content Surface */}
      <div className="w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'Overview' && <ProfileOverview onNavigate={(t: any) => setActiveTab(t)} />}
            {activeTab === 'Personal Details' && <PersonalDetails />}
            {activeTab === 'Verification' && <VerificationStatus />}
            {activeTab === 'Bank Accounts' && <BankAccounts />}
            {activeTab === 'Broker Accounts' && <BrokerAccounts />}
            {activeTab === 'Documents' && <Documents />}
            {activeTab === 'Account Activity' && <ActivityTimeline />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfileDashboard;
