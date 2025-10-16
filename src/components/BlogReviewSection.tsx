"use client";

import Link from "next/link";

interface BlogPost {
  id?: number;
  title: string;
  url?: string;
  link_url?: string; // API returns link_url instead of url
  thumbnail_url?: string;
  excerpt?: string;
  description?: string; // API returns description instead of excerpt
  author?: string;
  published_date?: string;
}

interface BlogReviewSectionProps {
  blogs?: BlogPost[];
}

export function BlogReviewSection({ blogs }: BlogReviewSectionProps) {
  console.log("BlogReviewSection - blogs prop:", blogs);

  if (!blogs || blogs.length === 0) {
    console.log("No blogs to display");
    return null;
  }

  console.log("Displaying", blogs.length, "blogs");

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          블로그 리뷰
        </h2>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {blogs
            .filter((blog) => blog.url || blog.link_url) // Filter out blogs without URL
            .map((blog, index) => (
              <Link
                key={blog.id || index}
                href={blog.url || blog.link_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
                  {blog.thumbnail_url ? (
                    <div className="relative bg-gray-100" style={{ paddingBottom: '80%' }}>
                      <img
                        src={blog.thumbnail_url}
                        alt={blog.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder-image.png";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="relative bg-gradient-to-br from-gray-100 to-gray-200" style={{ paddingBottom: '80%' }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="p-3">
                    <h3 className="font-medium text-sm text-gray-900 group-hover:text-[#FB6541] transition-colors line-clamp-2 mb-1.5">
                      {blog.title}
                    </h3>
                    {(blog.excerpt || blog.description) && (
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                        {blog.excerpt || blog.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      {blog.author && (
                        <span className="truncate max-w-[100px]">
                          {blog.author}
                        </span>
                      )}
                      {blog.published_date && (
                        <span className="flex-shrink-0">
                          {new Date(blog.published_date).toLocaleDateString(
                            "ko-KR",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
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
