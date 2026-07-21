import React from 'react';
import { 
  User, Briefcase, Bookmark, Settings, HelpCircle, Sparkles, 
  RefreshCcw, LogOut, ShieldCheck, ChevronRight, Wallet, ArrowUpRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface UserMenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tabName: string) => void;
  onOpenWorkspace: () => void;
}

export const UserMenuDropdown: React.FC<UserMenuDropdownProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onOpenWorkspace
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Click outside backdrop */}
        <div className="fixed inset-0 pointer-events-auto" onClick={onClose} />
        
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute right-6 top-[72px] w-[300px] bg-white border border-[#E2E8F0] rounded-[24px] shadow-2xl z-50 overflow-hidden font-sans text-slate-800 pointer-events-auto flex flex-col"
        >
          {/* USER HEADER */}
          <div className="p-4 border-b border-slate-100 bg-[#F8FAFC] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-xs flex items-center justify-center shadow-sm">
                OK
              </div>
              <div>
                <h4 className="font-black text-sm text-[#0F172A] leading-tight">Omar Khan</h4>
                <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Investor
                </span>
              </div>
            </div>
            <span className="text-[9px] font-black bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 uppercase">
              PRO
            </span>
          </div>

          {/* NET WEALTH SNAPSHOT CARD */}
          <div className="p-4 border-b border-slate-100 bg-white">
            <div className="bg-[#0F172A] text-white rounded-2xl p-4 flex flex-col gap-2 shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Wallet className="w-3 h-3 text-blue-400" /> Total Net Wealth
                </span>
                <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                  +20.3%
                </span>
              </div>
              <span className="text-xl font-black tracking-tight">₹8,42,150.00</span>
              <div className="flex items-center justify-between text-[10px] text-slate-300 font-bold pt-1 border-t border-white/10">
                <span>Demat: IN303028130</span>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateTab('Portfolio');
                  }}
                  className="text-blue-400 hover:underline font-black flex items-center gap-0.5"
                >
                  View <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* NAVIGATION LINKS */}
          <div className="p-2 flex flex-col gap-0.5 text-xs font-bold">
            <button
              onClick={() => {
                onClose();
                onNavigateTab('Profile');
              }}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-slate-100 text-[#0F172A] transition flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-blue-600" />
                <span>My Profile</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => {
                onClose();
                onNavigateTab('Portfolio');
              }}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-slate-100 text-[#0F172A] transition flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-slate-600" />
                <span>Portfolio</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenWorkspace();
              }}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-slate-100 text-[#0F172A] transition flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-slate-600" />
                <span>Workspace</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => {
                onClose();
                onNavigateTab('Settings');
              }}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-slate-100 text-[#0F172A] transition flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4 text-slate-600" />
                <span>Settings</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => {
                onClose();
                onNavigateTab('Settings');
              }}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-slate-100 text-[#0F172A] transition flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-slate-600" />
                <span>Help & Support</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => {
                onClose();
                toast.success('Univest Pro Plan is active! Renewal: July 2027');
              }}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-blue-50 text-blue-700 transition flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-600 fill-blue-600" />
                <span>Univest Premium</span>
              </div>
              <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded">Active</span>
            </button>

            <button
              onClick={() => {
                onClose();
                toast.success('Switch Account modal active');
              }}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-600 transition flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <RefreshCcw className="w-4 h-4 text-slate-500" />
                <span>Switch Account</span>
              </div>
            </button>
          </div>

          {/* FOOTER LOGOUT */}
          <div className="p-2 border-t border-slate-100 bg-[#F8FAFC]">
            <button
              onClick={() => {
                onClose();
                toast.success('Logged out successfully');
              }}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-rose-50 text-rose-600 font-black text-xs transition flex items-center gap-2.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UserMenuDropdown;
