export interface EmployeeProfile {
  name: string;
  companyName: string;
  monthlySalary: number;
  bankName: string;
  accountEnding: string;
  daysInMonth: number;
  currentDayOfMonth: number;
  maxAccessPercentage: number; // usually 50%
  fixedWithdrawalFee: number; // usually R35 in SA
}

export interface EWATransaction {
  id: string;
  amount: number;
  fee: number;
  date: string;
  status: "pending" | "completed" | "deducted";
  reference: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface EmployerCalculationInput {
  employeeCount: number;
  averageSalary: number;
  annualEmployeeTurnoverRate: number; // e.g. 15%
}

export interface EmployerCalculationResult {
  savingsFromRetention: number;
  savingsFromProductivity: number;
  totalAnnualBenefit: number;
}
