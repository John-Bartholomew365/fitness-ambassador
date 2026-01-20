// // app/blog/[slug]/page.tsx
// // import Footer from '@/components/layout/Footer'
// import Navbar from '@/components/layout/Navbar'
// import PageLoader from '@/components/loaders/PageLoader'
// import BlogPostContent from '@/components/pages/blog/BlogPostPage';

// // Disable source maps in development if needed
// export const dynamic = 'force-dynamic'

// interface PageProps {
//   params: Promise<{ slug: string }>;
// }

// export default async function BlogPostPage({ params }: PageProps) {
//   const { slug } = await params;
  
//   return (
//     <PageLoader>
//       <div>
//         <Navbar />
//         <BlogPostContent slug={slug} />
//         {/* <Footer /> */}
//       </div>
//     </PageLoader>
//   )
// }




// app/blog/[slug]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, ArrowLeft, Home } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import PageLoader from '@/components/loaders/PageLoader';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  isPublished: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
  coverImage: string;
}

// Disable source maps in development if needed
export const dynamic = 'force-dynamic'

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try multiple endpoints
        let response;
        let data;
        
        try {
          // First try local API
          response = await fetch('/api/get-blog');
          if (!response.ok) throw new Error('Local API failed');
          data = await response.json();
        } catch {
          // Fallback to direct backend
          response = await fetch('https://fitness-ambassador-api.onrender.com/api/get-blog');
          if (!response.ok) {
            throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
          }
          data = await response.json();
        }
        
        if (data.success && data.blogs) {
          const foundPost = data.blogs.find((blog: BlogPost) => blog.slug === slug);
          
          if (!foundPost) {
            throw new Error('Blog post not found');
          }

          if (!foundPost.isPublished || foundPost.status !== 'published') {
            throw new Error('This blog post is not available');
          }

          setPost(foundPost);

          // Get related posts (same category, limit to 2)
          const related = data.blogs
            .filter((blog: BlogPost) => 
              blog.slug !== slug && 
              blog.category === foundPost.category &&
              blog.isPublished && 
              blog.status === 'published'
            )
            .slice(0, 2)
            .map((blog: BlogPost) => ({
              id: blog._id,
              title: blog.title,
              slug: blog.slug,
              excerpt: blog.excerpt,
              author: blog.author === 'Admin' ? 'Ajisafe Sulaiman' : blog.author,
              date: new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }),
              readTime: calculateReadTime(blog.content),
              category: blog.category,
              featured: blog.featured,
              coverImage: blog.coverImage
            }));

          setRelatedPosts(related);
        } else {
          throw new Error(data.message || 'Failed to fetch blog post');
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const processTags = (tags: string[]) => {
    if (!tags || !Array.isArray(tags)) return [];
    
    const processedTags: string[] = [];
    
    tags.forEach(tag => {
      if (typeof tag === 'string') {
        try {
          if (tag.startsWith('[')) {
            const parsed = JSON.parse(tag);
            if (Array.isArray(parsed)) {
              parsed.forEach(t => {
                if (t && typeof t === 'string') {
                  processedTags.push(t.trim());
                }
              });
            }
          } else {
            if (tag.includes(',')) {
              tag.split(',').forEach(t => {
                if (t.trim()) processedTags.push(t.trim());
              });
            } else if (tag.trim()) {
              processedTags.push(tag.trim());
            }
          }
        } catch {
          if (tag.trim()) processedTags.push(tag.trim());
        }
      }
    });
    
    return [...new Set(processedTags)];
  };

  const goBack = () => {
    router.back();
  };

  const formatContent = (content: string) => {
    return content.replace(/\r\n/g, '\n').replace(/\n/g, '<br />');
  };

  if (loading) {
    return (
      <PageLoader>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#008020] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading article...</p>
          </div>
        </div>
      </PageLoader>
    );
  }

  if (error || !post) {
    return (
      <PageLoader>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center max-w-md p-6">
            <div className="text-gray-400 mb-4">
              <div className="text-6xl mb-2">📄</div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {error || 'Article not found'}
            </h3>
            <p className="text-gray-600 mb-6">
              The article you&apos;re looking for doesn&apos;t exist or is not available.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={goBack}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#008020] text-white font-semibold rounded-xl hover:bg-[#008020]/90 transition-colors"
              >
                <Home className="w-4 h-4" />
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </PageLoader>
    );
  }

  const displayAuthor = post.author === 'Admin' ? 'Ajisafe Sulaiman' : post.author;
  const processedTags = processTags(post.tags);

  return (
    <PageLoader>
      <div className="min-h-screen bg-white">
        <Navbar />
        
        {/* Back Navigation */}
        <div className="pt-8 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={goBack}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-[#008020] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Go Back</span>
              </button>
              
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-[#008020] hover:text-[#008020]/80 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Back to Blog</span>
              </Link>
            </div>
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
                <span className="font-medium">{displayAuthor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.createdAt).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {calculateReadTime(post.content)}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 mb-12">
          <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden border-2 border-gray-100 bg-gray-100">
            {post.coverImage && !imageError ? (
              <>
                {isImageLoading && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className={`object-cover ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                  priority
                  unoptimized={true}
                  onLoad={() => setIsImageLoading(false)}
                  onError={() => {
                    console.error('Failed to load featured image:', post.coverImage);
                    setImageError(true);
                    setIsImageLoading(false);
                  }}
                />
                {post.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-[#ff8a00] text-white text-sm font-semibold rounded">
                      Featured
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-gray-400 text-xl font-semibold mb-2">
                    {post.coverImage ? 'Image failed to load' : 'No image available'}
                  </div>
                  <p className="text-gray-300">{post.title}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <section className="py-8 px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed text-lg whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
              />
            </div>

            {/* Tags in Separate Boxes */}
            {processedTags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="mb-4">
                  <span className="font-semibold text-gray-900 text-lg">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {processedTags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-[#008020]/10 flex items-center justify-center shrink-0">
                  <User className="w-8 h-8 text-[#008020]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{displayAuthor}</h3>
                  <p className="text-gray-600 mb-3">Fitness Expert & Coach</p>
                  <p className="text-gray-700">
                    Certified fitness coach dedicated to helping individuals achieve their fitness goals 
                    through sustainable practices and expert guidance.
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
                  <Link 
                    key={relatedPost.id} 
                    href={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      {/* Cover Image */}
                      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                        {relatedPost.coverImage ? (
                          <Image
                            src={relatedPost.coverImage}
                            alt={relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            unoptimized={true}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <div className="text-center p-4">
                              <div className="text-gray-400 text-lg font-semibold mb-1">{relatedPost.category}</div>
                              <div className="text-gray-300 text-sm">No image</div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1">
                        <div className="mb-4">
                          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#008020]/10 text-[#008020]">
                            {relatedPost.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#008020] transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {relatedPost.excerpt}
                        </p>
                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-xs text-gray-600">{relatedPost.author}</span>
                          <span className="text-xs text-gray-500">
                            {relatedPost.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Navigation Buttons */}
        <section className="py-12 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={goBack}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-xl hover:border-[#008020] hover:text-[#008020] transition-all duration-300 w-full sm:w-auto"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
              <Link 
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#008020] text-white font-semibold rounded-xl hover:bg-[#008020]/90 transition-colors w-full sm:w-auto"
              >
                <Home className="w-5 h-5" />
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLoader>
  );
}