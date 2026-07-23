import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Sun, Moon, Laptop, Globe, Bell, Shield, Key, Smartphone, 
  Download, Trash2, HelpCircle, FileText, Info, Check, ChevronRight, Lock, 
  Eye, RefreshCw, AlertTriangle, MessageSquare, Database, ExternalLink, Zap, Mail
} from 'lucide-react';
import toast from 'react-hot-toast';

export const SettingsCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'Appearance' | 'Language' | 'Notifications' | 'Privacy' | 'Security' | 'Connected Apps' | 'Legal' | 'About' | 'Support'
  >('Appearance');

  // Interactive Settings State
  const [themeMode, setThemeMode] = useState<'Light' | 'Dark' | 'System'>('Light');
  const [language, setLanguage] = useState('English (US)');
  const [currency, setCurrency] = useState('INR (₹)');
  const [compactView, setCompactView] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    aiTriggers: true,
    researchCalls: true,
    newsletter: false,
    whatsappUpdates: true,
    smsAlerts: false
  });

  // Security State
  const [twoFactor, setTwoFactor] = useState(true);
  const [biometrics, setBiometrics] = useState(true);

  // Privacy State
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);

  const sections = [
    { id: 'Appearance', label: 'Appearance & Theme', icon: <Sun className="w-4 h-4" /> },
    { id: 'Language', label: 'Language & Currency', icon: <Globe className="w-4 h-4" /> },
    { id: 'Notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'Privacy', label: 'Privacy & Data', icon: <Eye className="w-4 h-4" /> },
    { id: 'Security', label: 'Security & 2FA', icon: <Shield className="w-4 h-4" /> },
    { id: 'Connected Apps', label: 'Connected Brokers & APIs', icon: <Zap className="w-4 h-4" /> },
    { id: 'Legal', label: 'Legal & Disclosures', icon: <FileText className="w-4 h-4" /> },
    { id: 'About', label: 'About & Version', icon: <Info className="w-4 h-4" /> },
    { id: 'Support', label: 'Support & Helpdesk', icon: <HelpCircle className="w-4 h-4" /> }
  ] as const;

  const toggleNotif = (key: keyof typeof notifications) => {
    setNotifications(prev => {
      const nextVal = !prev[key];
      toast.success(`Updated ${key} setting`);
      return { ...prev, [key]: nextVal };
    });
  };

  const handleExportData = () => {
    toast.success('Preparing your encrypted portfolio & activity archive...');
    setTimeout(() => {
      toast.success('Export completed! Univest_UserData_Export.json downloaded');
    }, 1500);
  };

  const handleDeleteAccount = () => {
    toast.error('Security verification required. Confirmation sent to registered email.');
  };

  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in duration-500 pb-16">
      
      {/* HEADER */}
      <section className="relative overflow-hidden rounded-[28px] p-6 sm:p-8 bg-[#0F172A] text-white shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-5 h-5 text-blue-400" />
              <span className="text-xs font-black text-blue-400 uppercase tracking-widest">SYSTEM SETTINGS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black leading-tight">
              Preferences & System Controls
            </h1>
            <p className="text-xs text-slate-300 font-medium leading-relaxed mt-1">
              Customize your theme, security protocols, SEBI advisory alerts, connected broker accounts, and language preferences.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportData}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition shadow-md flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Export All Data
            </button>
          </div>
        </div>
      </section>

      {/* MAIN SETTINGS WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* NAVIGATION SIDEBAR */}
        <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-3 shadow-sm flex flex-col gap-1.5 h-fit">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveTab(sec.id as any)}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-black transition text-left flex items-center justify-between ${
                activeTab === sec.id
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-[#0F172A]'
              }`}
            >
              <div className="flex items-center gap-3">
                {sec.icon}
                <span>{sec.id}</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 ${activeTab === sec.id ? 'text-white' : 'text-slate-300'}`} />
            </button>
          ))}
        </div>

        {/* SETTINGS CONTENT SURFACE */}
        <div className="lg:col-span-3 bg-white rounded-[28px] border border-[#E2E8F0] p-6 sm:p-8 shadow-sm flex flex-col gap-8">

          {/* TAB 1: APPEARANCE */}
          {activeTab === 'Appearance' && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-black text-[#0F172A]">Appearance & Visual Theme</h3>
                <p className="text-xs text-slate-500">Choose your preferred visual interface mode and density.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => { setThemeMode('Light'); toast.success('Light Mode active'); }}
                  className={`p-5 rounded-2xl border-2 transition flex flex-col gap-3 items-center text-center ${
                    themeMode === 'Light' ? 'border-blue-600 bg-blue-50/40' : 'border-[#E2E8F0] hover:border-slate-300'
                  }`}
                >
                  <Sun className="w-6 h-6 text-amber-500" />
                  <div>
                    <strong className="text-sm font-black text-[#0F172A] block">Light Mode</strong>
                    <span className="text-[10px] text-slate-400 font-bold">Default crisp layout</span>
                  </div>
                </button>

                <button
                  onClick={() => { setThemeMode('Dark'); toast.success('Dark Mode enabled'); }}
                  className={`p-5 rounded-2xl border-2 transition flex flex-col gap-3 items-center text-center ${
                    themeMode === 'Dark' ? 'border-blue-600 bg-slate-900 text-white' : 'border-[#E2E8F0] hover:border-slate-300'
                  }`}
                >
                  <Moon className="w-6 h-6 text-blue-400" />
                  <div>
                    <strong className={`text-sm font-black block ${themeMode === 'Dark' ? 'text-white' : 'text-[#0F172A]'}`}>Dark Mode</strong>
                    <span className="text-[10px] text-slate-400 font-bold">OLED optimized dark</span>
                  </div>
                </button>

                <button
                  onClick={() => { setThemeMode('System'); toast.success('System Theme synchronized'); }}
                  className={`p-5 rounded-2xl border-2 transition flex flex-col gap-3 items-center text-center ${
                    themeMode === 'System' ? 'border-blue-600 bg-blue-50/40' : 'border-[#E2E8F0] hover:border-slate-300'
                  }`}
                >
                  <Laptop className="w-6 h-6 text-blue-600" />
                  <div>
                    <strong className="text-sm font-black text-[#0F172A] block">System Theme</strong>
                    <span className="text-[10px] text-slate-400 font-bold">Sync with OS schedule</span>
                  </div>
                </button>
              </div>

              <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-black text-xs text-[#0F172A]">Compact Density View</h4>
                  <span className="text-[10px] text-slate-500 font-medium">Reduce whitespace for high-density market trading.</span>
                </div>
                <button
                  onClick={() => setCompactView(!compactView)}
                  className={`w-12 h-6 rounded-full transition relative ${compactView ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition ${compactView ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: LANGUAGE & CURRENCY */}
          {activeTab === 'Language' && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-black text-[#0F172A]">Language & Regional Currency</h3>
                <p className="text-xs text-slate-500">Configure your primary display language and currency symbols.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-black text-[#0F172A]">Primary Language</label>
                  <select
                    value={language}
                    onChange={(e) => { setLanguage(e.target.value); toast.success(`Language set to ${e.target.value}`); }}
                    className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] outline-none focus:border-blue-600"
                  >
                    <option>English (US)</option>
                    <option>Hindi (हिंदी)</option>
                    <option>Gujarati (ગુજરાતી)</option>
                    <option>Marathi (મરાઠી)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-black text-[#0F172A]">Display Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => { setCurrency(e.target.value); toast.success(`Currency set to ${e.target.value}`); }}
                    className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] outline-none focus:border-blue-600"
                  >
                    <option>INR (₹) - Indian Rupee</option>
                    <option>USD ($) - US Dollar</option>
                    <option>EUR (€) - Euro</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NOTIFICATIONS */}
          {activeTab === 'Notifications' && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-black text-[#0F172A]">Notification & Advisory Preferences</h3>
                <p className="text-xs text-slate-500">Control real-time price triggers, AI recommendations, and research delivery channels.</p>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { key: 'priceAlerts', title: 'Target & Stop Loss Price Alerts', desc: 'Real-time push notifications when stocks hit price targets' },
                  { key: 'aiTriggers', title: 'AI Portfolio Risk Alerts', desc: 'Automated warnings on sector concentration or monsoon volatility' },
                  { key: 'researchCalls', title: 'SEBI Lead Advisory Calls', desc: 'Instant alerts when new Research Reports or Buy Calls are published' },
                  { key: 'whatsappUpdates', title: 'WhatsApp Daily Digest', desc: 'Receive 60-second morning market synthesis directly on WhatsApp' }
                ].map((item) => (
                  <div key={item.key} className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-xs text-[#0F172A]">{item.title}</h4>
                      <span className="text-[10px] text-slate-500 font-medium">{item.desc}</span>
                    </div>
                    <button
                      onClick={() => toggleNotif(item.key as any)}
                      className={`w-12 h-6 rounded-full transition relative ${notifications[item.key as keyof typeof notifications] ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition ${notifications[item.key as keyof typeof notifications] ? 'right-0.5' : 'left-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PRIVACY & DATA */}
          {activeTab === 'Privacy' && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-black text-[#0F172A]">Privacy & Data Governance</h3>
                <p className="text-xs text-slate-500">Manage your data encryption and privacy settings.</p>
              </div>

              <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-black text-xs text-[#0F172A]">Anonymous Analytics Sharing</h4>
                  <span className="text-[10px] text-slate-500 font-medium">Help improve AI trading conviction models using anonymized data.</span>
                </div>
                <button
                  onClick={() => { setAnalyticsConsent(!analyticsConsent); toast.success('Analytics consent updated'); }}
                  className={`w-12 h-6 rounded-full transition relative ${analyticsConsent ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition ${analyticsConsent ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>

              {/* Danger Zone */}
              <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl flex flex-col gap-3">
                <div className="flex items-center gap-2 text-rose-800">
                  <AlertTriangle className="w-5 h-5" />
                  <h4 className="font-black text-sm">Danger Zone</h4>
                </div>
                <p className="text-xs text-rose-700 font-medium">
                  Permanently erase your account, trade logs, connected brokers, and advisory subscriptions. This action is irreversible.
                </p>
                <button
                  onClick={handleDeleteAccount}
                  className="self-start px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition"
                >
                  Delete Account & Erase Data
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: SECURITY */}
          {activeTab === 'Security' && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-black text-[#0F172A]">Security & Authentication</h3>
                <p className="text-xs text-slate-500">Manage two-factor authentication, PIN locks, and active device sessions.</p>
              </div>

              <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-black text-xs text-[#0F172A]">Two-Factor Authentication (2FA)</h4>
                  <span className="text-[10px] text-slate-500 font-medium">Require SMS / Authenticator app OTP for all order executions.</span>
                </div>
                <button
                  onClick={() => { setTwoFactor(!twoFactor); toast.success('2FA Status updated'); }}
                  className={`w-12 h-6 rounded-full transition relative ${twoFactor ? 'bg-emerald-600' : 'bg-slate-300'}`}
                >
                  <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition ${twoFactor ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>

              <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-black text-xs text-[#0F172A]">Biometric TouchID / FaceID</h4>
                  <span className="text-[10px] text-slate-500 font-medium">Quick biometric authorization on mobile devices.</span>
                </div>
                <button
                  onClick={() => { setBiometrics(!biometrics); toast.success('Biometrics updated'); }}
                  className={`w-12 h-6 rounded-full transition relative ${biometrics ? 'bg-emerald-600' : 'bg-slate-300'}`}
                >
                  <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition ${biometrics ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: CONNECTED APPS */}
          {activeTab === 'Connected Apps' && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-black text-[#0F172A]">Connected Broker Accounts</h3>
                <p className="text-xs text-slate-500">Active OAuth integrations with licensed Indian stockbrokers.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center">ZE</div>
                    <div>
                      <h4 className="font-black text-xs text-[#0F172A]">Zerodha Kite</h4>
                      <span className="text-[10px] text-emerald-600 font-bold">Connected (ID: OK8912)</span>
                    </div>
                  </div>
                  <button onClick={() => toast.success('Zerodha synchronized')} className="text-xs font-black text-blue-600 hover:underline">Sync</button>
                </div>

                <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center">GW</div>
                    <div>
                      <h4 className="font-black text-xs text-[#0F172A]">Groww</h4>
                      <span className="text-[10px] text-emerald-600 font-bold">Connected</span>
                    </div>
                  </div>
                  <button onClick={() => toast.success('Groww synchronized')} className="text-xs font-black text-blue-600 hover:underline">Sync</button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: LEGAL */}
          {activeTab === 'Legal' && (
            <div className="flex flex-col gap-4 text-xs text-slate-600 font-medium leading-relaxed">
              <h3 className="text-lg font-black text-[#0F172A]">SEBI Advisory Disclosures & Legal</h3>
              <p>
                Univest Advisory Services is a registered Research Analyst under SEBI (Research Analysts) Regulations, 2014. Registration No: <strong>INH000012345</strong>.
              </p>
              <p>
                Investments in the securities market are subject to market risks. Read all related documents carefully before investing. Past performance is not indicative of future returns.
              </p>
            </div>
          )}

          {/* TAB 8: ABOUT */}
          {activeTab === 'About' && (
            <div className="flex flex-col gap-4 text-xs">
              <h3 className="text-lg font-black text-[#0F172A]">About Univest Investment Platform</h3>
              <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 flex flex-col gap-2">
                <div className="flex justify-between font-bold">
                  <span>Application Version</span>
                  <strong className="text-[#0F172A]">v2.4.0 (Build 8912)</strong>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Compliance Engine</span>
                  <strong className="text-emerald-600">SEBI Compliant 2026</strong>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: SUPPORT */}
          {activeTab === 'Support' && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-black text-[#0F172A]">Support & Advisory Helpdesk</h3>
                <p className="text-xs text-slate-500">Contact our 24/7 dedicated investor support team.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-[#F8FAFC] rounded-2xl border border-slate-200 flex flex-col gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <h4 className="font-black text-sm text-[#0F172A]">Live Advisor Chat</h4>
                  <p className="text-xs text-slate-500">Connect with a certified research analyst within 2 minutes.</p>
                  <button onClick={() => toast.success('Connecting to Live Advisory Chat...')} className="mt-2 py-2 rounded-xl bg-blue-600 text-white font-black text-xs">Start Live Chat</button>
                </div>

                <div className="p-5 bg-[#F8FAFC] rounded-2xl border border-slate-200 flex flex-col gap-2">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-black text-sm text-[#0F172A]">Email Helpdesk</h4>
                  <p className="text-xs text-slate-500">Send detailed tickets to support@univest.in</p>
                  <button onClick={() => toast.success('Ticket form opened')} className="mt-2 py-2 rounded-xl bg-[#0F172A] text-white font-black text-xs">Create Ticket</button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default SettingsCenter;
