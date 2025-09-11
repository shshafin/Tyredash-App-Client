"use client";

import { envConfig } from "@/src/config/envConfig";
import { useGetBlogs } from "@/src/hooks/blog.hook";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  createdAt: string;
}

interface BlogResponse {
  data: BlogPost[];
  total: number;
}

interface UseGetBlogsResult {
  data: BlogResponse | null;
  isLoading: boolean;
  error: string | null;
}

const BlogSection = () => {
  const { data: blogData, isLoading } = useGetBlogs({});

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredAndSortedBlogs = blogData?.data
    ? (() => {
        const filtered = blogData.data.filter((post: BlogPost) => {
          const matchesSearch = post.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const matchesCategory =
            selectedCategory === "All" || post.category === selectedCategory;
          return matchesSearch && matchesCategory;
        });

        // Sort the filtered results
        filtered.sort((a: BlogPost, b: BlogPost) => {
          switch (sortBy) {
            case "newest":
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            case "oldest":
              return (
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
              );
            case "alphabetical":
              return a.title.localeCompare(b.title);
            default:
              return 0;
          }
        });

        return filtered;
      })()
    : [];

  const totalPages = Math.ceil(filteredAndSortedBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = filteredAndSortedBlogs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const categories = [
    "All",
    ...Array.from(
      new Set(blogData?.data?.map((post: BlogPost) => post.category) || [])
    ),
  ];

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  console.log(blogData, "blogData in BlogSection");

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black z-50">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 border-4 border-gray-300 dark:border-gray-600 border-t-red-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-center text-gray-700 dark:text-gray-300 font-medium tracking-wide">
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
          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 dark:from-slate-100 dark:via-white dark:to-slate-100 bg-clip-text text-transparent tracking-tighter leading-none">
              TIPS & GUIDES
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 blur-xl opacity-50"></div>
          </div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-400"></div>
            <div className="w-3 h-3 bg-red-500 rotate-45"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-400"></div>
          </div>
          <p className="text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300 tracking-wider uppercase">
            Master Your Machine
          </p>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 rounded-2xl p-6 border-2 border-red-500/20 dark:border-red-400/20 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 w-full lg:w-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search guides by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-black border-2 border-gray-700 rounded-xl focus:border-red-500 focus:outline-none transition-colors duration-300 text-white placeholder-gray-400 font-medium"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-black border-2 border-gray-700 rounded-xl px-4 py-3 pr-10 focus:border-red-500 focus:outline-none transition-colors duration-300 text-white font-medium cursor-pointer">
                {categories.map((category: any, index: any) => (
                  <option
                    key={index}
                    value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Sort Options */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-black border-2 border-gray-700 rounded-xl px-4 py-3 pr-10 focus:border-red-500 focus:outline-none transition-colors duration-300 text-white font-medium cursor-pointer">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="alphabetical">A-Z</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-white font-medium whitespace-nowrap">
              {filteredAndSortedBlogs.length} guide
              {filteredAndSortedBlogs.length !== 1 ? "s" : ""} found
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {paginatedBlogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-2xl flex items-center justify-center">
              <svg
                className="w-12 h-12 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V3a1 1 0 00-1-1h-4a1 1 0 00-1 1v3.306"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              No guides found
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {paginatedBlogs.map((post: BlogPost, index: number) => (
              <div
                key={post._id}
                className="group relative h-full"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}>
                <div className="relative h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-black dark:to-black rounded-2xl overflow-hidden border-2 border-red-500/60 dark:border-red-400/60 transition-all duration-700 hover:-translate-y-2 hover:scale-[1.02] flex flex-col">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-300/20 via-transparent to-slate-600/20 dark:from-slate-600/20 dark:to-slate-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute top-4 left-4 z-20">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-lg blur-sm opacity-75"></div>
                      <span className="relative inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold tracking-wide uppercase rounded-lg shadow-lg backdrop-blur-sm border border-red-400/30">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse shadow-sm"></div>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="relative overflow-hidden flex-shrink-0">
                    {post.image ? (
                      <div className="relative h-48">
                        <Image
                          src={`${envConfig.base_url}${post.image}`}
                          alt={post.title}
                          fill
                          className="object-cover transition-all duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-transparent to-red-500/30 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/30 to-transparent transform rotate-45 translate-x-12 -translate-y-12"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-400 to-slate-500 dark:from-slate-600 dark:to-slate-700 rounded-xl flex items-center justify-center shadow-xl">
                            <svg
                              className="w-8 h-8 text-white"
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
                          <p className="text-slate-600 dark:text-slate-400 font-bold text-sm">
                            Premium Guide
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative p-6 flex-grow flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent dark:from-slate-800/50 rounded-b-2xl"></div>

                    <div className="relative z-10 flex-grow flex flex-col">
                      <h3 className="text-lg lg:text-xl font-black text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300 text-balance flex-grow">
                        {post.title}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-medium text-sm line-clamp-3">
                        {truncateText(post.description, 100)}
                      </p>

                      <Link
                        href={`/blog/${post._id}`}
                        className="group/btn relative inline-flex items-center mt-auto w-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-xl blur-lg opacity-75 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold tracking-wider uppercase text-xs rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105 border border-red-400/30 text-center">
                          <span className="mr-2">Read Guide</span>
                          <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 inline"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500/0 via-red-500 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-slate-200/30 to-transparent dark:from-slate-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-slate-200/30 to-transparent dark:from-slate-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center mt-16 gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:border-red-500 dark:hover:border-red-400 transition-colors duration-300 text-slate-900 dark:text-white font-medium">
              Previous
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      currentPage === page
                        ? "bg-gradient-to-r from-red-500 to-red-600 text-white border-2 border-red-400/30 shadow-lg"
                        : "bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:border-red-500 dark:hover:border-red-400"
                    }`}>
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:border-red-500 dark:hover:border-red-400 transition-colors duration-300 text-slate-900 dark:text-white font-medium">
              Next
            </button>
          </div>
        )}
      </div>

      <div className="absolute top-1/3 -right-40 w-80 h-80 bg-red-500/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 -left-40 w-80 h-80 bg-slate-500/8 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-red-500/5 to-transparent rounded-full blur-3xl"></div>
    </section>
  );
};

export default BlogSection;
