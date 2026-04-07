'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HeroSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const services = useMemo(
    () => [
      'Professional Training',
      'Personalized Consultations',
      'Custom Programs',
      'Community Events',
      'Fitness Education',
      'Wellness Guidance'
    ],
    []
  );

  // Typing effect
  useEffect(() => {
    const currentService = services[currentWordIndex];
    const typeSpeed = isDeleting ? 40 : 80;
    const pauseTime = isDeleting ? 40 : 1800;

    if (!isDeleting && displayText === currentService) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }

    if (isDeleting && displayText === '') {
      timeoutRef.current = setTimeout(() => {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % services.length);
      }, 100);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }

    timeoutRef.current = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentService.substring(0, displayText.length - 1)
          : currentService.substring(0, displayText.length + 1)
      );
    }, typeSpeed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, currentWordIndex, services]);

  return (
    <section className="relative h-screen min-h-[700px] max-h-[900px] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/fa-trainer.jpeg"
        >
          <source src="/hero-training.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content - Centered */}
      <div className="relative z-10 h-full flex items-center justify-center text-center">
        <div className="container-max px-4 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight"
            >
              Transform Your
              <span className="block text-gradient">Fitness Journey</span>
            </motion.h1>

            {/* Typing Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mb-6"
            >
              <div className="text-white/80 text-lg mb-2">I specialize in</div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold min-h-[60px]">
                <span className="text-[#ffde00]">{displayText}</span>
                <span className="ml-1 animate-pulse text-white">|</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              7+ years of experience helping individuals transform their bodies, build lasting habits, 
              and achieve sustainable fitness results through personalized guidance and proven systems.
            </motion.p>

            {/* CTA Buttons - Centered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/training">
                <button className="w-full sm:w-auto px-8 py-4 bg-[#ff8a00] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#ff8a00]/25 transition-all duration-300 hover:scale-105 cursor-pointer">
                  Start Your Transformation
                </button>
              </Link>
              <Link href="#services">
                <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
                  Explore Services
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;