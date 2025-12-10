import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PageLoaderProps {
  onComplete?: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
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
          if (onComplete) {
            setTimeout(onComplete, 200);
          }
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center"
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-8 shadow-xl"
      >
        <span className="text-5xl font-bold text-primary-foreground">FA</span>
      </motion.div>

      {/* Progress Bar Container */}
      <div className="w-64 h-3 bg-muted rounded-full overflow-hidden relative">
        {/* Progress Bar */}
        <motion.div
          className="h-full bg-primary relative"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        >
          {/* Progress Text Inside Bar */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-foreground">
              {Math.round(progress)}%
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
