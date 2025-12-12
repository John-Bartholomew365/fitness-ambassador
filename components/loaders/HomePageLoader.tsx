'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HomePageLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1500; // 1.5 seconds
    const interval = 20; // Update every 20ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-9999 bg-background flex flex-col items-center justify-center"
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative w-32 h-32 mb-8"
      >
        <Image
          src="/fa-logo3.png"
          alt="Fitness Ambassador Logo"
          fill
          sizes="128px"
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Progress Bar Container */}
      <div className="relative w-64 h-4 bg-muted rounded-full overflow-hidden">
        {/* Progress Bar */}
        <motion.div
          className="h-full bg-primary relative"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
        
        {/* Progress Text - CENTERED OVER THE BAR */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-foreground z-10">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}