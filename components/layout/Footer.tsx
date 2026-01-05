import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Mail, Phone, MapPin, Linkedin, } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";
import Image from 'next/image';
import { FaTiktok, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About', path: '/about' },
    { name: 'All Events', path: '/events' },
    { name: 'Walk2Fitness', path: '/events/walk2fitness' },
    { name: 'Jam2Fit', path: '/events/jam2fit' },
    { name: 'Workout Compass', path: '/innovator/workout-compass' },
    { name: 'Training', path: '/innovator/training' },
    { name: 'Gym Wears', path: '/innovator/gym-wears' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'FAQ', path: '/faq' },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://www.instagram.com/fitness_ambassadorr?igsh=MXdleGcxNTY2a2Jiaw%3D%3D&utm_source=qr',
      label: 'Instagram'
    },
    {
      icon: FaTiktok,
      href: 'https://www.tiktok.com/@fitness_ambassador1?_r=1&_t=ZS-92KxrL9eBQi',
      label: 'Instagram'
    },

    {
      icon: FaXTwitter,
      href: 'https://x.com/ajisafe_akorede?s=21',
      label: 'Twitter'
    },
    // { 
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/sulaiman-ajisafe-30061b16a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      label: 'Twitter'
    },
    // { 
    //   icon: Facebook, 
    //   href: 'https://www.facebook.com/profile.php?id=100067125615399', 
    //   label: 'Facebook' 
    // },
    // { 
    //   icon: Youtube, 
    //   href: 'https://www.youtube.com/@FitnessAmbassador247/', 
    //   label: 'YouTube' 
    // },
  ];

  // WhatsApp message with prefilled text
  const whatsappNumber = '2348163702286';
  const whatsappMessage = encodeURIComponent(`Hello Fitness Ambassador! I'm interested in your fitness programs. Can you tell me more about:\n\n1. Your training sessions\n2. Upcoming events\n3. The Workout Compass book\n\nThank you!`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="text-background">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex lg:justify-start justify-center **:text-background!">
              <Image src="/fa-logo3.png" alt="Fitness Ambassador Logo" width={150} height={40} />
            </div>
            <p className="text-black/70 text-sm leading-relaxed lg:text-left text-center">
              Your fitness journey starts here. Transform your body, strengthen your mindset, and achieve real results.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl mb-6 text-black">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl mb-6 text-black">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-foreground/70" />
                <a
                  href="mailto:fitnessambassador84@gmail.com"
                  className="text-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  fitnessambassador84@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp size={18} className="text-foreground/70" />
                <a
                  href={whatsappUrl}
                  className="text-foreground/70 hover:text-primary transition-colors text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +234 816 370 2286
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={18} className="text-foreground/70" />
                <a
                  href="tel:+2348163702286"
                  className="text-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  +234 816 370 2286
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-foreground/70 mt-0.5" />
                <span className="text-foreground/70 text-sm">
                  Ilorin, Kwara State, Nigeria
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-xl mb-6 text-black">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank" // Opens in new tab
                  rel="noopener noreferrer" // Security best practice
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-foreground/70 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/50 text-sm">
            © {currentYear} Fitness Ambassador - Ajisafe Sulaiman. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-foreground/50 hover:text-foreground text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-foreground/50 hover:text-foreground text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;