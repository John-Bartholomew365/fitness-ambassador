'use client';

import { useState } from 'react';
import { motion, useReducedMotion, Easing, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, ShoppingCart, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useCart } from '../loaders/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  sizes: string[];
  inStock: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'FA Performance Tank',
    price: 15000,
    image: '/wear1.jpeg',
    category: 'Tops',
    description: 'Lightweight, breathable tank top designed for intense workouts.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
  },
  {
    id: 2,
    name: 'FA Training Shorts',
    price: 12000,
    image: '/wear2.jpeg',
    category: 'Bottoms',
    description: 'Premium training shorts with flexible waistband.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
  },
  {
    id: 3,
    name: 'FA Power Leggings',
    price: 18000,
    image: '/wear3.jpeg',
    category: 'Bottoms',
    description: 'High-waisted compression leggings with hidden pocket.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
  },
  {
    id: 4,
    name: 'FA Sports Bra',
    price: 10000,
    image: '/wear4.jpeg',
    category: 'Tops',
    description: 'Medium-support sports bra with removable padding.',
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
  },
  {
    id: 5,
    name: 'FA Compression Tee',
    price: 14000,
    image: '/wear5.jpeg',
    category: 'Tops',
    description: 'Form-fitting compression t-shirt for muscle support.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
  },
  {
    id: 6,
    name: 'FA Jogger Pants',
    price: 20000,
    image: '/wear6.jpeg',
    category: 'Bottoms',
    description: 'Stylish joggers perfect for training or casual wear.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: false,
  },
  {
    id: 7,
    name: 'FA Premium Hoodie',
    price: 25000,
    image: '/wear7.jpeg',
    category: 'Tops',
    description: 'Cozy hoodie for post-workout recovery.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
  },
  {
    id: 8,
    name: 'FA Flex Leggings',
    price: 16000,
    image: '/wear8.jpeg',
    category: 'Bottoms',
    description: 'Flexible leggings with four-way stretch.',
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
  },
  {
    id: 9,
    name: 'FA Workout Jacket',
    price: 22000,
    image: '/wear9.jpeg',
    category: 'Tops',
    description: 'Lightweight jacket perfect for warm-ups.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
  },
  {
    id: 10,
    name: 'FA Performance Shorts',
    price: 11000,
    image: '/wear10.jpeg',
    category: 'Bottoms',
    description: 'Performance shorts with secure pockets.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
  },
  {
    id: 11,
    name: 'FA Crop Top',
    price: 9000,
    image: '/wear11.jpeg',
    category: 'Tops',
    description: 'Stylish crop top for yoga or summer wear.',
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
  },
  {
    id: 12,
    name: 'FA Compression Shorts',
    price: 13000,
    image: '/wear12.jpeg',
    category: 'Bottoms',
    description: 'Compression shorts for muscle support.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: false,
  },
  {
    id: 13,
    name: 'FA Running Top',
    price: 12500,
    image: '/wear13.jpeg',
    category: 'Tops',
    description: 'Breathable running top with moisture-wicking.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
  },
  {
    id: 14,
    name: 'FA Training Pants',
    price: 19000,
    image: '/wear14.jpeg',
    category: 'Bottoms',
    description: 'Comfortable training pants with adjustable waist.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
  },
  {
    id: 15,
    name: 'FA Gym Vest',
    price: 8500,
    image: '/wear15.jpeg',
    category: 'Tops',
    description: 'Lightweight vest for maximum ventilation.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
  },
  {
    id: 16,
    name: 'FA Cycling Shorts',
    price: 17000,
    image: '/wear16.jpeg',
    category: 'Bottoms',
    description: 'Padded cycling shorts for long rides.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
  },
  {
    id: 17,
    name: 'FA Long Sleeve Top',
    price: 14500,
    image: '/wear17.jpeg',
    category: 'Tops',
    description: 'Long sleeve top for cooler workouts.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
  },
  {
    id: 18,
    name: 'FA Training Leggings',
    price: 21000,
    image: '/wear18.jpeg',
    category: 'Bottoms',
    description: 'Training leggings with compression fit.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
  },
];

const categories = ['All', 'Tops', 'Bottoms'];

const Shop = () => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Use Cart Context
  const { cart, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity } = useCart();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
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

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product, size: string) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    }, size);
    
    toast.success(`${product.name} (${size}) added to cart!`);
    setSelectedProduct(null);
    setSelectedSize('');
  };

  const handleRemoveFromCart = (productId: number, size: string) => {
    removeFromCart(productId, size);
  };

  const handleUpdateQuantity = (productId: number, size: string, delta: number) => {
    updateQuantity(productId, size, delta);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-linear-to-b from-muted to-background">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 text-secondary-foreground rounded-full text-sm font-semibold mb-6">
              <ShoppingBag className="w-4 h-4" />
              FA Gym Wears
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              SHOP PREMIUM <span className="text-gradient">GEAR</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Elevate your training with our high-quality fitness apparel designed for peak performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-6 border-b border-border sticky top-16 md:top-20 bg-background/95 backdrop-blur-md z-30">
        <div className="container-max">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80 lg:px-0 px-4">
              <Search className="absolute lg:left-3 left-7 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'bg-primary text-primary-foreground cursor-pointer' : ''}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Cart Button */}
            <Button
              variant="outline"
              className="relative cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
                onClick={() => {
                  if (product.inStock) {
                    setSelectedProduct(product);
                    setSelectedSize('');
                  }
                }}
              >
                <div className={`card-elevated overflow-hidden ${!product.inStock ? 'opacity-60' : ''}`}>
                  <div className="aspect-square overflow-hidden bg-muted relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={product.id <= 4}
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
                        <span className="bg-foreground text-background px-3 py-1 rounded-full text-sm font-semibold">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-1">{product.name}</h3>
                    <p className="font-display text-lg text-primary">{formatPrice(product.price)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl">
          {selectedProduct && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-square overflow-hidden rounded-2xl bg-muted relative">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <DialogHeader>
                  <p className="text-sm text-muted-foreground">{selectedProduct.category}</p>
                  <DialogTitle className="font-display text-2xl">{selectedProduct.name}</DialogTitle>
                </DialogHeader>
                <p className="font-display text-3xl text-primary my-4">
                  {formatPrice(selectedProduct.price)}
                </p>
                <p className="text-muted-foreground mb-6">{selectedProduct.description}</p>

                {/* Size Selection */}
                <div className="mb-6">
                  <p className="font-semibold mb-3">Select Size:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                        className={selectedSize === size ? 'bg-primary text-primary-foreground' : ''}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  className="mt-auto bg-primary cursor-pointer text-primary-foreground hover:bg-primary/90"
                  disabled={!selectedSize || !selectedProduct.inStock}
                  onClick={() => handleAddToCart(selectedProduct, selectedSize)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/50 z-50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display text-2xl">Your Cart ({cartCount})</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={`${item.id}-${item.selectedSize}`}
                        className="flex gap-4 p-4 bg-muted rounded-2xl"
                      >
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-background relative">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                          <p className="text-xs text-muted-foreground">Size: {item.selectedSize}</p>
                          <p className="text-primary font-semibold mt-1">{formatPrice(item.price)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleUpdateQuantity(item.id, item.selectedSize, -1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleUpdateQuantity(item.id, item.selectedSize, 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 ml-auto text-destructive"
                              onClick={() => handleRemoveFromCart(item.id, item.selectedSize)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="font-display text-2xl text-primary">{formatPrice(cartTotal)}</span>
                  </div>
                  <Link href="/checkout" className="block">
                    <Button
                      className="w-full bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    You&apos;ll complete payment on the next page
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;