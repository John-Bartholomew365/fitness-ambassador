import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Recommendation {
  title: string;
  description: string;
  status: 'popular' | 'essential' | 'unique' | 'coming' | 'personal' | 'structured' | 'active' | 'available';
  link: string;
}

interface Path {
  id: string;
  title: string;
  description: string;
  color: string;
  recommendations: Recommendation[];
}

const GuidedUserPathSection = () => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const paths: Path[] = [
    {
      id: 'events',
      title: 'Community & Energy',
      description: 'Group experiences, vibrant atmosphere',
      color: '#008020',
      recommendations: [
        {
          title: 'Jam2Fit',
          description: 'Nighttime fitness party with 400+ participants',
          status: 'popular',
          link: '/events/jam2fit'
        },
        {
          title: 'Walk2Fitness',
          description: 'Progressive walking series with community vibe',
          status: 'active',
          link: '/events/walk2fitness'
        },
        {
          title: 'Afro Groove',
          description: 'Cultural fitness experience with university collaboration',
          status: 'unique',
          link: '/events/afro-groove'
        }
      ]
    },
    {
      id: 'structure',
      title: 'Structure & Guidance',
      description: 'Clear direction, proven systems',
      color: '#ffde00',
      recommendations: [
        {
          title: 'Workout Compass',
          description: 'Practical guide with structured workout plans',
          status: 'essential',
          link: '/resources/workout-compass'
        },
        {
          title: 'Fitness Training',
          description: 'One-on-one consultation for personalized guidance',
          status: 'personal',
          link: '/services/training'
        },
        {
          title: 'Walk2Fitness Progression',
          description: 'Structured walking program with clear milestones',
          status: 'structured',
          link: '/events/walk2fitness#progression'
        }
      ]
    },
    {
      id: 'wellness',
      title: 'Balance & Recovery',
      description: 'Holistic wellness, recovery focus',
      color: '#ff8a00',
      recommendations: [
        {
          title: 'Aerobics + Icebath',
          description: 'Workout combined with recovery experience',
          status: 'unique',
          link: '/services/aerobics-icebath'
        },
        {
          title: 'Future Wellness Programs',
          description: 'Upcoming holistic wellness offerings',
          status: 'coming',
          link: '/services/wellness'
        }
      ]
    },
    {
      id: 'development',
      title: 'Growth & Professional',
      description: 'Skill building, career development',
      color: '#008020',
      recommendations: [
        {
          title: 'Certification Program',
          description: 'Become a certified fitness professional',
          status: 'coming',
          link: '/certification'
        },
        {
          title: 'FA Gym Wears',
          description: 'Performance apparel for serious fitness enthusiasts',
          status: 'active',
          link: '/store/gym-wears'
        },
        {
          title: 'Advanced Training',
          description: 'Specialized fitness consultation',
          status: 'available',
          link: '/services/advanced-training'
        }
      ]
    }
  ];

  const handlePathSelect = (pathId: string): void => {
    setSelectedPath(selectedPath === pathId ? null : pathId);
  };

  const getStatusColor = (status: string): string => {
    const statusMap: Record<string, string> = {
      'popular': 'bg-[#008020]/10 text-[#008020]',
      'essential': 'bg-[#ffde00]/20 text-gray-900',
      'unique': 'bg-[#ff8a00]/10 text-[#ff8a00]',
      'coming': 'bg-gray-100 text-gray-600',
      'personal': 'bg-[#008020]/10 text-[#008020]',
      'structured': 'bg-[#ffde00]/20 text-gray-900',
      'active': 'bg-[#008020]/10 text-[#008020]',
      'available': 'bg-gray-100 text-gray-600'
    };
    return statusMap[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusText = (status: string): string => {
    const statusTextMap: Record<string, string> = {
      'popular': 'Community Favorite',
      'essential': 'Core Program',
      'unique': 'Exclusive Experience',
      'coming': 'Launching Soon',
      'personal': 'One-on-One',
      'structured': 'Step-by-Step',
      'active': 'Currently Running',
      'available': 'Ready to Start'
    };
    return statusTextMap[status] || status;
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Which <span className="text-gradient">Fitness</span> Path<br />Fits You Best?
          </h2>
          <p className="text-gray-600 text-[16px] lg:w-[470px] mx-auto leading-tight">
            Select what resonates most with you. We&apos;ll show personalized recommendations that match your fitness personality.
          </p>
        </motion.div>

        <div className="space-y-8">
          {paths.map((path, index) => {
            const isSelected = selectedPath === path.id;

            return (
              <div key={path.id} className="relative">
                {/* Path Card - Always visible */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handlePathSelect(path.id)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${isSelected ? 'ring-4 ring-opacity-30 z-10' : 'hover:shadow-lg'}`}
                  style={{
                    backgroundColor: isSelected ? `${path.color}08` : 'white',
                    border: `2px solid ${isSelected ? path.color : '#f3f4f6'}`,
                    boxShadow: isSelected ? `0 20px 40px ${path.color}20` : '0 4px 20px rgba(0,0,0,0.05)'
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0"
                      style={{
                        backgroundColor: isSelected ? path.color : `${path.color}15`,
                        color: isSelected ? (path.color === '#ffde00' ? '#1f2937' : 'white') : path.color
                      }}
                    >
                      0{index + 1}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {path.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {path.description}
                      </p>

                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${isSelected ? 'bg-white' : 'bg-gray-100'}`}
                        style={{ color: path.color }}
                      >
                        <span>{isSelected ? '✓ Selected - View recommendations below' : 'Click to explore recommendations'}</span>
                        <motion.svg
                          animate={{ rotate: isSelected ? 180 : 0 }}
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </div>
                    </div>
                  </div>
                </motion.button>

                {/* Recommendations Panel - Shows below each selected path */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      key={`panel-${path.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: 'auto',
                        transition: {
                          opacity: { duration: 0.3 },
                          height: { type: "spring", stiffness: 300, damping: 25 }
                        }
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        transition: { duration: 0.2 }
                      }}
                      className="mt-4"
                    >
                      <div className="bg-white rounded-2xl border-2 p-6 md:p-8 shadow-lg"
                        style={{ borderColor: `${path.color}30` }}
                      >
                        <div className="flex items-center justify-between mb-8">
                          <div>
                            <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                              Perfect Matches for You
                            </h4>
                            <p className="text-gray-600">
                              Based on your choice of &quot;{path.title}&quot;
                            </p>
                          </div>
                          <button
                            onClick={() => setSelectedPath(null)}
                            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors shrink-0"
                          >
                            <span className="text-xl">×</span>
                          </button>
                        </div>

                        {/* Recommendations - Responsive grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                          {path.recommendations.map((rec, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-xl p-4 md:p-6 hover:bg-gray-100 transition-colors">
                              <div className="flex items-start justify-between mb-3">
                                <h5 className="font-bold text-gray-900">{rec.title}</h5>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rec.status)}`}>
                                  {getStatusText(rec.status)}
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm mb-4">
                                {rec.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                  {rec.status === 'coming' ? 'Launching soon' : 'Available now'}
                                </span>
                                <Link href={rec.link}>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-3 py-1.5 cursor-pointer md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300"
                                    style={{
                                      backgroundColor: path.color,
                                      color: path.color === '#ffde00' ? '#1f2937' : 'white'
                                    }}
                                  >
                                    Explore {rec.title.split(' ')[0]}
                                  </motion.button>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                          <p className="text-gray-600 text-sm md:text-base">
                            Each recommendation is designed to work together. Start with one, and naturally explore others.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Helper Text - Shows when nothing is selected */}
        {!selectedPath && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg border border-gray-200">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[#008020] animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-[#ffde00] animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-[#ff8a00] animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
              <span className="text-gray-700 font-medium">
                Click on any path above to see personalized recommendations
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GuidedUserPathSection;