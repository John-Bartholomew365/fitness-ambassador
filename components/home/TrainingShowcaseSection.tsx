'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const TrainingShowcaseSection = () => {
  const trainingHighlights = [
    "Personalized workout plans tailored to your goals",
    "Proper form and technique correction",
    "Progressive overload strategies",
    "Accountability and motivation",
    "Nutrition and lifestyle guidance",
    "Injury prevention and recovery"
  ];

  return (
    <section className="py-20 md:py-28 px-4 md:px-8 bg-linear-to-b from-gray-50/30 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Video/Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-1 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] sm:h-[400px] md:h-[450px] lg:h-[620px]">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                poster="/training-poster.jpeg"
              >
                <source src="/training-session.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </div>

            {/* Decorative Elements - Responsive positioning */}
            <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 w-20 h-20 md:w-32 md:h-32 rounded-2xl md:rounded-3xl border-4 border-[#008020]/20 -z-10" />
            <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-[#ff8a00]/20 -z-10" />
          </motion.div>

          {/* Content Column - CENTERED ON SMALL SCREENS (except the list) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 lg:order-2"
          >
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[#008020]/10 mb-4 md:mb-6 mx-auto lg:mx-0">
                <span className="text-[#008020] font-semibold text-xs md:text-sm">Professional Training</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
                Transform Your Body with{' '}
                <span className="text-gradient">Expert Guidance</span>
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                With 7+ years of experience as a certified fitness coach, I provide personalized training 
                that delivers real, sustainable results. No gimmicks — just proven methods and dedicated support.
              </p>
            </div>

            {/* Highlights Grid - ALWAYS LEFT ALIGNED */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 md:gap-4 my-6 md:my-8">
              {trainingHighlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-2 md:gap-3"
                >
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#008020]/20 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#008020]" />
                  </div>
                  <span className="text-gray-700 text-sm md:text-base">{highlight}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA - CENTERED ON SMALL SCREENS */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8 justify-center lg:justify-start">
              <Link href="/training">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 md:px-8 py-3 md:py-4 bg-[#ff8a00] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#ff8a00]/25 transition-all duration-300 cursor-pointer text-sm md:text-base lg:w-auto w-full"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrainingShowcaseSection;