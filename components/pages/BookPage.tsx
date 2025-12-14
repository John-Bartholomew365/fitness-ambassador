import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ArrowRight, BookOpen, Target, TrendingUp, Download, Star } from 'lucide-react';
import BookPurchaseForm from './BookPurchaseForm';

const chapters = [
  { number: '01', title: 'Understanding Your Body', description: 'Learn how muscles work and respond to training' },
  { number: '02', title: 'Setting Goals', description: 'Define clear, achievable fitness objectives' },
  { number: '03', title: 'Training Splits', description: 'Master the art of program design' },
  { number: '04', title: 'Progressive Overload', description: 'The key to continuous improvement' },
  { number: '05', title: 'Form & Technique', description: 'Exercise execution for maximum results' },
  { number: '06', title: 'Nutrition Basics', description: 'Fuel your body for optimal performance' },
];

const testimonials = [
  {
    name: 'Adebayo O.',
    role: 'Fitness Enthusiast',
    text: 'This book changed how I approach the gym. Finally, a guide that makes sense!',
    rating: 5,
  },
  {
    name: 'Chidinma A.',
    role: 'Beginner',
    text: 'As someone new to fitness, Workout Compass gave me the confidence to start my journey.',
    rating: 5,
  },
  {
    name: 'Emmanuel K.',
    role: '2 Years Training',
    text: 'I thought I knew it all, but this book showed me how much I was missing.',
    rating: 5,
  },
];

const Book = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 md:px-8 bg-linear-to-b from-muted to-background">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Book Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                <Image
                  src="/workouts.jpg"
                  alt="Workout Compass Book"
                  width={400}
                  height={500}
                  className="w-full rounded-2xl shadow-2xl"
                  priority
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-4 -right-4 md:right-8 lg:-right-12 bg-accent text-accent-foreground px-4 py-2 rounded-xl shadow-lg"
                >
                  <span className="font-semibold text-sm">New Release!</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                The Ultimate Fitness Guide
              </span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
                WORKOUT <span className="text-gradient">COMPASS</span>
              </h1>
              <p className="text-[16px] text-muted-foreground mb-6 leading-relaxed">
                A practical fitness guide designed to help beginners and experienced gym-goers train with clarity, confidence, and purpose.
              </p>
              <p className="text-muted-foreground mb-8">
                Written by <span className="text-primary font-bold">Ajisafe Sulaiman — &quot;The Fitness Ambassador&quot;</span>, a certified fitness coach with 7+ years of experience.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#buy" className="btn-primary inline-flex items-center justify-center gap-2">
                  Get the Book <ArrowRight size={18} />
                </a>
                {/* <a href="#preview" className="btn-outline inline-flex items-center justify-center gap-2">
                  <Download size={18} /> Free Sample Chapter
                </a> */}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div>
                  <p className="font-display text-2xl text-primary">150+</p>
                  <p className="text-sm text-muted-foreground">Pages</p>
                </div>
                <div>
                  <p className="font-display text-2xl text-secondary">6</p>
                  <p className="text-sm text-muted-foreground">Chapters</p>
                </div>
                <div>
                  <p className="font-display text-2xl text-accent">100+</p>
                  <p className="text-sm text-muted-foreground">Exercises</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              Inside The Book
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              WHAT YOU&apos;LL <span className="text-gradient">LEARN</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-elevated group hover:shadow-xl transition-all"
              >
                <span className="font-display text-5xl text-primary/20 group-hover:text-primary/40 transition-colors">
                  {chapter.number}
                </span>
                <h3 className="font-display text-2xl text-foreground mt-4 mb-2">
                  {chapter.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {chapter.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-muted">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                Why This Book?
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-foreground mb-8">
                STOP GUESSING, <span className="text-gradient">START PROGRESSING</span>
              </h2>

              <div className="space-y-4">
                {[
                  'Personalized workout plans for any goal',
                  'Progressive overload principles explained',
                  'Stretching routines & form guides',
                  'Simple dietary tips for beginners',
                  'Real program templates you can use today',
                  '100+ exercise demonstrations',
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="h-48 bg-primary rounded-2xl flex items-center justify-center p-6">
                  <div className="text-center text-primary-foreground">
                    <Target className="w-12 h-12 mx-auto mb-3" />
                    <p className="font-display text-xl">Goal-Focused</p>
                  </div>
                </div>
                <div className="h-32 bg-secondary rounded-2xl flex items-center justify-center p-6">
                  <TrendingUp className="w-12 h-12 text-secondary-foreground" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-32 bg-accent rounded-2xl flex items-center justify-center p-6">
                  <BookOpen className="w-12 h-12 text-accent-foreground" />
                </div>
                <div className="h-48 bg-foreground rounded-2xl flex items-center justify-center p-6">
                  <div className="text-center text-background">
                    <p className="font-display text-4xl">7+</p>
                    <p className="text-sm mt-2">Years of Experience</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              Reader Reviews
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              WHAT READERS <span className="text-gradient">SAY</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-elevated"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  &quot;{testimonial.text}&quot;
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="buy" className="section-padding bg-background">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              Get Your Copy
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              ORDER <span className="text-gradient">WORKOUT COMPASS</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get your personal copy delivered to your doorstep. <br /> Complete the order form below.
            </p>
          </motion.div>

          <BookPurchaseForm />
        </div>
      </section>
    </div>
  );
};

export default Book;