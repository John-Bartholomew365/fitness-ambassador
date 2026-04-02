import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

const Walk2FitnessPage = () => {
    const [selectedEdition, setSelectedEdition] = useState<string>('5.0');
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error('Please enter your email address');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            toast.error('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);

        try {
            const loadingToast = toast.loading('Adding you to the waiting list...');

            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim() }),
            });

            const result = await response.json();

            if (!response.ok) {
                toast.dismiss(loadingToast);
                toast.error(result.message || 'Failed to join waiting list');
                throw new Error(result.message || 'Failed to join waiting list');
            }

            if (result.statusCode === '00' || result.message?.includes('success')) {
                toast.dismiss(loadingToast);
                toast.success('You\'ve been added to the waiting list! We\'ll notify you when Walk2Fitness 6.0 is announced.');
                setIsSubscribed(true);
                setEmail('');

                setTimeout(() => {
                    setIsSubscribed(false);
                }, 5000);
            } else {
                throw new Error(result.message || 'Subscription failed');
            }

        } catch (error) {
            console.error('Error joining waiting list:', error);
            toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Updated event statistics - celebrating 5.0 completion
    const eventStats = [
        { number: '5', label: 'Successful Editions', color: '#008020' },
        { number: '2500+', label: 'Total Participants', color: '#ffde00' },
        { number: '98%', label: 'Satisfaction Rate', color: '#ff8a00' },
        { number: '6.0', label: 'Next Edition', color: '#008020' }
    ];

    // Edition details - ORIGINAL IMAGES for 1.0-4.0, ONLY 5.0 uses w1-w55
    const editions = [
        {
            version: '1.0',
            year: '2022',
            participants: '200+',
            highlights: ['Inaugural event', 'Community foundation', 'Mass participation'],
            description: 'The groundbreaking first edition that established Walk2Fitness as Ilorin\'s premier walking fitness movement. This edition set the foundation for progressive outdoor fitness.',
            images: ['/one1.jpeg', '/one2.jpeg', '/one3.jpeg']
        },
        {
            version: '2.0',
            year: '2023',
            participants: '300+',
            highlights: ['Enhanced structure', 'Better organization', 'Improved routines'],
            description: 'Building on our initial success, Walk2Fitness 2.0 introduced structured progression paths and specialized workout zones for different fitness levels.',
            images: ['/two1.jpeg', '/two2.jpeg', '/two3.jpeg']
        },
        {
            version: '3.0',
            year: '2024',
            participants: '400+',
            highlights: ['Expert trainers', 'Community challenges', 'Wellness integration'],
            description: 'This edition marked our evolution into a holistic fitness experience, incorporating recovery sessions and personalized fitness assessments.',
            images: ['/three1.jpeg', '/three2.jpeg', '/three3.jpeg']
        },
        {
            version: '4.0',
            year: '2025',
            participants: '500+',
            highlights: ['Advanced training', 'Digital integration', 'Record participation'],
            description: 'Our most sophisticated edition yet, featuring tech-enhanced tracking, specialized training modules, and the largest community engagement to date.',
            images: ['/four1.jpeg', '/four2.jpeg', '/walk.jpg', '/four3.jpeg', '/four4.jpeg']
        },
        {
            version: '5.0',
            year: '2026',
            participants: '500+',
            highlights: ['Milestone celebration', 'Legacy moment', 'Record-breaking turnout', 'Community triumph'],
            description: 'A historic milestone edition that brought together over 500 fitness enthusiasts. Walk2Fitness 5.0 was our biggest and most impactful event yet — a true celebration of how far we\'ve come as a community.',
            images: ['/w53.jpg', '/w50.jpg', '/w20.jpg', '/w10.jpg', '/w49.jpg']
        }
    ];

    // Updated testimonials
    const testimonials = [
        {
            name: 'Aisha Bello',
            role: 'Participant since 1.0',
            content: 'From the very first edition to this incredible 5.0 milestone, I\'ve watched Walk2Fitness grow into something truly special. The energy at 5.0 was unmatched — I can\'t wait to see what comes next!',
            rating: 5,
            edition: 'All Editions'
        },
        {
            name: 'Tunde Olamide',
            role: 'Fitness Enthusiast',
            content: 'Walk2Fitness 5.0 was everything I hoped for and more. The organization, the community, the energy — absolute perfection. Already counting down to 6.0!',
            rating: 5,
            edition: '5.0 Participant'
        },
        {
            name: 'Chiamaka Okoro',
            role: 'Healthcare Professional',
            content: 'As a doctor, I appreciate how Walk2Fitness promotes sustainable fitness. The 5.0 edition showed how far this movement has come — truly inspiring to see 500+ people prioritize their health.',
            rating: 5,
            edition: '4.0 & 5.0'
        }
    ];

    const currentEdition = editions.find(ed => ed.version === selectedEdition) || editions[4];

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
                                Ilorin&apos;s Premier Walking Fitness Movement • 5 Editions Completed
                            </div>

                            <h1 className="text-[40px] md:text-[54px] lg:text-start text-center lg:text-[60px] font-bold text-gray-900 lg:mb-5 mb-4 leading-tight">
                                Walk2Fitness:<br />
                                <span className="text-[#008020]">5 Years of Progress</span>
                            </h1>

                            <p className="text-gray-600 text-[16px] mb-8 leading-tight lg:text-start text-center">
                                With 5 successful editions now completed, Walk2Fitness has transformed from a community walking event into Ilorin&apos;s premier fitness movement. As we celebrate this milestone, we&apos;re already building anticipation for what comes next.
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
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setSelectedEdition('5.0');
                                        document.getElementById('editions')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="px-8 py-4 bg-[#008020] cursor-pointer text-white font-semibold rounded-xl hover:shadow-xl transition-shadow duration-300 lg:w-auto w-full"
                                >
                                    Relive Walk2Fitness 5.0
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => document.getElementById('waiting-list')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-8 py-4 bg-white cursor-pointer text-[#008020] font-semibold rounded-xl border-2 border-[#008020] hover:shadow-xl transition-all duration-300"
                                >
                                    Join Waitlist for 6.0
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
                                <div className="absolute lg:bottom-6 bottom-3 left-6 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
                                    <span className="text-white font-semibold text-sm">5.0 • February 2026 • 500+ Participants</span>
                                </div>
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
                            A Legacy of Progress
                        </h2>
                        <p className="text-gray-600 text-[16px] max-w-3xl mx-auto">
                            Five editions. Five years of transformation. Walk2Fitness has grown into a structured, results-driven fitness series that has touched over 2,500 lives in Ilorin. And we&apos;re just getting started.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Progressive Journey',
                                description: 'From 1.0 to 5.0, each edition has introduced new challenges and training methodologies, creating a measurable journey of growth.',
                                color: '#008020'
                            },
                            {
                                title: 'Community First',
                                description: 'Built around the vibrant Ilorin fitness community, creating accountability and support systems that have lasted through all 5 editions.',
                                color: '#ffde00'
                            },
                            {
                                title: 'Looking Forward',
                                description: 'With 5.0 complete, we\'re channeling the energy and lessons learned into crafting an even more ambitious 6.0 edition.',
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
                            The <span className="text-gradient">5-Chapter</span> Journey
                        </h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            From our inaugural 1.0 edition to the triumphant 5.0 milestone, watch how Walk2Fitness has evolved while staying true to our core mission.
                        </p>
                    </motion.div>

                    <div className="mb-12">
                        <div className="text-center mb-6">
                            <p className="text-gray-600 text-sm md:text-base italic">
                                <span className="font-semibold text-[#008020]">Click any version</span> to explore its details, highlights, and images from that edition.
                            </p>
                        </div>

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

                    <motion.div
                        key={selectedEdition}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-3xl p-6 md:p-12 shadow-xl border-2 border-gray-200"
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
                                        {currentEdition.version === '5.0' && (
                                            <p className="text-[#ff8a00] font-semibold text-sm mt-1">★ Milestone Edition ★</p>
                                        )}
                                    </div>
                                </div>

                                <p className="text-gray-700 text-[16px] mb-8 leading-relaxed">
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

                                {/* Inside the Edition Timeline section, after the highlights */}
                                <div className="mt-6 pt-4 border-t border-gray-100 lg:block hidden">
                                    <Link href="/gallery" passHref>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="text-[#008020] font-semibold hover:underline flex items-center gap-2 cursor-pointer"
                                        >
                                            View Full Gallery →
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>

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

                            {/* Inside the Edition Timeline section, after the highlights */}
                            <div className="pt-4 border-t border-gray-100 lg:hidden block">
                                <Link href="/gallery" passHref>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="text-[#008020] text-center text-[18px] w-full font-semibold hover:underline flex justify-center items-center gap-2 cursor-pointer"
                                    >
                                        View Full Gallery →
                                    </motion.button>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm font-medium text-gray-700">Edition Progress</span>
                                <span className="text-sm text-gray-600 lg:block hidden">
                                    {currentEdition.version === '5.0' ? '5 Editions Complete • Milestone Achieved' : `${currentEdition.version} Completed`}
                                </span>
                                <span className="text-sm text-gray-600 lg:hidden block">
                                    {currentEdition.version === '5.0' ? '5.0 Completed' : `${currentEdition.version} Completed`}
                                </span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(parseFloat(currentEdition.version) / 5) * 100}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className={`h-full rounded-full ${currentEdition.version === '5.0' ? 'bg-linear-to-r from-[#008020] via-[#ffde00] to-[#ff8a00]' : 'bg-[#008020]'}`}
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
            <section id="testimonials" className="py-16 md:py-24 px-4 md:px-8 bg-white">
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
                            Hear from participants who have experienced the Walk2Fitness transformation journey across all 5 editions.
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

                    {/* Full Gallery Link */}
                    <div className="text-center mt-12">
                        <Link href="/gallery" passHref>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-white text-[#008020] font-semibold rounded-xl border-2 border-[#008020] hover:bg-[#008020] hover:text-white transition-all duration-300 cursor-pointer"
                            >
                                View Complete Media Gallery
                            </motion.button>
                        </Link>
                        <p className="text-gray-500 text-sm mt-3">
                            Explore all moments from Walk2Fitness 1.0 through 5.0
                        </p>
                    </div>
                </div>
            </section>

            {/* Waiting List - Building Anticipation for 6.0 */}
            <section id="waiting-list" className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-br from-[#ffde00]/5 via-white to-[#008020]/5">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-3 mb-8">
                            <div className="w-3 h-3 rounded-full bg-[#008020]" />
                            <div className="w-3 h-3 rounded-full bg-[#ffde00]" />
                            <div className="w-3 h-3 rounded-full bg-[#ff8a00]" />
                        </div>

                        <h2 className="text-[30px] lg:text-[40px] font-bold text-gray-900 mb-6">
                            5 Down. The Journey Continues.
                            <span className="block text-[#008020] text-2xl lg:text-3xl mt-2">Walk2Fitness 6.0 — Coming Soon</span>
                        </h2>

                        <p className="text-gray-700 text-[16px] mb-10 max-w-2xl mx-auto leading-normal">
                            With 5 successful editions behind us, we&apos;re already crafting something even bigger. Join our waiting list to be the first to know when Walk2Fitness 6.0 is announced. Early bird access, exclusive updates, and more await.
                        </p>

                        {isSubscribed ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center justify-center gap-3 py-4 px-6 bg-[#008020]/10 rounded-2xl max-w-md mx-auto"
                            >
                                <div className="w-6 h-6 rounded-full bg-[#008020] flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-[#008020] font-semibold">You&apos;re on the waiting list for 6.0!</span>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                                <div className="flex-1">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        required
                                        disabled={isSubmitting}
                                        className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#008020] focus:ring-2 focus:ring-[#008020]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting || !email.trim()}
                                    whileHover={{ scale: isSubmitting || !email.trim() ? 1 : 1.05 }}
                                    whileTap={{ scale: isSubmitting || !email.trim() ? 1 : 0.95 }}
                                    className={`px-8 py-4 bg-[#008020] text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 text-lg flex items-center justify-center gap-3 min-w-[200px] ${isSubmitting || !email.trim() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Adding...
                                        </span>
                                    ) : (
                                        'Join Waiting List'
                                    )}
                                </motion.button>
                            </form>
                        )}
                        <p className="text-gray-500 text-sm mt-3">
                            Be first to know when 6.0 drops. Exclusive early bird access. No spam, ever.
                        </p>

                        <div className="mt-12 pt-8 border-t border-gray-300/30">
                            <p className="text-gray-600">
                                <span className="font-semibold text-[#008020]">5 Editions • 2500+ Lives Transformed • One Community</span><br />
                                <span className="text-sm">The best is yet to come.</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Walk2FitnessPage;