'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Eye, Search, AlertCircle, Image as ImageIcon, EyeOff, RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import BlogPostForm from './BlogPostForm';
import { authService } from '@/lib/auth';
import { useAuth } from '@/components/contexts/AuthContext';
import { useRouter } from 'next/navigation';

// Types
interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  coverImage: string;
  category: string;
  tags: string[];
  featured: boolean;
  isPublished: boolean;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
  views?: number;
  likes?: number;
  comments?: number;
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

interface BlogResponse {
  success: boolean;
  message: string;
  count: number;
  total: number;
  page: number;
  pages: number;
  blogs: BlogPost[];
}

interface UpdateResponse {
  success: boolean;
  message: string;
  blog?: BlogPost;
}

const AdminBlogDashboard = () => {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      console.log("📡 Fetching blog posts...");
      
      const response = await fetch('/api/get-blog');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data: BlogResponse = await response.json();
      console.log("✅ Blog posts fetched:", data);
      
      if (data.success && data.blogs) {
        setPosts(data.blogs);
      } else {
        throw new Error(data.message || 'Failed to fetch posts');
      }
    } catch (error) {
      console.error('❌ Error fetching blog posts:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to load blog posts');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Check authentication
  useEffect(() => {
    if (!authLoading) {
      const token = authService.getToken();
      if (!token || !user) {
        setLoading(false);
        router.push('/login');
      }
    }
  }, [authLoading, user, router]);

  // Filter posts based on search and filter
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => {
        if (typeof tag === 'string') {
          return tag.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      }) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'published' ? post.isPublished :
      filter === 'draft' ? !post.isPublished :
      filter === 'featured' ? post.featured : true;
    
    return matchesSearch && matchesFilter;
  });

  // Stats
  const stats = {
    total: posts.length,
    published: posts.filter(p => p.isPublished).length,
    drafts: posts.filter(p => !p.isPublished).length,
    featured: posts.filter(p => p.featured).length,
    totalViews: posts.reduce((sum, post) => sum + (post.views || 0), 0),
    totalLikes: posts.reduce((sum, post) => sum + (post.likes || 0), 0),
    totalComments: posts.reduce((sum, post) => sum + (post.comments || 0), 0)
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    } catch (error) {
      return dateString;
    }
  };

  const getReadTime = (content: string) => {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  // Parse tags from backend (could be string or array)
    const parseTags = (tags: unknown[]): string[] => {
      return tags.flatMap(tag => {
        if (typeof tag === 'string') {
          try {
            // Try to parse if it's a JSON string
            const parsed = JSON.parse(tag);
            if (Array.isArray(parsed)) {
              return parsed.filter((t): t is string => typeof t === 'string');
            } else if (typeof parsed === 'string') {
              return [parsed];
            }
          } catch {
            // If not JSON, return the original string
            return [tag];
          }
        }
  
        if (Array.isArray(tag)) {
          return tag.filter((t): t is string => typeof t === 'string');
        }
  
        if (typeof tag === 'number' || typeof tag === 'boolean') {
          return [String(tag)];
        }
  
        return [];
      });
    };

  // Handlers
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    const token = authService.getToken();
    if (!token) {
      toast.error('Please login to delete posts');
      router.push('/login');
      return;
    }

    setIsDeleting(id);

    try {
      const response = await fetch(`/api/update-blog?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete post');
      }

      const result: UpdateResponse = await response.json();
      
      if (result.success) {
        setPosts(posts.filter(post => post._id !== id));
        toast.success('Blog post deleted successfully!');
      } else {
        throw new Error(result.message || 'Failed to delete post');
      }
    } catch (error) {
      console.error('❌ Error deleting post:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete post');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    const token = authService.getToken();
    if (!token) {
      toast.error('Please login to update posts');
      router.push('/login');
      return;
    }

    try {
      // For now, we'll just update local state
      setPosts(posts.map(post => 
        post._id === id ? { 
          ...post, 
          isPublished: !currentStatus,
          status: !currentStatus ? 'published' : 'draft'
        } : post
      ));
      toast.success(`Post ${!currentStatus ? 'published' : 'unpublished'} successfully!`);
    } catch (error) {
      console.error('❌ Error updating post status:', error);
      toast.error('Failed to update post status');
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    const token = authService.getToken();
    if (!token) {
      toast.error('Please login to update posts');
      router.push('/login');
      return;
    }

    try {
      setPosts(posts.map(post => 
        post._id === id ? { ...post, featured: !currentFeatured } : post
      ));
      toast.success(`Post ${!currentFeatured ? 'added to' : 'removed from'} featured successfully!`);
    } catch (error) {
      console.error('❌ Error updating featured status:', error);
      toast.error('Failed to update featured status');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setShowPostForm(true);
  };

  const handleSavePost = async (postData: NewPostData) => {
    if (editingPost) {
      // Update existing post via API
      const token = authService.getToken();
      if (!token) {
        toast.error('Please login to update posts');
        router.push('/login');
        return;
      }

      try {
        const formData = new FormData();
        formData.append("title", postData.title);
        formData.append("excerpt", postData.excerpt);
        formData.append("content", postData.content);
        formData.append("category", postData.category);
        formData.append("tags", JSON.stringify(postData.tags));
        formData.append("publish", postData.published.toString());
        formData.append("featured", postData.featured.toString());

        if (postData.image && postData.image instanceof File) {
          formData.append("coverImage", postData.image);
        }

        // Use the MongoDB _id, not the numeric id
        const response = await fetch(`/api/update-blog?id=${editingPost._id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update post');
        }

        const result: UpdateResponse = await response.json();
        
        if (result.success && result.blog) {
          setPosts(posts.map(post => 
            post._id === editingPost._id ? result.blog! : post
          ));
          toast.success('Post updated successfully!');
        } else {
          throw new Error(result.message || 'Failed to update post');
        }
      } catch (error) {
        console.error('❌ Error updating post:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to update post');
      }
    }
    
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setShowPostForm(false);
    setEditingPost(null);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  // Don't render if auth is still loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#008020] border-b-[#ff8a00] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  const token = authService.getToken();
  if (!token || !user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
            <div className="flex gap-2">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg sm:rounded-xl hover:bg-gray-200 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button
                onClick={() => setShowPostForm(true)}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-[#008020] text-white font-semibold rounded-lg sm:rounded-xl hover:bg-[#008020]/90 transition-colors text-sm sm:text-base cursor-pointer"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>New Post</span>
              </button>
            </div>
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
                          Date & Time
                        </th>
                        <th className="text-left p-6 font-semibold text-gray-900 text-base whitespace-nowrap">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredPosts.map((post) => (
                        <tr key={post._id} className="hover:bg-gray-50">
                          {/* Post Information Column */}
                          <td className="p-6 whitespace-nowrap">
                            <div className="flex items-center gap-3 min-w-[200px]">
                              {/* Image */}
                              <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                {post.coverImage ? (
                                  <Image
                                    src={post.coverImage}
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
                                <div className="text-sm text-gray-500">
                                  <span className="font-medium">{getReadTime(post.content)}</span>
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
                                  onClick={() => handleTogglePublish(post._id, post.isPublished)}
                                  className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap cursor-pointer ${post.isPublished 
                                    ? 'bg-green-100 text-green-800 border border-green-200' 
                                    : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                  }`}
                                >
                                  {post.isPublished ? 'Published' : 'Draft'}
                                </button>
                                
                                {post.featured && (
                                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-[#ff8a00]/10 text-[#ff8a00] border border-[#ff8a00]/20 whitespace-nowrap">
                                    Featured
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Date & Time Column */}
                          <td className="p-6 whitespace-nowrap min-w-[130px]">
                            <div className="space-y-1">
                              <div className="text-sm text-gray-900">
                                {formatDate(post.createdAt)}
                              </div>
                              <div className="text-xs text-gray-500">
                                {getReadTime(post.content)}
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
                                onClick={() => handleToggleFeatured(post._id, post.featured)}
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
                                onClick={() => handleDelete(post._id)}
                                disabled={isDeleting === post._id}
                                className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                title="Delete Post"
                              >
                                {isDeleting === post._id ? (
                                  <div className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* MOBILE VIEW - CARD LAYOUT */}
              <div className="lg:hidden">
                <div className="p-3 space-y-3">
                  {filteredPosts.map((post) => (
                    <div key={post._id} className="bg-gray-50 rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-colors">
                      {/* Top Row: Image and Basic Info */}
                      <div className="flex items-start gap-3 mb-3">
                        {/* Image */}
                        <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                          {post.coverImage ? (
                            <Image
                              src={post.coverImage}
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
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#008020]/10 text-[#008020]">
                              {post.category}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              post.isPublished 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {post.isPublished ? 'Published' : 'Draft'}
                            </span>
                            {post.featured && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#ff8a00]/10 text-[#ff8a00]">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Row: Actions */}
                      <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                        <div className="text-xs text-gray-500">
                          {formatDate(post.createdAt)} • {getReadTime(post.content)}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(post)}
                            className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition-colors cursor-pointer"
                            title="Edit Post"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleToggleFeatured(post._id, post.featured)}
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
                            onClick={() => handleDelete(post._id)}
                            disabled={isDeleting === post._id}
                            className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            title="Delete Post"
                          >
                            {isDeleting === post._id ? (
                              <div className="w-3.5 h-3.5 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
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
          editingPost={editingPost ? {
            id: parseInt(editingPost._id.substring(0, 8), 16) || 1,
            _id: editingPost._id,
            title: editingPost.title,
            slug: editingPost.slug,
            excerpt: editingPost.excerpt,
            content: editingPost.content,
            author: editingPost.author,
            authorRole: 'Fitness Ambassador',
            date: editingPost.createdAt.split('T')[0],
            readTime: getReadTime(editingPost.content),
            category: editingPost.category,
            tags: parseTags(editingPost.tags),
            image: editingPost.coverImage,
            featured: editingPost.featured,
            published: editingPost.isPublished,
            views: editingPost.views || 0,
            likes: editingPost.likes || 0,
            comments: editingPost.comments || 0
          } : null}
          onClose={handleCloseForm}
          onSave={handleSavePost}
          refreshPosts={fetchPosts}
          initialData={editingPost ? {
            title: editingPost.title,
            excerpt: editingPost.excerpt,
            content: editingPost.content,
            category: editingPost.category,
            tags: parseTags(editingPost.tags),
            featured: editingPost.featured,
            published: editingPost.isPublished,
            image: editingPost.coverImage
          } : undefined}
        />
      </div>
    </div>
  );
};

export default AdminBlogDashboard;