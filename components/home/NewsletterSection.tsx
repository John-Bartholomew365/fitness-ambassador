import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { fadeUp, viewport } from '../../utils/animation';
import { toast } from 'sonner';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success('Successfully subscribed to our newsletter!');
    setEmail('');
    setLoading(false);
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-accent to-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full">
            <Mail className="w-10 h-10 text-white" />
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              STAY IN THE LOOP
            </h2>
            <p className="text-xl text-white/90">
              Get exclusive fitness tips, event updates, and early access to new programs. 
              Join our community of fitness enthusiasts!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-white/50 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-foreground text-background rounded-2xl font-bold hover:bg-foreground/90 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{loading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}</span>
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white font-display">1000+</div>
              <div className="text-white/80 text-sm">Subscribers</div>
            </div>
            <div className="h-12 w-px bg-white/30" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white font-display">WEEKLY</div>
              <div className="text-white/80 text-sm">Updates</div>
            </div>
            <div className="h-12 w-px bg-white/30" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white font-display">FREE</div>
              <div className="text-white/80 text-sm">Forever</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
