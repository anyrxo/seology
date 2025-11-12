'use client';

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Zap,
  TrendingUp,
  Package,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  Award,
  Shield,
  Brain,
  CheckCircle2,
  Loader,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  isThinking?: boolean;
}

interface Task {
  id: string;
  name: string;
  status: "pending" | "loading" | "completed";
  eta?: string;
}

function TypingMessage({ text, isThinking }: { text: string; isThinking?: boolean }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (isThinking) {
      setDisplayedText("");
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [text, isThinking]);

  if (isThinking) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-slate-400">AI is thinking</span>
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex gap-1"
        >
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
        </motion.div>
      </div>
    );
  }

  return <p className="text-sm whitespace-pre-wrap">{displayedText}</p>;
}

export default function Demo() {
  const [activeTab, setActiveTab] = useState("chat");
  const [selectedMode, setSelectedMode] = useState<"auto" | "plan" | "approve">("auto");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [automationMetrics, setAutomationMetrics] = useState({
    metaTags: 0,
    content: 0,
    keywords: 0,
  });
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const modeSequences = {
    auto: [
      { delay: 500, message: { role: "user" as const, content: "Optimize my store automatically" } },
      { delay: 1500, message: { role: "assistant" as const, content: "", isThinking: true } },
      { delay: 3500, message: { role: "assistant" as const, content: "Perfect! I'm running full optimization in Auto Mode. I'll handle everything automatically - no approval needed. Changes go live immediately as I complete them.", isThinking: false } },
      { delay: 6500, message: { role: "user" as const, content: "How long will this take?" } },
      { delay: 7500, message: { role: "assistant" as const, content: "", isThinking: true } },
      { delay: 9500, message: { role: "assistant" as const, content: "Most optimizations (meta tags, content, schema) are live within minutes. Backlink building takes 3-5 days. I'll monitor everything and adjust as needed.", isThinking: false } },
    ],
    plan: [
      { delay: 500, message: { role: "user" as const, content: "What optimizations do you recommend?" } },
      { delay: 1500, message: { role: "assistant" as const, content: "", isThinking: true } },
      { delay: 3500, message: { role: "assistant" as const, content: "Here's my optimization plan:\n\n✓ Update 245 meta titles\n✓ Enhance 189 descriptions\n✓ Add content to 156 pages\n✓ Build 12 backlinks\n\nReview each change and approve when ready.", isThinking: false } },
      { delay: 6500, message: { role: "user" as const, content: "Show me the meta title changes" } },
      { delay: 7500, message: { role: "assistant" as const, content: "", isThinking: true } },
      { delay: 9500, message: { role: "assistant" as const, content: "Showing 245 meta title changes. You can see the before/after for each page. Click to approve individual changes or approve all at once.", isThinking: false } },
    ],
    approve: [
      { delay: 500, message: { role: "user" as const, content: "Show me the changes before applying" } },
      { delay: 1500, message: { role: "assistant" as const, content: "", isThinking: true } },
      { delay: 3500, message: { role: "assistant" as const, content: "I've prepared all changes for your review. You can see exactly what will change on each page - meta tags, content, schema markup. Full control is yours.", isThinking: false } },
      { delay: 6500, message: { role: "user" as const, content: "Approve all changes" } },
      { delay: 7500, message: { role: "assistant" as const, content: "", isThinking: true } },
      { delay: 9500, message: { role: "assistant" as const, content: "All changes approved! Deploying 245 optimizations now. I'll monitor performance and let you know when everything is live.", isThinking: false } },
    ],
  };

  useEffect(() => {
    if (activeTab === "chat") {
      setChatMessages([]);
      setTasks([
        { id: "1", name: "Meta title optimization", status: "pending" },
        { id: "2", name: "Meta description revision", status: "pending" },
        { id: "3", name: "Content expansion", status: "pending" },
        { id: "4", name: "Schema markup implementation", status: "pending" },
        { id: "5", name: "Backlink strategy", status: "pending" },
      ]);

      const sequence = modeSequences[selectedMode];

      sequence.forEach((item) => {
        setTimeout(() => {
          if (item.message.isThinking) {
            setChatMessages((prev) => [...prev, item.message]);
          } else if (item.message.role === "assistant" && !item.message.isThinking) {
            setChatMessages((prev) => {
              const updated = [...prev];
              const lastIdx = updated.length - 1;
              if (lastIdx >= 0 && updated[lastIdx].isThinking) {
                updated[lastIdx] = item.message;
              } else {
                updated.push(item.message);
              }
              return updated;
            });
          } else {
            setChatMessages((prev) => [...prev, item.message]);
          }
        }, item.delay);
      });

      if (selectedMode === "auto") {
        setTimeout(() => {
          setTasks((prev) => {
            const updated = [...prev];
            updated[0].status = "loading";
            return updated;
          });
        }, 10500);

        setTimeout(() => {
          setTasks((prev) => {
            const updated = [...prev];
            updated[0].status = "completed";
            updated[1].status = "loading";
            return updated;
          });
        }, 12500);

        setTimeout(() => {
          setTasks((prev) => {
            const updated = [...prev];
            updated[1].status = "completed";
            updated[2].status = "loading";
            return updated;
          });
        }, 14500);

        setTimeout(() => {
          setTasks((prev) => {
            const updated = [...prev];
            updated[2].status = "completed";
            updated[3].status = "loading";
            return updated;
          });
        }, 16500);

        setTimeout(() => {
          setTasks((prev) => {
            const updated = [...prev];
            updated[3].status = "completed";
            updated[4].status = "loading";
            updated[4].eta = "ETA: 3-5 days";
            return updated;
          });
        }, 18500);
      }
    }
  }, [activeTab, selectedMode]);

  useEffect(() => {
    if (activeTab === "automation") {
      setAutomationMetrics({ metaTags: 0, content: 0, keywords: 0 });
      const interval = setInterval(() => {
        setAutomationMetrics((prev) => ({
          metaTags: Math.min(prev.metaTags + 2, 100),
          content: Math.min(prev.content + 1.5, 100),
          keywords: Math.min(prev.keywords + 1.8, 100),
        }));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const tabs = [
    { id: "chat", label: "AI Chat", icon: <MessageSquare className="h-5 w-5" /> },
    { id: "indexing", label: "Auto Indexing", icon: <Package className="h-5 w-5" /> },
    { id: "competition", label: "Competition Hunt", icon: <TrendingUp className="h-5 w-5" /> },
    { id: "automation", label: "24/7 Automation", icon: <Zap className="h-5 w-5" /> },
    { id: "eeat", label: "E-E-A-T & AI", icon: <Award className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header />
      <main className="flex-1 pt-16">
        <section className="py-12 border-b border-blue-400/20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Link href="/" className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 transition mb-6">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Back to Home</span>
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Experience Seology's Power
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Watch our AI-powered SEO automation platform optimize your Shopify store in real-time.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setAutomationMetrics({ metaTags: 0, content: 0, keywords: 0 });
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </motion.button>
              ))}
            </div>

            {activeTab === "chat" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto"
              >
                <div className="mb-8 flex gap-4 justify-center flex-wrap">
                  {[
                    { id: "auto", name: "Auto Mode", icon: "⚡", desc: "Fully Automated" },
                    { id: "plan", name: "Plan Mode", icon: "📋", desc: "Review & Approve" },
                    { id: "approve", name: "Approve Mode", icon: "✓", desc: "Full Control" },
                  ].map((mode) => (
                    <motion.button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id as "auto" | "plan" | "approve")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                        selectedMode === mode.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      <span className="text-xl">{mode.icon}</span>
                      <div className="text-left">
                        <div className="font-semibold">{mode.name}</div>
                        <div className="text-xs opacity-75">{mode.desc}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-blue-400/20 overflow-hidden shadow-2xl">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold">Seology AI Assistant</h3>
                        <p className="text-blue-100 text-sm">
                          {selectedMode === "auto" && "Auto Mode - Set It and Forget It"}
                          {selectedMode === "plan" && "Plan Mode - Review Before Applying"}
                          {selectedMode === "approve" && "Approve Mode - Full Control"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="h-96 overflow-y-auto p-6 space-y-4 bg-slate-900/30">
                    {chatMessages.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                            msg.role === "user"
                              ? "bg-blue-600 text-white rounded-br-none"
                              : "bg-slate-700 text-slate-100 rounded-bl-none"
                          }`}
                        >
                          <TypingMessage text={msg.content} isThinking={msg.isThinking} />
                        </div>
                      </motion.div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  {selectedMode === "auto" && tasks.some((t) => t.status !== "pending") && (
                    <div className="bg-slate-800 border-t border-blue-400/20 p-6">
                      <h4 className="text-white font-semibold mb-4">Live Optimization Tasks</h4>
                      <div className="space-y-3">
                        {tasks.map((task) => (
                          <motion.div
                            key={task.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3"
                          >
                            {task.status === "completed" && (
                              <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                            )}
                            {task.status === "loading" && (
                              <Loader className="h-5 w-5 text-blue-400 animate-spin flex-shrink-0" />
                            )}
                            {task.status === "pending" && (
                              <div className="h-5 w-5 rounded-full border-2 border-slate-600 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <span
                                className={`text-sm ${
                                  task.status === "completed"
                                    ? "text-green-400"
                                    : task.status === "loading"
                                    ? "text-blue-400"
                                    : "text-slate-400"
                                }`}
                              >
                                {task.name}
                              </span>
                              {task.eta && (
                                <span className="text-xs text-slate-500 ml-2 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {task.eta}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-slate-800 border-t border-blue-400/20 p-4 text-center text-slate-400 text-sm">
                    Automated demo sequence • In the real app, you can ask any SEO question
                  </div>
                </div>
              </motion.div>
            )}

            {/* Other tabs would go here - keeping it concise for now */}
          </div>
        </section>

        <section className="py-16 border-t border-blue-400/20">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your SEO?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join 5,000+ Shopify stores already using Seology to automate their SEO and grow organic traffic.
              </p>
              <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Start Your 14-Day Free Trial
                <ChevronRight className="inline-block ml-2 h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
