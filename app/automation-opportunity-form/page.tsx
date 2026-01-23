"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  Info, 
  Download, 
  TrendingUp, 
  Clock, 
  Zap,
  X,
  Plus,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { ROICalculator } from "@/components/sections/ROICalculator";
import Link from "next/link";

interface TaskAnalysis {
  impactSummary: string;
  effortSummary: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  estimatedTime: string;
}

interface Task {
  id: string;
  name: string;
  category: string;
  impact: number;
  effort: number;
  score: number;
  description?: string;
  analysis?: TaskAnalysis;
}

const categories = [
  "Client Onboarding",
  "Sales & Leads",
  "Admin & Operations",
  "Marketing",
  "Finance & Invoicing",
  "Customer Service",
  "HR & Recruiting",
  "Other",
];

const templates = [
  { name: "Auto-send welcome email after payment", category: "Client Onboarding", impact: 5, effort: 1 },
  { name: "Create client folder automatically", category: "Client Onboarding", impact: 4, effort: 2 },
  { name: "Auto-tag new leads in CRM", category: "Sales & Leads", impact: 5, effort: 1 },
  { name: "Trigger follow-up email sequences", category: "Sales & Leads", impact: 4, effort: 2 },
  { name: "Auto-generate weekly reports", category: "Admin & Operations", impact: 5, effort: 2 },
  { name: "Auto-create invoices", category: "Admin & Operations", impact: 4, effort: 1 },
  { name: "Auto-post to social platforms", category: "Marketing", impact: 3, effort: 2 },
  { name: "Add subscribers to segmented lists", category: "Marketing", impact: 4, effort: 1 },
];

export default function AutomationOpportunityForm() {
  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [impact, setImpact] = useState(3);
  const [effort, setEffort] = useState(3);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [analysis, setAnalysis] = useState<TaskAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Analyze task with Gemini 2.5 Pro when description is filled
  useEffect(() => {
    if (!description.trim() || !taskName.trim()) {
      setAnalysis(null);
      return;
    }

    const analyzeTask = async () => {
      setIsAnalyzing(true);
      try {
        const response = await fetch("/api/analyze-task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            taskName: taskName, 
            description: description,
            category: category || "General" 
          }),
        });

        if (!response.ok) throw new Error("Analysis failed");

        const data = await response.json();
        setAnalysis(data.analysis);

        // Auto-calculate impact and effort based on AI difficulty assessment
        if (data.analysis.difficulty === "Easy") {
          setEffort(1);
        } else if (data.analysis.difficulty === "Moderate") {
          setEffort(3);
        } else if (data.analysis.difficulty === "Hard") {
          setEffort(5);
        }
      } catch (error) {
        console.error("Error analyzing task:", error);
        // Set default analysis on error
        setAnalysis({
          impactSummary: "This task could streamline your workflow and save valuable time.",
          effortSummary: "Implementation complexity depends on your current systems.",
          difficulty: "Moderate",
          estimatedTime: "1-2 weeks",
        });
      } finally {
        setIsAnalyzing(false);
      }
    };

    const debounceTimer = setTimeout(analyzeTask, 1000);
    return () => clearTimeout(debounceTimer);
  }, [description, taskName, category]);

  const calculateScore = (impact: number, effort: number) => {
    // Higher impact and lower effort = better score
    return impact + (6 - effort);
  };

  const addTask = () => {
    if (!taskName.trim() || !category) return;

    const newTask: Task = {
      id: Date.now().toString(),
      name: taskName,
      category,
      impact,
      effort,
      score: calculateScore(impact, effort),
      description: description.trim() || undefined,
      analysis: analysis || undefined,
    };

    setTasks([...tasks, newTask]);
    setTaskName("");
    setCategory("");
    setDescription("");
    setImpact(3);
    setEffort(3);
    setAnalysis(null);
  };

  const addTemplateTask = (template: typeof templates[0]) => {
    const newTask: Task = {
      id: Date.now().toString(),
      name: template.name,
      category: template.category,
      impact: template.impact,
      effort: template.effort,
      score: calculateScore(template.impact, template.effort),
    };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const topTasks = [...tasks].sort((a, b) => b.score - a.score).slice(0, 10);
  const totalTimeSaved = tasks.length * 4.3; // Rough estimate

  const handleSendRoadmap = async () => {
    if (tasks.length === 0) {
      alert("Please add at least one task before requesting your roadmap");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    setIsSending(true);
    
    // Simulate brief loading then show results
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsDialogOpen(false);
    setShowResults(true);
    setIsSending(false);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-navy pt-24 pb-16">
        <div className="container px-4 max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link href="/">
              <Button variant="ghost" className="mb-6 hover:bg-white/5 text-slate-300">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>

            <div className="text-center mb-8">
              <p className="text-indigo-400 text-sm font-bold mb-4 tracking-wider uppercase">
                Free Interactive Tool
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                The Automation Opportunity Matrix<sup className="text-xl md:text-2xl">™</sup>
              </h1>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Find Your Top 10 Automation Quick Wins in 5 Minutes
              </p>
            </div>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-navy-light/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-indigo-500/30 transition-all cursor-default">
                <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  1
                </div>
                <h3 className="text-xl font-bold text-white mb-3">List Your Tasks</h3>
                <p className="text-slate-400">Add repetitive workflows you want to automate</p>
              </div>
              <div className="bg-navy-light/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-indigo-500/30 transition-all cursor-default">
                <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  2
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Score Impact & Effort</h3>
                <p className="text-slate-400">Rate how valuable and how difficult each is</p>
              </div>
              <div className="bg-navy-light/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-indigo-500/30 transition-all cursor-default">
                <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  3
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Get Your Roadmap</h3>
                <p className="text-slate-400">See your top 10 automation priorities instantly</p>
              </div>
            </div>
          </motion.div>

          {/* ROI Calculator Section */}
          <ROICalculator embedded={true} />

          {/* Main Form */}
          <motion.div
            id="automation-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <div className="bg-navy-light/50 backdrop-blur-sm border border-white/10 rounded-2xl">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Add Your Tasks</h3>
                
                <div className="grid gap-6">
                  {/* Task Name */}
                  <div>
                    <label className="text-white mb-2 block text-sm font-medium">Task Name *</label>
                    <input
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                      placeholder="e.g., Send welcome emails to new clients"
                      className="w-full bg-navy border border-white/10 text-white placeholder:text-slate-500 h-12 px-4 rounded-lg focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all cursor-text"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="text-white mb-2 block text-sm font-medium">Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-navy border border-white/10 text-white h-12 px-4 rounded-lg focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all cursor-pointer"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-white mb-2 block text-sm font-medium">Description (for AI analysis)</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the task in detail for better AI analysis..."
                      rows={3}
                      className="w-full bg-navy border border-white/10 text-white placeholder:text-slate-500 px-4 py-3 rounded-lg focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none cursor-text"
                    />
                  </div>

                  {/* AI Analysis */}
                  {(description.trim() || isAnalyzing) && (
                    <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-indigo-400" />
                        <span className="text-indigo-400 font-medium text-sm">AI Analysis (Gemini 2.5 Pro)</span>
                      </div>
                      {isAnalyzing ? (
                        <div className="text-center py-4">
                          <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-indigo-500 border-t-transparent mb-2"></div>
                          <p className="text-xs text-slate-400">Analyzing...</p>
                        </div>
                      ) : analysis ? (
                        <p className="text-sm text-slate-300 leading-relaxed">
                          <span className="font-semibold">Impact:</span> {analysis.impactSummary.split('.')[0]}. <span className="font-semibold">Effort:</span> {analysis.effortSummary.split('.')[0]}.
                        </p>
                      ) : (
                        <p className="text-xs text-slate-500">
                          Enter task details to see AI summary
                        </p>
                      )}
                    </div>
                  )}

                  {/* Impact & Effort Sliders */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-white mb-3 block text-sm font-medium">
                        Impact (1 = Low, 5 = High): <span className="text-indigo-400">{impact}</span>
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        value={impact}
                        onChange={(e) => setImpact(Number(e.target.value))}
                        className="w-full h-1.5 bg-navy rounded-full appearance-none cursor-pointer accent-indigo-500"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>Low</span>
                        <span>High</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-white mb-3 block text-sm font-medium">
                        Effort (1 = Easy, 5 = Hard): <span className="text-indigo-400">{effort}</span>
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        value={effort}
                        onChange={(e) => setEffort(Number(e.target.value))}
                        className="w-full h-1.5 bg-navy rounded-full appearance-none cursor-pointer accent-indigo-500"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>Easy</span>
                        <span>Hard</span>
                      </div>
                    </div>
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={addTask}
                    disabled={!taskName.trim() || !category}
                    className="w-full h-12 text-base font-semibold bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-navy rounded-lg inline-flex items-center justify-center gap-2 transition-all shadow-lg shadow-white/10 cursor-pointer"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Add Task to Matrix
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Templates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <div className="bg-navy-light/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Not Sure Where to Start?</h3>
              <p className="text-center text-slate-400 mb-8">
                Click any template below to add it to your matrix
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {templates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => addTemplateTask(template)}
                    className="bg-navy/60 border border-white/10 hover:border-indigo-500/30 rounded-xl p-4 text-left transition-all hover:bg-navy cursor-pointer"
                  >
                    <p className="font-semibold text-sm text-white mb-3 leading-tight">
                      {template.name}
                    </p>
                    <div className="flex gap-3 text-xs text-slate-500">
                      <span>Impact: <span className="text-indigo-400">{template.impact}</span></span>
                      <span>Effort: <span className="text-purple-400">{template.effort}</span></span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tasks List */}
          {tasks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <div className="bg-navy-light/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Your Tasks ({tasks.length})</h3>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    <span>Est. <span className="text-indigo-400 font-medium">{totalTimeSaved.toFixed(0)}</span> hrs/week saved</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-navy/60 border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-white/10 transition-all"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-white font-medium">{task.name}</span>
                          <span className="text-xs px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-full">
                            {task.category}
                          </span>
                        </div>
                        <div className="flex gap-4 text-sm text-slate-500">
                          <span>Impact: <span className="text-slate-300">{task.impact}</span></span>
                          <span>Effort: <span className="text-slate-300">{task.effort}</span></span>
                          <span className="text-indigo-400 font-medium">Score: {task.score}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeTask(task.id)}
                        className="p-2 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Top 10 Quick Wins */}
          {topTasks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-8">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">
                  Top {topTasks.length} Quick Wins
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {topTasks.map((task, index) => (
                    <div key={task.id} className="bg-navy/60 border border-white/10 rounded-xl p-6 hover:border-indigo-500/30 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center font-bold flex-shrink-0">
                          #{index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white mb-2">{task.name}</h4>
                          <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                            Score: {task.score}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-lg text-white mb-6 font-semibold">
                    Want Nexark to automate these for you?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setIsDialogOpen(true)}
                      className="px-10 py-4 bg-white text-navy font-semibold rounded-lg hover:bg-slate-100 transition-all shadow-lg shadow-white/10 text-lg cursor-pointer"
                    >
                      Get Full Roadmap
                    </button>
                    <a
                      href="https://cal.com/sam-barksdale/discovery"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-10 py-4 border border-white/10 text-slate-300 font-semibold rounded-lg hover:border-white/20 hover:text-white transition-all flex items-center justify-center gap-2 text-lg cursor-pointer"
                    >
                      <Calendar className="h-5 w-5" />
                      Book Free Systems Audit
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-navy-light/50 backdrop-blur-sm border border-white/10 rounded-2xl p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Automate Your Business?
              </h3>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                Let Nexark implement your top automation opportunities. We&apos;ll handle the technical setup while you focus on growing your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://cal.com/sam-barksdale/discovery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-navy font-semibold rounded-lg hover:bg-slate-100 transition-all shadow-lg shadow-white/10 flex items-center gap-2 text-lg cursor-pointer"
                >
                  <Calendar className="h-5 w-5" />
                  Book Free Systems Audit
                </a>
                <button
                  onClick={() => {
                    setTasks([]);
                    setTaskName("");
                    setCategory("");
                    setImpact(3);
                    setEffort(3);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-4 border border-white/10 text-slate-300 font-semibold rounded-lg hover:border-white/20 hover:text-white transition-all text-lg cursor-pointer"
                >
                  Build Another Matrix
                </button>
              </div>
              <p className="mt-6 text-sm text-slate-500">
                Save 5-20 hours per week • No technical skills required • Done-for-you automation
              </p>
            </div>
          </motion.div>
        </div>

        {/* Email Dialog */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-navy-light border border-white/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Your Automation Roadmap is Ready!
                </h3>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-slate-400 mb-6">
                Enter your email to receive your personalized automation roadmap with detailed implementation steps.
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-navy border border-white/10 text-white placeholder:text-slate-500 h-12 px-4 rounded-lg focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all mb-4 cursor-text"
              />
              <button
                onClick={handleSendRoadmap}
                disabled={isSending || !email.trim()}
                className="w-full h-12 bg-white hover:bg-slate-100 text-navy font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-white/10 cursor-pointer"
              >
                {isSending ? "Sending..." : "Send My Roadmap"}
              </button>
            </motion.div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
