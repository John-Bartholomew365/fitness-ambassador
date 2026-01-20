'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface NewsletterResponse {
  statusCode: string;
  message: string;
  data?: {
    subscriptionId: string;
    email: string;
  };
}

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Show loading toast
      const loadingToast = toast.loading('Subscribing to newsletter...');
      
      // Prepare subscription data
      const subscriptionData = {
        email: email.trim(),
      };

      console.log('Subscribing with email:', subscriptionData);

      // Submit to API
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });

      const result: NewsletterResponse = await response.json();
      console.log('Newsletter response:', result);

      if (!response.ok) {
        // Dismiss loading toast and show error
        toast.dismiss(loadingToast);
        toast.error(result.message || 'Failed to subscribe to newsletter');
        throw new Error(result.message || 'Failed to subscribe');
      }

      // Check if subscription was successful
      if (result.statusCode === '00' || result.message?.includes('success')) {
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success('Thanks for subscribing! Welcome to the Fitness Ambassador community.');
        
        // Update local state
        setIsSubscribed(true);
        setEmail('');
        
        // Reset subscription status after 5 seconds
        setTimeout(() => {
          setIsSubscribed(false);
        }, 5000);
      } else {
        throw new Error(result.message || 'Subscription failed');
      }
      
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast.error(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-muted relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23008020' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} 
        />
      </div>

      {/* Decorative Elements matching Book section */}
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-2xl" />

      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          {/* Gmail Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-full">
            <Mail className="w-8 h-8 text-primary" />
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
              JOIN THE <span className="text-gradient bg-clip-text text-transparent bg-linear-to-r from-[#008020] via-[#ffde00] to-[#ff8a00]">MOVEMENT</span>
            </h2>
            <p className="text-[16px] lg:w-[470px] w-auto mx-auto text-muted-foreground leading-tight">
              Get exclusive fitness tips, event updates, and early access to new programs delivered straight to your inbox.
            </p>
          </div>

          {/* Form Section */}
          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 py-4 px-6 bg-primary/10 rounded-2xl max-w-md mx-auto"
            >
              <CheckCircle className="w-6 h-6 text-primary" />
              <span className="text-primary font-semibold">Thanks for subscribing!</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-4 rounded-2xl bg-background border-2 border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  whileHover={{ scale: isSubmitting || !email.trim() ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting || !email.trim() ? 1 : 0.98 }}
                  className={`btn-primary cursor-pointer inline-flex items-center justify-center gap-2 min-w-[140px] ${
                    isSubmitting || !email.trim() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    <>
                      Subscribe <Send size={18} />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          )}

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-8 pt-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary font-display">1000+</div>
              <div className="text-muted-foreground text-sm">Subscribers</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary font-display">WEEKLY</div>
              <div className="text-muted-foreground text-sm">Updates</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-accent font-display">FREE</div>
              <div className="text-muted-foreground text-sm">Forever</div>
            </div>
          </motion.div>

          {/* Privacy Text */}
          <p className="text-sm text-muted-foreground mt-6">
            No spam, unsubscribe anytime. <br /> We respect your privacy!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;