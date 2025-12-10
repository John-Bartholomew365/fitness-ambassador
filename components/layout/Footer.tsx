import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">FA</span>
              </div>
              <span className="text-xl font-bold font-display">FITNESS AMBASSADOR</span>
            </div>
            <p className="text-background/80 text-sm">
              Empowering individuals through fitness events, personal training, and comprehensive wellness solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-display">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li><Link href="/events" className="text-background/80 hover:text-primary transition-colors">Events</Link></li>
              <li><Link href="/book" className="text-background/80 hover:text-primary transition-colors">Workout Compass</Link></li>
              <li><Link href="/training" className="text-background/80 hover:text-primary transition-colors">Training</Link></li>
              <li><Link href="/shop" className="text-background/80 hover:text-primary transition-colors">Shop</Link></li>
              <li><Link href="/gallery" className="text-background/80 hover:text-primary transition-colors">Gallery</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-display">CONTACT</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-background/80">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">info@fitnessambassador.com</span>
              </li>
              <li className="flex items-start space-x-2 text-background/80">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">+234 XXX XXX XXXX</span>
              </li>
              <li className="flex items-start space-x-2 text-background/80">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Ilorin, Nigeria</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-display">FOLLOW US</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-primary-foreground" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-secondary/80 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-secondary-foreground" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-accent-foreground" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-primary-foreground" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/60 text-sm">
              © {new Date().getFullYear()} Fitness Ambassador - Ajisafe Sulaiman. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-background/60 hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-background/60 hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
