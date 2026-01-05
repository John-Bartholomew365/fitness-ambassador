'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from '@/components/loaders/WelcomeScreen';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'sonner';

import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import FeaturedEventsSection from '@/components/home/FeaturedEventsSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import MissionVisionPhilosophySection from '@/components/home/MissionVision';
import AllServicesOverviewSection from '@/components/home/AllServices';
import TestimonialsCarousel from '@/components/home/TestimonialSection';
import GuidedUserPathSection from '@/components/home/GuideUser';
import FAQSection from '@/components/home/Faq';
import HomePageLoader from '@/components/loaders/HomePageLoader';

import Head from 'next/head';
import { usePathname } from 'next/navigation';

const shouldShowWelcomeScreen = (): boolean => {
  if (typeof window === 'undefined') return true;
  const welcomeData = localStorage.getItem('hasSeenWelcome');
  if (!welcomeData) return true;

  try {
    const parsedData = JSON.parse(welcomeData);
    return Date.now() - parsedData.timestamp > 3600000;
  } catch {
    return true;
  }
};

export default function HomePage() {
  const pathname = usePathname();
  const [showWelcome, setShowWelcome] = useState<boolean | null>(null);
  const [showPageLoader, setShowPageLoader] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const shouldShow = shouldShowWelcomeScreen();
        setShowWelcome(shouldShow);
        setIsFirstVisit(shouldShow);
      }, 0);
    }
  }, []);

  useEffect(() => {
    if (isFirstVisit) return;
    const showTimer = setTimeout(() => setShowPageLoader(true), 0);
    const hideTimer = setTimeout(() => setShowPageLoader(false), 1500);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [pathname, isFirstVisit]);

  const handleWelcomeComplete = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'hasSeenWelcome',
        JSON.stringify({ hasSeen: true, timestamp: Date.now() })
      );
    }
    setShowWelcome(false);
    setIsFirstVisit(false);
  };

  const scrollToSection = (sectionId: string) => {
    setIsLoading(true);
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleContact = () => console.log('Contact triggered');

  if (showWelcome === null) return null;

  return (
    <>
      <Head>
        <title>The Fitness Ambassador | Personalized Workouts & Events</title>
        <meta
          name="description"
          content="Welcome to The Fitness Ambassador. Explore fitness events, training programs, gym wear, and tools to transform your health and wellness journey."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="The Fitness Ambassador | Personalized Workouts & Events" />
        <meta property="og:description" content="Welcome to The Fitness Ambassador. Explore fitness events, training programs, gym wear, and tools to transform your health and wellness journey." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.thefitnessambassador.com" />
        <meta property="og:image" content="https://www.thefitnessambassador.com/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Fitness Ambassador | Personalized Workouts & Events" />
        <meta name="twitter:description" content="Welcome to The Fitness Ambassador. Explore fitness events, training programs, gym wear, and tools to transform your health and wellness journey." />
        <meta name="twitter:image" content="https://www.thefitnessambassador.com/favicon.ico" />
      </Head>

      <AnimatePresence mode="wait">
        {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}
        {!showWelcome && showPageLoader && <HomePageLoader />}
      </AnimatePresence>

      {!showWelcome && !showPageLoader && (
        <div className="min-h-screen flex flex-col">
          <Navbar onNavigate={scrollToSection} isLoading={isLoading} onContact={handleContact} />
          <main className="flex-1">
            <HeroSection />
            <AboutSection />
            <FeaturedEventsSection />
            <MissionVisionPhilosophySection />
            <AllServicesOverviewSection />
            <GuidedUserPathSection />
            <TestimonialsCarousel />
            <FAQSection />
            <NewsletterSection />
          </main>
          <Footer />
        </div>
      )}
      <Toaster position="top-right" />
    </>
  );
}
