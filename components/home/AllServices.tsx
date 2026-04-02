import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Define service item type
interface ServiceItem {
  title: string;
  description: string;
  highlights: string[];
  status: 'active' | 'upcoming';
  path: string;
  partner?: string; 
  type?: string;    
}

interface ServiceCategory {
  category: string;
  color: string;
  items: ServiceItem[];
}

const AllServicesOverviewSection = () => {
  const services: ServiceCategory[] = [
    {
      category: 'Signature Events',
      color: '#008020',
      items: [
        {
          title: 'Afro Groove',
          description: 'Cultural fitness collaboration with University of Ilorin',
          highlights: ['Cultural Integration', 'Academic Partnership', 'Community Building'],
          status: 'active',
          path: '/events/afro-groove',
          partner: 'University of Ilorin'
        },
        {
          title: 'Aerobics + Icebath',
          description: 'High-intensity workout followed by recovery immersion',
          highlights: ['Cardio Focus', 'Recovery Science', 'Holistic Approach'],
          status: 'active',
          path: '/events/aerobics-icebath',
          partner: 'Massage Alchemy'
        }
      ]
    },
    {
      category: 'Professional Development',
      color: '#ffde00',
      items: [
        {
          title: 'Certification Program',
          description: 'Become a certified fitness professional',
          highlights: ['Industry Standard', 'Practical Training', 'Career Path'],
          status: 'upcoming',
          path: '/training',
          type: 'Launching Q3 2024'
        },
        {
          title: 'Fitness Training',
          description: 'Personal consultation and one-on-one guidance',
          highlights: ['Personalized Plans', 'Expert Mentorship', 'Goal Setting'],
          status: 'active',
          path: '/training'
        }
      ]
    },
    {
      category: 'Lifestyle & Gear',
      color: '#ff8a00',
      items: [
        {
          title: 'FA Gym Wears',
          description: 'Premium fitness apparel line designed for performance',
          highlights: ['Performance Fabric', 'Functional Design', 'Brand Identity'],
          status: 'active',
          path: '/innovator/gym-wears'
        },
        {
          title: 'Wellness Collaborations',
          description: 'Partnerships with health and wellness brands',
          highlights: ['Brand Partnerships', 'Holistic Health', 'Cross-Promotion'],
          status: 'active',
          path: '/events/sponsors',
          type: 'Ongoing Initiatives'
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className=" px-4 md:px-8 bg-linear-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#008020]/10 text-[#008020] font-medium text-sm mb-6">
            Beyond the Core Three
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Complete <span className="text-gradient">Fitness</span> Ecosystem
          </h2>
          <p className="text-gray-600 text-[16px] lg:w-[470px] w-auto mx-auto leading-tight">
            Explore our additional services that complement your fitness journey with specialized experiences and resources.
          </p>
        </motion.div>

        <div className="space-y-20">
          {services.map((serviceCategory, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="relative"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-10">
                <div
                  className="w-4 h-12 rounded-full"
                  style={{ backgroundColor: serviceCategory.color }}
                />
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {serviceCategory.category}
                  </h3>
                  <div className="h-1 w-20 rounded-full mt-2 opacity-30"
                    style={{ backgroundColor: serviceCategory.color }}
                  />
                </div>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {serviceCategory.items.map((service, serviceIndex) => (
                  <motion.div
                    key={serviceIndex}
                    variants={itemVariants}
                    whileHover={{
                      y: -8,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    className="group relative"
                  >
                    <div className="bg-white rounded-3xl p-8 border-2 border-gray-200/80 hover:border-gray-300 transition-all duration-300 h-full">
                      {/* Status Badge */}
                      <div className="absolute top-6 right-6">
                        {service.status === 'upcoming' ? (
                          <span className="px-4 py-2 bg-[#ffde00]/20 text-[#ffde00] rounded-full text-sm font-semibold">
                            Coming Soon
                          </span>
                        ) : (
                          <span className="px-4 py-2 bg-[#008020]/20 text-[#008020] rounded-full text-sm font-semibold">
                            Available
                          </span>
                        )}
                      </div>

                      {/* Service Number */}
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mb-6"
                        style={{
                          backgroundColor: serviceCategory.color,
                          color: serviceCategory.color === '#ffde00' ? '#1f2937' : 'white'
                        }}
                      >
                        0{serviceIndex + 1}
                      </div>

                      {/* Title & Description */}
                      <h4 className="text-2xl font-bold text-gray-900 mb-3">
                        {service.title}
                      </h4>
                      <p className="text-gray-600 mb-6">
                        {service.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-3 mb-8">
                        {service.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: serviceCategory.color }}
                            />
                            <span className="text-gray-800 font-medium">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Additional Info - Check for optional properties */}
                      {service.partner && (
                        <div className="mb-6 p-4 rounded-xl bg-gray-50">
                          <div className="text-sm text-gray-500 mb-1">In Partnership With</div>
                          <div className="font-semibold text-gray-900">{service.partner}</div>
                        </div>
                      )}

                      {/* {service.type && (
                        <div className="mb-6">
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: serviceCategory.color }}
                            />
                            <span className="text-gray-700 font-medium">{service.type}</span>
                          </div>
                        </div>
                      )} */}

                      {/* Learn More Button */}
                      <div className="mt-auto pt-6 border-t border-gray-100">
                        <Link href={service.path}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-3 rounded-xl cursor-pointer font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                            style={{
                              backgroundColor: serviceCategory.color,
                              color: serviceCategory.color === '#ffde00' ? '#1f2937' : 'white'
                            }}
                          >
                            Learn More
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ecosystem CTA */}
        {/* Ecosystem CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="max-w-2xl mx-auto">
            {/* Single, clear message */}
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready for Your Transformation?
            </h3>
            <p className="text-gray-700 text-[16px] mb-10 lg:w-[480px] w-auto mx-auto leading-tight">
              Schedule a free consultation to get personalized guidance on which services will best help you achieve your fitness goals.
            </p>

            {/* Clean card with solid background */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200">
              <div className="space-y-6">
                <div className="flex justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#008020]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffde00]" />
                  <div className="w-3 h-3 rounded-full bg-[#ff8a00]" />
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-600 uppercase tracking-wider font-medium">
                    What You&apos;ll Get
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-gray-50">
                      <div className="text-lg font-bold text-gray-900 mb-1">30-Minute Session</div>
                      <div className="text-sm text-gray-600">Completely free</div>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50">
                      <div className="text-lg font-bold text-gray-900 mb-1">Personalized Plan</div>
                      <div className="text-sm text-gray-600">Tailored to your goals</div>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50">
                      <div className="text-lg font-bold text-gray-900 mb-1">No Pressure</div>
                      <div className="text-sm text-gray-600">No commitment required</div>
                    </div>
                  </div>
                </div>

                <Link href="/contact">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#008020",
                      color: "white"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full md:w-auto px-10 py-4 cursor-pointer bg-white text-[#008020] font-semibold rounded-xl border-2 border-[#008020] hover:shadow-xl"
                  >
                    Book Your Free Consultation
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AllServicesOverviewSection;