import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Quote } from 'lucide-react';

const AboutInnovatorPage = () => {
    // Philosophy statements
    const philosophyStatements = [
        {
            statement: 'Fitness should not feel intimidating or transactional.',
            explanation: 'Every experience is designed to be human, accessible, and meaningful—helping people move, connect, and feel seen in their wellness journey.',
            color: '#008020'
        },
        {
            statement: 'Movement as a tool for genuine connection.',
            explanation: 'Beyond physical exercise, movement creates spaces where communities form, relationships deepen, and collective growth happens organically.',
            color: '#ffde00'
        },
        {
            statement: 'Experiences over repetitive routines.',
            explanation: 'Creating memorable moments that inspire lasting lifestyle changes, not just temporary workouts that people quickly forget.',
            color: '#ff8a00'
        },
        {
            statement: 'People before platforms or profits.',
            explanation: 'The human element remains central—every decision prioritizes participant wellbeing, community impact, and genuine transformation.',
            color: '#008020'
        }
    ];

    // What he creates
    const creations = [
        {
            title: 'Community Fitness Experiences',
            description: 'Transformative events like Walk2Fitness, Jam2Fit, and AfroGroove that blend movement with meaningful social connection.',
            examples: 'Structured progressions, cultural fusion, nighttime innovation'
        },
        {
            title: 'Wellness-Driven Partnerships',
            description: 'Collaborations with organizations like University of Ilorin and Massage Alchemy to create holistic wellness ecosystems.',
            examples: 'Academic partnerships, professional recovery integration'
        },
        {
            title: 'Health-Centered Social Initiatives',
            description: 'Programs that make fitness accessible and engaging for diverse communities across Ilorin.',
            examples: 'Free medical screenings, community cycling groups, cultural fitness'
        },
        {
            title: 'Fitness Education Resources',
            description: 'Tools and guides like Workout Compass that empower people with knowledge for sustainable transformation.',
            examples: 'Published book, training materials, educational workshops'
        }
    ];

    // Journey narrative points
    const journeyPoints = [
        {
            phase: 'The Beginning',
            description: 'What started as personal passion for fitness evolved into recognizing its power to transform not just bodies, but entire communities.',
            focus: 'Community Impact'
        },
        {
            phase: 'The Evolution',
            description: 'Walk2Fitness began as simple group walks, growing into structured progressions that participants could follow through multiple editions.',
            focus: 'Structured Growth'
        },
        {
            phase: 'The Innovation',
            description: 'Introducing concepts like nighttime fitness parties and cultural dance fitness to make wellness engaging for different lifestyles.',
            focus: 'Creative Solutions'
        },
        {
            phase: 'The Expansion',
            description: 'From individual events to building ecosystems of wellness through partnerships, education, and community infrastructure.',
            focus: 'Holistic Approach'
        }
    ];

    // Impact metrics
    const impactMetrics = [
        { metric: 'Participants Reached', value: '5000+', description: 'Individuals engaged across various fitness experiences' },
        { metric: 'Events Hosted', value: '15+', description: 'Unique fitness experiences created and executed' },
        { metric: 'Communities Built', value: '5+', description: 'Active fitness communities with regular engagement' },
        { metric: 'Years of Evolution', value: '4+', description: 'Continuous refinement of fitness experiences' }
    ];

    // Values
    const values = [
        {
            title: 'Consistency Over Hype',
            description: 'Building sustainable fitness habits through regular, reliable experiences rather than temporary excitement.'
        },
        {
            title: 'Community Over Competition',
            description: 'Fostering supportive environments where everyone progresses together, without creating unnecessary rivalry.'
        },
        {
            title: 'Health as Lifestyle',
            description: 'Approaching wellness as integrated daily living, not isolated workout sessions.'
        },
        {
            title: 'Purposeful Growth',
            description: 'Every expansion or innovation serves a clear community need, not just growth for its own sake.'
        }
    ];

    // Testimonials
    const testimonials = [
        {
            quote: 'The experiences feel intentional—like every element was designed with the participant in mind.',
            person: 'Regular Event Attendee'
        },
        {
            quote: 'You can see the evolution in how each edition builds on the last, showing real learning and refinement.',
            person: 'Community Observer'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 px-4 md:px-8 bg-gray-900 overflow-hidden">
                {/* Background Image with Overlay - Adjusted for portrait */}
                <div className="absolute inset-0 z-0">
                    <div className="relative w-full h-full">
                        <Image
                            src="/about.jpeg"
                            alt="The Mind Behind The Movement"
                            fill
                            className="object-cover object-[center_25%]"
                            priority
                            quality={100}
                        />
                        {/* Stronger Gradient Overlay for portrait focus */}
                        <div className="absolute inset-0 bg-linear-to-b from-black/90 via-black/80 to-black/90" />
                        {/* Center fade for text readability */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/50" />
                    </div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center"> {/* Removed md:text-left */}
                        {/* Title Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
                        >
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-[#ff8a00]" />
                                <div className="w-2 h-2 rounded-full bg-[#008020]" />
                                <div className="w-2 h-2 rounded-full bg-[#ffde00]" />
                            </div>
                            <span className="text-white font-semibold text-sm tracking-wider">
                                ABOUT THE INNOVATOR
                            </span>
                        </motion.div>

                        <h1 className="text-[48px] md:text-[64px] lg:text-[72px] font-black text-white mb-6 leading-none">
                            The Mind Behind
                            <span className="block text-[#ff8a00] mt-4 drop-shadow-lg">The Movement</span>
                        </h1>

                        <p className="text-white/90 lg:text-[18px] text-[16px] lg:w-[590px] w-auto mx-auto leading-relaxed mb-10 drop-shadow-lg">
                            {/* Added mx-auto to center the paragraph */}
                            A cultural fitness innovator focused on creating movement-driven experiences
                            that build health, connection, and purpose. Blending fitness, community, and
                            intentional design into moments people remember and transformations that last.
                        </p>

                        {/* Hero Stats - Colored versions */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                            {/* Added mx-auto to center the stats grid */}
                            {impactMetrics.map((item, index) => {
                                // Assign colors based on index
                                const colors = ['#008020', '#ffde00', '#ff8a00', '#008020'];
                                const bgColors = ['bg-[#008020]/20', 'bg-[#ffde00]/20', 'bg-[#ff8a00]/20', 'bg-[#008020]/20'];

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`text-center p-5 rounded-xl border ${bgColors[index]} border-white/10 backdrop-blur-sm hover:scale-105 transition-all duration-300`}
                                    >
                                        <div className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors[index] }}>
                                            {item.value}
                                        </div>
                                        <div className="text-sm text-white/90">{item.metric}</div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-20 md:py-32 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-[36px] md:text-[48px] font-bold text-gray-900 mb-4">
                            The Thinking Behind <span className="text-[#ff8a00]">The Movement</span>
                        </h2>
                        <p className="text-gray-700  max-w-3xl mx-auto">
                            Core beliefs that shape every fitness experience and community initiative.
                        </p>
                    </motion.div>

                    {/* Philosophy Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {philosophyStatements.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                                    {/* Statement Number */}
                                    <div className="mb-6">
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white"
                                            style={{ backgroundColor: item.color }}
                                        >
                                            0{index + 1}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-4 leading-relaxed">
                                        {item.statement}
                                    </h3>
                                    <p className="text-gray-600">{item.explanation}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey Section */}
            <section className="py-20 md:py-32 px-4 md:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Journey Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-[36px] md:text-[48px] font-bold text-gray-900 mb-8">
                                The Journey <span className="text-[#ff8a00]">So Far</span>
                            </h2>

                            <div className="space-y-8">
                                {journeyPoints.map((point, index) => (
                                    <div key={index} className="relative pl-10">
                                        {/* Journey Dot */}
                                        <div className="absolute left-0 top-2">
                                            <div className="w-6 h-6 rounded-full border-4 border-white shadow-lg"
                                                style={{ backgroundColor: ['#008020', '#ffde00', '#ff8a00', '#008020'][index] }} />
                                        </div>

                                        <div className="pb-8 border-l-2 border-gray-200 pl-8">
                                            <div className="mb-2">
                                                <span className="text-sm font-semibold text-gray-500">{point.phase}</span>
                                                <div className="text-xs text-[#ff8a00] font-medium mt-1">{point.focus}</div>
                                            </div>
                                            <p className="text-gray-700">{point.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Journey Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border-2 border-gray-100 shadow-xl">
                                <Image
                                    src="/journey.jpeg"
                                    alt="The Journey of Innovation"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />

                                {/* Image Overlay Text */}
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className="text-white">
                                        <div className="text-lg font-semibold">From Personal Passion</div>
                                        <div className="text-2xl font-bold mt-1">To Community Movement</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What He Creates Section */}
            <section className="px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-[30px] lg:text-[40px] font-bold text-gray-900 mb-2">
                            What He <span className="text-[#008020]">Creates</span>
                        </h2>
                        <p className="text-gray-700 lg:w-[350px] w-auto mx-auto">
                            The tangible innovations and experiences shaping fitness culture in Ilorin.
                        </p>
                    </motion.div>

                    {/* Creations Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {creations.map((creation, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 hover:shadow-xl transition-all duration-300 h-full">
                                    <div className="mb-6">
                                        <div className="lg:text-[22px] text-[18px] leading-tight font-bold text-gray-900 mb-2">
                                            {creation.title}
                                        </div>
                                        <p className="text-gray-600 text-sm mb-4">{creation.description}</p>
                                        <div className="text-xs text-gray-500 font-medium">
                                            Examples: {creation.examples}
                                        </div>
                                    </div>

                                    {/* Creation Category */}
                                    <div className="pt-6 border-t border-gray-100">
                                        <span className="text-sm font-medium px-3 py-1 rounded-full"
                                            style={{
                                                backgroundColor: ['#008020', '#ffde00', '#ff8a00', '#008020'][index] + '20',
                                                color: ['#008020', '#ffde00', '#ff8a00', '#008020'][index]
                                            }}>
                                            Innovation Type {index + 1}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Walk2Fitness Role Section */}
            <section className="py-20 md:py-32 px-4 md:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-linear-to-r from-[#008020]/5 to-[#ffde00]/5 rounded-3xl p-6 lg:p-12 border-2 border-[#008020]/20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Role Description */}
                            <div>
                                <h2 className="text-[30px] lg:text-[40px] font-bold text-gray-900 mb-8">
                                    Role Within <span className="text-[#ff8a00]">Walk2Fitness</span>
                                </h2>

                                <div className="space-y-6 text-gray-700">
                                    <p>
                                        As the <span className="font-semibold text-[#008020]">Founder & Experience Designer</span>,
                                        the role extends beyond event organization to shaping the very essence of what Walk2Fitness represents.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-[#008020] mt-2 shrink-0" />
                                            <span><strong>Oversees Vision & Structure:</strong> Establishing the progressive framework that guides each edition&apos;s evolution</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-[#ffde00] mt-2 shrink-0" />
                                            <span><strong>Curates Participant Experience:</strong> Designing every element—from warm-ups to community conversations</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-[#ff8a00] mt-2 shrink-0" />
                                            <span><strong>Ensures Consistency & Purpose:</strong> Maintaining the core mission while allowing each edition to innovate</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-[#008020] mt-2 shrink-0" />
                                            <span><strong>Drives Community Integration:</strong> Building bridges between fitness, conversation, and healthcare elements</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Role Focus Areas */}
                            <div className="bg-white rounded-2xl lg:p-8 p-5 border-2 border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Primary Focus Areas</h3>
                                <div className="space-y-6">
                                    {[
                                        'Experience Design Philosophy',
                                        'Community Engagement Strategy',
                                        'Progressive Programming',
                                        'Partnership Development',
                                        'Impact Measurement',
                                        'Innovation Integration'
                                    ].map((focus, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-700">
                                                {index + 1}
                                            </div>
                                            <span className="font-medium text-gray-900">{focus}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 md:py-32 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-[30px] lg:text-[40px] font-bold text-gray-900 mb-8">
                            Values That Guide <span className="text-[#ff8a00]">The Work</span>
                        </h2>
                    </motion.div>

                    {/* Values Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-white rounded-3xl lg:p-8 p-5 border-2 border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                                    <div className="flex items-start gap-6">
                                        <div className="shrink-0">
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white"
                                                style={{ backgroundColor: ['#008020', '#ffde00', '#ff8a00', '#008020'][index] }}>
                                                {String.fromCharCode(65 + index)}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                            <p className="text-gray-600">{value.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Testimonials */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="bg-white rounded-2xl p-8 border-2 border-gray-100">
                                    <div
                                        className="text-4xl mb-4"
                                    >
                                        <Quote size={42} className="text-primary/20" />
                                    </div>
                                    <p className="text-gray-700 italic text-lg mb-6">&quot;{testimonial.quote}&quot;</p>
                                    <div className="text-sm text-gray-600">{testimonial.person}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 md:py-32 px-4 md:px-8 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl lg:p-12 p-6 border-2 border-gray-100 shadow-xl"
                    >
                        <h2 className="text-[30px] lg:text-[40px] font-bold text-gray-900 mb-4">
                            Connect With <span className="text-[#ff8a00]">The Innovator</span>
                        </h2>

                        <p className="text-gray-700 mb-10 lg:w-[520px] w-auto mx-auto leading-relaxed">
                            Whether through Walk2Fitness, collaborative events, or wellness partnerships,
                            the work continues to evolve—always centered on people, purpose, and meaningful
                            movement experiences.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Link href="/events/walk2fitness">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-[#008020] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#008020]/25 transition-all duration-300 cursor-pointer lg:w-auto w-full"
                                >
                                    Explore Walk2Fitness
                                </motion.button>
                            </Link>
                            <Link href="/events">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-[#ff8a00] hover:shadow-xl transition-all duration-300 cursor-pointer lg:w-auto w-full"
                                >
                                    View All Experiences
                                </motion.button>
                            </Link>
                            <Link href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-[#ff8a00] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#ff8a00]/25 transition-all duration-300 cursor-pointer lg:w-auto w-full"
                                >
                                    Partner or Collaborate
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutInnovatorPage;