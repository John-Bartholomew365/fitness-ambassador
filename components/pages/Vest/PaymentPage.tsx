'use client';

import React, { useState, useEffect, useCallback } from 'react';
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

interface UserData {
  userId: string;
  fullName: string;
  email: string;
  registrationId: string;
}

interface BankAccount {
  name: string;
  accountNumber: string;
  accountName: string;
  logo: string;
}

type BankType = 'gtBank' | 'jaizBank';

const PaymentPage = () => {
  const router = useRouter();
  const [selectedVest, setSelectedVest] = useState<Vest | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeBank, setActiveBank] = useState<BankType>('gtBank');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const bankAccounts: Record<BankType, BankAccount> = {
    gtBank: {
      name: 'GT Bank',
      accountNumber: '3002385769',
      accountName: 'The Fitness Ambassador Ltd',
      logo: '/first-bank-logo.png'
    },
    jaizBank: {
      name: 'Jaiz Bank',
      accountNumber: '0019155788',
      accountName: 'Ajisafe Sulaiman',
      logo: '/access-bank-logo.png'
    }
  };

  useEffect(() => {
    const loadData = () => {
      try {
        // Get vest details and user data from sessionStorage
        const storedVestDetails = sessionStorage.getItem('selectedVestDetails');
        const storedUserData = sessionStorage.getItem('userData');
                
        if (!storedVestDetails || !storedUserData) {
          toast.error('Registration data not found. Please complete your registration.');
          router.push('/register');
          return;
        }
        
        // Set vest details
        const parsedVest = JSON.parse(storedVestDetails);
        setSelectedVest(parsedVest);
        
        // Set user data (from registration response)
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
                
      } catch (error) {
        console.error('Error loading registration data:', error);
        toast.error('Failed to load registration data');
        router.push('/register');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [router]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size too large. Maximum size is 5MB.');
        return;
      }
      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        toast.error('Invalid file type. Please upload JPG, PNG, or PDF.');
        return;
      }
      setReceiptFile(file);
      toast.success('File selected successfully');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!receiptFile) {
      toast.error('Please upload your payment receipt');
      return;
    }
    
    if (!userData?.userId) {
      toast.error('User information not found. Please complete registration again.');
      router.push('/register');
      return;
    }

    setUploading(true);
    
    try {
      // Show loading toast
      const loadingToast = toast.loading('Uploading payment receipt...');
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('userId', userData.userId);
      formData.append('paymentProof', receiptFile);
      
      // Submit to API
      const response = await fetch('/api/payment', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        // Dismiss loading toast and show error
        toast.dismiss(loadingToast);
        toast.error(result.message || 'Failed to upload receipt');
        throw new Error(result.message || 'Failed to upload receipt');
      }

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success('Payment receipt uploaded successfully!');
      
      // Generate a unique payment ID for display
      const paymentId = `PAY-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      
      // Save ONLY the data needed for success page
      sessionStorage.setItem('paymentSuccessData', JSON.stringify({
        vest: selectedVest,
        user: userData,
        timestamp: new Date().toISOString(),
        paymentId: paymentId
      }));
      
      // CLEAR ALL registration data from sessionStorage
      // We only keep paymentSuccessData for the success page
      sessionStorage.removeItem('selectedVestId');
      sessionStorage.removeItem('selectedVestDetails');
      sessionStorage.removeItem('registrationResponse');
      sessionStorage.removeItem('userData');
            
      // Add a small delay before redirect to show the success toast
      setTimeout(() => {
        router.push('/register/success');
      }, 1500);
      
    } catch (error) {
      console.error('Error uploading receipt:', error);
      toast.error(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
        toast.error('Failed to copy to clipboard. Please copy manually.');
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#ff8a00] border-b-[#008020] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your registration data...</p>
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
              <span className="text-sm text-gray-600">Step 3 of 3</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-full h-full bg-[#008020]" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Registration Summary */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
        >
          {/* Vest Summary */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Your Vest</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">{selectedVest?.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Color:</span>
                <span className="font-medium">{selectedVest?.colorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Size:</span>
                <span className="font-medium">{selectedVest?.size}</span>
              </div>
              <div className="pt-3 border-t border-gray-100">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="text-2xl font-bold text-[#ff8a00]">{selectedVest?.price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Info */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Registration Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Registration ID:</span>
                <span className="font-medium text-right">{userData?.registrationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{userData?.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{userData?.email}</span>
              </div>
              <div className="pt-3 border-t border-gray-100">
                <div className="flex justify-between">
                  <span className="text-gray-600">User ID:</span>
                  <span className="font-medium text-xs">{userData?.userId?.substring(0, 8)}...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="bg-linear-to-br from-[#008020]/10 to-[#ff8a00]/10 rounded-2xl p-6 border border-[#008020]/20">
            <h3 className="font-bold text-gray-900 mb-4">Total Amount</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Vest Price:</span>
                <span className="text-xl font-bold">{selectedVest?.price}</span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total to Pay:</span>
                  <span className="text-3xl font-bold text-[#ff8a00]">{selectedVest?.price}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="p-6 md:p-8 border-b border-gray-100">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Make Payment
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Transfer the total amount to any of our bank accounts and upload your receipt.
            </p>
          </div>

          <div className="p-6 md:p-8">
            {/* Bank Selection Tabs */}
            <div className="mb-8">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveBank('gtBank')}
                  className={`px-4 md:px-6 py-3 cursor-pointer font-medium transition-colors text-sm md:text-base ${activeBank === 'gtBank' ? 'text-[#008020] border-b-2 border-[#008020]' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  GT Bank
                </button>
                <button
                  onClick={() => setActiveBank('jaizBank')}
                  className={`px-4 md:px-6 py-3 font-medium cursor-pointer transition-colors text-sm md:text-base ${activeBank === 'jaizBank' ? 'text-[#008020] border-b-2 border-[#008020]' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Jaiz Bank
                </button>
              </div>
            </div>

            {/* Active Bank Details */}
            <div className="mb-8">
              <div className="bg-linear-to-r from-blue-50 to-green-50 rounded-2xl p-6 md:p-8 border border-blue-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-500">Bank Name</label>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                        <span className="font-bold text-gray-700">{bankAccounts[activeBank].name.charAt(0)}</span>
                      </div>
                      <span className="text-lg md:text-xl font-bold text-gray-900">{bankAccounts[activeBank].name}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-500">Account Number</label>
                    <div className="flex items-center gap-3">
                      <code className="text-lg md:text-2xl font-mono font-bold text-gray-900">
                        {bankAccounts[activeBank].accountNumber}
                      </code>
                      <button
                        onClick={() => copyToClipboard(bankAccounts[activeBank].accountNumber)}
                        disabled={uploading}
                        className="px-3 md:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-500">Account Name</label>
                    <div className="flex items-center gap-3">
                      <code className="text-base md:text-xl font-mono font-bold text-gray-900">
                        {bankAccounts[activeBank].accountName}
                      </code>
                      <button
                        onClick={() => copyToClipboard(bankAccounts[activeBank].accountName)}
                        disabled={uploading}
                        className="px-3 md:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Payment Instructions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#008020] flex items-center justify-center mt-1 shrink-0">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Transfer Instructions</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Transfer <strong>{selectedVest?.price}</strong> to the account details provided above.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#008020] flex items-center justify-center mt-1 shrink-0">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Reference</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Use your Registration ID as payment reference: <br />
                        <strong>{userData?.registrationId}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#008020] flex items-center justify-center mt-1 shrink-0">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Save Receipt</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Take a screenshot or save your transfer receipt. You&apos;ll upload it in the next step.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#008020] flex items-center justify-center mt-1 shrink-0">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Upload Receipt</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Upload your payment receipt below to complete your registration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Receipt Upload Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Upload Payment Receipt *
                </label>
                
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 md:p-8 text-center hover:border-[#008020] transition-colors cursor-pointer">
                  <input
                    type="file"
                    id="receipt-upload"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={uploading}
                  />
                  <label htmlFor="receipt-upload" className={`cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-[#008020]/10 flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-[#008020]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" stroke-linejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      
                      {receiptFile ? (
                        <div>
                          <p className="font-medium text-gray-900 text-sm md:text-base">{receiptFile.name}</p>
                          <p className="text-xs md:text-sm text-gray-500 mt-1">
                            {(receiptFile.size / 1024).toFixed(2)} KB • {uploading ? 'Uploading...' : 'Click to change'}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="font-medium text-gray-900 text-sm md:text-base">
                            {uploading ? 'Uploading...' : 'Click to upload receipt'}
                          </p>
                          <p className="text-xs md:text-sm text-gray-500 mt-1">
                            PNG, JPG, PDF up to 5MB
                          </p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* Important Notice */}
              <div className="mb-8 lg:p-6 p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-yellow-600 mt-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Important Information</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Your registration is only confirmed after receipt verification</li>
                      <li>• Receipt verification takes 24-48 hours</li>
                      <li>• You will receive a confirmation email and SMS</li>
                      <li>• Bring your Registration ID <b>{userData?.registrationId}</b> to the event for vest collection</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register/bio-data" className="flex-1">
                  <button
                    type="button"
                    disabled={uploading}
                    className="w-full py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Back to Personal Info
                  </button>
                </Link>
                
                <button
                  type="submit"
                  disabled={!receiptFile || uploading}
                  className={`flex-1 py-4 font-semibold rounded-xl cursor-pointer transition-all outline-none ${receiptFile && !uploading ? 'bg-[#ff8a00] text-white hover:bg-[#e67a00] focus:ring-2 focus:ring-[#ff8a00] focus:ring-offset-2' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  {uploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </span>
                  ) : (
                    'Complete Registration'
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PaymentPage;