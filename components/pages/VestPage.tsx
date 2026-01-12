import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Walk2FitnessVestPage = () => {
    // Vest collection data with proper image paths
    const vestCollections = [
        {
            type: 'Hoodie',
            color: '#4E5839',
            colorName: 'Forest Green',
            price: '₦12,000',
            features: [
                'Premium quality hoodie',
                'Official Walk2Fitness 5.0 branding',
                'Comfort fit for all body types',
                'Perfect for morning walks'
            ],
            image: '/green-hoodie.png'
        },
        {
            type: 'Hoodie',
            color: '#19253E',
            colorName: 'Royal Blue',
            price: '₦12,000',
            features: [
                'Premium quality hoodie',
                'Official Walk2Fitness 5.0 branding',
                'Comfort fit for all body types',
                'Perfect for morning walks'
            ],
            image: '/blue-hoodie.png'
        },
        {
            type: 'T-Shirt',
            color: '#4E5839',
            colorName: 'Forest Green',
            price: '₦10,000',
            features: [
                'Breathable cotton fabric',
                'Official event branding',
                'Lightweight and comfortable',
                'Ideal for warm weather'
            ],
            image: '/blue-tshirt.png'
        },
        {
            type: 'T-Shirt',
            color: '#19253E',
            colorName: 'Royal Blue',
            price: '₦10,000',
            features: [
                'Breathable cotton fabric',
                'Official event branding',
                'Lightweight and comfortable',
                'Ideal for warm weather'
            ],
            image: '/green-shirt.png'
        },
        {
            type: 'Armless Vest',
            color: '#4E5839',
            colorName: 'Forest Green',
            price: '₦10,000',
            features: [
                'Sleeveless design',
                'Moisture-wicking fabric',
                'Maximum mobility',
                'Perfect for intense workouts'
            ],
            image: '/green-armless.jpeg'
        },
        {
            type: 'Armless Vest',
            color: '#19253E',
            colorName: 'Royal Blue',
            price: '₦10,000',
            features: [
                'Sleeveless design',
                'Moisture-wicking fabric',
                'Maximum mobility',
                'Perfect for intense workouts'
            ],
            image: '/blue-arm.jpeg'
        }
    ];

    // Group vests by type
    const hoodies = vestCollections.filter(item => item.type === 'Hoodie');
    const tshirts = vestCollections.filter(item => item.type === 'T-Shirt');
    const armlessVests = vestCollections.filter(item => item.type === 'Armless Vest');

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Full Screen Image Background */}
            <section className="relative min-h-screen lg:min-h-screen py-16 md:py-20 lg:py-0 px-4 md:px-8 bg-gray-900 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/background.jpeg"
                        alt="Walk2Fitness Background"
                        fill
                        className="object-cover opacity-30 object-[center_25%]"
                        priority
                        quality={100}
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70" />
                </div>

                <div className="max-w-6xl mx-auto relative z-10 text-center h-full flex flex-col justify-center min-h-[inherit]">
                    {/* Event Badge - Transparent with White Text */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex w-fit mx-auto items-center gap-3 px-7 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
                    >
                        <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#ff8a00]" />
                            <div className="w-2 h-2 rounded-full bg-[#008020]" />
                            <div className="w-2 h-2 rounded-full bg-[#ffde00]" />
                        </div>
                        <span className="text-white font-semibold text-sm tracking-wider">
                            OFFICIAL EVENT GEAR
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-[40px] md:text-[52px] lg:text-[64px] font-black text-white mb-6 leading-none"
                    >
                        <span className="block">Walk2Fitness</span>
                        <span className="block text-[#ff8a00] mt-4 drop-shadow-lg">5.0 Vests</span>
                    </motion.h1>

                    {/* Supporting Text */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/90 text-[16px] lg:text-[18px] lg:w-[700px] mx-auto leading-relaxed mb-10"
                    >
                        Exclusive collection of high-quality event vests. Choose from Hoodies, T-Shirts,
                        and Armless Vests in various colors. Each piece is designed for comfort, style,
                        and maximum performance during the walk.
                    </motion.p>

                    {/* Primary CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        <Link href="/register"> {/* Changed from /register to /register */}
                            <button className="px-10 py-4 bg-[#ff8a00] text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:shadow-[#ff8a00]/25 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                Register & Choose Your Vest
                            </button>
                        </Link>
                        <p className="text-white/80 text-sm md:text-base mt-4 max-w-md mx-auto">
                            Select your preferred vest during registration
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Hoodies Section */}
            <section className="py-16 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-[36px] md:text-[48px] font-bold text-gray-900 mb-4">
                            Premium <span className="text-[#ff8a00]">Hoodies</span>
                        </h2>
                        <p className="text-gray-600">Perfect for early morning walks and cooler weather</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {hoodies.map((hoodie, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-3xl border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                            >
                                {/* Vest Image - Fixed with Image component */}
                                <div className="relative h-84 bg-gray-100">
                                    <Image
                                        src={hoodie.image}
                                        alt={`${hoodie.colorName} ${hoodie.type}`}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={index === 0}
                                    />
                                    <div className="absolute inset-0 bg-black/10" />
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{hoodie.type}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div
                                                    className="w-4 h-4 rounded-full border border-gray-300"
                                                    style={{ backgroundColor: hoodie.color }}
                                                />
                                                <span className="text-sm text-gray-600">{hoodie.colorName}</span>
                                            </div>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900">{hoodie.price}</div>
                                    </div>

                                    <ul className="space-y-2 mb-6">
                                        {hoodie.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#008020] mt-1.5 shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href="/register">
                                        <button className="w-full py-3 bg-[#008020] text-white font-semibold rounded-xl hover:bg-[#008020]/90 transition-colors cursor-pointer">
                                            Select This Vest
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* T-Shirts Section */}
            <section className="py-16 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-[36px] md:text-[48px] font-bold text-gray-900 mb-4">
                            Classic <span className="text-[#008020]">T-Shirts</span>
                        </h2>
                        <p className="text-gray-600">Lightweight and comfortable for all-day wear</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {tshirts.map((tshirt, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-3xl border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                            >
                                {/* Vest Image - Fixed with Image component */}
                                <div className="relative h-64 bg-gray-100">
                                    <Image
                                        src={tshirt.image}
                                        alt={`${tshirt.colorName} ${tshirt.type}`}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-black/10" />
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{tshirt.type}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div
                                                    className="w-4 h-4 rounded-full border border-gray-300"
                                                    style={{ backgroundColor: tshirt.color }}
                                                />
                                                <span className="text-sm text-gray-600">{tshirt.colorName}</span>
                                            </div>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900">{tshirt.price}</div>
                                    </div>

                                    <ul className="space-y-2 mb-6">
                                        {tshirt.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#008020] mt-1.5 shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href="/register">
                                        <button className="w-full py-3 bg-[#008020] text-white font-semibold rounded-xl hover:bg-[#008020]/90 transition-colors cursor-pointer">
                                            Select This Vest
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Armless Vests Section */}
            <section className="py-16 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-[36px] md:text-[48px] font-bold text-gray-900 mb-4">
                            Performance <span className="text-[#ff8a00]">Armless Vests</span>
                        </h2>
                        <p className="text-gray-600">Maximum mobility for intense walking sessions</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {armlessVests.map((vest, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-3xl border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                            >
                                {/* Vest Image - Fixed with Image component */}
                                <div className="relative h-64 bg-gray-100">
                                    <Image
                                        src={vest.image}
                                        alt={`${vest.colorName} ${vest.type}`}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-black/10" />
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{vest.type}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div
                                                    className="w-4 h-4 rounded-full border border-gray-300"
                                                    style={{ backgroundColor: vest.color }}
                                                />
                                                <span className="text-sm text-gray-600">{vest.colorName}</span>
                                            </div>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900">{vest.price}</div>
                                    </div>

                                    <ul className="space-y-2 mb-6">
                                        {vest.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#008020] mt-1.5 shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href="/register">
                                        <button className="w-full py-3 bg-[#008020] text-white font-semibold rounded-xl hover:bg-[#008020]/90 transition-colors cursor-pointer">
                                            Select This Vest
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Comparison */}
            <section className="py-16 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-[36px] md:text-[48px] font-bold text-gray-900 mb-4">
                            Vest <span className="text-[#008020]">Pricing</span>
                        </h2>
                        <p className="text-gray-600">Choose the vest that fits your style and budget</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                type: 'Hoodie',
                                price: '₦12,000',
                                bestFor: 'Cool weather & style',
                                features: ['Premium material', 'Full coverage', 'Event branding', 'Comfortable fit']
                            },
                            {
                                type: 'T-Shirt',
                                price: '₦10,000',
                                bestFor: 'Everyday comfort',
                                features: ['Lightweight cotton', 'Breathable', 'Event branding', 'Versatile wear']
                            },
                            {
                                type: 'Armless Vest',
                                price: '₦10,000',
                                bestFor: 'Maximum mobility',
                                features: ['Moisture-wicking', 'Sleeveless design', 'Event branding', 'Workout-ready']
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-3xl border-2 border-gray-100 p-8 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.type}</h3>
                                    <div className="text-3xl font-bold text-[#ff8a00] mb-4">{item.price}</div>
                                    <div className="text-sm text-gray-500">{item.bestFor}</div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {item.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-[#008020]" />
                                            <span className="text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/register">
                                    <button className="w-full py-3 bg-[#008020] text-white font-semibold rounded-xl hover:bg-[#008020]/90 transition-colors cursor-pointer">
                                        Select {item.type}
                                    </button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-4 md:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-linear-to-br from-[#008020]/5 to-[#ff8a00]/5 rounded-3xl p-8 md:p-12 border-2 border-[#008020]/10">
                        <h2 className="text-[36px] md:text-[48box] font-bold text-gray-900 mb-6">
                            Ready to <span className="text-[#ff8a00]">Choose Your Vest?</span>
                        </h2>
                        <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                            Select your preferred vest during registration. All vests come with official
                            Walk2Fitness 5.0 branding and are designed for maximum comfort during the event.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <button className="px-10 py-4 bg-[#008020] text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:shadow-[#008020]/25 transition-all duration-300 cursor-pointer">
                                    Register & Choose Vest
                                </button>
                            </Link>
                            <Link href="/events/walk2fitness">
                                <button className="px-10 py-4 bg-white border-2 border-gray-200 text-gray-900 text-lg font-bold rounded-xl hover:border-[#008020] hover:text-[#008020] transition-all duration-300 cursor-pointer">
                                    Learn About Event
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Walk2FitnessVestPage;