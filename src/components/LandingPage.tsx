import React from "react";
import CZApayLogo from "./CZApayLogo";
import EWAPlayground from "./EWAPlayground";
import AICoach from "./AICoach";
import { motion } from "motion/react";
import { 
  ShieldCheck, Check, Sparkles, PhoneCall, ArrowDown, HelpCircle, 
  MessageSquare, User, Briefcase, Landmark, ShieldAlert, Award, Zap, HeartHandshake,
  Menu, X, ChevronDown, ChevronUp, Bell, ChevronRight, Clock, TrendingUp
} from "lucide-react";

interface LandingPageProps {
  onNavigateToPortal: () => void;
}

export default function LandingPage({ onNavigateToPortal }: LandingPageProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

  const faqData = [
    {
      question: "What is Earned Wage Access (EWA) and is it a loan?",
      answer: "No, CZApay is not a loan. It is a modern financial wellness benefit that lets employees access money they have already earned during the current work cycle. Because you are simply drawing on your own worked hours, there is no credit bureau check, no interest accumulation, and absolutely no debt trap."
    },
    {
      question: "How much does it cost to withdraw, and are there hidden fees?",
      answer: "We charge a simple flat fee of R35 per cash-out. There are absolutely 0% interest rates, no compound interest, no monthly membership fees, and no penalty costs. You only pay for what you use, when you use it."
    },
    {
      question: "How does employer payroll integration work?",
      answer: "CZApay syncs securely with your employer's shift logs or payroll system to update your accrued salary daily. You can access up to 50% of what you have earned. At payday, your employer's payroll automatically deducts the accessed amount and pays the remaining net balance to your standard bank account as normal."
    },
    {
      question: "Does EWA affect our company's working capital or cash flow?",
      answer: "No. CZApay funds all employee withdrawals in the middle of the month out of our own balance sheet. Your corporate bank accounts and cash flows are completely untouched until standard payday, when the employer settles the accumulated payroll deduction total."
    },
    {
      question: "Is CZApay compliant with South African labor and privacy laws?",
      answer: "Absolutely. CZApay is fully compliant with the Basic Conditions of Employment Act (BCEA), the Protection of Personal Information Act (POPIA), and SABRIC cybersecurity frameworks. Employee data remains 100% encrypted, and deductions are classified as lawful salary advances under South African labor law guidelines."
    },
    {
      question: "How fast do payouts reach an employee's bank account?",
      answer: "With our real-time instant-clearing EFT integrations, the money is sent instantly. Payouts clear within seconds to any major South African bank (Nedbank, FNB, Standard Bank, Absa, Capitec, TymeBank, etc.), 24 hours a day, 365 days a year."
    }
  ];
  
  const handleScrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      
      {/* Scroll-Progress / Earning Bar Simulation */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00CFFF] to-[#3151B9] z-[1100] shadow-[0_0_10px_rgba(0,207,255,0.8)]" />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 h-[74px] bg-white/95 backdrop-blur-md border-b border-[#3151B9]/10 z-50 flex items-center">
        <div className="container flex items-center justify-between">
          <CZApayLogo className="h-[54px]" />
          
          <nav className="hidden md:flex items-center gap-7">
            <button 
              onClick={() => handleScrollToId("features")} 
              className="text-sm font-semibold text-[#222E3C] hover:text-[#3151B9] transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => handleScrollToId("pain-point")} 
              className="text-sm font-semibold text-[#222E3C] hover:text-[#3151B9] transition-colors"
            >
              Why Earned Pay Access?
            </button>
            <button 
              onClick={() => handleScrollToId("ewa-playground")} 
              className="text-sm font-semibold text-[#222E3C] hover:text-[#3151B9] transition-colors"
            >
              EWA Simulator
            </button>
            <button 
              onClick={() => handleScrollToId("ai-wellness-section")} 
              className="text-sm font-semibold text-[#222E3C] hover:text-[#3151B9] transition-colors"
            >
              AI Wellness Coach
            </button>
            <button 
              onClick={() => handleScrollToId("faq-section")} 
              className="text-sm font-semibold text-[#222E3C] hover:text-[#3151B9] transition-colors"
            >
              FAQs
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleScrollToId("ewa-playground")}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0B2545] to-[#004080] text-white hover:bg-[#1B3A63] text-sm font-display font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Launch Simulator
            </button>
          </div>

          {/* Mobile Burger Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#0B2545] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-[74px] left-0 right-0 bg-white border-b border-slate-200 shadow-xl py-4 px-6 md:hidden flex flex-col gap-4 animate-in slide-in-from-top duration-200">
            <button 
              onClick={() => {
                handleScrollToId("features");
                setIsMobileMenuOpen(false);
              }} 
              className="text-left text-sm font-semibold text-[#222E3C] hover:text-[#3151B9]"
            >
              How It Works
            </button>
            <button 
              onClick={() => {
                handleScrollToId("pain-point");
                setIsMobileMenuOpen(false);
              }} 
              className="text-left text-sm font-semibold text-[#222E3C] hover:text-[#3151B9]"
            >
              Why Earned Pay Access?
            </button>
            <button 
              onClick={() => {
                handleScrollToId("ewa-playground");
                setIsMobileMenuOpen(false);
              }} 
              className="text-left text-sm font-semibold text-[#222E3C] hover:text-[#3151B9]"
            >
              EWA Simulator
            </button>
            <button 
              onClick={() => {
                handleScrollToId("ai-wellness-section");
                setIsMobileMenuOpen(false);
              }} 
              className="text-left text-sm font-semibold text-[#222E3C] hover:text-[#3151B9]"
            >
              AI Wellness Coach
            </button>
            <button 
              onClick={() => {
                handleScrollToId("faq-section");
                setIsMobileMenuOpen(false);
              }} 
              className="text-left text-sm font-semibold text-[#222E3C] hover:text-[#3151B9]"
            >
              FAQs
            </button>
            <button
              onClick={() => {
                handleScrollToId("ewa-playground");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-center px-5 py-3 rounded-full bg-gradient-to-r from-[#0B2545] to-[#004080] text-white text-sm font-display font-bold"
            >
              Launch Simulator
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-[#F4F6F9] text-slate-800 pt-[148px] pb-24 overflow-hidden min-h-[92vh] flex items-center">
        <div className="absolute inset-0 bg-radial-gradient(circle at 50% 30%, #FFFFFF 0%, #EAF4FF 70%, #DCEBFC 100%) pointer-events-none" />
        <div className="absolute inset-0 hero-grid-pattern opacity-[0.25] pointer-events-none" />
        
        {/* Background glowing spheres */}
        <div className="absolute w-[460px] h-[460px] rounded-full bg-gradient-to-r from-[#00CFFF]/25 to-transparent blur-[70px] -top-32 -right-32 pointer-events-none" />
        <div className="absolute w-[520px] h-[520px] rounded-full bg-gradient-to-r from-[#3151B9]/12 to-transparent blur-[85px] -bottom-48 -left-48 pointer-events-none" />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Copy (Left) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3151B9]/10 border border-[#3151B9]/20 text-[#3151B9] text-xs font-data tracking-widest uppercase"
              >
                <span className="w-2 h-2 bg-[#3151B9] rounded-full dot-live-glow" />
                South Africa's Responsible Pay Alternative
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-black font-display"
              >
                You've Earned It.<br />
                <span className="text-black">
                  Why Wait?
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                className="text-black text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl font-sans opacity-95"
              >
                Give your South African workforce safe, responsible access to a portion of the salaries they have already worked for, instantly. Free of interest, credit checks, and debt risk.
              </motion.p>

              {/* CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
                className="flex flex-wrap gap-4 pt-3"
              >
                <button
                  onClick={() => handleScrollToId("ewa-playground")}
                  className="px-8 py-4 rounded-full bg-[#00CFFF] hover:bg-[#00b5e0] text-black text-base font-display font-extrabold shadow-lg shadow-[#00CFFF]/25 transition-all flex items-center gap-2.5 active:scale-[0.98]"
                >
                  Try Free Simulator
                  <Zap className="w-4 h-4 text-black" />
                </button>
                <button
                  onClick={() => handleScrollToId("ai-wellness-section")}
                  className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-black border border-slate-300 text-base font-display font-bold transition-all active:scale-[0.98] shadow-sm"
                >
                  Meet Financial AI
                </button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-200"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#3151B9]/10 flex items-center justify-center text-[#3151B9]">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-black">0% Interest & Fees Cap</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#3151B9]/10 flex items-center justify-center text-[#3151B9]">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-black">No Credit Check Required</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#3151B9]/10 flex items-center justify-center text-[#3151B9]">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-black">100% Employer Enabled</span>
                </div>
              </motion.div>
            </div>

            {/* Hero Mockup (Right) */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              
              {/* Main Phone Frame */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                className="relative w-full max-w-[325px] bg-[#F7F9FC] border-8 border-black rounded-[40px] shadow-2xl z-10 overflow-hidden pb-16"
              >
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-black rounded-b-3xl mx-auto w-32 z-20"></div>
                
                {/* Simulated App Header */}
                <div className="pt-8 px-5 pb-4 flex justify-between items-center bg-[#F7F9FC]">
                  <div className="h-6">
                     <img src="/czapay-logo.jpg" alt="CZApay" className="h-full w-auto object-contain mix-blend-multiply" />
                  </div>
                  <Bell className="w-5 h-5 text-slate-600" />
                </div>
                
                <div className="px-4 space-y-4 pb-6 relative z-10">
                   {/* Welcome Card */}
                   <div className="bg-gradient-to-r from-[#7B51D1] to-[#9B6DF2] rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
                     {/* Decorative background elements */}
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                     <div className="flex items-center gap-3 mb-4 relative z-10">
                        <img src="/profile-pic.png" className="w-12 h-12 rounded-full border-2 border-white/20 object-cover" alt="Profile" />
                        <div>
                          <div className="font-bold text-lg leading-tight">Welcome back, Thabo!</div>
                          <div className="text-white/80 text-xs">TechCorp SA</div>
                        </div>
                     </div>
                     <div className="text-xs text-white/90 mb-1.5 relative z-10">Work Progress</div>
                     <div className="flex items-center gap-2 relative z-10">
                       <span className="text-sm font-bold">15/22 days</span>
                       <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                         <div className="h-full bg-white rounded-full w-[68%]"></div>
                       </div>
                     </div>
                   </div>

                   {/* Balances */}
                   <div className="grid grid-cols-2 gap-3">
                     <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between h-[90px]">
                       <div className="flex items-center gap-1.5 text-xs text-slate-500">
                         <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                         Earned Balance
                       </div>
                       <div className="font-bold text-base">R17,045.45</div>
                     </div>
                     <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between h-[90px]">
                       <div className="flex items-center gap-1.5 text-xs text-slate-500">
                         <div className="w-2 h-2 rounded-full bg-[#5A87FA]"></div>
                         Available
                       </div>
                       <div className="font-bold text-base">R15,340.91</div>
                     </div>
                   </div>

                   <div className="font-bold text-sm text-slate-800 pt-1">Quick Actions</div>

                   {/* Withdraw Btn */}
                   <button className="w-full bg-gradient-to-r from-[#5E62F2] to-[#A052F1] rounded-xl p-3.5 flex items-center justify-between text-white shadow-md hover:scale-[1.01] transition-transform">
                     <div className="flex items-center gap-3">
                       <div className="p-1.5 bg-white/20 rounded-lg">
                         <ArrowDown className="w-4 h-4" />
                       </div>
                       <div className="text-left">
                         <div className="font-bold text-sm">Withdraw Earnings</div>
                         <div className="text-[10px] text-white/80">Access your earned wages</div>
                       </div>
                     </div>
                     <ChevronRight className="w-4 h-4 text-white/70" />
                   </button>

                   {/* Tx History */}
                   <div className="bg-white rounded-xl p-3.5 flex items-center justify-between shadow-sm border border-slate-100">
                     <div className="flex items-center gap-3">
                       <div className="p-1.5 bg-slate-100 text-slate-600 rounded-lg">
                         <Clock className="w-4 h-4" />
                       </div>
                       <div className="text-left">
                         <div className="font-bold text-sm text-slate-800">Transaction History</div>
                         <div className="text-[10px] text-slate-500">View all your transactions</div>
                       </div>
                     </div>
                     <ChevronRight className="w-4 h-4 text-slate-400" />
                   </div>

                   <div className="font-bold text-sm text-slate-800 pt-1">Recent Activity</div>

                   <div className="bg-white rounded-xl p-3 flex items-center justify-between shadow-sm border border-slate-100 mb-2">
                     <div className="flex items-center gap-3">
                       <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-full">
                         <ArrowDown className="w-4 h-4" />
                       </div>
                       <div className="text-left">
                         <div className="font-bold text-sm text-slate-800">Withdrawal</div>
                         <div className="text-[10px] text-slate-500">2024-06-10</div>
                       </div>
                     </div>
                     <div className="text-right">
                       <div className="font-bold text-sm text-slate-800">-R8500.00</div>
                       <div className="text-[10px] text-slate-500">Fee: R25.00</div>
                     </div>
                   </div>
                </div>

                {/* Bottom Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-100 pt-3 pb-6 px-6 flex justify-between rounded-b-[32px] z-20">
                   <div className="flex flex-col items-center gap-1 text-[#5E62F2]">
                     <Landmark className="w-5 h-5" />
                     <span className="text-[9px] font-semibold">Home</span>
                   </div>
                   <div className="flex flex-col items-center gap-1 text-slate-400">
                     <Clock className="w-5 h-5" />
                     <span className="text-[9px] font-semibold">History</span>
                   </div>
                   <div className="flex flex-col items-center gap-1 text-slate-400">
                     <TrendingUp className="w-5 h-5" />
                     <span className="text-[9px] font-semibold">Reports</span>
                   </div>
                   <div className="flex flex-col items-center gap-1 text-slate-400">
                     <User className="w-5 h-5" />
                     <span className="text-[9px] font-semibold">Profile</span>
                   </div>
                </div>
              </motion.div>

              {/* Mini float card (Left) */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
                transition={{ 
                  x: { duration: 0.6, delay: 0.6 },
                  opacity: { duration: 0.6, delay: 0.6 },
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                }}
                className="absolute -left-4 top-1/4 bg-slate-900/80 border border-white/15 p-3.5 rounded-2xl shadow-xl backdrop-blur-md max-w-[150px] hidden sm:block z-20"
              >
                <span className="text-[9px] text-white/40 block font-data uppercase tracking-wider">Fixed Fee</span>
                <div className="text-sm font-bold text-white font-data mt-0.5">R35 Flat</div>
                <p className="text-[9px] text-white/60 mt-1 leading-snug">No interest rates, no credit score impact.</p>
              </motion.div>

              {/* Mini float card (Right) */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
                transition={{ 
                  x: { duration: 0.6, delay: 0.75 },
                  opacity: { duration: 0.6, delay: 0.75 },
                  y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" }
                }}
                className="absolute -right-4 bottom-1/4 bg-slate-900/80 border border-white/15 p-4 rounded-2xl shadow-xl backdrop-blur-md max-w-[170px] hidden sm:block z-20"
              >
                <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" /> Secure Rails
                </div>
                <div className="text-xs font-bold text-white mt-1">SABRIC Certified</div>
                <p className="text-[9px] text-white/50 mt-1">Direct salary integration system.</p>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-[#0B2545] py-7 border-y border-white/10">
        <div className="container">
          <div className="flex flex-wrap items-center justify-around gap-6 text-white text-xs font-bold">
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#00CFFF]" /> NO CONTRACT DEBT SQUEEZE
            </span>
            <span className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-[#00CFFF]" /> PARTNERED WITH SOUTH AFRICA'S MAJOR BANKS
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00CFFF]" /> POPIA & SABRIC COMPLIANT
            </span>
          </div>
        </div>
      </section>

      {/* Pain Point Section */}
      <section id="pain-point" className="py-20 bg-gradient-to-b from-white to-[#EAF4FF]/40">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copy (Left) */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-data font-bold uppercase tracking-wider text-[#3151B9]">
                <ShieldAlert className="w-4 h-4" /> The 30-Day Payday Crisis
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
                Life Doesn't Wait for Your Monthly Payday
              </h2>
              <p className="text-[#4A5870] leading-relaxed">
                South African employees work hard every day, accumulating value continuously. Yet, traditional monthly payroll locks those earnings away until payday. When sudden expenses hit—medical emergencies, taxi fare, grocery shortfalls—employees face stressful shortfalls.
              </p>
              <p className="text-[#4A5870] leading-relaxed font-semibold">
                This mismatch forces employees into costly cash advances or predatory mashonisas (unregistered money lenders) charging up to 30%-50% interest, leading to severe debt spirals.
              </p>

              {/* Comparative list */}
              <div className="grid gap-3 pt-4">
                <div className="flex gap-3 bg-white border border-slate-100 p-4 rounded-xl shadow-sm hover:border-[#00CFFF]/45 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 flex-none">
                    <span className="text-xs font-bold">VS</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">Traditional Cash-Advances & Loans</div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Micro-loans carry compound interest rates, legal admin costs, debt collection threats, and lower employee credit ratings.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 bg-white border border-slate-100 p-4 rounded-xl shadow-sm hover:border-[#3151B9]/30 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 flex-none">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0B2545] flex items-center gap-1.5">
                      The CZApay Daily Accrual Alternative
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Interest-free access to your already worked wages. Employees simply recoup a fraction of their salary for a small flat R35 fee.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Calendar Visualization (Right) */}
            <div className="lg:col-span-6">
              <div className="bg-[#0B2545] rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/5 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-r from-[#00CFFF]/20 to-transparent rounded-full blur-[40px] pointer-events-none" />
                
                <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-data tracking-widest text-white/50 uppercase">Salary Accrual Cycle</span>
                    <h3 className="text-lg font-bold font-display mt-0.5">Continuous July Cycle</h3>
                  </div>
                  <span className="bg-[#00CFFF]/15 border border-[#00CFFF]/30 text-[#00CFFF] font-data text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                    BCEA Compliant
                  </span>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2.5 text-center">
                  {/* Calendar headers */}
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => (
                    <span key={idx} className="text-[10px] font-bold text-white/40 font-data">{day}</span>
                  ))}
                  
                  {/* Calendar Days */}
                  {Array.from({ length: 30 }).map((_, idx) => {
                    const dayNum = idx + 1;
                    const isEarned = dayNum <= 15;
                    const isToday = dayNum === 15;
                    const isPayday = dayNum === 30;

                    return (
                      <div
                        key={idx}
                        className={`aspect-square flex flex-col justify-center items-center rounded-lg text-[10px] font-data font-semibold border transition-all ${
                          isPayday 
                            ? "bg-[#00CFFF] text-[#0B2545] border-[#00CFFF] font-extrabold shadow-[0_0_12px_rgba(0,207,255,0.6)]"
                            : isToday
                            ? "bg-[#3151B9] border-[#3151B9] text-white font-extrabold shadow-md"
                            : isEarned
                            ? "bg-[#00CFFF]/12 border-[#00CFFF]/30 text-[#00CFFF]"
                            : "bg-white/5 border-white/5 text-white/30"
                        }`}
                      >
                        <span>{dayNum}</span>
                        {isToday && <span className="text-[7px] text-[#00CFFF] font-bold leading-none mt-0.5">TODAY</span>}
                        {isPayday && <span className="text-[7px] text-[#0B2545] font-bold leading-none mt-0.5">PAY</span>}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex gap-4 text-[10px] text-white/60">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-[#00CFFF]/15 border border-[#00CFFF]/30" /> Worked & Accrued
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-[#3151B9]" /> Current Day (15th)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-[#00CFFF]" /> Payday
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section id="features" className="py-20 bg-white">
        <div className="container">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-data font-bold uppercase tracking-widest text-[#3151B9]">The CZApay Edge</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] mt-2 tracking-tight">
              Responsible Wages. Modern Execution.
            </h2>
            <p className="text-[#4A5870] mt-3">
              We design simple, high-security payroll bridges that connect earned hours directly to instant payouts, with zero employer friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-[#EAF4FF] text-[#3151B9] flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B2545] font-display">Real-Time Instant Clearing</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Money reflects in standard South African bank accounts instantly, 24/7. Enabled by robust EFT and SABRIC compliant settlement protocols.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-[#EAF4FF] text-[#3151B9] flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B2545] font-display">Zero Debt Risk & Compound Costs</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Unlike overdrafts, micro-loans, or pay loans, EWA involves no interest rates. There are no debt cycles, credit bureau updates, or collection fees.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-[#EAF4FF] text-[#3151B9] flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B2545] font-display">Zero Impact on Employer Capital</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                CZApay funds all middle-of-the-month withdrawals. Your company's corporate working capital remains completely untouched.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Embedded Interactive Playground section */}
      <EWAPlayground />

      {/* Wellness Advisor split block */}
      <section id="ai-wellness-section" className="py-20 bg-slate-100 border-b border-slate-200">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copy (Left) */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-brand/5 border border-indigo-brand/10 text-indigo-brand text-xs font-data font-semibold tracking-wider uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Financial Literacy companion
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
                Empower Employees With AI-Driven Financial Advice
              </h2>
              <p className="text-[#4A5870] leading-relaxed">
                CZApay is more than a payout gateway; we are committed to long-term financial health. The integrated CZApay Financial Wellness Coach uses Gemini AI to give immediate, supportive, localized financial coaching to South African employees.
              </p>
              
              <div className="space-y-3.5 text-slate-600 text-sm">
                <div className="flex gap-2.5 items-start">
                  <div className="w-5.5 h-5.5 bg-emerald-50 border border-emerald-100 rounded text-emerald-600 flex items-center justify-center flex-none">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Localized budgeting calculations adjusted to monthly net-take home.</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <div className="w-5.5 h-5.5 bg-emerald-50 border border-emerald-100 rounded text-emerald-600 flex items-center justify-center flex-none">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Explain legal salary deductions, SARS PAYE taxes, and labor act bounds.</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <div className="w-5.5 h-5.5 bg-emerald-50 border border-emerald-100 rounded text-emerald-600 flex items-center justify-center flex-none">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Practical guidelines to help transition from compound debt back to savings.</span>
                </div>
              </div>
            </div>

            {/* AI Advisor Chat (Right) */}
            <div className="lg:col-span-6">
              <AICoach />
            </div>

          </div>
        </div>
      </section>

      {/* Collapsible FAQ section */}
      <section id="faq-section" className="py-20 bg-white border-b border-slate-100">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-data font-bold uppercase tracking-widest text-[#3151B9] px-3 py-1 rounded-full bg-[#3151B9]/10">
              Clear & Transparent
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] mt-3 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-[#4A5870] mt-3 text-sm sm:text-base">
              Learn how CZApay provides safe, POPIA-compliant earned wage access with 0% interest rates and seamless employer systems.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white hover:shadow-sm"
                  id={`faq-item-${index}`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-display font-semibold text-[#0B2545] hover:bg-slate-50 transition-colors"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <span className="flex-none p-1.5 bg-slate-100 rounded-lg text-[#3151B9]">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[300px] border-t border-slate-100" : "max-h-0"
                    }`}
                  >
                    <div className="p-5 text-sm sm:text-base text-slate-600 leading-relaxed bg-slate-50/50">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 text-slate-600 py-12 text-sm border-t border-slate-200">
        <div className="container space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <CZApayLogo className="h-[54px]" />
            <div className="flex flex-wrap gap-6 text-xs text-slate-500 font-semibold">
              <button onClick={() => handleScrollToId("features")} className="hover:text-slate-800 transition-colors">How It Works</button>
              <button onClick={() => handleScrollToId("pain-point")} className="hover:text-slate-800 transition-colors">Why EWA?</button>
              <button onClick={() => handleScrollToId("ewa-playground")} className="hover:text-slate-800 transition-colors">Simulator</button>
              <button onClick={() => handleScrollToId("ai-wellness-section")} className="hover:text-slate-800 transition-colors">Wellness Coach</button>
              <button onClick={() => handleScrollToId("faq-section")} className="hover:text-slate-800 transition-colors">FAQs</button>
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>
              © 2026 CZApay (Pty) Ltd. All rights reserved. Registered South African financial wellness service.
            </p>
            <p className="font-data">
              POPIA, BCEA & SABRIC Security Compliant Payout System
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
