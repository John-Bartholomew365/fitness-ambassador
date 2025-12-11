import { motion, useReducedMotion, Easing } from 'framer-motion';
import Link from 'next/link';
import { Dumbbell, Users, Video, Apple, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Dumbbell,
    title: 'Personal Training',
    description: 'One-on-one sessions tailored to your specific goals, fitness level, and schedule.',
    color: 'bg-primary',
  },
  {
    icon: Users,
    title: 'Group Fitness',
    description: 'High-energy group sessions that combine motivation, community, and results.',
    color: 'bg-secondary',
  },
  {
    icon: Video,
    title: 'Online Coaching',
    description: 'Remote training programs with video guidance and weekly check-ins.',
    color: 'bg-accent',
  },
  {
    icon: Apple,
    title: 'Nutrition Guidance',
    description: 'Simple, sustainable dietary advice to fuel your fitness journey.',
    color: 'bg-foreground',
  },
];

const ServicesSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as Easing },
    },
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
            Training & Consultation
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            TRAINING <span className="text-gradient">SERVICES</span>
          </h2>
          <p className="text-[16px] text-muted-foreground lg:w-[470px] w-auto mx-auto leading-tight">
            Whether you prefer in-person training or remote coaching, we have the perfect program for your fitness journey.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group card-elevated hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                <service.icon className="w-7 h-7 text-background" />
              </div>
              <h3 className="font-display text-2xl text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                {service.description}
              </p>
              <Link
                href="/training"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all"
              >
                Learn More <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-primary rounded-3xl p-8 md:p-12">
            <h3 className="font-display text-3xl md:text-4xl text-primary-foreground mb-4">
              READY TO START YOUR JOURNEY?
            </h3>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Book a free consultation and let&apos;s discuss your fitness goals together.
            </p>
            <Link href="/training" className="btn-secondary inline-flex items-center gap-2">
              Book Free Consultation <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
