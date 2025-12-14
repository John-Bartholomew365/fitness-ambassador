import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
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
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6"
          >
            LET&apos;S START YOUR <br /> <span className="text-gradient">FITNESS JOURNEY</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[16px] text-muted-foreground max-w-2xl mx-auto leading-tight"
          >
            Have questions about our training programs, events, or products? <br /> We&apos;d love to hear from you!
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-4xl text-foreground mb-8">
                LET&apos;S <span className="text-gradient">CONNECT</span>
              </h2>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg mb-1">Email</p>
                    <a href="mailto:fitnessambassador84@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                      fitnessambassador84@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg mb-1">Phone</p>
                    <a href="tel:+2348163702286" className="text-muted-foreground hover:text-primary transition-colors">
                      +234 816 370 2286
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg mb-1">Location</p>
                    <p className="text-muted-foreground">
                      Ilorin, Kwara State, Nigeria
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}



              {/* DESKTOP CTA */}
              <a
                href="https://wa.me/2348163702286?text=Hello%20Fitness%20Ambassador!%20I'm%20interested%20in%20your%20fitness%20programs.%20Can%20you%20tell%20me%20more%20about%3A%0A%0A1.%20Your%20training%20sessions%0A2.%20Upcoming%20events%0A3.%20The%20Workout%20Compass%20book%0A%0AThank%20you!"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary lg:inline-flex hidden items-center gap-2"
              >
                <FaWhatsapp size={20} />
                Chat on WhatsApp
              </a>


              {/* MOBILE CTA */}
              <div className="w-full lg:hidden flex justify-center">
                <a
                  href="https://wa.me/2348163702286?text=Hello%20Fitness%20Ambassador!%20I'm%20interested%20in%20your%20fitness%20programs.%20Can%20you%20tell%20me%20more%20about%3A%0A%0A1.%20Your%20training%20sessions%0A2.%20Upcoming%20events%0A3.%20The%20Workout%20Compass%20book%0A%0AThank%20you!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 w-[90%] sm:w-auto justify-center"
                >
                  <FaWhatsapp size={20} />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="bg-muted rounded-3xl p-6 md:p-8"
            >
              <h3 className="font-display text-2xl text-foreground mb-6">Send a Message</h3>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Tell us more..."
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary cursor-pointer w-full inline-flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;