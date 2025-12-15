import { motion } from 'framer-motion';
import { Shield, Eye, Database, Lock, Share2, Mail, UserCheck, Trash2 } from 'lucide-react';

const sections = [
  {
    icon: Eye,
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us, including:

Personal Information:
• Name, email address, phone number
• Billing and shipping address
• Payment information (processed securely by our payment partners)

Usage Information:
• Pages visited and actions taken on our website
• Device information and browser type
• IP address and location data

We collect this information when you:
• Create an account or make a purchase
• Register for events or training sessions
• Subscribe to our newsletter
• Contact us or submit forms`
  },
  {
    icon: Database,
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:

• Process transactions and send related information
• Send you event confirmations and training schedules
• Respond to your inquiries and support requests
• Send promotional communications (with your consent)
• Improve our website and services
• Comply with legal obligations

We do not sell, rent, or trade your personal information to third parties for marketing purposes.`
  },
  {
    icon: Lock,
    title: "3. Data Security",
    content: `We implement appropriate technical and organizational security measures to protect your personal information, including:

• SSL/TLS encryption for data transmission
• Secure payment processing through trusted providers
• Regular security assessments and updates
• Access controls limiting who can view your data
• Secure data storage with regular backups

While we strive to protect your information, no method of transmission over the internet is 100% secure.`
  },
  {
    icon: Share2,
    title: "4. Information Sharing",
    content: `We may share your information with:

Service Providers:
• Payment processors for transaction handling
• Shipping partners for order delivery
• Email service providers for communications
• Analytics providers to improve our services

Legal Requirements:
We may disclose information if required by law or to protect our rights, property, or safety.

Business Transfers:
In the event of a merger or acquisition, your information may be transferred to the new entity.`
  },
  {
    icon: UserCheck,
    title: "5. Your Rights",
    content: `You have the right to:

• Access your personal information
• Correct inaccurate or incomplete data
• Request deletion of your data (subject to legal requirements)
• Opt-out of marketing communications
• Withdraw consent where applicable
• Lodge a complaint with a supervisory authority

To exercise these rights, please contact us using the details provided below.`
  },
  {
    icon: Mail,
    title: "6. Marketing Communications",
    content: `Newsletter & Promotions:
• We only send marketing emails with your explicit consent
• You can unsubscribe at any time using the link in our emails
• Even after unsubscribing, you may receive transactional emails

Event Updates:
• If you register for an event, you'll receive relevant updates
• These are considered transactional and not marketing communications`
  },
  {
    icon: Trash2,
    title: "7. Data Retention",
    content: `We retain your personal information for as long as necessary to:

• Provide our services to you
• Comply with legal obligations
• Resolve disputes and enforce agreements

When data is no longer needed, we securely delete or anonymize it. Purchase records may be retained for accounting purposes as required by law.`
  }
];

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-linear-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">Your Privacy Matters</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Privacy <span className='text-gradient'>Policy</span>
            </h1>
            <p className="text-[16px] text-muted-foreground lg:w-[450px] w-auto mx-auto">
              We are committed to protecting your privacy and ensuring the security of your personal information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: December 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-primary/5 rounded-2xl lg:p-8 p-4 mb-10"
          >
            <p className="text-muted-foreground leading-relaxed">
              Fitness Ambassador (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, make purchases, register for events, or use our services.
            </p>
          </motion.div>

          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="mb-10"
            >
              <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground pt-2">
                    {section.title}
                  </h2>
                </div>
                <div className="lg:pl-16 pl-0">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-primary rounded-2xl p-8 text-center text-primary-foreground"
          >
            <h3 className="text-xl font-bold mb-4">
              Contact Us About Privacy
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              If you have questions about this Privacy Policy or how we handle your data, please reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:fitnessambassador84@gmail.com"
                className="inline-block bg-background text-foreground font-bold py-3 px-6 rounded-2xl hover:bg-background/90 transition-colors"
              >
                Email Us
              </a>
              <a
                href="/contact"
                className="inline-block bg-primary-foreground/20 text-primary-foreground font-bold py-3 px-6 rounded-2xl hover:bg-primary-foreground/30 transition-colors border border-primary-foreground/30"
              >
                Contact Form
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
