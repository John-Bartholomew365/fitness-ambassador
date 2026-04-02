import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Quote } from 'lucide-react';

const InnovatorPage = () => {
    const [serviceIndex, setServiceIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Memoize services array
    const services = useMemo(() => [
        'Fitness Event Creation',
        'Community Building',
        'Fitness Education',
        'Wellness Innovation',
        'Health Transformation',
        'Program Development'
    ], []);

    // Fixed typing effect without cascade
    useEffect(() => {
        const currentService = services[serviceIndex];

        const typeSpeed = isDeleting ? 50 : 100;
        const pauseTime = isDeleting ? 50 : 1500;

        if (!isDeleting && displayText === currentService) {
            // Pause at full text
            timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseTime);
            return () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
            };
        }

        if (isDeleting && displayText === '') {
            // Use setTimeout to avoid cascade
            timeoutRef.current = setTimeout(() => {
                setIsDeleting(false);
                setServiceIndex((prev) => (prev + 1) % services.length);
            }, 50);
            return () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
            };
        }

        timeoutRef.current = setTimeout(() => {
            setDisplayText(
                isDeleting
                    ? currentService.substring(0, displayText.length - 1)
                    : currentService.substring(0, displayText.length + 1)
            );
        }, typeSpeed);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [displayText, isDeleting, serviceIndex, services]);

    // Philosophy principles without icons
    const philosophyPrinciples = [
        {
            title: 'Community-First Fitness',
            description: 'Believing that sustainable fitness transformation happens within supportive communities, not in isolation.',
            color: '#008020'
        },
        {
            title: 'Innovation Through Experience',
            description: 'Creating memorable fitness experiences that break traditional boundaries and inspire lasting change.',
            color: '#ffde00'
        },
        {
            title: 'Holistic Wellness',
            description: 'Approaching fitness as a comprehensive journey encompassing physical, mental, and social wellbeing.',
            color: '#ff8a00'
        }
    ];

    // Services offered
    const offeredServices = [
        {
            title: 'Fitness Event Creation',
            description: 'Designing and executing innovative fitness experiences like Walk2Fitness, Jam2Fit, and AfroGroove that engage communities.',
            examples: ['Walk2Fitness Series', 'Jam2Fit Night Party', 'AfroGroove Cultural Fitness'],
            color: '#008020'
        },
        {
            title: 'Fitness Education',
            description: 'Authoring comprehensive fitness guides and providing educational resources for sustainable health transformation.',
            examples: ['Workout Compass Book', 'Training Workshops', 'Online Resources'],
            color: '#ffde00'
        },
        {
            title: 'Community Building',
            description: 'Developing fitness communities and networks that support consistent progress and mutual accountability.',
            examples: ['Weekly Cycling Groups', 'Event Communities', 'Online Support Networks'],
            color: '#ff8a00'
        },
        {
            title: 'Wellness Consultation',
            description: 'Providing personalized fitness guidance and consultation services for individuals and organizations.',
            examples: ['One-on-One Coaching', 'Corporate Wellness', 'Program Design'],
            color: '#008020'
        }
    ];

    // Detailed services for carousel
    const detailedServices = [
        {
            category: 'Events & Experiences',
            services: [
                'Walk2Fitness Progressive Series',
                'Jam2Fit Nighttime Fitness Parties',
                'AfroGroove Cultural Fitness',
                'Aerobics + IceBath Sessions',
                'Every Sunday Cycling Community'
            ],
            color: '#008020'
        },
        {
            category: 'Education & Resources',
            services: [
                'Workout Compass Fitness Guide',
                'Personal Training Programs',
                'Corporate Wellness Workshops',
                'Online Fitness Resources',
                'Nutrition Guidance'
            ],
            color: '#ffde00'
        },
        {
            category: 'Consultation & Coaching',
            services: [
                'One-on-One Fitness Coaching',
                'Group Training Sessions',
                'Event Fitness Consultation',
                'Program Development',
                'Fitness Professional Certification'
            ],
            color: '#ff8a00'
        },
        {
            category: 'Community & Impact',
            services: [
                'Community Fitness Initiatives',
                'University Collaborations',
                'Corporate Partnerships',
                'Wellness Advocacy',
                'Fitness Awareness Campaigns'
            ],
            color: '#008020'
        }
    ];

    // Career highlights
    const careerHighlights = [
        {
            year: '2018',
            title: 'Fitness Journey Begins',
            description: 'Started professional fitness coaching career in Ilorin'
        },
        {
            year: '2021',
            title: 'Walk2Fitness 1.0',
            description: 'Launched the inaugural community walking fitness movement'
        },
        {
            year: '2023',
            title: 'University Partnership',
            description: 'Collaborated with University of Ilorin Sports Council'
        },
        {
            year: '2024',
            title: 'Workout Compass',
            description: 'Published comprehensive fitness guidebook'
        },
        {
            year: 'Present',
            title: 'Community Expansion',
            description: 'Overseeing multiple fitness communities across Ilorin'
        }
    ];

    // Impact metrics
    const impactMetrics = [
        { number: '5000+', label: 'Community Members Impacted', color: '#008020' },
        { number: '15+', label: 'Innovative Events Created', color: '#ffde00' },
        { number: '4', label: 'Successful Partnerships', color: '#ff8a00' },
        { number: '100%', label: 'Participant Satisfaction', color: '#008020' }
    ];

    // Testimonials
    const testimonials = [
        {
            name: 'Dr. Fatima Bello',
            role: 'Medical Director',
            content: 'The approach to community fitness has transformed how we view preventive healthcare in Ilorin.',
            organization: 'Ilorin General Hospital'
        },
        {
            name: 'Professor Adekunle',
            role: 'Sports Council Head',
            content: 'The collaboration has brought innovative fitness concepts to our university community.',
            organization: 'University of Ilorin'
        },
        {
            name: 'Chinedu Okoro',
            role: 'Event Participant',
            content: 'From Walk2Fitness 1.0 to now, the evolution has been incredible. Each event feels like a movement.',
            organization: 'Community Member Since 2021'
        }
    ];

    const [activeService, setActiveService] = useState(0);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 md:py-0 px-4 md:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center lg:min-h-screen gap-12 lg:gap-16">
                        {/* Profile Image - Full height on LG */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative lg:h-screen lg:flex lg:items-center"
                        >
                            <div className="relative w-full h-[400px] lg:h-[80vh] rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                                <Image
                                    src="/the-fa.jpeg"
                                    alt="Ajisafe Sulaiman - The Fitness Ambassador"
                                    fill
                                    className="object-cover object-top"
                                    priority
                                    quality={100}
                                />
                                {/* Name Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-black/80 to-transparent">
                                    <div className="text-white">
                                        <div className="text-3xl font-bold">Ajisafe Sulaiman</div>
                                        <div className="text-lg opacity-90">The Fitness Ambassador</div>
                                    </div>
                                </div>

                                {/* Certification Badge */}
                                <div className="absolute top-6 right-6 bg-[#ff8a00] text-white px-4 py-2 rounded-full text-sm font-bold">
                                    Certified Fitness Coach
                                </div>
                            </div>

                            {/* Experience Badge */}
                            <div className="absolute lg:bottom-3 -bottom-18 lg:-left-12 -left-5 bg-white border-2 border-[#008020] rounded-2xl p-6 shadow-2xl">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-[#008020]">7+</div>
                                    <div className="text-sm text-gray-600">Years Experience</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Introduction Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:py-24 py-16"
                        >
                            {/* Title Badge */}
                            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#008020]/10 my-4">
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-[#008020]" />
                                    <div className="w-2 h-2 rounded-full bg-[#ffde00]" />
                                    <div className="w-2 h-2 rounded-full bg-[#ff8a00]" />
                                </div>
                                <span className="text-[#008020] font-semibold text-sm tracking-wider">
                                    THE INNOVATOR
                                </span>
                            </div>

                            <h1 className="text-[52px] md:text-[52px] lg:text-[60px] font-black text-gray-900 mb-6 leading-none">
                                Ajisafe
                                <span className="block text-[#ff8a00] mt-2">Sulaiman</span>
                            </h1>

                            <div className="lg:text-[20px] text-[18px] text-gray-700 mb-8 leading-relaxed">
                                <span className="font-semibold text-[#008020]">The Fitness Ambassador</span> —
                                A visionary fitness innovator dedicated to transforming communities through
                                innovative wellness experiences and sustainable fitness solutions.
                            </div>

                            {/* Dynamic Services Typing */}
                            <div className="mb-10">
                                <div className="text-[16px] text-gray-500 mb-2">Specializing in</div>
                                <div className="lg:text-[30px] text-[24px] font-bold min-h-[46px]">
                                    <span className="text-[#ff8a00]">{displayText}</span>
                                    <span className="ml-1 animate-pulse">|</span>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                {[
                                    { number: '15+', label: 'Events Created', color: '#008020' },
                                    { number: '5000+', label: 'Participants', color: '#ffde00' },
                                    { number: '7+', label: 'Years Experience', color: '#ff8a00' },
                                    { number: '1', label: 'Bestselling Book', color: '#008020' }
                                ].map((stat, index) => (
                                    <div key={index} className="text-center p-4 rounded-xl border-2 border-gray-100">
                                        <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                                            {stat.number}
                                        </div>
                                        <div className="text-[12px] text-gray-600">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/events">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-2 bg-[#ff8a00] text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:shadow-[#ff8a00]/25 transition-all duration-300 cursor-pointer lg:w-auto w-full"
                                    >
                                        Explore Events
                                    </motion.button>
                                </Link>
                                <Link href="/innovator/workout-compass">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-2 bg-white text-gray-900 text-lg font-bold rounded-xl border-2 border-gray-200 hover:border-[#008020] hover:shadow-xl transition-all duration-300 cursor-pointer lg:w-auto w-full"
                                    >
                                        Discover Book
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-20 md:py-32 px-4 md:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Vision Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 mb-5">
                                <div className="w-12 h-0.5 bg-[#ff8a00]" />
                                <span className="text-[#008020] font-semibold tracking-wide">THE VISION</span>
                                <div className="w-12 h-0.5 bg-[#ff8a00]" />
                            </div>

                            <h2 className="text-[36px] md:text-[48px] font-bold text-gray-900 mb-5">
                                The Vision Behind <span className="text-gradient">The Movement</span>
                            </h2>

                            <div className="space-y-6 text-gray-700 text-lg">
                                <p className="leading-normal italic">
                                    <span className="font-semibold text-[#008020]">&quot;Fitness is more than just exercise to me, it&apos;s a passion, a lifestyle, and a powerful force that transforms communities.&quot;</span>
                                </p>

                                <p className="leading-normal">
                                    Growing up, it became clear that fitness had the power to transform lives and
                                    strengthen communities. This realization sparked a vision to create platforms
                                    where people could come together, grow stronger, and celebrate their wellness
                                    journeys collectively.
                                </p>

                                <p className="leading-normal">
                                    Each event and program is a way of giving back to the community that shaped this
                                    vision. It&apos;s more than just workouts—it&apos;s a celebration of potential, teamwork,
                                    and the power of wellness to inspire greatness.
                                </p>

                                <p className="leading-normal">
                                    Through innovative fitness experiences, the goal is to provide stages for growth,
                                    encourage healthy lifestyles, and promote unity and inclusion. This is not just
                                    about fitness; it&apos;s about building stronger bodies, sharper minds, and more
                                    connected communities—inspiring the next generation and leaving a lasting legacy
                                    of strength, passion, and excellence.
                                </p>
                            </div>
                        </motion.div>

                        {/* Vision Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="relative h-[400px] md:h-[600px] lg:h-full rounded-3xl overflow-hidden border-2 border-gray-100 shadow-xl"
                        >
                            <Image
                                src="/fa-vision.jpeg"
                                alt="The Vision Behind The Movement"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section - Updated without icons */}
            <section className="py-20 md:py-32 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-[40px] md:text-[56px] font-bold text-gray-900 mb-4">
                            Core <span className="text-gradient">Principles</span>
                        </h2>
                        <p className="text-gray-700 text-[16px] lg:w-[380px] w-auto mx-auto">
                            Fundamental beliefs guiding every fitness innovation and community initiative.
                        </p>
                    </motion.div>

                    {/* Principles Grid - No Icons */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {philosophyPrinciples.map((principle, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="p-8 rounded-3xl bg-white border-2 border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                                    {/* Principle Number */}
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white mb-6"
                                        style={{ backgroundColor: principle.color }}
                                    >
                                        0{index + 1}
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{principle.title}</h3>
                                    <p className="text-gray-600">{principle.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Services Carousel */}
            <section className="py-20 md:py-32 px-4 md:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-[36px] lg:text-[48px] font-bold text-gray-900 mb-4">
                            Comprehensive <span className="text-gradient">Services</span>
                        </h2>
                        <p className="text-gray-700 text-[16px] max-w-3xl mx-auto">
                            A complete range of fitness solutions and wellness offerings.
                        </p>
                    </motion.div>

                    {/* Service Navigation and Mobile Content */}
                    <div className="space-y-6 md:space-y-0">
                        {detailedServices.map((service, index) => (
                            <div key={index} className="md:hidden">
                                {/* Mobile Service Tab */}
                                <button
                                    onClick={() => setActiveService(index)}
                                    className={`w-full px-6 py-4 rounded-xl font-semibold transition-all duration-300 mb-4 cursor-pointer ${activeService === index ? 'ring-4 ring-opacity-30' : 'hover:shadow-lg'}`}
                                    style={{
                                        backgroundColor: activeService === index ? service.color : 'white',
                                        color: activeService === index ? 'white' : service.color,
                                        border: `2px solid ${activeService === index ? service.color : '#e5e7eb'}`
                                    }}
                                >
                                    {service.category}
                                </button>

                                {/* Mobile Service Details (only shows when active) */}
                                {activeService === index && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-white rounded-3xl border-2 border-gray-100 overflow-hidden shadow-xl mb-6"
                                    >
                                        <div
                                            className="p-6 text-white"
                                            style={{ backgroundColor: service.color }}
                                        >
                                            <h3 className="text-2xl font-bold">{service.category}</h3>
                                            <p className="opacity-90 mt-1 text-sm">Complete service offerings in this category</p>
                                        </div>

                                        <div className="p-6">
                                            <div className="space-y-4">
                                                {service.services.map((item, itemIndex) => (
                                                    <div key={itemIndex} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
                                                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm text-white shrink-0"
                                                            style={{ backgroundColor: service.color }}>
                                                            {itemIndex + 1}
                                                        </div>
                                                        <span className="text-gray-700 font-medium">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Desktop Layout - Keep as is */}
                    <div className="hidden md:block">
                        {/* Service Navigation */}
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {detailedServices.map((service, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveService(index)}
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${activeService === index ? 'ring-4 ring-opacity-30' : 'hover:shadow-lg'}`}
                                    style={{
                                        backgroundColor: activeService === index ? service.color : 'white',
                                        color: activeService === index ? 'white' : service.color,
                                        border: `2px solid ${activeService === index ? service.color : '#e5e7eb'}`
                                    }}
                                >
                                    {service.category}
                                </button>
                            ))}
                        </div>

                        {/* Active Service Details */}
                        <motion.div
                            key={activeService}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-3xl border-2 border-gray-100 overflow-hidden shadow-xl"
                        >
                            <div
                                className="p-8 text-white"
                                style={{ backgroundColor: detailedServices[activeService].color }}
                            >
                                <h3 className="text-3xl font-bold">{detailedServices[activeService].category}</h3>
                                <p className="opacity-90 mt-2">Complete service offerings in this category</p>
                            </div>

                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {detailedServices[activeService].services.map((service, index) => (
                                        <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
                                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm text-white shrink-0"
                                                style={{ backgroundColor: detailedServices[activeService].color }}>
                                                {index + 1}
                                            </div>
                                            <span className="text-gray-700 font-medium">{service}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="py-20 md:py-32 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-[32px] lg:text-[48px] font-bold text-gray-900 mb-4">
                            Measurable <span className="text-gradient">Impact</span>
                        </h2>
                        <p className="text-gray-700 text-[16px] lg:w-[400px] w-auto mx-auto">
                            Tangible results and community transformation through innovative fitness initiatives.
                        </p>
                    </motion.div>

                    {/* Impact Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                        {impactMetrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center lg:p-8 p-4 rounded-2xl bg-white border-2 border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="text-4xl font-bold mb-3" style={{ color: metric.color }}>
                                    {metric.number}
                                </div>
                                <div className="text-gray-600 text-sm">{metric.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Career Timeline */}
                    <div className="bg-white rounded-3xl lg:p-8 p-4 border-2 border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                            Career <span className="text-[#ff8a00]">Journey</span>
                        </h3>

                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-8 top-0 bottom-0 w-1 bg-linear-to-b from-[#008020] via-[#ffde00] to-[#ff8a00] hidden md:block" />

                            <div className="space-y-8">
                                {careerHighlights.map((highlight, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-8"
                                    >
                                        {/* Year Circle */}
                                        <div className="relative shrink-0">
                                            <div className="w-20 h-20 rounded-full bg-white border-4 border-gray-100 flex items-center justify-center shadow-lg">
                                                <div className="text-center">
                                                    <div className="text-lg font-bold text-gray-900">{highlight.year}</div>
                                                </div>
                                            </div>
                                            {/* Timeline Dot */}
                                            <div className="absolute top-1/2 -right-8 w-8 h-1 bg-gray-200 hidden md:block" />
                                        </div>

                                        {/* Highlight Details */}
                                        <div className="flex-1 bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{highlight.title}</h3>
                                            <p className="text-gray-600">{highlight.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 md:py-32 px-4 md:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-[32px] lg:text-[48px] font-bold text-gray-900 mb-4">
                            Professional <span className="text-gradient">Recognition</span>
                        </h2>
                    </motion.div>

                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                                    <div
                                        className="text-4xl mb-4"
                                    >
                                        <Quote size={42} className="text-secondary/20" />
                                    </div>


                                    <p className="text-gray-700 text-lg italic mb-8">&quot;{testimonial.content}&quot;</p>

                                    <div className="border-t border-gray-100 pt-6">
                                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                                        <div className="text-xs text-[#008020] font-medium mt-1">{testimonial.organization}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl lg:p-12 p-5 border-2 border-gray-100 shadow-xl"
                    >
                        <h2 className="text-[32px] md:text-[48px] font-bold text-gray-900 mb-4">
                            Connect with <span className="text-gradient">The Innovator</span>
                        </h2>
                        <p className="text-gray-700 text-[16px] mb-10 lg:w-[400px] w-auto mx-auto">
                            Explore fitness innovations, join community events, or inquire about professional services.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Link href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-[#ff8a00] text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:shadow-[#ff8a00]/25 transition-all duration-300 cursor-pointer lg:w-auto w-full"
                                >
                                    Contact for Services
                                </motion.button>
                            </Link>
                            <Link href="/events">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-white text-gray-900 text-lg font-bold rounded-xl border-2 border-gray-200 hover:border-[#008020] hover:shadow-xl transition-all duration-300 cursor-pointer lg:w-auto w-full"
                                >
                                    Join an Event
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default InnovatorPage;