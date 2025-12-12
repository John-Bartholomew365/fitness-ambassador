import { motion, useReducedMotion, Easing } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, ArrowRight, BookOpen, Target, TrendingUp } from 'lucide-react';
import Image from 'next/image';

const benefits = [
  'Personalized workout plans for all fitness levels',
  'Complete guide to training splits and routines',
  'Progressive overload principles explained',
  'Stretching routines and mobility work',
  'Simple dietary tips for better results',
  'Real-life program templates you can start today',
];

const BookPromoSection = () => {
  const shouldReduceMotion = useReducedMotion();

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

  return (
    <section className="section-padding bg-muted overflow-hidden">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Book Image */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="relative"
          >
            <div className="relative z-10">
              <Image
                src="/workouts.jpg"
                alt="Workout Compass Book"
                width={600}
                height={800}
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-secondary/20 rounded-full blur-2xl" />

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute top-8 -right-4 md:right-8 bg-accent text-accent-foreground px-4 py-3 rounded-xl shadow-lg z-20"
            >
              <div className="flex items-center gap-2">
                <BookOpen size={20} />
                <span className="font-semibold text-sm">New Release</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              The Ultimate Fitness Guide
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              WORKOUT <span className="text-gradient">COMPASS</span>
            </h2>
            <p className="text-[16px] text-muted-foreground mb-6 leading-tight">
              A practical fitness guide designed to help beginners and experienced gym-goers train with clarity, confidence, and purpose. Stop guessing — start progressing.
            </p>

            {/* Benefits */}
            <div className="space-y-2 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Features icons */}
            <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-background rounded-2xl">
              <div className="text-center">
                <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Goal-Focused</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-secondary mx-auto mb-2" />
                <p className="text-sm font-medium">Progressive</p>
              </div>
              <div className="text-center">
                <BookOpen className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-sm font-medium">Practical</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book" className="btn-primary inline-flex items-center justify-center gap-2">
                Get the Book <ArrowRight size={18} />
              </Link>
              <Link href="/book#preview" className="btn-outline inline-flex items-center justify-center gap-2">
                Download Sample Chapter
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookPromoSection;