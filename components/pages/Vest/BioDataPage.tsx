'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Vest {
  colorName: string;
  type: string;
  size: string;
  price: string;
}

interface RegistrationResponse {
  statusCode: string;
  message: string;
  data: {
    userId: string;
    fullName: string;
    email: string;
    registration_id: string;
  };
}

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  birthDay: string;
  birthMonth: string;
  hasMedicalCondition: string;
  medicalConditionNote: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

const BioDataPage = () => {
  const router = useRouter();
  const [selectedVest, setSelectedVest] = useState<Vest | null>(null);
  const [vestId, setVestId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    gender: '',
    birthDay: '',
    birthMonth: '',
    hasMedicalCondition: '',
    medicalConditionNote: '',
    emergencyContactName: '',
    emergencyContactPhone: ''
  });

  // Get today's date
  const today = useMemo(() => new Date(), []);
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;

  // Generate arrays for days and months
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  // Load initial data
  useEffect(() => {
    const loadInitialData = () => {
      try {
        // Get vestId and vest details from sessionStorage
        const storedVestId = sessionStorage.getItem('selectedVestId');
        const storedVestDetails = sessionStorage.getItem('selectedVestDetails');
        
        if (!storedVestId || !storedVestDetails) {
          toast.error('Please select a vest first');
          router.push('/register');
          return;
        }
        
        // Set vestId for API call
        setVestId(storedVestId);
        
        // Set vest details for display
        const parsedVest = JSON.parse(storedVestDetails);
        setSelectedVest(parsedVest);
        
        // Set default birth day/month to today's date
        setFormData(prev => ({
          ...prev,
          birthDay: currentDay.toString(),
          birthMonth: currentMonth.toString()
        }));
      } catch (error) {
        console.error('Error loading vest data:', error);
        toast.error('Failed to load vest selection');
        router.push('/register');
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [router, currentDay, currentMonth]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleRadioChange = useCallback((name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleDateChange = useCallback((type: 'day' | 'month', value: string) => {
    setFormData(prev => ({
      ...prev,
      [type === 'day' ? 'birthDay' : 'birthMonth']: value
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (!vestId) {
      toast.error('Vest selection not found. Please select a vest again.');
      router.push('/register');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Show loading toast
      const loadingToast = toast.loading('Submitting your information...');
      
      // Prepare bio-data payload according to your API requirements
      const bioDataPayload = {
        email: formData.email,
        vestId: vestId,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
        dobDay: parseInt(formData.birthDay),
        dobMonth: formData.birthMonth,
        medicalCondition: formData.hasMedicalCondition === 'Yes',
        medicalDetails: formData.hasMedicalCondition === 'Yes' ? formData.medicalConditionNote : null,
        emergencyName: formData.emergencyContactName,
        emergencyPhone: formData.emergencyContactPhone,
      };

      // Submit to API
      const response = await fetch('/api/biodata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bioDataPayload),
      });

      const result = await response.json();
      if (!response.ok) {
        // Dismiss loading toast and show error
        toast.dismiss(loadingToast);
        toast.error(result.message || 'Failed to submit your information');
        throw new Error(result.message || 'Failed to submit bio-data');
      }

      // Check if registration was successful (statusCode "00")
      if (result.statusCode === '00' && result.data) {
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success('Registration successful!');
        
        // Save the registration response for the payment page
        sessionStorage.setItem('registrationResponse', JSON.stringify(result));
        
        // Also save user data for display
        sessionStorage.setItem('userData', JSON.stringify({
          userId: result.data.userId,
          fullName: result.data.fullName,
          email: result.data.email,
          registrationId: result.data.registration_id
        }));
        
        // Add a small delay before redirect to show the success toast
        setTimeout(() => {
          router.push('/register/payment');
        }, 1500);
      } else {
        throw new Error(result.message || 'Registration failed');
      }
      
    } catch (error) {
      console.error('Error submitting bio-data:', error);
      toast.error(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    const requiredFields = ['fullName', 'phoneNumber', 'email', 'gender', 'birthDay', 'birthMonth', 'emergencyContactName', 'emergencyContactPhone'];
    return requiredFields.every(field => formData[field as keyof FormData].trim() !== '');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#ff8a00] border-b-[#008020] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your selection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="lg:flex block items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-[#ff8a00]" />
                <span className="text-xl font-bold text-gray-900">Walk2Fitness</span>
              </div>
            </Link>
            <div className="flex items-center gap-4 lg:mt-0 mt-5">
              <span className="text-sm text-gray-600">Step 2 of 3</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-[#008020]" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Selected Vest Summary */}
        {selectedVest && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Your Selected Vest</h3>
                <p className="text-gray-600">
                  {selectedVest.colorName} {selectedVest.type} - Size: {selectedVest.size}
                </p>
              </div>
              <div className="text-2xl font-bold text-[#ff8a00]">{selectedVest.price}</div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          {/* Form Header */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Personal Information
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Please provide your details for event registration and emergency purposes.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                  Personal Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#008020] focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#008020] focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Enter your phone number"
                    />
                  </div>

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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#008020] focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {['Male', 'Female', 'Other'].map((gender) => (
                        <label key={gender} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value={gender}
                            checked={formData.gender === gender}
                            onChange={() => handleRadioChange('gender', gender)}
                            required
                            disabled={isSubmitting}
                            className="w-4 h-4 text-[#008020] focus:ring-[#008020] disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <span className="text-gray-700">{gender}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Day & Month of Birth */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Day & Month of Birth *
                    </label>
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Day Selector */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-2 h-2 rounded-full bg-[#008020]"></div>
                          <span className="text-sm font-medium text-gray-700">Day</span>
                        </div>
                        <div className="relative">
                          <select
                            name="birthDay"
                            value={formData.birthDay}
                            onChange={(e) => handleDateChange('day', e.target.value)}
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#008020] focus:border-transparent transition-all outline-none appearance-none bg-white text-center text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                              backgroundPosition: 'right 1rem center',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: '1.5em 1.5em',
                              paddingRight: '2.5rem'
                            }}
                          >
                            <option value="">Select Day</option>
                            {days.map((day) => (
                              <option 
                                key={day} 
                                value={day}
                                className={`text-center ${parseInt(day) === currentDay ? 'font-bold text-[#008020]' : ''}`}
                              >
                                {day}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Month Selector */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-2 h-2 rounded-full bg-[#008020]"></div>
                          <span className="text-sm font-medium text-gray-700">Month</span>
                        </div>
                        <div className="relative">
                          <select
                            name="birthMonth"
                            value={formData.birthMonth}
                            onChange={(e) => handleDateChange('month', e.target.value)}
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#008020] focus:border-transparent transition-all outline-none appearance-none bg-white text-center text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                              backgroundPosition: 'right 1rem center',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: '1.5em 1.5em',
                              paddingRight: '2.5rem'
                            }}
                          >
                            <option value="">Select Month</option>
                            {months.map((month) => (
                              <option 
                                key={month.value} 
                                value={month.value}
                                className={`text-center ${parseInt(month.value) === currentMonth ? 'font-bold text-[#008020]' : ''}`}
                              >
                                {month.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                  Medical Information
                </h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Do you have any medical conditions we should be aware of? *
                  </label>
                  <div className="flex flex-wrap gap-6">
                    {['Yes', 'No'].map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="hasMedicalCondition"
                          value={option}
                          checked={formData.hasMedicalCondition === option}
                          onChange={() => handleRadioChange('hasMedicalCondition', option)}
                          required
                          disabled={isSubmitting}
                          className="w-5 h-5 text-[#008020] focus:ring-[#008020] disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <span className="text-gray-700 font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.hasMedicalCondition === 'Yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Please specify your medical condition(s)
                    </label>
                    <textarea
                      name="medicalConditionNote"
                      value={formData.medicalConditionNote}
                      onChange={handleChange}
                      rows={3}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#008020] focus:border-transparent transition-all outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Enter details about your medical condition..."
                    />
                  </motion.div>
                )}
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                  Emergency Contact
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact Name *
                    </label>
                    <input
                      type="text"
                      name="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#008020] focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Full name of emergency contact"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact Phone *
                    </label>
                    <input
                      type="tel"
                      name="emergencyContactPhone"
                      value={formData.emergencyContactPhone}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#008020] focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Phone number of emergency contact"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register" className="flex-1">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    className="w-full cursor-pointer py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Back to Vest Selection
                  </button>
                </Link>
                
                <button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className={`flex-1 py-4 font-semibold rounded-xl transition-all cursor-pointer outline-none ${isFormValid() && !isSubmitting ? 'bg-[#ff8a00] text-white hover:bg-[#e67a00] focus:ring-2 focus:ring-[#ff8a00] focus:ring-offset-2' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
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
                    'Continue to Payment'
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Information Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100"
        >
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-blue-600 mt-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Privacy Notice</h4>
              <p className="text-sm text-gray-600">
                Your personal information is collected solely for event registration and emergency purposes. 
                We do not share your data with third parties without your consent. All medical information 
                is kept confidential and only accessible to our medical team during the event.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default BioDataPage;