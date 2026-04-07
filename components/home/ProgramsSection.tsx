'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const ProgramsSection = () => {
  const [activeProgram, setActiveProgram] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const programs = [
    {
      id: 'walk2fitness',
      title: 'Walk2Fitness',
      subtitle: 'Progressive Walking Series',
      description: 'A structured walking fitness series that transforms outdoor walking into results-driven workouts. Four progressive versions from beginner to advanced.',
      features: ['Structured Progression System', 'Outdoor Community Workouts', 'Measurable Fitness Milestones', 'Scalable Intensity Levels'],
      color: '#008020',
      versions: ['1.0 Foundations', '2.0 Endurance', '3.0 Strength', '4.0 Mastery', '5.0 Advanced'],
      link: '/events/walk2fitness',
      cta: 'Join the Movement'
    },
    {
      id: 'jam2fit',
      title: 'Jam2Fit',
      subtitle: "Ilorin's First Nighttime Fitness Party",
      description: 'Where fitness meets the night! Dance, sweat, and celebrate health under the stars with live DJs and an electric atmosphere. 400+ participants and growing.',
      features: ['Nighttime Fitness Experience', 'Live DJ & Curated Playlists', 'High-Energy Group Workouts', 'Community Celebration Atmosphere'],
      color: '#ffde00',
      versions: ['Edition 1',],
      link: '/events/jam2fit',
      cta: 'Join Waitlist'
    },
    {
      id: 'workoutcompass',
      title: 'Workout Compass',
      subtitle: 'Your Ultimate Fitness Guide',
      description: 'A practical fitness guide providing clear direction for beginners and experienced gym-goers. Transform uncertainty into structured, purposeful training.',
      features: ['Personalized Workout Planning', 'Training Split Guidance', 'Form Improvement Techniques', 'Progressive Overload Principles'],
      color: '#ff8a00',
      versions: ['Always Updated', 'Practical Templates', 'Actionable Advice'],
      link: '/innovator/workout-compass',
      cta: 'Get Your Copy'
    }
  ];

  // Auto-rotation logic
  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayTimerRef.current = setInterval(() => {
      setActiveProgram((prev) => (prev + 1) % programs.length);
    }, 7000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, programs.length]);

  const handleProgramChange = (index: number) => {
    setActiveProgram(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const activeProg = programs[activeProgram];

  // Function to get text color based on background color
  const getTextColor = (color: string) => {
    return color === '#ffde00' ? '#1f2937' : 'white';
  };

  return (
    <section className="py-20 md:py-28 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#008020]/10 mb-6">
            <span className="text-[#008020] font-semibold text-sm">Signature Programs</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Flagship <span className="text-gradient">Experiences</span>
          </h2>
          <p className="text-gray-600 text-[16px] lg:w-[450px] w-auto mx-auto leading-tight">
            Three unique pathways to transform your fitness journey
          </p>
        </motion.div>

        {/* Program Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          {programs.map((program, index) => (
            <button
              key={index}
              onClick={() => handleProgramChange(index)}
              className={`lg:px-6 px-3 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${activeProgram === index ? 'ring-4 ring-opacity-30' : 'hover:shadow-lg'}`}
              style={{
                backgroundColor: activeProgram === index ? program.color : 'white',
                color: activeProgram === index ? getTextColor(program.color) : program.color,
                border: `2px solid ${activeProgram === index ? program.color : '#e5e7eb'}`,
                boxShadow: activeProgram === index ? `0 0 0 4px ${program.color}20` : 'none'
              }}
            >
              {program.title}
            </button>
          ))}
        </div>

        {/* Active Program Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-gray-100"
            style={{
              borderColor: activeProg.color === '#ffde00' ? '#e5e7eb' : '#f3f4f6'
            }}
          >
            {/* Color Bar */}
            <div className="h-2" style={{ backgroundColor: activeProg.color }} />

            <div className="p-6 lg:p-12">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black"
                      style={{
                        backgroundColor: activeProg.color,
                        color: getTextColor(activeProg.color)
                      }}
                    >
                      0{activeProgram + 1}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">{activeProg.title}</h3>
                      <p className="text-gray-500 font-medium">{activeProg.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 lg:text-lg text-[16px] leading-tight mb-8">
                {activeProg.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {activeProg.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                      style={{
                        backgroundColor: activeProg.color,
                        color: getTextColor(activeProg.color)
                      }}
                    >
                      {index + 1}
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Versions */}
              <div className="mb-8">
                <div className="text-sm text-gray-500 mb-3">Program Versions</div>
                <div className="flex flex-wrap gap-2">
                  {activeProg.versions.map((version, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: `${activeProg.color}15`,
                        color: activeProg.color
                      }}
                    >
                      {version}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link href={activeProg.link}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto px-8 py-4 rounded-xl font-bold transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor: activeProg.color,
                    color: getTextColor(activeProg.color)
                  }}
                >
                  {activeProg.cta}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {programs.map((_, index) => (
            <button
              key={index}
              onClick={() => handleProgramChange(index)}
              className={`h-2 rounded-full transition-all duration-300 ${activeProgram === index ? 'w-8' : 'w-2'}`}
              style={{
                backgroundColor: activeProgram === index ? programs[activeProgram].color : '#d1d5db'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;