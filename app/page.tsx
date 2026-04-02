// 'use client';

// import { useState, useEffect } from 'react';
// import { AnimatePresence } from 'framer-motion';
// import WelcomeScreen from '@/components/loaders/WelcomeScreen';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
// import { Toaster } from 'sonner';

// import HeroSection from '@/components/home/HeroSection';
// import AboutSection from '@/components/home/AboutSection';
// import FeaturedEventsSection from '@/components/home/FeaturedEventsSection';
// import NewsletterSection from '@/components/home/NewsletterSection';
// import MissionVisionPhilosophySection from '@/components/home/MissionVision';
// import AllServicesOverviewSection from '@/components/home/AllServices';
// import TestimonialsCarousel from '@/components/home/TestimonialSection';
// import GuidedUserPathSection from '@/components/home/GuideUser';
// import FAQSection from '@/components/home/Faq';
// import HomePageLoader from '@/components/loaders/HomePageLoader';

// import Head from 'next/head';
// import { usePathname } from 'next/navigation';

// const shouldShowWelcomeScreen = (): boolean => {
//   if (typeof window === 'undefined') return true;
//   const welcomeData = localStorage.getItem('hasSeenWelcome');
//   if (!welcomeData) return true;

//   try {
//     const parsedData = JSON.parse(welcomeData);
//     return Date.now() - parsedData.timestamp > 7200000; // 2 hours in milliseconds
//   } catch {
//     return true;
//   }
// };

// export default function HomePage() {
//   const pathname = usePathname();
//   const [showWelcome, setShowWelcome] = useState<boolean | null>(null);
//   const [showPageLoader, setShowPageLoader] = useState(false);
//   const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       setTimeout(() => {
//         const shouldShow = shouldShowWelcomeScreen();
//         setShowWelcome(shouldShow);
//         setIsFirstVisit(shouldShow);
//       }, 0);
//     }
//   }, []);

//   useEffect(() => {
//     if (isFirstVisit) return;
//     const showTimer = setTimeout(() => setShowPageLoader(true), 0);
//     const hideTimer = setTimeout(() => setShowPageLoader(false), 1500);
//     return () => {
//       clearTimeout(showTimer);
//       clearTimeout(hideTimer);
//     };
//   }, [pathname, isFirstVisit]);

//   const handleWelcomeComplete = () => {
//     if (typeof window !== 'undefined') {
//       localStorage.setItem(
//         'hasSeenWelcome',
//         JSON.stringify({ hasSeen: true, timestamp: Date.now() })
//       );
//     }
//     setShowWelcome(false);
//     setIsFirstVisit(false);
//   };

//   const scrollToSection = (sectionId: string) => {
//     setIsLoading(true);
//     const element = document.getElementById(sectionId);
//     if (element) element.scrollIntoView({ behavior: 'smooth' });
//     setTimeout(() => setIsLoading(false), 500);
//   };

//   const handleContact = () => console.log('Contact triggered');

//   if (showWelcome === null) return null;

//   return (
//     <>
//       <Head>
//         <title>The Fitness Ambassador | Personalized Workouts & Events</title>
//         <meta
//           name="description"
//           content="Welcome to The Fitness Ambassador. Explore fitness events, training programs, gym wear, and tools to transform your health and wellness journey."
//         />
//         <meta name="keywords" content="The Fitness Ambassador, fitness events Ilorin, Walk2Fitness, Jam2Fit, Workout Compass, FA Gym Wears, personal trainer Nigeria, fitness coach Ilorin, fitness training, fitness consultation, Afro Groove, Aerobics Icebath, fitness certification Nigeria, gym wears, fitness apparel, fitness book Nigeria" />
//         <link rel="icon" href="/favicon.ico" />
//         <meta property="og:title" content="The Fitness Ambassador | Personalized Workouts & Events" />
//         <meta property="og:description" content="Welcome to The Fitness Ambassador. Explore fitness events, training programs, gym wear, and tools to transform your health and wellness journey." />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content="https://www.thefitnessambassador.com" />
//         <meta property="og:image" content="https://www.thefitnessambassador.com/favicon.ico" />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content="The Fitness Ambassador | Personalized Workouts & Events" />
//         <meta name="twitter:description" content="Welcome to The Fitness Ambassador. Explore fitness events, training programs, gym wear, and tools to transform your health and wellness journey." />
//         <meta name="twitter:image" content="https://www.thefitnessambassador.com/favicon.ico" />
//       </Head>

//       <AnimatePresence mode="wait">
//         {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}
//         {!showWelcome && showPageLoader && <HomePageLoader />}
//       </AnimatePresence>

//       {!showWelcome && !showPageLoader && (
//         <div className="min-h-screen flex flex-col">
//           <Navbar onNavigate={scrollToSection} isLoading={isLoading} onContact={handleContact} />
//           <main className="flex-1">
//             <HeroSection />
//             <AboutSection />
//             <FeaturedEventsSection />
//             <MissionVisionPhilosophySection />
//             <AllServicesOverviewSection />
//             <GuidedUserPathSection />
//             <TestimonialsCarousel />
//             <FAQSection />
//             {/* Add the id prop here */}
//             <NewsletterSection id="newsletter" />
//           </main>
//           <Footer />
//         </div>
//       )}
//       <Toaster position="top-right" />
//     </>
//   );
// }






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
    return Date.now() - parsedData.timestamp > 7200000; // 2 hours
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
        <meta name="keywords" content="The Fitness Ambassador, fitness events Ilorin, Walk2Fitness, Jam2Fit, Workout Compass, FA Gym Wears, personal trainer Nigeria, fitness coach Ilorin, fitness training, fitness consultation, Afro Groove, Aerobics Icebath, fitness certification Nigeria, gym wears, fitness apparel, fitness book Nigeria" />
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
            {/* 1. Hero Section - First impression, hooks attention */}
            <HeroSection />
            
            {/* 2. Featured Events - Proof first. Show real events immediately */}
            <FeaturedEventsSection />
            
            {/* 3. About Section - Now "About" lands with weight because they've seen what you've done */}
            <AboutSection />
            
            {/* 4. Mission & Vision - Purpose resonates once respect is established */}
            <MissionVisionPhilosophySection />
            
            {/* 5. All Services Overview - User understands who you are, services feel relevant not salesy */}
            <AllServicesOverviewSection />
            
            {/* 6. Guided User Path - Mid-funnel. User has enough context to self-select a path */}
            <GuidedUserPathSection />
            
            {/* 7. Testimonials - Social proof reduces objections before FAQ */}
            <TestimonialsCarousel />
            
            {/* 8. FAQ - Lingering doubts addressed after testimonials */}
            <FAQSection />
            
            {/* 9. Newsletter - Commitment ask after full trust is built */}
            <NewsletterSection id="newsletter" />
          </main>
          <Footer />
        </div>
      )}
      <Toaster position="top-right" />
    </>
  );
}