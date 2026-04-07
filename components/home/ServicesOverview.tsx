'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ServicesOverviewSection = () => {
    const services = [
        {
            title: "Personal Training",
            description: "One-on-one coaching tailored to your goals, fitness level, and schedule. Get expert guidance, form correction, and accountability.",
            features: ["Custom Workout Plans", "Form & Technique Coaching", "Progress Tracking", "Nutrition Guidance"],
            color: "#008020",
            link: "/training",
            cta: "Start Training"
        },
        {
            title: "Fitness Consultation",
            description: "Comprehensive assessment and personalized roadmap to achieve your fitness goals efficiently and sustainably.",
            features: ["Goal Assessment", "Body Composition Analysis", "Personalized Roadmap", "Ongoing Support"],
            color: "#ffde00",
            link: "/contact",
            cta: "Book Consultation"
        },
        {
            title: "Wellness Programs",
            description: "Structured programs designed for sustainable transformation, combining workouts, recovery, and lifestyle habits.",
            features: ["Walk2Fitness Series", "Workout Compass Guide", "Group Training", "Accountability System"],
            color: "#ff8a00",
            link: "/events/walk2fitness",
            cta: "Explore Walk2Fitness"
        },
        {
            title: "Community Events",
            description: "Join vibrant fitness experiences that make working out fun, social, and memorable.",
            features: ["Jam2Fit Night Parties", "Afro Groove Sessions", "Aerobics + Icebath", "Community Walks"],
            color: "#008020",
            link: "/events",
            cta: "View Events"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section id="services" className="py-20 md:py-28 px-4 md:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#008020]/10 mb-6">
                        <span className="text-[#008020] font-semibold text-sm">What I Offer</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Comprehensive <span className="text-gradient">Fitness Services</span>
                    </h2>
                    <p className="text-gray-600 text-[16px] lg:w-[500px] w-auto mx-auto leading-tight">
                        Everything you need to transform your fitness journey — from expert coaching to community experiences
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="group"
                        >
                            <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 h-full">
                                {/* Service Number */}
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mb-6"
                                    style={{
                                        backgroundColor: service.color,
                                        color: service.color === '#ffde00' ? '#1f2937' : 'white'
                                    }}
                                >
                                    0{index + 1}
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                                {/* Features */}
                                <div className="space-y-3 mb-8">
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.color }} />
                                            <span className="text-gray-700 text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <Link href={service.link}>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer"
                                        style={{
                                            backgroundColor: service.color,
                                            color: service.color === '#ffde00' ? '#1f2937' : 'white'
                                        }}
                                    >
                                        {service.cta}
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesOverviewSection;