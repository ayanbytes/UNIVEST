import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { Button } from '../../components/atoms/Button';

interface WelcomeStepProps {
  onNext: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col max-w-xl"
    >
      <div className="mb-8">
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 border border-indigo-100 shadow-sm">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
          Complete Your Investor Verification
        </h1>
        <p className="text-slate-500 font-medium leading-relaxed text-[15px]">
          To provide stock recommendations, investment services and maintain regulatory compliance, we need to verify your identity.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-4 flex items-start gap-4 shadow-sm hover:border-slate-300 transition">
          <div className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Fast Verification</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">Takes less than 3 minutes to complete.</p>
          </div>
        </div>

        <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-4 flex items-start gap-4 shadow-sm hover:border-slate-300 transition">
          <div className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Encrypted Data</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">Your documents are safe with us.</p>
          </div>
        </div>
      </div>

      <Button
        onClick={onNext}
        className="w-full sm:w-auto self-start px-8 py-3.5 text-[15px] font-bold rounded-xl"
        icon={<ArrowRight className="w-4 h-4" />}
        iconPosition="right"
      >
        Start Verification
      </Button>
    </motion.div>
  );
};
