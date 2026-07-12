import React, { useState, useEffect } from "react";
import { EmployeeProfile, EWATransaction } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  DollarSign, Calendar, Landmark, CreditCard, ChevronRight, 
  CheckCircle, ArrowUpRight, TrendingUp, HelpCircle, Briefcase, 
  Clock, Shield, Info, ArrowRight, UserCheck
} from "lucide-react";

export default function EWAPlayground() {
  const [activeTab, setActiveTab] = useState<"employee" | "employer">("employee");

  // --- Employee Simulator States ---
  const [salary, setSalary] = useState<number>(18000);
  const [dayOfMonth, setDayOfMonth] = useState<number>(15);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(1500);
  const [withdrawalStep, setWithdrawalStep] = useState<"idle" | "processing" | "success">("idle");
  const [processingMessage, setProcessingMessage] = useState<string>("");
  const [smsNotification, setSmsNotification] = useState<string | null>(null);

  // Initial employee configuration
  const employee: EmployeeProfile = {
    name: "Sipho Khumalo",
    companyName: "South African Logistics Ltd",
    monthlySalary: salary,
    bankName: "Nedbank Ltd",
    accountEnding: "4812",
    daysInMonth: 30,
    currentDayOfMonth: dayOfMonth,
    maxAccessPercentage: 50,
    fixedWithdrawalFee: 35 // R35 flat fee
  };

  // Dynamic calculations
  const totalEarnedToDate = Math.round((salary / employee.daysInMonth) * dayOfMonth);
  const maxAccessLimit = Math.round(totalEarnedToDate * (employee.maxAccessPercentage / 100));

  const [transactions, setTransactions] = useState<EWATransaction[]>([
    {
      id: "ewa-1",
      amount: 1200,
      fee: 35,
      date: "04 July 2026",
      status: "completed",
      reference: "EWA-90124"
    },
    {
      id: "ewa-0",
      amount: 800,
      fee: 35,
      date: "28 June 2026",
      status: "deducted",
      reference: "EWA-89021"
    }
  ]);

  // Adjust withdraw amount if it exceeds the max allowed limit
  useEffect(() => {
    if (withdrawAmount > maxAccessLimit) {
      setWithdrawAmount(Math.max(100, maxAccessLimit));
    }
  }, [maxAccessLimit]);

  const triggerWithdrawal = () => {
    if (withdrawAmount < 100) return;
    setWithdrawalStep("processing");
    
    const steps = [
      "Connecting securely with South African Logistics Ltd payroll...",
      "Verifying active shifts and hours worked...",
      "Validating Nedbank EFT instant clearing details...",
      "Executing instant cash payout under BCEA guidelines..."
    ];

    let currentStep = 0;
    setProcessingMessage(steps[0]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setProcessingMessage(steps[currentStep]);
      } else {
        clearInterval(interval);
        // Completed
        const newRef = "EWA-" + Math.floor(10000 + Math.random() * 90000);
        const newTx: EWATransaction = {
          id: `ewa-${Date.now()}`,
          amount: withdrawAmount,
          fee: employee.fixedWithdrawalFee,
          date: `${dayOfMonth} July 2026`,
          status: "completed",
          reference: newRef
        };

        setTransactions([newTx, ...transactions]);
        setWithdrawalStep("success");
        setSmsNotification(
          `CZApay Alert: R${withdrawAmount.toLocaleString("en-ZA")} sent instantly to Nedbank account ending ${employee.accountEnding}. Transaction Fee: R35. Interest charged: R0. Ref: ${newRef}. Thank you for using CZApay!`
        );
      }
    }, 1100);
  };

  // --- Employer Simulator States ---
  const [empCount, setEmpCount] = useState<number>(120);
  const [avgSalary, setAvgSalary] = useState<number>(14500);
  const [turnoverRate, setTurnoverRate] = useState<number>(24); // 24% annual turnover

  // Employer benefits metrics calculations
  // Average replacement cost of an employee in SA is estimated around 4x monthly salary (recruiting, downtime, training)
  const replacementCostPerStaff = avgSalary * 3.5;
  const currentAnnualTurnoversCount = Math.round(empCount * (turnoverRate / 100));
  const currentTurnoverCost = currentAnnualTurnoversCount * replacementCostPerStaff;

  // EWA typically reduces staff turnover by up to 25%-30%
  const turnoverReductionPct = 28;
  const staffSaved = Math.round(currentAnnualTurnoversCount * (turnoverReductionPct / 100));
  const hiringSavings = Math.round(staffSaved * replacementCostPerStaff);

  // Productivity increase estimation: 10% reduction in financial-stress distraction hours
  const productivitySavings = Math.round(empCount * 12 * (avgSalary * 0.04));
  const totalEmployerSavings = hiringSavings + productivitySavings;

  return (
    <div id="ewa-playground" className="scroll-mt-24 py-16 bg-slate-50 border-y border-slate-200">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EAF4FF] border border-[#3151B9]/15 text-[#3151B9] text-xs font-data font-semibold tracking-wider uppercase mb-3">
            <span className="w-1.5 h-1.5 bg-[#3151B9] rounded-full"></span>
            Interactive Platform Playground
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B2545]">
            See Exactly How It Works
          </h2>
          <p className="text-[#4A5870] mt-3">
            Toggle between the Employee Portal and the Employer Calculator below to experience CZApay's instant liquidity system in real-time.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-200/60 p-1 rounded-2xl inline-flex shadow-sm border border-slate-200">
            <button
              onClick={() => {
                setActiveTab("employee");
                setWithdrawalStep("idle");
                setSmsNotification(null);
              }}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-display font-bold text-sm transition-all ${
                activeTab === "employee"
                  ? "bg-[#0B2545] text-white shadow-md"
                  : "text-slate-600 hover:text-[#0B2545] hover:bg-slate-300/40"
              }`}
            >
              <Landmark className="w-4 h-4" />
              Employee Portal Simulator
            </button>
            <button
              onClick={() => setActiveTab("employer")}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-display font-bold text-sm transition-all ${
                activeTab === "employer"
                  ? "bg-[#0B2545] text-white shadow-md"
                  : "text-slate-600 hover:text-[#0B2545] hover:bg-slate-300/40"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Employer Cost & Impact Calculator
            </button>
          </div>
        </div>

        {/* Tab Content container */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeTab === "employee" ? (
              <motion.div
                key="employee-sim"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.22, 0.8, 0.24, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                
                {/* Control Column (Left) */}
                <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0B2545] flex items-center gap-2">
                      <SlidersIcon className="w-5 h-5 text-[#3151B9]" />
                      Simulation Controls
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Adjust the sliders to see Sipho's live accrued earnings calculation update.
                    </p>
                  </div>

                  {/* Monthly Salary Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-slate-700">Monthly Net Salary</span>
                      <span className="font-data text-[#3151B9]">R{salary.toLocaleString("en-ZA")}</span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="45000"
                      step="500"
                      value={salary}
                      onChange={(e) => setSalary(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#3151B9]"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-data">
                      <span>R5 000</span>
                      <span>R25 000</span>
                      <span>R45 000</span>
                    </div>
                  </div>

                  {/* Day of the Month Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-slate-700">Current Day of the Month</span>
                      <span className="font-data text-[#3151B9] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Day {dayOfMonth} of 30
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                      value={dayOfMonth}
                      onChange={(e) => setDayOfMonth(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#3151B9]"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-data">
                      <span>Day 1</span>
                      <span>Day 15</span>
                      <span>Day 30 (Payday)</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <div className="bg-[#EAF4FF] border border-[#3151B9]/15 p-4 rounded-xl">
                      <h4 className="text-xs font-bold text-[#3151B9] tracking-wider uppercase flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5" /> Accrual Logic (BCEA Safe)
                      </h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        South African labor guidelines guarantee employees are paid for days already worked. Sipho earns <strong className="text-slate-800">R{(salary / 30).toFixed(0)}/day</strong>. Over {dayOfMonth} days, he has fully accrued <strong className="text-slate-800">R{totalEarnedToDate.toLocaleString("en-ZA")}</strong> in legal earnings.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl">
                      <h4 className="text-xs font-bold text-slate-700 tracking-wider uppercase flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-emerald-600" /> Safe-Buffer Guard
                      </h4>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        To prevent over-withdrawing, CZApay locks the maximum access to <strong className="text-slate-700">50%</strong> of earned wages. This guarantees Sipho leaves 50% for his primary payday packet.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Simulated Portal View (Right) */}
                <div className="lg:col-span-7 bg-[#0B2545] p-5 sm:p-8 rounded-2xl shadow-lift text-white relative overflow-hidden border border-white/5">
                  <div className="absolute inset-0 bg-radial-gradient(circle at 100% 0%, rgba(0, 207, 255, 0.12), transparent 70%) pointer-events-none" />
                  
                  {/* Top Bar */}
                  <div className="flex justify-between items-center border-b border-white/10 pb-5 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center font-display font-bold text-white text-sm shadow-inner">
                        SK
                      </div>
                      <div>
                        <div className="font-display font-bold text-sm tracking-tight">{employee.name}</div>
                        <div className="text-[10px] text-white/55 font-data tracking-wide">{employee.companyName}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-[#00CFFF] font-data uppercase tracking-wider">Employee Portal</div>
                      <div className="text-xs text-white/70 mt-0.5 font-semibold">Active Integration</div>
                    </div>
                  </div>

                  {withdrawalStep === "idle" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      {/* Dashboard Balances */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow-sm">
                          <span className="text-[10px] text-white/50 uppercase tracking-widest font-data">Accrued Salary</span>
                          <div className="text-xl sm:text-2xl font-data font-semibold text-white mt-1">
                            R{totalEarnedToDate.toLocaleString("en-ZA")}
                          </div>
                          <span className="text-[10px] text-white/40 block mt-1">{dayOfMonth} days worked</span>
                        </div>
                        <div className="bg-white/5 border border-[#00CFFF]/25 rounded-xl p-4 shadow-sm relative">
                          <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#00CFFF] rounded-full dot-live-glow" />
                          <span className="text-[10px] text-[#00CFFF] uppercase tracking-widest font-data">Available Now</span>
                          <div className="text-xl sm:text-2xl font-data font-semibold text-[#00CFFF] mt-1">
                            R{maxAccessLimit.toLocaleString("en-ZA")}
                          </div>
                          <span className="text-[10px] text-[#00CFFF]/60 block mt-1">50% security cap</span>
                        </div>
                      </div>

                      {/* Cashout Configurator */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-display font-bold text-sm">Select Amount to Cash Out</h4>
                          <span className="bg-[#00CFFF]/15 border border-[#00CFFF]/30 text-[#00CFFF] font-data text-xs px-2 py-0.5 rounded-lg font-bold">
                            R{withdrawAmount.toLocaleString("en-ZA")}
                          </span>
                        </div>

                        {maxAccessLimit < 100 ? (
                          <div className="text-center py-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-xs">
                            ⚠️ Insufficient accrued wages. You need to work at least R100 worth of hours to cash out. Raise "Current Day" slider on the left to earn wages!
                          </div>
                        ) : (
                          <>
                            <input
                              type="range"
                              min="100"
                              max={maxAccessLimit}
                              step="50"
                              value={withdrawAmount}
                              onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00CFFF]"
                            />
                            <div className="flex justify-between text-[10px] text-white/40 font-data">
                              <span>Min: R100</span>
                              <span>Max: R{maxAccessLimit.toLocaleString("en-ZA")}</span>
                            </div>
                          </>
                        )}

                        {/* Breakdown block */}
                        <div className="border-t border-white/10 pt-4 space-y-2 text-xs">
                          <div className="flex justify-between text-white/75">
                            <span>Requested Funds</span>
                            <span className="font-data">R{withdrawAmount.toLocaleString("en-ZA")}</span>
                          </div>
                          <div className="flex justify-between text-white/75 items-center">
                            <span className="flex items-center gap-1">
                              Fixed Transfer Fee
                              <div className="relative group">
                                <HelpCircle className="w-3.5 h-3.5 text-white/40 cursor-help" />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-slate-800 text-white text-[9px] p-2 rounded shadow-lg w-44 z-50">
                                  A flat cost-recovery fee covers EFT Instant Clearing rails. It is NOT interest.
                                </div>
                              </div>
                            </span>
                            <span className="font-data text-[#00CFFF]">R{employee.fixedWithdrawalFee.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-white/75">
                            <span>Interest Rate</span>
                            <span className="font-data text-emerald-400 font-bold">0.00%</span>
                          </div>
                          <div className="border-t border-white/5 pt-2 flex justify-between text-sm font-bold text-white">
                            <span>Month-End Payday Deduction</span>
                            <span className="font-data text-[#00CFFF]">
                              R{(withdrawAmount + employee.fixedWithdrawalFee).toLocaleString("en-ZA")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Primary Withdrawal CTA */}
                      <button
                        onClick={triggerWithdrawal}
                        disabled={maxAccessLimit < 100}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00CFFF] to-[#3151B9] hover:brightness-110 active:scale-[0.99] transition-all text-white font-display font-bold text-base shadow-lg shadow-[#00CFFF]/15 flex items-center justify-center gap-2 disabled:opacity-40"
                      >
                        <ArrowUpRight className="w-5 h-5 text-white" />
                        Access Accrued Wages Instantly
                      </button>

                      {/* Simulated Bank specs */}
                      <div className="flex justify-center items-center gap-6 text-[10px] text-white/40 border-t border-white/10 pt-4">
                        <span className="flex items-center gap-1.5">
                          <Landmark className="w-3 h-3" /> {employee.bankName} Account (*{employee.accountEnding})
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Shield className="w-3 h-3 text-emerald-400" /> SECURE SABRIC COMPLIANT
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Processing view */}
                  {withdrawalStep === "processing" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-16 text-center space-y-6"
                    >
                      <div className="w-16 h-16 rounded-full border-4 border-[#00CFFF]/20 border-t-[#00CFFF] animate-spin" />
                      <div className="space-y-2">
                        <h4 className="font-display font-bold text-lg">Transferring Your Funds</h4>
                        <p className="text-sm font-data text-[#00CFFF] max-w-md mx-auto h-12">
                          {processingMessage}
                        </p>
                      </div>
                      <span className="text-[10px] text-white/40 font-data tracking-widest uppercase">
                        Real-time SA Clearing House Rails (EFT Instant)
                      </span>
                    </motion.div>
                  )}

                  {/* Success view with SMS popup */}
                  {withdrawalStep === "success" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                        <CheckCircle className="w-10 h-10" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-display font-bold text-2xl text-emerald-400">Transaction Successful!</h4>
                        <p className="text-slate-300 text-sm max-w-md mx-auto">
                          R{withdrawAmount.toLocaleString("en-ZA")} has been dispatched via EFT Instant Clearing to Nedbank ending in {employee.accountEnding}. The money will reflect immediately.
                        </p>
                      </div>

                      {/* Simulated SMS Notification */}
                      {smsNotification && (
                        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-left font-sans text-xs text-slate-300 shadow-xl max-w-sm mx-auto relative">
                          <div className="absolute top-2 right-2 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                            <span className="text-[9px] text-slate-500">NOW</span>
                          </div>
                          <div className="font-semibold text-white text-[10px] uppercase font-data text-[#00CFFF] mb-1">
                            💬 MESSAGES • CZApay
                          </div>
                          <p className="leading-relaxed">
                            {smsNotification}
                          </p>
                        </div>
                      )}

                      <button
                        onClick={() => {
                          setWithdrawalStep("idle");
                          setSmsNotification(null);
                        }}
                        className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-display font-bold transition-colors inline-flex items-center gap-2"
                      >
                        <ArrowRight className="w-4 h-4" /> Reset Portal Simulator
                      </button>
                    </motion.div>
                  )}

                  {/* Historic Transactions Module */}
                  <div className="mt-8 border-t border-white/10 pt-6">
                    <h5 className="text-xs font-bold text-white/50 tracking-wider uppercase font-data mb-4">
                      Sipho's Transaction History
                    </h5>
                    <div className="space-y-2">
                      {transactions.map((tx) => (
                        <div
                          key={tx.id}
                          className="flex justify-between items-center bg-white/5 border border-white/5 rounded-xl p-3 text-xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold">
                              R
                            </div>
                            <div>
                              <div className="font-bold">EWA Withdrawal</div>
                              <div className="text-[10px] text-white/40">{tx.date} • Ref: {tx.reference}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-data font-semibold text-[#00CFFF]">
                              R{tx.amount.toLocaleString("en-ZA")}
                            </div>
                            <div className="text-[9px] mt-0.5">
                              {tx.status === "completed" && (
                                <span className="text-emerald-400 font-bold bg-emerald-400/10 px-1.5 py-0.5 rounded-md">
                                  Cleared
                                </span>
                              )}
                              {tx.status === "deducted" && (
                                <span className="text-slate-400 font-bold bg-white/10 px-1.5 py-0.5 rounded-md">
                                  Settled at Payday
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </motion.div>
            ) : (
              <motion.div
                key="employer-sim"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.22, 0.8, 0.24, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Sliders Control Column */}
                <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0B2545] flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-[#3151B9]" />
                      Company Workforce Data
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Configure your company profile to calculate estimated productivity gains and recruitment savings.
                    </p>
                  </div>

                  {/* Employees Count Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-slate-700">Total Employees</span>
                      <span className="font-data text-[#3151B9]">{empCount} staff members</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="1500"
                      step="10"
                      value={empCount}
                      onChange={(e) => setEmpCount(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#3151B9]"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-data">
                      <span>10</span>
                      <span>750</span>
                      <span>1 500+</span>
                    </div>
                  </div>

                  {/* Average Monthly Salary */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-slate-700">Average Net Salary</span>
                      <span className="font-data text-[#3151B9]">R{avgSalary.toLocaleString("en-ZA")}</span>
                    </div>
                    <input
                      type="range"
                      min="6000"
                      max="55000"
                      step="500"
                      value={avgSalary}
                      onChange={(e) => setAvgSalary(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#3151B9]"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-data">
                      <span>R6 000</span>
                      <span>R30 000</span>
                      <span>R55 000</span>
                    </div>
                  </div>

                  {/* Current Turnover Rate */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-slate-700">Annual Staff Turnover (Attrition)</span>
                      <span className="font-data text-[#3151B9] text-red-500">{turnoverRate}% / year</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      step="1"
                      value={turnoverRate}
                      onChange={(e) => setTurnoverRate(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-red-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-data">
                      <span>5% (Low)</span>
                      <span>30%</span>
                      <span>60% (High)</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-3.5 text-xs text-slate-600">
                    <div className="flex gap-2.5 items-start">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-none mt-0.5" />
                      <div>
                        <strong className="text-slate-800">No working capital drain:</strong> CZApay carries the full cashflow advance. The employer pays absolutely nothing during the month and simply settles via a single file sync at normal payday.
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-none mt-0.5" />
                      <div>
                        <strong className="text-slate-800">Seamless SDK sync:</strong> Integrates natively with standard South African payroll systems like Sage, VIP, Pastel, and BambooHR.
                      </div>
                    </div>
                  </div>

                </div>

                {/* ROI Calculation Outputs (Right) */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Big Benefit Box */}
                  <div className="bg-[#0B2545] text-white p-6 sm:p-8 rounded-2xl shadow-lift border border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-radial-gradient(circle at 100% 100%, rgba(49, 81, 185, 0.25), transparent 70%) pointer-events-none" />
                    <span className="text-[10px] text-[#00CFFF] font-data uppercase tracking-wider">Estimated Annual Financial Impact</span>
                    
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-6">
                      <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
                        R{totalEmployerSavings.toLocaleString("en-ZA")}
                      </div>
                      <div className="text-xs text-[#00CFFF] font-semibold flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" /> Estimated ROI of ~22x Implementation Time
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 text-sm">
                      <div className="space-y-1">
                        <span className="text-white/50 text-xs block font-data uppercase">Staff Attrition Savings</span>
                        <div className="text-xl font-bold font-display text-emerald-400">
                          R{hiringSavings.toLocaleString("en-ZA")}
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed">
                          By reducing financial emergency stress, CZApay is proven to prevent staff departures, saving your HR team the cost of replacing <strong className="text-white">{staffSaved}</strong> staff members annually.
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-white/50 text-xs block font-data uppercase">Productivity Recovery</span>
                        <div className="text-xl font-bold font-display text-emerald-400">
                          R{productivitySavings.toLocaleString("en-ZA")}
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed">
                          Over 3 hours/week are wasted by employees dealing with creditors at work. Recovering that focused time yields an estimated <strong className="text-white">R{(productivitySavings/empCount/12).toFixed(0)}/worker/month</strong> in output value.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Impact Summary Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-center">
                      <Clock className="w-8 h-8 text-[#3151B9] mx-auto mb-2" />
                      <div className="text-xs text-slate-500 font-bold uppercase font-data">Employer Cost</div>
                      <div className="text-xl font-extrabold text-[#0B2545] mt-1">R0.00 Flat</div>
                      <div className="text-[10px] text-slate-400 mt-1">Always free for employers</div>
                    </div>

                    <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-center">
                      <UserCheck className="w-8 h-8 text-[#3151B9] mx-auto mb-2" />
                      <div className="text-xs text-slate-500 font-bold uppercase font-data">Cashflow Impact</div>
                      <div className="text-xl font-extrabold text-emerald-600 mt-1">0% Change</div>
                      <div className="text-[10px] text-slate-400 mt-1">CZApay funds advances</div>
                    </div>

                    <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-center">
                      <Shield className="w-8 h-8 text-[#3151B9] mx-auto mb-2" />
                      <div className="text-xs text-slate-500 font-bold uppercase font-data">Staff Stress Drop</div>
                      <div className="text-xl font-extrabold text-emerald-600 mt-1">-88% Lower</div>
                      <div className="text-[10px] text-slate-400 mt-1">SABRIC secure, no debt</div>
                    </div>
                  </div>

                  {/* Lead Gen Box */}
                  <div className="bg-white border border-indigo-brand/10 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-1 text-center sm:text-left">
                      <h4 className="font-display font-bold text-base text-[#0B2545]">Ready to integrate CZApay?</h4>
                      <p className="text-xs text-slate-500">
                        Get set up in less than 24 hours with Sage, VIP, or Pastel. Schedule a 10-minute briefing.
                      </p>
                    </div>
                    <button
                      onClick={() => alert("Thank you! A CZApay Enterprise Integrations partner will reach out to you shortly via email.")}
                      className="px-6 py-3 text-sm font-display font-bold rounded-xl bg-[#0B2545] hover:bg-[#1B3A63] text-[#00CFFF] transition-all flex items-center gap-2 whitespace-nowrap self-stretch sm:self-auto justify-center"
                    >
                      Book Free Integration Call
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

// Icon helpers to prevent dependencies errors
function SlidersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x1_="" y1="21" y2="14" />
      <line x1="4" x1_="" y1="10" y2="3" />
      <line x1="12" x1_="" y1="21" y2="12" />
      <line x1="12" x1_="" y1="8" y2="3" />
      <line x1="20" x1_="" y1="21" y2="16" />
      <line x1="20" x1_="" y1="12" y2="3" />
      <line x1="2" x1_="" y1="14" y2="14" />
      <line x1="10" x1_="" y1="8" y2="8" />
      <line x1="18" x1_="" y1="16" y2="16" />
    </svg>
  );
}
