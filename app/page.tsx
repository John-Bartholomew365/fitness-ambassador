'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from '@/components/loaders/WelcomeScreen';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'sonner';

// Import your landing page components
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import FeaturedEventsSection from '@/components/home/FeaturedEventsSection';
import BookPromoSection from '@/components/home/BookPromoSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import ServicesSection from '@/components/home/ServicesSection';
import { usePathname } from 'next/navigation';
import PageLoader from '@/components/loaders/PageLoader';
import HomePageLoader from '@/components/loaders/HomePageLoader';

export default function HomePage() {
  const pathname = usePathname();
  const [showWelcome, setShowWelcome] = useState<boolean | null>(() => {
    if (typeof window === 'undefined') return null;
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    return hasSeenWelcome !== 'true';
  });
  const [showPageLoader, setShowPageLoader] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    return hasSeenWelcome !== 'true';
  });
  const [isLoading, setIsLoading] = useState(false);

  // Show PageLoader when navigating to home from another page
  useEffect(() => {
    // Skip on first visit (WelcomeScreen will show instead)
    if (isFirstVisit) return;
    
    // Defer showing the PageLoader to avoid synchronous setState inside an effect
    const showTimer = setTimeout(() => {
      setShowPageLoader(true);
    }, 0);

    const hideTimer = setTimeout(() => {
      setShowPageLoader(false);
    }, 1500); // Match PageLoader duration

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [pathname, isFirstVisit]);

  const handleWelcomeComplete = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasSeenWelcome', 'true');
    }
    setShowWelcome(false);
    setIsFirstVisit(false);
  };

  // For smooth scrolling within the page
  const scrollToSection = (sectionId: string) => {
    setIsLoading(true);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleContact = () => {
    console.log('Contact action triggered');
  };

  // Show nothing while checking localStorage
  if (showWelcome === null) {
    return null; // or a minimal loading state
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {/* Welcome Screen - Only on first visit */}
        {showWelcome && (
          <WelcomeScreen onComplete={handleWelcomeComplete} />
        )}

        {/* Page Loader - Only when navigating to home from other pages */}
        {!showWelcome && showPageLoader && (
          <HomePageLoader />
        )}
      </AnimatePresence>

      {/* Main Content - Show when neither WelcomeScreen nor PageLoader is showing */}
      {!showWelcome && !showPageLoader && (
        <div className="min-h-screen flex flex-col">
          <Navbar
            onNavigate={scrollToSection}
            isLoading={isLoading}
            onContact={handleContact}
          />

          <main className="flex-1">
            <HeroSection />
            <AboutSection />
            <FeaturedEventsSection />
            <BookPromoSection />
            <ServicesSection />
            <NewsletterSection />
          </main>

          <Footer />
        </div>
      )}

      <Toaster position="top-right" />
    </>
  );
}