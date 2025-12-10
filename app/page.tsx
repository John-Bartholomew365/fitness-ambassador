'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from '@/components/loaders/WelcomeScreen';
// import PageLoader from '@/components/loaders/PageLoader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'sonner';

// Import your landing page components
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import FeaturedEventsSection from '@/components/home/FeaturedEventsSection';
import BookPromoSection from '@/components/home/BookPromoSection';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  const [showWelcome, setShowWelcome] = useState(() => {
    if (typeof window !== 'undefined') {
      const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
      return hasSeenWelcome === 'true' ? false : true;
    }
    return true;
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleWelcomeComplete = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasSeenWelcome', 'true');
    }
    setShowWelcome(false);
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

  // Handle "Get Started" and other CTA actions
  // const handleGetStarted = () => {
  //   // Just scroll to book section since it's on same page
  //   scrollToSection('book-section');
  // };

  // const handleViewEvents = () => {
  //   scrollToSection('events-section');
  // };

  const handleContact = () => {
    // Open contact modal or scroll to contact section if exists
    console.log('Contact action triggered');
    // You could implement a modal here
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onComplete={handleWelcomeComplete} />
        )}
      </AnimatePresence>

      {!showWelcome && (
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
            <NewsletterSection />
          </main>

          <Footer />
        </div>
      )}

      <Toaster position="top-right" />
    </>
  );
}

