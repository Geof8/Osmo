"use client";

import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Marquee from "@/components/ui/Marquee";
import Hero from "@/components/sections/Hero";
import IntroSequence from "@/components/sections/IntroSequence";
import WhyYouSuffer from "@/components/sections/WhyYouSuffer";
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
  const { soldOut, remaining } = useWaitlistCount();

  return (
    <>
      <AnnouncementBar />
      <Navbar soldOut={soldOut} />
      <main>
        <IntroSequence />
        <Hero revealed={true} soldOut={soldOut} remaining={remaining} />
        <Marquee />
        <WhyYouSuffer />
        <Benefits />
        <SocialProof />
        <HowItWorks />
        <Formula />
        <ClinicalStudy />
        <PourquoiOsmo />
        <ClosingCTA soldOut={soldOut} />
        <FAQ />
        <NewsletterSignup />
      </main>
      <Footer />
    </>
  );
}
