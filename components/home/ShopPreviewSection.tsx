import { motion, useReducedMotion, Easing } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const products = [
    {
        id: 1,
        name: 'FA Performance Tank',
        price: 15000,
        image: '/wear18.jpeg',
        category: 'Tops',
    },
    {
        id: 2,
        name: 'FA Power Leggings',
        price: 12000,
        image: '/wear17.jpeg',
        category: 'Bottoms',
    },
    {
        id: 3,
        name: 'FA Training Shorts',
        price: 18000,
        image: '/wear4.jpeg',
        category: 'Bottoms',
    },
    {
        id: 4,
        name: 'FA Armless Shorts',
        price: 10000,
        image: '/wear13.jpeg',
        category: 'Tops',
    },
];

const ShopPreviewSection = () => {
    const shouldReduceMotion = useReducedMotion();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as Easing },
        },
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <section className="section-padding bg-background">
            <div className="container-max">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    {/* Section Header */}
                    <motion.div variants={itemVariants} className="text-center mb-12">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 text-secondary-foreground rounded-full text-sm font-semibold mb-6">
                            <ShoppingBag className="w-4 h-4" />
                            FA Gym Wears
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
                            GEAR UP FOR <span className="text-gradient bg-clip-text text-transparent bg-linear-to-r from-[#008020] via-[#ffde00] to-[#ff8a00]">SUCCESS</span>
                        </h2>
                        <p className="text-[16px] text-muted-foreground lg:w-[470px] w-auto mx-auto leading-tight">
                            Premium fitness apparel designed for performance and style. Look good, train hard, achieve more.
                        </p>
                    </motion.div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                className="group"
                            >
                                <Link href="/shop" className="block">
                                    <div className="card-elevated overflow-hidden">
                                        <div className="aspect-square overflow-hidden bg-muted relative">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                priority={index < 2} // Prioritize loading first 2 images
                                            />
                                        </div>
                                        <div className="p-4">
                                            <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                                            <h3 className="font-semibold text-foreground mb-2 line-clamp-1">{product.name}</h3>
                                            <p className="font-display text-lg text-primary">{formatPrice(product.price)}</p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div variants={itemVariants} className="text-center">
                        <Link
                            href="/shop"
                            className="btn-primary inline-flex items-center gap-2 group"
                        >
                            Shop All Products
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ShopPreviewSection;
