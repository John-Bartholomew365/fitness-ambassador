'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Vest {
  type: string;
  image: string;
  colorName: string;
  color: string;
  price: string;
}

interface VestSelectionModalProps {
  vest: Vest;
  onClose: () => void;
  onSizeSelect: (size: string) => void;
  isSubmitting: boolean;
}

const VestSelectionModal: React.FC<VestSelectionModalProps> = ({ 
  vest, 
  onClose, 
  onSizeSelect,
  isSubmitting 
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleContinue = () => {
    if (selectedSize) {
      onSizeSelect(selectedSize);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Select Your Size</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-gray-600 mt-2">Choose the perfect fit for your {vest.type}</p>
        </div>

        {/* Vest Preview */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="relative w-20 h-20 bg-white rounded-lg overflow-hidden">
              <Image
                src={vest.image}
                alt={vest.colorName}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{vest.type}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div 
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: vest.color }}
                />
                <span className="text-gray-600">{vest.colorName}</span>
              </div>
              <div className="text-lg font-bold text-[#ff8a00] mt-1">{vest.price}</div>
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Available Sizes</h3>
            <div className="grid grid-cols-3 gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={isSubmitting}
                  className={`py-3 cursor-pointer rounded-lg font-medium transition-all ${selectedSize === size ? 'bg-[#008020] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Size Guide */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Size Guide
            </h4>
            <p className="text-sm text-gray-600">
              Our vests are true to size. If you&apos;re between sizes, we recommend choosing the larger size for a more comfortable fit.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleContinue}
              disabled={!selectedSize || isSubmitting}
              className={`flex-1 py-3 text-[14px] font-semibold cursor-pointer rounded-xl transition-all ${selectedSize && !isSubmitting ? 'bg-[#ff8a00] text-white hover:bg-[#e67a00]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                `Continue with ${selectedSize ? `Size ${selectedSize}` : 'Size'}`
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VestSelectionModal;