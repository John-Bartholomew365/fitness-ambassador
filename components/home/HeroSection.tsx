import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { fadeLeft, fadeRight, staggerContainer, } from '../../utils/animation';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-linear-to-br from-background via-muted to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={fadeLeft} className="space-y-4">
              <div className="inline-block px-6 py-2 bg-primary/10 border-2 border-primary rounded-full">
                <span className="text-primary font-bold text-sm">7+ YEARS OF EXCELLENCE</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="text-foreground">THE</span>
                <br />
                <span className="text-primary">FITNESS</span>
                <br />
                <span className="text-accent">AMBASSADOR</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-foreground/80 font-medium max-w-xl">
                Ajisafe Sulaiman - Your partner in transformation through premium fitness events, 
                expert training, and comprehensive wellness solutions.
              </p>
            </motion.div>

            <motion.div variants={fadeLeft} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/training"
                className="group px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span>BOOK A SESSION</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/events"
                className="group px-8 py-4 bg-transparent border-2 border-primary text-primary rounded-2xl font-bold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>VIEW EVENTS</span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeLeft} className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center lg:text-left">
                <div className="text-4xl font-bold text-primary font-display">400+</div>
                <div className="text-sm text-foreground/60 uppercase font-semibold">Participants</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-4xl font-bold text-accent font-display">10+</div>
                <div className="text-sm text-foreground/60 uppercase font-semibold">Events</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-4xl font-bold text-secondary font-display">7+</div>
                <div className="text-sm text-foreground/60 uppercase font-semibold">Years</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Placeholder for hero image */}
              <div className="absolute inset-0 bg-linear-to-br from-primary via-accent to-secondary rounded-[3rem] transform rotate-6 opacity-20" />
              <div className="relative bg-linear-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-[3rem] overflow-hidden border-4 border-primary shadow-2xl">
                <div className="aspect-square flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-6xl font-bold text-primary-foreground">FA</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground font-display">
                      AJISAFE SULAIMAN
                    </p>
                    <p className="text-lg text-foreground/60">
                      Certified Fitness Coach
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
