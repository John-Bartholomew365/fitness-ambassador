// app/blog/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import BlogCard from './BlogCard';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  featured: boolean;
  isPublished: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  count: number;
  total: number;
  page: number;
  pages: number;
  blogs: BlogPost[];
}

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('newest');
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [searchQuery, setSearchQuery] = useState('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog data from API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try the exact endpoint from your response
        const response = await fetch('/api/get-blog', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-cache'
        });
        
        if (!response.ok) {
          // Try direct backend API as fallback
          const fallbackResponse = await fetch('https://fitness-ambassador-api.onrender.com/api/get-blog', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            cache: 'no-cache'
          });
          
          if (!fallbackResponse.ok) {
            throw new Error(`Failed to fetch blogs: ${response.statusText}`);
          }
          
          const data: ApiResponse = await fallbackResponse.json();
          handleData(data);
        } else {
          const data: ApiResponse = await response.json();
          handleData(data);
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load articles. Please check your internet connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    const handleData = (data: ApiResponse) => {
      if (data.success && data.blogs) {
        // Filter only published blogs
        const publishedBlogs = data.blogs.filter(blog => 
          blog.isPublished && blog.status === 'published'
        );
        setBlogPosts(publishedBlogs);
      } else {
        throw new Error(data.message || 'Failed to fetch blogs');
      }
    };

    fetchBlogPosts();
  }, []);

  // Format blog data for display
  const formatBlogData = (blog: BlogPost) => {
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };

    const calculateReadTime = (content: string) => {
      const wordsPerMinute = 200;
      const words = content.split(/\s+/).length;
      const minutes = Math.ceil(words / wordsPerMinute);
      return `${minutes} min read`;
    };

    return {
      id: blog._id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      coverImage: blog.coverImage,
      author: blog.author === 'Admin' ? 'Ajisafe Sulaiman' : blog.author,
      date: formatDate(blog.createdAt),
      readTime: calculateReadTime(blog.content),
      category: blog.category,
      tags: blog.tags,
      featured: blog.featured,
      isPublished: blog.isPublished,
      status: blog.status
    };
  };

  // Get unique categories from actual blog data
  const allCategories = ['All Categories'];
  if (blogPosts.length > 0) {
    const uniqueCategories = [...new Set(blogPosts.map(post => post.category))].sort();
    allCategories.push(...uniqueCategories);
  } else {
    // Default categories while loading or when no posts
    allCategories.push('Nutrition', 'Workout', 'Lifestyle', 'Tips', 'Motivation');
  }

  // Filter and sort posts
  const filteredPosts = blogPosts
    .map(formatBlogData)
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

  // Blog Card Skeleton Loader Component
  const BlogCardSkeleton = () => {
    return (
      <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden">
        {/* Cover Image Skeleton */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-200 animate-pulse"></div>

        {/* Content Skeleton */}
        <div className="p-6">
          {/* Category & Date Skeleton */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-20 h-7 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Title Skeleton */}
          <div className="space-y-2 mb-3">
            <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 bg-gray-200 rounded animate-pulse w-4/5"></div>
          </div>

          {/* Excerpt Skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </div>

          {/* Meta Info Skeleton */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Always Static */}
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
                placeholder="Search articles by title, content, or tags..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-2 border-gray-200 focus:border-[#008020] focus:outline-none"
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filters - Always Static */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {allCategories.slice(0, 6).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  disabled={loading}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#008020] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                disabled={loading}
                className={`px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-[#008020] focus:outline-none text-sm ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            {loading ? (
              <div className="w-48 h-5 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <p className="text-gray-600">
                {blogPosts.length === 0 ? (
                  'No articles available'
                ) : (
                  `Showing ${displayedPosts.length} of ${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''}`
                )}
              </p>
            )}
          </div>

          {/* Blog Grid with Skeleton Loaders */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <BlogCardSkeleton key={item} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="text-red-500 mb-4 text-4xl">⚠️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Articles</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-[#008020] text-white font-semibold rounded-xl hover:bg-[#008020]/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : blogPosts.length > 0 ? (
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
                    coverImage={post.coverImage}
                  />
                ))}
              </div>

              {/* Empty Search State */}
              {displayedPosts.length === 0 && filteredPosts.length > 0 && (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No matching articles found</h3>
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
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <div className="text-6xl mb-2">📄</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No articles published yet</h3>
              <p className="text-gray-600">
                Check back soon for new fitness articles and tips.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Always Static */}
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
              <a href="/training">
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