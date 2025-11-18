'use client';

import Hero from "@/components/marketing/Hero";
import FeaturedOn from "@/components/marketing/FeaturedOn";
import StatsBar from "@/components/marketing/StatsBar";
import TheChallenge from "@/components/marketing/TheChallenge";
import ThreeModes from "@/components/marketing/ThreeModes";
import Dashboard from "@/components/marketing/Dashboard";
import WorkflowDiagram from "@/components/marketing/WorkflowDiagram";
import Features from "@/components/marketing/Features";
import Testimonials from "@/components/marketing/Testimonials";
import Pricing from "@/components/marketing/Pricing";
import FAQ from "@/components/marketing/FAQ";
import FinalCTA from "@/components/marketing/FinalCTA";

export default function NewLandingPageContent() {
  return (
    <>
      <Hero />
      <FeaturedOn />
      <StatsBar />
      <TheChallenge />
      <ThreeModes />
      <Dashboard />
      <WorkflowDiagram />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
