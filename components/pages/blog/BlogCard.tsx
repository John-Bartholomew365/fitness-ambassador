// components/blog/BlogCard.tsx
import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, User } from 'lucide-react';

interface BlogCardProps {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  slug,
  excerpt,
  author,
  date,
  readTime,
  category,
  featured = false
}) => {
  return (
    <article className="group">
      <Link href={`/blog/${slug}`}>
        <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
          {/* Content */}
          <div className="p-6">
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
                {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#008020] transition-colors line-clamp-2">
              {title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-3 h-3 text-gray-500" />
                </div>
                <span className="text-xs text-gray-600">{author}</span>
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