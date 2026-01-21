// components/blog/BlogCard.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, User } from 'lucide-react';

interface BlogCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  featured?: boolean;
  coverImage?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  slug,
  excerpt,
  author,
  date,
  readTime,
  category,
  featured = false,
  coverImage
}) => {
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const displayAuthor = author === 'Admin' ? 'Ajisafe Sulaiman' : author;

  return (
    <article className="group">
      <Link href={`/blog/${slug}`}>
        <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
          {/* Cover Image */}
          <div className="relative h-48 w-full overflow-hidden bg-gray-100">
            {coverImage && !imageError ? (
              <>
                {isImageLoading && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}
                <Image
                  src={coverImage}
                  alt={title}
                  fill
                  className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                    isImageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onLoad={() => setIsImageLoading(false)}
                  onError={() => {
                    console.error('Failed to load image:', coverImage);
                    setImageError(true);
                    setIsImageLoading(false);
                  }}
                  priority={featured}
                  unoptimized={true}
                />
              </>
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="text-gray-400 text-lg font-semibold mb-1">{category}</div>
                  <div className="text-gray-300 text-sm">
                    {coverImage ? 'This image is currently unavailable' : 'No image'}
                  </div>
                </div>
              </div>
            )}
            
            {/* Featured badge */}
            {featured && coverImage && !imageError && (
              <div className="absolute top-3 right-3 z-10">
                <span className="px-2 py-1 bg-[#ff8a00] text-white text-xs font-semibold rounded">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Category & Date */}
            <div className="flex items-center justify-between mb-4">
              <span 
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ 
                  backgroundColor: '#008020' + '10',
                  color: '#008020'
                }}
              >
                {category}
              </span>
              <span className="text-xs text-gray-500">
                {date}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#008020] transition-colors line-clamp-2">
              {title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
              {excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-3 h-3 text-gray-500" />
                </div>
                <span className="text-xs text-gray-600">{displayAuthor}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {readTime}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;