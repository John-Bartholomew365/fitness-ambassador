'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
  isLoading?: boolean;
  onContact?: () => void;
}

interface DropdownItem {
  label: string;
  route: string;
  description?: string;
}

interface DropdownMenu {
  label: string;
  items: DropdownItem[];
}

export default function Navbar({ isLoading }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Define dropdown menus (ONLY these 3)
  const dropdownMenus: DropdownMenu[] = [
    {
      label: 'Events',
      items: [
        { label: 'Walk2Fitness', route: '/events/walk2fitness' },
        { label: 'Jam2Fit', route: '/events/jam2fit' },
        { label: 'Afro Groove', route: '/events/afro-groove' },
        { label: 'Aerobics & Icebath', route: '/events/aerobics-icebath' },
        // { label: 'Vest', route: '/events/vest' },
        { label: 'Every Sunday Cycling', route: '/events/every-sunday-cycling' },
        { label: 'Sponsors', route: '/events/sponsors' },
      ]
    },
    {
      label: 'Resources',
      items: [
        { label: 'Blog', route: '/blog' },
        { label: 'Gallery', route: '/gallery' },
        { label: 'FAQ', route: '/faq' },
        { label: 'Contact', route: '/contact' },
      ]
    },
    {
      label: 'The Innovator',
      items: [
        { label: 'Innovator Profile', route: '/innovator' },
        { label: 'About Innovator', route: '/innovator/about' },
        { label: 'Certification', route: '/innovator/certification' },
        { label: 'Workout Compass', route: '/innovator/workout-compass' },
        { label: 'Gym Wears', route: '/innovator/gym-wears' },
      ]
    }
  ];

  const handleNavigation = (route: string) => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    router.push(route);
  };

  const handleViewTrainingPlans = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    router.push('/training');
  };

  const toggleDropdown = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="/"
            onClick={() => {
              setMobileMenuOpen(false);
              setActiveDropdown(null);
            }}
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

          {/* Desktop Navigation - ONLY dropdowns centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-2" ref={dropdownRef}>
              {dropdownMenus.map((menu) => (
                <div key={menu.label} className="relative">
                  <button
                    onClick={() => toggleDropdown(menu.label)}
                    className="flex items-center text-foreground hover:text-primary font-medium transition-colors duration-200 cursor-pointer hover:scale-105 active:scale-95 whitespace-nowrap text-base px-3 py-2"
                    disabled={isLoading}
                  >
                    {menu.label}
                    {activeDropdown === menu.label ? (
                      <ChevronUp className="ml-1.5 w-4 h-4" />
                    ) : (
                      <ChevronDown className="ml-1.5 w-4 h-4" />
                    )}
                  </button>

                  {/* Desktop Dropdown */}
                  <AnimatePresence>
                    {activeDropdown === menu.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-lg z-50 py-2"
                      >
                        {menu.items.map((item) => (
                          <button
                            key={item.route}
                            onClick={() => handleNavigation(item.route)}
                            className="w-full text-left px-4 py-3 hover:bg-[#FAFAFA] text-foreground hover:text-primary transition-colors cursor-pointer text-sm"
                            disabled={isLoading}
                          >
                            {item.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* View Training Plans Button - Right side */}
          <div className="hidden lg:flex items-center">
            <Button
              onClick={handleViewTrainingPlans}
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-2xl font-semibold hover:bg-primary/90 transition-colors duration-200 cursor-pointer hover:scale-105 active:scale-95 whitespace-nowrap text-base"
              disabled={isLoading}
            >
              View training plans
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 cursor-pointer hover:scale-110 active:scale-95 transition-transform rounded-lg hover:bg-[#FAFAFA]"
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
            <div className="container mx-auto px-4 py-6 h-full flex flex-col">
              {/* Dropdown menus in mobile */}
              <div className="flex flex-col space-y-1 mb-6 grow">
                {dropdownMenus.map((menu) => (
                  <div key={menu.label} className="border-b border-border/50 last:border-b-0">
                    <button
                      onClick={() => toggleDropdown(menu.label)}
                      className="flex items-center justify-between w-full text-foreground hover:text-primary font-medium transition-colors cursor-pointer hover:bg-[#FAFAFA] py-4 px-4 rounded-lg text-left text-base"
                      disabled={isLoading}
                    >
                      {menu.label}
                      {activeDropdown === menu.label ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>

                    {/* Mobile Dropdown Items */}
                    <AnimatePresence>
                      {activeDropdown === menu.label && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-4 pr-2 pb-2"
                        >
                          <div className="flex flex-col space-y-1 py-2 border-l border-border/50 ml-2">
                            {menu.items.map((item) => (
                              <button
                                key={item.route}
                                onClick={() => handleNavigation(item.route)}
                                className="text-left py-3 px-4 text-foreground/80 hover:text-primary hover:bg-[#FAFAFA] rounded-lg transition-colors cursor-pointer text-sm"
                                disabled={isLoading}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              
              {/* Bottom section with Book Session Button */}
              <div className="mt-auto pt-6 border-t border-border">
                <Button
                  onClick={handleViewTrainingPlans}
                  className="w-full py-3.5 text-base bg-primary text-primary-foreground rounded-[10px] font-semibold hover:bg-primary/90 transition-colors cursor-pointer mb-4"
                  disabled={isLoading}
                >
                  View training plans
                </Button>
                
                {/* Footer - now properly positioned at the bottom */}
                <div className="text-center text-sm text-muted-foreground pb-4">
                  <p>The Fitness Ambassador © {new Date().getFullYear()}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}