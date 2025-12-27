import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Users, Music, Heart, Award } from 'lucide-react';

const AfroGroovePage = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // Event statistics - Cultural fitness focus
    const eventStats = [
        { number: '150+', label: 'Participants', color: '#008020', icon: <Users size={20} /> },
        { number: '100%', label: 'Cultural Immersion', color: '#ffde00', icon: <Music size={20} /> },
        { number: '3+', label: 'Hours of Energy', color: '#ff8a00', icon: <Heart size={20} /> },
        { number: 'Unique', label: 'Fitness Fusion', color: '#008020', icon: <Award size={20} /> }
    ];

    // Cultural elements
    const culturalElements = [
        {
            title: 'Traditional Rhythms',
            description: 'Authentic African drum patterns and beats that connect you to ancestral energy',
            color: '#008020',
            pattern: '🎵'
        },
        {
            title: 'Dance Heritage',
            description: 'Movements inspired by traditional African dances from different cultures',
            color: '#ffde00',
            pattern: '💃'
        },
        {
            title: 'Community Spirit',
            description: 'Building connections through shared cultural experience and collective energy',
            color: '#ff8a00',
            pattern: '👥'
        }
    ];

    // Gallery images
    const galleryImages = [
        { src: '/groove1.jpeg', title: 'Afro Groove Dance Fitness', category: 'Cultural Movement' },
        { src: '/groove2.jpeg', title: 'Cultural Fitness Fusion', category: 'Traditional Rhythm' },
        { src: '/groove3.jpeg', title: 'Traditional Dance Moves', category: 'Ancestral Steps' },
        { src: '/groove4.jpeg', title: 'Rhythm & Movement', category: 'Energetic Flow' }
    ];

    // What to expect
    const expectations = [
        {
            title: 'Warm-up with Cultural Beats',
            description: 'Start with gentle movements to traditional African rhythms',
            icon: '🥁'
        },
        {
            title: 'Learn Traditional Dance Steps',
            description: 'Step-by-step guidance on authentic African dance movements',
            icon: '👣'
        },
        {
            title: 'High-Energy Dance Routines',
            description: 'Combine steps into flowing, energetic dance sequences',
            icon: '⚡'
        },
        {
            title: 'Cool Down & Cultural Connection',
            description: 'Reflect on the cultural significance while cooling down',
            icon: '🌍'
        }
    ];

    // Testimonials
    const testimonials = [
        {
            name: 'Folake Adeyemi',
            role: 'Cultural Enthusiast',
            content: 'AfroGroove connected me to my roots in the most beautiful way. The energy was incredible!',
            culturalBackground: 'Yoruba heritage'
        },
        {
            name: 'Ekong Udo',
            role: 'Fitness Newcomer',
            content: 'I never knew fitness could be this fun! The cultural aspect made me forget I was working out.',
            culturalBackground: 'Efik culture'
        },
        {
            name: 'Amina Ibrahim',
            role: 'Dance Instructor',
            content: 'As a dance professional, I appreciate how authentically AfroGroove preserves traditional movements.',
            culturalBackground: 'Hausa culture'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Cultural Pattern Background */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-8 overflow-hidden">

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-[#008020]/5 via-transparent to-[#ffde00]/5" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Cultural Badge */}
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#008020]/10 border border-[#008020]/20 mb-6">
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#ffde00]" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#008020]" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff8a00]" />
                                </div>
                                <span className="text-[#008020] font-medium text-sm">
                                    Cultural Fitness Collaboration
                                </span>
                            </div>

                            <h1 className="text-[40px] md:text-[54px] lg:text-[60px] font-bold text-gray-900 mb-4 leading-tight">
                                AfroGroove:
                                <span className="block text-[#ff8a00]">Where Culture</span>
                                <span className="block text-gray-900">Meets Fitness</span>
                            </h1>

                            <p className="text-gray-600 text-lg mb-8 leading-normal">
                                A fitness collaboration with the University of Ilorin Sports Council,
                                blending traditional African dance with modern fitness techniques. Experience the
                                rhythm, energy, and community spirit of African culture in a transformative workout.
                            </p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                                {eventStats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="text-center p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="flex justify-center mb-2" style={{ color: stat.color }}>
                                            {stat.icon}
                                        </div>
                                        <div
                                            className="text-2xl font-bold mb-1"
                                            style={{ color: stat.color }}
                                        >
                                            {stat.number}
                                        </div>
                                        <div className="text-xs text-gray-600">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-8 py-4 bg-[#ff8a00] cursor-pointer text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                                >
                                    <Play size={20} />
                                    Experience the Rhythm
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-8 py-4 bg-white cursor-pointer text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-[#ff8a00] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
                                >
                                    <span className="text-lg">🌍</span>
                                    View Cultural Moments
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Hero Media - Cultural Showcase */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#ff8a00]/20">
                                <video
                                    src="/afrovid.mp4"
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />


                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-[#ff8a00] flex items-center justify-center shadow-lg group hover:scale-110 transition-transform duration-300">
                                        <Play size={24} className="text-white ml-1" />
                                    </div>
                                </div>
                            </div>

                            {/* Cultural Pattern Accents */}
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-3xl border-2 border-[#ff8a00]/10 -z-10" />
                            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-[#008020]/10 blur-xl" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Cultural Fusion Section */}
            <section className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-b from-white to-[#008020]/5">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 mb-6">
                            <div className="w-12 h-0.5 bg-[#ff8a00]" />
                            <div className="text-[#008020] font-medium">Cultural Fusion</div>
                            <div className="w-12 h-0.5 bg-[#ff8a00]" />
                        </div>
                        <h2 className="text-[32px] lg:text-[42px] font-bold text-gray-900 mb-4">
                            More Than <span className="text-[#008020]">Fitness</span>—It&apos;s <span className="text-[#ff8a00]">Heritage</span>
                        </h2>
                        <p className="text-gray-600 text-[16px] lg:w-[550px] w-auto mx-auto">
                            AfroGroove isn&apos;t just a workout—it&apos;s a celebration of African culture, rhythm, and community spirit.
                        </p>
                    </motion.div>

                    {/* Cultural Elements Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {culturalElements.map((element, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group"
                            >
                                <div
                                    className="p-8 rounded-2xl bg-white border-2 border-gray-100 hover:shadow-xl transition-all duration-300 h-full"
                                    style={{ borderTopColor: element.color, borderTopWidth: '4px' }}
                                >
                                    {/* Pattern Symbol */}
                                    <div
                                        className="text-4xl mb-6"
                                        style={{ color: element.color }}
                                    >
                                        {element.pattern}
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{element.title}</h3>
                                    <p className="text-gray-600">{element.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="relative mt-6">
                        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border-2 border-[#ff8a00]/20 group">
                            <Image
                                src="/unilorin.jpg"
                                alt="University of Ilorin Sports Council Partnership"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Dark overlay for better text visibility */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />

                            {/* University logo/text overlay */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
                                <div className="text-center">
                                    <div className="text-4xl mb-3">🎓</div>
                                    <h4 className="text-2xl font-bold text-white mb-2">University of Ilorin</h4>
                                    <div className="w-16 h-1 bg-[#ff8a00] mx-auto mb-3" />
                                    <p className="text-white/90 text-lg">Sports Council</p>
                                    <p className="text-white/80 text-sm mt-1">Official Partnership</p>
                                </div>
                            </div>

                        </div>
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl border-2 border-[#ff8a00]/20 -z-10" />
                    </div>
                </div>
            </section>

            {/* The Experience Section */}
            <section id="experience" className="py-16 md:py-24 px-4 md:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            The <span className="text-[#ff8a00]">AfroGroove</span> Experience
                        </h2>
                        <p className="text-gray-600 text-[16px] lg:w-[410px] w-auto mx-auto leading-normal">
                            A journey through rhythm, movement, and cultural connection.
                        </p>
                    </motion.div>

                    {/* Experience Timeline */}
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-linear-to-b from-[#008020] via-[#ffde00] to-[#ff8a00] hidden md:block" />

                        {/* Experience Steps */}
                        <div className="space-y-12">
                            {expectations.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Left Content */}
                                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                                        <div className="inline-flex items-center gap-3 mb-4">
                                            <div
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                                                style={{ backgroundColor: ['#008020', '#ffde00', '#ff8a00', '#008020'][index] + '20' }}
                                            >
                                                {step.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                                        </div>
                                        <p className="text-gray-600">{step.description}</p>
                                    </div>

                                    {/* Center Dot */}
                                    <div className="hidden md:block relative">
                                        <div
                                            className="w-6 h-6 rounded-full border-4 border-white"
                                            style={{ backgroundColor: ['#008020', '#ffde00', '#ff8a00', '#008020'][index] }}
                                        />
                                    </div>

                                    {/* Right Spacer */}
                                    <div className="md:w-1/2" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-b from-white to-[#ffde00]/5">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Cultural <span className="text-[#ff8a00]">Moments</span> Captured
                        </h2>
                        <p className="text-gray-600 text-[16px] lg:w-[410px] w-auto mx-auto leading-normal">
                            Experience the vibrant energy and cultural richness through these moments.
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
                                <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-gray-100 hover:border-[#ff8a00] transition-all duration-300">
                                    <Image
                                        src={image.src}
                                        alt={image.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="text-sm font-semibold text-white">{image.title}</div>
                                            <div
                                                className="text-xs font-medium mt-1"
                                                style={{ color: ['#ff8a00', '#008020', '#ffde00', '#008020'][index % 4] }}
                                            >
                                                {image.category}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Full Video Experience */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12"
                    >
                        <div className="relative rounded-3xl overflow-hidden border-2 border-gray-100 shadow-xl">
                            <video
                                src="/afrovid.mp4"
                                className="w-full lg:h-[450px] h-[300px] max-h-[600px] object-cover"
                                controls
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-gray-900/80 to-transparent">
                                <h3 className="text-xl font-bold text-white">Full AfroGroove Experience</h3>
                                <p className="text-gray-300 text-sm">Immerse yourself in the complete cultural fitness journey</p>
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
                        <h2 className="text-[30px] lg:text-[40px] font-bold text-gray-900 mb-3">
                            Voices from the <span className="text-[#ff8a00]">Community</span>
                        </h2>
                        <p className="text-gray-600 text-[16px] lg:w-[370px] w-auto mx-auto leading-tight">
                            Hear from participants who experienced the cultural connection.
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
                                {/* Cultural Background Badge */}
                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-[#ff8a00]/10 text-[#ff8a00]">
                                    {testimonial.culturalBackground}
                                </div>

                                {/* Testimonial Content */}
                                <div className="my-6">
                                    <p className="text-gray-700 italic">&quot;{testimonial.content}&quot;</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#ff8a00] to-[#ffde00] flex items-center justify-center font-bold text-white">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                                    </div>
                                </div>

                                {/* Cultural Pattern Decoration */}
                                <div className="absolute -bottom-2 -right-2 w-12 h-12 opacity-5">
                                    <div className="text-4xl">🎵</div>
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
                        {/* Cultural Pattern Header */}
                        <div className="flex justify-center gap-4 mb-8">
                            <div className="w-8 h-0.5 bg-[#008020] mt-3" />
                            <div className="text-2xl">✨</div>
                            <div className="w-8 h-0.5 bg-[#ff8a00] mt-3" />
                        </div>

                        <h2 className="text-[30px] lg:text-[40px] font-bold text-gray-900 mb-6">
                            Ready to Experience <br className="block lg:hidden" /> <span className="text-[#ff8a00]">Cultural</span> Fitness?
                        </h2>

                        <p className="text-gray-700 text-[16px] mb-10 max-w-2xl mx-auto">
                            Join our community to be notified about the next AfroGroove session. Experience the perfect
                            fusion of cultural heritage and modern fitness in collaboration with the University of Ilorin.
                        </p>

                        {/* Email Subscription Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mb-8"
                        >
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    alert('Thank you! You\'ll be notified about the next AfroGroove session.');
                                }}
                                className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
                            >
                                <div className="flex-1">
                                    <input
                                        type="email"
                                        placeholder="Enter your email for cultural fitness updates"
                                        required
                                        className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#008020] focus:ring-2 focus:ring-[#008020]/20 transition-all duration-300"
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-[#ff8a00] text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 text-lg flex items-center justify-center gap-3 min-w-[200px] cursor-pointer"
                                >
                                    Stay Connected
                                </motion.button>
                            </form>
                            <p className="text-gray-500 text-sm mt-3">
                                Celebrate culture. Stay fit. Join the movement.
                            </p>
                        </motion.div>

                        <div className="mt-12 pt-8 border-t border-gray-300/30">
                            <p className="text-gray-600">
                                <span className="font-semibold text-[#008020]">In Partnership with University of Ilorin Sports Council</span><br />
                                <span className="text-sm">Bridging cultural heritage with modern fitness innovation</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AfroGroovePage;