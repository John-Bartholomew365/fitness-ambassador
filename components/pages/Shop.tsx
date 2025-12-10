"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import { fadeUp, staggerContainer, viewport } from '../../utils/animation';
import { toast } from 'sonner';

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 't-shirts', 'tank-tops', 'hoodies', 'accessories'];

  const products = [
    {
      id: 1,
      name: 'FA Classic Tee',
      category: 't-shirts',
      price: 5000,
      image: null,
      description: 'Premium cotton fitness t-shirt with FA logo',
    },
    {
      id: 2,
      name: 'Performance Tank Top',
      category: 'tank-tops',
      price: 4500,
      image: null,
      description: 'Breathable workout tank for maximum performance',
    },
    {
      id: 3,
      name: 'FA Training Hoodie',
      category: 'hoodies',
      price: 8000,
      image: null,
      description: 'Comfortable hoodie for pre and post workout',
    },
    {
      id: 4,
      name: 'Gym Bag',
      category: 'accessories',
      price: 6000,
      image: null,
      description: 'Spacious gym bag with multiple compartments',
    },
    {
      id: 5,
      name: 'FA Pro Tee',
      category: 't-shirts',
      price: 5500,
      image: null,
      description: 'Moisture-wicking performance t-shirt',
    },
    {
      id: 6,
      name: 'Muscle Tank',
      category: 'tank-tops',
      price: 4000,
      image: null,
      description: 'Sleeveless tank for intense workouts',
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (productName: string) => {
    toast.success(`${productName} added to cart!`);
  };

  return (
    <div className="min-h-screen py-20">
      {/* Hero */}
      <section className="py-20 bg-linear-to-br from-secondary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            <motion.div variants={fadeUp} className="inline-block px-6 py-2 bg-secondary/10 border border-secondary rounded-full">
              <span className="text-secondary font-bold text-sm">FA GYM WEARS</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold text-foreground">
              PREMIUM
              <br />
              <span className="text-secondary">FITNESS APPAREL</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl text-foreground/70">
              High-quality gym wear designed for performance and style
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-background border-2 border-border focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-foreground/60" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-background border border-border text-foreground hover:border-secondary'
                    }`}
                  >
                    {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={fadeUp}
                className="group bg-background rounded-3xl border-2 border-border hover:border-secondary transition-all duration-300 hover:shadow-xl overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-linear-to-br from-secondary/10 to-accent/10 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4 p-8">
                      <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto">
                        <span className="text-4xl font-bold text-secondary-foreground">FA</span>
                      </div>
                      <p className="text-lg font-bold text-foreground font-display">{product.name}</p>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
                    <p className="text-foreground/70 text-sm">{product.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <p className="text-2xl font-bold text-secondary">₦{product.price.toLocaleString()}</p>
                    <button
                      onClick={() => handleAddToCart(product.name)}
                      className="px-6 py-3 bg-secondary text-secondary-foreground rounded-2xl font-bold hover:bg-secondary/90 transition-all duration-200 flex items-center space-x-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-foreground/60">No products found matching your criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
