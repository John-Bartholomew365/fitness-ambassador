import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const MissionVisionPhilosophySection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section className="py-16 md:py-32 px-4 md:px-8 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="text-center mb-16 md:mb-24"
                >
                    <motion.div
                        variants={itemVariants}
                        className="flex justify-center gap-3 mb-8"
                    >
                        <div className="w-3 h-3 rounded-full bg-[#008020]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffde00]" />
                        <div className="w-3 h-3 rounded-full bg-[#ff8a00]" />
                    </motion.div>
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 lg:mb-5"
                    >
                        Our Core
                        <span className="text-gradient ml-2"> Beliefs</span>
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-gray-600 lg:w-[350px] w-auto mx-auto leading-tight"
                    >
                        Three interconnected pillars that guide everything we create and build.
                    </motion.p>
                </motion.div>

                {/* 01 - Mission: Image LEFT, Text RIGHT */}
                <div className="mb-24 md:mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
                        {/* Image Column - LEFT */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-1 lg:order-1"
                        >
                            <div className="relative">
                                <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/mission.jpeg"
                                        alt="Our Mission - Breaking down fitness barriers for everyone"
                                        width={800}
                                        height={500}
                                        className="w-full h-full object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
                                </div>
                                <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-3xl border-4 border-[#008020]/20 -z-10" />
                            </div>
                        </motion.div>

                        {/* Text Column - RIGHT */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-2 lg:order-2"
                        >
                            <div className="mb-6">
                                <div className="inline-flex items-center gap-3 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-[#008020] flex items-center justify-center">
                                        <span className="text-2xl font-black text-white">01</span>
                                    </div>
                                    <div className="px-4 py-2 rounded-full bg-[#008020]/10">
                                        <span className="text-[#008020] font-bold text-sm uppercase tracking-wider">
                                            Purpose · Action
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    The Mission<br />
                                    <span className="text-[#008020]">Breaking Barriers</span>
                                </h3>
                            </div>

                            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                                To systematically dismantle every obstacle that stands between people and their fitness journey, creating spaces where movement is not just accessible, but genuinely inviting.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { text: "Democratize access to fitness resources", color: "#008020" },
                                    { text: "Transform exertion into celebration", color: "#008020" },
                                    { text: "Build communities, not just clients", color: "#008020" }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="shrink-0 w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-gray-800 font-medium">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* 02 - Vision: Text LEFT, Image RIGHT */}
                <div className="mb-24 md:mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
                        {/* Image Column - RESPONSIVENESS */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:hidden block"
                        >
                            <div className="relative">
                                <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/vision.jpeg"
                                        alt="Our Vision - Fitness integrated into daily community life"
                                        width={800}
                                        height={500}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
                                </div>
                                <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-3xl border-4" style={{ borderColor: '#ffde0020' }} />
                            </div>
                        </motion.div>
                        {/* Text Column - LEFT */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-1 lg:order-1"
                        >
                            <div className="mb-6">
                                <div className="inline-flex items-center gap-3 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-[#ffde00] flex items-center justify-center">
                                        <span className="text-2xl font-black" style={{ color: '#1f2937' }}>02</span>
                                    </div>
                                    <div className="px-4 py-2 rounded-full bg-[#ffde00]/10">
                                        <span className="font-bold text-sm uppercase tracking-wider" style={{ color: '#1f2937' }}>
                                            Future · Impact
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    The Vision<br />
                                    <span className="text-[#ffde00]" style={{ color: '#ffde00' }}>Integrated Wellness</span>
                                </h3>
                            </div>

                            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                                A cultural landscape where fitness is woven into the fabric of daily life—not as a separate chore, but as a natural, joyful component of community and personal evolution.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { title: "Inclusive Ecosystems", desc: "No one left behind", color: "#ffde00" },
                                    { title: "Cultural Fusion", desc: "Tradition meets innovation", color: "#ffde00" },
                                    { title: "Holistic Pathways", desc: "Mind, body, spirit", color: "#ffde00" },
                                    { title: "Sustainable Growth", desc: "Lasting transformation", color: "#ffde00" }
                                ].map((item, index) => (
                                    <div key={index} className="p-4 rounded-xl border-2" style={{ borderColor: `${item.color}30` }}>
                                        <div className="font-bold text-gray-900 mb-1">{item.title}</div>
                                        <div className="text-sm text-gray-600">{item.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Image Column - RIGHT */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-2 lg:order-2 lg:block hidden"
                        >
                            <div className="relative">
                                <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/vision.jpeg"
                                        alt="Our Vision - Fitness integrated into daily community life"
                                        width={800}
                                        height={500}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
                                </div>
                                <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-3xl border-4" style={{ borderColor: '#ffde0020' }} />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* 03 - Philosophy: Image LEFT, Text RIGHT */}
                <div className="mb-24 md:mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
                        {/* Image Column - LEFT */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-1 lg:order-1"
                        >
                            <div className="relative">
                                <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/philosophy.jpeg"
                                        alt="Our Philosophy - Balance between structure and freedom in fitness"
                                        width={800}
                                        height={500}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
                                </div>
                                <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-3xl border-4 border-[#ff8a00]/20 -z-10" />
                            </div>
                        </motion.div>

                        {/* Text Column - RIGHT */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-2 lg:order-2"
                        >
                            <div className="mb-6">
                                <div className="inline-flex items-center gap-3 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-[#ff8a00] flex items-center justify-center">
                                        <span className="text-2xl font-black text-white">03</span>
                                    </div>
                                    <div className="px-4 py-2 rounded-full bg-[#ff8a00]/10">
                                        <span className="text-[#ff8a00] font-bold text-sm uppercase tracking-wider">
                                            Balance · Harmony
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    The Philosophy<br />
                                    <span className="text-[#ff8a00]">Dynamic Equilibrium</span>
                                </h3>
                            </div>

                            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                                We operate at the precise intersection where structured methodology meets creative freedom, where expert guidance nurtures personal exploration, and where individual ambition fuels collective success.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { left: "Structure", right: "Freedom", color: "#ff8a00" },
                                    { left: "Guidance", right: "Exploration", color: "#ff8a00" },
                                    { left: "Individual", right: "Community", color: "#ff8a00" }
                                ].map((balance, index) => (
                                    <div key={index} className="relative">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-gray-900">{balance.left}</span>
                                            <span className="font-bold text-gray-900">{balance.right}</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="relative h-full w-full">
                                                <motion.div
                                                    initial={{ width: "0%" }}
                                                    whileInView={{ width: ["0%", "50%", "100%", "50%"] }}
                                                    viewport={{ once: true }}
                                                    transition={{
                                                        duration: 3,
                                                        times: [0, 0.3, 0.7, 1],
                                                        repeat: Infinity,
                                                        repeatDelay: 2
                                                    }}
                                                    className="absolute h-full rounded-full"
                                                    style={{ backgroundColor: balance.color }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Connection Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-20 md:mt-32 text-center"
                >
                    <div className="max-w-2xl mx-auto">
                        <div className="flex justify-center gap-3 mb-8">
                            {[1, 2, 3].map((num) => (
                                <div
                                    key={num}
                                    className="w-4 h-4 rounded-full"
                                    style={{
                                        backgroundColor: num === 1 ? '#008020' : num === 2 ? '#ffde00' : '#ff8a00'
                                    }}
                                />
                            ))}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Connected · Progressive · Complete
                        </h3>
                        <p className="text-gray-600 lg:w-[500px] w-auto mx-auto leading-tight">
                            Each pillar informs the next. The mission enables the vision. The philosophy guides the execution. Together, they form a complete system for sustainable fitness transformation.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default MissionVisionPhilosophySection;