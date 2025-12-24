// components/pages/blog/BlogPostContent.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import BlogCard from './BlogCard';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  views: number;
  likes: number;
  comments: number;
  excerpt?: string;
}

interface BlogPostContentProps {
  slug: string;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ slug }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'The Beginner\'s Guide to Sustainable Fitness',
      slug: 'beginners-guide-sustainable-fitness',
      content: `
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Introduction</h2>
        <p class="text-gray-700 mb-6 leading-relaxed">Starting your fitness journey can be overwhelming, but it doesn't have to be. In this guide, we'll break down the essentials of building sustainable fitness habits that last a lifetime.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">The Foundation: Consistency Over Intensity</h2>
        <p class="text-gray-700 mb-6 leading-relaxed">Many beginners make the mistake of going too hard too fast. The key to sustainable fitness is consistency. Start with manageable workouts and gradually increase intensity.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Setting Realistic Goals</h2>
        <p class="text-gray-700 mb-6 leading-relaxed">SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) will keep you motivated and on track. Instead of "lose weight," try "lose 5kg in 2 months through regular exercise and healthy eating."</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Creating Your Routine</h2>
        <p class="text-gray-700 mb-6 leading-relaxed">A balanced routine includes strength training, cardio, flexibility work, and proper rest. Aim for 3-4 days of exercise per week with at least one rest day between intense sessions.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Nutrition Matters</h2>
        <p class="text-gray-700 mb-6 leading-relaxed">Exercise alone won't get you results. Pair your workouts with a balanced diet rich in protein, complex carbs, healthy fats, and plenty of vegetables.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Conclusion</h2>
        <p class="text-gray-700 mb-6 leading-relaxed">Remember, fitness is a journey, not a destination. Celebrate small victories, stay consistent, and be patient with your progress. The results will come.</p>
      `,
      author: 'Ajisafe Sulaiman',
      authorRole: 'Certified Fitness Coach',
      date: '2024-03-15',
      readTime: '5 min read',
      category: 'Fitness Tips',
      tags: ['Beginners', 'Habits', 'Lifestyle', 'Consistency'],
      featured: true,
      views: 1245,
      likes: 89,
      comments: 23
    },
    {
      id: 2,
      title: 'Nutrition Myths Debunked: What Really Works',
      slug: 'nutrition-myths-debunked',
      content: `
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Introduction</h2>
        <p class="text-gray-700 mb-6 leading-relaxed">In the world of fitness nutrition, myths and misconceptions are everywhere. Let's separate fact from fiction and focus on what really works.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Myth 1: Carbs Are The Enemy</h2>
        <p class="text-gray-700 mb-6 leading-relaxed">Complex carbohydrates are essential for energy and performance. The key is choosing the right carbs and timing them properly.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Myth 2: More Protein is Always Better</h2>
        <p class="text-gray-700 mb-6 leading-relaxed">While protein is crucial for muscle repair, excessive amounts won't lead to more gains. Your body can only utilize a certain amount per meal.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Myth 3: You Must Eat Every 2-3 Hours</h2>
        <p class="text-gray-700 mb-6 leading-relaxed">Meal timing is less important than total daily intake. Find an eating schedule that works for your lifestyle and hunger cues.</p>
      `,
      author: 'Ajisafe Sulaiman',
      authorRole: 'Sports Nutrition Consultant',
      date: '2024-03-10',
      readTime: '7 min read',
      category: 'Nutrition',
      tags: ['Nutrition', 'Myths', 'Supplements'],
      featured: false,
      views: 892,
      likes: 67,
      comments: 18
    },
    {
      id: 3,
      title: 'Community Fitness: Why It\'s More Effective',
      slug: 'community-fitness-effectiveness',
      content: 'Community fitness article content...',
      author: 'Ajisafe Sulaiman',
      authorRole: 'Community Fitness Leader',
      date: '2024-03-05',
      readTime: '6 min read',
      category: 'Community',
      tags: ['Community', 'Group Training', 'Support'],
      featured: true,
      views: 754,
      likes: 45,
      comments: 12
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundPost = blogPosts.find(post => post.slug === slug);
      setPost(foundPost || blogPosts[0]);
      
      // Get related posts (same category)
      if (foundPost) {
        const related = blogPosts
          .filter(p => p.slug !== slug && p.category === foundPost.category)
          .slice(0, 2);
        setRelatedPosts(related);
      }
      
      setLoading(false);
    }, 500);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#008020] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <div className="text-6xl mb-2">📄</div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Article not found</h3>
          <p className="text-gray-600 mb-6">
            The article you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#008020] text-white font-semibold rounded-xl hover:bg-[#008020]/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="pt-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-[#008020] hover:text-[#008020]/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Category */}
          <div className="mb-6">
            <span 
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
              style={{ 
                backgroundColor: '#008020' + '20',
                color: '#008020'
              }}
            >
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-[36px] md:text-[48px] lg:text-[52px] font-black text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-medium">{post.author}</span>
              <span className="text-sm">• {post.authorRole}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 mb-12">
        <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden border-2 border-gray-100">
          <div className="absolute inset-0 bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="text-xl font-bold text-gray-800 mb-2">{post.category}</div>
              <div className="text-gray-600">Featured Article Image</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="mb-4">
              <span className="font-semibold text-gray-900">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats & Share */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <ThumbsUp className="w-5 h-5" />
                  <span>{post.likes} likes</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments} comments</span>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-[#008020]/10 flex items-center justify-center">
                <User className="w-8 h-8 text-[#008020]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{post.author}</h3>
                <p className="text-gray-600 mb-3">{post.authorRole}</p>
                <p className="text-gray-700">
                  Certified fitness coach with 7+ years of experience. Passionate about helping 
                  individuals achieve their fitness goals through sustainable practices and community support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 md:px-8 bg-linear-to-b from-white to-gray-50/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-[30px] font-bold text-gray-900 mb-8">
              More from <span className="text-[#ff8a00]">{post.category}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.id}
                  id={relatedPost.id}
                  title={relatedPost.title}
                  slug={relatedPost.slug}
                  excerpt={relatedPost.excerpt || 'Read this related article...'}
                  author={relatedPost.author}
                  date={relatedPost.date}
                  readTime={relatedPost.readTime}
                  category={relatedPost.category}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-xl hover:border-[#008020] hover:text-[#008020] transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            View All Articles
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPostContent;