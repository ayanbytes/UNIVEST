import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Button } from './components/atoms/Button';
import { Input } from './components/atoms/Input';
import { Switch } from './components/atoms/Switch';
import { SegmentedControl } from './components/molecules/SegmentedControl';
import { Modal } from './components/molecules/Modal';
import { StockPrice } from './components/financial/StockPrice';
import { RiskMeter } from './components/financial/RiskMeter';
import { Allocation } from './components/financial/Allocation';
import { ResearchCard } from './components/financial/ResearchCard';
import type { ResearchCall } from './components/financial/ResearchCard';
import { IndexCard } from './components/financial/IndexCard';
import { Info } from 'lucide-react';
import HomeDashboard from './components/dashboard/HomeDashboard';

// New Screens
import SplashScreen from './components/molecules/SplashScreen';
import GetStarted from './components/molecules/GetStarted';
import LoginWithOtp from './components/molecules/LoginWithOtp';
import InvestorOnboarding from './components/molecules/InvestorOnboarding';
import InvestorPersonalization from './components/molecules/InvestorPersonalization';

// Mock Data
const MOCK_CALLS: ResearchCall[] = [
  {
    id: '1',
    symbol: 'TATASTEEL',
    companyName: 'Tata Steel Limited',
    category: 'Short Term',
    recommendation: 'buy',
    entryPriceRange: '₹145 - ₹148',
    targetPrice: 165.00,
    stopLoss: 138.00,
    potentialUpside: 12.5,
    confidenceScore: 94,
    publishedDate: '17 Jul 2026',
    risk: 'Low',
  },
  {
    id: '2',
    symbol: 'RELIANCE',
    companyName: 'Reliance Industries Ltd',
    category: 'Positional',
    recommendation: 'hold',
    entryPriceRange: '₹2,420 - ₹2,450',
    targetPrice: 2700.00,
    stopLoss: 2310.00,
    potentialUpside: 10.2,
    confidenceScore: 88,
    publishedDate: '16 Jul 2026',
    risk: 'Moderate',
  },
  {
    id: '3',
    symbol: 'NIFTY_23JUL_22000_CE',
    companyName: 'Nifty Options Advisory',
    category: 'F&O',
    recommendation: 'buy',
    entryPriceRange: '₹110 - ₹115',
    targetPrice: 195.00,
    stopLoss: 75.00,
    potentialUpside: 69.5,
    confidenceScore: 91,
    publishedDate: '17 Jul 2026',
    risk: 'High',
  }
];

const MOCK_ALLOCATION = [
  { assetClass: 'Equities', percentage: 55, value: 550000, color: '#2563EB' },
  { assetClass: 'Mutual Funds', percentage: 25, value: 250000, color: '#10B981' },
  { assetClass: 'Gold / Commodity', percentage: 12, value: 120000, color: '#F59E0B' },
  { assetClass: 'Liquid Cash', percentage: 8, value: 80000, color: '#64748B' },
];

function ShowcaseContent() {
  const [switchVal, setSwitchVal] = useState(false);
  const [segmentVal, setSegmentVal] = useState('1D');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textInput, setTextInput] = useState('');

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-h1 font-bold tracking-tight text-brand-navy dark:text-dark-text">
          Design System Foundation
        </h1>
        <p className="text-sm text-brand-secondary mt-1">
          Explore design tokens, micro-interactions, responsive grids, and premium financial cards.
        </p>
      </div>

      {/* Indices Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <IndexCard
          name="Nifty 50"
          value={22045.25}
          change={128.40}
          changePercent={0.58}
          sparklineData={[21900, 21950, 21920, 21980, 22010, 22045]}
        />
        <IndexCard
          name="Bank Nifty"
          value={46210.80}
          change={-245.10}
          changePercent={-0.53}
          sparklineData={[46500, 46420, 46460, 46310, 46250, 46210]}
        />
        <IndexCard
          name="SENSEX"
          value={72426.64}
          change={480.20}
          changePercent={0.67}
          sparklineData={[71900, 72100, 72050, 72200, 72350, 72426]}
        />
      </section>

      {/* Advisory Calls Grid */}
      <section className="flex flex-col gap-4">
        <h3 className="text-h3 font-bold text-brand-navy dark:text-dark-text">
          Live Advisory Signals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_CALLS.map((call) => (
            <ResearchCard
              key={call.id}
              call={call}
              onTrack={() => setIsModalOpen(true)}
            />
          ))}
        </div>
      </section>

      {/* Interactive Controls & Financial Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Controls */}
        <div className="bg-white dark:bg-dark-card border border-brand-border dark:border-dark-border rounded-card p-6 shadow-premium flex flex-col gap-6">
          <h3 className="text-lg font-bold text-brand-navy dark:text-dark-text border-b border-brand-border/40 pb-3">
            Core Controls & Form Atoms
          </h3>
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="ghost">Ghost Button</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Search Input"
                placeholder="Search stock..."
                isSearch
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
              <Input
                label="Secure Password Input"
                placeholder="Enter password"
                type="password"
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={switchVal} onChange={setSwitchVal} />
                <span className="text-xs text-brand-secondary font-medium">Toggle Notification Push</span>
              </div>

              <SegmentedControl
                options={[
                  { label: '1D', value: '1D' },
                  { label: '1W', value: '1W' },
                  { label: '1M', value: '1M' },
                  { label: 'ALL', value: 'ALL' },
                ]}
                selectedValue={segmentVal}
                onChange={setSegmentVal}
              />
            </div>
            
            <div className="pt-2">
              <Button variant="secondary" className="w-full" onClick={() => setIsModalOpen(true)}>
                Trigger Modal Component
              </Button>
            </div>
          </div>
        </div>

        {/* Portfolio & Financial Insights */}
        <div className="bg-white dark:bg-dark-card border border-brand-border dark:border-dark-border rounded-card p-6 shadow-premium flex flex-col gap-6">
          <h3 className="text-lg font-bold text-brand-navy dark:text-dark-text border-b border-brand-border/40 pb-3">
            Financial Widgets
          </h3>

          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-brand-secondary">Current Stock Price (TATASTEEL)</span>
                <StockPrice price={147.20} change={3.45} changePercent={2.40} size="md" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-brand-secondary">Loss Price (INFY)</span>
                <StockPrice price={1560.00} change={-42.50} changePercent={-2.65} size="md" />
              </div>
            </div>

            <RiskMeter level="Moderate" />

            <Allocation items={MOCK_ALLOCATION} />
          </div>
        </div>
      </div>

      {/* Modal Dialog Showcase */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Research Call Execution Details"
      >
        <div className="flex flex-col gap-4 text-brand-navy dark:text-dark-text">
          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 text-primary dark:text-blue-400 rounded-input border border-blue-200/50 dark:border-blue-900/30 text-xs">
            <Info className="w-4 h-4 shrink-0" />
            <span>Advisory recommendations are generated based on mathematical indicators and analyst validation.</span>
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-sm">SEBI Compliance Workflow Guidelines</h4>
            <p className="text-xs text-brand-secondary leading-relaxed">
              Before placing a trade, ensure you read all scheme-related information and disclaimers. Past performance is not a guarantee of future returns. Stock market investments are subject to market risks.
            </p>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-brand-border/60">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>Confirm Advisory</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// Kept as an internal component showcase while the signed-in route renders HomeDashboard.
void ShowcaseContent;

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/login-otp" element={<LoginWithOtp />} />
          <Route path="/welcome-continue" element={<Navigate to="/login-otp" replace />} />
          <Route path="/onboarding" element={<InvestorOnboarding />} />
          <Route path="/personalization" element={<InvestorPersonalization />} />
          <Route
            path="/design-system"
            element={
              <DashboardLayout>
                <HomeDashboard />
              </DashboardLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
