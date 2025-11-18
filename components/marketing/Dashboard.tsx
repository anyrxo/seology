'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Target, Zap, CheckCircle } from "lucide-react";

const trafficData = [
  { month: "Jan", traffic: 4000 },
  { month: "Feb", traffic: 5200 },
  { month: "Mar", traffic: 6800 },
  { month: "Apr", traffic: 8500 },
  { month: "May", traffic: 11200 },
  { month: "Jun", traffic: 14800 },
];

const rankingData = [
  { keyword: "shopify seo", position: 3 },
  { keyword: "ecommerce optimization", position: 7 },
  { keyword: "product page seo", position: 5 },
  { keyword: "shopify marketing", position: 12 },
  { keyword: "online store seo", position: 4 },
];

const autoFixes = [
  {
    title: "Meta descriptions optimized",
    pages: 47,
    status: "completed",
    time: "2 hours ago",
  },
  {
    title: "Image alt tags added",
    pages: 156,
    status: "completed",
    time: "5 hours ago",
  },
  {
    title: "Internal linking improved",
    pages: 89,
    status: "completed",
    time: "1 day ago",
  },
  {
    title: "Schema markup implemented",
    pages: 34,
    status: "completed",
    time: "2 days ago",
  },
];

type TabType = "traffic" | "rankings" | "fixes" | "performance";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("traffic");

  const tabs = [
    { id: "traffic" as TabType, label: "Traffic Overview", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "rankings" as TabType, label: "Keyword Rankings", icon: <Target className="h-4 w-4" /> },
    { id: "fixes" as TabType, label: "Auto-Fix Log", icon: <Zap className="h-4 w-4" /> },
    { id: "performance" as TabType, label: "Performance", icon: <CheckCircle className="h-4 w-4" /> },
  ];

  return (
    <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
      {/* Gradient fade overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none after:absolute after:inset-0 after:z-10 after:[background:linear-gradient(to_top,#fff_30%,transparent)] dark:after:[background:linear-gradient(to_top,#000000_30%,transparent)]"></div>
      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <header className="mx-auto flex flex-col gap-y-3 text-center mb-6">
            <div className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-2">
              YOUR SEO COMMAND CENTER
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white leading-tight">
              Real-time insights, automated optimizations, and complete visibility
            </h2>
          </header>
          <p className="text-xl text-black/60 dark:text-white/60 max-w-2xl mx-auto">
            Monitor your SEO performance with powerful analytics and automated fixes
          </p>
        </motion.div>

        {/* Dashboard Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-black/10 dark:border-white/10 relative group"
        >
          {/* Animated colored border ring */}
          <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6)',
                padding: '2px',
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-full h-full rounded-3xl bg-white dark:bg-black"></div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-black/10 dark:border-white/10 pb-4 relative z-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-black dark:bg-white text-white dark:text-black shadow-lg"
                    : "bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {/* Traffic Overview Tab */}
            {activeTab === "traffic" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-black/10 dark:border-white/10 relative z-10">
                    <div className="text-black/60 dark:text-white/60 text-sm mb-2">Total Visitors</div>
                    <div className="text-3xl font-black text-black dark:text-white mb-1">50,500</div>
                    <div className="text-black/60 dark:text-white/60 text-sm font-medium">+156% vs last month</div>
                  </div>
                  <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-black/10 dark:border-white/10 relative z-10">
                    <div className="text-black/60 dark:text-white/60 text-sm mb-2">Organic Traffic</div>
                    <div className="text-3xl font-black text-black dark:text-white mb-1">42,300</div>
                    <div className="text-black/60 dark:text-white/60 text-sm font-medium">+189% vs last month</div>
                  </div>
                  <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-black/10 dark:border-white/10 relative z-10">
                    <div className="text-black/60 dark:text-white/60 text-sm mb-2">Conversion Rate</div>
                    <div className="text-3xl font-black text-black dark:text-white mb-1">3.8%</div>
                    <div className="text-black/60 dark:text-white/60 text-sm font-medium">+0.9% vs last month</div>
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-black/10 dark:border-white/10 relative z-10">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                    Traffic Growth (Last 6 Months)
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" className="dark:stroke-white/10" />
                      <XAxis dataKey="month" stroke="rgba(0,0,0,0.4)" className="dark:stroke-white/40" />
                      <YAxis stroke="rgba(0,0,0,0.4)" className="dark:stroke-white/40" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.9)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="traffic"
                        stroke="#000"
                        className="dark:stroke-white"
                        strokeWidth={3}
                        dot={{ fill: "#000", r: 6 }}
                        className="dark:fill-white"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {/* Keyword Rankings Tab */}
            {activeTab === "rankings" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-black/10 dark:border-white/10 mb-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-black text-black dark:text-white">2,547</div>
                      <div className="text-sm text-black/60 dark:text-white/60">Total Keywords</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-black dark:text-white">847</div>
                      <div className="text-sm text-black/60 dark:text-white/60">Top 10 Rankings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-black dark:text-white">1,234</div>
                      <div className="text-sm text-black/60 dark:text-white/60">Top 20 Rankings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-black dark:text-white">+156</div>
                      <div className="text-sm text-black/60 dark:text-white/60">New This Month</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-black/10 dark:border-white/10 relative z-10">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                    Top Performing Keywords
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={rankingData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" className="dark:stroke-white/10" />
                      <XAxis type="number" stroke="rgba(0,0,0,0.4)" className="dark:stroke-white/40" />
                      <YAxis dataKey="keyword" type="category" width={150} stroke="rgba(0,0,0,0.4)" className="dark:stroke-white/40" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.9)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                      <Bar dataKey="position" fill="#000" className="dark:fill-white" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {/* Auto-Fix Log Tab */}
            {activeTab === "fixes" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-black/10 dark:border-white/10 relative z-10">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-6">
                    Recent Automated Fixes
                  </h3>
                  <div className="space-y-4">
                    {autoFixes.map((fix, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-black/5 dark:bg-white/5 rounded-lg border border-black/10 dark:border-white/10"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-white dark:text-black" />
                          </div>
                          <div>
                            <div className="font-semibold text-black dark:text-white">{fix.title}</div>
                            <div className="text-sm text-black/60 dark:text-white/60">
                              {fix.pages} pages • {fix.time}
                            </div>
                          </div>
                        </div>
                        <div className="px-3 py-1 bg-black/10 dark:bg-white/10 text-black dark:text-white text-sm font-medium rounded-full">
                          {fix.status}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Performance Tab */}
            {activeTab === "performance" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-black/10 dark:border-white/10 relative z-10">
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                      SEO Score
                    </h3>
                    <div className="flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        <svg className="transform -rotate-90 w-48 h-48">
                          <circle
                            cx="96"
                            cy="96"
                            r="88"
                            stroke="rgba(0,0,0,0.1)"
                            className="dark:stroke-white/10"
                            strokeWidth="12"
                            fill="none"
                          />
                          <motion.circle
                            cx="96"
                            cy="96"
                            r="88"
                            stroke="#000"
                            className="dark:stroke-white"
                            strokeWidth="12"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: "0 552" }}
                            animate={{ strokeDasharray: "485 552" }}
                            transition={{ duration: 2, ease: "easeOut" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl font-black text-black dark:text-white">88</div>
                            <div className="text-sm text-black/60 dark:text-white/60">out of 100</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-black/10 dark:border-white/10 relative z-10">
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                      Key Metrics
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: "Page Speed", value: 92 },
                        { label: "Mobile Friendly", value: 95 },
                        { label: "Content Quality", value: 88 },
                        { label: "Technical SEO", value: 85 },
                      ].map((metric, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-black/70 dark:text-white/70">
                              {metric.label}
                            </span>
                            <span className="text-sm font-bold text-black dark:text-white">
                              {metric.value}%
                            </span>
                          </div>
                          <div className="h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.value}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className="h-full bg-black dark:bg-white"
                            ></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
