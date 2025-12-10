import { motion } from 'framer-motion';
import Link from 'next/link';
import { Book, CheckCircle, Download, ShoppingCart } from 'lucide-react';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewport } from '../../utils/animation';

export default function BookPromoSection() {
  const features = [
    'Personalized workout plans for all fitness levels',
    'Complete guide to training splits and routines',
    'Progressive overload principles explained',
    'Stretching routines and mobility work',
    'Simple dietary tips for better results',
    'Real-life program templates you can start today',
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Book Visual */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative"
          >
            <div className="relative max-w-md mx-auto">
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-8 -right-8 w-24 h-24 bg-secondary rounded-2xl rotate-12 opacity-30"
              />
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent rounded-full opacity-20"
              />

              {/* Book mockup */}
              <div className="relative aspect-[3/4] bg-gradient-to-br from-primary via-accent to-secondary rounded-3xl shadow-2xl p-12 flex flex-col items-center justify-center text-center">
                <Book className="w-24 h-24 text-white mb-6" />
                <h3 className="text-4xl font-bold text-white mb-4 font-display">
                  WORKOUT
                  <br />
                  COMPASS
                </h3>
                <p className="text-white/90 text-lg font-semibold mb-2">
                  BY AJISAFE SULAIMAN
                </p>
                <div className="mt-6 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/40">
                  <span className="text-white font-bold">YOUR FITNESS ROADMAP</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="space-y-8"
          >
            <motion.div variants={fadeRight} className="space-y-4">
              <div className="inline-block px-6 py-2 bg-accent/10 border border-accent rounded-full">
                <span className="text-accent font-bold text-sm">BESTSELLING BOOK</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-foreground">
                YOUR PERSONAL
                <br />
                <span className="text-primary">TRAINING BIBLE</span>
              </h2>
            </motion.div>

            <motion.p variants={fadeRight} className="text-xl text-foreground/80 leading-relaxed">
              <strong className="text-accent">Workout Compass</strong> is your practical fitness guide 
              designed to help beginners and experienced gym-goers train with clarity, confidence, and purpose. 
              Stop guessing and start progressing with a structured roadmap to real results.
            </motion.p>

            {/* Features List */}
            <motion.div variants={fadeRight} className="space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeRight} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/book"
                className="group px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>GET THE BOOK</span>
              </Link>
              
              <Link
                href="/book#sample"
                className="group px-8 py-4 bg-transparent border-2 border-accent text-accent rounded-2xl font-bold text-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>SAMPLE CHAPTER</span>
              </Link>
            </motion.div>

            {/* Testimonial */}
            <motion.div variants={fadeRight} className="p-6 bg-background/50 backdrop-blur-sm rounded-2xl border border-border">
              <p className="text-foreground/70 italic mb-4">
                &quot;This book changed my approach to fitness completely. The structured programs and 
                clear explanations made everything click. Highly recommended!&quot;
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">JD</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">John Doe</p>
                  <p className="text-sm text-foreground/60">Fitness Enthusiast</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
