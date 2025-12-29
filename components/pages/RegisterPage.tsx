'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import VestSelectionModal from './Vest/VestSelectionModal';

interface Vest {
  id: number;
  type: string;
  color: string;
  colorName: string;
  price: string;
  image: string;
  size?: string;
}

const RegisterPage = () => {
  const [selectedVest, setSelectedVest] = useState<Vest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Vest options data - only blue and green
  const vestOptions = [
    {
      id: 1,
      type: 'Hoodie',
      color: '#008020',
      colorName: 'Forest Green',
      price: '₦12,000',
      image: '/green-hoodie.png'
    },
    {
      id: 2,
      type: 'Hoodie',
      color: '#1e40af',
      colorName: 'Royal Blue',
      price: '₦12,000',
      image: '/blue-hoodie.png'
    },
    {
      id: 3,
      type: 'T-Shirt',
      color: '#008020',
      colorName: 'Forest Green',
      price: '₦10,000',
      image: '/green-shirt.png'
    },
    {
      id: 4,
      type: 'T-Shirt',
      color: '#1e40af',
      colorName: 'Royal Blue',
      price: '₦10,000',
      image: '/blue-tshirt.png'
    },
    {
      id: 5,
      type: 'Armless Vest',
      color: '#008020',
      colorName: 'Forest Green',
      price: '₦10,000',
      image: '/green-armless.jpeg'
    },
    {
      id: 6,
      type: 'Armless Vest',
      color: '#1e40af',
      colorName: 'Royal Blue',
      price: '₦10,000',
      image: '/blue-arm.jpeg'
    }
  ];

  // Group vests by type for better organization
  const hoodies = vestOptions.filter(item => item.type === 'Hoodie');
  const tshirts = vestOptions.filter(item => item.type === 'T-Shirt');
  const armlessVests = vestOptions.filter(item => item.type === 'Armless Vest');

  const handleVestSelect = (vest: Vest) => {
    setSelectedVest(vest);
    setIsModalOpen(true);
  };

  const handleSizeSelect = (size: string) => {
    // Save selection and redirect to bio data page
    if (selectedVest) {
      localStorage.setItem('selectedVest', JSON.stringify({
        ...selectedVest,
        size: size
      }));
    }
    window.location.href = '/register/bio-data';
  };

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
              <span className="text-sm text-gray-600">Step 1 of 3</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-[#008020]" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-[36px] lg:text-5xl font-bold text-gray-900 mb-4">
            Choose Your <span className="text-[#ff8a00]">Walk2Fitness 5.0</span> Vest
          </h1>
          <p className="text-gray-600 text-[16px]">
            Select your preferred vest style and color. <br /> All vests come with official event branding.
          </p>
        </motion.div>

        {/* Selected Vest Preview */}
        {selectedVest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={selectedVest.image}
                    alt={selectedVest.colorName}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{selectedVest.type} - {selectedVest.colorName}</h3>
                  <p className="text-gray-600">{selectedVest.price}</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2 bg-[#008020] text-white font-semibold rounded-lg hover:bg-[#006a1a] transition-colors"
              >
                Choose Size
              </button>
            </div>
          </motion.div>
        )}

        {/* Vest Categories */}
        <div className="space-y-20">
          {/* Hoodies Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Premium <span className="text-[#ff8a00]">Hoodies</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {hoodies.map((hoodie, index) => (
                <motion.div
                  key={hoodie.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl border-2 ${selectedVest?.id === hoodie.id ? 'border-[#008020] ring-2 ring-[#008020]/20' : 'border-gray-100'} overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer`}
                  onClick={() => handleVestSelect(hoodie)}
                >
                  <div className="relative h-64 bg-gray-50">
                    <Image
                      src={hoodie.image}
                      alt={hoodie.colorName}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{hoodie.type}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div 
                            className="w-5 h-5 rounded-full border border-gray-300"
                            style={{ backgroundColor: hoodie.color }}
                          />
                          <span className="text-gray-600">{hoodie.colorName}</span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-[#ff8a00]">{hoodie.price}</div>
                    </div>
                    <div className="mt-6">
                      <button className="w-full cursor-pointer py-3 bg-[#008020] text-white font-semibold rounded-xl hover:bg-[#006a1a] transition-colors">
                        {selectedVest?.id === hoodie.id ? 'Selected ✓' : 'Select This Vest'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* T-Shirts Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Classic <span className="text-[#008020]">T-Shirts</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {tshirts.map((tshirt, index) => (
                <motion.div
                  key={tshirt.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl border-2 ${selectedVest?.id === tshirt.id ? 'border-[#008020] ring-2 ring-[#008020]/20' : 'border-gray-100'} overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer`}
                  onClick={() => handleVestSelect(tshirt)}
                >
                  <div className="relative h-64 bg-gray-50">
                    <Image
                      src={tshirt.image}
                      alt={tshirt.colorName}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{tshirt.type}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div 
                            className="w-5 h-5 rounded-full border border-gray-300"
                            style={{ backgroundColor: tshirt.color }}
                          />
                          <span className="text-gray-600">{tshirt.colorName}</span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-[#ff8a00]">{tshirt.price}</div>
                    </div>
                    <div className="mt-6">
                      <button className="w-full py-3 cursor-pointer bg-[#008020] text-white font-semibold rounded-xl hover:bg-[#006a1a] transition-colors">
                        {selectedVest?.id === tshirt.id ? 'Selected ✓' : 'Select This Vest'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Armless Vests Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Performance <span className="text-[#ff8a00]">Armless Vests</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {armlessVests.map((vest, index) => (
                <motion.div
                  key={vest.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl border-2 ${selectedVest?.id === vest.id ? 'border-[#008020] ring-2 ring-[#008020]/20' : 'border-gray-100'} overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer`}
                  onClick={() => handleVestSelect(vest)}
                >
                  <div className="relative h-64 bg-gray-50">
                    <Image
                      src={vest.image}
                      alt={vest.colorName}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{vest.type}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div 
                            className="w-5 h-5 rounded-full border border-gray-300"
                            style={{ backgroundColor: vest.color }}
                          />
                          <span className="text-gray-600">{vest.colorName}</span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-[#ff8a00]">{vest.price}</div>
                    </div>
                    <div className="mt-6">
                      <button className="w-full py-3 cursor-pointer bg-[#008020] text-white font-semibold rounded-xl hover:bg-[#006a1a] transition-colors">
                        {selectedVest?.id === vest.id ? 'Selected ✓' : 'Select This Vest'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Continue Button */}
        {selectedVest && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-12 py-4 bg-[#ff8a00] text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:shadow-[#ff8a00]/25 transition-all duration-300 transform hover:scale-105"
            >
              Choose Size & Continue
            </button>
            <p className="text-gray-500 mt-4">
              You&apos;ve selected: <span className="font-semibold text-gray-700">{selectedVest.colorName} {selectedVest.type}</span>
            </p>
          </motion.div>
        )}

        {/* Back to Vest Page */}
        <div className="mt-12 text-center">
          <Link href="/events/vest">
            <button className="px-8 py-3 cursor-pointer border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 transition-colors">
              ← Back to Vest Details
            </button>
          </Link>
        </div>
      </main>

      {/* Size Selection Modal */}
      {isModalOpen && selectedVest && (
        <VestSelectionModal
          vest={selectedVest}
          onClose={() => setIsModalOpen(false)}
          onSizeSelect={handleSizeSelect}
        />
      )}
    </div>
  );
};

export default RegisterPage;