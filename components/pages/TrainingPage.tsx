import { useState } from 'react';
import { motion, Easing } from 'framer-motion';
import { Dumbbell, Users, Video, Apple, Clock, Check, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const services = [
  {
    icon: Dumbbell,
    title: 'Personal Training',
    description: 'One-on-one sessions tailored to your specific goals, fitness level, and schedule.',
    features: ['Custom workout plans', 'Form correction', 'Progress tracking', 'Flexible scheduling'],
    price: 'From ₦15,000/session',
    color: 'primary',
  },
  {
    icon: Users,
    title: 'Group Fitness',
    description: 'High-energy group sessions that combine motivation, community, and results.',
    features: ['Community support', 'Fun atmosphere', 'Varied workouts', 'Affordable pricing'],
    price: 'From ₦5,000/session',
    color: 'secondary',
  },
  {
    icon: Video,
    title: 'Online Coaching',
    description: 'Remote training programs with video guidance and weekly check-ins.',
    features: ['Video tutorials', 'Weekly check-ins', 'Workout plans', 'Chat support'],
    price: 'From ₦25,000/month',
    color: 'accent',
  },
  {
    icon: Apple,
    title: 'Nutrition Guidance',
    description: 'Simple, sustainable dietary advice to fuel your fitness journey.',
    features: ['Meal planning', 'Macro tracking', 'Recipe suggestions', 'Diet optimization'],
    price: 'From ₦10,000/consultation',
    color: 'foreground',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as Easing },
  },
};

const Training = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    goals: '',
    experience: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast({
      title: "Booking Request Sent!",
      description: "We'll get back to you within 24 hours to schedule your consultation.",
    });
    setFormData({ name: '', email: '', phone: '', service: '', goals: '', experience: '' });
  };

  const getColorClass = (color: string, type: 'bg' | 'text') => {
    const colors: Record<string, Record<string, string>> = {
      primary: { bg: 'bg-primary', text: 'text-primary' },
      secondary: { bg: 'bg-secondary', text: 'text-secondary' },
      accent: { bg: 'bg-accent', text: 'text-accent' },
      foreground: { bg: 'bg-foreground', text: 'text-foreground' },
    };
    return colors[color]?.[type] || '';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-8 bg-linear-to-b from-muted to-background">
        <div className="container-max text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6"
          >
            Training & Consultation
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6"
          >
            TRAINING <span className="text-gradient">SERVICES</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[16px] text-muted-foreground lg:w-[480px] w-auto mx-auto"
          >
            Transform your body with personalized training programs designed to help you achieve your fitness goals.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                className="card-elevated group hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 ${getColorClass(service.color, 'bg')} rounded-2xl flex items-center justify-center mb-6`}>
                  <service.icon className="w-8 h-8 text-background" />
                </div>
                <h3 className="font-display text-3xl text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check size={16} className={getColorClass(service.color, 'text')} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className={`font-semibold ${getColorClass(service.color, 'text')}`}>
                    {service.price}
                  </span>
                  <a href="#booking" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
                    Book Now <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="section-padding bg-muted">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Form Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                Book a Session
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
                START YOUR <span className="text-gradient">JOURNEY</span>
              </h2>
              <p className="text-muted-foreground mb-8 ">
                Fill out the form to book a free consultation. <br /> We&apos;ll discuss your goals and create a personalized plan to help you succeed.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-background rounded-2xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Free Consultation</p>
                    <p className="text-sm text-muted-foreground">30-minute session to discuss your goals</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-background rounded-2xl">
                  <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold">Personalized Plan</p>
                    <p className="text-sm text-muted-foreground">Custom program tailored to your needs</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="bg-background rounded-3xl p-6 md:p-8 shadow-lg"
            >
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+234 801 234 5678"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Service Interest *</label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.title} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Fitness Experience</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner (New to fitness)</option>
                    <option value="intermediate">Intermediate (1-2 years)</option>
                    <option value="advanced">Advanced (3+ years)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Your Goals *</label>
                  <textarea
                    required
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Tell us about your fitness goals..."
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary cursor-pointer w-full disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Book Free Consultation'}
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Training;
