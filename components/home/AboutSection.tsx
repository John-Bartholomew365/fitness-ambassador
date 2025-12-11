import { motion, useReducedMotion, Easing } from 'framer-motion';
import { Award, Users, Calendar, BookOpen } from 'lucide-react';

const AboutSection = () => {
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

  const achievements = [
    { icon: Award, label: 'Certified Trainer', value: '7+ Years' },
    { icon: Users, label: 'Clients Transformed', value: '500+' },
    { icon: Calendar, label: 'Fitness Events', value: '10+' },
    { icon: BookOpen, label: 'Published Author', value: 'Workout Compass' },
  ];

  return (
    <section className="section-padding bg-muted">
      <div className="container-max">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Content */}
          <motion.div variants={leftVariants}>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              About The Ambassador
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              AJISAFE SULAIMAN
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Known as &quot;<b>The Fitness Ambassador</b>,&quot; I am a certified fitness coach with over 7 years of experience transforming lives through fitness. My mission is to make fitness accessible, enjoyable, and sustainable for everyone.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              From organizing Nigeria&apos;s largest fitness events to authoring the comprehensive fitness guide &quot;<b>Workout Compass</b>,&quot; I&apos;ve dedicated my life to helping others discover the transformative power of exercise and healthy living.
            </p>

            {/* Achievement Grid */}
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 lg:w-auto w-[90%] mx-auto">
              {achievements.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="card-elevated flex items-start gap-4 hover:border-primary/20 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-display text-xl text-primary">{item.value}</p>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Image Grid */}
          <motion.div variants={rightVariants} className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-48 bg-linear-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center">
                  <span className="font-display text-6xl text-primary-foreground">FA</span>
                </div>
                <div className="h-64 bg-linear-to-br from-secondary/80 to-secondary rounded-2xl flex items-center justify-center p-6">
                  <p className="font-display text-2xl text-secondary-foreground text-center">
                    &quot;Transform Your Body, Strengthen Your Mind&quot;
                  </p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-64 bg-linear-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center p-6">
                  <div className="text-center text-accent-foreground">
                    <p className="font-display text-5xl">400+</p>
                    <p className="text-sm mt-2">Jam2Fit Participants</p>
                  </div>
                </div>
                <div className="h-48 bg-foreground rounded-2xl flex items-center justify-center p-6">
                  <p className="font-display text-2xl text-background text-center">
                    Ilorin&apos;s First Nighttime Fitness Party
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
