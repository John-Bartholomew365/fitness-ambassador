'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

interface Vest {
  colorName: string;
  type: string;
  size: string;
  price: string;
}

interface BioData {
  fullName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  ageRange: string;
  hasMedicalCondition: string;
  medicalConditionNote: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

interface RegistrationData {
  vest: Vest;
  bio: BioData;
}

interface EventInfo {
  date: string;
  time: string;
  venue: string;
}

const SuccessPage = () => {
  const router = useRouter();
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [registrationId, setRegistrationId] = useState<string>('');
  const [eventInfo] = useState<EventInfo>({
    date: 'March 15, 2024',
    time: '6:00 AM - 10:00 AM',
    venue: 'University of Ilorin Main Gate'
  });

  // Generate a deterministic registration ID based on user data
  const generateRegistrationId = useCallback((data: RegistrationData): string => {
    // Create a stable ID from user data and timestamp
    const timestamp = Date.now().toString(36);
    const nameInitials = data.bio.fullName
      .split(' ')
      .map(n => n.charAt(0))
      .join('')
      .toUpperCase();
    
    // Simple hash of phone number for uniqueness
    const phoneHash = data.bio.phoneNumber
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0)
      .toString(36)
      .toUpperCase()
      .substring(0, 4);
    
    return `W2F5-${nameInitials}-${phoneHash}-${timestamp.substring(4, 8)}`;
  }, []);

 // In your SuccessPage component
useEffect(() => {
  const loadRegistrationData = () => {
    try {
      // Check if registration was completed
      const registrationComplete = localStorage.getItem('registrationComplete');
      const successData = localStorage.getItem('registrationSuccessData');
      
      if (!registrationComplete || !successData) {
        router.push('/register');
        return;
      }

      const parsedData: RegistrationData = JSON.parse(successData);
      
      setRegistrationData(parsedData);
      setRegistrationId(generateRegistrationId(parsedData));

      // Launch confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

    } catch (error) {
      console.error('Error loading registration data:', error);
      router.push('/register');
    }
  };

  loadRegistrationData();
}, [router, generateRegistrationId]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  if (!registrationData) {
    return (
      <div className="min-h-screen bg-linear-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#ff8a00] border-b-[#008020] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading registration details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white print:bg-white">
      <main className="max-w-4xl mx-auto px-4 py-16 print:py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {/* Success Icon */}
          <div className="relative inline-flex print:hidden">
            <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center mb-8 mx-auto">
              <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 print:text-3xl">
            Registration <span className="text-[#008020]">Successful!</span>
          </h1>
          <p className="text-[17px] text-gray-600 mb-8 max-w-2xl mx-auto print:text-lg">
            Congratulations! You&apos;ve successfully registered for Walk2Fitness 5.0. 
            Your spot is confirmed and your vest is reserved.
          </p>

          {/* Registration Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12 text-left print:shadow-none print:border print:p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 print:text-xl">
              Registration Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg print:text-base">Personal Information</h3>
                <div className="space-y-3 print:space-y-2">
                  <div>
                    <label className="text-sm text-gray-500 print:text-xs">Full Name</label>
                    <p className="font-medium">{registrationData.bio.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 print:text-xs">Email</label>
                    <p className="font-medium">{registrationData.bio.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 print:text-xs">Phone</label>
                    <p className="font-medium">{registrationData.bio.phoneNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 print:text-xs">Registration ID</label>
                    <p className="font-medium text-[#ff8a00]">
                      {registrationId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Vest Information */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg print:text-base">Vest Details</h3>
                <div className="space-y-3 print:space-y-2">
                  <div>
                    <label className="text-sm text-gray-500 print:text-xs">Vest Type</label>
                    <p className="font-medium">{registrationData.vest.type}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 print:text-xs">Color & Size</label>
                    <p className="font-medium">{registrationData.vest.colorName} - Size {registrationData.vest.size}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 print:text-xs">Amount Paid</label>
                    <p className="font-medium text-[#ff8a00]">{registrationData.vest.price}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 print:text-xs">Payment Status</label>
                    <p className="font-medium text-[#008020]">Verified ✓</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="mt-8 pt-8 border-t border-gray-100 print:mt-6 print:pt-6">
              <h3 className="font-bold text-gray-900 mb-4 text-lg print:text-base">Event Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:grid-cols-3 print:gap-4">
                <div className="p-4 bg-gray-50 rounded-xl print:p-3">
                  <div className="text-sm text-gray-500 mb-1 print:text-xs">Date</div>
                  <div className="font-medium">{eventInfo.date}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl print:p-3">
                  <div className="text-sm text-gray-500 mb-1 print:text-xs">Time</div>
                  <div className="font-medium">{eventInfo.time}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl print:p-3">
                  <div className="text-sm text-gray-500 mb-1 print:text-xs">Venue</div>
                  <div className="font-medium">{eventInfo.venue}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Steps - Hidden in print */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12 print:hidden"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What&apos;s Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Check Your Email</h3>
                <p className="text-sm text-gray-600">
                  You&apos;ll receive a confirmation email with your registration details within 24 hours.
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Vest Collection</h3>
                <p className="text-sm text-gray-600">
                  Bring your ID card to the event venue to collect your vest on the day of the event.
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-orange-600 font-bold">3</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Event Day</h3>
                <p className="text-sm text-gray-600">
                  Arrive 30 minutes early with comfortable shoes and a positive attitude!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center print:hidden"
          >
            <button
              onClick={handlePrint}
              className="px-8 py-4 cursor-pointer bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-xl hover:border-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Confirmation
            </button>
            
            <Link href="/">
              <button className="px-8 py-4 cursor-pointer bg-[#ff8a00] text-white font-semibold rounded-xl hover:bg-[#e67a00] transition-colors lg:w-auto w-full">
                Back to Homepage
              </button>
            </Link>
            
            <Link href="/events/walk2fitness">
              <button className="px-8 py-4 cursor-pointer bg-[#008020] text-white font-semibold rounded-xl hover:bg-[#006a1a] transition-colors lg:w-auto w-full">
                View Event Details
              </button>
            </Link>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 pt-8 border-t border-gray-200 print:hidden"
          >
            <p className="text-gray-600 mb-4">
              Need help? Contact our support team:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+2341234567890" className="text-[#008020] font-medium hover:underline">
                📞 +234 816 370 2286
              </a>
              <a href="mailto:fitnessambassador84@gmail.com" className="text-[#008020] font-medium hover:underline">
                ✉️ fitnessambassador84@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Print-only footer */}
          <div className="hidden print:block mt-12 pt-8 border-t border-gray-200">
            <div className="text-center text-sm text-gray-500">
              <p>This is an official confirmation of your registration for Walk2Fitness 5.0</p>
              <p className="mt-2">Please bring this confirmation and your ID card for vest collection</p>
              <div className="mt-4 flex justify-center space-x-8">
                <div>
                  <div className="text-xs text-gray-500">Support Phone</div>
                  <div className="font-medium">+234 123 456 7890</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Support Email</div>
                  <div className="font-medium">support@walk2fitness.com</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default SuccessPage;