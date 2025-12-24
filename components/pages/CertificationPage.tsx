import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const CertificationPortfolio = () => {
 const currentYear = new Date().getFullYear();

  // Certification data with personalized details
  const certifications = [
    // {
    //   id: 1,
    //   title: 'Certified Fitness Coach',
    //   issuer: 'International Sports & Fitness Association',
    //   year: '2019',
    //   type: 'Professional Certification',
    //   image: '/certification1.jpeg',
    //   description: 'This was my foundational certification that started it all. After years of personal fitness journey, I wanted to validate my knowledge and help others professionally. It covers everything from exercise science to client psychology.',
    //   personalNote: 'Earning this certification gave me the confidence to officially launch "The Fitness Ambassador" brand.',
    //   skills: ['Program Design', 'Client Assessment', 'Exercise Science', 'Safety Protocols'],
    //   validity: 'Lifetime with CEUs',
    //   verificationId: 'ISFA-2019-04567'
    // },
    {
      id: 1,
      title: 'Science of Exercise',
      issuer: 'Coursera / University of Colorado Boulder',
      year: '2023',
      type: 'Professional Certification',
      image: '/certification1.jpeg',
      description: 'This certification represents a solid, science-based understanding of human movement, exercise principles, and safe training practices.',
      personalNote: 'The Science of Exercise is the foundation of effective training. It focuses on understanding how the body moves, adapts, and improves through properly structured exercise.',
      skills: ['Exercise Physiology', 'Movement Analysis', 'Training Progression', 'Injury Prevention'],
      validity: 'Lifetime with CEUs',
      verificationId: 'ISFA-2019-04567'
    },
    {
      id: 2,
      title: 'First Aid & CPR/AED Certificate',
      issuer: 'Institute of Exercise Professionals',
      year: '2024',
      type: 'Advanced Specialization',
      image: '/certification2.jpeg',
      description: 'It confirms professional training in basic life-saving procedures, emergency response, and on-site safety management.',
      personalNote: 'This certification emphasizes preparedness — the ability to respond calmly and correctly in emergencies when every second matters.',
      skills: ['Emergency Response', 'CPR Techniques', 'AED Operation', 'Basic First Aid'],
      validity: '3-Year Renewal',
      verificationId: 'NASM-2020-89234'
    },
    // {
    //   id: 4,
    //   title: 'Sports Nutrition Consultant',
    //   issuer: 'International Society of Sports Nutrition',
    //   year: '2021',
    //   type: 'Nutrition Specialization',
    //   image: '/certification3.jpeg',
    //   description: 'Seeing participants struggle with nutrition alongside fitness, I pursued this to provide holistic guidance. This certification forms the basis of the nutritional tips in Workout Compass.',
    //   personalNote: 'The practical nutrition strategies from this certification are now part of every fitness consultation I provide.',
    //   skills: ['Sports Nutrition', 'Supplementation', 'Meal Planning', 'Hydration Strategies'],
    //   validity: '3-Year Renewal',
    //   verificationId: 'ISSN-2021-56789'
    // },
    // {
    //   id: 5,
    //   title: 'Community Fitness Leadership',
    //   issuer: 'African Fitness Association',
    //   year: '2022',
    //   type: 'Community Focus',
    //   image: '/certification4.jpeg',
    //   description: 'This certification was specifically for creating and managing community fitness programs. It provided the framework for building sustainable fitness communities like our Sunday Cycling group.',
    //   personalNote: 'This taught me how to scale fitness from individual coaching to community impact.',
    //   skills: ['Community Building', 'Group Dynamics', 'Event Planning', 'Inclusive Programming'],
    //   validity: 'Lifetime',
    //   verificationId: 'AFA-2022-12345'
    // },
    // {
    //   id: 6,
    //   title: 'Emergency First Aid & CPR',
    //   issuer: 'Red Cross International',
    //   year: '2023',
    //   type: 'Safety Certification',
    //   image: '/certification5.jpeg',
    //   description: 'Safety is non-negotiable. With events growing to 400+ participants, I knew I needed this certification to ensure everyone\'s wellbeing during our fitness experiences.',
    //   personalNote: 'This certification gives me peace of mind knowing I can handle emergencies during any event.',
    //   skills: ['CPR', 'First Aid', 'Emergency Response', 'Injury Prevention'],
    //   validity: '2-Year Renewal',
    //   verificationId: 'RCI-2023-67890'
    // }
  ];

  // Why certification matters - personal perspective
  const whyItMatters = [
    {
      title: 'For Your Safety',
      description: 'Every exercise, every movement cue, every program I design is backed by certified knowledge. Your safety is never left to chance.',
      color: '#008020'
    },
    {
      title: 'For Your Results',
      description: 'Certifications mean I use evidence-based methods that actually work, not trends or guesswork. Your time and effort deserve proven strategies.',
      color: '#ffde00'
    },
    {
      title: 'For Your Trust',
      description: 'When you join any of my events or programs, you can trust that you\'re in professionally qualified hands. No shortcuts, just standards.',
      color: '#ff8a00'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Background Image with Centered Text */}
      <section className="relative min-h-screen lg:min-h-screen py-16 md:py-20 lg:py-0 px-4 md:px-8 bg-gray-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/about.jpeg"
            alt="Certification Portfolio Background"
            fill
            className="object-cover opacity-30 object-[center_25%]"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center h-full flex flex-col justify-center min-h-[inherit]">
          {/* Title Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex w-fit mx-auto items-center gap-3 px-7 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#ff8a00]" />
              <div className="w-2 h-2 rounded-full bg-[#008020]" />
              <div className="w-2 h-2 rounded-full bg-[#ffde00]" />
            </div>
            <span className="text-white font-semibold text-sm tracking-wider">
              PROFESSIONAL CREDENTIALS
            </span>
          </motion.div>

          <h1 className="text-[40px] md:text-[52px] lg:text-[64px] font-black text-white mb-6 leading-none">
            Certified Excellence
            <span className="block text-[#ff8a00] mt-4">Backed by Knowledge</span>
          </h1>

          <p className="text-white/90 text-[16px] lg:text-[18px] lg:w-[750px] mx-auto leading-relaxed mb-10">
            Every fitness event, every training session, every piece of advice I share is rooted in
            professional certification and continuous learning. This isn&apos;t just about credentials—it&apos;s
            about ensuring your fitness journey is safe, effective, and guided by expertise.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { value: '5', label: 'Professional Certifications', color: '#008020' },
              { value: '7+', label: 'Years Applying Knowledge', color: '#ffde00' },
              { value: '5000+', label: 'Participants Safely Guided', color: '#ff8a00' },
              { value: '100%', label: 'Safety Record Maintained', color: '#008020' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-xs text-white/90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why My Certification Matters - Personal Perspective */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-[30px] lg:text-[40px] font-bold text-gray-900 mb-3">
              Why <span className="text-[#ff8a00]">My Certification</span> Matters
            </h2>
            <p className="text-gray-700 lg:w-[420px] w-auto mx-auto">
              From my perspective as a fitness professional, here&apos;s what these certifications mean for you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyItMatters.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                  {/* Number Circle */}
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white mb-4"
                      style={{ backgroundColor: item.color }}>
                      0{index + 1}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>

                  {/* Personal Touch */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="text-sm text-gray-500 italic">
                      This is why I maintain and update all certifications
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Certifications Showcase - Alternating Layout */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-[30px] lg:text-[40px] font-bold text-gray-900 mb-2">
              My <span className="text-[#ff8a00]">Certification Portfolio</span>
            </h2>
            <p className="text-gray-700 lg:w-[400px] w-auto mx-auto">
              Each certification represents a step in my commitment to professional excellence
            </p>
          </motion.div>

          {/* Certifications List - Alternating Layout */}
          <div className="space-y-20">
            {certifications.map((cert, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
                >
                  {/* Certification Image - Alternates sides on desktop */}
                  <div className="relative">
                    <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                      {/* Actual certification image */}
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-"
                        priority={index === 0}
                      />
                      
                      {/* Certification Badge */}
                      <div className="absolute top-6 right-6 bg-[#ff8a00] text-white px-4 py-2 rounded-full text-sm font-bold">
                        VERIFIED
                      </div>
                      
                      {/* Certification Number */}
                      <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-900">
                        Certification #{cert.id}
                      </div>
                    </div>
                  </div>

                  {/* Certification Details */}
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <div className="inline-flex items-center gap-2 mb-3">
                        <span className="text-[#008020] font-semibold text-sm tracking-wide">
                          {cert.year} • {cert.type}
                        </span>
                      </div>

                      <h3 className="text-[32px] md:text-[40px] font-bold text-gray-900 mb-4">
                        {cert.title}
                      </h3>

                      <div className="text-lg text-gray-600 mb-2">
                        Issued by <span className="font-semibold text-gray-900">{cert.issuer}</span>
                      </div>
                    </div>

                    {/* Personal Story */}
                    <div className="bg-[#008020]/5 rounded-2xl p-6 border border-[#008020]/20">
                      <div className="text-sm font-semibold text-[#008020] mb-2">Personal Reflection</div>
                      <p className="text-gray-700 italic">
                        &quot;{cert.personalNote}&quot;
                      </p>
                    </div>

                    {/* Description */}
                    <div>
                      <div className="text-sm font-semibold text-gray-500 mb-2">What This Certification Means</div>
                      <p className="text-gray-700 leading-relaxed">
                        {cert.description}
                      </p>
                    </div>

                    {/* Skills Gained */}
                    <div>
                      <div className="text-sm font-semibold text-gray-500 mb-3">Key Skills & Knowledge</div>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Certification Details */}
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                      <div>
                        <div className="text-sm font-semibold text-gray-500">Validity Period</div>
                        <div className="text-gray-900 font-medium">{cert.validity}</div>
                      </div>
                      {/* <div>
                        <div className="text-sm font-semibold text-gray-500">Verification ID</div>
                        <div className="text-gray-900 font-medium">{cert.verificationId}</div>
                      </div> */}
                    </div>

                    {/* How It Applies */}
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <div className="text-sm font-semibold text-gray-500 mb-3">How This Certification Helps You</div>
                      <ul className="space-y-2">
                        {[
                          'Ensures safety during all fitness activities',
                          'Guarantees evidence-based methods',
                          'Provides professional accountability',
                          'Enables customized program design'
                        ].map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-[#008020]/20 flex items-center justify-center mt-0.5 shrink-0">
                              <div className="w-2 h-2 rounded-full bg-[#008020]" />
                            </div>
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* My Professional Standards - Personalized */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Personal Commitment */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[28px] lg:text-[35px] font-bold text-gray-900 mb-4 lg:text-start text-center">
                My Commitment to <br className="block lg:hidden" /> <span className="text-[#ff8a00]">Professional Standards</span>
              </h2>

              <div className="space-y-6">
                <p className="text-gray-700 leading-normal lg:text-start text-center">
                  Certification is just the beginning. What matters is how I apply this knowledge
                  to serve our fitness community. Here&apos;s my personal commitment to you:
                </p>

                {[
                  {
                    commitment: 'I will always operate within my certified scope of practice',
                    reason: 'Because your safety requires knowing boundaries and when to refer to specialists',
                    color: '#008020'
                  },
                  {
                    commitment: 'I will continuously update my knowledge through annual education',
                    reason: 'Because fitness science evolves, and your results deserve the latest insights',
                    color: '#ffde00'
                  },
                  {
                    commitment: 'I will prioritize your safety above all else in every event',
                    reason: 'Because one preventable injury is one too many in our community',
                    color: '#ff8a00'
                  },
                  {
                    commitment: 'I will maintain full transparency about my qualifications',
                    reason: 'Because trust is built on honesty and verifiable credentials',
                    color: '#008020'
                  }
                ].map((item, index) => (
                  <div key={index} className="lg:p-5 p-3 rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold shrink-0"
                        style={{ backgroundColor: item.color }}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 mb-1">{item.commitment}</div>
                        <div className="text-sm text-gray-600">{item.reason}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certification Journey Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 rounded-3xl lg:p-8 p-5 border-2 border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 lg:text-start text-center">My Certification Journey</h3>

              <div className="relative lg:pl-8 pl-5">
                {/* Vertical Line */}
                <div className="absolute lg:left-3 left-0 top-0 bottom-0 w-1 bg-linear-to-b from-[#008020] via-[#ffde00] to-[#ff8a00]" />

                {/* Timeline Items */}
                <div className="space-y-10">
                  {[
                    { year: '2019', milestone: 'Started professional journey with foundational certification' },
                    { year: '2020', milestone: 'Added advanced specialization for diverse client needs' },
                    { year: '2021', milestone: 'Integrated nutrition expertise for holistic guidance' },
                    { year: '2022', milestone: 'Focused on community leadership for larger impact' },
                    { year: '2023', milestone: 'Prioritized safety with emergency response training' },
                    { year: 'Present', milestone: 'Continuously updating knowledge through CEUs' }
                  ].map((item, index) => (
                    <div key={index} className="relative">
                      {/* Dot */}
                      <div className="absolute left-[-28px] top-1">
                        <div className="w-6 h-6 rounded-full border-4 border-white shadow-md"
                          style={{
                            backgroundColor: ['#008020', '#ffde00', '#ff8a00', '#008020', '#ffde00', '#ff8a00'][index]
                          }} />
                      </div>

                      <div className="pb-2">
                        <div className="text-sm font-bold text-gray-900 mb-1">{item.year}</div>
                        <p className="text-gray-700">{item.milestone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Focus */}
              <div className="mt-10 p-5 bg-white rounded-xl border border-gray-200">
                <div className="text-sm font-semibold text-[#008020] mb-2">Current Focus {currentYear}</div>
                <p className="text-gray-700">
                  Continuing education in community health initiatives and integrating
                  recovery science into our fitness events
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Personal Message */}
      <section className="px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className=" text-gray-900 text-center"
          >
            <h2 className="text-[30px] lg:text-[40px] font-bold mb-4">
              A Personal <span className="text-[#ff8a00]">Promise</span>
            </h2>

            <div className="text-black/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              <p className="mb-6">
                These certifications represent more than credentials—they&apos;re my commitment to
                providing you with safe, effective, and transformative fitness experiences.
              </p>

              <p>
                Every time you join Walk2Fitness, attend Jam2Fit, or follow guidance from
                Workout Compass, know that you&apos;re benefiting from professionally certified
                expertise applied with genuine care for our community.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link href="/events">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#ff8a00] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#ff8a00]/25 transition-all duration-300 cursor-pointer lg:w-auto w-full"
                >
                  Join a Certified Event
                </motion.button>
              </Link>
              <Link href="/innovator/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm text-black font-bold rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer lg:w-auto w-full"
                >
                  Learn More About Me
                </motion.button>
              </Link>
            </div>

            <div className="mt-10 pt-8 border-t border-white/20">
              <p className="text-black/80 text-sm">
                Ajisafe Sulaiman • The Fitness Ambassador <br className='block lg:hidden' /> • All certifications current and maintained
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CertificationPortfolio;