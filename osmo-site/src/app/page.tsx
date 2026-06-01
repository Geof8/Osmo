"use client";

import { useState, useCallback } from "react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SplitOverlay from "@/components/ui/SplitOverlay";
import Marquee from "@/components/ui/Marquee";
import PromoPopup from "@/components/ui/PromoPopup";
import StickyBar from "@/components/ui/StickyBar";
import Hero from "@/components/sections/Hero";
import InlineCTA from "@/components/sections/InlineCTA";
import WhyYouSuffer from "@/components/sections/WhyYouSuffer";
import BeforeAfter from "@/components/sections/BeforeAfter";
import PourquoiOsmo from "@/components/sections/PourquoiOsmo";
import HowItWorks from "@/components/sections/HowItWorks";
import Formula from "@/components/sections/Formula";
import Benefits from "@/components/sections/Benefits";
import ClinicalStudy from "@/components/sections/ClinicalStudy";
import SocialProof from "@/components/sections/SocialProof";
import FAQ from "@/components/sections/FAQ";
import ClosingCTA from "@/components/sections/ClosingCTA";
import NewsletterSignup from "@/components/sections/NewsletterSignup";
import { useWaitlistCount } from "@/hooks/useWaitlistCount";

export default function Home() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const { soldOut, remaining } = useWaitlistCount();

  const handleOverlayComplete = useCallback(() => {
    setHeroRevealed(true);
  }, []);

  return (
    <>
      <SplitOverlay onComplete={handleOverlayComplete} />
      <AnnouncementBar />
      <Navbar soldOut={soldOut} />
      <main>
        <Hero revealed={heroRevealed} soldOut={soldOut} remaining={remaining} />
        <Marquee />
        <WhyYouSuffer />
        <InlineCTA label="Je commence le rituel →" />
        <BeforeAfter />
        <Benefits />
        <SocialProof />
        <HowItWorks />
        <InlineCTA label="Je deviens Early Adopter →" />
        <Formula />
        <InlineCTA label="Essaie avant qu'il n'y en ait plus →" />
        <ClinicalStudy />
        <PourquoiOsmo />
        <ClosingCTA soldOut={soldOut} />
        <FAQ />
        <NewsletterSignup />
      </main>
      <Footer />
      {/* Spacer so the fixed sticky bar never covers footer content */}
      <div aria-hidden="true" className="h-[88px] sm:h-[64px]" />
      <StickyBar />
      <PromoPopup />
    </>
  );
}
