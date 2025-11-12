'use client';

import Header from "@/components/marketing/Header";
import Hero from "@/components/marketing/Hero";
import StatsBar from "@/components/marketing/StatsBar";
import ThreeModes from "@/components/marketing/ThreeModes";
import Dashboard from "@/components/marketing/Dashboard";
import WorkflowDiagram from "@/components/marketing/WorkflowDiagram";
import Features from "@/components/marketing/Features";
import Testimonials from "@/components/marketing/Testimonials";
import Pricing from "@/components/marketing/Pricing";
import FAQ from "@/components/marketing/FAQ";
import FinalCTA from "@/components/marketing/FinalCTA";
import Footer from "@/components/marketing/Footer";

export default function NewLandingPageContent() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <ThreeModes />
        <Dashboard />
        <WorkflowDiagram />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
