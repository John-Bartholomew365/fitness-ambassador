'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface PageLoaderProps {
  children: React.ReactNode;
}

export default function PageLoader({ children }: PageLoaderProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Reset on route change (deferred to avoid synchronous setState in effect)
    const resetTimer = setTimeout(() => {
      setIsLoading(true);
      setProgress(0);
      setHasLoaded(false);
    }, 0);

    const duration = 1500; // 1.5 seconds
    const interval = 20; // Update every 20ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
          }, 200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => {
      clearInterval(timer);
      clearTimeout(resetTimer);
    };
  }, [pathname]);

  return (
    <>
      {/* Loader Overlay */}
      {isLoading && (
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
      )}

      {/* Content */}
      <div className={`transition-opacity duration-300 ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}>
        {children}
      </div>
    </>
  );
}