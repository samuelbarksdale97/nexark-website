"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Sparkles
} from "lucide-react";
import Link from "next/link";

interface ROICalculatorProps {
  embedded?: boolean;
}

interface FormData {
  name: string;
  role: string;
  company: string;
  employees: string;
  processes: string[];
  hoursPerWeek: string;
  hourlyCost: string;
}

interface ROIResults {
  weeklyHoursSaved: number;
  yearlyHoursSaved: number;
  yearlyCostSavings: number;
}

const processOptions = [
  "Lead management & follow-ups",
  "Email marketing",
  "Data entry into CRM",
  "Invoice generation & billing",
  "Order processing",
  "Social media posting",
  "Report creation",
  "Customer onboarding",
];

const employeeOptions = [
  { label: "1-5 employees", value: "3" },
  { label: "6-15 employees", value: "10" },
  { label: "16-50 employees", value: "33" },
  { label: "51-100 employees", value: "75" },
  { label: "100+ employees", value: "150" },
];

const hoursOptions = [
  { label: "1-5 hours", value: "3" },
  { label: "6-10 hours", value: "8" },
  { label: "11-20 hours", value: "15" },
  { label: "21-30 hours", value: "25" },
  { label: "30+ hours", value: "35" },
];

export function ROICalculator({ embedded = false }: ROICalculatorProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [step, setStep] = useState(1);
  const [roiResults, setRoiResults] = useState<ROIResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    role: "",
    company: "",
    employees: "",
    processes: [],
    hoursPerWeek: "",
    hourlyCost: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const toggleProcess = (process: string) => {
    setFormData((prev) => {
      const processes = prev.processes.includes(process)
        ? prev.processes.filter((p) => p !== process)
        : [...prev.processes, process];
      return { ...prev, processes };
    });
    if (errors.processes) {
      setErrors((prev) => ({ ...prev, processes: "" }));
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.role.trim()) newErrors.role = "Role is required";
      if (!formData.company.trim()) newErrors.company = "Company name is required";
    } else if (step === 2) {
      if (!formData.employees) newErrors.employees = "Please select number of employees";
    } else if (step === 3) {
      if (!formData.processes || formData.processes.length === 0) newErrors.processes = "Please select at least one process";
    } else if (step === 4) {
      if (!formData.hoursPerWeek) newErrors.hoursPerWeek = "Please select hours per week";
    } else if (step === 5) {
      if (!formData.hourlyCost || Number(formData.hourlyCost) <= 0) newErrors.hourlyCost = "Please enter a valid hourly cost";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateROI = (): ROIResults => {
    const hoursPerWeek = Number(formData.hoursPerWeek);
    const hourlyCost = Number(formData.hourlyCost);
    const weeklyHoursSaved = hoursPerWeek * 0.5;
    const yearlyCostSavings = weeklyHoursSaved * hourlyCost * 52;
    const yearlyHoursSaved = weeklyHoursSaved * 52;

    return {
      weeklyHoursSaved: Math.round(weeklyHoursSaved),
      yearlyHoursSaved: Math.round(yearlyHoursSaved),
      yearlyCostSavings: Math.round(yearlyCostSavings),
    };
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step === 5) {
        const results = calculateROI();
        setRoiResults(results);
        setShowResults(true);
      } else if (step < 5) {
        setStep(step + 1);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetForm = () => {
    setShowResults(false);
    setStep(1);
    setFormData({
      name: "",
      role: "",
      company: "",
      employees: "",
      processes: [],
      hoursPerWeek: "",
      hourlyCost: "",
    });
  };

  // Results View
  if (showResults && roiResults) {
    return (
      <section id="calculator" className="py-16 md:py-24 bg-navy relative overflow-hidden">
        {/* Subtle gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full opacity-15 pointer-events-none bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,transparent_70%)]" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-navy-light/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12"
            >
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-medium text-indigo-300">Your Results</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {formData.name}, Here&apos;s Your ROI Potential
                </h2>
                <p className="text-slate-400 text-lg">Personalized results for {formData.company}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-navy/60 border border-white/5 rounded-xl p-6 text-center group hover:border-indigo-500/30 transition-all"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{roiResults.weeklyHoursSaved}</div>
                  <p className="text-slate-400 text-sm">Hours/Week Saved</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-navy/60 border border-white/5 rounded-xl p-6 text-center group hover:border-purple-500/30 transition-all"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-purple-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{roiResults.yearlyHoursSaved.toLocaleString()}</div>
                  <p className="text-slate-400 text-sm">Hours/Year Reclaimed</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl p-6 text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 mb-2">
                    ${roiResults.yearlyCostSavings.toLocaleString()}
                  </div>
                  <p className="text-slate-300 text-sm">Potential Annual Savings</p>
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={resetForm}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-white/10 rounded-lg text-slate-300 hover:text-white hover:border-white/20 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Start Over
                </button>
                {!embedded && (
                  <Link href="/automation-opportunity-form">
                    <button className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-navy font-semibold rounded-lg hover:bg-slate-100 transition-all shadow-lg shadow-white/10 cursor-pointer">
                      Continue to Automation Matrix
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                )}
                {embedded && (
                  <button
                    onClick={() => {
                      const formElement = document.getElementById('automation-form');
                      if (formElement) {
                        formElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-navy font-semibold rounded-lg hover:bg-slate-100 transition-all shadow-lg shadow-white/10 cursor-pointer"
                  >
                    Continue to Task Builder
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="calculator" className="py-16 md:py-24 bg-navy relative overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-navy-light/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            {/* Collapsible Header */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full p-6 md:p-8 flex items-center justify-between text-left group cursor-pointer"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    Calculate Your ROI Potential
                  </h2>
                </div>
                <p className="text-slate-400 text-sm ml-[52px]">
                  See how much time and money automation could save your business
                </p>
              </div>
              <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-slate-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-8">
                    {/* Progress Bar */}
                    <div className="mb-8">
                      <div className="h-1.5 bg-navy rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <div className="flex justify-between mt-3 text-xs text-slate-500">
                        <span>Step {step} of 5</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                    </div>

                    {/* Form Steps */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {step === 1 && (
                          <div className="space-y-5">
                            <div>
                              <label className="text-white mb-2 block text-sm font-medium">What&apos;s your name?</label>
                              <input
                                value={formData.name}
                                onChange={(e) => updateField("name", e.target.value)}
                                placeholder="John Doe"
                                className="w-full bg-navy border border-white/10 text-white placeholder:text-slate-500 h-12 px-4 rounded-lg focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all cursor-text"
                              />
                              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                            </div>
                            <div>
                              <label className="text-white mb-2 block text-sm font-medium">What&apos;s your role?</label>
                              <input
                                value={formData.role}
                                onChange={(e) => updateField("role", e.target.value)}
                                placeholder="CEO, Operations Manager, etc."
                                className="w-full bg-navy border border-white/10 text-white placeholder:text-slate-500 h-12 px-4 rounded-lg focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all cursor-text"
                              />
                              {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role}</p>}
                            </div>
                            <div>
                              <label className="text-white mb-2 block text-sm font-medium">Company name</label>
                              <input
                                value={formData.company}
                                onChange={(e) => updateField("company", e.target.value)}
                                placeholder="Your Company Inc."
                                className="w-full bg-navy border border-white/10 text-white placeholder:text-slate-500 h-12 px-4 rounded-lg focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all cursor-text"
                              />
                              {errors.company && <p className="text-red-400 text-sm mt-1">{errors.company}</p>}
                            </div>
                            <p className="text-slate-500 text-sm pt-2">
                              We&apos;ll use this to personalize your Automation Opportunity Matrix™.
                            </p>
                          </div>
                        )}

                        {step === 2 && (
                          <div className="space-y-4">
                            <label className="text-white text-lg font-semibold mb-6 block">
                              How many employees do you have?
                            </label>
                            <div className="space-y-3">
                              {employeeOptions.map((option) => (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => updateField("employees", option.value)}
                                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${
                                    formData.employees === option.value
                                      ? "border-indigo-500/50 bg-indigo-500/10 text-white"
                                      : "border-white/10 bg-navy/50 text-slate-300 hover:border-white/20 hover:bg-navy"
                                  }`}
                                >
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                    formData.employees === option.value
                                      ? "border-indigo-500 bg-indigo-500"
                                      : "border-slate-600"
                                  }`}>
                                    {formData.employees === option.value && (
                                      <Check className="w-3 h-3 text-white" />
                                    )}
                                  </div>
                                  {option.label}
                                </button>
                              ))}
                            </div>
                            {errors.employees && <p className="text-red-400 text-sm mt-1">{errors.employees}</p>}
                          </div>
                        )}

                        {step === 3 && (
                          <div className="space-y-4">
                            <label className="text-white text-lg font-semibold mb-2 block">
                              Which processes take the most time?
                            </label>
                            <p className="text-slate-500 text-sm mb-6">
                              Select all that apply
                            </p>
                            <div className="grid md:grid-cols-2 gap-3">
                              {processOptions.map((process) => (
                                <button
                                  key={process}
                                  type="button"
                                  onClick={() => toggleProcess(process)}
                                  className={`text-left px-5 py-4 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${
                                    formData.processes.includes(process)
                                      ? "border-indigo-500/50 bg-indigo-500/10 text-white"
                                      : "border-white/10 bg-navy/50 text-slate-300 hover:border-white/20 hover:bg-navy"
                                  }`}
                                >
                                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                    formData.processes.includes(process)
                                      ? "border-indigo-500 bg-indigo-500"
                                      : "border-slate-600"
                                  }`}>
                                    {formData.processes.includes(process) && (
                                      <Check className="w-3 h-3 text-white" />
                                    )}
                                  </div>
                                  <span className="text-sm">{process}</span>
                                </button>
                              ))}
                            </div>
                            {errors.processes && <p className="text-red-400 text-sm mt-1">{errors.processes}</p>}
                          </div>
                        )}

                        {step === 4 && (
                          <div className="space-y-4">
                            <label className="text-white text-lg font-semibold mb-6 block">
                              How many hours per week do you spend on these tasks?
                            </label>
                            <div className="space-y-3">
                              {hoursOptions.map((option) => (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => updateField("hoursPerWeek", option.value)}
                                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${
                                    formData.hoursPerWeek === option.value
                                      ? "border-indigo-500/50 bg-indigo-500/10 text-white"
                                      : "border-white/10 bg-navy/50 text-slate-300 hover:border-white/20 hover:bg-navy"
                                  }`}
                                >
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                    formData.hoursPerWeek === option.value
                                      ? "border-indigo-500 bg-indigo-500"
                                      : "border-slate-600"
                                  }`}>
                                    {formData.hoursPerWeek === option.value && (
                                      <Check className="w-3 h-3 text-white" />
                                    )}
                                  </div>
                                  {option.label}
                                </button>
                              ))}
                            </div>
                            {errors.hoursPerWeek && <p className="text-red-400 text-sm mt-1">{errors.hoursPerWeek}</p>}
                          </div>
                        )}

                        {step === 5 && (
                          <div className="space-y-4">
                            <label className="text-white text-lg font-semibold mb-2 block">
                              What&apos;s your average hourly cost per employee?
                            </label>
                            <p className="text-slate-500 text-sm mb-6">
                              Include salary + benefits (typically 1.25-1.4x base salary)
                            </p>
                            <div className="flex gap-3">
                              <div className="bg-navy border border-white/10 rounded-lg px-4 h-12 flex items-center">
                                <span className="text-indigo-400 font-semibold text-lg">$</span>
                              </div>
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={formData.hourlyCost}
                                onChange={(e) => updateField("hourlyCost", e.target.value)}
                                placeholder="75"
                                className="flex-1 bg-navy border border-white/10 text-white placeholder:text-slate-500 h-12 px-4 rounded-lg focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all cursor-text"
                              />
                            </div>
                            {errors.hourlyCost && <p className="text-red-400 text-sm mt-1">{errors.hourlyCost}</p>}
                            <p className="text-slate-500 text-sm pt-2">
                              Hint: Average salary ÷ 2,080 hours = hourly cost (USD)
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-10 gap-4">
                      {step > 1 ? (
                        <button
                          onClick={handleBack}
                          className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                      ) : (
                        <div />
                      )}

                      <button
                        onClick={handleNext}
                        className="flex items-center gap-2 px-8 py-3 bg-white text-navy font-semibold rounded-lg hover:bg-slate-100 transition-all shadow-lg shadow-white/10 cursor-pointer"
                      >
                        {step === 5 ? "Calculate My ROI" : "Continue"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
