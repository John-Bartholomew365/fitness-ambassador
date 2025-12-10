"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter } from 'lucide-react';
import { fadeUp, staggerContainer, viewport } from '../../utils/animation';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const categories = ['all', 'walk2fitness', 'jam2fit', 'afro-groove', 'aerobics-icebath'];

  const galleryItems = [
    { id: 1, category: 'walk2fitness', type: 'image' },
    { id: 2, category: 'jam2fit', type: 'image' },
    { id: 3, category: 'afro-groove', type: 'image' },
    { id: 4, category: 'aerobics-icebath', type: 'image' },
    { id: 5, category: 'walk2fitness', type: 'image' },
    { id: 6, category: 'jam2fit', type: 'image' },
    { id: 7, category: 'afro-groove', type: 'image' },
    { id: 8, category: 'aerobics-icebath', type: 'image' },
    { id: 9, category: 'walk2fitness', type: 'image' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen py-20">
      {/* Hero */}
      <section className="py-20 bg-linear-to-br from-accent/10 via-background to-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            <motion.div variants={fadeUp} className="inline-block px-6 py-2 bg-accent/10 border border-accent rounded-full">
              <span className="text-accent font-bold text-sm">MEDIA GALLERY</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold text-foreground">
              EVENT
              <br />
              <span className="text-accent">MEMORIES</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl text-foreground/70">
              Explore photos and videos from our transformative fitness events
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 flex-wrap gap-2">
            <Filter className="w-5 h-5 text-foreground/60" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-background border border-border text-foreground hover:border-accent'
                }`}
              >
                {category === 'all' ? 'All Events' : category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                className="group relative aspect-square bg-linear-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-3xl overflow-hidden cursor-pointer border-2 border-border hover:border-accent transition-all duration-300"
                onClick={() => setSelectedImage(item.id)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <span className="text-4xl font-bold text-accent-foreground">FA</span>
                    </div>
                    <p className="text-lg font-bold text-foreground font-display">
                      {item.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full aspect-square bg-linear-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-3xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-4 p-8">
                <div className="w-32 h-32 bg-accent rounded-full flex items-center justify-center mx-auto">
                  <span className="text-6xl font-bold text-accent-foreground">FA</span>
                </div>
                <p className="text-2xl font-bold text-white font-display">Event Photo</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
