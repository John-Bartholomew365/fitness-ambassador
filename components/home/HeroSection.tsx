import { motion, useReducedMotion, Easing } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { CountUp } from 'countup.js';

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as Easing },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as Easing },
    },
  };

  // Stats for counting animation - with different durations but same finish time
  const stats = [
    { id: 'participants', value: 500, suffix: '+', color: 'text-primary', duration: 3 }, // 3 seconds
    { id: 'experience', value: 7, suffix: '+', color: 'text-secondary', duration: 3 }, // 3 seconds 
    { id: 'events', value: 10, suffix: '+', color: 'text-accent', duration: 3 }, // 3 seconds
  ];

  // Initialize count-up animations only when stats section is in viewport
  useEffect(() => {
    if (hasAnimated || !statsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach((stat) => {
              // Start all counters at the same time with same duration
              setTimeout(() => {
                const counter = new CountUp(stat.id, stat.value, {
                  startVal: 0,
                  duration: stat.duration, // All 3 seconds
                  suffix: stat.suffix,
                  useEasing: true,
                  useGrouping: true,
                  separator: ',',
                  easingFn: (t, b, c, d) => {
                    // Ease out cubic for smoother finish
                    t /= d;
                    t--;
                    return c * (t * t * t + 1) + b;
                  }
                });

                if (!counter.error) {
                  counter.start();
                }
              }, 0); // Start all at the same time
            });

            setHasAnimated(true);
            observer.disconnect(); // Stop observing after animation
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(statsRef.current);

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section className="relative min-h-[80vh] lg:min-h-screen flex items-center pt-16 lg:pt-20 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover blur-sm"
        >
          <source src="/new-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 md:w-72 md:h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 md:w-96 md:h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />

      <div className="container-max px-4 md:px-8 py-8 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-block px-4 py-2 bg-white/10 text-white/70 rounded-full text-sm font-semibold">
                🏋️ Your Fitness Journey Starts Here
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl leading-tight md:leading-none mb-4 md:mb-6"
            >
              TRAIN WITH
              <br />
              <span className="text-gradient bg-clip-text text-transparent bg-linear-to-r from-[#008020] via-[#ffde00] to-[#ff8a00]">
                PURPOSE
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg lg:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 mb-6 md:mb-8"
            >
              Transform your body and mindset with Ajisafe Sulaiman — Nigeria&apos;s leading Fitness Ambassador with 7+ years of experience.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start mb-8 md:mb-12"
            >
              <Link href="/training" className="btn-primary text-sm md:text-base py-3 md:py-4 px-6 md:px-8">
                Book a Session
              </Link>
              <Link href="/events" className="btn-outline text-white text-sm md:text-base py-3 md:py-4 px-6 md:px-8">
                View Events
              </Link>
            </motion.div>

            {/* Stats - All finish at same time */}
            <motion.div
              ref={statsRef}
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 md:gap-4 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border"
            >
              {stats.map((stat) => (
                <div key={stat.id} className="text-center lg:text-left">
                  <p className={`font-display text-2xl md:text-3xl lg:text-4xl ${stat.color} mb-1`}>
                    <span id={stat.id}>0</span>
                  </p>
                  <p className="text-xs md:text-sm text-white/70">
                    {stat.id === 'participants' && 'Participants'}
                    {stat.id === 'experience' && 'Years Experience'}
                    {stat.id === 'events' && 'Major Events'}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative order-1 lg:order-2 mb-8 lg:mb-0"
          >
            <div className="relative z-10">
              <div className="relative aspect-square md:aspect-auto md:h-[400px] lg:h-[500px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl">
                <Image
                  src="/hero-secs.png"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  alt="Fitness Ambassador Ajisafe Sulaiman in action"
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative border */}
              <div className="absolute -inset-3 md:-inset-4 border-2 border-primary/20 rounded-2xl lg:rounded-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;