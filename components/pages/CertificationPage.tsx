"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Clock, Users } from 'lucide-react';
import { fadeUp, staggerContainer, viewport } from '../../utils/animation';
import { toast } from 'sonner';

export default function CertificationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
  });

  const features = [
    'Comprehensive fitness training curriculum',
    'Industry-recognized certification',
    'Practical hands-on experience',
    'Business and client management skills',
    'Nutrition and program design',
    'Marketing and social media for trainers',
  ];

  const benefits = [
    { icon: Award, title: 'Professional Certification', description: 'Earn a recognized fitness coaching certificate' },
    { icon: Users, title: 'Expert Mentorship', description: 'Learn directly from industry professionals' },
    { icon: Clock, title: 'Flexible Schedule', description: 'Online and in-person training options' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('You\'ve been added to the waitlist! We\'ll notify you when enrollment opens.');
    setFormData({ name: '', email: '', phone: '', experience: '' });
  };

  return (
    <div className="min-h-screen py-20">
      {/* Hero */}
      <section className="py-20 bg-linear-to-br from-primary/20 via-accent/10 to-secondary/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            <motion.div variants={fadeUp} className="inline-block px-6 py-2 bg-primary/10 border border-primary rounded-full">
              <span className="text-primary font-bold text-sm">COMING SOON</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold text-foreground">
              BECOME A
              <br />
              <span className="text-primary">CERTIFIED</span>
              <br />
              <span className="text-accent">FITNESS PRO</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl text-foreground/80">
              Join our comprehensive certification program and launch your career as a professional fitness coach
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
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
                PROGRAM <span className="text-primary">BENEFITS</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="p-8 bg-background rounded-3xl border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-xl text-center"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 font-display">{benefit.title}</h3>
                  <p className="text-foreground/70">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 bg-muted">
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
                WHAT YOU&apos;LL <span className="text-accent">LEARN</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="flex items-start space-x-3 p-6 bg-background rounded-2xl"
                >
                  <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <p className="text-foreground/80 font-medium">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section className="py-20">
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
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                JOIN THE <span className="text-primary">WAITLIST</span>
              </h2>
              <p className="text-xl text-foreground/70">
                Be the first to know when enrollment opens. Limited spots available!
              </p>
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
                  <label className="block text-sm font-semibold text-foreground mb-2">Experience Level *</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-background border-2 border-border focus:border-primary focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Select level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                JOIN WAITLIST
              </button>

              <p className="text-center text-sm text-foreground/60">
                We&apos;ll notify you as soon as enrollment opens. No spam, we promise!
              </p>
            </motion.form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
