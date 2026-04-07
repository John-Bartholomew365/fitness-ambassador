'use client';

import { useState, useEffect, } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from '@/components/loaders/WelcomeScreen';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'sonner';

// New sections for service-focused homepage
import HeroSection from '@/components/home/HeroSection';
import FeaturedEventsSection from '@/components/home/FeaturedEventsSection';
import TestimonialsCarousel from '@/components/home/TestimonialSection';
import FAQSection from '@/components/home/Faq';
import NewsletterSection from '@/components/home/NewsletterSection';
import HomePageLoader from '@/components/loaders/HomePageLoader';

import Head from 'next/head';
import { usePathname } from 'next/navigation';
import StatsSection from '@/components/home/StatsSection';
import ServicesOverviewSection from '@/components/home/ServicesOverview';
import TrainingShowcaseSection from '@/components/home/TrainingShowcaseSection';
import ProgramsSection from '@/components/home/ProgramsSection';
import ConsultationSection from '@/components/home/ConsultationSection';

const shouldShowWelcomeScreen = (): boolean => {
  if (typeof window === 'undefined') return true;
  const welcomeData = localStorage.getItem('hasSeenWelcome');
  if (!welcomeData) return true;

  try {
    const parsedData = JSON.parse(welcomeData);
    return Date.now() - parsedData.timestamp > 7200000;
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
        <title>The Fitness Ambassador | Fitness Training, Programs & Events</title>
        <meta
          name="description"
          content="Transform your fitness journey with The Fitness Ambassador. Professional training, personalized consultations, innovative programs, and community events."
        />
        <meta name="keywords" content="The Fitness Ambassador, fitness training Ilorin, personal trainer Nigeria, fitness consultation, workout programs, fitness certification, Walk2Fitness, Jam2Fit, Workout Compass, FA Gym Wears" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="The Fitness Ambassador | Professional Fitness Training & Programs" />
        <meta property="og:description" content="Transform your fitness journey with professional training, personalized consultations, and innovative programs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.thefitnessambassador.com" />
        <meta property="og:image" content="https://www.thefitnessambassador.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <AnimatePresence mode="wait">
        {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}
        {!showWelcome && showPageLoader && <HomePageLoader />}
      </AnimatePresence>

      {!showWelcome && !showPageLoader && (
        <div className="min-h-screen flex flex-col">
          <Navbar onNavigate={scrollToSection} isLoading={isLoading} onContact={handleContact} />
          <main className="flex-1">
            {/* 1. Hero Section - Grand entrance with video/image background */}
            <HeroSection />
            
            {/* 2. Stats Section - Social proof with countup */}
            <StatsSection />
            
            {/* 3. Services Overview - What he offers (Training, Consultation, Programs, Events) */}
            <ServicesOverviewSection />
            
            {/* 4. Training Showcase - Video + side content showing training sessions */}
            <TrainingShowcaseSection />
            
            {/* 5. Programs Section - Detailed programs (Walk2Fitness, Jam2Fit, Workout Compass) */}
            <ProgramsSection />
            
            {/* 6. Featured Events - Proof of successful events (supporting, not main focus) */}
            <FeaturedEventsSection />
            
            {/* 7. Testimonials - Social proof */}
            <TestimonialsCarousel />
            
            {/* 8. FAQ - Address lingering questions */}
            <FAQSection />

             {/* 9. Consultation Section - CTA for personalized services */}
            <ConsultationSection />
            
            {/* 10. Newsletter - Final commitment */}
            <NewsletterSection id="newsletter" />
          </main>
          <Footer />
        </div>
      )}
      <Toaster position="top-right" />
    </>
  );
}