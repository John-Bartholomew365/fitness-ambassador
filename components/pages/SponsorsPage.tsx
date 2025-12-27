import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Target,
    Users,
    TrendingUp,
    Heart,
    Award,
    BarChart3,
    CheckCircle,
    Zap,
    Shield,
    Quote
} from 'lucide-react';
import Image from 'next/image';

const SponsorsPage = () => {
    const [activePackage, setActivePackage] = useState<'gold' | 'silver' | 'bronze'>('gold');

    // Brand impact statistics
    const impactStats = [
        { number: '5000+', label: 'Active Community', icon: <Users size={24} />, color: '#008020' },
        { number: '15+', label: 'Events Yearly', icon: <Target size={24} />, color: '#ffde00' },
        { number: '85%', label: 'Engagement Rate', icon: <TrendingUp size={24} />, color: '#ff8a00' },
        { number: '95%', label: 'Satisfaction', icon: <Heart size={24} />, color: '#008020' }
    ];

    // Why sponsor reasons
    const sponsorReasons = [
        {
            title: 'Targeted Audience',
            description: 'Connect with health-conscious individuals aged 18-45 who value wellness and community.',
            icon: <Target size={24} />,
            color: '#008020'
        },
        {
            title: 'Brand Alignment',
            description: 'Associate your brand with positive lifestyle changes and community impact.',
            icon: <Award size={24} />,
            color: '#ffde00'
        },
        {
            title: 'Measurable Results',
            description: 'Track engagement, reach, and conversion through detailed analytics.',
            icon: <BarChart3 size={24} />,
            color: '#ff8a00'
        },
        {
            title: 'Community Trust',
            description: 'Leverage our established credibility and loyal participant base.',
            icon: <Shield size={24} />,
            color: '#008020'
        }
    ];

    // Sponsorship packages
    const packages = {
        gold: {
            name: 'Gold Partnership',
            price: 'Custom',
            features: [
                'Title sponsorship for major events',
                'Logo on all marketing materials',
                'Exclusive product placement',
                'Social media takeover',
                'Speaking opportunities at events',
                'VIP event access for team',
                'Custom activation space',
                'Dedicated account manager',
                'Monthly performance reports',
                'Year-round branding'
            ],
            color: '#ffde00',
            bestFor: 'National brands seeking maximum visibility'
        },
        silver: {
            name: 'Silver Partnership',
            price: '₦750,000',
            features: [
                'Feature sponsorship for 3 major events',
                'Logo on event materials',
                'Product sampling opportunities',
                'Social media features (6 posts)',
                'Brand mention in newsletters',
                'Event booth space',
                'Quarterly performance reviews',
                'Branded merchandise placement'
            ],
            color: '#c0c0c0',
            bestFor: 'Growing brands building presence'
        },
        bronze: {
            name: 'Bronze Partnership',
            price: '₦350,000',
            features: [
                'Supporting sponsor for 2 events',
                'Logo on event backdrop',
                'Social media mention (3 posts)',
                'Product display at events',
                'Website recognition',
                'Event tickets for team',
                'Bi-annual review meetings'
            ],
            color: '#cd7f32',
            bestFor: 'Local businesses entering fitness market'
        }
    };

    // ROI metrics
    const roiMetrics = [
        {
            metric: 'Brand Impressions',
            value: '50,000+',
            description: 'Estimated monthly visibility across all channels',
            growth: '+25%'
        },
        {
            metric: 'Direct Engagement',
            value: '5,000+',
            description: 'Monthly interactions with sponsored content',
            growth: '+18%'
        },
        {
            metric: 'Community Reach',
            value: '15,000+',
            description: 'Social media followers & email subscribers',
            growth: '+30%'
        },
        {
            metric: 'Media Value',
            value: '3x ROI',
            description: 'Average return on sponsorship investment',
            growth: 'Consistent'
        }
    ];


    // Success stories
    const successStories = [
        {
            sponsor: 'PulseFit',
            quote: 'Partnering with The Fitness Ambassador increased our brand recognition by 20% within the fitness community.',
            result: '3x sales growth in Ilorin',
            color: '#008020'
        },
        {
            sponsor: 'Sportify Gear',
            quote: 'The authentic community engagement translated directly to customer loyalty and repeat purchases.',
            result: '65% customer retention',
            color: '#ff8a00'
        },
        {
            sponsor: 'Hydrate Pro',
            quote: 'Being actively associated with these events positioned us as the preferred hydration choice for athletes.',
            result: 'Market leader in region',
            color: '#ffde00'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Enhanced */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-8 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-[#008020]/5 via-transparent to-[#ffde00]/10" />

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(90deg, #008020 1px, transparent 1px),
                             linear-gradient(180deg, #008020 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        backgroundPosition: 'center center'
                    }} />
                </div>

                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#ff8a00]/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#008020]/5 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:pr-8"
                        >
                            {/* Enhanced Partnership Badge */}
                            {/* <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#008020]/20 shadow-sm mb-8">
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-[#ffde00]" />
                                    <div className="w-2 h-2 rounded-full bg-[#ff8a00]" />
                                    <div className="w-2 h-2 rounded-full bg-[#008020]" />
                                </div>
                                <span className="text-[#008020] font-semibold text-sm tracking-wide">
                                    STRATEGIC PARTNERSHIP OPPORTUNITIES
                                </span>
                            </div> */}

                            <h1 className="text-[42px] md:text-[44px] lg:text-[52px] font-bold text-gray-900 mb-6 leading-[1.2]">
                                <span className="block">Partner with</span>
                                <span className="block text-[#008020] bg-clip-text mt-2">The Fitness Ambassador</span>
                                <span className="block text-gray-900 mt-2">Drive Growth Together</span>
                            </h1>

                            <p className="text-gray-700 text-[16px] mb-10 leading-normal">
                                Align your brand with Ilorin&apos;s fastest-growing fitness movement.
                                Access an engaged community of health-conscious individuals while
                                contributing to meaningful lifestyle transformation. Let&apos;s create
                                impactful partnerships that deliver measurable results.
                            </p>

                            {/* Enhanced Impact Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                                {impactStats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="text-center p-5 rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-gray-100 hover:border-[#ff8a00]/30 hover:shadow-xl transition-all duration-300 group"
                                    >
                                        <div className="flex justify-center mb-3" style={{ color: stat.color }}>
                                            {React.cloneElement(stat.icon, { size: 28 })}
                                        </div>
                                        <div
                                            className="text-2xl md:text-3xl font-bold mb-2"
                                            style={{ color: stat.color }}
                                        >
                                            {stat.number}
                                        </div>
                                        <div className="text-[12px] font-medium text-gray-700">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Enhanced CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-5">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-9 py-2 bg-[#008020] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#ff8a00]/25 whitespace-nowrap transition-all duration-300 text-[15px] flex items-center justify-center gap-3 group"
                                >
                                    <span>Explore Partnership Packages</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-9 py-2 whitespace-nowrap bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-[#008020] hover:shadow-xl transition-all duration-300 text-[16px] flex items-center justify-center gap-3"
                                >
                                    <span>Request Partnership Deck</span>
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Enhanced Partnership Visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            {/* Main Visual Container */}
                            <div className="relative w-full h-[450px] md:h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-white/50">
                                {/* Background with Brand Colors */}
                                <div className="absolute inset-0 bg-linear-to-br from-[#008020]/15 via-transparent to-[#ffde00]/15" />

                                {/* Logo Grid Pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute inset-0" style={{
                                        backgroundImage: `repeating-linear-gradient(
                                0deg,
                                transparent,
                                transparent 80px,
                                #008020 80px,
                                #008020 160px
                            ),
                            repeating-linear-gradient(
                                90deg,
                                transparent,
                                transparent 80px,
                                #ff8a00 80px,
                                #ff8a00 160px
                            )`
                                    }} />
                                </div>

                                {/* Main Partnership Image */}
                                <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
                                    <div className="relative w-full h-full max-w-md mx-auto">
                                        {/* Image Container with Glow Effect */}
                                        <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-linear-to-br from-white to-gray-50">
                                            <Image
                                                src="/partners.png"
                                                alt="Partnership Collaboration"
                                                fill
                                                className="object-contain p-8"
                                                priority
                                            />
                                            {/* Image Glow */}
                                            <div className="absolute inset-0 bg-linear-to-br from-[#008020]/5 via-transparent to-[#ff8a00]/5" />
                                        </div>

                                        {/* Floating Elements */}
                                        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-[#ffde00]/30 shadow-lg flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-xl font-bold text-[#008020]">+40%</div>
                                                <div className="text-xs text-gray-600">ROI</div>
                                            </div>
                                        </div>

                                        <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-[#008020]/30 shadow-lg flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-[#ff8a00]">5K+</div>
                                                <div className="text-xs text-gray-600">Reach</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Partnership Label */}
                                <div className="absolute bottom-8 left-0 right-0 text-center">
                                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg">
                                        <div className="w-2 h-2 rounded-full bg-[#008020] animate-pulse" />
                                        <span className="text-gray-800 font-semibold">Mutual Growth Partnership</span>
                                        <div className="w-2 h-2 rounded-full bg-[#ff8a00] animate-pulse" style={{ animationDelay: '0.5s' }} />
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Decorative Elements */}
                            <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-4xl border-2 border-[#ff8a00]/15 -z-10" />
                            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-4xl border-2 border-[#008020]/15 -z-10" />

                            {/* Floating Dots */}
                            <div className="absolute top-12 -right-8 w-4 h-4 rounded-full bg-[#ffde00] animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <div className="absolute bottom-20 -left-6 w-3 h-3 rounded-full bg-[#008020] animate-bounce" style={{ animationDelay: '0.7s' }} />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Sponsor Section */}
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
                            <div className="text-[#008020] font-medium">Strategic Value</div>
                            <div className="w-12 h-0.5 bg-[#ff8a00]" />
                        </div>
                        <h2 className="text-[32px] lg:text-[42px] font-bold text-gray-900 mb-4">
                            Why <span className="text-[#008020]">Partner</span> With Us?
                        </h2>
                        <p className="text-gray-600 text-[16px] lg:w-[550px] w-auto mx-auto">
                            Beyond sponsorship - a strategic partnership for mutual growth and community impact.
                        </p>
                    </motion.div>

                    {/* Reasons Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {sponsorReasons.map((reason, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl bg-white border-2 border-gray-100 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                                    style={{
                                        backgroundColor: reason.color + '20',
                                        color: reason.color
                                    }}
                                >
                                    {reason.icon}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-4">{reason.title}</h3>
                                <p className="text-gray-600">{reason.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Success Stories */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20"
                    >
                        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Partner <span className="text-[#008020]">Success</span> Stories
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {successStories.map((story, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-8 rounded-2xl bg-white border-2 border-gray-100 hover:shadow-xl transition-all duration-300"
                                    style={{ borderLeftColor: story.color, borderLeftWidth: '4px' }}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                            style={{ backgroundColor: story.color }}
                                        >
                                            {story.sponsor.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">{story.sponsor}</div>
                                            <div className="text-sm text-gray-600">Current Partner</div>
                                        </div>
                                    </div>

                                    <p className="text-gray-700 italic mb-6">&quot;{story.quote}&quot;</p>

                                    <div className="px-4 py-2 rounded-full inline-block"
                                        style={{
                                            backgroundColor: story.color + '20',
                                            color: story.color
                                        }}
                                    >
                                        <span className="font-semibold">Result: {story.result}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ROI Section */}
            <section className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-r from-[#008020]/5 to-[#ffde00]/5">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-3 mb-6">
                            <TrendingUp size={24} className="text-[#ff8a00]" />
                            <h2 className="text-[32px] lg:text-[42px] font-bold text-gray-900">
                                Measurable <span className="text-[#008020]">Returns</span>
                            </h2>
                            <TrendingUp size={24} className="text-[#ff8a00]" />
                        </div>
                        <p className="text-gray-600 text-[16px] lg:w-[550px] w-auto mx-auto">
                            Trackable impact and tangible business outcomes from your partnership.
                        </p>
                    </motion.div>

                    {/* ROI Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {roiMetrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl bg-white border-2 border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-sm font-medium text-gray-500">{metric.metric}</div>
                                    <div className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                                        {metric.growth}
                                    </div>
                                </div>

                                <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                                <p className="text-sm text-gray-600">{metric.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional Benefits */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl p-8 border-2 border-gray-100"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                            Additional <span className="text-[#ff8a00]">Partnership</span> Benefits
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                'Content co-creation opportunities',
                                'Exclusive access to community insights',
                                'Collaborative social media campaigns',
                                'Joint press releases and media coverage',
                                'Product testing with engaged community',
                                'Data-driven audience analytics',
                                'Networking with other brand partners',
                                'CSR alignment and impact reporting'
                            ].map((benefit, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-[#008020] shrink-0 mt-0.5" />
                                    <span className="text-gray-700">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Sponsorship Packages */}
            <section id="packages" className="py-16 md:py-24 px-4 md:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 mb-6">
                            <Award size={24} className="text-[#ffde00]" />
                            <h2 className="text-[32px] lg:text-[42px] font-bold text-gray-900">
                                Partnership <span className="text-[#008020]">Packages</span>
                            </h2>
                            <Award size={24} className="text-[#ff8a00]" />
                        </div>
                        <p className="text-gray-600 text-[16px] lg:w-[550px] w-auto mx-auto">
                            Choose the partnership level that aligns with your brand goals and budget.
                        </p>
                    </motion.div>

                    {/* Package Tabs */}
                    <div className="mb-12">
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            {Object.entries(packages).map(([key, pkg]) => (
                                <motion.button
                                    key={key}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActivePackage(key as 'gold' | 'silver' | 'bronze')}
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${activePackage === key ? 'ring-4 ring-opacity-30' : 'hover:shadow-lg'}`}
                                    style={{
                                        backgroundColor: activePackage === key ? pkg.color : 'white',
                                        color: activePackage === key ? (key === 'silver' ? '#374151' : 'white') : pkg.color,
                                        border: `2px solid ${activePackage === key ? pkg.color : '#e5e7eb'}`
                                    }}
                                >
                                    {pkg.name}
                                </motion.button>
                            ))}
                        </div>

                        {/* Active Package Details */}
                        <motion.div
                            key={activePackage}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-3xl overflow-hidden border-2 border-gray-100 shadow-xl"
                        >
                            <div
                                className="p-8 text-white"
                                style={{ backgroundColor: packages[activePackage].color }}
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-3xl font-bold">{packages[activePackage].name}</h3>
                                        <p className="opacity-90 mt-2">{packages[activePackage].bestFor}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-4xl font-bold">{packages[activePackage].price}</div>
                                        {activePackage !== 'gold' && (
                                            <div className="text-sm opacity-90">Annual Partnership</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-6">Package Features</h4>
                                        <div className="space-y-4">
                                            {packages[activePackage].features.map((feature, index) => (
                                                <div key={index} className="flex items-start gap-3">
                                                    <CheckCircle size={20} className="text-[#008020] shrink-0 mt-0.5" />
                                                    <span className="text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-2xl p-6">
                                        <h4 className="text-xl font-bold text-gray-900 mb-4">Ideal For</h4>
                                        <p className="text-gray-700 mb-6">{packages[activePackage].bestFor}</p>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Zap size={20} className="text-[#ff8a00]" />
                                                <span className="text-gray-700">Customizable options available</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Shield size={20} className="text-[#008020]" />
                                                <span className="text-gray-700">Contract flexibility</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <TrendingUp size={20} className="text-[#ffde00]" />
                                                <span className="text-gray-700">Performance-based extensions</span>
                                            </div>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="mt-8 w-full py-4 bg-[#008020] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer"
                                        >
                                            Inquire About This Package
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Current Sponsors - Professional Display */}
            <section className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Trusted by <span className="text-[#ff8a00]">Industry Leaders</span>
                        </h2>
                        <p className="text-gray-600 text-[16px] lg:w-[410px] w-auto mx-auto leading-normal">
                            See how leading brands partner with us to reach engaged fitness communities.
                        </p>
                    </motion.div>

                    {/* Featured Sponsor Showcase */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <div className="bg-linear-to-r from-[#008020]/5 to-[#ffde00]/5 rounded-3xl p-8 border-2 border-[#008020]/20">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                {/* Featured Sponsor Logo & Info */}
                                <div className="flex flex-col items-center">
                                    <div className="w-60 h-60 rounded-2xl bg-white border-2 border-gray-100 p-8 mb-6 shadow-lg flex items-center justify-center">
                                        {/* Tixtango Logo */}
                                        <Image
                                            src="/tixtango.png"
                                            alt="Tixtango Logo"
                                            width={200}
                                            height={200}
                                            className="object-contain"
                                        />
                                    </div>

                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Official Ticketing Partner</h3>
                                        <p className="text-gray-600 mb-4">
                                            Powering seamless event registration for thousands of participants across all our fitness events.
                                        </p>
                                        <div className="flex items-center justify-center gap-4">
                                            <a href="https://twitter.com/tixtango" target="_blank" rel="noopener noreferrer"
                                                className="px-4 py-2 rounded-lg bg-[#008020]/10 text-[#008020] hover:bg-[#008020]/20 transition-all duration-300 text-sm font-medium">
                                                Twitter
                                            </a>
                                            <a href="https://tixtango.com" target="_blank" rel="noopener noreferrer"
                                                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300 text-sm font-medium">
                                                Visit Website
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Partner Testimonial */}
                                <div className="bg-white rounded-2xl p-8 border-2 border-gray-100">
                                    {/* Quote Mark */}
                                    <div
                                        className="text-4xl mb-4"
                                    >
                                        <Quote size={42} className="text-primary/20" />
                                    </div>
                                    <p className="text-gray-700 italic text-lg mb-6">
                                        &quot;Partnering with The Fitness Ambassador has been transformative for our brand visibility.
                                        The engagement from the fitness community is authentic and results-driven. We&apos;ve seen a 40%
                                        increase in platform usage from Ilorin&apos;s fitness community since our partnership began.&quot;
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-[#008020] flex items-center justify-center text-white font-bold">
                                            TT
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">Tixtango Team</div>
                                            <div className="text-sm text-gray-600">Partner since 2023</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sponsors Grid - Professional Layout */}
                    <div className="grid grid-cols-1 gap-8">
                        {[
                            {
                                name: 'SOD Table Water',
                                category: 'Wellness & Recovery Partner',
                                description: 'SOD Table Water is a trusted provider of clean, refreshing, and hygienically processed drinking water, committed to promoting healthy hydration and wellbeing. We are proud to have partnered with SOD Table Water as one of our past sponsors in support of health-focused initiatives.',
                                social: {
                                    instagram: 'https://instagram.com/massagealchemy',
                                    website: 'https://massagealchemy.com',
                                    phone: '+234 800 000 0000'
                                },
                                since: '2023',
                                logoPath: '/sod-water.jpeg'
                            },
                            {
                                name: 'BQ Cuisine',
                                category: 'Academic & Sports Council Partner',
                                description: 'BQ Cuisine is a food brand known for delivering delicious, well-prepared meals with a focus on quality and customer satisfaction. We’re proud to have partnered with BQ Cuisine as one of our past sponsors, supporting our events and community engagements.',
                                social: {
                                    twitter: 'https://twitter.com/Unilorin',
                                    website: 'https://unilorin.edu.ng',
                                    email: 'sports.council@unilorin.edu.ng'
                                },
                                since: '2023',
                                logoPath: '/bq-cuisines.jpeg'
                            },
                            {
                                name: 'Item 7 go',
                                category: 'Nutrition & Supplement Partner',
                                description: 'Item 7 GO is a food brand committed to serving tasty, high-quality meals with a focus on excellent customer service. We’re proud to have featured Item 7 GO as one of our past partners, supporting our events and community initiatives.',
                                social: {
                                    instagram: 'https://instagram.com/fitfuelng',
                                    website: 'https://fitfuelng.com',
                                    whatsapp: '+234 800 111 1111'
                                },
                                since: '2024',
                                logoPath: '/item-7.jpeg'
                            },
                            {
                                name: 'AMALA NIFFY',
                                category: 'Nutrition & Supplement Partner',
                                description: 'We are into everything food business , restaurant , breakfast lunch dinner on order , catering for all kinds of events too',
                                social: {
                                    instagram: 'https://instagram.com/fitfuelng',
                                    website: 'https://fitfuelng.com',
                                    whatsapp: '+234 800 111 1111'
                                },
                                since: '2024',
                                logoPath: '/amala-niffy.png'
                            }
                        ].map((sponsor, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-white rounded-2xl border-2 border-gray-100 hover:border-[#008020] transition-all duration-300 overflow-hidden hover:shadow-xl">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                                        {/* Sponsor Logo - Large & Prominent */}
                                        <div className="flex items-center justify-center">
                                            <div className="w-48 h-48 rounded-2xl bg-white border-2 border-gray-100 p-6 flex items-center justify-center">
                                                <Image
                                                    src={sponsor.logoPath}
                                                    alt={`${sponsor.name} Logo`}
                                                    width={180}
                                                    height={180}
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>

                                        {/* Sponsor Details */}
                                        <div className="lg:col-span-2">
                                            <div className="mb-6">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-2xl font-bold text-gray-900">{sponsor.name}</h3>
                                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#008020]/10 text-[#008020]">
                                                        Partner since {sponsor.since}
                                                    </span>
                                                </div>
                                                {/* <div className="text-lg text-[#ff8a00] font-semibold mb-4">{sponsor.category}</div> */}
                                                <p className="text-gray-600">{sponsor.description}</p>
                                            </div>

                                            {/* Social Links */}
                                            <div className="flex flex-wrap gap-3 mb-4">
                                                {sponsor.social.instagram && (
                                                    <a href={sponsor.social.instagram} target="_blank" rel="noopener noreferrer"
                                                        className="px-4 py-2 rounded-lg bg-[#ff8a00]/10 text-[#ff8a00] hover:bg-[#ff8a00]/20 transition-all duration-300 text-sm font-medium flex items-center gap-2">
                                                        <span>Instagram</span>
                                                    </a>
                                                )}
                                                {sponsor.social.twitter && (
                                                    <a href={sponsor.social.twitter} target="_blank" rel="noopener noreferrer"
                                                        className="px-4 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300 text-sm font-medium flex items-center gap-2">
                                                        <span>Twitter</span>
                                                    </a>
                                                )}
                                                {sponsor.social.website && (
                                                    <a href={sponsor.social.website} target="_blank" rel="noopener noreferrer"
                                                        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300 text-sm font-medium flex items-center gap-2">
                                                        <span>Website</span>
                                                    </a>
                                                )}
                                            </div>

                                            {/* Contact Info */}
                                            <div className="border-t border-gray-100 pt-4">
                                                <div className="text-sm text-gray-500">Contact Information:</div>
                                                <div className="flex flex-wrap gap-4 mt-2">
                                                    {sponsor.social.email && (
                                                        <div className="text-sm">
                                                            <span className="text-gray-500">Email:</span>{' '}
                                                            <span className="font-medium text-gray-900">{sponsor.social.email}</span>
                                                        </div>
                                                    )}
                                                    {sponsor.social.phone && (
                                                        <div className="text-sm">
                                                            <span className="text-gray-500">Phone:</span>{' '}
                                                            <span className="font-medium text-gray-900">{sponsor.social.phone}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section id="contact" className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-br from-[#008020]/5 via-white to-[#ff8a00]/5">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl p-8 md:p-12 border-2 border-gray-100 shadow-xl"
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Start Your <span className="text-[#ff8a00]">Partnership</span> Journey
                            </h2>
                            <p className="text-gray-600">
                                Let&apos;s discuss how we can create mutual success together.
                            </p>
                        </div>

                        {/* Contact Form */}
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#008020] focus:ring-2 focus:ring-[#008020]/20 transition-all duration-300"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Company Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#008020] focus:ring-2 focus:ring-[#008020]/20 transition-all duration-300"
                                        placeholder="Your Company"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#008020] focus:ring-2 focus:ring-[#008020]/20 transition-all duration-300"
                                        placeholder="contact@company.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#008020] focus:ring-2 focus:ring-[#008020]/20 transition-all duration-300"
                                        placeholder="+234 800 000 0000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Interested Partnership Level
                                </label>
                                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#008020] focus:ring-2 focus:ring-[#008020]/20 transition-all duration-300">
                                    <option value="">Select a package</option>
                                    <option value="gold">Gold Partnership</option>
                                    <option value="silver">Silver Partnership</option>
                                    <option value="bronze">Bronze Partnership</option>
                                    <option value="custom">Custom Partnership</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Partnership Goals
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#008020] focus:ring-2 focus:ring-[#008020]/20 transition-all duration-300"
                                    placeholder="Tell us about your brand goals and how you'd like to partner..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 bg-[#008020] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer"
                            >
                                Submit Partnership Inquiry
                            </motion.button>

                            <p className="text-center text-sm text-gray-500 mt-4">
                                We&apos;ll respond within 24-48 hours to discuss partnership opportunities.
                            </p>
                        </form>
                    </motion.div>

                    {/* Quick Contact */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-600">
                            Prefer a quicker response? Email us directly at{' '}
                            <a href="mailto:fitnessambassador84@gmail.com" className="text-[#008020] font-semibold hover:underline">
                              fitnessambassador84@gmail.com
                            </a>
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Ajisafe Sulaiman - The Fitness Ambassador
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SponsorsPage;