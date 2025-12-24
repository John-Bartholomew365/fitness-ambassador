import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

const trainingPackages = [
  {
    title: 'Basic Training Plan',
    price: '₦40,000/month',
    originalPrice: '₦50,000',
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
    price: '₦50,000/month',
    originalPrice: '₦65,000',
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
    price: '₦60,000/month',
    originalPrice: '₦80,000',
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

const Training = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: '',
    experience: '',
    goals: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Standard Training Plan');
  const [playingVideos, setPlayingVideos] = useState<number[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    toast({
      title: "Booking Request Sent!",
      description: "We'll contact you within 24 hours to schedule your free consultation.",
    });
    
    setFormData({ 
      name: '', 
      email: '', 
      phone: '', 
      package: selectedPlan, 
      experience: '', 
      goals: '' 
    });
  };

  const handleVideoHover = (index: number) => {
    const video = videoRefs.current[index];
    if (video && window.innerWidth >= 1024) { // Only auto-play on desktop
      video.play().catch(e => console.log('Autoplay prevented:', e));
    }
  };

  const handleVideoLeave = (index: number) => {
    const video = videoRefs.current[index];
    if (video && window.innerWidth >= 1024) { // Only auto-play on desktop
      video.pause();
      video.currentTime = 0;
    }
  };

  const toggleVideoPlay = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      video.play();
      setPlayingVideos(prev => [...prev, index]);
    } else {
      video.pause();
      video.currentTime = 0;
      setPlayingVideos(prev => prev.filter(i => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4 md:px-8 bg-linear-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#008020]/10 mb-8"
          >
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#008020]" />
              <div className="w-2 h-2 rounded-full bg-[#ffde00]" />
              <div className="w-2 h-2 rounded-full bg-[#ff8a00]" />
            </div>
            <span className="text-[#008020] font-semibold text-sm tracking-wider">
              PERSONAL TRAINING
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[35px] md:text-[44px] lg:text-[56px] font-black text-gray-900 mb-6 leading-none"
          >
            Train Smart. Stay Consistent.
            <span className="block text-[#ff8a00] mt-4">Become Unstoppable!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-700 text-[16px] lg:text-[18px] lg:w-[600px] mx-auto leading-normal mb-10"
          >
            Transform your body with personalized training programs designed by a certified fitness coach 
            with 7+ years of experience. Achieve your fitness goals with expert guidance and proven methods.
          </motion.p>
        </div>
      </section>

      {/* Training Packages Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-white">
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

          {/* Packages Grid */}
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
                {/* Most Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-[#ff8a00] text-white px-5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Discount Badge - Positioned better */}
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="bg-[#008020] text-white px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold shadow-lg">
                    {plan.discount}
                  </div>
                </div>

                {/* Video Preview */}
                <div 
                  className="relative h-36 md:h-40 overflow-hidden rounded-t-3xl group"
                  onMouseEnter={() => handleVideoHover(index)}
                  onMouseLeave={() => handleVideoLeave(index)}
                  onClick={() => toggleVideoPlay(index)}
                >
                  <video
                    ref={el => { if (el) videoRefs.current[index] = el; }}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  >
                    <source src={plan.videoPreview} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Overlay with instructions */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-2">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <div className={`w-0 h-0 border-t-4 border-b-4 border-l-6 ${playingVideos.includes(index) ? 'border-t-transparent border-b-transparent border-l-transparent' : 'border-t-transparent border-b-transparent border-l-white'}`} />
                        </div>
                      </div>
                      <div className="text-white text-sm font-medium">
                        <span className="lg:hidden">Tap to {playingVideos.includes(index) ? 'pause' : 'play'}</span>
                        <span className="hidden lg:inline">Hover to preview</span>
                      </div>
                    </div>
                  </div>

                  {/* Play/Pause indicator */}
                  {playingVideos.includes(index) && (
                    <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      Playing
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-8">
                  {/* Package Header */}
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <div className="text-2xl md:text-3xl font-bold" style={{ color: plan.color }}>
                        {plan.price}
                      </div>
                      <div className="text-xs md:text-sm text-gray-500 line-through">{plan.originalPrice}</div>
                    </div>
                  </div>

                  {/* Sessions */}
                  <div className="mb-6 p-3 md:p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs md:text-sm font-semibold text-gray-900 mb-1">Training Sessions</div>
                    <div className="text-sm md:text-base text-gray-700 font-medium">{plan.sessions}</div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-2 md:gap-3">
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center mt-0.5 shrink-0"
                          style={{ backgroundColor: plan.color + '20' }}>
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" style={{ backgroundColor: plan.color }} />
                        </div>
                        <span className="text-xs md:text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Select Button */}
                  <button
                    onClick={() => {
                      setSelectedPlan(plan.title);
                      setFormData(prev => ({ ...prev, package: plan.title }));
                      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-2.5 md:py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer text-sm md:text-base ${plan.popular 
                      ? 'bg-[#ff8a00] text-white hover:bg-[#ff8a00]/90' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                  >
                    {selectedPlan === plan.title ? '✓ SELECTED' : 'SELECT PLAN'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
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
            <p className="text-gray-700 lg:w-[400px] w-auto mx-auto">
              See what makes our training sessions unique and effective
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Training Session Preview */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden border-2 border-gray-200"
            >
              <video
                className="w-full h-[320px] lg:h-[390px] object-cover"
                controls
                playsInline
                preload="metadata"
              >
                <source src="/training4.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-linear-to-t from-black/80 to-transparent">
                <div className="text-white">
                  <div className="text-base md:text-lg font-bold">Live Training Session</div>
                  <div className="text-xs md:text-sm opacity-90">See how we conduct personalized sessions</div>
                </div>
              </div>
            </motion.div>

            {/* Success Story Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden border-2 border-gray-200"
            >
              <video
                className="w-full h-[320px] lg:h-[390px] object-cover"
                controls
                playsInline
                preload="metadata"
              >
                <source src="/training5.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-linear-to-t from-black/80 to-transparent">
                <div className="text-white">
                  <div className="text-base md:text-lg font-bold">Training in Action</div>
                  <div className="text-xs md:text-sm opacity-90">A real look at how sessions are structured and delivered</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="py-20 md:py-32 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Form Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
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

              {/* Selected Plan Display */}
              <div className="bg-[#008020]/5 rounded-2xl p-4 md:p-6 border border-[#008020]/20 mb-6 md:mb-8">
                <div className="text-xs md:text-sm font-semibold text-[#008020] mb-2">Selected Plan</div>
                <div className="text-lg md:text-xl font-bold text-gray-900 mb-1">{selectedPlan}</div>
                <div className="text-sm md:text-base text-gray-600">You can change your selection above</div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white font-bold bg-[#008020] text-sm md:text-base">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">Free 30-Minute Consultation</div>
                    <div className="text-xs md:text-sm text-gray-600">Discuss your goals and fitness assessment</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white font-bold bg-[#ffde00] text-sm md:text-base">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">Personalized Plan Creation</div>
                    <div className="text-xs md:text-sm text-gray-600">Custom program tailored to your needs</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Booking Form */}
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl border-2 border-gray-200 p-6 md:p-8 shadow-xl"
            >
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008020] focus:border-transparent text-sm md:text-base"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008020] focus:border-transparent text-sm md:text-base"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008020] focus:border-transparent text-sm md:text-base"
                      placeholder="+234 801 234 5678"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Fitness Experience
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008020] focus:border-transparent text-sm md:text-base"
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner (New to fitness)</option>
                    <option value="intermediate">Intermediate (1-2 years)</option>
                    <option value="advanced">Advanced (3+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Your Fitness Goals *
                  </label>
                  <textarea
                    required
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008020] focus:border-transparent resize-none text-sm md:text-base"
                    placeholder="Tell us about your fitness goals, challenges, and what you hope to achieve..."
                  />
                </div>

                {/* Selected Package (Hidden but auto-filled) */}
                <input type="hidden" value={selectedPlan} />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 md:py-4 bg-[#ff8a00] text-white text-sm md:text-lg font-bold rounded-xl hover:shadow-2xl hover:shadow-[#ff8a00]/25 transition-all duration-300 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : 'Book Free Consultation'}
                </motion.button>

                <div className="text-center text-xs md:text-sm text-gray-500 pt-4 border-t border-gray-200">
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