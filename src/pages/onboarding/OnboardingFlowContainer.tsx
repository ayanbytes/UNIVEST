import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';

import { WelcomeStep } from './WelcomeStep';
import { PersonalDetailsStep, type PersonalDetailsData } from './PersonalDetailsStep';
import { PANVerificationStep, type PANData } from './PANVerificationStep';
import { AadhaarVerificationStep, type AadhaarData } from './AadhaarVerificationStep';
import { BankDetailsStep, type BankData } from './BankDetailsStep';
import { AgreementsStep } from './AgreementsStep';

export const OnboardingFlowContainer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = (location.state as { name?: string; email?: string; mobile?: string }) || {};

  const [currentStep, setCurrentStep] = useState(1);

  const [personalData, setPersonalData] = useState<Partial<PersonalDetailsData>>({
    fullName: navState.name || 'Omar Khan',
    email: navState.email || 'omar@example.com',
    mobile: navState.mobile || '9876543210'
  });
  const [panData, setPanData] = useState<Partial<PANData>>({});
  const [aadhaarData, setAadhaarData] = useState<Partial<AadhaarData>>({});
  const [bankData, setBankData] = useState<Partial<BankData>>({});

  const steps = [
    { number: 1, title: 'Welcome' },
    { number: 2, title: 'PAN Card' },
    { number: 3, title: 'Aadhaar' },
    { number: 4, title: 'Live Selfie' },
    { number: 5, title: 'Bank Account' },
    { number: 6, title: 'Review Details' },
    { number: 7, title: 'Digital Signature' },
    { number: 8, title: 'Agreement' },
    { number: 9, title: 'Success' }
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-[280px] bg-white border-r border-slate-200 py-10 pl-10 pr-6 shrink-0">
        <h2 className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-8">
          KYC Steps Timeline
        </h2>
        <div className="flex flex-col gap-6 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-slate-100 -z-0" />
          
          {steps.map((st) => {
            const isCompleted = st.number < currentStep;
            const isCurrent = st.number === currentStep;
            const isUpcoming = st.number > currentStep;

            return (
              <div key={st.number} className="flex items-center gap-4 relative z-10">
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${
                    isCurrent 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                      : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white text-slate-400 border border-slate-200'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : st.number}
                </div>
                <span 
                  className={`text-sm font-semibold transition-colors ${
                    isCurrent ? 'text-slate-900' : isCompleted ? 'text-slate-600' : 'text-slate-400'
                  }`}
                >
                  {st.title}
                </span>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-50/50 blur-[120px]" />
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 z-10 w-full">
          <div className="w-full max-w-2xl mx-auto">
            {currentStep === 1 && (
              <WelcomeStep onNext={() => setCurrentStep(2)} />
            )}
            {currentStep === 2 && (
              <PANVerificationStep
                initialData={panData}
                onNext={(data) => {
                  setPanData(data);
                  setCurrentStep(3);
                }}
                onBack={() => setCurrentStep(1)}
              />
            )}
            {currentStep === 3 && (
              <AadhaarVerificationStep
                initialData={aadhaarData}
                onNext={(data) => {
                  setAadhaarData(data);
                  setCurrentStep(4);
                }}
                onBack={() => setCurrentStep(2)}
              />
            )}
            {currentStep === 4 && (
              <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
                <h2 className="text-xl font-bold mb-4">Live Selfie</h2>
                <p className="text-slate-500 mb-6">Camera integration goes here.</p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => setCurrentStep(3)} className="text-sm font-bold text-slate-500">Back</button>
                  <button onClick={() => setCurrentStep(5)} className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold">Skip for now</button>
                </div>
              </div>
            )}
            {currentStep === 5 && (
              <BankDetailsStep
                initialData={bankData}
                onNext={(data) => {
                  setBankData(data);
                  setCurrentStep(6);
                }}
                onBack={() => setCurrentStep(4)}
              />
            )}
            {currentStep === 6 && (
              <PersonalDetailsStep
                initialData={personalData}
                onNext={(data) => {
                  setPersonalData(data);
                  setCurrentStep(7);
                }}
              />
            )}
            {currentStep === 7 && (
              <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
                <h2 className="text-xl font-bold mb-4">Digital Signature</h2>
                <p className="text-slate-500 mb-6">Signature pad integration goes here.</p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => setCurrentStep(6)} className="text-sm font-bold text-slate-500">Back</button>
                  <button onClick={() => setCurrentStep(8)} className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold">Skip for now</button>
                </div>
              </div>
            )}
            {currentStep === 8 && (
              <AgreementsStep
                onComplete={() => setCurrentStep(9)}
                onBack={() => setCurrentStep(7)}
              />
            )}
            {currentStep === 9 && (
              <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-4">Verification Complete!</h2>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto">Your KYC details have been successfully submitted and verified. You are now ready to invest.</p>
                <button onClick={() => navigate('/dashboard')} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5">
                  Go to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OnboardingFlowContainer;
