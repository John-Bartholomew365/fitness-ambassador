import { motion, useReducedMotion, Easing } from 'framer-motion';
import { Award, Users, Calendar, BookOpen, Dumbbell, Heart, Target, Trophy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const About = () => {
    const shouldReduceMotion = useReducedMotion();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.1,
            },
        },
    };

    const leftVariants = {
        hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -60 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as Easing },
        },
    };

    const rightVariants = {
        hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as Easing },
        },
    };

    const fadeUpVariants = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as Easing },
        },
    };

    const achievements = [
        { icon: Award, label: 'Certified Trainer', value: '7+ Years' },
        { icon: Users, label: 'Clients Transformed', value: '500+' },
        { icon: Calendar, label: 'Fitness Events', value: '10+' },
        { icon: BookOpen, label: 'Published Author', value: 'Workout Compass' },
    ];

    const values = [
        {
            icon: Dumbbell,
            title: 'Discipline',
            description: 'Consistency and dedication are the foundations of every successful fitness journey.',
        },
        {
            icon: Heart,
            title: 'Passion',
            description: 'A genuine love for fitness drives everything we do and inspire others to find their passion.',
        },
        {
            icon: Target,
            title: 'Results',
            description: 'Every program is designed to deliver measurable, sustainable transformations.',
        },
        {
            icon: Trophy,
            title: 'Excellence',
            description: 'We strive for the highest standards in training, events, and client experience.',
        },
    ];

    const timeline = [
        {
            year: '2017',
            title: 'Started Fitness Journey',
            description: 'Began personal training and discovered the passion for helping others transform.',
        },
        {
            year: '2019',
            title: 'Certified Fitness Professional',
            description: 'Obtained professional certification and started formal training services.',
        },
        {
            year: '2021',
            title: 'Walk2Fitness 1.0',
            description: 'Launched the first edition of the Walk2Fitness event, attracting hundreds of participants.',
        },
        {
            year: '2023',
            title: 'Jam2Fit Launch',
            description: "Organized Ilorin's first nighttime fitness party with over 400+ participants.",
        },
        {
            year: '2024',
            title: 'Workout Compass Published',
            description: 'Released the comprehensive fitness guide book to help gym-goers train with purpose.',
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="pt-24 pb-16 md:pt-32 md:pb-24 lg:h-screen lg:pt-0 lg:pb-0 bg-linear-to-b from-muted to-background">
                <div className="container-max h-full lg:px-0 px-5">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center h-full"
                    >
                        {/* Left Content */}
                        <motion.div variants={leftVariants} className="lg:pt-12">
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                                The Fitness Ambassador
                            </span>
                            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                                AJISAFE SULAIMAN
                            </h1>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                A certified fitness coach with over 7 years of experience transforming lives through fitness.
                                My mission is to make fitness accessible, enjoyable, and sustainable for everyone.
                            </p>
                            <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center">
                                <Link href="/training" className="btn-primary w-full sm:w-auto text-center">
                                    Book a Session
                                </Link>
                                <Link href="/events" className="btn-secondary w-full sm:w-auto text-center">
                                    View Events
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right - Image */}
                        <motion.div variants={rightVariants} className="relative lg:h-5/6">
                            <div className="relative rounded-3xl overflow-hidden aspect-3/4 lg:aspect-auto lg:h-full bg-muted lg:mt-8 mt-0">
                                <Image
                                    src="/the-fa.jpeg"
                                    alt="Ajisafe Sulaiman - The Fitness Ambassador"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-foreground/30 to-transparent" />
                            </div>

                            {/* Floating Stats Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="absolute -bottom-12 -left-6 lg:-left-20  md:-left-6 bg-background rounded-2xl p-6 shadow-xl border border-border"
                            >
                                <p className="font-display text-4xl text-primary">500+</p>
                                <p className="text-sm text-muted-foreground">Lives Transformed</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="section-padding bg-background">
                <div className="container-max lg:px-0 px-4">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div variants={fadeUpVariants} className="text-center mb-12">
                            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
                                MY <span className="text-gradient">STORY</span>
                            </h2>
                        </motion.div>

                        <motion.div variants={fadeUpVariants} className="prose prose-lg max-w-none text-muted-foreground">
                            <p className="text-lg leading-relaxed mb-6">
                                My fitness journey began not in a gym, but with a simple decision to take control of my health.
                                What started as a personal pursuit quickly evolved into a passion for helping others discover
                                the transformative power of exercise and healthy living.
                            </p>
                            <p className="text-lg leading-relaxed mb-6">
                                Over the years, I&apos;ve had the privilege of training hundreds of clients, organizing Nigeria&apos;s
                                most innovative fitness events, and authoring the comprehensive fitness guide &quot;<b>Workout Compass</b>.&quot;
                                Each milestone has reinforced my belief that fitness is not just about physical transformation—it&apos;s
                                about building mental strength, discipline, and a community of like-minded individuals.
                            </p>
                            <p className="text-lg leading-relaxed">
                                From <b>Walk2Fitness</b> to <b>Jam2Fit</b>, from personal training sessions to my published work, every
                                initiative is driven by one goal: to make fitness accessible, enjoyable, and life-changing
                                for everyone who joins this journey with me.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="section-padding bg-muted">
                <div className="container-max">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        <motion.h2
                            variants={fadeUpVariants}
                            className="font-display text-4xl md:text-5xl text-foreground text-center mb-12"
                        >
                            ACHIEVEMENTS
                        </motion.h2>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {achievements.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    variants={fadeUpVariants}
                                    className="card-elevated text-center"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                        <item.icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <p className="font-display text-3xl text-primary mb-2">{item.value}</p>
                                    <p className="text-sm text-muted-foreground">{item.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section-padding bg-background">
                <div className="container-max">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        <motion.div variants={fadeUpVariants} className="text-center mb-12">
                            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
                                CORE VALUES
                            </h2>
                            <p className="text-[16px] text-muted-foreground max-w-2xl mx-auto leading-tight">
                                The principles that guide every training session, event, and interaction.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value) => (
                                <motion.div
                                    key={value.title}
                                    variants={fadeUpVariants}
                                    className="card-elevated text-center"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                                        <value.icon className="w-7 h-7 text-secondary-foreground" />
                                    </div>
                                    <h3 className="font-display text-xl text-foreground mb-2">{value.title}</h3>
                                    <p className="text-sm text-muted-foreground">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="section-padding bg-muted">
                <div className="container-max">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        <motion.h2
                            variants={fadeUpVariants}
                            className="font-display text-4xl md:text-5xl text-foreground text-center mb-12"
                        >
                            THE <span className="text-gradient">JOURNEY</span>
                        </motion.h2>

                        <div className="max-w-3xl mx-auto lg:px-0 px-3">
                            {timeline.map((item) => (
                                <motion.div
                                    key={item.year}
                                    variants={fadeUpVariants}
                                    className="relative pl-8 pb-12 last:pb-0 border-l-2 border-primary/30"
                                >
                                    <div className="absolute -left-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                                    </div>
                                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-2">
                                        {item.year}
                                    </span>
                                    <h3 className="font-display text-xl text-foreground mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-primary">
                <div className="container-max text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="font-display text-4xl md:text-5xl text-primary-foreground mb-6">
                            READY TO START YOUR JOURNEY?
                        </h2>
                        <p className="text-[16px] text-primary-foreground/80 mb-8 lg:w-[470px] w-auto mx-auto leading-tight">
                            Whether you&apos;re a beginner or experienced athlete, let&apos;s work together to achieve your fitness goals.
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-center">
                            <Link
                                href="/training"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background text-foreground font-bold rounded-2xl hover:bg-background/90 transition-colors w-[90%] sm:w-auto text-center"
                            >
                                Book a Session
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-foreground/10 text-primary-foreground font-bold rounded-2xl border-2 border-primary-foreground/30 hover:bg-primary-foreground/20 transition-colors w-[90%] sm:w-auto text-center"
                            >
                                Get in Touch
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;