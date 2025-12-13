'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
  isLoading?: boolean;
  onContact?: () => void;
}

export default function Navbar({ isLoading, }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const pathname = usePathname();
  const router = useRouter();
  // const isHomePage = pathname === '/';

  // Define navigation items - all with page routes
  const navItems = [
    { label: 'About', id: 'about', route: '/about' },
    { label: 'Events', id: 'events', route: '/events' },
    { label: 'Book', id: 'book', route: '/book' },
    { label: 'Training', id: 'training', route: '/training' },
    { label: 'Shop', id: 'shop', route: '/shop' },
    { label: 'Gallery', id: 'gallery', route: '/gallery' },
    { label: 'Contact', id: 'contact', route: '/contact' },
  ];

  // Function to handle navigation
  const handleNavigation = (item: typeof navItems[0]) => {
    setMobileMenuOpen(false);
    router.push(item.route);
  };

  // Function to handle "Book a Session" button
  const handleBookSession = () => {
    setMobileMenuOpen(false);
    router.push('/book');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Always links to home */}
          <Link 
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer shrink-0"
          >
            <div className="relative w-12 h-12 md:w-16 md:h-16">
              <Image
                src="/fa-logo3.png"
                alt="Fitness Ambassador Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 48px, 64px"
              />
            </div>
            <span className="hidden sm:block text-lg md:text-xl font-bold text-foreground font-display">
              FITNESS AMBASSADOR
            </span>
          </Link>

          {/* Desktop Navigation - Reduced spacing */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className="text-foreground hover:text-primary font-medium transition-colors duration-200 cursor-pointer hover:scale-105 active:scale-95 whitespace-nowrap text-sm md:text-base px-2 py-1"
                disabled={isLoading}
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={handleBookSession}
              className="ml-2 px-4 py-2 md:px-5 md:py-2.5 bg-primary text-primary-foreground rounded-2xl font-semibold hover:bg-primary/90 transition-colors duration-200 cursor-pointer hover:scale-105 active:scale-95 whitespace-nowrap text-sm md:text-base"
              disabled={isLoading}
            >
              Book a Session
            </Button>
          </div>

          {/* Mobile Menu Button - Only one X icon here */}
          <button
            className="lg:hidden p-2 cursor-pointer hover:scale-110 active:scale-95 transition-transform rounded-lg hover:bg-accent/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            disabled={isLoading}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full Height */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-background fixed inset-0 top-16 md:top-20 z-40 overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-6">
              {/* REMOVED the extra close button here */}
              
              {/* Navigation items in column layout with reduced spacing */}
              <div className="flex flex-col space-y-2 mb-6">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item)}
                    className="text-foreground hover:text-primary font-medium transition-colors cursor-pointer hover:bg-accent/10 w-full py-3 px-4 rounded-lg text-left text-base"
                    disabled={isLoading}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              
              {/* Book Session Button */}
              <div className="mt-6 pt-6 border-t border-border">
                <Button
                  onClick={handleBookSession}
                  className="w-full py-3.5 text-base bg-primary text-primary-foreground rounded-2xl font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
                  disabled={isLoading}
                >
                  Book a Session
                </Button>
              </div>
              
              {/* Optional: Add extra content or footer */}
              <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground">
                <p>Fitness Ambassador © {new Date().getFullYear()}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}