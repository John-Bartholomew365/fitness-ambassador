'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import BlogCard from './BlogCard';

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: 'The Beginner\'s Guide to Sustainable Fitness',
    slug: 'beginners-guide-sustainable-fitness',
    excerpt: 'Learn how to build lasting fitness habits that transform your lifestyle, not just your workouts. Discover practical strategies for staying consistent.',
    author: 'Ajisafe Sulaiman',
    date: '2024-03-15',
    readTime: '5 min read',
    category: 'Fitness Tips',
    featured: true
  },
  {
    id: 2,
    title: 'Nutrition Myths Debunked: What Really Works',
    slug: 'nutrition-myths-debunked',
    excerpt: 'Separating fact from fiction in the world of fitness nutrition and supplementation. Learn evidence-based approaches to fueling your body.',
    author: 'Ajisafe Sulaiman',
    date: '2024-03-10',
    readTime: '7 min read',
    category: 'Nutrition',
    featured: false
  },
  {
    id: 3,
    title: 'Community Fitness: Why It\'s More Effective',
    slug: 'community-fitness-effectiveness',
    excerpt: 'Discover how group workouts and community support can accelerate your fitness journey and keep you motivated long-term.',
    author: 'Ajisafe Sulaiman',
    date: '2024-03-05',
    readTime: '6 min read',
    category: 'Community',
    featured: true
  },
  {
    id: 4,
    title: 'Progressive Overload: The Key to Continuous Gains',
    slug: 'progressive-overload-key',
    excerpt: 'Master the principle of progressive overload to ensure continuous improvement in your strength and fitness journey.',
    author: 'Ajisafe Sulaiman',
    date: '2024-03-01',
    readTime: '8 min read',
    category: 'Training',
    featured: false
  },
  {
    id: 5,
    title: 'Mindset Matters: Building Mental Strength',
    slug: 'mindset-matters-mental-strength',
    excerpt: 'How developing the right mindset is just as important as physical training for achieving lasting fitness success.',
    author: 'Ajisafe Sulaiman',
    date: '2024-02-25',
    readTime: '4 min read',
    category: 'Mindset',
    featured: false
  },
  {
    id: 6,
    title: 'Recovery Strategies for Optimal Performance',
    slug: 'recovery-strategies-performance',
    excerpt: 'Essential recovery techniques to prevent injury, reduce soreness, and maximize your training results.',
    author: 'Ajisafe Sulaiman',
    date: '2024-02-20',
    readTime: '6 min read',
    category: 'Recovery',
    featured: false
  },
  {
    id: 7,
    title: 'Goal Setting for Fitness Success',
    slug: 'goal-setting-fitness-success',
    excerpt: 'Learn how to set SMART fitness goals that keep you motivated and trackable throughout your journey.',
    author: 'Ajisafe Sulaiman',
    date: '2024-02-15',
    readTime: '5 min read',
    category: 'Fitness Tips',
    featured: false
  },
  {
    id: 8,
    title: 'Hydration: The Overlooked Performance Factor',
    slug: 'hydration-performance-factor',
    excerpt: 'Discover why proper hydration is crucial for performance and how to optimize your water intake.',
    author: 'Ajisafe Sulaiman',
    date: '2024-02-10',
    readTime: '4 min read',
    category: 'Nutrition',
    featured: false
  },
  {
    id: 9,
    title: 'Home Workout Essentials',
    slug: 'home-workout-essentials',
    excerpt: 'Create an effective home workout routine with minimal equipment and maximum results.',
    author: 'Ajisafe Sulaiman',
    date: '2024-02-05',
    readTime: '6 min read',
    category: 'Training',
    featured: false
  },
  {
    id: 10,
    title: 'Building a Supportive Fitness Community',
    slug: 'building-supportive-fitness-community',
    excerpt: 'How to find or create a fitness community that supports your goals and keeps you accountable.',
    author: 'Ajisafe Sulaiman',
    date: '2024-01-30',
    readTime: '5 min read',
    category: 'Community',
    featured: false
  }
];

const categories = [
  'Fitness Tips',
  'Nutrition',
  'Training',
  'Community',
  'Mindset',
  'Recovery'
];

const CategoryPage = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [sortBy, setSortBy] = useState('newest');
  
  // Format category name from URL (e.g., "fitness-tips" -> "Fitness Tips")
  const category = decodeURIComponent(params.category as string)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Validate category exists
  const isValidCategory = categories.includes(category);
  
  // Filter posts by category and search
  const filteredPosts = blogPosts
    .filter(post => {
      if (!isValidCategory) return true; // Show all if invalid category
      return post.category.toLowerCase() === category.toLowerCase();
    })
    .filter(post => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

  const displayedPosts = filteredPosts.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < filteredPosts.length;

  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + 3);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="pt-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-[#008020] hover:text-[#008020]/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Category Header */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <div className="mb-6">
            <span 
              className="inline-block px-5 py-2.5 rounded-full bg-[#008020]/10 text-[#008020] font-semibold text-sm tracking-wider"
            >
              CATEGORY
            </span>
          </div>

          {/* Title */}
          <h1 className="text-[36px] md:text-[48px] lg:text-[52px] font-black text-gray-900 mb-6 leading-none">
            {isValidCategory ? category : 'All Categories'}
            <span className="block text-[#ff8a00] mt-4">Articles</span>
          </h1>

          <p className="text-gray-700 text-[16px] lg:text-[18px] lg:w-[600px] leading-relaxed mb-10">
            {isValidCategory 
              ? `Browse all articles in the ${category} category. Expert advice and practical tips to help you on your fitness journey.`
              : 'Browse all fitness articles. Expert advice and practical tips to help you on your fitness journey.'
            }
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${isValidCategory ? category.toLowerCase() : ''} articles...`}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-2 border-gray-200 focus:border-[#008020] focus:outline-none"
              />
            </div>
          </div>

          {/* Category Stats */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">
              Showing {displayedPosts.length} of {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </p>
            
            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="text-gray-600 text-sm hidden md:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-[#008020] focus:outline-none text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    slug={post.slug}
                    excerpt={post.excerpt}
                    author={post.author}
                    date={post.date}
                    readTime={post.readTime}
                    category={post.category}
                    featured={post.featured}
                  />
                ))}
              </div>

              {/* Load More */}
              {hasMorePosts && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-xl hover:border-[#008020] hover:text-[#008020] transition-all duration-300"
                  >
                    Load More Articles
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? `No articles found for "${searchQuery}" in ${isValidCategory ? category.toLowerCase() : 'any category'}`
                  : `No articles found in ${isValidCategory ? category.toLowerCase() : 'any category'}`
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link 
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#008020] text-white font-semibold rounded-xl hover:bg-[#008020]/90 transition-colors"
                >
                  Browse All Articles
                </Link>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-16 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[30px] font-bold text-gray-900 mb-8 text-center">
            Browse Other <span className="text-[#ff8a00]">Categories</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const isActive = cat === category;
              const postCount = blogPosts.filter(post => post.category === cat).length;
              
              return (
                <Link
                  key={cat}
                  href={`/blog/categories/${cat.toLowerCase().replace(' ', '-')}`}
                  className={`p-4 rounded-2xl text-center transition-all duration-300 ${
                    isActive
                      ? 'bg-[#008020] text-white transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-sm font-semibold mb-1">{cat}</div>
                  <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                    {postCount} article{postCount !== 1 ? 's' : ''}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Back to Blog */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-xl hover:border-[#008020] hover:text-[#008020] transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Main Blog
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;