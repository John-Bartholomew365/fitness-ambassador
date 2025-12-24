import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CountUp } from 'countup.js';

const ExperienceOverviewSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const stats = [
    {
      number: 500,
      suffix: "+",
      label: "Community Events",
      color: "#008020",
      desc: "Join thousands of like-minded individuals in dynamic, energizing fitness experiences that transform workouts into celebrations."
    },
    {
      number: 98,
      suffix: "%",
      label: "Success Rate",
      color: "#ffde00",
      desc: "Access proven systems and practical tools that provide clarity, build confidence, and ensure consistent progress."
    },
    {
      number: 360,
      suffix: "°",
      label: "Holistic Approach",
      color: "#ff8a00",
      desc: "From apparel to professional development, everything needed for a complete fitness lifestyle in one connected platform."
    }
  ];

  const features = [
    {
      title: "Personalized Workouts",
      description: "Routines tailored to your goals, fitness level, and preferences to help you train with clarity and purpose.",
      color: "#008020",
      accent: "bg-[#008020]"
    },
    {
      title: "Expert Coaching",
      description: "Connect with certified trainers for guidance, form checks, and personalized advice anytime.",
      color: "#ffde00",
      accent: "bg-[#ffde00]"
    },
    {
      title: "Progress Tracking",
      description: "Comprehensive analytics and insights to monitor your journey and celebrate milestones.",
      color: "#ff8a00",
      accent: "bg-[#ff8a00]"
    }
  ];

  // CountUp component wrapper
  interface AnimatedCounterProps {
    number: number;
    suffix: string;
    color: string;
  }

  const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ number, suffix, color }) => {
    const [hasStarted, setHasStarted] = useState<boolean>(false);
    const counterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!counterRef.current) return;

      // Store the current ref value in a variable to use in cleanup
      const currentRef = counterRef.current;
      let observer: IntersectionObserver | null = null;

      const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);

          const countUp = new CountUp(currentRef, number, {
            startVal: 0,
            duration: 2.5,
            suffix: suffix,
            useEasing: true,
            separator: ',',
          });

          if (!countUp.error) {
            countUp.start();
          } else {
            console.error(countUp.error);
          }
        }
      };

      observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
      observer.observe(currentRef);

      return () => {
        if (observer && currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, [number, suffix, hasStarted]);

    return (
      <div
        ref={counterRef}
        className={`text-5xl md:text-6xl font-bold mb-4`}
        style={{
          background: `linear-gradient(to right, ${color}, ${color}80)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        0{suffix}
      </div>
    );
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-b from-white to-[#008020]/5">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-1.5 rounded-full bg-[#008020]/10 text-[#008020] font-medium text-sm mb-6 border border-[#008020]/20"
          >
            Transform Your Fitness Journey
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight"
          >
            Elevate Your <span className="text-gradient">Potential</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-[16px] text-gray-600 lg:w-[530px] w-auto mx-auto leading-tight"
          >
            A vibrant ecosystem where movement meets community, structure meets freedom, and every fitness journey finds its rhythm.
          </motion.p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{
                y: -6,
                transition: { duration: 0.3, ease: "easeOut" as const }
              }}
              className={`rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-100`}
            >
              {/* Animated Number */}
              <AnimatedCounter
                number={stat.number}
                suffix={stat.suffix}
                color={stat.color}
              />

              <h3 className="text-2xl font-bold text-gray-900 mb-4">{stat.label}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Makes Us <span className="text-gradient">Different</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.3, ease: "easeOut" as const }
                }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg border border-gray-200 h-full">
                  {/* Color Accent Bar with brand colors */}
                  <div
                    className="absolute top-0 left-0 w-2 h-full"
                    style={{ backgroundColor: feature.color }}
                  />

                  {/* Feature Header */}
                  <div className="flex items-center mb-6">
                    <div
                      className="w-8 h-8 rounded-full mr-4 flex items-center justify-center"
                      style={{
                        backgroundColor: `${feature.color}20`,
                        border: `2px solid ${feature.color}40`
                      }}
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: feature.color }}
                      />
                    </div>
                    <h4
                      className="text-xl font-bold text-gray-900"
                      style={{ color: feature.color }}
                    >
                      {feature.title}
                    </h4>
                  </div>

                  <p className="text-gray-600 text-[16px] leading-tight mb-8">
                    {feature.description}
                  </p>

                  {/* Progress Indicator */}
                  <div className="relative pt-4">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 1, ease: "easeOut" as const }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: feature.color }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>Beginner</span>
                      <span className="font-semibold">Pro Level</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, #008020 0%, #008020dd 100%)'
          }}
        >
          {/* Simple pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
              backgroundSize: '50px 50px'
            }} />
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Transformation?
            </h3>
            <p className="text-[16px] text-white/90 mb-8 lg:w-[400px] w-auto mx-auto">
              Join thousands who&apos;ve found their fitness rhythm and achieved remarkable results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/start-free-trial"
                whileHover={{ scale: 1.05, backgroundColor: "#ffde00", color: "#000" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white cursor-pointer text-[#008020] font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 text-center"
                style={{ fontWeight: "600" }}
              >
                Start Free Trial
              </motion.a>

              <motion.a
                href="/book-demo"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#008020",
                  color: "white",
                  border: "2px solid white",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#ffde00] cursor-pointer text-gray-900 font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent text-center"
                style={{ fontWeight: "600" }}
              >
                Book a Demo
              </motion.a>
            </div>

          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-[20px] lg:text-[25px] text-gray-800 font-light italic mb-8 leading-tight">
              Whether you&apos;re taking your first steps or leveling up your fitness game, there&apos;s a place for you here!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceOverviewSection;