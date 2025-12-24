import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Walk2FitnessVestPage = () => {
    // Vest options data
    const vestOptions = [
        {
            color: '#008020',
            name: 'Forest Green',
            hex: '#008020',
            description: 'Primary event color - symbolizes growth and vitality'
        },
        {
            color: '#ffde00',
            name: 'Sunshine Yellow',
            hex: '#ffde00',
            description: 'Bright and energetic - represents energy and optimism'
        },
        {
            color: '#ff8a00',
            name: 'Sunset Orange',
            hex: '#ff8a00',
            description: 'Vibrant and dynamic - embodies passion and movement'
        },
        {
            color: '#1e40af',
            name: 'Royal Blue',
            hex: '#1e40af',
            description: 'Trust and reliability - classic and professional'
        }
    ];

    // Event day schedule
    const eventSchedule = [
        {
            time: '6:30 AM',
            activity: 'Arrival & Check-in',
            description: 'Welcome and event kit distribution'
        },
        {
            time: '7:00 AM',
            activity: 'Opening & Warm-up',
            description: 'Group stretching and safety briefing'
        },
        {
            time: '7:30 AM',
            activity: 'Guided Group Walk',
            description: 'Structured walking session with pace groups'
        },
        {
            time: '8:30 AM',
            activity: 'Community Conversations',
            description: 'Networking and wellness discussions'
        },
        {
            time: '9:00 AM',
            activity: 'Free Medical Screening',
            description: 'Health check-ups and consultations'
        },
        {
            time: '10:00 AM',
            activity: 'Wrap-up & Closing',
            description: 'Final remarks and group photos'
        }
    ];

    // What's included
    const eventInclusions = [
        'Official Walk2Fitness 5.0 Event Vest',
        'Free Medical Health Screening',
        'Hydration Station Access',
        'Event Participation Certificate',
        'Community Networking Session',
        'Professional Photography Coverage',
        'Safety & Medical Support'
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Full Screen Image Background */}
            <section className="relative min-h-screen flex items-center px-4 md:px-8 overflow-hidden">
                {/* Background Image Only */}
                <div className="absolute inset-0">
                    <Image
                        src="/background.jpeg"
                        alt="Walk2Fitness Background"
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                    />
                    {/* Single Dark Overlay for Dimming */}
                    <div className="absolute inset-0 bg-black/80" />
                </div>

                <div className="max-w-6xl mx-auto relative z-10 w-full">
                    <div className="text-center">
                        {/* Event Badge - Transparent with White Text */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/15 backdrop-blur-sm mb-8 border border-white/30 mt-16"
                        >
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-white" />
                                <div className="w-2 h-2 rounded-full bg-[#008020]" />
                                <div className="w-2 h-2 rounded-full bg-[#ff8a00]" />
                            </div>
                            <span className="text-white font-semibold text-sm tracking-wide">
                                PERSONAL INVITATION
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="text-[48px] md:text-[68px] lg:text-[80px] font-black text-white mb-6 leading-none"
                        >
                            <span className="block">Walk2Fitness</span>
                            <span className="block text-[#008020] mt-2 drop-shadow-lg">5.0</span>
                        </motion.h1>

                        {/* Supporting Text */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-white/90 text-lg md:text-xl lg:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed"
                        >
                            A community-driven fitness experience combining movement,
                            meaningful conversations, and free medical screening.
                        </motion.p>

                        {/* Primary CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mb-8"
                        >
                            <Link href="https://tixtango.com/spotlight/walk2fitness-50" target="_blank" rel="noopener noreferrer">
                                <button className="px-10 py-4 md:px-12 md:py-5 bg-[#008020] text-white text-lg md:text-xl font-bold rounded-xl hover:shadow-2xl hover:shadow-[#ff8a00]/30 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg">
                                    Register on Tixtango
                                </button>
                            </Link>
                            <p className="text-white/80 text-sm md:text-base mt-4 max-w-md mx-auto">
                                You&apos;ll be redirected to our official registration partner to complete your registration securely.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
            {/* Event Overview */}
            <section className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-[36px] md:text-[48px] font-bold text-gray-900 mb-4">
                            More Than <span className="text-gradient">Just a Walk</span>
                        </h2>
                        <p className="text-gray-700 text-[16px] leading-normal max-w-3xl mx-auto">
                            Walk2Fitness 5.0 is designed to go beyond fitness — combining movement,
                            meaningful conversations, and free medical screening in a supportive
                            community environment.
                        </p>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: 'Guided Group Walk',
                                description: 'Professional-led walking sessions with pace groups for all fitness levels.',
                                color: '#008020'
                            },
                            {
                                title: 'Community Conversations',
                                description: 'Meaningful discussions about wellness, fitness, and lifestyle.',
                                color: '#ffde00'
                            },
                            {
                                title: 'Free Medical Screening',
                                description: 'Complimentary health check-ups with medical professionals.',
                                color: '#ff8a00'
                            },
                            {
                                title: 'Safe & Organized',
                                description: 'Fully coordinated event with safety protocols and support.',
                                color: '#008020'
                            }
                        ].map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl bg-white border-2 border-gray-100 hover:shadow-xl transition-all duration-300"
                                style={{ borderTopColor: benefit.color, borderTopWidth: '4px' }}
                            >
                                <div className="text-3xl mb-4">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white"
                                        style={{ backgroundColor: benefit.color }}>
                                        {index + 1}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vest Options */}
            <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-[36px] md:text-[48px] font-bold text-gray-900 mb-6">
                            Official Event <span className="text-[#ff8a00]">Vests</span>
                        </h2>
                        <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                            Official event vests help us identify participants, coordinate the walk properly,
                            and maintain unity and order throughout the event.
                        </p>
                    </div>

                    {/* Vest Price Banner */}
                    <div className="bg-linear-to-r from-[#008020]/5 to-[#ffde00]/5 rounded-2xl p-8 mb-12 border-2 border-gray-100">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">₦10,000</div>
                                <p className="text-gray-600">Includes official event vest and full participation package</p>
                            </div>
                            <div className="px-6 py-3 bg-white border-2 border-[#008020] rounded-xl">
                                <span className="text-[#008020] font-semibold">
                                    Vest selection happens during registration on Tixtango
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Vest Colors Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {vestOptions.map((vest, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-white rounded-2xl border-2 border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
                                    {/* Vest Color Display */}
                                    <div
                                        className="h-48 w-full relative overflow-hidden"
                                        style={{ backgroundColor: vest.color }}
                                    >
                                        {/* Vest Texture Pattern */}
                                        <div className="absolute inset-0 opacity-20 bg-[url('/texture-fabric.png')] bg-repeat bg-size-[200px_200px]" />

                                        {/* Vest Number */}
                                        {/* <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                                            <span className="font-bold text-gray-900">#{vest.hex.toUpperCase()}</span>
                                        </div> */}
                                    </div>

                                    {/* Vest Details */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div
                                                className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                                                style={{ backgroundColor: vest.color }}
                                            />
                                            <h3 className="text-xl font-bold text-gray-900">{vest.name}</h3>
                                        </div>
                                        <p className="text-gray-600 text-sm">{vest.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Event Day Schedule */}
            <section className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-[36px] md:text-[48px] font-bold text-gray-900 mb-6">
                            Event Day <span className="text-[#008020]">Schedule</span>
                        </h2>
                        <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                            A structured day designed for maximum enjoyment, safety, and community building.
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-1 bg-linear-to-b from-[#008020] via-[#ffde00] to-[#ff8a00] hidden md:block" />

                        <div className="space-y-8">
                            {eventSchedule.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-8"
                                >
                                    {/* Time Circle */}
                                    <div className="relative shrink-0">
                                        <div className="w-20 h-20 rounded-full bg-white border-4 border-gray-100 flex items-center justify-center shadow-lg">
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-gray-900">{item.time}</div>
                                                <div className="text-xs text-gray-500">AM</div>
                                            </div>
                                        </div>
                                        {/* Timeline Dot */}
                                        <div className="absolute top-1/2 -right-8 w-8 h-1 bg-gray-200 hidden md:block" />
                                    </div>

                                    {/* Activity Details */}
                                    <div className="flex-1 bg-white rounded-xl p-6 border-2 border-gray-100 hover:shadow-lg transition-all duration-300">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.activity}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* What's Included */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 bg-linear-to-r from-[#008020]/5 to-[#ffde00]/5 rounded-2xl lg:p-8 p-5 border-2 border-gray-100"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                            Your ₦10,000 <span className="text-[#ff8a00]">Includes</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {eventInclusions.map((item, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-white/80 rounded-lg">
                                    <div className="w-2 h-2 rounded-full bg-[#008020]" />
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-6 lg:py-24 px-4 md:px-8 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* Large Registration Button */}
                        <div className="mb-10">
                            <Link href="https://tixtango.com/spotlight/walk2fitness-50" target="_blank" rel="noopener noreferrer">
                                <button className="px-16 py-6 bg-[#008020] text-white lg:text-[18px] text-[16px] font-bold rounded-xl hover:shadow-3xl hover:shadow-[#008020]/30 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                    Proceed to Official Registration on Tixtango
                                </button>
                            </Link>
                        </div>

                        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto italic leading-normal">
                            You will be redirected to our trusted ticketing partner to complete your registration securely.
                            All payments are processed through secure channels.
                        </p>

                        {/* Support Section */}
                        <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-100 max-w-lg mx-auto">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Need Assistance?</h3>
                            <p className="text-gray-600 mb-6">
                                Our team is ready to help you with registration or answer any questions.
                            </p>
                            <div className="space-y-4 space-x-5">
                                <a
                                    href="https://wa.me/2348163702286"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-[#008020] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 lg:w-auto w-full"
                                >
                                    <span>Chat on WhatsApp</span>
                                </a>
                                <a
                                    href="mailto:fitnessambassador84@gmail.com"
                                    className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-[#008020] transition-all duration-300 lg:w-auto w-full"
                                >
                                    <span>Email Support</span>
                                </a>
                            </div>
                        </div>

                        {/* Security Badge */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="text-gray-500 text-sm 
                  block space-y-2 
                  lg:flex lg:space-x-2 lg:space-y-0 justify-center">
                                <span className="block lg:inline font-semibold text-[#008020]">Secure Registration</span>
                                <span className="block lg:inline">• Trusted Partner</span>
                                <span className="block lg:inline">• Official Event</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Walk2FitnessVestPage;