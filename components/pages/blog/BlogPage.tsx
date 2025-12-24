// app/blog/page.tsx
'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
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
  }
];

const categories = [
  'All Categories',
  'Fitness Tips',
  'Nutrition',
  'Training',
  'Community',
  'Mindset',
  'Recovery'
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('newest');
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and sort posts
  const filteredPosts = blogPosts
    .filter(post => {
      if (selectedCategory !== 'All Categories') {
        return post.category === selectedCategory;
      }
      return true;
    })
    .filter(post => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
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
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 px-4 md:px-8 bg-linear-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#008020]/10 mb-8">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#008020]" />
              <div className="w-2 h-2 rounded-full bg-[#ffde00]" />
              <div className="w-2 h-2 rounded-full bg-[#ff8a00]" />
            </div>
            <span className="text-[#008020] font-semibold text-sm tracking-wider">
              FITNESS BLOG
            </span>
          </div>

          <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-black text-gray-900 mb-6 leading-none">
            Fitness Insights
            <span className="block text-[#ff8a00] mt-4">From The Expert</span>
          </h1>

          <p className="text-gray-700 text-[16px] lg:text-[18px] lg:w-[600px] mx-auto leading-tight mb-10">
            Practical fitness advice, expert tips, and motivational stories from The Fitness Ambassador. 
            Everything you need to succeed on your fitness journey.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-2 border-gray-200 focus:border-[#008020] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#008020] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="text-gray-600 text-sm">Sort by:</span>
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

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {displayedPosts.length} of {filteredPosts.length} articles
            </p>
          </div>

          {/* Blog Grid */}
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

          {/* Empty State */}
          {displayedPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter to find what you&apos;re looking for.
              </p>
            </div>
          )}

          {/* Load More */}
          {hasMorePosts && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-xl hover:border-[#008020] hover:text-[#008020] transition-all duration-300 lg:w-auto w-full"
              >
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-linear-to-br from-[#008020]/5 to-[#ff8a00]/5 rounded-3xl p-5 lg:p-12 border-2 border-[#008020]/10">
            <h2 className="text-[30px] md:text-[40px] font-bold text-gray-900 mb-6">
              Need <span className="text-[#ff8a00]">Personal Advice?</span>
            </h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              Have specific fitness questions? Get personalized guidance from The Fitness Ambassador 
              through our training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/innovator/training">
                <button className="px-8 py-3 bg-[#008020] text-white font-semibold rounded-xl hover:bg-[#008020]/90 transition-colors lg:w-auto w-full">
                  Explore Training
                </button>
              </a>
              <a href="/contact">
                <button className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-xl hover:border-[#ff8a00] hover:text-[#ff8a00] transition-colors lg:w-auto w-full">
                  Contact Me
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;