import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FlagshipExperiencesSection = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [userHasInteracted, setUserHasInteracted] = useState<boolean>(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastInteractionTimeRef = useRef<number>(0);

  const experiences = [
    {
      id: 'walk2fitness',
      title: 'Walk2Fitness',
      version: '1.0 - 4.0',
      description: 'A progressive walking fitness series experienced by thousands, transforming outdoor walking into structured, results-driven workouts. Each edition builds on the last, creating a clear journey from beginner to advanced.',
      features: ['Structured Progression System', 'Outdoor Community Workouts', 'Measurable Fitness Milestones', 'Scalable Intensity Levels'],
      color: '#008020',
      nextEvent: 'To be announced soon',
      programPath: ['Foundations', 'Endurance', 'Strength', 'Mastery'],
      joinLink: 'https://www.tixtango.com/spotlight/walk2fitness-50',
      isExternal: true, // Added this flag for external links
      joinText: 'Register Now',
      detailsLink: '/events/walk2fitness',
      detailsText: 'View Edition Details'
    },
    {
      id: 'jam2fit',
      title: 'Jam2Fit',
      version: '400+ Participants',
      stat: '',
      description: 'Ilorin\'s first nighttime fitness party that combines high-energy music with structured workouts. Experience fitness reimagined as celebration.',
      features: ['Nighttime Fitness Experience', 'Live DJ & Curated Playlists', 'High-Energy Group Workouts', 'Community Celebration Atmosphere'],
      color: '#ffde00',
      joinLink: '/events/jam2fit',
      isExternal: false,
      joinText: 'Learn More',
      detailsLink: '/gallery',
      detailsText: 'See Event Gallery'
    },
    {
      id: 'workoutcompass',
      title: 'Workout Compass',
      version: 'Always Updated',
      stat: '',
      description: 'A practical fitness guide providing clear direction for beginners and experienced gym-goers. Transform uncertainty into structured, purposeful training.',
      features: ['Personalized Workout Planning', 'Training Split Guidance', 'Form Improvement Techniques', 'Progressive Overload Principles'],
      color: '#ff8a00',
      includes: ['Stretching Routines', 'Simple Dietary Tips', 'Program Templates', 'Progression Guide'],
      joinLink: '/book',
      isExternal: false,
      joinText: 'Get Your Copy',
      detailsLink: '#',
      detailsText: 'Meet the Author'
    }
  ];

  // Initialize the ref after component mounts
  useEffect(() => {
    lastInteractionTimeRef.current = Date.now();
  }, []);

  // Handle user interaction: pause auto-play
  const handleUserInteraction = (index?: number) => {
    if (index !== undefined) {
      setActiveIndex(index);
    }

    setIsAutoPlaying(false);
    setUserHasInteracted(true);

    // Clear any existing resume timer
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }

    // Resume auto-play after 10 seconds of inactivity
    resumeTimerRef.current = setTimeout(() => {
      if (userHasInteracted) {
        setIsAutoPlaying(true);
      }
    }, 10000); // 10 seconds
  };

  // Auto-rotation logic
  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % experiences.length);
    }, 8000); // 8 seconds per slide

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying, experiences.length]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const activeExp = experiences[activeIndex];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#008020]/10 mb-6">
            <span className="text-[#008020] font-semibold text-sm">Three Flagship Pathways</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Choose Your <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-gray-600 text-[16px] lg:w-[330px] w-auto leading-tight mx-auto">
            Different approaches, same destination: Your fitness transformation.
          </p>
        </motion.div>

        {/* Visual Indicator - Timeline with Auto-Play Status */}
        <div className="relative max-w-2xl mx-auto mb-10 md:mb-16">
          <div className="flex justify-center items-center gap-4 md:gap-8">
            {experiences.map((exp, index) => (
              <React.Fragment key={exp.id}>
                <button
                  onClick={() => handleUserInteraction(index)}
                  onTouchStart={() => handleUserInteraction(index)}
                  className="relative z-10 flex flex-col items-center focus:outline-none"
                  aria-label={`View ${exp.title} program`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black transition-all duration-500 ${activeIndex === index ? 'scale-110' : 'scale-100 opacity-70'}`}
                    style={{
                      backgroundColor: activeIndex === index ? exp.color : `${exp.color}20`,
                      color: activeIndex === index ? (exp.color === '#ffde00' ? '#1f2937' : 'white') : exp.color
                    }}
                  >
                    0{index + 1}
                  </div>
                  <span
                    className={`mt-3 font-bold transition-all duration-300 ${activeIndex === index ? 'text-gray-900 text-lg' : 'text-gray-500'}`}
                  >
                    {exp.title}
                  </span>
                  <span
                    className={`text-xs font-semibold mt-1 px-2 py-0.5 rounded-full transition-all duration-300 ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      backgroundColor: `${exp.color}20`,
                      color: exp.color
                    }}
                  >
                    {exp.version}
                  </span>
                </button>

                {index < experiences.length - 1 && (
                  <div className="h-0.5 w-16 bg-gray-300/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{
                        width: activeIndex > index ? '100%' : '0%'
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="h-full"
                      style={{ backgroundColor: experiences[index].color }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Auto-Play Status Indicator */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-[#008020] animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-sm text-gray-600">
              {isAutoPlaying ? 'Auto-rotating' : 'Paused - tap to resume'}
            </span>
          </div>
        </div>

        {/* Main Content Area - Pauses on hover/touch */}
        <div
          onMouseEnter={() => handleUserInteraction()}
          onTouchStart={() => handleUserInteraction()}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExp.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{
                opacity: { duration: 0.4 },
                x: { type: "spring", stiffness: 300, damping: 30 }
              }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Auto-Play Pause/Resume Button */}
              <div className="absolute top-6 right-6 z-10">
                <button
                  onClick={() => {
                    if (isAutoPlaying) {
                      handleUserInteraction();
                    } else {
                      setIsAutoPlaying(true);
                    }
                  }}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                  aria-label={isAutoPlaying ? 'Pause auto-rotation' : 'Resume auto-rotation'}
                >
                  {isAutoPlaying ? (
                    <span className="text-gray-700 font-bold text-lg">⏸</span>
                  ) : (
                    <span className="text-[#008020] font-bold text-lg">▶</span>
                  )}
                </button>
              </div>

              {/* Color Accent Header */}
              <div className="relative h-3 overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: activeExp.color }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>

              <div className="p-5 lg:p-12">
                {/* Program Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="lg:w-20 w-16 lg:h-20 h-16 rounded-2xl flex items-center justify-center lg:text-3xl text-[24px] font-black"
                        style={{
                          backgroundColor: activeExp.color,
                          color: activeExp.color === '#ffde00' ? '#1f2937' : 'white'
                        }}
                      >
                        0{activeIndex + 1}
                      </div>
                      <div>
                        <h3 className="text-[28px] lg:text-4xl font-bold text-gray-900">
                          {activeExp.title}
                        </h3>
                        <div className="flex items-center gap-3 lg:mt-2 mt-[8px]">
                          <span
                            className="px-4 py-1.5 rounded-full text-sm font-bold"
                            style={{
                              backgroundColor: `${activeExp.color}15`,
                              color: activeExp.color
                            }}
                          >
                            {activeExp.version}
                          </span>
                          <span className="text-gray-600 font-semibold">
                            {activeExp.stat}
                          </span>
                        </div>
                      </div>
                    </div>

                    {activeExp.nextEvent && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#008020]/10 rounded-lg mt-4">
                        <span className="font-bold text-gray-900 lg:text-[16px] text-[14px]">Next Event:</span>
                        <span className="font-semibold text-gray-700 lg:text-[16px] text-[14px] italic">{activeExp.nextEvent}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-12">
                  <div className="h-1 w-16 bg-gray-300/50 rounded-full mb-6 overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: activeExp.color }}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    />
                  </div>
                  <p className="text-gray-700 lg:text-[18px] text-[16px] leading-relaxed max-w-3xl">
                    {activeExp.description}
                  </p>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {activeExp.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl border border-gray-200/80 hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold"
                          style={{
                            backgroundColor: activeExp.color,
                            color: activeExp.color === '#ffde00' ? '#1f2937' : 'white'
                          }}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-2">{feature}</h4>
                          <p className="text-gray-600 text-sm">
                            {activeExp.id === 'walk2fitness' && 'Systematic advancement through four distinct levels.'}
                            {activeExp.id === 'jam2fit' && 'Monthly events that transform workouts into celebrations.'}
                            {activeExp.id === 'workoutcompass' && 'Clear, actionable guidance for consistent progress.'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Program-Specific Details */}
                {activeExp.programPath && (
                  <div className="mb-12">
                    <h4 className="text-2xl font-bold text-gray-900 mb-8">Your Progression Path</h4>
                    <div className="flex flex-wrap gap-4">
                      {activeExp.programPath.map((step, index) => (
                        <div key={index} className="flex-1 min-w-[140px]">
                          <div
                            className="h-2 rounded-full mb-3"
                            style={{ backgroundColor: `${activeExp.color}${20 + index * 20}` }}
                          />
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                              style={{ backgroundColor: activeExp.color }}
                            >
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">Level {index + 1}</div>
                              <div className="text-gray-600 text-sm">{step}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeExp.includes && (
                  <div className="p-8 rounded-2xl mb-12" style={{ backgroundColor: `${activeExp.color}08` }}>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl font-bold" style={{ color: activeExp.color }}>+</span>
                      <h4 className="text-2xl font-bold text-gray-900">Complete Package Includes</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeExp.includes.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-white/80 rounded-lg">
                          <span className="font-bold" style={{ color: activeExp.color }}>{index + 1}.</span>
                          <span className="text-gray-800 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Call to Action */}
                <div className="pt-8 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Primary CTA Button - External link opens in new tab for Walk2Fitness */}
                    <a
                      href={activeExp.joinLink}
                      target={activeExp.isExternal ? "_blank" : "_self"}
                      rel={activeExp.isExternal ? "noopener noreferrer" : ""}
                      className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl flex-1 text-center"
                      style={{
                        backgroundColor: activeExp.color,
                        color: activeExp.color === '#ffde00' ? '#1f2937' : 'white'
                      }}
                    >
                      {activeExp.joinText}
                    </a>
                    <a
                      href={activeExp.detailsLink}
                      className="px-8 py-4 rounded-xl font-bold text-lg border-2 transition-all duration-300 hover:shadow-lg flex-1 text-center"
                      style={{
                        borderColor: activeExp.color,
                        color: activeExp.color,
                        backgroundColor: `${activeExp.color}08`
                      }}
                    >
                      {activeExp.detailsText}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Hint with Status */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                {experiences.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleUserInteraction(index)}
                    className={`w-3 h-3 rounded-full transition-all ${activeIndex === index ? 'scale-125' : ''}`}
                    style={{
                      backgroundColor: activeIndex === index ? activeExp.color : '#d1d5db'
                    }}
                    aria-label={`Go to program ${index + 1}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {isAutoPlaying ? 'Scrolls automatically' : 'Click dots or numbers'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlagshipExperiencesSection;