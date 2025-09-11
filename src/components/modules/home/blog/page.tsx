"use client";

import { envConfig } from "@/src/config/envConfig";
import { useGetBlogs } from "@/src/hooks/blog.hook";
import Image from "next/image";
import Link from "next/link";

const BlogSection = () => {
  const { data: blogData, isLoading } = useGetBlogs({});
  console.log(blogData, "blogData in BlogSection");

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 border-t-red-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300 font-medium tracking-wide">
            Loading Premium Content...
          </p>
        </div>
      </div>
    );

  // Function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <section className="relative px-4 py-20 overflow-hidden">
      <div className="relative z-10 text-center mb-16">
        <div className="inline-block">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent tracking-tight">
            AUTOMOTIVE
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-4"></div>
          <p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300 tracking-widest uppercase">
            Excellence in Motion
          </p>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {blogData?.data?.map((post: any, index: number) => (
            <div
              key={post._id}
              className="group relative bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl overflow-hidden hover:bg-white/15 dark:hover:bg-black/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/10"
              style={{
                animationDelay: `${index * 100}ms`,
              }}>
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold tracking-wider uppercase rounded-full shadow-lg backdrop-blur-sm">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                  {post.category}
                </span>
              </div>

              <div className="relative overflow-hidden">
                {post.image ? (
                  <div className="relative h-64 lg:h-72">
                    <Image
                      src={`${envConfig.base_url}${post.image}`}
                      alt={post.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 lg:h-72 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-500 font-medium">
                        Premium Content
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 font-light">
                  {truncateText(post.description, 120)}
                </p>

                <Link
                  href={`/blog/${post._id}`}
                  className="group/btn inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold tracking-wide uppercase text-sm rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105">
                  <span className="mr-2">Explore</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/4 -right-32 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default BlogSection;
