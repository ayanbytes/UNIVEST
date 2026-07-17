import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Rocket, Eye, ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '../atoms/Button';

export const WelcomeContinue = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleBack = () => {
    navigate('/get-started');
  };

  const handleSelectOption = (option: number) => {
    setSelectedCard(option);
    setTimeout(() => {
      if (option === 1) {
        navigate('/login-otp?mode=existing');
      } else if (option === 2) {
        navigate('/login-otp?mode=new');
      } else if (option === 3) {
        navigate('/design-system?demo=true');
      }
    }, 450); // small delay for animation response
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 25 } },
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-brand-navy flex flex-col justify-between p-6 md:p-10 font-sans relative selection:bg-primary/20 selection:text-primary">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 blur-[120px] pointer-events-none" />

      {/* Top Header */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between z-10">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-brand-secondary hover:text-brand-navy text-xs font-semibold transition-colors focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary to-success flex items-center justify-center text-white font-extrabold text-xs shadow-premium-sm border border-white/5">
            U
          </div>
          <span className="text-xs font-black tracking-tight text-brand-navy">
            UNIVEST
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto flex flex-col justify-center my-8 z-10 gap-8">
        
        {/* Title */}
        <div className="flex flex-col gap-2 text-center max-w-md mx-auto">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-brand-navy">
            Welcome to Univest
          </h1>
          <p className="text-xs md:text-sm text-brand-secondary">
            Choose how you would like to continue your investment intelligence journey.
          </p>
        </div>

        {/* Options Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1: Existing Investor */}
          <motion.div
            variants={cardVariants}
            onClick={() => handleSelectOption(1)}
            className={`cursor-pointer bg-white border rounded-card p-6 flex flex-col justify-between min-h-[250px] shadow-premium-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 ${
              selectedCard === 1 ? 'border-primary ring-2 ring-primary/20 shadow-glow-blue' : 'border-brand-border'
            }`}
          >
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-black text-brand-navy">I already have an account</h3>
                <p className="text-[11px] text-brand-secondary leading-normal">
                  Sign in to your existing account and continue tracking your customized portfolios.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 mt-6">
              <Button variant="primary" className="w-full text-xs py-3 text-white">
                <span>Continue with OTP</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
              <span className="text-[9px] text-brand-secondary text-center">For registered Univest members.</span>
            </div>
          </motion.div>

          {/* Card 2: New Investor */}
          <motion.div
            variants={cardVariants}
            onClick={() => handleSelectOption(2)}
            className={`cursor-pointer bg-white border rounded-card p-6 flex flex-col justify-between min-h-[250px] shadow-premium-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 ${
              selectedCard === 2 ? 'border-primary ring-2 ring-primary/20 shadow-glow-blue' : 'border-brand-border'
            }`}
          >
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success shrink-0">
                <Rocket className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-black text-brand-navy">I'm new to investing</h3>
                <p className="text-[11px] text-brand-secondary leading-normal">
                  Create your investment account, verify KYC documents, and access personalized AI insights.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 mt-6">
              <Button variant="secondary" className="w-full text-xs py-3">
                <span>Create New Account</span>
              </Button>
              <span className="text-[9px] text-brand-secondary text-center">Takes approximately 5 minutes.</span>
            </div>
          </motion.div>

          {/* Card 3: Explore Demo */}
          <motion.div
            variants={cardVariants}
            onClick={() => handleSelectOption(3)}
            className={`cursor-pointer bg-white border rounded-card p-6 flex flex-col justify-between min-h-[250px] shadow-premium-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 ${
              selectedCard === 3 ? 'border-primary ring-2 ring-primary/20 shadow-glow-blue' : 'border-brand-border'
            }`}
          >
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                <Eye className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-black text-brand-navy">Explore Before Joining</h3>
                <p className="text-[11px] text-brand-secondary leading-normal">
                  Browse the app, view market trends, and preview sample advisory research feeds.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 mt-6">
              <Button variant="secondary" className="w-full text-xs py-3 border-dashed hover:border-solid">
                <span>Explore Demo Platform</span>
              </Button>
              <span className="text-[9px] text-brand-secondary text-center">No registration credentials needed.</span>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer disclaimers */}
      <footer className="max-w-md mx-auto w-full text-center flex flex-col gap-3 border-t border-slate-200 pt-6 z-10 text-[10px] text-brand-secondary">
        <div className="flex items-center justify-center gap-3 font-semibold">
          <a href="#help" className="hover:text-brand-navy flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" /> Need Help?
          </a>
          <span>•</span>
          <a href="#privacy" className="hover:text-brand-navy">Privacy Policy</a>
          <span>•</span>
          <a href="#terms" className="hover:text-brand-navy">Terms of Service</a>
        </div>
        <span>SEBI Registered Investment Advisory Intermediary</span>
      </footer>
    </div>
  );
};
export default WelcomeContinue;
