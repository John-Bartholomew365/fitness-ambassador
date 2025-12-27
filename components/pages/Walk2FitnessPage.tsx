import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Walk2FitnessPage = () => {
    const [selectedEdition, setSelectedEdition] = useState<string>('4.0');
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    // Event statistics and highlights
    const eventStats = [
        { number: '4', label: 'Successful Editions', color: '#008020' },
        { number: '2000+', label: 'Total Participants', color: '#ffde00' },
        { number: '98%', label: 'Satisfaction Rate', color: '#ff8a00' },
        { number: '5.0', label: 'Next Edition Coming', color: '#008020' }
    ];

    // Edition details
    const editions = [
        {
            version: '1.0',
            year: '2021',
            participants: '2000+',
            highlights: ['Inaugural event', 'Community foundation', 'Mass participation'],
            description: 'The groundbreaking first edition that established Walk2Fitness as Ilorin\'s premier walking fitness movement. This edition set the foundation for progressive outdoor fitness.',
            images: ['/one1.jpeg', '/one2.jpeg', '/one3.jpeg']
        },
        {
            version: '2.0',
            year: '2022',
            participants: '300+',
            highlights: ['Enhanced structure', 'Better organization', 'Improved routines'],
            description: 'Building on our initial success, Walk2Fitness 2.0 introduced structured progression paths and specialized workout zones for different fitness levels.',
            images: ['/two1.jpeg', '/two2.jpeg', '/two3.jpeg']
        },
        {
            version: '3.0',
            year: '2023',
            participants: '400+',
            highlights: ['Expert trainers', 'Community challenges', 'Wellness integration'],
            description: 'This edition marked our evolution into a holistic fitness experience, incorporating recovery sessions and personalized fitness assessments.',
            images: ['/three1.jpeg', '/three2.jpeg', '/three3.jpeg']
        },
        {
            version: '4.0',
            year: '2024',
            participants: '500+',
            highlights: ['Advanced training', 'Digital integration', 'Record participation'],
            description: 'Our most sophisticated edition yet, featuring tech-enhanced tracking, specialized training modules, and the largest community engagement to date.',
            images: ['/four1.jpeg', '/four2.jpeg', '/walk.jpg', '/four3.jpeg', '/four4.jpeg']
        }
    ];

    // Testimonials
    const testimonials = [
        {
            name: 'Aisha Bello',
            role: 'Participant since 1.0',
            content: 'From 1.0 to 4.0, I\'ve watched Walk2Fitness transform from a simple walking event to a comprehensive fitness movement. The progression system actually works!',
            rating: 5,
            edition: 'All Editions'
        },
        {
            name: 'Tunde Olamide',
            role: 'Fitness Enthusiast',
            content: 'The structured approach in 4.0 helped me lose 1000+ calories. The community support and expert guidance made all the difference in my fitness journey.',
            rating: 5,
            edition: '4.0 Participant'
        },
        {
            name: 'Chiamaka Okoro',
            role: 'Healthcare Professional',
            content: 'As a doctor, I appreciate how Walk2Fitness promotes sustainable fitness. The progression through editions shows thoughtful planning for long-term health.',
            rating: 5,
            edition: '3.0 & 4.0'
        }
    ];

    // Selected edition data
    const currentEdition = editions.find(ed => ed.version === selectedEdition) || editions[3];

    return (
        <div className="min-h-screen bg-linear-to-b from-white to-gray-50/30">
            {/* Hero Section */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-8 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#008020]/10 text-[#008020] font-medium text-sm mb-6">
                                Ilorin&apos;s Premier Walking Fitness Movement
                            </div>

                            <h1 className="text-[40px] md:text-[54px] lg:text-[60px] font-bold text-gray-900 lg:mb-5 mb-4 leading-tight">
                                Walk2Fitness:<br />
                                <span className="text-[#008020]">Progressive Outdoor Fitness</span>
                            </h1>

                            <p className="text-gray-600 text-[16px] mb-8 leading-normal">
                                With 4 successful editions already transforming lives in Ilorin, Kwara State, Walk2Fitness has grown from a community walking event into a structured fitness movement that progressively builds strength, endurance, and community connection.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                                {eventStats.map((stat, index) => (
                                    <div key={index} className="text-center p-4 rounded-xl bg-white border-2 border-gray-100">
                                        <div
                                            className="text-[28px] font-bold mb-2"
                                            style={{ color: stat.color }}
                                        >
                                            {stat.number}
                                        </div>
                                        <div className="text-sm text-gray-600">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="https://www.tixtango.com/spotlight/walk2fitness-50" target="_blank" rel="noopener noreferrer">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 bg-[#008020] cursor-pointer text-white font-semibold rounded-xl hover:shadow-xl transition-shadow duration-300 lg:w-auto w-full"
                                    >
                                        Register for Walk2Fitness 5.0
                                    </motion.button>
                                </Link>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => document.getElementById('editions')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-8 py-4 bg-white cursor-pointer text-[#008020] font-semibold rounded-xl border-2 border-[#008020] hover:shadow-xl transition-all duration-300"
                                >
                                    Explore Past Editions
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Hero Image/Video */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                                <video
                                    src="/walkvid.mp4"
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-3xl border-4 border-[#008020]/20 -z-10" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What is Walk2Fitness */}
            <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-2 h-2 rounded-full bg-[#008020]" />
                            <div className="w-2 h-2 rounded-full bg-[#ffde00]" />
                            <div className="w-2 h-2 rounded-full bg-[#ff8a00]" />
                        </div>
                        <h2 className="text-[32px] lg:text-5xl font-bold text-gray-900 mb-6">
                            More Than Just a Walk
                        </h2>
                        <p className="text-gray-600 text-[16px] max-w-3xl mx-auto">
                            A progressive fitness series that transforms outdoor walking into structured, results-driven workouts. Each edition builds upon the last, creating a measurable journey from beginner to advanced.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Progressive Structure',
                                description: 'Each version (1.0 to 4.0) introduces new challenges and training methodologies, ensuring continuous growth for participants.',
                                color: '#008020'
                            },
                            {
                                title: 'Community Focus',
                                description: 'Built around the vibrant Ilorin fitness community, creating accountability and support systems that last beyond the event.',
                                color: '#ffde00'
                            },
                            {
                                title: 'Measurable Results',
                                description: 'From fitness tracking to milestone celebrations, every edition is designed to deliver visible, measurable progress.',
                                color: '#ff8a00'
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-300"
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold mb-6"
                                    style={{
                                        backgroundColor: `${feature.color}15`,
                                        color: feature.color
                                    }}
                                >
                                    0{index + 1}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Edition Timeline */}
            <section id="editions" className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            The <span className="text-gradient">Evolution</span> Journey
                        </h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            From our inaugural 1.0 edition to the sophisticated 4.0 experience, watch how Walk2Fitness has evolved while staying true to our core mission.
                        </p>
                    </motion.div>

                    <div className="mb-12">
                        {/* Instructional Text */}
                        <div className="text-center mb-6">
                            <p className="text-gray-600 text-sm md:text-base italic">
                                <span className="font-semibold text-[#008020]">Click any version</span> to explore its details, highlights, and images from that edition.
                            </p>
                        </div>

                        {/* Version Buttons */}
                        <div className="flex flex-wrap justify-center gap-4">
                            {editions.map((edition) => (
                                <button
                                    key={edition.version}
                                    onClick={() => setSelectedEdition(edition.version)}
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer lg:w-auto w-full ${selectedEdition === edition.version ? 'ring-4 ring-opacity-30' : 'hover:shadow-lg'}`}
                                    style={{
                                        backgroundColor: selectedEdition === edition.version ? '#008020' : 'white',
                                        color: selectedEdition === edition.version ? 'white' : '#008020',
                                        border: `2px solid ${selectedEdition === edition.version ? '#008020' : '#e5e7eb'}`
                                    }}
                                >
                                    Version {edition.version} ({edition.year})
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Selected Edition Details */}
                    <motion.div
                        key={selectedEdition}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-gray-200"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div
                                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black text-white"
                                        style={{ backgroundColor: '#008020' }}
                                    >
                                        {currentEdition.version}
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-gray-900">
                                            Walk2Fitness {currentEdition.version}
                                        </h3>
                                        <p className="text-gray-600">{currentEdition.year} • {currentEdition.participants} Participants</p>
                                    </div>
                                </div>

                                <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                                    {currentEdition.description}
                                </p>

                                <div className="space-y-4 mb-8">
                                    <h4 className="text-xl font-bold text-gray-900">Key Highlights:</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {currentEdition.highlights.map((highlight, index) => (
                                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                                <div className="w-2 h-2 rounded-full bg-[#008020]" />
                                                <span className="font-medium text-gray-900">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Edition Images */}
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                                {currentEdition.images.map((img, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Walk2Fitness ${currentEdition.version} - Image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm font-medium text-gray-700">Edition Progress</span>
                                <span className="text-sm text-gray-600">{currentEdition.version} Completed</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(parseFloat(currentEdition.version) / 5) * 100}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-linear-to-r from-[#008020] to-[#008020]/80 rounded-full"
                                />
                            </div>
                            <div className="flex justify-between mt-2">
                                {['1.0', '2.0', '3.0', '4.0', '5.0'].map((version) => (
                                    <div key={version} className="text-center">
                                        <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${currentEdition.version === version ? 'bg-[#008020]' : 'bg-gray-300'}`} />
                                        <span className={`text-xs ${currentEdition.version === version ? 'font-bold text-[#008020]' : 'text-gray-500'}`}>
                                            {version}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            What Our <span className="text-gradient">Community</span> Says
                        </h2>
                        <p className="text-gray-600 text-[16px] max-w-3xl mx-auto">
                            Hear from participants who have experienced the Walk2Fitness transformation journey.
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
                                className="bg-linear-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-100"
                            >
                                {/* Rating Stars */}
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-[#ffde00] text-xl">★</span>
                                    ))}
                                </div>

                                <p className="text-gray-700 italic mb-6">&quot;{testimonial.content}&quot;</p>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-[#008020]/10 flex items-center justify-center text-[#008020] font-bold">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-600">{testimonial.role} • {testimonial.edition}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 md:py-24 px-3 lg:px-8 bg-linear-to-br from-[#008020]/5 to-[#008020]/10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-[#008020]" />
              <div className="w-3 h-3 rounded-full bg-[#ffde00]" />
              <div className="w-3 h-3 rounded-full bg-[#ff8a00]" />
            </div> */}

                        <h2 className="text-[32px] lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
                            Ready for Walk2Fitness <span className="text-gradient">5.0</span> ?
                        </h2>

                        <p className="text-gray-700 text-[16px] mb-10 max-w-2xl mx-auto leading-normal">
                            Join the next chapter of Ilorin&apos;s most progressive fitness movement. Building on 4 successful editions, version 5.0 introduces advanced training modules, enhanced community features, and personalized progression tracking.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="https://www.tixtango.com/spotlight/walk2fitness-50" target="_blank" rel="noopener noreferrer">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-4 bg-[#008020] text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 text-[16px] lg:w-auto w-[90%] cursor-pointer"
                                >
                                    Secure Your Spot for 5.0
                                </motion.button>
                            </Link>
                            <Link href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-4 bg-white text-[#008020] font-semibold rounded-xl border-2 border-[#008020] hover:shadow-2xl transition-all duration-300 text-[16px] lg:w-auto w-[90%] cursor-pointer"
                                >
                                    Contact Us
                                </motion.button>
                            </Link>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-300/30">
                            <p className="text-gray-600">
                                <span className="font-semibold">Location:</span> Ilorin, Kwara State<br />
                                {/* <span className="text-sm">Multiple venues across the city for maximum accessibility</span> */}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Walk2FitnessPage;