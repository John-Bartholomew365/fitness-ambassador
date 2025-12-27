import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        vestSize: '',
        vestType: 'Hoodie',
        vestColor: '#008020'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [registrationComplete, setRegistrationComplete] = useState(false);

    // Vest options
    const vestTypes = [
        { id: 'hoodie', name: 'Hoodie', price: '₦15,000', color: '#ff8a00' },
        { id: 'tshirt', name: 'T-Shirt', price: '₦8,000', color: '#008020' },
        { id: 'armless', name: 'Armless Vest', price: '₦6,000', color: '#ffde00' }
    ];

    const vestColors = [
        { id: 'green', name: 'Forest Green', hex: '#008020' },
        { id: 'blue', name: 'Royal Blue', hex: '#1e40af' },
        { id: 'orange', name: 'Sunset Orange', hex: '#ff8a00' },
        { id: 'yellow', name: 'Sunshine Yellow', hex: '#ffde00' },
        { id: 'black', name: 'Classic Black', hex: '#000000' }
    ];

    const vestSizes = [
        { value: 'S', label: 'Small' },
        { value: 'M', label: 'Medium' },
        { value: 'L', label: 'Large' },
        { value: 'XL', label: 'Extra Large' },
        { value: 'XXL', label: 'Double Extra Large' }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setRegistrationComplete(true);
        
        // Reset form
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            vestSize: '',
            vestType: 'Hoodie',
            vestColor: '#008020'
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Calculate total price based on vest type
    const getTotalPrice = () => {
        const vestType = vestTypes.find(v => v.name === formData.vestType);
        return vestType ? vestType.price : '₦15,000';
    };

    if (registrationComplete) {
        return (
            <div className="min-h-screen bg-white">
                {/* Success Screen */}
                <section className="relative min-h-screen lg:min-h-screen py-16 md:py-20 lg:py-0 px-4 md:px-8 bg-gray-900 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/background.jpeg"
                            alt="Walk2Fitness Background"
                            fill
                            className="object-cover opacity-30 object-[center_25%]"
                            priority
                            quality={100}
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70" />
                    </div>

                    <div className="max-w-4xl mx-auto relative z-10 text-center h-full flex flex-col justify-center min-h-[inherit]">
                        <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-8 md:p-12">
                            {/* Success Icon */}
                            <div className="mb-8">
                                <div className="w-24 h-24 rounded-full bg-[#008020]/20 border-4 border-[#008020]/40 mx-auto flex items-center justify-center">
                                    <div className="w-12 h-12 bg-[#008020] rounded-full flex items-center justify-center">
                                        <div className="text-white text-2xl font-bold">✓</div>
                                    </div>
                                </div>
                            </div>

                            <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-black text-white mb-6">
                                Registration <span className="text-[#ff8a00]">Complete!</span>
                            </h1>

                            <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                                Thank you for registering for Walk2Fitness 5.0! We&apos;ve received your vest selection and contact details.
                            </p>

                            <div className="space-y-6 max-w-md mx-auto">
                                {/* Order Summary */}
                                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                                    <h3 className="text-white font-bold text-xl mb-4">Your Order Summary</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-white/90">
                                            <span>{formData.vestType}</span>
                                            <span className="font-semibold">{getTotalPrice()}</span>
                                        </div>
                                        <div className="flex justify-between text-white/90">
                                            <span>Color</span>
                                            <div className="flex items-center gap-2">
                                                <div 
                                                    className="w-4 h-4 rounded-full border border-white"
                                                    style={{ backgroundColor: formData.vestColor }}
                                                />
                                                <span>{vestColors.find(c => c.hex === formData.vestColor)?.name}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-white/90">
                                            <span>Size</span>
                                            <span>{formData.vestSize}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Next Steps */}
                                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                                    <h3 className="text-white font-bold text-xl mb-4">Next Steps</h3>
                                    <ul className="space-y-3 text-white/90 text-left">
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-[#ff8a00] mt-2 shrink-0" />
                                            <span>You&apos;ll receive a confirmation email with payment details</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-[#008020] mt-2 shrink-0" />
                                            <span>Complete your payment to secure your spot</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-[#ffde00] mt-2 shrink-0" />
                                            <span>Event details will be sent 48 hours before the walk</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-8">
                                    <Link href="/events/walk2fitness">
                                        <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-white/90 transition-colors flex-1">
                                            Learn About Event
                                        </button>
                                    </Link>
                                    <Link href="/">
                                        <button className="px-8 py-3 bg-[#008020] text-white font-semibold rounded-xl hover:bg-[#008020]/90 transition-colors flex-1">
                                            Return to Home
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative min-h-screen lg:min-h-screen py-16 md:py-20 lg:py-0 px-4 md:px-8 bg-gray-900 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/background.jpeg"
                        alt="Walk2Fitness Background"
                        fill
                        className="object-cover opacity-30 object-[center_25%]"
                        priority
                        quality={100}
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70" />
                </div>

                <div className="max-w-6xl mx-auto relative z-10 h-full flex flex-col justify-center min-h-[inherit]">
                    {/* Back Navigation */}
                    <div className="mb-8">
                        <Link href="/events/walk2fitness/vests" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                            <span>←</span>
                            <span>Back to Vest Selection</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Form Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-8 md:p-10"
                        >
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/20 mb-6">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-[#ff8a00]" />
                                        <div className="w-2 h-2 rounded-full bg-[#008020]" />
                                        <div className="w-2 h-2 rounded-full bg-[#ffde00]" />
                                    </div>
                                    <span className="text-white font-semibold text-sm tracking-wider">
                                        REGISTER FOR WALK2FITNESS 5.0
                                    </span>
                                </div>

                                <h1 className="text-[36px] md:text-[48px] font-black text-white mb-4">
                                    Complete Your <span className="text-[#ff8a00]">Registration</span>
                                </h1>
                                <p className="text-white/90">
                                    Fill in your details and select your vest size to complete registration
                                </p>
                            </div>

                            {/* Registration Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Details */}
                                <div className="space-y-4">
                                    <h3 className="text-white font-bold text-lg">Personal Information</h3>
                                    
                                    <div>
                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#ff8a00] focus:border-transparent"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-white/80 text-sm font-medium mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#ff8a00] focus:border-transparent"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white/80 text-sm font-medium mb-2">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#ff8a00] focus:border-transparent"
                                                placeholder="+234 801 234 5678"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Vest Selection */}
                                <div className="space-y-4">
                                    <h3 className="text-white font-bold text-lg">Vest Selection</h3>
                                    
                                    {/* Vest Type */}
                                    <div>
                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                            Vest Type *
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {vestTypes.map((type) => (
                                                <button
                                                    type="button"
                                                    key={type.id}
                                                    onClick={() => setFormData(prev => ({ ...prev, vestType: type.name }))}
                                                    className={`p-3 rounded-xl border-2 transition-all ${formData.vestType === type.name 
                                                        ? 'border-[#ff8a00] bg-[#ff8a00]/20' 
                                                        : 'border-white/20 bg-white/5 hover:border-white/40'
                                                    }`}
                                                    style={formData.vestType === type.name ? { borderColor: type.color } : {}}
                                                >
                                                    <div className="text-center">
                                                        <div className="text-white font-semibold">{type.name}</div>
                                                        <div className="text-white/60 text-sm">{type.price}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Vest Color */}
                                    <div>
                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                            Vest Color *
                                        </label>
                                        <div className="flex flex-wrap gap-3">
                                            {vestColors.map((color) => (
                                                <button
                                                    type="button"
                                                    key={color.id}
                                                    onClick={() => setFormData(prev => ({ ...prev, vestColor: color.hex }))}
                                                    className={`w-12 h-12 rounded-xl border-2 transition-all ${formData.vestColor === color.hex 
                                                        ? 'border-white ring-2 ring-white' 
                                                        : 'border-white/20 hover:border-white/40'
                                                    }`}
                                                    style={{ backgroundColor: color.hex }}
                                                    title={color.name}
                                                />
                                            ))}
                                        </div>
                                        <div className="text-white/70 text-sm mt-2">
                                            Selected: {vestColors.find(c => c.hex === formData.vestColor)?.name}
                                        </div>
                                    </div>

                                    {/* Vest Size */}
                                    <div>
                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                            Vest Size *
                                        </label>
                                        <select
                                            name="vestSize"
                                            value={formData.vestSize}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#ff8a00] focus:border-transparent"
                                        >
                                            <option value="">Select your size</option>
                                            {vestSizes.map((size) => (
                                                <option key={size.value} value={size.value} className="bg-gray-800">
                                                    {size.label} ({size.value})
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-white/70 text-sm mt-2">
                                            Choose your preferred vest size
                                        </div>
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                    <h4 className="text-white font-bold mb-3">Order Summary</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-white/80">
                                            <span>Vest Type:</span>
                                            <span className="font-semibold">{formData.vestType}</span>
                                        </div>
                                        <div className="flex justify-between text-white/80">
                                            <span>Color:</span>
                                            <span>{vestColors.find(c => c.hex === formData.vestColor)?.name}</span>
                                        </div>
                                        <div className="flex justify-between text-white/80">
                                            <span>Size:</span>
                                            <span>{formData.vestSize || 'Not selected'}</span>
                                        </div>
                                        <div className="pt-2 border-t border-white/10">
                                            <div className="flex justify-between text-white font-bold">
                                                <span>Total:</span>
                                                <span className="text-lg">{getTotalPrice()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-[#ff8a00] text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:shadow-[#ff8a00]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Processing...' : 'Complete Registration'}
                                </button>

                                <p className="text-white/60 text-sm text-center">
                                    By registering, you agree to our terms and conditions. Payment details will be sent via email.
                                </p>
                            </form>
                        </motion.div>

                        {/* Right: Info Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            {/* What's Included */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-8">
                                <h3 className="text-white font-bold text-xl mb-6">
                                    Your Registration <span className="text-[#ff8a00]">Includes</span>
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        'Official Walk2Fitness 5.0 Vest',
                                        'Event Participation Certificate',
                                        'Free Medical Health Screening',
                                        'Hydration Station Access',
                                        'Community Networking Session',
                                        'Safety & Medical Support'
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-[#008020]/40 border border-[#008020]/60 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-[#008020]" />
                                            </div>
                                            <span className="text-white/90">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Support */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-8">
                                <h3 className="text-white font-bold text-xl mb-6">
                                    Need <span className="text-[#ff8a00]">Help?</span>
                                </h3>
                                <div className="space-y-4">
                                    <p className="text-white/90">
                                        Our team is available to assist you with registration or answer any questions.
                                    </p>
                                    <div className="space-y-3">
                                        <a
                                            href="https://wa.me/2348163702286"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-3 px-6 py-3 bg-[#008020] text-white font-semibold rounded-xl hover:bg-[#008020]/90 transition-colors"
                                        >
                                            <span>Chat on WhatsApp</span>
                                        </a>
                                        <a
                                            href="mailto:fitnessambassador84@gmail.com"
                                            className="flex items-center justify-center gap-3 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                                        >
                                            <span>Email Support</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Security Badge */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-6 text-center">
                                <div className="text-white/80 text-sm space-y-2">
                                    <div className="font-semibold text-[#008020]">Secure Registration</div>
                                    <div>Trusted Process</div>
                                    <div>Data Privacy Protected</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegisterPage;