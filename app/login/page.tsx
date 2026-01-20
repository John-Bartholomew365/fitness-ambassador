'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { AuthProvider, useAuth } from '@/components/contexts/AuthContext';

interface LoginFormData {
    email: string;
    password: string;
}

interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
    user: {
        id: string;
        email: string;
        role: string;
    };
}

const AdminLoginPage = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!formData.email.trim() || !formData.password.trim()) {
            toast.error('Please enter both email and password', { duration: 2000 });
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            toast.error('Please enter a valid email address', { duration: 2000 });
            return;
        }

        setIsLoading(true);

        try {
            // Show loading toast
            const loadingToast = toast.loading('Logging in...');

            // Prepare login data
            const loginData = {
                email: formData.email.trim(),
                password: formData.password.trim()
            };

            // Submit to API
            const response = await fetch('/api/admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const result: LoginResponse = await response.json();

            if (!response.ok) {
                // Remove loading toast and show error
                toast.remove(loadingToast);
                toast.error(result.message || 'Login failed', { duration: 2000 });
                throw new Error(result.message || 'Login failed');
            }

            if (result.success) {
                // Remove loading toast
                toast.remove(loadingToast);

                // Show success toast with SHORT duration (1500ms = 1.5 seconds)
                toast.success('Admin login successful!', {
                    duration: 1500,
                    position: 'top-center',
                });

                // Use auth context to handle login
                login(result.token, result.user, rememberMe);

                // Redirect after 1.5 seconds (same as toast duration)
                setTimeout(() => {
                    router.push('/admin/dashboard');
                }, 1500);
            } else {
                throw new Error(result.message || 'Login failed');
            }

        } catch (error) {
            console.error('Login error:', error);
            toast.error(
                error instanceof Error ? error.message : 'An unexpected error occurred',
                { duration: 2000 }
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: keyof LoginFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-white flex items-center justify-center p-4">
            {/* Background decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ff8a00]/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#008020]/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ffde00]/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Login Card */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                    {/* Card Header */}
                    <div className="p-8 text-center border-b border-gray-100">
                        <div className="flex justify-center mb-6">
                            <div className="relative w-20 h-20">
                                <Image
                                    src="/fa-logo3.png"
                                    alt="Fitness Ambassador Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Admin Portal
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Sign in to manage your fitness platform
                        </p>
                    </div>

                    {/* Card Body */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        disabled={isLoading}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008020] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="admin@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        disabled={isLoading}
                                        className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008020] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={isLoading}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        disabled={isLoading}
                                        className="w-4 h-4 text-[#008020] focus:ring-[#008020] rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                    <span className="text-sm text-gray-600">Remember me</span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isLoading || !formData.email || !formData.password}
                                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                className={`w-full py-3.5 rounded-xl font-bold text-lg transition-all duration-300 cursor-pointer ${isLoading || !formData.email || !formData.password
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-[#ff8a00] text-white hover:bg-[#e67a00] hover:shadow-2xl hover:shadow-[#ff8a00]/25'
                                    }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : (
                                    'Sign In'
                                )}
                            </motion.button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center">
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <span className="px-4 text-sm text-gray-500">Or</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </div>

                        {/* Back to Home */}
                        <div className="text-center">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to homepage
                            </Link>
                        </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-6 bg-gray-50 border-t border-gray-100 rounded-b-3xl text-center">
                        <p className="text-xs text-gray-500">
                            © {new Date().getFullYear()} Fitness Ambassador. All rights reserved.
                            <br />
                            <span className="text-[10px]">Secure admin access only</span>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// Wrap with AuthProvider for login page
const LoginPageWrapper = () => (
    <AuthProvider requireAuth={false}>
        <AdminLoginPage />
    </AuthProvider>
);

export default LoginPageWrapper;