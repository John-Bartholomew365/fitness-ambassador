import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const FAQSection = () => {
    const [openQuestion, setOpenQuestion] = useState<string | null>('q1');

    const faqs: FAQItem[] = [
        {
            id: 'q1',
            question: 'How do I choose which fitness program is right for me?',
            answer: 'Start by identifying your primary goal: community engagement (Jam2Fit), structured progression (Walk2Fitness), or personalized guidance (Workout Compass). Most members begin with one program and naturally explore others as their fitness journey evolves. Our free consultation can help determine the best starting point.'
        },
        {
            id: 'q2',
            question: 'What makes your community events different from regular fitness classes?',
            answer: 'Our events combine structured fitness with cultural celebration. Jam2Fit transforms workouts into nighttime parties, Walk2Fitness builds progression through community accountability, and Afro Groove integrates cultural elements. Each event focuses on both physical results and memorable experiences that keep you coming back.'
        },
        {
            id: 'q3',
            question: 'Do I need to be fit already to join your programs?',
            answer: 'Absolutely not! Every program offers multiple entry points. Walk2Fitness has four progressive versions starting from beginner basics. Workout Compass provides clear guidance regardless of starting level. Our community is known for being supportive and welcoming to all fitness levels—what matters is your commitment to start.'
        },
        {
            id: 'q4',
            question: 'How does the Aerobics + Icebath combination benefit recovery?',
            answer: 'This unique pairing follows a science-based approach: high-intensity aerobics challenges your cardiovascular system, followed by icebath immersion that reduces inflammation, speeds muscle recovery, and boosts mental resilience. It\'s part of our holistic approach to fitness that balances exertion with recovery.'
        },
        {
            id: 'q5',
            question: 'What upcoming programs should I look forward to?',
            answer: 'We\'re launching Walk2Fitness 5.0 with advanced training modules and specialized community challenges. Later in 2026, we\'ll introduce Jam2Fit 2.0, featuring enhanced nighttime experiences and expanded musical collaborations. Both programs build on our proven success while introducing innovative fitness approaches.'
        }
    ];

    const toggleQuestion = (id: string): void => {
        setOpenQuestion(openQuestion === id ? null : id);
    };

    return (
        <section className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#008020]/10 text-[#008020] font-medium text-sm mb-6">
                        Common Questions
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Your Questions, <span className="text-gradient">Answered</span>
                    </h2>
                    <p className="text-gray-600 text-[16px] lg:w-[420px] w-auto mx-auto leading-tight">
                        Get clarity on how our fitness ecosystem works and find the right starting point for your journey.
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="space-y-4 mb-16">
                    {faqs.map((faq, index) => {
                        const isOpen = openQuestion === faq.id;
                        const colorIndex = index % 3;
                        const color = colorIndex === 0 ? '#008020' : colorIndex === 1 ? '#ffde00' : '#ff8a00';

                        return (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                                style={{
                                    border: `2px solid ${isOpen ? color : '#f3f4f6'}`
                                }}
                            >
                                {/* Question Header */}
                                <button
                                    onClick={() => toggleQuestion(faq.id)}
                                    className="w-full text-left p-4 lg:p-8 flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors duration-200"
                                >
                                    <div className="flex items-start gap-4 cursor-pointer md:gap-6 flex-1">
                                        {/* Question Number */}
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0"
                                            style={{
                                                backgroundColor: `${color}15`,
                                                color: color
                                            }}
                                        >
                                            0{index + 1}
                                        </div>

                                        {/* Question Text */}
                                        <div className="flex-1">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                                                {faq.question}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-2 h-2 rounded-full"
                                                    style={{ backgroundColor: color }}
                                                />
                                                {/* <span className="text-sm text-gray-500">
                                                    {isOpen ? 'Click to close' : 'Click to expand'}
                                                </span> */}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expand/Collapse Icon */}
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="shrink-0"
                                    >
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center"
                                            style={{ backgroundColor: `${color}15` }}
                                        >
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke={color}
                                                strokeWidth="2.5"
                                            >
                                                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </motion.div>
                                </button>

                                {/* Answer Panel */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: 'auto',
                                                transition: {
                                                    opacity: { duration: 0.3 },
                                                    height: { type: "spring", stiffness: 300, damping: 25 }
                                                }
                                            }}
                                            exit={{
                                                opacity: 0,
                                                height: 0,
                                                transition: { duration: 0.2 }
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <div
                                                className="p-6 md:p-8 pt-0"
                                                style={{ backgroundColor: `${color}05` }}
                                            >
                                                <div className="pl-2 lg:pl-20">
                                                    <div className="h-px w-12 rounded-full mb-6 opacity-30"
                                                        style={{ backgroundColor: color }}
                                                    />
                                                    <p className="text-gray-700 text-lg leading-relaxed">
                                                        {faq.answer}
                                                    </p>

                                                    {/* Action based on question */}
                                                    {faq.id === 'q1' && (
                                                        <div className="mt-6">
                                                            <Link href="/contact">
                                                                <motion.button
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    className="px-6 py-3 rounded-xl cursor-pointer text-sm font-semibold transition-all duration-300"
                                                                    style={{
                                                                        backgroundColor: color,
                                                                        color: color === '#ffde00' ? '#1f2937' : 'white'
                                                                    }}
                                                                >
                                                                    Book a Free Consultation
                                                                </motion.button>
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <div className="max-w-2xl mx-auto ">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                            Still Have Questions?
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                            Explore our complete FAQ page for detailed answers to all your questions about training, schedules, pricing, and more.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/faq">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-[#008020] text-white font-semibold rounded-xl hover:shadow-xl transition-shadow duration-300 cursor-pointer lg:w-fit w-[90%]"
                                >
                                    View All FAQs
                                </motion.button>
                            </Link>
                            <Link href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-white text-[#008020] font-semibold rounded-xl border-2 border-[#008020] hover:shadow-xl transition-all duration-300 cursor-pointer lg:w-fit w-[90%]"
                                >
                                    Contact Us
                                </motion.button>
                            </Link>
                        </div>

                        {/* Quick Stats */}
                        {/* <div className="mt-10 pt-8 border-t border-gray-200">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#008020] mb-1">4.9★</div>
                                    <div className="text-sm text-gray-600">Member Rating</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#ffde00] mb-1">900+</div>
                                    <div className="text-sm text-gray-600">Active Members</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#ff8a00] mb-1">98%</div>
                                    <div className="text-sm text-gray-600">Satisfaction Rate</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#008020] mb-1">24h</div>
                                    <div className="text-sm text-gray-600">Response Time</div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQSection;