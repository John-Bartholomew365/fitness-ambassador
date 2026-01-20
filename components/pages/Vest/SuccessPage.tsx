'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

interface Vest {
  colorName: string;
  type: string;
  size: string;
  price: string;
}

interface UserData {
  userId: string;
  fullName: string;
  email: string;
  registrationId: string;
}

interface PaymentSuccessData {
  vest: Vest | null;
  user: UserData | null;
  timestamp: string;
  paymentId: string;
}

interface EventInfo {
  date: string;
  time: string;
  venue: string;
}

const SuccessPage = () => {
  const router = useRouter();
  const [vestData, setVestData] = useState<Vest | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [paymentId, setPaymentId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [eventInfo] = useState<EventInfo>({
    date: 'February 7, 2026',
    time: '7:00 AM - 10:00 AM',
    venue: 'Starwood Hotels 02 Arena, Ajase Ipo Road, Opp Gaa-Akanbi Junction, Ilorin, Kwara State',
  });

  useEffect(() => {
    const loadRegistrationData = () => {
      try {
        // Check if payment success data exists in sessionStorage
        const paymentSuccessData = sessionStorage.getItem('paymentSuccessData');
        
        if (!paymentSuccessData) {
          toast.error('Registration data not found. Please complete your registration.');
          router.push('/register');
          return;
        }

        const parsedData: PaymentSuccessData = JSON.parse(paymentSuccessData);
        
        
        if (!parsedData.vest || !parsedData.user) {
          toast.error('Incomplete registration data');
          router.push('/register');
          return;
        }

        setVestData(parsedData.vest);
        setUserData(parsedData.user);
        setPaymentId(parsedData.paymentId || `PAY-${Date.now().toString(36).toUpperCase()}`);

        // Launch confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

      } catch (error) {
        console.error('Error loading registration data:', error);
        toast.error('Failed to load registration details');
        router.push('/register');
      } finally {
        setIsLoading(false);
      }
    };

    loadRegistrationData();
  }, [router]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#ff8a00] border-b-[#008020] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading registration details...</p>
        </div>
      </div>
    );
  }

  if (!vestData || !userData) {
    return (
      <div className="min-h-screen bg-linear-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Registration Data Not Found</h2>
          <p className="text-gray-600 mb-4">Please complete your registration process.</p>
          <Link href="/register">
            <button className="px-6 py-2 bg-[#008020] text-white font-semibold rounded-lg hover:bg-[#006a1a] transition-colors">
              Go to Registration
            </button>
          </Link>
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
                    <p className="font-medium">{userData.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 print:text-xs">Email</label>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 print:text-xs">Registration ID</label>
                    <p className="font-medium text-[#008020]">
                      {userData.registrationId}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 print:text-xs">Payment Reference</label>
                    <p className="font-medium text-[#ff8a00]">
                      {paymentId}
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
                    <p className="font-medium">{vestData.type}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 print:text-xs">Color & Size</label>
                    <p className="font-medium">{vestData.colorName} - Size {vestData.size}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 print:text-xs">Amount Paid</label>
                    <p className="font-medium text-[#ff8a00]">{vestData.price}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 print:text-xs">Payment Status</label>
                    <p className="font-medium text-[#008020]">Pending Verification</p>
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

            {/* Important Notice */}
            <div className="mt-8 pt-8 border-t border-gray-100 print:mt-6 print:pt-6">
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-600 mt-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Important Notice</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Your payment receipt is being verified</li>
                      <li>• You will receive confirmation via email within 24-48 hours</li>
                      <li>• Bring your Registration ID <b>{userData.registrationId}</b> and ID card to collect your vest</li>
                      <li>• Vest collection starts 30 minutes before the event</li>
                    </ul>
                  </div>
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
                  You&apos;ll receive a confirmation email with your registration details within 24-48 hours.
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Payment Verification</h3>
                <p className="text-sm text-gray-600">
                  Our team will verify your payment. You&apos;ll be notified once it&apos;s confirmed.
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-orange-600 font-bold">3</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Event Day</h3>
                <p className="text-sm text-gray-600">
                  Arrive 30 minutes early with your ID and confirmation to collect your vest.
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
              <a href="tel:+2348163702286" className="text-[#008020] font-medium hover:underline">
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
                  <div className="font-medium">+234 816 370 2286</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Support Email</div>
                  <div className="font-medium">fitnessambassador84@gmail.com</div>
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