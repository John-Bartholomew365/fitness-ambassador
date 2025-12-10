"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { fadeUp, staggerContainer, viewport } from '../../utils/animation';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'info@fitnessambassador.com',
      link: 'mailto:info@fitnessambassador.com',
      color: 'primary',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+234 XXX XXX XXXX',
      link: 'tel:+234XXXXXXXXX',
      color: 'accent',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      value: '+234 XXX XXX XXXX',
      link: 'https://wa.me/234XXXXXXXXX',
      color: 'secondary',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Ilorin, Kwara State, Nigeria',
      link: null,
      color: 'primary',
    },
  ];

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
              <span className="text-primary font-bold text-sm">GET IN TOUCH</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold text-foreground">
              LET&apos;S START YOUR
              <br />
              <span className="text-primary">FITNESS JOURNEY</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl text-foreground/70">
              Have questions? Want to join our events? Ready to transform? We&apos;re here to help!
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className={`p-6 bg-background rounded-2xl border-2 border-border hover:border-${info.color} transition-all duration-300 hover:shadow-lg`}
              >
                {info.link ? (
                  <a href={info.link} className="block space-y-4">
                    <div className={`w-12 h-12 bg-${info.color}/10 rounded-xl flex items-center justify-center`}>
                      <info.icon className={`w-6 h-6 text-${info.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground/60 mb-1">{info.title}</p>
                      <p className="text-foreground font-semibold">{info.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="space-y-4">
                    <div className={`w-12 h-12 bg-${info.color}/10 rounded-xl flex items-center justify-center`}>
                      <info.icon className={`w-6 h-6 text-${info.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground/60 mb-1">{info.title}</p>
                      <p className="text-foreground font-semibold">{info.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="space-y-8"
            >
              <motion.div variants={fadeUp} className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  SEND US A <span className="text-primary">MESSAGE</span>
                </h2>
                <p className="text-xl text-foreground/70">
                  Fill out the form and we&apos;ll respond within 24 hours
                </p>
              </motion.div>

              <motion.form variants={fadeUp} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Name *</label>
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

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Subject *</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-background border-2 border-border focus:border-primary focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Message *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 rounded-2xl bg-background border-2 border-border focus:border-primary focus:outline-none transition-colors"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>SEND MESSAGE</span>
                  <Send className="w-5 h-5" />
                </button>
              </motion.form>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px] bg-linear-to-br from-primary/20 via-accent/10 to-secondary/20 rounded-3xl overflow-hidden border-4 border-border"
            >
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                <div className="space-y-4">
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <MapPin className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground font-display mb-2">FIND US</p>
                    <p className="text-lg text-foreground/70">Ilorin, Kwara State</p>
                    <p className="text-foreground/70">Nigeria</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
