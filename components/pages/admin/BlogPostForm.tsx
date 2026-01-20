'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/auth';
import { useAuth } from '@/components/contexts/AuthContext';

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

interface BlogPostFormProps {
  isOpen: boolean;
  isEditing: boolean;
  editingPost: BlogPost | null;
  onClose: () => void;
  onSave?: (postData: NewPostData) => void;
  refreshPosts?: () => void;
  initialData?: NewPostData;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({
  isOpen,
  isEditing,
  editingPost,
  onClose,
  onSave,
  refreshPosts,
  initialData
}) => {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [newPost, setNewPost] = useState<NewPostData>(initialData || {
    title: '',
    excerpt: '',
    content: '',
    category: 'Fitness Tips',
    tags: [],
    featured: false,
    published: false,
    image: null
  });
  const [tagInput, setTagInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'Fitness Tips', 'Nutrition', 'Training', 'Community', 
    'Mindset', 'Recovery', 'Events', 'Success Stories'
  ];

  // Check authentication when component opens
  useEffect(() => {
    if (isOpen && !authLoading) {
      const token = authService.getToken();
      if (!token || !user) {
        toast.error('Please login to create or edit posts');
        handleClose();
        router.push('/login');
      } else {
        setAuthChecked(true);
      }
    }
  }, [isOpen, authLoading, user, router]);

  // If editing, pre-fill the form
  useEffect(() => {
    if (isEditing && editingPost && isOpen) {
      setNewPost({
        title: editingPost.title,
        excerpt: editingPost.excerpt,
        content: editingPost.content,
        category: editingPost.category,
        tags: editingPost.tags || [],
        featured: editingPost.featured,
        published: editingPost.published,
        image: editingPost.image
      });
      
      // Set image preview for existing image
      if (editingPost.image && typeof editingPost.image === 'string') {
        setImagePreview(editingPost.image);
      }
    } else if (!isEditing && isOpen) {
      // Reset form for new post
      setNewPost({
        title: '',
        excerpt: '',
        content: '',
        category: 'Fitness Tips',
        tags: [],
        featured: false,
        published: false,
        image: null
      });
      setImagePreview('');
      setTagInput('');
    }
  }, [isEditing, editingPost, isOpen]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a JPEG, PNG, WEBP, or GIF image.');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB.');
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setNewPost(prev => ({ ...prev, image: file }));
      
      toast.success('Image uploaded successfully!');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !newPost.tags.includes(trimmedTag)) {
      setNewPost({
        ...newPost,
        tags: [...newPost.tags, trimmedTag]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewPost({
      ...newPost,
      tags: newPost.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async () => {
    // Check authentication
    const token = authService.getToken();
    if (!token) {
      toast.error('Please login to create or edit posts');
      router.push('/login');
      return;
    }

    // Validation
    if (!newPost.title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (!newPost.excerpt.trim()) {
      toast.error('Excerpt is required');
      return;
    }

    if (!newPost.content.trim()) {
      toast.error('Content is required');
      return;
    }

    if (!newPost.image) {
      toast.error('Featured image is required');
      return;
    }

    setIsLoading(true);

    try {
      // Show loading toast
      const loadingToast = toast.loading(isEditing ? 'Updating post...' : 'Creating post...');

      // Prepare form data
      const formData = new FormData();
      formData.append('title', newPost.title.trim());
      formData.append('excerpt', newPost.excerpt.trim());
      formData.append('content', newPost.content.trim());
      formData.append('category', newPost.category);
      
      // Convert tags to JSON string
      formData.append('tags', JSON.stringify(newPost.tags));
      
      formData.append('publish', newPost.published.toString());
      formData.append('featured', newPost.featured.toString());
      
      // Handle image
      if (newPost.image instanceof File) {
        formData.append('coverImage', newPost.image);
      } else if (typeof newPost.image === 'string' && newPost.image.startsWith('blob:')) {
        // Convert blob URL to file
        try {
          const response = await fetch(newPost.image);
          const blob = await response.blob();
          const file = new File([blob], 'cover-image.jpg', { type: blob.type });
          formData.append('coverImage', file);
        } catch (error) {
          toast.error('Error processing image. Please re-upload.');
          setIsLoading(false);
          toast.dismiss(loadingToast);
          return;
        }
      } else if (typeof newPost.image === 'string' && !newPost.image.startsWith('http')) {
        toast.error('Please upload an image for the post');
        setIsLoading(false);
        toast.dismiss(loadingToast);
        return;
      }

      // Determine endpoint
      const endpoint = isEditing && editingPost 
        ? `/api/blogs/update/${editingPost.id}`
        : '/api/create-blog';

      console.log('Submitting to:', endpoint);
      console.log('Tags being sent:', JSON.stringify(newPost.tags));

      // Make API request
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Note: Don't set Content-Type for FormData, browser sets it automatically
        },
        body: formData,
      });

      const result = await response.json();
      console.log('Response:', result);

      if (!response.ok) {
        throw new Error(result.message || result.error || 'Operation failed');
      }

      if (result.success) {
        toast.dismiss(loadingToast);
        toast.success(result.message || (isEditing ? 'Post updated successfully!' : 'Post created successfully!'));

        // Call callback to refresh posts if provided
        if (refreshPosts) {
          refreshPosts();
        }

        // If onSave callback is provided, call it
        if (onSave) {
          onSave(newPost);
        }

        // Close form after successful submission
        handleClose();
      } else {
        throw new Error(result.message || 'Operation failed');
      }
      
    } catch (error) {
      console.error('Blog post error:', error);
      toast.dismiss();
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setNewPost({
      title: '',
      excerpt: '',
      content: '',
      category: 'Fitness Tips',
      tags: [],
      featured: false,
      published: false,
      image: null
    });
    setTagInput('');
    setImagePreview('');
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    onClose();
  };

  // Don't render if not open or auth is still loading
  if (!isOpen || authLoading) return null;

  // Don't render form if not authenticated
  if (!authService.getToken() || !user) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-3 lg:p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg sm:rounded-xl w-full max-w-[95vw] sm:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-3 sm:p-4 lg:p-6 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="p-1 sm:p-1.5 hover:bg-gray-100 rounded-md sm:rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          </button>
        </div>

        <div className="p-3 sm:p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                    Post Title *
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    disabled={isLoading}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-[#008020] focus:outline-none text-xs sm:text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter post title..."
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                    rows={3}
                    disabled={isLoading}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-[#008020] focus:outline-none resize-none text-xs sm:text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Brief summary of the post..."
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                    Content *
                  </label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    rows={8}
                    disabled={isLoading}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-[#008020] focus:outline-none resize-none font-mono text-xs sm:text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Write your post content here... (Markdown supported)"
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {/* Publish & Featured */}
              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6">
                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 lg:mb-4 text-sm sm:text-base">Publish</h3>
                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                  <label className="flex items-center gap-2 sm:gap-3">
                    <input
                      type="checkbox"
                      checked={newPost.published}
                      onChange={(e) => setNewPost({...newPost, published: e.target.checked})}
                      disabled={isLoading}
                      className="rounded border-gray-300 text-[#008020] focus:ring-[#008020] w-3 h-3 sm:w-4 sm:h-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <span className="text-xs sm:text-sm lg:text-base font-medium">Publish immediately</span>
                  </label>
                  <label className="flex items-center gap-2 sm:gap-3">
                    <input
                      type="checkbox"
                      checked={newPost.featured}
                      onChange={(e) => setNewPost({...newPost, featured: e.target.checked})}
                      disabled={isLoading}
                      className="rounded border-gray-300 text-[#ff8a00] focus:ring-[#ff8a00] w-3 h-3 sm:w-4 sm:h-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <span className="text-xs sm:text-sm lg:text-base font-medium">Featured post</span>
                  </label>
                </div>
              </div>

              {/* Category */}
              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6">
                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 lg:mb-4 text-sm sm:text-base">Category</h3>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  disabled={isLoading}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-md sm:rounded-lg bg-white border border-gray-300 focus:border-[#008020] focus:outline-none text-xs sm:text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6">
                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 lg:mb-4 text-sm sm:text-base">Tags</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex gap-1 sm:gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isLoading}
                      placeholder="Add tag..."
                      className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md sm:rounded-lg border border-gray-300 focus:border-[#008020] focus:outline-none text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button
                      onClick={handleAddTag}
                      disabled={isLoading}
                      className="px-2 sm:px-3 py-1.5 sm:py-2 bg-[#008020] text-white rounded-md sm:rounded-lg hover:bg-[#008020]/90 transition-colors text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {newPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-[#008020]/10 text-[#008020] rounded-full text-xs"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          disabled={isLoading}
                          className="hover:text-[#008020]/70 disabled:opacity-50 disabled:cursor-not-allowed"
                          type="button"
                        >
                          <X className="w-2 h-2 sm:w-3 sm:h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6">
                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 lg:mb-4 text-sm sm:text-base">Featured Image *</h3>
                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    onChange={handleImageUpload}
                    disabled={isLoading}
                    className="hidden"
                  />
                  
                  {imagePreview ? (
                    <div className="relative">
                      <div className="w-full h-40 sm:h-48 md:h-64 rounded-lg overflow-hidden">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          width={400}
                          height={256}
                          className="w-full h-full object-cover"
                          unoptimized={imagePreview.startsWith('blob:')}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview('');
                          setNewPost(prev => ({ ...prev, image: null }));
                        }}
                        disabled={isLoading}
                        className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={!isLoading ? triggerFileInput : undefined}
                      className={`border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 text-center transition-colors ${!isLoading ? 'cursor-pointer hover:border-[#008020]' : 'opacity-50 cursor-not-allowed'}`}
                    >
                      <Upload className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-gray-400 mx-auto mb-1.5 sm:mb-2 lg:mb-3" />
                      <p className="text-xs text-gray-600 mb-1 sm:mb-2 lg:mb-3">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, WEBP, GIF up to 5MB
                      </p>
                    </div>
                  )}
                  
                  <button
                    type="button"
                    onClick={!isLoading ? triggerFileInput : undefined}
                    disabled={isLoading}
                    className="w-full py-2 sm:py-2.5 bg-white border border-gray-300 text-gray-700 rounded-md sm:rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm lg:text-base flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
                    {imagePreview ? 'Change Image' : 'Select Image'}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !newPost.title || !newPost.excerpt || !newPost.content || !newPost.image}
                  className={`flex-1 py-2 sm:py-2.5 text-white font-semibold rounded-lg sm:rounded-xl transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base ${
                    isLoading || !newPost.title || !newPost.excerpt || !newPost.content || !newPost.image
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#008020] hover:bg-[#008020]/90 cursor-pointer'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {isEditing ? 'Updating...' : 'Creating...'}
                    </span>
                  ) : (
                    <>
                      <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                      {isEditing ? 'Update Post' : 'Publish Post'}
                    </>
                  )}
                </button>
                <button
                  onClick={handleClose}
                  disabled={isLoading}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg sm:rounded-xl hover:bg-gray-200 transition-colors text-xs sm:text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostForm;