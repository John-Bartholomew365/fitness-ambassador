'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Eye, Search, AlertCircle, Image as ImageIcon, EyeOff,
  Calendar, Clock, Users, MessageCircle, BarChart
} from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import BlogPostForm from './BlogPostForm';

// Types
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
  published: boolean;
  views: number;
  likes: number;
  comments: number;
}

interface NewPostData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  image: File | string | null;
}

const AdminBlogDashboard = () => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const savedPosts = localStorage.getItem('blog-posts');
    if (savedPosts) {
      return JSON.parse(savedPosts);
    }
    return [
      {
        id: 1,
        title: 'The Beginner\'s Guide to Sustainable Fitness',
        slug: 'beginners-guide-sustainable-fitness',
        excerpt: 'Learn how to build lasting fitness habits that transform your lifestyle and health journey.',
        content: '# The Beginner\'s Guide to Sustainable Fitness\n\nStarting a fitness journey can be overwhelming...\n\n## Key Principles\n1. Start Small\n2. Be Consistent\n3. Listen to Your Body\n\nRemember: Progress, not perfection!',
        author: 'Ajisafe Sulaiman',
        authorRole: 'Certified Fitness Coach',
        date: '2024-03-15',
        readTime: '5 min read',
        category: 'Fitness Tips',
        tags: ['Beginners', 'Habits', 'Lifestyle'],
        image: '/blog/fitness-basics.jpg',
        featured: true,
        published: true,
        views: 1245,
        likes: 89,
        comments: 23
      },
      {
        id: 2,
        title: 'Nutrition Myths Debunked',
        slug: 'nutrition-myths-debunked',
        excerpt: 'Separating fact from fiction in the world of nutrition and healthy eating.',
        content: '# Nutrition Myths Debunked\n\nThere are many misconceptions about nutrition...',
        author: 'Ajisafe Sulaiman',
        authorRole: 'Sports Nutrition Consultant',
        date: '2024-03-10',
        readTime: '7 min read',
        category: 'Nutrition',
        tags: ['Nutrition', 'Myths', 'Health'],
        image: '/blog/nutrition-myths.jpg',
        featured: false,
        published: true,
        views: 892,
        likes: 67,
        comments: 18
      },
      {
        id: 3,
        title: 'Recovery Strategies Guide',
        slug: 'recovery-strategies-guide',
        excerpt: 'Essential recovery techniques for optimal performance and injury prevention.',
        content: '# Recovery Strategies Guide\n\nProper recovery is crucial for progress...',
        author: 'Ajisafe Sulaiman',
        authorRole: 'Fitness Recovery Specialist',
        date: '2024-03-01',
        readTime: '6 min read',
        category: 'Recovery',
        tags: ['Recovery', 'Performance', 'Health'],
        image: '/blog/recovery-strategies.jpg',
        featured: false,
        published: false,
        views: 0,
        likes: 0,
        comments: 0
      }
    ];
  });
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('blog-posts', JSON.stringify(posts));
    }
  }, [posts]);

  // Filter posts based on search and filter
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'published' ? post.published :
      filter === 'draft' ? !post.published :
      filter === 'featured' ? post.featured : true;
    
    return matchesSearch && matchesFilter;
  });

  // Stats
  const stats = {
    total: posts.length,
    published: posts.filter(p => p.published).length,
    drafts: posts.filter(p => !p.published).length,
    featured: posts.filter(p => p.featured).length,
    totalViews: posts.reduce((sum, post) => sum + post.views, 0),
    totalLikes: posts.reduce((sum, post) => sum + post.likes, 0),
    totalComments: posts.reduce((sum, post) => sum + post.comments, 0)
  };

  // Handlers
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      setPosts(posts.filter(post => post.id !== id));
      toast.success('The blog post has been successfully deleted.');
    }
  };

  const handleTogglePublish = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { 
        ...post, 
        published: !post.published,
        date: !post.published ? new Date().toISOString().split('T')[0] : post.date
      } : post
    ));
    toast.success('The post publication status has been updated.');
  };

  const handleToggleFeatured = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, featured: !post.featured } : post
    ));
    toast.success('The post featured status has been updated.');
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setShowPostForm(true);
  };

  const handleSavePost = (postData: NewPostData) => {
    if (editingPost) {
      // For local state management (fallback)
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? { 
              ...post, 
              title: postData.title,
              excerpt: postData.excerpt,
              content: postData.content,
              category: postData.category,
              tags: postData.tags,
              featured: postData.featured,
              published: postData.published,
              image: postData.image instanceof File ? URL.createObjectURL(postData.image) : postData.image || post.image
            } 
          : post
      ));
      toast.success('Post updated successfully!');
    } else {
      // Create new post for local state (fallback)
      const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
      const newPostData: BlogPost = {
        id: newId,
        title: postData.title,
        slug: postData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        excerpt: postData.excerpt,
        content: postData.content,
        author: 'Ajisafe Sulaiman',
        authorRole: 'The Fitness Ambassador',
        date: new Date().toISOString().split('T')[0],
        readTime: `${Math.ceil(postData.content.trim().split(/\s+/).length / 200)} min read`,
        category: postData.category,
        tags: postData.tags,
        image: postData.image instanceof File ? URL.createObjectURL(postData.image) : postData.image || `/blog/default-${postData.category.toLowerCase().replace(' ', '-')}.jpg`,
        featured: postData.featured,
        published: postData.published,
        views: 0,
        likes: 0,
        comments: 0
      };
      
      setPosts([newPostData, ...posts]);
      toast.success('New blog post created successfully!');
    }
    
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setShowPostForm(false);
    setEditingPost(null);
  };

  const refreshPosts = () => {
    // This function would fetch posts from your API
    // For now, we'll just show a message
    toast.success('Posts refreshed!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#008020] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-3 sm:p-4 lg:p-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                Blog Management
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Manage your blog posts, track performance, and create new content</p>
            </div>
            <button
              onClick={() => setShowPostForm(true)}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-[#008020] text-white font-semibold rounded-lg sm:rounded-xl hover:bg-[#008020]/90 transition-colors w-full sm:w-auto text-sm sm:text-base cursor-pointer"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>New Post</span>
            </button>
          </div>
        </div>

        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border-2 border-gray-100">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">{stats.total}</div>
            <div className="text-xs sm:text-sm text-gray-600">Total Posts</div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border-2 border-gray-100">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">{stats.published}</div>
            <div className="text-xs sm:text-sm text-gray-600">Published</div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border-2 border-gray-100">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">{stats.totalViews}</div>
            <div className="text-xs sm:text-sm text-gray-600">Total Views</div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border-2 border-gray-100">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#ff8a00] mb-1">{stats.featured}</div>
            <div className="text-xs sm:text-sm text-gray-600">Featured</div>
          </div>
        </div>

        {/* Search and Filter - Responsive */}
        <div className="bg-white rounded-lg sm:rounded-xl border-2 border-gray-100 p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-[#008020] focus:outline-none text-xs sm:text-sm lg:text-base"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-[#008020] focus:outline-none text-xs sm:text-sm lg:text-base flex-1 min-w-[120px]"
              >
                <option value="all">All Posts</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
                <option value="featured">Featured</option>
              </select>
              <button 
                onClick={() => setFilter('all')}
                className="px-3 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-200 transition-colors text-xs sm:text-sm lg:text-base cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Posts Container - Responsive Design */}
        <div className="bg-white rounded-lg sm:rounded-xl border-2 border-gray-100 overflow-hidden">
          {filteredPosts.length > 0 ? (
            <>
              {/* DESKTOP TABLE (lg and above) */}
              <div className="hidden lg:block">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-6 font-semibold text-gray-900 text-base whitespace-nowrap">
                          Post Information
                        </th>
                        <th className="text-left p-6 font-semibold text-gray-900 text-base whitespace-nowrap">
                          Category & Status
                        </th>
                        <th className="text-left p-6 font-semibold text-gray-900 text-base whitespace-nowrap">
                          Statistics
                        </th>
                        <th className="text-left p-6 font-semibold text-gray-900 text-base whitespace-nowrap">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredPosts.map((post) => (
                        <tr key={post.id} className="hover:bg-gray-50">
                          {/* Post Information Column */}
                          <td className="p-6 whitespace-nowrap">
                            <div className="flex items-center gap-3 min-w-[200px]">
                              {/* Image */}
                              <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                {post.image ? (
                                  <Image
                                    src={post.image}
                                    alt={post.title}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <ImageIcon className="w-5 h-5 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              
                              {/* Text Content */}
                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-gray-900 text-base mb-1 truncate max-w-[220px]">
                                  {post.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-1 line-clamp-1 max-w-[220px]">
                                  {post.excerpt}
                                </p>
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <Calendar className="w-3 h-3" />
                                  <span>{new Date(post.date).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}</span>
                                  <span>•</span>
                                  <Clock className="w-3 h-3" />
                                  <span className="font-medium">{post.readTime}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Category & Status Column */}
                          <td className="p-6 whitespace-nowrap min-w-[120px]">
                            <div className="space-y-2">
                              {/* Category */}
                              <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-[#008020]/10 text-[#008020] whitespace-nowrap">
                                {post.category}
                              </span>
                              
                              {/* Status */}
                              <div className="flex flex-wrap gap-1">
                                <button
                                  onClick={() => handleTogglePublish(post.id)}
                                  className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${post.published 
                                    ? 'bg-green-100 text-green-800 border border-green-200' 
                                    : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                  } cursor-pointer`}
                                >
                                  {post.published ? 'Published' : 'Draft'}
                                </button>
                                
                                {post.featured && (
                                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-[#ff8a00]/10 text-[#ff8a00] border border-[#ff8a00]/20 whitespace-nowrap">
                                    Featured
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Statistics Column */}
                          <td className="p-6 whitespace-nowrap min-w-[130px]">
                            <div className="grid grid-cols-3 gap-2">
                              <div className="text-center">
                                <div className="font-bold text-gray-900 text-base mb-1">
                                  {post.views.toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-500 font-medium">Views</div>
                              </div>
                              <div className="text-center">
                                <div className="font-bold text-gray-900 text-base mb-1">
                                  {post.likes.toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-500 font-medium">Likes</div>
                              </div>
                              <div className="text-center">
                                <div className="font-bold text-gray-900 text-base mb-1">
                                  {post.comments.toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-500 font-medium">Comments</div>
                              </div>
                            </div>
                          </td>

                          {/* Actions Column */}
                          <td className="p-6 whitespace-nowrap min-w-[120px]">
                            <div className="flex flex-wrap gap-2">
                              {/* Edit Button */}
                              <button
                                onClick={() => handleEdit(post)}
                                className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                                title="Edit Post"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              
                              {/* Featured Toggle */}
                              <button
                                onClick={() => handleToggleFeatured(post.id)}
                                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                                  post.featured 
                                    ? 'bg-[#ff8a00]/10 text-[#ff8a00] hover:bg-[#ff8a00]/20' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                                title={post.featured ? 'Remove from Featured' : 'Add to Featured'}
                              >
                                {post.featured ? (
                                  <Eye className="w-4 h-4" />
                                ) : (
                                  <EyeOff className="w-4 h-4" />
                                )}
                              </button>
                              
                              {/* Preview Button */}
                              <a
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                                title="Preview Post"
                              >
                                <Eye className="w-4 h-4" />
                              </a>
                              
                              {/* Delete Button */}
                              <button
                                onClick={() => handleDelete(post.id)}
                                className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                                title="Delete Post"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TABLET VIEW (md) */}
              <div className="hidden md:block lg:hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-3xl">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-4 font-semibold text-gray-900 text-sm whitespace-nowrap">
                          Post Information
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-900 text-sm whitespace-nowrap">
                          Status
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-900 text-sm whitespace-nowrap">
                          Stats
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-900 text-sm whitespace-nowrap">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredPosts.map((post) => (
                        <tr key={post.id} className="hover:bg-gray-50">
                          {/* Post Information */}
                          <td className="p-4 whitespace-nowrap">
                            <div className="flex items-center gap-3 min-w-[200px]">
                              {/* Image */}
                              <div className="shrink-0 w-10 h-10 rounded-md overflow-hidden bg-gray-100">
                                {post.image ? (
                                  <Image
                                    src={post.image}
                                    alt={post.title}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <ImageIcon className="w-4 h-4 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              
                              {/* Text Content */}
                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate max-w-[180px]">
                                  {post.title}
                                </h3>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <span className="truncate max-w-[100px]">{post.category}</span>
                                  <span>•</span>
                                  <span>{post.readTime}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Status Column */}
                          <td className="p-4 whitespace-nowrap">
                            <div className="space-y-1">
                              <button
                                onClick={() => handleTogglePublish(post.id)}
                                className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap w-full text-center cursor-pointer ${post.published 
                                  ? 'bg-green-100 text-green-800 border border-green-200' 
                                  : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                }`}
                              >
                                {post.published ? 'Published' : 'Draft'}
                              </button>
                              
                              {post.featured && (
                                <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-[#ff8a00]/10 text-[#ff8a00] border border-[#ff8a00]/20 w-full text-center">
                                  Featured
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Statistics Column */}
                          <td className="p-4 whitespace-nowrap">
                            <div className="grid grid-cols-3 gap-1">
                              <div className="text-center">
                                <div className="font-bold text-gray-900 text-sm mb-1">
                                  {post.views > 999 ? `${(post.views/1000).toFixed(1)}k` : post.views}
                                </div>
                                <div className="text-xs text-gray-500 font-medium">Views</div>
                              </div>
                              <div className="text-center">
                                <div className="font-bold text-gray-900 text-sm mb-1">
                                  {post.likes > 999 ? `${(post.likes/1000).toFixed(1)}k` : post.likes}
                                </div>
                                <div className="text-xs text-gray-500 font-medium">Likes</div>
                              </div>
                              <div className="text-center">
                                <div className="font-bold text-gray-900 text-sm mb-1">
                                  {post.comments}
                                </div>
                                <div className="text-xs text-gray-500 font-medium">Comments</div>
                              </div>
                            </div>
                          </td>

                          {/* Actions Column */}
                          <td className="p-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              <button
                                onClick={() => handleEdit(post)}
                                className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition-colors cursor-pointer"
                                title="Edit Post"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleToggleFeatured(post.id)}
                                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                                  post.featured 
                                    ? 'bg-[#ff8a00]/10 text-[#ff8a00] hover:bg-[#ff8a00]/20' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                                title={post.featured ? 'Remove from Featured' : 'Add to Featured'}
                              >
                                {post.featured ? (
                                  <Eye className="w-3.5 h-3.5" />
                                ) : (
                                  <EyeOff className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <button
                                onClick={() => handleDelete(post.id)}
                                className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors cursor-pointer"
                                title="Delete Post"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* MOBILE VIEW (sm and below) - CARD LAYOUT */}
              <div className="md:hidden">
                <div className="p-3 space-y-3">
                  {filteredPosts.map((post) => (
                    <div key={post.id} className="bg-gray-50 rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-colors">
                      {/* Top Row: Image and Basic Info */}
                      <div className="flex items-start gap-3 mb-3">
                        {/* Image */}
                        <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                          {post.image ? (
                            <Image
                              src={post.image}
                              alt={post.title}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                            <Calendar className="w-3 h-3 shrink-0" />
                            <span className="truncate">
                              {new Date(post.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric'
                              })}
                            </span>
                            <span>•</span>
                            <Clock className="w-3 h-3 shrink-0" />
                            <span className="font-medium">{post.readTime}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#008020]/10 text-[#008020]">
                              {post.category}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              post.published 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {post.published ? 'Published' : 'Draft'}
                            </span>
                            {post.featured && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#ff8a00]/10 text-[#ff8a00]">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Middle Row: Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-3 p-2 bg-white rounded-lg border border-gray-100">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-gray-900 font-bold text-sm">
                            <BarChart className="w-3 h-3" />
                            {post.views > 999 ? `${(post.views/1000).toFixed(1)}k` : post.views}
                          </div>
                          <div className="text-xs text-gray-500 font-medium">Views</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-gray-900 font-bold text-sm">
                            <Users className="w-3 h-3" />
                            {post.likes > 999 ? `${(post.likes/1000).toFixed(1)}k` : post.likes}
                          </div>
                          <div className="text-xs text-gray-500 font-medium">Likes</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-gray-900 font-bold text-sm">
                            <MessageCircle className="w-3 h-3" />
                            {post.comments}
                          </div>
                          <div className="text-xs text-gray-500 font-medium">Comments</div>
                        </div>
                      </div>

                      {/* Bottom Row: Actions */}
                      <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#008020] font-semibold hover:text-[#008020]/80 flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          Preview
                        </a>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(post)}
                            className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition-colors cursor-pointer"
                            title="Edit Post"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleToggleFeatured(post.id)}
                            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                              post.featured 
                                ? 'bg-[#ff8a00]/10 text-[#ff8a00] hover:bg-[#ff8a00]/20' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            title={post.featured ? 'Remove from Featured' : 'Add to Featured'}
                          >
                            {post.featured ? (
                              <Eye className="w-3.5 h-3.5" />
                            ) : (
                              <EyeOff className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors cursor-pointer"
                            title="Delete Post"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">No posts found</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-xs sm:text-sm lg:text-base">
                {searchQuery ? 'Try adjusting your search terms' : 'Create your first blog post to get started'}
              </p>
              <button
                onClick={() => setShowPostForm(true)}
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#008020] text-white font-semibold rounded-lg sm:rounded-xl hover:bg-[#008020]/90 transition-colors text-sm sm:text-base cursor-pointer"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                Create New Post
              </button>
            </div>
          )}
        </div>

        {/* Blog Post Form Component */}
        <BlogPostForm
          isOpen={showPostForm}
          isEditing={!!editingPost}
          editingPost={editingPost}
          onClose={handleCloseForm}
          onSave={handleSavePost}
          refreshPosts={refreshPosts}
          initialData={editingPost ? {
            title: editingPost.title,
            excerpt: editingPost.excerpt,
            content: editingPost.content,
            category: editingPost.category,
            tags: editingPost.tags,
            featured: editingPost.featured,
            published: editingPost.published,
            image: editingPost.image
          } : undefined}
        />
      </div>
    </div>
  );
};

export default AdminBlogDashboard;