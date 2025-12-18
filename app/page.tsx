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
import HomePageLoader from '@/components/loaders/HomePageLoader';
import ShopPreviewSection from '@/components/home/ShopPreviewSection';

// Helper function to check if welcome screen should show
const shouldShowWelcomeScreen = (): boolean => {
  if (typeof window === 'undefined') return true;
  
  const welcomeData = localStorage.getItem('hasSeenWelcome');
  
  if (!welcomeData) return true;
  
  try {
    const parsedData = JSON.parse(welcomeData);
    const storedTimestamp = parsedData.timestamp;
    const currentTime = Date.now();
    
    // Check if more than 1 hour has passed (3600000 milliseconds)
    return currentTime - storedTimestamp > 3600000;
  } catch {
    // If there's an error parsing, show welcome screen
    return true;
  }
};

export default function HomePage() {
  const pathname = usePathname();
  const [showWelcome, setShowWelcome] = useState<boolean | null>(null);
  const [showPageLoader, setShowPageLoader] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize welcome screen state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const shouldShow = shouldShowWelcomeScreen();
      setTimeout(() => {
        setShowWelcome(shouldShow);
        setIsFirstVisit(shouldShow);
      }, 0);
    }
  }, []);

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
      // Store timestamp along with the flag
      const welcomeData = {
        hasSeen: true,
        timestamp: Date.now()
      };
      localStorage.setItem('hasSeenWelcome', JSON.stringify(welcomeData));
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

  // Show nothing while initializing
  if (showWelcome === null) {
    return null; // or a minimal loading state
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {/* Welcome Screen - Shows on first visit OR after 1 hour */}
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
            <ShopPreviewSection />
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