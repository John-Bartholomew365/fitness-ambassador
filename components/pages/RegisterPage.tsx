// 'use client';

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import Link from 'next/link';
// import VestSelectionModal from './Vest/VestSelectionModal';

// interface Vest {
//   id: number;
//   type: string;
//   color: string;
//   colorName: string;
//   price: string;
//   image: string;
//   size?: string;
// }

// const RegisterPage = () => {
//   const [selectedVest, setSelectedVest] = useState<Vest | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Vest options data - only blue and green
//   const vestOptions = [
//     {
//       id: 1,
//       type: 'Hoodie',
//       color: '#4E5839',
//       colorName: 'Forest Green',
//       price: '₦12,000',
//       image: '/green-hoodie.png'
//     },
//     {
//       id: 2,
//       type: 'Hoodie',
//       color: '#19253E',
//       colorName: 'Royal Blue',
//       price: '₦12,000',
//       image: '/blue-hoodie.png'
//     },
//     {
//       id: 3,
//       type: 'T-Shirt',
//       color: '#4E5839',
//       colorName: 'Forest Green',
//       price: '₦10,000',
//       image: '/green-shirt.png'
//     },
//     {
//       id: 4,
//       type: 'T-Shirt',
//       color: '#19253E',
//       colorName: 'Royal Blue',
//       price: '₦10,000',
//       image: '/blue-tshirt.png'
//     },
//     {
//       id: 5,
//       type: 'Armless Vest',
//       color: '#4E5839',
//       colorName: 'Forest Green',
//       price: '₦10,000',
//       image: '/green-armless.jpeg'
//     },
//     {
//       id: 6,
//       type: 'Armless Vest',
//       color: '#19253E',
//       colorName: 'Royal Blue',
//       price: '₦10,000',
//       image: '/blue-arm.jpeg'
//     }
//   ];

//   // Group vests by type for better organization
//   const hoodies = vestOptions.filter(item => item.type === 'Hoodie');
//   const tshirts = vestOptions.filter(item => item.type === 'T-Shirt');
//   const armlessVests = vestOptions.filter(item => item.type === 'Armless Vest');

//   const handleVestSelect = (vest: Vest) => {
//     setSelectedVest(vest);
//     setIsModalOpen(true);
//   };

//   const handleSizeSelect = (size: string) => {
//     // Save selection and redirect to bio data page
//     if (selectedVest) {
//       localStorage.setItem('selectedVest', JSON.stringify({
//         ...selectedVest,
//         size: size
//       }));
//     }
//     window.location.href = '/register/bio-data';
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="lg:flex block items-center justify-between">
//             <Link href="/">
//               <div className="flex items-center gap-2 cursor-pointer">
//                 <div className="w-8 h-8 rounded-full bg-[#ff8a00]" />
//                 <span className="text-xl font-bold text-gray-900">Walk2Fitness</span>
//               </div>
//             </Link>
//             <div className="flex items-center gap-4 lg:mt-0 mt-5">
//               <span className="text-sm text-gray-600">Step 1 of 3</span>
//               <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
//                 <div className="w-1/3 h-full bg-[#008020]" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-6xl mx-auto px-4 py-12">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-[36px] lg:text-5xl font-bold text-gray-900 mb-4">
//             Choose Your <span className="text-[#ff8a00]">Walk2Fitness 5.0</span> Vest
//           </h1>
//           <p className="text-gray-600 text-[16px]">
//             Select your preferred vest style and color. <br /> All vests come with official event branding.
//           </p>
//         </motion.div>

//         {/* Selected Vest Preview */}
//         {selectedVest && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mb-12 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto"
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
//                   <Image
//                     src={selectedVest.image}
//                     alt={selectedVest.colorName}
//                     fill
//                     className="object-contain"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-gray-900">{selectedVest.type} - {selectedVest.colorName}</h3>
//                   <p className="text-gray-600">{selectedVest.price}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="px-6 py-2 bg-[#008020] text-white font-semibold rounded-lg hover:bg-[#006a1a] transition-colors"
//               >
//                 Choose Size
//               </button>
//             </div>
//           </motion.div>
//         )}

//         {/* Vest Categories */}
//         <div className="space-y-20">
//           {/* Hoodies Section */}
//           <section>
//             <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//               Premium <span className="text-[#ff8a00]">Hoodies</span>
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//               {hoodies.map((hoodie, index) => (
//                 <motion.div
//                   key={hoodie.id}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className={`bg-white rounded-2xl border-2 ${selectedVest?.id === hoodie.id ? 'border-[#008020] ring-2 ring-[#008020]/20' : 'border-gray-100'} overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer`}
//                   onClick={() => handleVestSelect(hoodie)}
//                 >
//                   <div className="relative h-64 bg-gray-50">
//                     <Image
//                       src={hoodie.image}
//                       alt={hoodie.colorName}
//                       fill
//                       className="object-contain"
//                     />
//                   </div>
//                   <div className="p-6">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="font-bold text-gray-900 text-lg">{hoodie.type}</h3>
//                         <div className="flex items-center gap-2 mt-1">
//                           <div 
//                             className="w-5 h-5 rounded-full border border-gray-300"
//                             style={{ backgroundColor: hoodie.color }}
//                           />
//                           <span className="text-gray-600">{hoodie.colorName}</span>
//                         </div>
//                       </div>
//                       <div className="text-2xl font-bold text-[#ff8a00]">{hoodie.price}</div>
//                     </div>
//                     <div className="mt-6">
//                       <button className="w-full cursor-pointer py-3 bg-[#008020] text-white font-semibold rounded-xl hover:bg-[#006a1a] transition-colors">
//                         {selectedVest?.id === hoodie.id ? 'Selected ✓' : 'Select This Vest'}
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </section>

//           {/* T-Shirts Section */}
//           <section>
//             <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//               Classic <span className="text-[#008020]">T-Shirts</span>
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//               {tshirts.map((tshirt, index) => (
//                 <motion.div
//                   key={tshirt.id}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className={`bg-white rounded-2xl border-2 ${selectedVest?.id === tshirt.id ? 'border-[#008020] ring-2 ring-[#008020]/20' : 'border-gray-100'} overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer`}
//                   onClick={() => handleVestSelect(tshirt)}
//                 >
//                   <div className="relative h-64 bg-gray-50">
//                     <Image
//                       src={tshirt.image}
//                       alt={tshirt.colorName}
//                       fill
//                       className="object-contain"
//                     />
//                   </div>
//                   <div className="p-6">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="font-bold text-gray-900 text-lg">{tshirt.type}</h3>
//                         <div className="flex items-center gap-2 mt-1">
//                           <div 
//                             className="w-5 h-5 rounded-full border border-gray-300"
//                             style={{ backgroundColor: tshirt.color }}
//                           />
//                           <span className="text-gray-600">{tshirt.colorName}</span>
//                         </div>
//                       </div>
//                       <div className="text-2xl font-bold text-[#ff8a00]">{tshirt.price}</div>
//                     </div>
//                     <div className="mt-6">
//                       <button className="w-full py-3 cursor-pointer bg-[#008020] text-white font-semibold rounded-xl hover:bg-[#006a1a] transition-colors">
//                         {selectedVest?.id === tshirt.id ? 'Selected ✓' : 'Select This Vest'}
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </section>

//           {/* Armless Vests Section */}
//           <section>
//             <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//               Performance <span className="text-[#ff8a00]">Armless Vests</span>
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//               {armlessVests.map((vest, index) => (
//                 <motion.div
//                   key={vest.id}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className={`bg-white rounded-2xl border-2 ${selectedVest?.id === vest.id ? 'border-[#008020] ring-2 ring-[#008020]/20' : 'border-gray-100'} overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer`}
//                   onClick={() => handleVestSelect(vest)}
//                 >
//                   <div className="relative h-64 bg-gray-50">
//                     <Image
//                       src={vest.image}
//                       alt={vest.colorName}
//                       fill
//                       className="object-contain"
//                     />
//                   </div>
//                   <div className="p-6">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="font-bold text-gray-900 text-lg">{vest.type}</h3>
//                         <div className="flex items-center gap-2 mt-1">
//                           <div 
//                             className="w-5 h-5 rounded-full border border-gray-300"
//                             style={{ backgroundColor: vest.color }}
//                           />
//                           <span className="text-gray-600">{vest.colorName}</span>
//                         </div>
//                       </div>
//                       <div className="text-2xl font-bold text-[#ff8a00]">{vest.price}</div>
//                     </div>
//                     <div className="mt-6">
//                       <button className="w-full py-3 cursor-pointer bg-[#008020] text-white font-semibold rounded-xl hover:bg-[#006a1a] transition-colors">
//                         {selectedVest?.id === vest.id ? 'Selected ✓' : 'Select This Vest'}
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </section>
//         </div>

//         {/* Continue Button */}
//         {selectedVest && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mt-12 text-center"
//           >
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="px-12 py-4 bg-[#ff8a00] text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:shadow-[#ff8a00]/25 transition-all duration-300 transform hover:scale-105"
//             >
//               Choose Size & Continue
//             </button>
//             <p className="text-gray-500 mt-4">
//               You&apos;ve selected: <span className="font-semibold text-gray-700">{selectedVest.colorName} {selectedVest.type}</span>
//             </p>
//           </motion.div>
//         )}

//         {/* Back to Vest Page */}
//         <div className="mt-12 text-center">
//           <Link href="/events/vest">
//             <button className="px-8 py-3 cursor-pointer border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 transition-colors">
//               ← Back to Vest Details
//             </button>
//           </Link>
//         </div>
//       </main>

//       {/* Size Selection Modal */}
//       {isModalOpen && selectedVest && (
//         <VestSelectionModal
//           vest={selectedVest}
//           onClose={() => setIsModalOpen(false)}
//           onSizeSelect={handleSizeSelect}
//         />
//       )}
//     </div>
//   );
// };

// export default RegisterPage;






'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaTshirt, FaCheckCircle, FaRegHeart, FaQuestionCircle } from 'react-icons/fa';

const RegisterPage = () => {
  const contactNumbers = [
    { number: '07060922644', name: 'Registration Officer 1' },
    { number: '09010899228', name: 'Registration Officer 2' },
    { number: '08163702286', name: 'Registration Officer 3' }
  ];

  const vestOptions = [
    {
      id: 1,
      type: 'Premium Hoodie',
      color: 'Forest Green',
      colorCode: '#4E5839',
      price: '₦12,000',
      image: '/green-hoodie.png', 
      description: 'Warm, comfortable hoodie perfect for early morning walks'
    },
    {
      id: 2,
      type: 'Premium Hoodie',
      color: 'Royal Blue',
      colorCode: '#19253E',
      price: '₦12,000',
      image: '/blue-hoodie.png',
      description: 'Classic blue hoodie with event branding'
    },
    {
      id: 3,
      type: 'Classic T-Shirt',
      color: 'Forest Green',
      colorCode: '#4E5839',
      price: '₦10,000',
      image: '/green-shirt.png', 
      description: 'Lightweight, breathable t-shirt'
    },
    {
      id: 4,
      type: 'Classic T-Shirt',
      color: 'Royal Blue',
      colorCode: '#19253E',
      price: '₦10,000',
      image: '/blue-tshirt.png', 
      description: 'Comfortable cotton t-shirt'
    },
    {
      id: 5,
      type: 'Armless Vest',
      color: 'Forest Green',
      colorCode: '#4E5839',
      price: '₦10,000',
      image: '/green-armless.jpeg', 
      description: 'Perfect for warm weather walking'
    },
    {
      id: 6,
      type: 'Armless Vest',
      color: 'Royal Blue',
      colorCode: '#19253E',
      price: '₦10,000',
      image: '/blue-arm.jpeg',
      description: 'Performance armless vest'
    }
  ];

  const generateWhatsAppMessage = (vestType = '', vestColor = '') => {
    const message = `Hello Walk2Fitness Team! 👟\n\nI'd like to register for Walk2Fitness 5.0!\n\nI'm interested in:\n${vestType ? `✅ Vest: ${vestType} - ${vestColor}` : '✅ Vest selection help'}\n✅ Size guidance\n✅ Payment details\n\nMy details:\n👤 Name: ________\n📧 Email: ________\n📱 Phone: ________\n📏 Preferred Size: [S/M/L/XL/XXL]\n\nPlease assist me with registration!`;
    return encodeURIComponent(message);
  };

  interface WhatsAppLinkParams {
    number: string;
    vestType?: string;
    vestColor?: string;
  }

  const getWhatsAppLink = ({ number, vestType = '', vestColor = '' }: WhatsAppLinkParams): string => {
    const message = generateWhatsAppMessage(vestType, vestColor);
    return `https://wa.me/234${number.slice(1)}?text=${message}`;
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="lg:flex block items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-[#ff8a00] to-[#ff5500] group-hover:scale-110 transition-transform" />
                <span className="text-xl font-bold text-gray-900">Walk2Fitness</span>
              </div>
            </Link>
            <div className="px-4 py-2 bg-green-50 rounded-full lg:mt-0 mt-5 w-fit">
              <span className="text-sm font-medium text-green-700">🎯 Registration Assistance</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Choose Your Perfect Walk2Fitness 5.0 Vest
          </h1>
          <p className="text-gray-600 text-[16px] max-w-2xl mx-auto">
            Select your favorite vest below, then contact our team via WhatsApp to complete your registration
          </p>
        </motion.div>

        {/* Vest Selection Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Browse Vest Options</h2>
              <p className="text-gray-600 mt-1">Tap on your favorite to select it</p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#ff8a00]/10 to-[#008020]/10 rounded-full">
              <FaRegHeart className="w-4 h-4 text-[#ff8a00]" />
              <span className="text-sm font-medium text-gray-700">Select & Contact</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vestOptions.map((vest) => (
              <div
                key={vest.id}
                className="group bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:border-[#008020] hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => window.open(getWhatsAppLink({ number: contactNumbers[0].number, vestType: vest.type, vestColor: vest.color }), '_blank')}
              >
                {/* Vest Image */}
                <div className="relative h-64 bg-linear-to-b from-gray-50 to-white">
                  {/* Try to load actual image */}
                  <div className="relative w-full h-full">
                    <div 
                      className="absolute inset-0"
                      style={{
                        backgroundColor: vest.color.includes('Green') ? '#4E583905' : '#19253E05'
                      }}
                    />
                    
                    {/* Actual Image Display */}
                    <div className="relative h-full flex items-center justify-center p-4">
                      <div className="relative w-48 h-48">
                        {/* First, try to show the actual image */}
                        <div className="relative w-full h-full">
                          <div className="absolute inset-0 flex items-center justify-center">
                            {/* Using a try-catch approach for images */}
                            <div className="relative w-full h-full">
                              <Image
                                src={vest.image}
                                alt={`${vest.color} ${vest.type}`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              
                              {/* Fallback overlay in case image fails to load */}
                              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity">
                                <div 
                                  className="absolute inset-0 rounded-lg border-2 border-dashed flex flex-col items-center justify-center"
                                  style={{
                                    borderColor: vest.colorCode + '40',
                                    backgroundColor: vest.colorCode + '10'
                                  }}
                                >
                                  <FaTshirt 
                                    className="w-12 h-12 mb-2 opacity-70" 
                                    style={{ color: vest.colorCode }}
                                  />
                                  <div 
                                    className="px-2 py-1 rounded text-xs font-bold text-white"
                                    style={{ backgroundColor: vest.colorCode }}
                                  >
                                    {vest.type}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md"
                      style={{
                        backgroundColor: vest.colorCode
                      }}
                    >
                      {vest.type.includes('Hoodie') ? 'Premium' : vest.type.includes('T-Shirt') ? 'Classic' : 'Performance'}
                    </div>
                  </div>
                </div>
                
                {/* Vest Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{vest.type}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                          style={{ backgroundColor: vest.colorCode }}
                        />
                        <span className="text-gray-700 font-medium">{vest.color}</span>
                      </div>
                    </div>
                    <span className="text-xl font-bold text-[#ff8a00]">{vest.price}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{vest.description}</p>
                  
                  {/* Action Button */}
                  <button className="w-full py-3 bg-linear-to-r from-[#008020] to-green-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 group-hover:from-green-600 group-hover:to-[#008020]">
                    <div className="flex items-center justify-center gap-2 cursor-pointer">
                      <FaWhatsapp className="w-4 h-4" />
                      <span>Select & Contact via WhatsApp</span>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-linear-to-br from-white to-gray-50 rounded-3xl shadow-2xl border border-gray-100 p-5 lg:p-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-green-100 to-green-50 flex items-center justify-center">
                    <FaWhatsapp className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Need Help Choosing?</h3>
                    <p className="text-gray-600 mt-1">Our team is ready to assist you</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                      <FaCheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <p className="text-gray-700">Get personalized recommendations for your body type</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                      <FaCheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <p className="text-gray-700">Receive size guidance and fit advice</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                      <FaCheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <p className="text-gray-700">Complete registration with secure payment options</p>
                  </div>
                </div>
              </div>
              
              <div className="shrink-0 w-full lg:w-auto">
                <a
                  href={getWhatsAppLink({ number: contactNumbers[0].number })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-4 px-8 py-4 bg-linear-to-r from-green-600 to-green-700 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1 w-full lg:w-auto"
                >
                  <FaWhatsapp className="w-6 h-6" />
                  <span className="text-lg">Start General Inquiry</span>
                  {/* <FaArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" /> */}
                </a>
                <p className="text-gray-500 text-sm text-center mt-3">
                  General questions about registration
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Alternative Contact Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Or Contact Any Officer Directly</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactNumbers.map((contact, index) => (
              <a
                key={index}
                href={getWhatsAppLink({ number: contact.number })}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-green-500 hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-linear-to-r from-green-100 to-green-50 flex items-center justify-center group-hover:from-green-500 group-hover:to-green-600 transition-colors">
                      <FaWhatsapp className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{contact.name}</p>
                    <p className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      {contact.number}
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Click to chat on WhatsApp</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                      Available
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Information Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-linear-to-r from-[#ff8a00]/10 to-[#008020]/10 rounded-2xl border border-[#ff8a00]/20 lg:p-6 p-4 mb-8"
        >
          <div className="lg:flex block items-start gap-4">
            <div className="shrink-0">
              <div className="w-10 h-10 rounded-full bg-linear-to-r from-[#ff8a00] to-[#008020] flex items-center justify-center">
                <FaQuestionCircle className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2 lg:text-[16px] text-[22px] lg:mt-0 mt-4">How to Register:</h4>
              <ol className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#ff8a00]">1.</span>
                  <span>Browse the vest options above and decide which one you like</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#ff8a00]">2.</span>
                  <span>Click on your preferred vest or use any contact button</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#ff8a00]">3.</span>
                  <span>Our team will guide you through size selection and payment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#ff8a00]">4.</span>
                  <span>Receive confirmation and prepare for the walk!</span>
                </li>
              </ol>
            </div>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <Link href="/">
            <button className="group inline-flex items-center gap-3 px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 hover:shadow-lg transition-all lg:w-auto w-full justify-center cursor-pointer">
              ← Return to Homepage
            </button>
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 pb-12 pt-8 border-t border-gray-200">
        <div className="text-center">
          <p className="text-gray-500 text-sm italic">
            Get ready to walk your way to fitness!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RegisterPage;