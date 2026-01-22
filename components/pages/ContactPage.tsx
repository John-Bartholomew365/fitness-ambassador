'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { FaWhatsapp } from 'react-icons/fa';

interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  statusCode: string;
  message: string;
  data?: {
    contactId: string;
    fullName: string;
    email: string;
  };
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!isFormValid()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Show loading toast
      const loadingToast = toast.loading('Sending your message...');
      
      // Prepare contact data according to API requirements
      const contactData = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };

      // Submit to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      const result: ContactResponse = await response.json();

      if (!response.ok) {
        // Dismiss loading toast and show error
        toast.dismiss(loadingToast);
        toast.error(result.message || 'Failed to send message');
        throw new Error(result.message || 'Failed to send message');
      }

      // Check if message was successful
      if (result.statusCode === '00' || result.message?.includes('success')) {
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success('Message sent successfully! We\'ll get back to you as soon as possible.');
        
        // Reset form
        setFormData({ 
          fullName: '', 
          email: '', 
          subject: '', 
          message: '' 
        });
      } else {
        throw new Error(result.message || 'Message submission failed');
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    const requiredFields = ['fullName', 'email', 'subject', 'message'];
    return requiredFields.every(field => {
      const value = formData[field as keyof ContactFormData];
      return typeof value === 'string' && value.trim() !== '';
    });
  };

  const handleFormChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
                    <a 
                      href="mailto:fitnessambassador84@gmail.com" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
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
                    <a 
                      href="tel:+2348163702286" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
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
                    value={formData.fullName}
                    onChange={(e) => handleFormChange('fullName', e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => handleFormChange('subject', e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => handleFormChange('message', e.target.value)}
                    rows={5}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Tell us more..."
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !isFormValid()}
                  whileHover={{ scale: isFormValid() && !isSubmitting ? 1.02 : 1 }}
                  whileTap={{ scale: isFormValid() && !isSubmitting ? 0.98 : 1 }}
                  className={`btn-primary cursor-pointer w-full inline-flex items-center justify-center gap-2 ${
                    !isFormValid() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
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