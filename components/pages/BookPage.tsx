"use client"
import { motion } from 'framer-motion';
import { Book, CheckCircle, Download, ShoppingCart, Star } from 'lucide-react';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewport } from '../../utils/animation';

export default function BookPage() {
  const chapters = [
    'Understanding Your Fitness Foundation',
    'Creating Personalized Workout Plans',
    'Mastering Training Splits',
    'Progressive Overload Principles',
    'Form and Technique Essentials',
    'Stretching and Mobility Routines',
    'Nutrition Basics for Results',
    'Sample Programs and Templates',
  ];

  const benefits = [
    'Stop guessing and start progressing with structured plans',
    'Build effective routines for any fitness goal',
    'Learn proper form to prevent injuries',
    'Understand how to progressively challenge yourself',
    'Access ready-to-use program templates',
    'Master the fundamentals of gym training',
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
      content: 'This book completely transformed my approach to training. The program templates are pure gold!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Beginner',
      content: 'Finally, a fitness guide that makes sense! No more wandering around the gym confused.',
      rating: 5,
    },
    {
      name: 'Amina Ibrahim',
      role: 'Athlete',
      content: 'Even as an experienced athlete, I learned new techniques. Highly recommend to everyone!',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="py-20 bg-linear-to-br from-primary/10 via-accent/5 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Book Visual */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <div className="relative max-w-md mx-auto">
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -20, 0], rotate: [12, 15, 12] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-8 -right-8 w-24 h-24 bg-secondary rounded-2xl opacity-30"
                />
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent rounded-full opacity-20"
                />

                {/* Book mockup */}
                <motion.div
                  animate={{ rotateY: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative aspect-3/4 bg-linear-to-br from-primary via-accent to-secondary rounded-3xl shadow-2xl p-12 flex flex-col items-center justify-center text-center"
                >
                  <Book className="w-32 h-32 text-white mb-8" />
                  <h3 className="text-5xl font-bold text-white mb-6 font-display">
                    WORKOUT
                    <br />
                    COMPASS
                  </h3>
                  <p className="text-white/90 text-xl font-semibold mb-4">
                    BY AJISAFE SULAIMAN
                  </p>
                  <div className="mt-6 px-8 py-3 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/40">
                    <span className="text-white font-bold text-lg">YOUR FITNESS ROADMAP</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={fadeRight} className="space-y-4">
                <div className="inline-block px-6 py-2 bg-accent/10 border border-accent rounded-full">
                  <span className="text-accent font-bold text-sm">BESTSELLING FITNESS GUIDE</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold text-foreground">
                  WORKOUT
                  <br />
                  <span className="text-primary">COMPASS</span>
                </h1>
                
                <p className="text-2xl text-accent font-semibold">
                  Your Personal Training Bible
                </p>
              </motion.div>

              <motion.p variants={fadeRight} className="text-xl text-foreground/80 leading-relaxed">
                A practical fitness guide designed to help beginners and experienced gym-goers train 
                with <strong className="text-primary">clarity</strong>, <strong className="text-accent">confidence</strong>, 
                and <strong className="text-secondary">purpose</strong>. Stop guessing and start progressing with 
                a structured roadmap to real results.
              </motion.p>

              <motion.div variants={fadeRight} className="flex flex-col sm:flex-row gap-4">
                <button className="group px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                  <ShoppingCart className="w-5 h-5" />
                  <span>BUY NOW - ₦5,000</span>
                </button>
                
                <a
                  href="#sample"
                  className="group px-8 py-4 bg-transparent border-2 border-accent text-accent rounded-2xl font-bold text-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>SAMPLE CHAPTER</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="space-y-12"
          >
            <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold text-foreground">
                WHAT&apos;S <span className="text-primary">INSIDE</span>
              </h2>
              <p className="text-xl text-foreground/70">
                Comprehensive chapters covering everything you need to build an effective training program
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {chapters.map((chapter, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="flex items-start space-x-4 p-6 bg-muted rounded-2xl hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0">
                    <span className="text-primary-foreground font-bold">{index + 1}</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">{chapter}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="space-y-12"
          >
            <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold text-foreground">
                KEY <span className="text-accent">BENEFITS</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="flex items-start space-x-3 p-6 bg-background rounded-2xl border border-border"
                >
                  <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <p className="text-foreground/80">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="space-y-12"
          >
            <motion.div variants={fadeUp} className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold text-foreground">
                READER <span className="text-secondary">REVIEWS</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="p-8 bg-muted rounded-2xl space-y-4"
                >
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-secondary fill-secondary" />
                    ))}
                  </div>
                  <p className="text-foreground/80 italic">&quot;{testimonial.content}&quot;</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-foreground/60">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="sample" className="py-20 bg-linear-to-br from-primary via-accent to-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="text-center space-y-8 max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              START YOUR FITNESS JOURNEY TODAY
            </h2>
            <p className="text-xl text-white/90">
              Get your copy of Workout Compass and transform the way you train forever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-primary rounded-2xl font-bold text-lg hover:bg-white/90 transition-all duration-300 shadow-xl flex items-center justify-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>BUY NOW - ₦5,000</span>
              </button>
              <button className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white text-white rounded-2xl font-bold text-lg hover:bg-white/30 transition-all duration-300 flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" />
                <span>DOWNLOAD SAMPLE</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
