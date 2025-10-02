"use client";

import Link from "next/link";

interface BlogPost {
  id?: number;
  title: string;
  url?: string;
  link_url?: string;  // API returns link_url instead of url
  thumbnail_url?: string;
  excerpt?: string;
  description?: string;  // API returns description instead of excerpt
  author?: string;
  published_date?: string;
}

interface BlogReviewSectionProps {
  blogs?: BlogPost[];
}

export function BlogReviewSection({ blogs }: BlogReviewSectionProps) {
  console.log('BlogReviewSection - blogs prop:', blogs);
  
  if (!blogs || blogs.length === 0) {
    console.log('No blogs to display');
    return null;
  }
  
  console.log('Displaying', blogs.length, 'blogs');

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">블로그 리뷰</h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs
            .filter((blog) => blog.url || blog.link_url) // Filter out blogs without URL
            .map((blog, index) => (
              <Link
                key={blog.id || index}
                href={blog.url || blog.link_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                  {blog.thumbnail_url ? (
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                      <img
                        src={blog.thumbnail_url}
                        alt={blog.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder-image.png";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                      </svg>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 group-hover:text-[#FB6541] transition-colors line-clamp-2 mb-2">
                      {blog.title}
                    </h3>
                    {(blog.excerpt || blog.description) && (
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {blog.excerpt || blog.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      {blog.author && <span>{blog.author}</span>}
                      {blog.published_date && (
                        <span>{new Date(blog.published_date).toLocaleDateString('ko-KR')}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}