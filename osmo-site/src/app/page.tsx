"use client";

import { useState, useCallback } from "react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SplitOverlay from "@/components/ui/SplitOverlay";
import Marquee from "@/components/ui/Marquee";
import Hero from "@/components/sections/Hero";
import WhyYouSuffer from "@/components/sections/WhyYouSuffer";
import PourquoiOsmo from "@/components/sections/PourquoiOsmo";
import HowItWorks from "@/components/sections/HowItWorks";
import Formula from "@/components/sections/Formula";
import SocialProof from "@/components/sections/SocialProof";
import FAQ from "@/components/sections/FAQ";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { useWaitlistCount } from "@/hooks/useWaitlistCount";

export default function Home() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const { soldOut } = useWaitlistCount();

  const handleOverlayComplete = useCallback(() => {
    setHeroRevealed(true);
  }, []);

  return (
    <>
      <SplitOverlay onComplete={handleOverlayComplete} />
      <AnnouncementBar />
      <Navbar soldOut={soldOut} />
      <main>
        <Hero revealed={heroRevealed} soldOut={soldOut} />
        <Marquee />
        <WhyYouSuffer />
        <Formula />
        <HowItWorks />
        <SocialProof />
        <PourquoiOsmo />
        <ClosingCTA soldOut={soldOut} />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
