// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';

// // Define training plans with proper backend plan values
// const trainingPackages = [
//   {
//     title: 'Basic Training Plan',
//     backendValue: 'basic', // Changed for backend
//     price: '₦60,000/month',
//     originalPrice: '₦70,000',
//     discount: '20% OFF',
//     sessions: '3 personal training sessions per week',
//     features: [
//       'Personalized workout plan tailored to your fitness goals',
//       'Weekly fitness check-in & progress tracking',
//       'Trainer\'s guidance during sessions',
//       'Gym or Outdoor option available',
//       'Basic nutritional guidance'
//     ],
//     popular: false,
//     color: '#008020',
//     videoPreview: '/training1.mp4'
//   },
//   {
//     title: 'Standard Training Plan',
//     backendValue: 'standard', // Changed for backend
//     price: '₦70,000/month',
//     originalPrice: '₦85,000',
//     discount: '23% OFF',
//     sessions: '3 personal training sessions per week',
//     features: [
//       'Everything in Basic Plan +',
//       'Customized workout + nutrition plan',
//       'Monthly body measurements & progress photos',
//       'WhatsApp support for exercise questions',
//       'Access to monthly fitness workshops'
//     ],
//     popular: true,
//     color: '#ff8a00',
//     videoPreview: '/training2.mp4'
//   },
//   {
//     title: 'Premium Training Plan',
//     backendValue: 'premium', // Changed for backend
//     price: '₦80,000/month',
//     originalPrice: '₦100,000',
//     discount: '25% OFF',
//     sessions: '4 personal training sessions per week',
//     features: [
//       'Everything in Standard Plan +',
//       'Fully customized workout + nutrition plan adjusted weekly',
//       'Full 1-on-1 coaching with daily accountability check-ins',
//       'Priority access for feedback & support',
//       'Fast-tracked results with higher accountability',
//       'Personalized recovery & mobility sessions'
//     ],
//     popular: false,
//     color: '#008020',
//     videoPreview: '/training3.mp4'
//   }
// ];

// interface BookingFormData {
//   fullName: string;
//   email: string;
//   phoneNumber: string;
//   experienceLevel: string; // Should be "beginner", "intermediate", or "advanced"
//   plan: string; // Should be "basic", "standard", or "premium"
//   fitnessGoal: string;
// }

// interface BookingResponse {
//   statusCode: string;
//   message: string;
//   data?: {
//     bookingId: string;
//     fullName: string;
//     email: string;
//     plan: string;
//   };
// }

// const Training = () => {
//   const [formData, setFormData] = useState<BookingFormData>({
//     fullName: '',
//     email: '',
//     phoneNumber: '',
//     experienceLevel: '',
//     plan: '',
//     fitnessGoal: ''
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState('Standard Training Plan');
//   const [selectedPlanBackendValue, setSelectedPlanBackendValue] = useState('standard');
//   const [playingVideos, setPlayingVideos] = useState<number[]>([]);
//   const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

//   // Initialize form with selected plan
//   useEffect(() => {
//     const selectedPackage = trainingPackages.find(pkg => pkg.title === selectedPlan);
//     const backendValue = selectedPackage?.backendValue || 'standard';

//     setSelectedPlanBackendValue(backendValue);
//     setFormData(prev => ({
//       ...prev,
//       plan: backendValue
//     }));
//   }, [selectedPlan]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate form
//     if (!isFormValid()) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     // Validate experience level
//     const validExperienceLevels = ['beginner', 'intermediate', 'advanced'];
//     if (!validExperienceLevels.includes(formData.experienceLevel.toLowerCase())) {
//       toast.error('Please select a valid experience level: Beginner, Intermediate, or Advanced');
//       return;
//     }

//     // Validate plan
//     const validPlans = ['basic', 'standard', 'premium'];
//     if (!validPlans.includes(formData.plan.toLowerCase())) {
//       toast.error('Please select a valid training plan');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Show loading toast
//       const loadingToast = toast.loading('Submitting your booking request...');

//       // Prepare booking data according to API requirements
//       const bookingData = {
//         fullName: formData.fullName.trim(),
//         email: formData.email.trim(),
//         phoneNumber: formData.phoneNumber.trim(),
//         experienceLevel: formData.experienceLevel.toLowerCase(), // Ensure lowercase
//         plan: formData.plan.toLowerCase(), // Ensure lowercase
//         fitnessGoal: formData.fitnessGoal.trim()
//       };

//       // Submit to API
//       const response = await fetch('/api/training-booking', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData),
//       });

//       const result: BookingResponse = await response.json();
//       if (!response.ok) {
//         // Dismiss loading toast and show error
//         toast.dismiss(loadingToast);
//         toast.error(result.message || 'Failed to submit booking request');
//         throw new Error(result.message || 'Failed to submit booking');
//       }

//       // Check if booking was successful
//       if (result.statusCode === '00' || result.message?.includes('success')) {
//         // Dismiss loading toast and show success
//         toast.dismiss(loadingToast);
//         toast.success('Booking request sent successfully! We\'ll contact you within 24 hours.');

//         // Reset form
//         setFormData({ 
//           fullName: '', 
//           email: '', 
//           phoneNumber: '', 
//           experienceLevel: '', 
//           plan: selectedPlanBackendValue, 
//           fitnessGoal: '' 
//         });
//       } else {
//         throw new Error(result.message || 'Booking submission failed');
//       }

//     } catch (error) {
//       console.error('Error submitting booking:', error);
//       toast.error(
//         error instanceof Error ? error.message : 'An unexpected error occurred'
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const isFormValid = () => {
//     const requiredFields = ['fullName', 'email', 'phoneNumber', 'experienceLevel', 'plan', 'fitnessGoal'];
//     return requiredFields.every(field => {
//       const value = formData[field as keyof BookingFormData];
//       return typeof value === 'string' && value.trim() !== '';
//     });
//   };

//   const handleVideoHover = (index: number) => {
//     const video = videoRefs.current[index];
//     if (video && window.innerWidth >= 1024) { // Only auto-play on desktop
//       video.play().catch(e => console.log('Autoplay prevented:', e));
//     }
//   };

//   const handleVideoLeave = (index: number) => {
//     const video = videoRefs.current[index];
//     if (video && window.innerWidth >= 1024) { // Only auto-play on desktop
//       video.pause();
//       video.currentTime = 0;
//     }
//   };

//   const toggleVideoPlay = (index: number) => {
//     const video = videoRefs.current[index];
//     if (!video) return;

//     if (video.paused) {
//       video.play();
//       setPlayingVideos(prev => [...prev, index]);
//     } else {
//       video.pause();
//       video.currentTime = 0;
//       setPlayingVideos(prev => prev.filter(i => i !== index));
//     }
//   };

//   const handleFormChange = (field: keyof BookingFormData, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handlePlanSelect = (planTitle: string, backendValue: string) => {
//     setSelectedPlan(planTitle);
//     setSelectedPlanBackendValue(backendValue);
//     setFormData(prev => ({ ...prev, plan: backendValue }));
//     document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <section className="relative py-24 md:py-32 px-4 md:px-8 bg-linear-to-b from-white to-gray-50">
//         <div className="max-w-7xl mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#008020]/10 mb-8"
//           >
//             <div className="flex gap-1.5">
//               <div className="w-2 h-2 rounded-full bg-[#008020]" />
//               <div className="w-2 h-2 rounded-full bg-[#ffde00]" />
//               <div className="w-2 h-2 rounded-full bg-[#ff8a00]" />
//             </div>
//             <span className="text-[#008020] font-semibold text-sm tracking-wider">
//               PERSONAL TRAINING
//             </span>
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-[35px] md:text-[44px] lg:text-[56px] font-black text-gray-900 mb-6 leading-none"
//           >
//             Train Smart. Stay Consistent.
//             <span className="block text-[#ff8a00] mt-4">Become Unstoppable!</span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="text-gray-700 text-[16px] lg:text-[18px] lg:w-[600px] mx-auto leading-normal mb-10"
//           >
//             Transform your body with personalized training programs designed by a certified fitness coach 
//             with 7+ years of experience. Achieve your fitness goals with expert guidance and proven methods.
//           </motion.p>
//         </div>
//       </section>

//       {/* Training Packages Section */}
//       <section className="py-20 md:py-32 px-4 md:px-8 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-[30px] lg:text-[40px] font-bold text-gray-900 mb-2">
//               Choose Your <span className="text-[#ff8a00]">Training Plan</span>
//             </h2>
//             <p className="text-gray-700 lg:w-[400px] w-auto mx-auto">
//               Select the perfect plan for your fitness journey
//             </p>
//           </motion.div>

//           {/* Packages Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {trainingPackages.map((plan, index) => (
//               <motion.div
//                 key={plan.title}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className={`relative rounded-3xl border-2 hover:shadow-2xl transition-all duration-300 ${plan.popular ? 'border-[#ff8a00] shadow-xl' : 'border-gray-200'}`}
//               >
//                 {/* Most Popular Badge */}
//                 {plan.popular && (
//                   <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
//                     <div className="bg-[#ff8a00] text-white px-5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap">
//                       MOST POPULAR
//                     </div>
//                   </div>
//                 )}

//                 {/* Discount Badge - Positioned better */}
//                 <div className="absolute -top-2 -right-2 z-10">
//                   <div className="bg-[#008020] text-white px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold shadow-lg">
//                     {plan.discount}
//                   </div>
//                 </div>

//                 {/* Video Preview */}
//                 <div 
//                   className="relative h-36 md:h-40 overflow-hidden rounded-t-3xl group"
//                   onMouseEnter={() => handleVideoHover(index)}
//                   onMouseLeave={() => handleVideoLeave(index)}
//                   onClick={() => toggleVideoPlay(index)}
//                 >
//                   <video
//                     ref={el => { if (el) videoRefs.current[index] = el; }}
//                     className="w-full h-full object-cover"
//                     muted
//                     loop
//                     playsInline
//                     preload="metadata"
//                   >
//                     <source src={plan.videoPreview} type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>

//                   {/* Overlay with instructions */}
//                   <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
//                     <div className="text-center p-4">
//                       <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-2">
//                         <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
//                           <div className={`w-0 h-0 border-t-4 border-b-4 border-l-6 ${playingVideos.includes(index) ? 'border-t-transparent border-b-transparent border-l-transparent' : 'border-t-transparent border-b-transparent border-l-white'}`} />
//                         </div>
//                       </div>
//                       <div className="text-white text-sm font-medium">
//                         <span className="lg:hidden">Tap to {playingVideos.includes(index) ? 'pause' : 'play'}</span>
//                         <span className="hidden lg:inline">Hover to preview</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Play/Pause indicator */}
//                   {playingVideos.includes(index) && (
//                     <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
//                       Playing
//                     </div>
//                   )}
//                 </div>

//                 <div className="p-6 md:p-8">
//                   {/* Package Header */}
//                   <div className="mb-6">
//                     <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{plan.title}</h3>
//                     <div className="flex flex-wrap items-baseline gap-2">
//                       <div className="text-2xl md:text-3xl font-bold" style={{ color: plan.color }}>
//                         {plan.price}
//                       </div>
//                       <div className="text-xs md:text-sm text-gray-500 line-through">{plan.originalPrice}</div>
//                     </div>
//                   </div>

//                   {/* Sessions */}
//                   <div className="mb-6 p-3 md:p-4 bg-gray-50 rounded-xl">
//                     <div className="text-xs md:text-sm font-semibold text-gray-900 mb-1">Training Sessions</div>
//                     <div className="text-sm md:text-base text-gray-700 font-medium">{plan.sessions}</div>
//                   </div>

//                   {/* Features List */}
//                   <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
//                     {plan.features.map((feature, featureIndex) => (
//                       <div key={featureIndex} className="flex items-start gap-2 md:gap-3">
//                         <div className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center mt-0.5 shrink-0"
//                           style={{ backgroundColor: plan.color + '20' }}>
//                           <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" style={{ backgroundColor: plan.color }} />
//                         </div>
//                         <span className="text-xs md:text-sm text-gray-700">{feature}</span>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Select Button */}
//                   <button
//                     onClick={() => handlePlanSelect(plan.title, plan.backendValue)}
//                     className={`w-full py-2.5 md:py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer text-sm md:text-base ${plan.popular 
//                       ? 'bg-[#ff8a00] text-white hover:bg-[#ff8a00]/90' 
//                       : 'bg-gray-100 text-gray-900 hover:bg-gray-200'} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//                     disabled={isSubmitting}
//                   >
//                     {selectedPlan === plan.title ? '✓ SELECTED' : 'SELECT PLAN'}
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Video Showcase Section */}
//       <section className="py-20 md:py-32 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-[30px] lg:text-[40px] font-bold text-gray-900 mb-2">
//               Experience Our <span className="text-[#ff8a00]">Training Style</span>
//             </h2>
//             <p className="text-gray-700 lg:w-[400px] w-auto mx-auto">
//               See what makes our training sessions unique and effective
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
//             {/* Training Session Preview */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="relative rounded-3xl overflow-hidden border-2 border-gray-200"
//             >
//               <video
//                 className="w-full h-[320px] lg:h-[390px] object-cover"
//                 controls
//                 playsInline
//                 preload="metadata"
//               >
//                 <source src="/training4.mp4" type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//               <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-linear-to-t from-black/80 to-transparent">
//                 <div className="text-white">
//                   <div className="text-base md:text-lg font-bold">Live Training Session</div>
//                   <div className="text-xs md:text-sm opacity-90">See how we conduct personalized sessions</div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Success Story Preview */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.2 }}
//               className="relative rounded-3xl overflow-hidden border-2 border-gray-200"
//             >
//               <video
//                 className="w-full h-[320px] lg:h-[390px] object-cover"
//                 controls
//                 playsInline
//                 preload="metadata"
//               >
//                 <source src="/training5.mp4" type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//               <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-linear-to-t from-black/80 to-transparent">
//                 <div className="text-white">
//                   <div className="text-base md:text-lg font-bold">Training in Action</div>
//                   <div className="text-xs md:text-sm opacity-90">A real look at how sessions are structured and delivered</div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Booking Form Section */}
//       <section id="booking" className="py-20 md:py-32 px-4 md:px-8 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
//             {/* Form Info */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//             >
//               <div className="inline-flex items-center gap-2 mb-6">
//                 <div className="w-8 md:w-12 h-0.5 bg-[#ff8a00]" />
//                 <span className="text-[#008020] font-semibold tracking-wide text-sm md:text-base">BOOK YOUR PLAN</span>
//                 <div className="w-8 md:w-12 h-0.5 bg-[#ff8a00]" />
//               </div>

//               <h2 className="text-[30px] md:text-[40px] lg:text-[48px] font-bold text-gray-900 mb-4 md:mb-6">
//                 Start Your <span className="text-[#ff8a00]">Transformation</span>
//               </h2>

//               <p className="text-gray-700 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
//                 Fill out the form to book your free consultation. We&apos;ll discuss your goals, 
//                 assess your fitness level, and create a personalized plan to help you succeed.
//               </p>

//               {/* Selected Plan Display */}
//               <div className="bg-[#008020]/5 rounded-2xl p-4 md:p-6 border border-[#008020]/20 mb-6 md:mb-8">
//                 <div className="text-xs md:text-sm font-semibold text-[#008020] mb-2">Selected Plan</div>
//                 <div className="text-lg md:text-xl font-bold text-gray-900 mb-1">{selectedPlan}</div>
//                 <div className="text-sm md:text-base text-gray-600">You can change your selection above</div>
//               </div>

//               {/* Contact Info */}
//               <div className="space-y-3 md:space-y-4">
//                 <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-2xl">
//                   <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white font-bold bg-[#008020] text-sm md:text-base">
//                     1
//                   </div>
//                   <div>
//                     <div className="font-semibold text-gray-900 text-sm md:text-base">Free 30-Minute Consultation</div>
//                     <div className="text-xs md:text-sm text-gray-600">Discuss your goals and fitness assessment</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-2xl">
//                   <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white font-bold bg-[#ffde00] text-sm md:text-base">
//                     2
//                   </div>
//                   <div>
//                     <div className="font-semibold text-gray-900 text-sm md:text-base">Personalized Plan Creation</div>
//                     <div className="text-xs md:text-sm text-gray-600">Custom program tailored to your needs</div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Booking Form */}
//             <motion.form
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               onSubmit={handleSubmit}
//               className="bg-white rounded-3xl border-2 border-gray-200 p-6 md:p-8 shadow-xl"
//             >
//               <div className="space-y-4 md:space-y-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-900 mb-2">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.fullName}
//                     onChange={(e) => handleFormChange('fullName', e.target.value)}
//                     disabled={isSubmitting}
//                     className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008020] focus:border-transparent text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
//                     placeholder="John Doe"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-900 mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       required
//                       value={formData.email}
//                       onChange={(e) => handleFormChange('email', e.target.value)}
//                       disabled={isSubmitting}
//                       className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008020] focus:border-transparent text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
//                       placeholder="john@example.com"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-900 mb-2">
//                       Phone Number *
//                     </label>
//                     <input
//                       type="tel"
//                       required
//                       value={formData.phoneNumber}
//                       onChange={(e) => handleFormChange('phoneNumber', e.target.value)}
//                       disabled={isSubmitting}
//                       className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008020] focus:border-transparent text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
//                       placeholder="+234 801 234 5678"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-900 mb-2">
//                     Fitness Experience *
//                   </label>
//                   <select
//                     value={formData.experienceLevel}
//                     onChange={(e) => handleFormChange('experienceLevel', e.target.value)}
//                     required
//                     disabled={isSubmitting}
//                     className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008020] focus:border-transparent text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <option value="">Select your experience level</option>
//                     <option value="beginner">Beginner (New to fitness)</option>
//                     <option value="intermediate">Intermediate (1-2 years)</option>
//                     <option value="advanced">Advanced (3+ years)</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-900 mb-2">
//                     Your Fitness Goals *
//                   </label>
//                   <textarea
//                     required
//                     value={formData.fitnessGoal}
//                     onChange={(e) => handleFormChange('fitnessGoal', e.target.value)}
//                     rows={4}
//                     disabled={isSubmitting}
//                     className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008020] focus:border-transparent resize-none text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
//                     placeholder="Tell us about your fitness goals, challenges, and what you hope to achieve..."
//                   />
//                 </div>

//                 {/* Selected Package (Hidden but auto-filled) */}
//                 <input 
//                   type="hidden" 
//                   value={selectedPlanBackendValue}
//                   onChange={(e) => handleFormChange('plan', e.target.value)}
//                 />

//                 <motion.button
//                   type="submit"
//                   disabled={isSubmitting || !isFormValid()}
//                   whileHover={{ scale: isFormValid() && !isSubmitting ? 1.02 : 1 }}
//                   whileTap={{ scale: isFormValid() && !isSubmitting ? 0.98 : 1 }}
//                   className={`w-full py-3 md:py-4 text-sm md:text-lg font-bold rounded-xl transition-all duration-300 cursor-pointer ${
//                     isFormValid() && !isSubmitting 
//                       ? 'bg-[#ff8a00] text-white hover:shadow-2xl hover:shadow-[#ff8a00]/25' 
//                       : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   }`}
//                 >
//                   {isSubmitting ? (
//                     <span className="flex items-center justify-center gap-2">
//                       <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Processing...
//                     </span>
//                   ) : (
//                     'Book Free Consultation'
//                   )}
//                 </motion.button>

//                 <div className="text-center text-xs md:text-sm text-gray-500 pt-4 border-t border-gray-200">
//                   <p>We&apos;ll contact you within 24 hours to schedule your consultation</p>
//                   <p className="mt-2">
//                     <strong>Contact:</strong> 08163702286 | fitnessambassador84@gmail.com
//                   </p>
//                 </div>
//               </div>
//             </motion.form>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Training;







'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Image from 'next/image'; // Import Next.js Image component

// Define training plans with proper backend plan values
const trainingPackages = [
  {
    title: 'Basic Training Plan',
    backendValue: 'basic',
    price: '₦60,000/month',
    originalPrice: '₦70,000',
    discount: '20% OFF',
    sessions: '3 personal training sessions per week',
    features: [
      'Personalized workout plan tailored to your fitness goals',
      'Weekly fitness check-in & progress tracking',
      'Trainer\'s guidance during sessions',
      'Gym or Outdoor option available',
      'Basic nutritional guidance'
    ],
    popular: false,
    color: '#008020',
    videoPreview: '/training1.mp4'
  },
  {
    title: 'Standard Training Plan',
    backendValue: 'standard',
    price: '₦70,000/month',
    originalPrice: '₦85,000',
    discount: '23% OFF',
    sessions: '3 personal training sessions per week',
    features: [
      'Everything in Basic Plan +',
      'Customized workout + nutrition plan',
      'Monthly body measurements & progress photos',
      'WhatsApp support for exercise questions',
      'Access to monthly fitness workshops'
    ],
    popular: true,
    color: '#ff8a00',
    videoPreview: '/training2.mp4'
  },
  {
    title: 'Premium Training Plan',
    backendValue: 'premium',
    price: '₦80,000/month',
    originalPrice: '₦100,000',
    discount: '25% OFF',
    sessions: '4 personal training sessions per week',
    features: [
      'Everything in Standard Plan +',
      'Fully customized workout + nutrition plan adjusted weekly',
      'Full 1-on-1 coaching with daily accountability check-ins',
      'Priority access for feedback & support',
      'Fast-tracked results with higher accountability',
      'Personalized recovery & mobility sessions'
    ],
    popular: false,
    color: '#008020',
    videoPreview: '/training3.mp4'
  }
];

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSegQbcXyZcctrlEITbpTTd-RjAH8n_IFlDf_sCtohVQECL4AA/viewform?usp=sharing&ouid=109488395862329919072';

const pdfResources = [
  {
    title: 'The 3x Per Week Workout Formula',
    description: 'Discover the science-backed formula for training 3x/week and maximising results.',
    file: '/The 3x Per Week Workout Formula.pdf',
    icon: '📋',
    color: '#008020',
  },
  {
    title: 'The 3x Per Week Workout Plan (Men)',
    description: 'A ready-to-use structured plan built for men training three times a week.',
    file: '/The 3x per Week workout plan (men).pdf',
    icon: '💪',
    color: '#ff8a00',
  },
];

interface BookingFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  experienceLevel: string;
  plan: string;
  fitnessGoal: string;
}

interface BookingResponse {
  statusCode: string;
  message: string;
  data?: {
    bookingId: string;
    fullName: string;
    email: string;
    plan: string;
  };
}

const Training = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    experienceLevel: '',
    plan: '',
    fitnessGoal: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Standard Training Plan');
  const [selectedPlanBackendValue, setSelectedPlanBackendValue] = useState('standard');
  const [playingVideos, setPlayingVideos] = useState<number[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const selectedPackage = trainingPackages.find(pkg => pkg.title === selectedPlan);
    const backendValue = selectedPackage?.backendValue || 'standard';
    setSelectedPlanBackendValue(backendValue);
    setFormData(prev => ({ ...prev, plan: backendValue }));
  }, [selectedPlan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) { toast.error('Please fill in all required fields'); return; }
    const validExperienceLevels = ['beginner', 'intermediate', 'advanced'];
    if (!validExperienceLevels.includes(formData.experienceLevel.toLowerCase())) {
      toast.error('Please select a valid experience level'); return;
    }
    const validPlans = ['basic', 'standard', 'premium'];
    if (!validPlans.includes(formData.plan.toLowerCase())) {
      toast.error('Please select a valid training plan'); return;
    }
    setIsSubmitting(true);
    try {
      const loadingToast = toast.loading('Submitting your booking request...');
      const bookingData = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        experienceLevel: formData.experienceLevel.toLowerCase(),
        plan: formData.plan.toLowerCase(),
        fitnessGoal: formData.fitnessGoal.trim()
      };
      const response = await fetch('/api/training-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      const result: BookingResponse = await response.json();
      if (!response.ok) {
        toast.dismiss(loadingToast);
        toast.error(result.message || 'Failed to submit booking request');
        throw new Error(result.message || 'Failed to submit booking');
      }
      if (result.statusCode === '00' || result.message?.includes('success')) {
        toast.dismiss(loadingToast);
        toast.success('Booking request sent! We\'ll contact you within 24 hours.');
        setFormData({ fullName: '', email: '', phoneNumber: '', experienceLevel: '', plan: selectedPlanBackendValue, fitnessGoal: '' });
      } else {
        throw new Error(result.message || 'Booking submission failed');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    const requiredFields = ['fullName', 'email', 'phoneNumber', 'experienceLevel', 'plan', 'fitnessGoal'];
    return requiredFields.every(field => {
      const value = formData[field as keyof BookingFormData];
      return typeof value === 'string' && value.trim() !== '';
    });
  };

  const handleVideoHover = (index: number) => {
    const video = videoRefs.current[index];
    if (video && window.innerWidth >= 1024) { video.play().catch(() => { }); }
  };
  const handleVideoLeave = (index: number) => {
    const video = videoRefs.current[index];
    if (video && window.innerWidth >= 1024) { video.pause(); video.currentTime = 0; }
  };
  const toggleVideoPlay = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    if (video.paused) { video.play(); setPlayingVideos(prev => [...prev, index]); }
    else { video.pause(); video.currentTime = 0; setPlayingVideos(prev => prev.filter(i => i !== index)); }
  };
  const handleFormChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  const handlePlanSelect = (planTitle: string, backendValue: string) => {
    setSelectedPlan(planTitle);
    setSelectedPlanBackendValue(backendValue);
    setFormData(prev => ({ ...prev, plan: backendValue }));
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white lgLpt-0 pt-16">

      {/* ═══════════════════════════════════════════════════
          HERO SECTION — Full Screen Background Image
      ═══════════════════════════════════════════════════ */}
      <section className="relative h-screen max-h-[900px] min-h-[600px] w-full overflow-hidden">
        {/* Background Image using Next.js Image */}
        <Image
          src="/fa-trainer.jpeg"
          alt="Fitness trainer working with client"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />
        {/* Darker Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content Container - Centered */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-0.5 bg-[#ff8a00]" />
              <span className="text-[#ffde00] font-bold text-sm tracking-widest uppercase">
                Personal Training
              </span>
              <div className="w-10 h-0.5 bg-[#ff8a00]" />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-white text-white leading-tight mb-6">
              Train Smart.{' '}
              <span className="relative inline-block">
                Stay Consistent.
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#ffde00] rounded-full mb-2" />
              </span>
              <br />
              <span className="text-[#ff8a00]">Become Unstoppable!</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed mb-8">
              Transform your body with personalized training programs designed by a certified fitness coach
              with 7+ years of experience. Achieve your goals with expert guidance and proven methods.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="cursor-pointer px-8 py-4 bg-[#008020] text-white font-bold rounded-xl text-base hover:bg-[#006518] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 lg:w-auto w-[90%]"
              >
                Book Free Consultation
              </button>
              <button
                onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                className="cursor-pointer px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl text-base hover:bg-white/20 transition-all duration-300 lg:w-auto w-[90%]"
              >
                View Plans →
              </button>
            </div>

            {/* Quick stats strip - centered */}
            <div className="flex flex-wrap gap-8 justify-center mt-12 pt-4 border-t border-white/20">
              {[
                { val: '7+', label: 'Years Experience', color: '#ff8a00' },
                { val: '200+', label: 'Clients Transformed', color: '#ffde00' },
                { val: '3', label: 'Training Plans', color: '#008020' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="text-2xl md:text-3xl font-black" style={{ color: stat.color }}>
                    {stat.val}
                  </div>
                  <div className="text-sm md:text-base text-gray-300 font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FREE RESOURCES SECTION — PDFs + Google Form
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-br from-[#008020]/5 via-white to-[#ff8a00]/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffde00]/20 border border-[#ffde00]/40 mb-5">
              <span className="text-sm font-bold text-gray-800 tracking-wide uppercase">Free Resources</span>
            </div>
            <h2 className="text-[28px] lg:text-[38px] font-bold text-gray-900 mb-3">
              Start Your Journey <span className="text-[#008020]">Today — For Free</span>
            </h2>
            <p className="text-gray-600 max-w-[480px] mx-auto text-base leading-relaxed">
              Download our expert workout guides or sign up instantly with our Google Form — no commitment required.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

            {/* PDF Download Cards */}
            {pdfResources.map((pdf, i) => (
              <motion.div
                key={pdf.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white rounded-3xl border-2 border-gray-100 hover:border-current p-7 flex flex-col gap-5 shadow-sm hover:shadow-xl transition-all duration-300 group"
                style={{ '--hover-color': pdf.color } as React.CSSProperties}
              >
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{pdf.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{pdf.description}</p>

                <a
                  href={pdf.file}
                  download
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: pdf.color }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Download Free Guide
                </a>
              </motion.div>
            ))}

            {/* Google Form CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative bg-gradient-to-br from-[#ff8a00] to-[#ff6a00] rounded-3xl p-7 flex flex-col gap-5 shadow-lg overflow-hidden"
            >
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold tracking-widest uppercase mb-3">
                  Quick & Easy
                </div>
                <h3 className="text-xl font-black text-white mb-2 leading-tight">
                  Prefer a Google Form?
                </h3>
                <p className="text-white/85 text-sm leading-relaxed mb-6">
                  Sign up for your training plan in under 2 minutes using our simple Google Form — no account needed.
                </p>

                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm text-[#ff8a00] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  Sign Up via Google Form
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TRAINING PACKAGES SECTION
      ═══════════════════════════════════════════════════ */}
      <section id="plans" className="py-20 md:py-32 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-[30px] lg:text-[40px] font-bold text-gray-900 mb-2">
              Choose Your <span className="text-[#ff8a00]">Training Plan</span>
            </h2>
            <p className="text-gray-700 lg:w-[400px] w-auto mx-auto">
              Select the perfect plan for your fitness journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {trainingPackages.map((plan, index) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-3xl border-2 hover:shadow-2xl transition-all duration-300 ${plan.popular ? 'border-[#ff8a00] shadow-xl' : 'border-gray-200'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-[#ff8a00] text-white px-5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap">
                      MOST POPULAR
                    </div>
                  </div>
                )}
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="bg-[#008020] text-white px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold shadow-lg">
                    {plan.discount}
                  </div>
                </div>

                <div
                  className="relative h-36 md:h-40 overflow-hidden rounded-t-3xl group cursor-pointer"
                  onMouseEnter={() => handleVideoHover(index)}
                  onMouseLeave={() => handleVideoLeave(index)}
                  onClick={() => toggleVideoPlay(index)}
                >
                  <video
                    ref={el => { if (el) videoRefs.current[index] = el; }}
                    className="w-full h-full object-cover"
                    muted loop playsInline preload="metadata"
                  >
                    <source src={plan.videoPreview} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-2">
                        <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-white ml-1" />
                      </div>
                      <div className="text-white text-sm font-medium">
                        <span className="lg:hidden">Tap to preview</span>
                        <span className="hidden lg:inline">Hover to preview</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <div className="text-2xl md:text-3xl font-bold" style={{ color: plan.color }}>{plan.price}</div>
                      <div className="text-xs md:text-sm text-gray-500 line-through">{plan.originalPrice}</div>
                    </div>
                  </div>
                  <div className="mb-6 p-3 md:p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs md:text-sm font-semibold text-gray-900 mb-1">Training Sessions</div>
                    <div className="text-sm md:text-base text-gray-700 font-medium">{plan.sessions}</div>
                  </div>
                  <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-2 md:gap-3">
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center mt-0.5 shrink-0" style={{ backgroundColor: plan.color + '20' }}>
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" style={{ backgroundColor: plan.color }} />
                        </div>
                        <span className="text-xs md:text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handlePlanSelect(plan.title, plan.backendValue)}
                    className={`w-full py-2.5 md:py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer text-sm md:text-base ${plan.popular ? 'bg-[#ff8a00] text-white hover:bg-[#ff8a00]/90' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                  >
                    {selectedPlan === plan.title ? '✓ SELECTED' : 'SELECT PLAN'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          VIDEO SHOWCASE SECTION
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-[30px] lg:text-[40px] font-bold text-gray-900 mb-2">
              Experience Our <span className="text-[#ff8a00]">Training Style</span>
            </h2>
            <p className="text-gray-700 lg:w-[400px] w-auto mx-auto">See what makes our training sessions unique and effective</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative rounded-3xl overflow-hidden border-2 border-gray-200">
              <video className="w-full h-[320px] lg:h-[390px] object-cover" controls playsInline preload="metadata">
                <source src="/training4.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="text-white">
                  <div className="text-base md:text-lg font-bold">Live Training Session</div>
                  <div className="text-xs md:text-sm opacity-90">See how we conduct personalized sessions</div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative rounded-3xl overflow-hidden border-2 border-gray-200">
              <video className="w-full h-[320px] lg:h-[390px] object-cover" controls playsInline preload="metadata">
                <source src="/training5.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="text-white">
                  <div className="text-base md:text-lg font-bold">Training in Action</div>
                  <div className="text-xs md:text-sm opacity-90">A real look at how sessions are structured and delivered</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          BOOKING FORM SECTION
      ═══════════════════════════════════════════════════ */}
      <section id="booking" className="py-20 md:py-32 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">

            {/* Left — form info + other options */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 md:w-12 h-0.5 bg-[#ff8a00]" />
                <span className="text-[#008020] font-semibold tracking-wide text-sm md:text-base">BOOK YOUR PLAN</span>
                <div className="w-8 md:w-12 h-0.5 bg-[#ff8a00]" />
              </div>

              <h2 className="text-[30px] md:text-[40px] lg:text-[48px] font-bold text-gray-900 mb-4 md:mb-6">
                Start Your <span className="text-[#ff8a00]">Transformation</span>
              </h2>

              <p className="text-gray-700 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                Fill out the form to book your free consultation. We&apos;ll discuss your goals,
                assess your fitness level, and create a personalized plan to help you succeed.
              </p>

              {/* Selected plan display */}
              <div className="bg-[#008020]/5 rounded-2xl p-4 md:p-6 border border-[#008020]/20 mb-6 md:mb-8">
                <div className="text-xs md:text-sm font-semibold text-[#008020] mb-2">Selected Plan</div>
                <div className="text-lg md:text-xl font-bold text-gray-900 mb-1">{selectedPlan}</div>
                <div className="text-sm md:text-base text-gray-600">You can change your selection above</div>
              </div>

              {/* Steps */}
              <div className="space-y-3 md:space-y-4 mb-8">
                <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white font-bold bg-[#008020] text-sm md:text-base shrink-0">1</div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">Free 30-Minute Consultation</div>
                    <div className="text-xs md:text-sm text-gray-600">Discuss your goals and fitness assessment</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white font-bold bg-[#ffde00] text-sm md:text-base shrink-0">2</div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">Personalized Plan Creation</div>
                    <div className="text-xs md:text-sm text-gray-600">Custom program tailored to your needs</div>
                  </div>
                </div>
              </div>

              {/* Divider — Other ways */}
              <div className="border-t-2 border-dashed border-gray-200 pt-8">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Other Ways to Sign Up</p>

                {/* Google Form alternate CTA */}
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl border-2 border-[#ff8a00]/30 hover:border-[#ff8a00] bg-[#ff8a00]/5 hover:bg-[#ff8a00]/10 transition-all duration-300 mb-3 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 text-sm">Sign Up via Google Form</div>
                    <div className="text-xs text-gray-500">Quick 2-minute form — opens in a new tab</div>
                  </div>
                  <svg className="text-[#ff8a00] group-hover:translate-x-1 transition-transform shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>

                {/* PDF downloads mini */}
                {pdfResources.map((pdf) => (
                  <a
                    key={pdf.file}
                    href={pdf.file}
                    download
                    className="flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 hover:border-[#008020]/40 hover:bg-[#008020]/5 transition-all duration-300 mb-3 group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 text-sm leading-tight truncate">{pdf.title}</div>
                      <div className="text-xs text-gray-500">Free PDF download</div>
                    </div>
                    <svg className="text-[#008020] group-hover:translate-y-0.5 transition-transform shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right — Booking Form */}
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl border-2 border-gray-200 p-6 md:p-8 shadow-xl"
            >
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
                  <input
                    type="text" required value={formData.fullName}
                    onChange={(e) => handleFormChange('fullName', e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008020] focus:border-transparent text-sm md:text-base disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address *</label>
                    <input
                      type="email" required value={formData.email}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008020] focus:border-transparent text-sm md:text-base disabled:opacity-50"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number *</label>
                    <input
                      type="tel" required value={formData.phoneNumber}
                      onChange={(e) => handleFormChange('phoneNumber', e.target.value)}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008020] focus:border-transparent text-sm md:text-base disabled:opacity-50"
                      placeholder="+234 801 234 5678"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Fitness Experience *</label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => handleFormChange('experienceLevel', e.target.value)}
                    required disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008020] focus:border-transparent text-sm md:text-base disabled:opacity-50"
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner (New to fitness)</option>
                    <option value="intermediate">Intermediate (1-2 years)</option>
                    <option value="advanced">Advanced (3+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Your Fitness Goals *</label>
                  <textarea
                    required value={formData.fitnessGoal}
                    onChange={(e) => handleFormChange('fitnessGoal', e.target.value)}
                    rows={4} disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008020] focus:border-transparent resize-none text-sm md:text-base disabled:opacity-50"
                    placeholder="Tell us about your fitness goals, challenges, and what you hope to achieve..."
                  />
                </div>

                <input type="hidden" value={selectedPlanBackendValue} onChange={(e) => handleFormChange('plan', e.target.value)} />

                <motion.button
                  type="submit"
                  disabled={isSubmitting || !isFormValid()}
                  whileHover={{ scale: isFormValid() && !isSubmitting ? 1.02 : 1 }}
                  whileTap={{ scale: isFormValid() && !isSubmitting ? 0.98 : 1 }}
                  className={`w-full py-3 md:py-4 text-sm md:text-lg font-bold rounded-xl transition-all duration-300 cursor-pointer ${isFormValid() && !isSubmitting
                      ? 'bg-[#ff8a00] text-white hover:shadow-2xl hover:shadow-[#ff8a00]/25'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : 'Book Free Consultation'}
                </motion.button>

                {/* Divider with Google Form hint */}
                <div className="relative flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400 font-medium whitespace-nowrap">or prefer a form?</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-[#ff8a00] border-2 border-[#ff8a00]/30 hover:border-[#ff8a00] hover:bg-[#ff8a00]/5 transition-all duration-300"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  Sign Up via Google Form Instead
                </a>

                <div className="text-center text-xs md:text-sm text-gray-500 pt-2 border-t border-gray-200">
                  <p>We&apos;ll contact you within 24 hours to schedule your consultation</p>
                  <p className="mt-2">
                    <strong>Contact:</strong> 08163702286 | fitnessambassador84@gmail.com
                  </p>
                </div>
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Training;