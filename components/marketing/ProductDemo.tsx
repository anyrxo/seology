import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MessageSquare,
  Zap,
  TrendingUp,
  Package,
  Shield,
  BarChart3,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const demoTabs = [
  {
    id: "ai-chat",
    label: "AI Chat Assistant",
    icon: <MessageSquare className="h-5 w-5" />,
    title: "Collaborate with Your AI SEO Expert",
    description:
      "Ask questions, get recommendations, and plan your SEO strategy in real-time with our intelligent AI assistant.",
    features: [
      "Natural language conversations",
      "Real-time SEO recommendations",
      "Strategy planning & optimization ideas",
      "Competitor analysis insights",
      "Content improvement suggestions",
    ],
    mockup: (
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden h-96">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
          <p className="font-semibold">Seology AI Assistant</p>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-80">
          <div className="flex justify-end">
            <div className="bg-blue-100 text-slate-900 rounded-lg p-3 max-w-xs">
              How can I improve my product descriptions for SEO?
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-slate-100 text-slate-900 rounded-lg p-3 max-w-xs">
              <p className="font-semibold mb-2">Great question! Here are 5 proven strategies:</p>
              <ul className="text-sm space-y-1">
                <li>✓ Include target keywords naturally</li>
                <li>✓ Add unique selling points</li>
                <li>✓ Use power words that convert</li>
                <li>✓ Optimize for featured snippets</li>
                <li>✓ Include long-tail keywords</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "auto-optimize",
    label: "24/7 Auto-Optimization",
    icon: <Zap className="h-5 w-5" />,
    title: "Never Stop Optimizing",
    description:
      "Seology works around the clock, automatically fixing SEO issues, optimizing content, and improving rankings while you sleep.",
    features: [
      "Automatic issue detection & fixing",
      "Real-time ranking monitoring",
      "Continuous content optimization",
      "Meta tag auto-generation",
      "Schema markup automation",
    ],
    mockup: (
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-2xl p-6 text-white h-96 flex flex-col justify-between">
        <div>
          <p className="text-sm text-slate-400 mb-4">OPTIMIZATION STATUS</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Meta Tags Optimized</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                    className="h-full bg-green-500"
                  />
                </div>
                <span className="text-green-400 text-sm">100%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Content Improved</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 2, delay: 0.3 }}
                    className="h-full bg-blue-500"
                  />
                </div>
                <span className="text-blue-400 text-sm">85%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Keywords Optimized</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "92%" }}
                    transition={{ duration: 2, delay: 0.6 }}
                    className="h-full bg-purple-500"
                  />
                </div>
                <span className="text-purple-400 text-sm">92%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-slate-700">
          <p className="text-xs text-slate-400">Last optimized: 2 minutes ago</p>
          <p className="text-xs text-green-400 mt-1">✓ All systems running optimally</p>
        </div>
      </div>
    ),
  },
  {
    id: "product-indexing",
    label: "Auto Product Indexing",
    icon: <Package className="h-5 w-5" />,
    title: "New Products, Instant SEO",
    description:
      "Add a new product to your Shopify store? Seology automatically optimizes it for search engines with zero manual effort.",
    features: [
      "Instant product detection",
      "Auto-generated SEO-optimized titles",
      "Intelligent meta descriptions",
      "Automatic keyword targeting",
      "Schema markup generation",
    ],
    mockup: (
      <div className="bg-white rounded-xl shadow-2xl p-6 h-96">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b">
          <Package className="h-6 w-6 text-blue-600" />
          <div>
            <p className="font-semibold text-slate-900">New Product Added</p>
            <p className="text-xs text-slate-500">Premium Wireless Headphones</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-2">SEO OPTIMIZATION</p>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm font-semibold text-slate-900">
                Premium Wireless Headphones with Noise Cancellation | Buy Online
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Shop premium wireless headphones with active noise cancellation. Premium sound quality, 30-hour battery life, fast shipping.
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-2">TARGET KEYWORDS</p>
            <div className="flex flex-wrap gap-2">
              {["wireless headphones", "noise cancelling", "premium audio", "best headphones"].map((kw) => (
                <span key={kw} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {kw}
                </span>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t">
            <p className="text-xs text-green-600 font-semibold">✓ Optimization complete in 2 seconds</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "competition",
    label: "Competition Hunting",
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Hunt & Beat Your Competition",
    description:
      "Seology analyzes your competitors' SEO strategies and shows you exactly how to outrank them in your niche.",
    features: [
      "Competitor keyword analysis",
      "Backlink strategy insights",
      "Content gap identification",
      "Ranking opportunity detection",
      "Market share analysis",
    ],
    mockup: (
      <div className="bg-white rounded-xl shadow-2xl p-6 h-96">
        <div className="mb-6">
          <p className="font-semibold text-slate-900 mb-4">Top Competitors Analysis</p>
          <div className="space-y-3">
            {[
              { name: "Competitor A", keywords: 1250, backlinks: 3420, score: 85 },
              { name: "Competitor B", keywords: 980, backlinks: 2890, score: 72 },
              { name: "Your Store", keywords: 1450, backlinks: 4120, score: 92 },
            ].map((comp) => (
              <div key={comp.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{comp.name}</p>
                  <p className="text-xs text-slate-600">{comp.keywords} keywords • {comp.backlinks} backlinks</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${comp.score}%` }}
                      transition={{ duration: 1.5 }}
                      className={comp.name === "Your Store" ? "h-full bg-green-500" : "h-full bg-orange-500"}
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{comp.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

export default function ProductDemo() {
  const [activeTab, setActiveTab] = useState("ai-chat");
  const activeDemo = demoTabs.find((tab) => tab.id === activeTab)!;

  return (
    <section id="product-demo" className="py-24 bg-white dark:bg-slate-950">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">Interactive Demo</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            See Seology in Action
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Explore every powerful feature that makes Seology the ultimate AI-powered SEO automation platform for Shopify stores.
          </p>
        </motion.div>

        {/* Demo Tabs */}
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {demoTabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Demo Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left: Description */}
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                {activeDemo.title}
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                {activeDemo.description}
              </p>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                {activeDemo.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <ChevronRight className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Try Seology for Free
                <ChevronRight className="inline-block ml-2 h-5 w-5" />
              </motion.button>
            </div>

            {/* Right: Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {activeDemo.mockup}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-600 dark:text-slate-400 mb-4 text-lg">
            Ready to transform your Shopify store's SEO?
          </p>
          <Link href="/sign-up">
            <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              Start Your 14-Day Free Trial
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
