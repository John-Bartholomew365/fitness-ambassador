'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface NewsletterResponse {
  statusCode: string;
  message: string;
  data?: {
    subscriptionId: string;
    email: string;
  };
}

const AfroGrooveWaitingList = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

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
      const loadingToast = toast.loading('Adding you to AfroGroove updates...');
      
      // Prepare subscription data
      const subscriptionData = {
        email: email.trim(),
      };

      // Submit to API - using the same newsletter endpoint
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });

      const result: NewsletterResponse = await response.json();

      if (!response.ok) {
        // Dismiss loading toast and show error
        toast.dismiss(loadingToast);
        toast.error(result.message || 'Failed to subscribe for updates');
        throw new Error(result.message || 'Failed to subscribe for updates');
      }

      // Check if subscription was successful
      if (result.statusCode === '00' || result.message?.includes('success')) {
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success('You\'re now subscribed to AfroGroove updates! We\'ll notify you about the next cultural fitness session.');
        
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
      console.error('Error subscribing to AfroGroove:', error);
      toast.error(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-br from-[#008020]/5 via-white to-[#ff8a00]/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Cultural Pattern Header */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="w-8 h-0.5 bg-[#008020] mt-3" />
            <div className="text-2xl">✨</div>
            <div className="w-8 h-0.5 bg-[#ff8a00] mt-3" />
          </div>

          <h2 className="text-[30px] lg:text-[40px] font-bold text-gray-900 mb-6">
            Ready to Experience <br className="block lg:hidden" /> <span className="text-[#ff8a00]">Cultural</span> Fitness?
          </h2>

          <p className="text-gray-700 text-[16px] mb-10 max-w-2xl mx-auto">
            Join our community to be notified about the next AfroGroove session. Experience the perfect
            fusion of cultural heritage and modern fitness in collaboration with the University of Ilorin.
          </p>

          {/* Email Subscription Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 py-4 px-6 bg-[#008020]/10 rounded-2xl max-w-md mx-auto"
              >
                <div className="w-6 h-6 rounded-full bg-[#008020] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[#008020] font-semibold">Subscribed for AfroGroove updates!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for cultural fitness updates"
                    required
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#008020] focus:ring-2 focus:ring-[#008020]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  whileHover={{ scale: isSubmitting || !email.trim() ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting || !email.trim() ? 1 : 0.95 }}
                  className={`px-8 py-4 bg-[#ff8a00] text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 text-lg flex items-center justify-center gap-3 min-w-[200px] ${
                    isSubmitting || !email.trim() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
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
                    'Stay Connected'
                  )}
                </motion.button>
              </form>
            )}
            <p className="text-gray-500 text-sm mt-3">
              Celebrate culture. Stay fit. Join the movement.
            </p>
          </motion.div>

          <div className="mt-12 pt-8 border-t border-gray-300/30">
            <p className="text-gray-600">
              <span className="font-semibold text-[#008020]">In Partnership with University of Ilorin Sports Council</span><br />
              <span className="text-sm">Bridging cultural heritage with modern fitness innovation</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AfroGrooveWaitingList;