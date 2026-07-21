import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, X, Pin, Trash2, CheckCircle2, Archive, ArrowRight, TrendingUp, 
  AlertCircle, Radio, FileText, Briefcase, ShoppingBag, Zap, ShieldCheck, Sparkles, Filter
} from 'lucide-react';
import toast from 'react-hot-toast';

interface NotificationItem {
  id: string;
  category: 'Portfolio' | 'Orders' | 'Research' | 'News' | 'Corporate Actions' | 'Price Alerts';
  title: string;
  summary: string;
  time: string;
  priority: 'High' | 'Medium' | 'Low';
  stock?: string;
  companyName?: string;
  isRead: boolean;
  isPinned: boolean;
  ctaText: string;
  destinationType: 'stock' | 'research' | 'trade' | 'news' | 'portfolio';
  dataPayload?: any;
}

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStock?: (stock: any) => void;
  onSelectResearch?: (research: any) => void;
  onTrade?: (tradeData: any) => void;
  onSelectNews?: (news: any) => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  onSelectStock,
  onSelectResearch,
  onTrade,
  onSelectNews
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Portfolio' | 'Orders' | 'Research' | 'News' | 'Corporate Actions' | 'Price Alerts'>('All');
  
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      category: 'Research',
      title: 'Reliance Industries (RELIANCE) Re-rating Trigger',
      summary: 'Green Hydrogen Gigafactory commissioning timeline verified by SEBI Lead Analyst Aarav Mehta. Upside target: ₹3,375 (+14%).',
      time: '10 min ago',
      priority: 'High',
      stock: 'RELIANCE',
      companyName: 'Reliance Industries Ltd',
      isRead: false,
      isPinned: true,
      ctaText: 'Read Advisory Research',
      destinationType: 'research',
      dataPayload: { symbol: 'RELIANCE', company: 'Reliance Industries Ltd', rec: 'BUY', target: '₹3,375', price: '₹3,024.50' }
    },
    {
      id: 'n2',
      category: 'Price Alerts',
      title: 'Stop Loss Alert Triggered: INFY',
      summary: 'Infosys Ltd dropped below ₹1,580 support level. AI Risk Engine recommends reviewing position or tightening stop loss.',
      time: '25 min ago',
      priority: 'High',
      stock: 'INFY',
      companyName: 'Infosys Limited',
      isRead: false,
      isPinned: false,
      ctaText: 'Open Stock Workspace',
      destinationType: 'stock',
      dataPayload: { symbol: 'INFY', company: 'Infosys Limited' }
    },
    {
      id: 'n3',
      category: 'Orders',
      title: 'Order Executed: BUY HDFCBANK',
      summary: 'Limit order for 50 shares of HDFC Bank executed cleanly at ₹1,682.40 on NSE. Total amount: ₹84,120.00.',
      time: '1 hour ago',
      priority: 'Medium',
      stock: 'HDFCBANK',
      companyName: 'HDFC Bank Ltd',
      isRead: true,
      isPinned: false,
      ctaText: 'View Order Details',
      destinationType: 'trade',
      dataPayload: { symbol: 'HDFCBANK', company: 'HDFC Bank Ltd', price: '1,682.40', rec: 'BUY' }
    },
    {
      id: 'n4',
      category: 'Corporate Actions',
      title: 'L&T Dividend Ex-Date Tomorrow',
      summary: 'Larsen & Toubro declared ₹28.00 per share dividend. Ensure holding in demat account prior to record date.',
      time: '2 hours ago',
      priority: 'Medium',
      stock: 'LT',
      companyName: 'Larsen & Toubro Ltd',
      isRead: true,
      isPinned: false,
      ctaText: 'View Workspace',
      destinationType: 'stock',
      dataPayload: { symbol: 'LT', company: 'Larsen & Toubro Ltd' }
    },
    {
      id: 'n5',
      category: 'News',
      title: 'RBI Repo Rate Maintained at 6.50%',
      summary: 'Central bank maintains rate pause. Commercial banking liquidity inflows project positive expansion for top lenders.',
      time: '3 hours ago',
      priority: 'Low',
      stock: 'HDFCBANK',
      companyName: 'HDFC Bank Ltd',
      isRead: false,
      isPinned: false,
      ctaText: 'Read Intelligence Story',
      destinationType: 'news',
      dataPayload: { headline: 'RBI Repo Rate Maintained at 6.50%: Banking System Liquidity Inflows Expected', source: 'Bloomberg India' }
    },
    {
      id: 'n6',
      category: 'Portfolio',
      title: 'AI Sector Rebalance Recommendation',
      summary: 'IT sector concentration risk detected (28% of total portfolio). AI recommends reallocating 5% into Healthcare & FMCG.',
      time: '5 hours ago',
      priority: 'Medium',
      stock: 'SUNPHARMA',
      companyName: 'Sun Pharma Ltd',
      isRead: true,
      isPinned: false,
      ctaText: 'Review Portfolio Health',
      destinationType: 'portfolio',
      dataPayload: {}
    }
  ]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'All', label: 'All' },
    { id: 'Portfolio', label: 'Portfolio' },
    { id: 'Orders', label: 'Orders' },
    { id: 'Research', label: 'Research' },
    { id: 'News', label: 'News' },
    { id: 'Corporate Actions', label: 'Corporate' },
    { id: 'Price Alerts', label: 'Price Alerts' }
  ] as const;

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'All') return true;
    return n.category === activeTab;
  }).sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.success('Notification feed cleared');
  };

  const togglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.map(n => {
      if (n.id === id) {
        const nextPin = !n.isPinned;
        toast.success(nextPin ? 'Notification pinned to top' : 'Notification unpinned');
        return { ...n, isPinned: nextPin };
      }
      return n;
    }));
  };

  const toggleRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success('Notification removed');
  };

  const handleNotificationClick = (item: NotificationItem) => {
    // Mark read
    setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, isRead: true } : n));
    onClose();

    if (item.destinationType === 'research' && onSelectResearch) {
      onSelectResearch(item.dataPayload);
    } else if (item.destinationType === 'stock' && onSelectStock) {
      onSelectStock(item.dataPayload);
    } else if (item.destinationType === 'trade' && onTrade) {
      onTrade(item.dataPayload);
    } else if (item.destinationType === 'news' && onSelectNews) {
      onSelectNews(item.dataPayload);
    } else if (item.destinationType === 'portfolio' && onSelectStock) {
      onSelectStock({ symbol: 'HDFCBANK', company: 'HDFC Bank Ltd' });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[90] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
        />

        {/* Notification Panel Workspace */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="relative w-full max-w-[500px] bg-white border-l border-[#E2E8F0] h-full flex flex-col shadow-2xl z-10 overflow-hidden"
        >
          {/* HEADER */}
          <header className="p-5 border-b border-[#E2E8F0] bg-white flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-black text-base text-[#0F172A] leading-tight flex items-center gap-2">
                  Notification Center
                </h3>
                <span className="text-[10px] text-slate-400 font-bold">Live Market & Advisory Feed</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleMarkAllRead}
                className="text-[10px] font-extrabold text-blue-600 hover:underline px-2 py-1"
              >
                Mark Read
              </button>
              <button
                onClick={handleClearAll}
                className="text-[10px] font-extrabold text-rose-600 hover:underline px-2 py-1"
              >
                Clear
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* CATEGORY TABS (Segmented Control) */}
          <div className="flex items-center gap-1.5 px-5 py-2.5 border-b border-slate-100 bg-[#F8FAFC] overflow-x-auto text-xs font-bold shadow-inner">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl transition whitespace-nowrap shrink-0 ${
                    isActive ? 'bg-[#0F172A] text-white font-black shadow-2xs' : 'text-slate-500 hover:text-[#0F172A]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* NOTIFICATION TIMELINE LIST */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-16 text-slate-400 font-bold text-xs">
                <Bell className="w-10 h-10 text-slate-300 mb-3" />
                No notifications in {activeTab}.
              </div>
            ) : (
              filteredNotifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col gap-2.5 relative group ${
                    item.isPinned
                      ? 'bg-blue-50/40 border-blue-200'
                      : !item.isRead
                      ? 'bg-white border-blue-200 shadow-sm'
                      : 'bg-white border-[#E2E8F0] opacity-80 hover:opacity-100 hover:border-slate-300'
                  }`}
                >
                  {/* Item Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {!item.isRead && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      )}
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${
                        item.priority === 'High' 
                          ? 'bg-rose-100 text-rose-800' 
                          : item.priority === 'Medium' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.priority} Priority
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">{item.time}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => togglePin(item.id, e)}
                        className={`p-1 rounded-md hover:bg-slate-100 transition ${
                          item.isPinned ? 'text-blue-600' : 'text-slate-400'
                        }`}
                        title={item.isPinned ? 'Unpin' : 'Pin to top'}
                      >
                        <Pin className="w-3.5 h-3.5" fill={item.isPinned ? '#2563EB' : 'none'} />
                      </button>
                      <button
                        onClick={(e) => deleteNotification(item.id, e)}
                        className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-rose-600 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <div>
                    <h4 className="font-black text-sm text-[#0F172A] leading-snug group-hover:text-blue-600 transition">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">
                      {item.summary}
                    </p>
                  </div>

                  {/* Item Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    {item.stock ? (
                      <span className="text-[10px] font-black bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                        ${item.stock}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-bold">{item.category}</span>
                    )}

                    <span className="text-xs font-black text-blue-600 hover:underline flex items-center gap-1">
                      {item.ctaText} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FOOTER */}
          <footer className="p-4 border-t border-[#E2E8F0] bg-white flex items-center justify-between text-[10px] text-slate-400 font-bold">
            <span>UNIVEST Real-time Alert Dispatcher</span>
            <span>Click any item to view details</span>
          </footer>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default NotificationCenterModal;
