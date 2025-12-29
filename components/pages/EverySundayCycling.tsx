import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const EverySundayCyclingPage = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [activeRoute, setActiveRoute] = useState<number>(0);

    // Weekly cycling statistics
    const cyclingStats = [
        { number: '100+', label: 'Weekly Riders', color: '#008020', metric: 'Consistent Community' },
        { number: '52', label: 'Sundays Per Year', color: '#ffde00', metric: 'Year-Round Commitment' },
        { number: '25-50', label: 'KM per Ride', color: '#ff8a00', metric: 'Distance Range' },
        { number: '6 AM', label: 'Start Time', color: '#008020', metric: 'Every Sunday' }
    ];

    // Cycling benefits
    const cyclingBenefits = [
        {
            title: 'Cardiovascular Health',
            description: 'Strengthen your heart and improve blood circulation through consistent aerobic exercise.',
            gradient: 'from-[#008020] to-[#008020]/70'
        },
        {
            title: 'Community Connection',
            description: 'Build meaningful relationships with fellow cyclists who share your passion for fitness.',
            gradient: 'from-[#ffde00] to-[#ffde00]/70'
        },
        {
            title: 'Mental Clarity',
            description: 'Clear your mind and reduce stress with outdoor exercise and fresh air every Sunday.',
            gradient: 'from-[#ff8a00] to-[#ff8a00]/70'
        }
    ];

    // Gallery images
    const galleryImages = [
        {
            src: '/cycling1.jpeg',
            title: 'Every Sunday Cycling Group',
            category: 'Weekly Tradition',
            distance: '25-35 KM'
        },
        {
            src: '/cycling2.jpeg',
            title: 'Cycling Fitness Challenge',
            category: 'Team Building',
            distance: '40-50 KM'
        },
        {
            src: '/cycling3.jpeg',
            title: 'Scenic Route Cycling',
            category: 'Nature Exploration',
            distance: '30-40 KM'
        },
        {
            src: '/cycling4.jpeg',
            title: 'Group Cycling Dynamics',
            category: 'Community Ride',
            distance: '25-35 KM'
        }
    ];

    // Sunday routes (imaginary routes for variety)
    const sundayRoutes = [
        {
            name: 'City Perimeter Loop',
            distance: '35 KM',
            difficulty: 'Intermediate',
            highlights: ['Urban landmarks', 'River views', 'Park trails'],
            color: '#008020'
        },
        {
            name: 'Hill Challenge Route',
            distance: '45 KM',
            difficulty: 'Advanced',
            highlights: ['Elevation gain', 'Mountain views', 'Technical sections'],
            color: '#ff8a00'
        },
        {
            name: 'Scenic Leisure Ride',
            distance: '25 KM',
            difficulty: 'Beginner',
            highlights: ['Flat terrain', 'Waterfront paths', 'Picnic spots'],
            color: '#ffde00'
        }
    ];

    // Weekly schedule highlights
    const weeklyHighlights = [
        {
            time: '5:45 AM',
            activity: 'Gather & Welcome',
            description: 'Meet at starting point, bike checks, warm-up'
        },
        {
            time: '6:00 AM',
            activity: 'Ride Start',
            description: 'Group departs, paced according to route difficulty'
        },
        {
            time: '8:30 AM',
            activity: 'Mid-point Break',
            description: 'Rest, hydration, photos at scenic location'
        },
        {
            time: '10:00 AM',
            activity: 'Return & Cool Down',
            description: 'Back to start, stretching, post-ride refreshments'
        }
    ];

    // Testimonials
    const testimonials = [
        {
            name: 'Michael Adekunle',
            role: 'Weekly Participant',
            content: 'This Sunday ritual changed my life. The consistency keeps me accountable and the community keeps me coming back.',
            weeksAttended: '48 weeks'
        },
        {
            name: 'Sarah Johnson',
            role: 'Fitness Enthusiast',
            content: 'As someone new to cycling, the supportive group made all the difference. Now I look forward to Sundays!',
            weeksAttended: '26 weeks'
        },
        {
            name: 'Chukwuemeka Okoro',
            role: 'Group Leader',
            content: 'Watching this community grow week after week is incredible. We\'ve become more than cyclists - we\'re a family.',
            weeksAttended: '52 weeks'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Cycling Motion Inspired */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-8 overflow-hidden">
                {/* Animated Road Lines */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0"
                        style={{
                            backgroundImage: `repeating-linear-gradient(
                                90deg,
                                transparent,
                                transparent 40px,
                                #008020 40px,
                                #008020 80px
                            )`,
                            backgroundSize: '80px 100%'
                        }}
                    />
                </div>

                {/* Sunrise Gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-[#ffde00]/5 via-transparent to-[#008020]/5" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Weekly Badge */}
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#008020]/10 border border-[#008020]/20 mb-6">
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#008020]" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#ffde00]" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff8a00]" />
                                </div>
                                <span className="text-[#008020] font-medium text-sm">
                                    Weekly Community Tradition
                                </span>
                            </div>

                            <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-bold text-gray-900 mb-4 leading-tight">
                                Every Sunday
                                <span className="block text-[#ff8a00]">Cycling</span>
                                <span className="block text-gray-900">Ride. Connect. Stay active.</span>
                            </h1>

                            <p className="text-gray-600 text-[16px] mb-8 leading-normal">
                                Join 100+ cyclists every Sunday morning for a community-driven fitness experience
                                that combines cardiovascular exercise, scenic exploration, and meaningful connections.
                                Our weekly ritual keeps you fit and connected year-round.
                            </p>

                            {/* Stats Grid - Road Inspired */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                                {cyclingStats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="text-center p-4 rounded-xl bg-white border-2 border-gray-100 hover:shadow-lg transition-all duration-300 group"
                                        style={{
                                            borderBottomColor: stat.color,
                                            borderBottomWidth: '3px'
                                        }}
                                    >
                                        <div
                                            className="text-2xl font-bold mb-1"
                                            style={{ color: stat.color }}
                                        >
                                            {stat.number}
                                        </div>
                                        <div className="text-xs text-gray-600 mb-1">{stat.label}</div>
                                        <div className="text-[10px] text-gray-500 ">
                                            {stat.metric}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => document.getElementById('routes')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-8 py-4 bg-[#ff8a00] cursor-pointer text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
                                >
                                    Explore Sunday Routes
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-8 py-4 bg-white cursor-pointer text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-[#008020] hover:shadow-lg transition-all duration-300"
                                >
                                    View Weekly Moments
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Hero Visual - Cycling Group */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100">
                                <div className="absolute inset-0 flex">
                                    <div className="relative w-full h-full overflow-hidden">
                                        <Image
                                            src="/cycling1.jpeg"
                                            alt="Sunday Cycling Group"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

                                        {/* Time Display */}
                                        <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
                                            <div className="text-sm font-bold text-gray-900">SUN 6:00 AM</div>
                                            <div className="text-xs text-gray-600">Weekly Departure</div>
                                        </div>

                                        {/* Distance Display */}
                                        <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-[#008020]/90 text-white">
                                            <div className="text-sm font-bold">25-50 KM</div>
                                            <div className="text-xs opacity-90">Weekly Distance</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Road Effect Bottom */}
                                <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-r from-transparent via-gray-800 to-transparent opacity-30" />
                            </div>

                            {/* Cycling Elements */}
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-3xl border-2 border-[#ff8a00]/10 -z-10" />
                            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-[#008020]/10 blur-xl" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 mb-6">
                            <div className="w-12 h-0.5 bg-[#008020]" />
                            <div className="text-[#ff8a00] font-medium">Why Ride Every Sunday?</div>
                            <div className="w-12 h-0.5 bg-[#008020]" />
                        </div>
                        <h2 className="text-[32px] lg:text-[42px] font-bold text-gray-900 mb-4">
                            More Than Just a <span className="text-gradient">Ride</span>
                        </h2>
                        <p className="text-gray-600 text-[16px] lg:w-[370px] w-auto mx-auto">
                            A weekly commitment that transforms your fitness, mindset, and social connections.
                        </p>
                    </motion.div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {cyclingBenefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group"
                            >
                                <div className="p-8 rounded-2xl bg-white border-2 border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                                    {/* Benefit Number */}
                                    <div className={`text-4xl font-bold mb-6 bg-linear-to-r ${benefit.gradient} bg-clip-text text-transparent`}>
                                        0{index + 1}
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                                    <p className="text-gray-600">{benefit.description}</p>

                                    {/* Bottom accent */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: `linear-gradient(90deg, ${benefit.gradient.replace('from-', '').replace('to-', '').split(' ')[0]} 0%, ${benefit.gradient.replace('from-', '').replace('to-', '').split(' ')[2]} 100%)`
                                        }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Weekly Schedule */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 bg-white rounded-3xl p-8 border-2 border-gray-100"
                    >
                        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            A <span className="text-[#ff8a00]">Typical</span> Sunday Morning
                        </h3>

                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-[#008020] via-[#ffde00] to-[#ff8a00] hidden md:block" />

                            <div className="space-y-8">
                                {weeklyHighlights.map((highlight, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-6"
                                    >
                                        {/* Time Circle */}
                                        <div className="relative shrink-0">
                                            <div className="w-16 h-16 rounded-full bg-white border-4 border-gray-100 flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="text-sm font-bold text-gray-900">{highlight.time}</div>
                                                    <div className="text-xs text-gray-500">AM</div>
                                                </div>
                                            </div>
                                            {/* Connector dot */}
                                            <div className="absolute top-1/2 -right-6 w-6 h-0.5 bg-gray-200 hidden md:block" />
                                        </div>

                                        {/* Activity Details */}
                                        <div className="flex-1">
                                            <h4 className="text-xl font-bold text-gray-900 mb-2">{highlight.activity}</h4>
                                            <p className="text-gray-600">{highlight.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Routes Section */}
            <section id="routes" className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-b from-white to-[#008020]/5">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            <span className="text-[#ff8a00]">Sunday</span> Route Varieties
                        </h2>
                        <p className="text-gray-600 text-[16px] lg:w-[410px] w-auto mx-auto leading-normal">
                            Different routes each week to keep the rides exciting and challenging.
                        </p>
                    </motion.div>

                    {/* Route Tabs */}
                    <div className="mb-12">
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            {sundayRoutes.map((route, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveRoute(index)}
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer lg:w-auto w-full ${activeRoute === index ? 'ring-4 ring-opacity-30' : 'hover:shadow-lg'}`}
                                    style={{
                                        backgroundColor: activeRoute === index ? route.color : 'white',
                                        color: activeRoute === index ? 'white' : route.color,
                                        border: `2px solid ${activeRoute === index ? route.color : '#e5e7eb'}`
                                    }}
                                >
                                    {route.name}
                                </button>
                            ))}
                        </div>

                        {/* Active Route Details */}
                        <motion.div
                            key={activeRoute}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-3xl lg:p-8 p-4 border-2 border-gray-100"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div
                                            className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
                                            style={{ backgroundColor: sundayRoutes[activeRoute].color }}
                                        >
                                            {sundayRoutes[activeRoute].distance}
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-gray-900">
                                                {sundayRoutes[activeRoute].name}
                                            </h3>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                                                    {sundayRoutes[activeRoute].difficulty}
                                                </span>
                                                <span className="text-gray-600">•</span>
                                                <span className="text-gray-600">{sundayRoutes[activeRoute].distance}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-xl font-bold text-gray-900">Route Highlights:</h4>
                                        <div className="space-y-3">
                                            {sundayRoutes[activeRoute].highlights.map((highlight, index) => (
                                                <div key={index} className="flex items-center gap-3">
                                                    <div
                                                        className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                                                        style={{
                                                            backgroundColor: sundayRoutes[activeRoute].color + '20',
                                                            color: sundayRoutes[activeRoute].color
                                                        }}
                                                    >
                                                        {index + 1}
                                                    </div>
                                                    <span className="text-gray-700">{highlight}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    {/* Route Visualization */}
                                    <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border-2 border-gray-100">
                                        <div
                                            className="absolute inset-0 flex items-center justify-center"
                                            style={{ backgroundColor: sundayRoutes[activeRoute].color + '10' }}
                                        >
                                            <div className="text-center p-8">
                                                <div className="text-4xl mb-4">🗺️</div>
                                                <h4 className="text-2xl font-bold text-gray-900">{sundayRoutes[activeRoute].name}</h4>
                                                <p className="text-gray-600 mt-2">Route visualization</p>
                                                <div className="mt-4 px-4 py-2 rounded-full bg-white border-2 border-gray-200 inline-block">
                                                    <span className="font-semibold" style={{ color: sundayRoutes[activeRoute].color }}>
                                                        {sundayRoutes[activeRoute].distance} • {sundayRoutes[activeRoute].difficulty}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="py-16 md:py-24 px-4 md:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Weekly <span className="text-[#ff8a00]">Moments</span>
                        </h2>
                        <p className="text-gray-600 text-[16px] lg:w-[410px] w-auto mx-auto leading-normal">
                            Good vibes from our Sunday rides.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {galleryImages.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="relative group"
                            >
                                <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-gray-100 hover:border-[#008020] transition-all duration-300">
                                    <Image
                                        src={image.src}
                                        alt={image.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="text-sm font-semibold text-white">{image.title}</div>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-xs text-gray-300">{image.category}</span>
                                                <span className="text-xs font-medium px-2 py-1 rounded bg-[#008020]/80 text-white">
                                                    {image.distance}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Road effect overlay */}
                                <div className="absolute -bottom-2 -left-2 -right-2 h-4 bg-linear-to-r from-transparent via-gray-800/20 to-transparent rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Our <span className="text-[#ff8a00]">Cycling</span> Family
                        </h2>
                        <p className="text-gray-600 text-[16px] lg:w-[370px] w-auto mx-auto leading-normal">
                            Hear from riders who make Sundays special.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl bg-white border-2 border-gray-100 hover:shadow-lg transition-all duration-300 relative"
                            >
                                {/* Attendance Badge */}
                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-[#008020]/10 text-[#008020]">
                                    {testimonial.weeksAttended}
                                </div>

                                <div className="my-6">
                                    <p className="text-gray-700 italic">&quot;{testimonial.content}&quot;</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#008020] to-[#ffde00] flex items-center justify-center font-bold text-white">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-br from-[#008020]/5 via-white to-[#ff8a00]/5">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* Cycling Symbol */}
                        <div className="text-4xl mb-8">🚴‍♂️</div>

                        <h2 className="text-[30px] lg:text-[40px] font-bold text-gray-900 mb-6">
                            Ready for Next <span className="text-[#ff8a00]">Sunday</span>?
                        </h2>

                        <p className="text-gray-700 text-[16px] mb-10 max-w-2xl mx-auto">
                            Join 100+ riders this Sunday morning. No registration needed - just bring your bike,
                            helmet, and enthusiasm. Be part of Ilorin&apos;s most consistent fitness community.
                        </p>

                        {/* Details Box */}
                        <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 max-w-md mx-auto mb-8">
                            <div className="grid grid-cols-2 gap-4 text-left">
                                <div>
                                    <div className="text-sm text-gray-500">When</div>
                                    <div className="font-semibold text-gray-900">Every Sunday</div>
                                    <div className="text-sm text-gray-600">6:00 AM Sharp</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Where</div>
                                    <div className="font-semibold text-gray-900">City Center</div>
                                    <div className="text-sm text-gray-600">Starting Point Varies</div>
                                </div>
                                <div className="col-span-2 mt-4 pt-4 border-t border-gray-100">
                                    <div className="text-sm text-gray-500">What to Bring</div>
                                    <div className="text-sm text-gray-700 font-bold italic">Bicycle, Helmet, Water, Energy</div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="mb-8">
                            <p className="text-gray-600 mb-6">
                                Join our community for updates, routes, and connect with fellow riders:
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                {/* WhatsApp Button */}
                                <a
                                    href="https://chat.whatsapp.com/GaRyUCS2djUKWlecDKBZZH"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#1da851] transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                                    </svg>
                                    Join WhatsApp Group
                                </a>

                                {/* Instagram Button */}
                                <a
                                    href="https://www.instagram.com/everysundaycycling?igsh=bXZ3cmFmbHR3Zml3&utm_source=qr"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                    Follow on Instagram
                                </a>
                            </div>

                            {/* Alternative Contact Info */}
                            <div className="mt-6 text-sm text-gray-500">
                                <p className="mb-2">Or contact us directly:</p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a href="tel:+2348123456789" className="text-[#008020] hover:underline">
                                        📞 +234 816 370 2286
                                    </a>
                                    <a href="mailto:fitnessambassador84@gmail.com" className="text-[#008020] hover:underline">
                                        📧 fitnessambassador84@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Community Stats */}
                        <div className="mt-12 pt-8 border-t border-gray-300/30">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div className="p-4 bg-white/50 rounded-xl border border-gray-100">
                                    <div className="text-3xl font-bold text-[#ff8a00]">100+</div>
                                    <div className="text-sm text-gray-600">Weekly Riders</div>
                                </div>
                                <div className="p-4 bg-white/50 rounded-xl border border-gray-100">
                                    <div className="text-3xl font-bold text-[#008020]">52</div>
                                    <div className="text-sm text-gray-600">Rides Per Year</div>
                                </div>
                                <div className="p-4 bg-white/50 rounded-xl border border-gray-100">
                                    <div className="text-3xl font-bold text-[#ff8a00]">500+</div>
                                    <div className="text-sm text-gray-600">Community Members</div>
                                </div>
                            </div>

                            <p className="text-gray-600">
                                <span className="font-semibold text-[#008020]">Ilorin&apos;s Weekly Cycling Community</span><br />
                                <span className="text-sm">Consistent fitness through community commitment</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default EverySundayCyclingPage;