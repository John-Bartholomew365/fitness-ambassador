import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const phrases = [
  'YOUR Fitness Event Plug',
  'YOUR Certified Personal Trainer',
  'YOUR Fitness Knowledge & Lifestyle Source',
];

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [welcomeLetters, setWelcomeLetters] = useState<string[]>([]);
  const [isWelcomeComplete, setIsWelcomeComplete] = useState(false);

  // "WELCOME TO" letters
  const welcomeText = "WELCOME TO";

  // Top half-circle positions for "WELCOME TO" - CURVING UPWARD
  const getTopHalfCirclePosition = (index: number, total: number) => {
    // For an upward curve, we use angles from -150° to -30° (or 210° to 330°)
    // This creates a nice arc that curves upward
    const startAngle = -150;  // Start from left side, pointing up
    const endAngle = -30;     // End at right side, pointing up
    const angle = startAngle + (index / (total - 1)) * (endAngle - startAngle);
    
    // Convert to radians
    const radians = (angle * Math.PI) / 180;
    
    // Different radius for different screen sizes - reduced on mobile
    const radius = typeof window !== 'undefined' ? 
      window.innerWidth < 640 ? 55 :  // Mobile - reduced from 75
      window.innerWidth < 768 ? 65 :  // Small tablet
      window.innerWidth < 1024 ? 85 : // Tablet
      100 : 100;                      // Desktop (unchanged)
    
    // Calculate position - for upward curve, Y should be negative (above center)
    const x = Math.cos(radians) * radius;
    const y = Math.sin(radians) * radius;
    
    // Rotation - for upward curve, text should point upward/outward
    const rotation = angle + 90; // Adjust for upward orientation
    
    return { x, y, rotation, angle };
  };

  // Animate welcome letters one by one
  useEffect(() => {
    if (!isWelcomeComplete && welcomeLetters.length < welcomeText.length) {
      const timer = setTimeout(() => {
        setWelcomeLetters(prev => [...prev, welcomeText[welcomeLetters.length]]);
      }, 100);
      
      return () => clearTimeout(timer);
    } else if (!isWelcomeComplete && welcomeLetters.length === welcomeText.length) {
      setTimeout(() => setIsWelcomeComplete(true), 0);
    }
  }, [welcomeLetters, isWelcomeComplete]);

  // Typewriter effect with auto-routing
  useEffect(() => {
    if (showFinal) {
      // Auto-route immediately after showing "ALL IN ONE PLACE"
      const timer = setTimeout(() => {
        onComplete();
      }, 1000); // Reduced delay for faster routing
      return () => clearTimeout(timer);
    }

    const currentText = phrases[currentPhrase];
    const typeSpeed = isDeleting ? 30 : 50;

    if (!isDeleting && displayText === currentText) {
      if (currentPhrase === phrases.length - 1) {
        setTimeout(() => setShowFinal(true), 500);
        return;
      }
      setTimeout(() => setIsDeleting(true), 500);
      return;
    }

    if (isDeleting && displayText === '') {
      setTimeout(() => {
        setIsDeleting(false);
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      }, 0);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? currentText.substring(0, prev.length - 1)
          : currentText.substring(0, prev.length + 1)
      );
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhrase, showFinal, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-background flex items-center justify-center px-4"
    >
      <div className="relative w-full max-w-2xl flex flex-col items-center justify-center">
        {/* Complete Circle Composition */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 flex items-center justify-center mb-0 sm:mb-0 md:mb-2 lg:mb-4">
          
          {/* TOP HALF-CIRCLE: "WELCOME TO" - CURVING UPWARD */}
          <div className="absolute top-0 sm:top-0 md:top-1 lg:top-2 left-1/2 transform -translate-x-1/2 w-full h-16 sm:h-20 md:h-28 lg:h-36 overflow-visible">
            {welcomeText.split('').map((letter, index) => {
              const position = getTopHalfCirclePosition(index, welcomeText.length);
              const isVisible = index < welcomeLetters.length;
              
              // Responsive font sizes - smaller on mobile
              const fontSize = typeof window !== 'undefined' ? 
                window.innerWidth < 640 ? 'text-[22px]' :
                window.innerWidth < 768 ? 'text-[26px]' :
                window.innerWidth < 1024 ? 'text-2xl' :
                'text-4xl' : 'text-4xl';
              
              // Responsive vertical offset - reduced on mobile
              const verticalOffset = typeof window !== 'undefined' ? 
                window.innerWidth < 640 ? 12 :  // Reduced from 18
                window.innerWidth < 768 ? 15 :
                window.innerWidth < 1024 ? 20 :
                25 : 25;
              
              return (
                <motion.span
                  key={index}
                  initial={{ 
                    opacity: 0, 
                    x: position.x - 30, 
                    y: position.y - 60,
                    rotate: position.rotation,
                    scale: 0.3 
                  }}
                  animate={isVisible ? { 
                    opacity: 1, 
                    x: position.x, 
                    y: position.y - verticalOffset,
                    rotate: position.rotation,
                    scale: 1 
                  } : {}}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 12
                  }}
                  className={`absolute font-bold text-foreground font-display whitespace-nowrap ${fontSize}`}
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: 'center center'
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              );
            })}
          </div>

          {/* CENTER: Logo positioned in the middle - INCREASED SIZE ON MOBILE */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: welcomeText.length * 0.1 + 0.4,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="relative w-24 h-24 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-30 lg:h-30">
              <Image 
                src="/fa-logo3.png" 
                alt="Fitness Ambassador Logo" 
                width={144} 
                height={144} 
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Typewriter Effect for Phrases - Reduced spacing on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: welcomeText.length * 0.1 + 0.9,
            duration: 0.6 
          }}
          className="mt-1 sm:mt-1 md:mt-2 lg:mt-3 flex items-center justify-center"
        >
          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!showFinal ? (
                <motion.div
                  key="typewriter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm sm:text-base md:text-xl lg:text-2xl font-semibold text-primary font-sans flex items-center text-center px-4"
                >
                  <div className="text-center leading-relaxed min-h-[18px] sm:min-h-[20px] md:min-h-[24px] lg:min-h-[32px]">
                    {displayText}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                      className="ml-1"
                    >
                      |
                    </motion.span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="final"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-accent font-display text-center px-4"
                >
                  <div className="text-center text-gradient leading-relaxed">
                    ALL IN ONE PLACE
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}