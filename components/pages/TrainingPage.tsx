"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Users, Video, Calendar, Check } from 'lucide-react';
import { fadeUp, staggerContainer, viewport } from '../../utils/animation';
import { toast } from 'sonner';

export default function TrainingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const services = [
    {
      title: 'Personal Training',
      icon: Dumbbell,
      description: 'One-on-one coaching tailored to your fitness goals',
      features: ['Customized workout plans', 'Form correction', 'Progress tracking', 'Nutrition guidance'],
      price: '₦25,000/month',
      color: 'primary',
    },
    {
      title: 'Online Coaching',
      icon: Video,
      description: 'Train with me from anywhere in the world',
      features: ['Video consultations', 'Weekly check-ins', 'Custom programs', '24/7 support'],
      price: '₦15,000/month',
      color: 'accent',
    },
    {
      title: 'Group Sessions',
      icon: Users,
      description: 'High-energy group training for maximum motivation',
      features: ['Small group sizes', 'Community support', 'Varied workouts', 'Flexible schedule'],
      price: '₦10,000/month',
      color: 'secondary',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Booking request sent! We\'ll contact you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <div className="min-h-screen py-20">
      {/* Hero */}
      <section className="py-20 bg-linear-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            <motion.div variants={fadeUp} className="inline-block px-6 py-2 bg-primary/10 border border-primary rounded-full">
              <span className="text-primary font-bold text-sm">PROFESSIONAL TRAINING</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold text-foreground">
              TRANSFORM YOUR
              <br />
              <span className="text-primary">BODY & MIND</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl text-foreground/70">
              Expert coaching from a certified fitness professional with 7+ years of experience
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
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
                TRAINING <span className="text-primary">SERVICES</span>
              </h2>
              <p className="text-xl text-foreground/70">Choose the perfect program for your fitness journey</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className={`relative p-8 bg-background rounded-3xl border-2 border-border hover:border-${service.color} transition-all duration-300 hover:shadow-2xl overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-linear-to-br from-${service.color}/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10 space-y-6">
                    <div className={`w-16 h-16 bg-${service.color}/10 rounded-2xl flex items-center justify-center`}>
                      <service.icon className={`w-8 h-8 text-${service.color}`} />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2 font-display">{service.title}</h3>
                      <p className="text-foreground/70">{service.description}</p>
                    </div>

                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className={`w-5 h-5 text-${service.color} shrink-0 mt-0.5`} />
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={`pt-6 border-t border-border`}>
                      <p className="text-3xl font-bold text-${service.color} mb-4">{service.price}</p>
                      <button className={`w-full px-6 py-3 bg-${service.color} text-${service.color === 'secondary' ? 'secondary-foreground' : 'white'} rounded-2xl font-bold hover:opacity-90 transition-opacity`}>
                        Select Plan
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="max-w-2xl mx-auto space-y-12"
          >
            <motion.div variants={fadeUp} className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                BOOK YOUR <span className="text-primary">SESSION</span>
              </h2>
              <p className="text-xl text-foreground/70">Fill out the form and we&apos;ll get back to you within 24 hours</p>
            </motion.div>

            <motion.form variants={fadeUp} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-background border-2 border-border focus:border-primary focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-background border-2 border-border focus:border-primary focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-background border-2 border-border focus:border-primary focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Service *</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-background border-2 border-border focus:border-primary focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="personal">Personal Training</option>
                    <option value="online">Online Coaching</option>
                    <option value="group">Group Sessions</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 rounded-2xl bg-background border-2 border-border focus:border-primary focus:outline-none transition-colors"
                  placeholder="Tell us about your fitness goals..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                SUBMIT BOOKING REQUEST
              </button>
            </motion.form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
