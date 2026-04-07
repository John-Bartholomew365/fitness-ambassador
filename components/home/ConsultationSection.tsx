'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ConsultationSection = () => {
  const benefits = [
    "Personalized fitness assessment",
    "Custom workout plan creation",
    "Nutrition and lifestyle guidance",
    "Goal setting and milestone tracking",
    "Ongoing support and accountability",
    "Progress monitoring and adjustments"
  ];

  return (
    <section className="py-20 md:py-28 px-4 md:px-8 bg-linear-to-b from-gray-50/30 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-linear-to-br from-[#008020] to-[#008020]/90" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
              backgroundSize: '50px 50px'
            }} />
          </div>

          <div className="relative z-10 p-8 md:p-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                <span className="text-white font-semibold text-sm">Personalized Guidance</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Transform Your Fitness Journey?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Book a free consultation and get a personalized roadmap to achieve your fitness goals.
                No pressure, no commitment — just expert guidance.
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                    <span className="text-white/90 text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-[#ff8a00] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#ff8a00]/25 transition-all duration-300 cursor-pointer"
                  >
                    Book Free Consultation
                  </motion.button>
                </Link>
                <Link href="/training">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    Explore Training Options
                  </motion.button>
                </Link>
              </div>

              <p className="text-white/70 text-sm mt-8">
                30-minute session · No obligation · 100% free
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;