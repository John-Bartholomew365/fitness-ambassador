import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AerobicsIceBathPage = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'aerobics' | 'icebath'>('aerobics');

    // Event statistics - Heat/Cold contrast theme
    const eventStats = [
        { number: '80+', label: 'Participants', color: '#ff8a00', theme: 'heat' },
        { number: '2-in-1', label: 'Experience', color: '#008020', theme: 'fusion' },
        { number: '100%', label: 'Recovery Boost', color: '#1e90ff', theme: 'cold' },
        { number: 'Coming', label: 'Next Session', color: '#ffde00', theme: 'upcoming' }
    ];

    // The Experience Contrast
    const experienceContrast = [
        {
            phase: 'Heat Phase',
            title: 'High-Energy Aerobics',
            description: 'Intense cardiovascular workout that elevates heart rate, builds endurance, and burns calories through dynamic movements and rhythmic exercises.',
            benefits: [
                'Cardiovascular conditioning',
                'Fat burning & metabolism boost',
                'Endurance building',
                'Mood elevation through endorphins'
            ],
            color: '#ff8a00',
            bgColor: 'from-[#ff8a00]/5 to-transparent',
            borderColor: 'border-[#ff8a00]/20'
        },
        {
            phase: 'Cold Phase',
            title: 'Ice Bath Recovery',
            description: 'Controlled cold exposure therapy that reduces inflammation, accelerates muscle recovery, and enhances mental resilience through deliberate cold immersion.',
            benefits: [
                'Muscle inflammation reduction',
                'Recovery acceleration',
                'Mental fortitude building',
                'Circulation improvement'
            ],
            color: '#1e90ff',
            bgColor: 'from-[#1e90ff]/5 to-transparent',
            borderColor: 'border-[#1e90ff]/20'
        }
    ];

    // Gallery images
    const galleryImages = [
        {
            src: '/ice1.jpeg',
            title: 'Aerobics + Ice Bath Session',
            category: 'Heat & Cold Fusion',
            phase: 'aerobics'
        },
        {
            src: '/ice.jpeg',
            title: 'Ice Bath Recovery',
            category: 'Cold Therapy',
            phase: 'icebath'
        }
    ];

    // Science Behind It
    const scienceFacts = [
        {
            title: 'Thermal Contrast Therapy',
            description: 'The strategic alternation between heat-inducing exercise and cold exposure creates a powerful physiological response that enhances recovery beyond either method alone.',
            color: '#008020'
        },
        {
            title: 'Inflammation Control',
            description: 'High-intensity exercise causes micro-tears in muscle fibers (inflammation), while ice baths constrict blood vessels to reduce swelling and flush out metabolic waste.',
            color: '#ff8a00'
        },
        {
            title: 'Endorphin Release',
            description: 'Aerobics releases feel-good endorphins, while ice baths trigger a stress response that builds mental resilience and creates a natural high post-recovery.',
            color: '#1e90ff'
        }
    ];

    // Testimonials
    const testimonials = [
        {
            name: 'Chinedu Okafor',
            role: 'Marathon Runner',
            content: 'The combination changed how my body responds after intense runs. My muscles feel less sore, and I bounce back quicker compared to other recovery routines I’ve used.',
            highlight: 'Faster recovery than ever'
        },
        {
            name: 'Fatima Bello',
            role: 'Fitness Instructor',
            content: 'Teaching aerobics for years, but adding ice baths transformed the experience. Participants leave feeling energized AND recovered.',
            highlight: 'Energized and recovered'
        },
        {
            name: 'David Chen',
            role: 'Office Professional',
            content: 'As someone who sits all day, this combo fixed my back pain and gave me energy I didn\'t know I had.',
            highlight: 'Fixed chronic pain'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Split Temperature Theme */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-8 overflow-hidden">
                {/* Split Background Effect */}
                <div className="absolute inset-0">
                    <div className="absolute inset-y-0 left-0 right-1/2 bg-linear-to-r from-[#ff8a00]/10 to-transparent" />
                    <div className="absolute inset-y-0 left-1/2 right-0 bg-linear-to-l from-[#1e90ff]/10 to-transparent" />
                </div>

                {/* Dividing Line */}
                <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-linear-to-b from-[#ff8a00] via-gray-300 to-[#1e90ff] hidden lg:block" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Heat Badge */}
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#ff8a00]/10 border border-[#ff8a00]/20 mb-6">
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff8a00]" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff8a00]" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff8a00]" />
                                </div>
                                <span className="text-[#ff8a00] font-medium text-sm">
                                    Heat & Cold Fusion
                                </span>
                            </div>

                            <h1 className="text-[40px] md:text-[54px] lg:text-[60px] font-bold text-gray-900 mb-4 leading-tight">
                                Aerobics
                                <span className="block text-[#ff8a00]">+ Ice Bath</span>
                                <span className="block text-gray-900">Dual Experience</span>
                            </h1>

                            <p className="text-gray-600 text-lg mb-8 leading-normal">
                                A revolutionary fitness collaboration with Massage Alchemy that combines
                                high-energy aerobics with therapeutic ice bath recovery. Experience the
                                perfect balance of intense exertion and deep recovery in one transformative session.
                            </p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                                {eventStats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="text-center p-4 rounded-xl bg-white border-2 border-gray-100 hover:shadow-lg transition-all duration-300"
                                    >
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
                            {/* <div className="flex flex-col sm:flex-row gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveTab('aerobics')}
                                    className="px-8 py-4 bg-[#ff8a00] cursor-pointer text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
                                >
                                    Explore Aerobics Phase
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveTab('icebath')}
                                    className="px-8 py-4 bg-white cursor-pointer text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-[#1e90ff] hover:shadow-lg transition-all duration-300"
                                >
                                    Discover Ice Bath Benefits
                                </motion.button>
                            </div> */}
                        </motion.div>

                        {/* Hero Media - Split Temperature Visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100">
                                {/* Split Image Container */}
                                <div className="absolute inset-0 flex">
                                    {/* Aerobics Side */}
                                    <div className="relative w-1/2 h-full overflow-hidden">
                                        <Image
                                            src="/ice1.jpeg"
                                            alt="Aerobics Session"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-[#ff8a00]/20 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 to-transparent">
                                            <div className="text-white font-semibold">Aerobics Phase</div>
                                            <div className="text-white/80 text-sm">Heat Generation</div>
                                        </div>
                                    </div>

                                    {/* Ice Bath Side */}
                                    <div className="relative w-1/2 h-full overflow-hidden">
                                        <Image
                                            src="/ice.jpeg"
                                            alt="Ice Bath Recovery"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-[#1e90ff]/20 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 to-transparent">
                                            <div className="text-white font-semibold">Ice Bath Phase</div>
                                            <div className="text-white/80 text-sm">Cold Recovery</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Center Divider */}
                                <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-linear-to-b from-white via-gray-300 to-white" />

                                {/* Temperature Labels */}
                                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#ff8a00]/80 text-white text-sm font-medium">
                                    18°C
                                </div>
                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#1e90ff]/80 text-white text-sm font-medium">
                                    10°C
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-3xl border-2 border-[#ff8a00]/10 -z-10" />
                            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-[#1e90ff]/10 blur-xl" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* The Dual Experience */}
            <section className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 mb-6">
                            <div className="w-12 h-0.5 bg-[#ff8a00]" />
                            <div className="text-[#008020] font-medium">Dual Experience</div>
                            <div className="w-12 h-0.5 bg-[#1e90ff]" />
                        </div>
                        <h2 className="text-[32px] lg:text-[42px] font-bold text-gray-900 mb-4">
                            <span className="text-[#ff8a00]">Heat</span> & <span className="text-[#1e90ff]">Cold</span> in Harmony
                        </h2>
                        <p className="text-gray-600 text-[16px] lg:w-[550px] w-auto mx-auto">
                            Two contrasting experiences, one transformative result. Discover the science behind thermal contrast therapy.
                        </p>
                    </motion.div>

                    {/* Experience Tabs */}
                    <div className="mb-12">
                        {/* Tab Buttons */}
                        <div className="lg:flex block justify-center gap-4 mb-8">
                            <button
                                onClick={() => setActiveTab('aerobics')}
                                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer lg:w-auto w-full lg:mb-0 mb-3 ${activeTab === 'aerobics' ? 'ring-4 ring-opacity-30' : 'hover:shadow-lg'}`}
                                style={{
                                    backgroundColor: activeTab === 'aerobics' ? '#ff8a00' : 'white',
                                    color: activeTab === 'aerobics' ? 'white' : '#ff8a00',
                                    border: `2px solid ${activeTab === 'aerobics' ? '#ff8a00' : '#e5e7eb'}`
                                }}
                            >
                                Aerobics Phase
                            </button>
                            <button
                                onClick={() => setActiveTab('icebath')}
                                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer lg:w-auto w-full ${activeTab === 'icebath' ? 'ring-4 ring-opacity-30' : 'hover:shadow-lg'}`}
                                style={{
                                    backgroundColor: activeTab === 'icebath' ? '#1e90ff' : 'white',
                                    color: activeTab === 'icebath' ? 'white' : '#1e90ff',
                                    border: `2px solid ${activeTab === 'icebath' ? '#1e90ff' : '#e5e7eb'}`
                                }}
                            >
                                Ice Bath Phase
                            </button>
                        </div>

                        {/* Active Tab Content */}
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-3xl lg:p-8 p-5 border-2 border-gray-100"
                        >
                            {experienceContrast
                                .filter(exp => {
                                    if (activeTab === 'aerobics') return exp.phase === 'Heat Phase';
                                    if (activeTab === 'icebath') return exp.phase === 'Cold Phase';
                                    return false;
                                })
                                .map((experience) => (
                                    <div key={experience.phase} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        <div>
                                            <div className="flex items-center gap-4 mb-8">
                                                <div
                                                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
                                                    style={{ backgroundColor: experience.color }}
                                                >
                                                    {experience.phase === 'Heat Phase' ? '🔥' : '❄️'}
                                                </div>
                                                <div>
                                                    <h3 className="text-3xl font-bold text-gray-900">
                                                        {experience.title}
                                                    </h3>
                                                    <p className="text-gray-600">{experience.phase}</p>
                                                </div>
                                            </div>

                                            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                                                {experience.description}
                                            </p>

                                            <div className="space-y-4">
                                                <h4 className="text-xl font-bold text-gray-900">Key Benefits:</h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {experience.benefits.map((benefit, index) => (
                                                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                                            <div
                                                                className="w-2 h-2 rounded-full"
                                                                style={{ backgroundColor: experience.color }}
                                                            />
                                                            <span className="font-medium text-gray-900 text-[14px]">{benefit}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <div className={`relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border-2 ${experience.borderColor} bg-linear-to-br ${experience.bgColor}`}>
                                                {galleryImages
                                                    .filter(img => {
                                                        if (activeTab === 'aerobics') return img.phase === 'aerobics';
                                                        if (activeTab === 'icebath') return img.phase === 'icebath';
                                                        return false;
                                                    })
                                                    .map((image) => (
                                                        <Image
                                                            key={image.src}
                                                            src={image.src}
                                                            alt={image.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ))}
                                                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </motion.div>
                    </div>

                    {/* Science Facts */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {scienceFacts.map((fact, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl bg-white border-2 border-gray-100 hover:shadow-lg transition-all duration-300"
                                style={{ borderLeftColor: fact.color, borderLeftWidth: '4px' }}
                            >
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{fact.title}</h3>
                                <p className="text-gray-600">{fact.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Collaboration Highlight */}
            <section className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-r from-[#ff8a00]/5 via-white to-[#1e90ff]/5">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-[28px] lg:text-[40px] font-bold text-gray-900 mb-3">
                            In Collaboration with <span className="text-[#ff8a00]">Massage Alchemy</span>
                        </h2>
                        <p className="text-gray-600 text-[16px] lg:w-[410px] w-auto mx-auto leading-normal">
                            Professional wellness expertise meets innovative fitness methodology.
                        </p>
                    </motion.div>

                    <div className="bg-white rounded-3xl lg:p-8 p-5 border-2 border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="lg:text-[28px] text-[24px] font-bold text-gray-900 mb-6">
                                    Why This <span className="text-[#ff8a00]">Collaboration</span> Works
                                </h3>
                                <p className="text-gray-700 mb-6">
                                    Massage Alchemy brings professional recovery expertise to complement
                                    high-intensity aerobics. This partnership ensures every participant
                                    experiences safe, effective, and scientifically-backed thermal contrast therapy.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        'Certified aerobics instructors for optimal workout intensity',
                                        'Wellness experts monitoring ice bath safety protocols',
                                        'Scientific approach to thermal contrast timing',
                                        'Personalized recovery recommendations post-session'
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-[#008020]/10 flex items-center justify-center shrink-0 mt-0.5">
                                                <div className="w-2 h-2 rounded-full bg-[#008020]" />
                                            </div>
                                            <span className="text-gray-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border-2 border-gray-100">
                                    {/* Placeholder for Massage Alchemy visual - could be their logo or related image */}
                                    <div className="absolute inset-0 bg-linear-to-br from-[#ff8a00]/10 to-[#1e90ff]/10 flex items-center justify-center">
                                        <div className="text-center p-8">
                                            <div className="text-4xl mb-4">⚗️</div>
                                            <h4 className="text-2xl font-bold text-gray-900">Massage Alchemy</h4>
                                            <p className="text-gray-600 mt-2">Professional Wellness Partners</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                            <span className="text-[#ff8a00]">Transformative</span> Experiences
                        </h2>
                        <p className="text-gray-600 text-[16px] lg:w-[370px] w-auto mx-auto leading-normal">
                            Hear from those who&apos;ve experienced the heat-cold contrast.
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
                                style={{
                                    borderTopColor: ['#ff8a00', '#008020', '#1e90ff'][index],
                                    borderTopWidth: '4px'
                                }}
                            >
                                <div className="my-6">
                                    <p className="text-gray-700 italic">&quot;{testimonial.content}&quot;</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                                        style={{ backgroundColor: ['#ff8a00', '#008020', '#1e90ff'][index] }}
                                    >
                                        {testimonial.name.charAt(0)}
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                                    </div>
                                </div>

                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium"
                                    style={{
                                        backgroundColor: ['#ff8a00', '#008020', '#1e90ff'][index] + '15',
                                        color: ['#ff8a00', '#008020', '#1e90ff'][index]
                                    }}
                                >
                                    {testimonial.highlight}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-br from-[#ff8a00]/5 via-white to-[#1e90ff]/5">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* Temperature Symbol Header */}
                        <div className="flex justify-center gap-6 mb-8">
                            <div className="text-3xl">🔥</div>
                            <div className="text-3xl">+</div>
                            <div className="text-3xl">❄️</div>
                        </div>

                        <h2 className="text-[30px] lg:text-[40px] font-bold text-gray-900 mb-6">
                            Ready for the <span className="text-[#ff8a00]">Heat</span> & <span className="text-[#1e90ff]">Cold</span> Contrast?
                        </h2>

                        <p className="text-gray-700 text-[16px] mb-10 max-w-2xl mx-auto">
                            Experience revolutionary thermal contrast therapy. Join our waiting list
                            for the next Aerobics + Ice Bath session and transform your fitness recovery.
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
                                    alert('Thank you! You\'ll be notified about the next Aerobics + Ice Bath session.');
                                }}
                                className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
                            >
                                <div className="flex-1">
                                    <input
                                        type="email"
                                        placeholder="Enter your email for session updates"
                                        required
                                        className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#008020] focus:ring-2 focus:ring-[#008020]/20 transition-all duration-300"
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-[#008020] text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 text-lg flex items-center justify-center gap-3 min-w-[200px] cursor-pointer"
                                >
                                    Join Waiting List
                                </motion.button>
                            </form>
                            <p className="text-gray-500 text-sm mt-3">
                                Experience the perfect balance of exertion and recovery
                            </p>
                        </motion.div>

                        <div className="mt-12 pt-8 border-t border-gray-300/30">
                            <p className="text-gray-600">
                                <span className="font-semibold text-[#008020]">In Collaboration with Massage Alchemy</span><br />
                                <span className="text-sm">Professional wellness meets innovative fitness methodology</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AerobicsIceBathPage;