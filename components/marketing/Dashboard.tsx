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
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Your SEO Command Center
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Real-time insights, automated optimizations, and complete visibility into your SEO performance
          </p>
        </motion.div>

        {/* Dashboard Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200 dark:border-slate-800"
        >
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
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
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                    <div className="text-slate-600 dark:text-slate-400 text-sm mb-2">Total Visitors</div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">50,500</div>
                    <div className="text-green-600 text-sm font-medium">+156% vs last month</div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                    <div className="text-slate-600 dark:text-slate-400 text-sm mb-2">Organic Traffic</div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">42,300</div>
                    <div className="text-green-600 text-sm font-medium">+189% vs last month</div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                    <div className="text-slate-600 dark:text-slate-400 text-sm mb-2">Conversion Rate</div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">3.8%</div>
                    <div className="text-green-600 text-sm font-medium">+0.9% vs last month</div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Traffic Growth (Last 6 Months)
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "none",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="traffic"
                        stroke="url(#colorGradient)"
                        strokeWidth={3}
                        dot={{ fill: "#8b5cf6", r: 6 }}
                        activeDot={{ r: 8 }}
                      />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
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
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">2,547</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Total Keywords</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">847</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Top 10 Rankings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">1,234</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Top 20 Rankings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">+156</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">New This Month</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Top Performing Keywords
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={rankingData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis type="number" stroke="#64748b" />
                      <YAxis dataKey="keyword" type="category" width={150} stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "none",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                      <Bar dataKey="position" fill="url(#barGradient)" radius={[0, 8, 8, 0]} />
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
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
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                    Recent Automated Fixes
                  </h3>
                  <div className="space-y-4">
                    {autoFixes.map((fix, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white">{fix.title}</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                              {fix.pages} pages • {fix.time}
                            </div>
                          </div>
                        </div>
                        <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-full">
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
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      SEO Score
                    </h3>
                    <div className="flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        <svg className="transform -rotate-90 w-48 h-48">
                          <circle
                            cx="96"
                            cy="96"
                            r="88"
                            stroke="#e2e8f0"
                            strokeWidth="12"
                            fill="none"
                          />
                          <motion.circle
                            cx="96"
                            cy="96"
                            r="88"
                            stroke="url(#scoreGradient)"
                            strokeWidth="12"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: "0 552" }}
                            animate={{ strokeDasharray: "485 552" }}
                            transition={{ duration: 2, ease: "easeOut" }}
                          />
                          <defs>
                            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#3b82f6" />
                              <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-slate-900 dark:text-white">88</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">out of 100</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      Key Metrics
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: "Page Speed", value: 92, color: "bg-green-500" },
                        { label: "Mobile Friendly", value: 95, color: "bg-blue-500" },
                        { label: "Content Quality", value: 88, color: "bg-purple-500" },
                        { label: "Technical SEO", value: 85, color: "bg-pink-500" },
                      ].map((metric, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              {metric.label}
                            </span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">
                              {metric.value}%
                            </span>
                          </div>
                          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.value}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className={`h-full ${metric.color}`}
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
