'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CountUp } from 'countup.js';

const StatsSection = () => {
  const stats = [
    {
      number: 7,
      suffix: "+",
      label: "Years of Experience",
      description: "Dedicated to transforming lives through fitness",
      color: "#008020"
    },
    {
      number: 5000,
      suffix: "+",
      label: "Community Members",
      description: "Strong and growing fitness community",
      color: "#ffde00"
    },
    {
      number: 15,
      suffix: "+",
      label: "Events Organized",
      description: "Innovative fitness experiences",
      color: "#ff8a00"
    },
    {
      number: 98,
      suffix: "%",
      label: "Success Rate",
      description: "Clients achieving their goals",
      color: "#008020"
    }
  ];

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
          if (!countUp.error) countUp.start();
        }
      };

      observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
      observer.observe(currentRef);

      return () => {
        if (observer && currentRef) observer.unobserve(currentRef);
      };
    }, [number, suffix, hasStarted]);

    return (
      <div
        ref={counterRef}
        className="text-5xl md:text-6xl font-bold mb-3"
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}80)`,
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
    <section className="py-20 md:py-24 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#008020]/10 mb-6">
            <span className="text-[#008020] font-semibold text-sm">Impact & Numbers</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Making a <span className="text-gradient">Difference</span>
          </h2>
          <p className="text-gray-600 text-[16px] lg:w-[450px] w-auto mx-auto leading-tight">
            Real results, real impact — transforming fitness journeys across communities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <AnimatedCounter number={stat.number} suffix={stat.suffix} color={stat.color} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{stat.label}</h3>
              <p className="text-gray-500 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;