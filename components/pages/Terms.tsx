import { motion } from 'framer-motion';
import { FileText, Shield, AlertCircle, CreditCard, Package, RefreshCcw } from 'lucide-react';

const sections = [
    {
        icon: FileText,
        title: "1. Acceptance of Terms",
        content: `By accessing and using the Fitness Ambassador website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.

These terms apply to all visitors, users, and others who access or use our website, products, and services.`
    },
    {
        icon: Shield,
        title: "2. Use of Services",
        content: `Our services include but are not limited to:
• Fitness events and workshops
• Personal training and consultation
• Online coaching programs
• Fitness products (FA Gym Wears)
• Digital products (Workout Compass book)

You agree to use our services only for lawful purposes and in accordance with these terms. You must not use our services in any way that could damage, disable, or impair our website or interfere with any other party's use of our services.`
    },
    {
        icon: CreditCard,
        title: "3. Payment Terms",
        content: `All prices are displayed in Nigerian Naira (NGN) unless otherwise stated. Payment must be made in full at the time of purchase or booking.

We accept various payment methods including bank transfers, card payments, and mobile money. All transactions are processed securely through our payment partners.

Prices are subject to change without prior notice, but changes will not affect orders already placed.`
    },
    {
        icon: Package,
        title: "4. Products & Shipping",
        content: `FA Gym Wears:
• All products are subject to availability
• We strive to display accurate colors, but actual colors may vary slightly
• Shipping is currently available within Nigeria only
• Delivery times vary based on location (typically 3-7 business days)
• Risk of loss passes to you upon delivery

Digital Products:
• Workout Compass book is delivered via email upon purchase
• Digital products are non-refundable once downloaded`
    },
    {
        icon: RefreshCcw,
        title: "5. Returns & Refunds",
        content: `Physical Products:
• Returns accepted within 14 days of delivery
• Items must be unworn, unwashed, with original tags attached
• Customer is responsible for return shipping costs
• Refunds processed within 5-7 business days after receiving returned items

Event Registrations:
• Full refund available if cancelled 7+ days before event
• 50% refund if cancelled 3-7 days before event
• No refund for cancellations less than 3 days before event

Training Sessions:
• 24-hour cancellation notice required for full refund
• No-shows will be charged the full session fee`
    },
    {
        icon: AlertCircle,
        title: "6. Health Disclaimer",
        content: `Our fitness programs, events, and content are for informational and educational purposes only. You should consult with a healthcare professional before starting any new exercise program, especially if you have any medical conditions.

By participating in our events or following our training programs, you acknowledge that:
• Physical exercise carries inherent risks
• You participate at your own risk
• You are responsible for your own health and safety
• We are not liable for any injuries sustained during participation

You agree to inform our trainers of any health conditions or limitations before participating in any activity.`
    }
];

const Terms = () => {
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
                        <div className='flex flex-col'>
                            <div className="inline-flex items-center mx-auto justify-center gap-2 bg-primary/10 text-primary px-4 py-2 w-fit rounded-full mb-6">
                                <FileText className="w-5 h-5" />
                                <span className="font-semibold">Legal</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-gradient">
                                Terms & Conditions
                            </h1>
                        </div>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Please read these terms carefully before using our services.
                        </p>
                        <p className="text-sm text-muted-foreground mt-4">
                            Last updated: December 2024
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Terms Content */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
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
                        className="bg-primary/5 rounded-2xl p-8 text-center"
                    >
                        <h3 className="text-xl font-bold text-foreground mb-4">
                            Questions About Our Terms?
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            If you have any questions about these Terms & Conditions, please contact us.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block bg-primary text-primary-foreground font-bold py-3 px-6 rounded-2xl hover:bg-primary/90 transition-colors"
                        >
                            Contact Us
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Terms;
