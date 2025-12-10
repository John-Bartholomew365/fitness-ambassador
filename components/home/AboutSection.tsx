import { motion } from 'framer-motion';
import { Award, Users, Heart, Zap } from 'lucide-react';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewport } from '../../utils/animation';

export default function AboutSection() {
  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: '7+ years of certified fitness coaching experience',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a vibrant fitness community across Nigeria',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Dedicated to transforming lives through wellness',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Creating unique fitness experiences and events',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary rounded-full opacity-30" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent rounded-full opacity-20" />
              
              {/* Placeholder for about image */}
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl overflow-hidden border-4 border-border shadow-xl">
                <div className="aspect-[4/5] flex items-center justify-center p-8">
                  <div className="text-center space-y-6">
                    <div className="w-48 h-48 bg-primary rounded-full flex items-center justify-center mx-auto shadow-2xl">
                      <span className="text-8xl font-bold text-primary-foreground">FA</span>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-foreground font-display mb-2">
                        AJISAFE SULAIMAN
                      </p>
                      <p className="text-xl text-primary font-semibold">
                        The Fitness Ambassador
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="space-y-8 order-1 lg:order-2"
          >
            <motion.div variants={fadeRight} className="space-y-4">
              <div className="inline-block px-6 py-2 bg-primary/10 border border-primary rounded-full">
                <span className="text-primary font-bold text-sm">ABOUT THE AMBASSADOR</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-foreground">
                MEET YOUR
                <br />
                <span className="text-primary">FITNESS PARTNER</span>
              </h2>
            </motion.div>

            <motion.div variants={fadeRight} className="space-y-4 text-lg text-foreground/80">
              <p>
                Ajisafe Sulaiman, known as <strong className="text-primary">The Fitness Ambassador</strong>, 
                is a certified fitness coach with over 7 years of experience in transforming lives through 
                fitness and wellness.
              </p>
              <p>
                From organizing Nigeria's first nighttime fitness party <strong>Jam2Fit</strong> with 400+ participants, 
                to creating innovative events like Walk2Fitness and Afro Groove, Sulaiman has established himself 
                as a pioneer in the Nigerian fitness industry.
              </p>
              <p>
                As the author of <strong className="text-accent">Workout Compass</strong> and founder of 
                <strong className="text-secondary"> FA Gym Wears</strong>, he provides comprehensive fitness 
                solutions that empower individuals to achieve their health and wellness goals.
              </p>
            </motion.div>

            {/* Values Grid */}
            <motion.div variants={fadeRight} className="grid sm:grid-cols-2 gap-6 pt-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={fadeUp}
                  className="p-6 bg-muted rounded-2xl hover:shadow-lg transition-shadow duration-300"
                >
                  <value.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2 font-display">
                    {value.title}
                  </h3>
                  <p className="text-foreground/70 text-sm">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
