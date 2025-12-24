import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote } from 'lucide-react';

const Jam2FitPage = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    // Event statistics and highlights - Using brand colors
    const eventStats = [
        { number: '400+', label: 'Night Owls', color: '#ffde00', icon: '🌙' },
        { number: '5★', label: 'Experience Rating', color: '#008020', icon: '⭐' },
        { number: '1st', label: 'In Ilorin', color: '#ff8a00', icon: '🏆' },
        { number: 'Coming', label: 'Next Edition', color: '#ffde00', icon: '🎯' }
    ];

    // Event features - Nighttime fitness theme with brand colors
    const features = [
        {
            title: 'Nighttime Energy',
            description: 'Experience fitness under the stars with vibrant lighting and electrifying atmosphere',
            icon: '🌃',
            color: '#ffde00'
        },
        {
            title: 'Live DJ Beats',
            description: 'Professional DJ-curated playlists that sync with workout intensity for optimal performance',
            icon: '🎧',
            color: '#008020'
        },
        {
            title: 'Party Atmosphere',
            description: 'Transform workouts into celebrations where fitness meets entertainment and community',
            icon: '🎉',
            color: '#ff8a00'
        }
    ];

    // Gallery images
    const galleryImages = [
        { src: '/jamfit.jpg', title: 'Main Event Stage', category: 'Night Party' },
        { src: '/jam2fit2.jpg', title: 'DJ Fitness Session', category: 'Live Music' },
        { src: '/jam2fit3.jpg', title: 'Night Workout', category: 'Outdoor Fitness' },
        { src: '/jam2fit4.jpg', title: 'Group Dance', category: 'Community' },
        { src: '/jam2fit5.jpg', title: 'Fitness Entertainment', category: 'Energy' },
        { src: '/jam2fit6.jpg', title: 'Enthusiastic Crowd', category: 'Vibes' },
        { src: '/jam2fit8.jpg', title: 'Light Show', category: 'Production' },
        { src: '/jam2fit9.jpg', title: 'Finale Celebration', category: 'Climax' }
    ];

    // Testimonials
    const testimonials = [
        {
            name: 'Chioma Adebayo',
            role: 'First-time Participant',
            content: 'I never thought I could burn calories while having this much fun! The energy was electric from start to finish.',
            highlight: 'Best night of fitness ever',
            color: '#ffde00'
        },
        {
            name: 'Tunde Williams',
            role: 'Fitness Enthusiast',
            content: 'Jam2Fit changed my perspective on workouts. The combination of live music and structured exercise is revolutionary.',
            highlight: 'Revolutionary fitness experience',
            color: '#008020'
        },
        {
            name: 'Amina Lawal',
            role: 'Regular Attendee',
            content: 'As someone who works late, Jam2Fit is perfect. I get my workout in, meet amazing people, and still have energy for work next day.',
            highlight: 'Perfect for night owls',
            color: '#ff8a00'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Consistent with other pages */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-8 overflow-hidden">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-white via-gray-50/50 to-white" />

                {/* Decorative elements using brand colors */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#ffde00]/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#008020]/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#ffde00]/10 text-[#ffde00] font-medium text-sm mb-6">
                                <span className="text-lg">🎵</span>
                                Ilorin&apos;s First Nighttime Fitness Party
                            </div>

                            <h1 className="text-[40px] md:text-[54px] lg:text-[60px] font-bold text-gray-900 mb-4 leading-tight">
                                Jam2Fit:
                                <span className="block text-[#ffde00]">Where Fitness</span>
                                <span className="block text-gray-900">Meets Nightlife</span>
                            </h1>

                            <p className="text-gray-600 text-lg mb-8 leading-normal">
                                Experience Ilorin&apos;s revolutionary nighttime fitness movement where 400+ night owls transform workouts into celebrations. The only event where live DJ beats, spectacular lighting, and high-energy workouts create unforgettable fitness experiences.
                            </p>

                            {/* Stats Cards - Consistent design */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                                {eventStats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="text-center p-4 rounded-xl bg-white border-2 border-gray-100 hover:shadow-lg transition-all duration-300"
                                    >
                                        {/* <div className="text-2xl mb-2">{stat.icon}</div> */}
                                        <div
                                            className="text-3xl font-bold mb-2"
                                            style={{ color: stat.color }}
                                        >
                                            {stat.number}
                                        </div>
                                        <div className="text-[12px] text-gray-600">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA Buttons with brand colors */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-8 py-4 bg-[#ffde00] cursor-pointer text-gray-900 font-semibold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                                >
                                    <span className="text-xl">🎬</span>
                                    Watch Event Highlights
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-8 py-4 bg-white cursor-pointer text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-[#ffde00] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
                                >
                                    <span className="text-xl">👥</span>
                                    Hear From Participants
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Hero Video */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100">
                                <video
                                    src="/jamvid.mp4"
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-[#ffde00] flex items-center justify-center shadow-lg">
                                        <span className="text-2xl text-gray-900">▶</span>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-3xl border-2 border-[#ffde00]/20 -z-10" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What Makes Jam2Fit Unique */}
            <section className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-2 h-2 rounded-full bg-[#008020]" />
                            <div className="w-2 h-2 rounded-full bg-[#ffde00]" />
                            <div className="w-2 h-2 rounded-full bg-[#ff8a00]" />
                        </div>
                        <h2 className="text-[32px] lg:text-[42px] font-bold text-gray-900 mb-4">
                            Fitness <span className="text-[#ffde00]">Reimagined</span> as Celebration
                        </h2>
                        <p className="text-gray-600 text-[16px] lg:w-[550px] w-auto mx-auto">
                            Jam2Fit breaks all conventions by transforming traditional workouts into high-energy nighttime celebrations that you actually look forward to.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl bg-white border-2 border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
                            >
                                <div
                                    className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-6"
                                    style={{
                                        backgroundColor: feature.color + '15',
                                        color: feature.color
                                    }}
                                >
                                    {feature.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Event Highlights */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 bg-linear-to-r from-white to-gray-50 rounded-3xl lg:p-8 p-4 border-2 border-gray-100"
                    >
                        <div className="relative lg:hidden block lg:mb-0 mb-8">
                            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border-2 border-gray-100">
                                <Image
                                    src="/jamfit.jpg"
                                    alt="Jam2Fit Main Event"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl border-2 border-[#ffde00]/20 -z-10" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                                    Why <span className="text-[#ffde00]">400+</span> Night Owls Choose Jam2Fit
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        'Late-night scheduling perfect for busy professionals',
                                        'Professional DJ-curated workout playlists',
                                        'Spectacular lighting and visual production',
                                        'Social atmosphere that builds fitness community',
                                        'Structured workouts disguised as pure fun'
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div
                                                className="w-6 h-6 rounded-full flex items-center justify-center"
                                                style={{
                                                    backgroundColor: ['#008020', '#ffde00', '#ff8a00'][index % 3] + '20'
                                                }}
                                            >
                                                <span
                                                    className="text-sm font-bold"
                                                    style={{
                                                        color: ['#008020', '#ffde00', '#ff8a00'][index % 3]
                                                    }}
                                                >
                                                    ✓
                                                </span>
                                            </div>
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="relative lg:block hidden">
                                <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border-2 border-gray-100">
                                    <Image
                                        src="/jamfit.jpg"
                                        alt="Jam2Fit Main Event"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                                </div>
                                <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl border-2 border-[#ffde00]/20 -z-10" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="py-16 md:py-24 px-4 md:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Nighttime <span className="text-[#ffde00]">Magic</span> Captured
                        </h2>
                        <p className="text-gray-600 text-[16px] lg:w-[410px] w-auto mx-auto leading-normal">
                            Experience the energy through photos and videos from our revolutionary fitness party.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {galleryImages.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group border-2 border-gray-100 hover:border-[#008020]/30 transition-all duration-300"
                                onClick={() => setSelectedImage(index)}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="text-sm font-semibold text-white">{image.title}</div>
                                        <div
                                            className="text-xs font-medium"
                                            style={{ color: ['#ffde00', '#008020', '#ff8a00'][index % 3] }}
                                        >
                                            {image.category}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Video Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12"
                    >
                        <div className="relative rounded-3xl overflow-hidden border-2 border-gray-100 shadow-xl">
                            <video
                                src="/jamvid.mp4"
                                className="w-full h-auto max-h-[600px] object-cover"
                                controls
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-gray-900/80 to-transparent">
                                <h3 className="text-xl font-bold text-white">Jam2Fit Highlights Reel</h3>
                                <p className="text-gray-300 text-sm">Experience the full nighttime fitness party in a minute</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
      {/* Testimonials */}
<section id="testimonials" className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
    <div className="max-w-6xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Voices from the <span className="text-[#ffde00]">Night</span>
            </h2>
            <p className="text-gray-600 text-[16px] lg:w-[370px] w-auto mx-auto leading-normal">
                Hear what makes Jam2Fit the most talked-about fitness experience in Ilorin.
            </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-8 rounded-2xl bg-white border-2 border-gray-100 hover:shadow-lg transition-all duration-300 relative"
                >
                    {/* Quote Mark */}
                    <div
                        className="text-4xl mb-4"
                        style={{ color: testimonial.color + '30' }}
                    >
                        <Quote size={42} className="text-secondary/20" />
                    </div>

                    <p className="text-gray-700 italic mb-6">&quot;{testimonial.content}&quot;</p>

                    <div className="flex items-center gap-3">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                            style={{ backgroundColor: testimonial.color }}
                        >
                            {testimonial.name.charAt(0)}
                        </div>
                        <div>
                            <div className="font-bold text-gray-900">{testimonial.name}</div>
                            <div className="text-sm text-gray-600">{testimonial.role}</div>
                        </div>
                    </div>

                    {/* Highlight Badge - This will now show correctly */}
                    <div
                        className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                            backgroundColor: testimonial.color + '15',
                            color: testimonial.color
                        }}
                    >
                        {testimonial.highlight}
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
</section>

            {/* Final CTA with Email Form */}
            <section className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-br from-[#ffde00]/5 via-white to-[#008020]/5">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-3 mb-8">
                            <div className="w-3 h-3 rounded-full bg-[#008020]" />
                            <div className="w-3 h-3 rounded-full bg-[#ffde00]" />
                            <div className="w-3 h-3 rounded-full bg-[#ff8a00]" />
                        </div>

                        <h2 className="text-[30px] lg:text-[40px] font-bold text-gray-900 mb-6">
                            Ready for the Next <br className="block lg:hidden" /> <span className="text-[#ffde00]">Nighttime</span> Revolution?
                        </h2>

                        <p className="text-gray-700 text-[16px] mb-10 max-w-2xl mx-auto">
                            Be the first to know when Jam2Fit returns with even more energy, better production, and unforgettable fitness experiences. Join our exclusive waiting list now!
                        </p>

                        {/* Email Subscription Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mb-8"
                        >
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    // Handle form submission here
                                    alert('Thank you! You\'ll be notified when Jam2Fit returns.');
                                }}
                                className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
                            >
                                <div className="flex-1">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        required
                                        className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#008020] focus:ring-2 focus:ring-[#008020]/20 transition-all duration-300"
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-[#ffde00] text-gray-900 font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 text-lg flex items-center justify-center gap-3 min-w-[200px] cursor-pointer"
                                >
                                    Join Waiting List
                                </motion.button>
                            </form>
                            <p className="text-gray-500 text-sm mt-3">
                                We respect your privacy. No spam, ever.
                            </p>
                        </motion.div>
                        <div className="mt-12 pt-8 border-t border-gray-300/30">
                            <p className="text-gray-600">
                                <span className="font-semibold text-[#008020]">Ilorin&apos;s First & Only Nighttime Fitness Party</span><br />
                                <span className="text-sm">Redefining what fitness experiences can be</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Jam2FitPage;