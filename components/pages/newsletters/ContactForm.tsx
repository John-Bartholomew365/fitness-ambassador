'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  partnershipLevel: string;
  goals: string;
}

interface PartnershipResponse {
  statusCode?: string;
  message: string;
  data?: unknown;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    partnershipLevel: '',
    goals: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim()) {
      toast.error('Please fill in all required fields (Name, Email, Company)');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Show loading toast
      const loadingToast = toast.loading('Submitting partnership inquiry...');
      
      // Prepare payload matching your API endpoint
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        brandType: formData.company.trim(),
        partnerType: formData.partnershipLevel.trim(),
        message: formData.goals.trim()
      };

      // Submit to your partner API endpoint
      const response = await fetch('/api/partner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result: PartnershipResponse = await response.json();

      if (!response.ok) {
        // Dismiss loading toast and show error
        toast.dismiss(loadingToast);
        toast.error(result.message || 'Failed to submit partnership inquiry');
        throw new Error(result.message || 'Failed to submit partnership inquiry');
      }

      // Check if submission was successful
      if (result.statusCode === '00' || result.message?.includes('success') || response.status === 200) {
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success('Partnership inquiry submitted successfully! We\'ll respond within 24-48 hours.');
        
        // Reset form
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          partnershipLevel: '',
          goals: ''
        });
      } else {
        throw new Error(result.message || 'Submission failed');
      }
      
    } catch (error) {
      console.error('Error submitting partnership inquiry:', error);
      toast.error(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-br from-[#008020]/5 via-white to-[#ff8a00]/5">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 border-2 border-gray-100 shadow-xl"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Start Your <span className="text-[#ff8a00]">Partnership</span> Journey
            </h2>
            <p className="text-gray-600">
              Let&apos;s discuss how we can create mutual success together.
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#008020] focus:ring-2 focus:ring-[#008020]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#008020] focus:ring-2 focus:ring-[#008020]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Your Company"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#008020] focus:ring-2 focus:ring-[#008020]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="contact@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#008020] focus:ring-2 focus:ring-[#008020]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="+234 800 000 0000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interested Partnership Level
              </label>
              <select 
                name="partnershipLevel"
                value={formData.partnershipLevel}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#008020] focus:ring-2 focus:ring-[#008020]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select a package</option>
                <option value="gold">Gold Partnership</option>
                <option value="silver">Silver Partnership</option>
                <option value="bronze">Bronze Partnership</option>
                <option value="custom">Custom Partnership</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Partnership Goals
              </label>
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                rows={4}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#008020] focus:ring-2 focus:ring-[#008020]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Tell us about your brand goals and how you'd like to partner..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className={`w-full py-4 bg-[#008020] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Partnership Inquiry'
              )}
            </motion.button>

            <p className="text-center text-sm text-gray-500 mt-4">
              We&apos;ll respond within 24-48 hours to discuss partnership opportunities.
            </p>
          </form>
        </motion.div>

        {/* Quick Contact */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Prefer a quicker response? Email us directly at{' '}
            <a href="mailto:fitnessambassador84@gmail.com" className="text-[#008020] font-semibold hover:underline">
              fitnessambassador84@gmail.com
            </a>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Ajisafe Sulaiman - The Fitness Ambassador
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;