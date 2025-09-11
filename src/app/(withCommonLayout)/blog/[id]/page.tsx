"use client";

import { DataError } from "@/src/app/(withCommonLayout)/(admin)/admin/_components/DataFetchingStates";
import { envConfig } from "@/src/config/envConfig";
import { useGetSingleBlog } from "@/src/hooks/blog.hook";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

const BlogDetailSkeleton = () => (
  <div className="min-h-screen bg-background animate-pulse">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

    <div className="relative z-10">
      <div className="bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 border-b border-red-500/20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-5 h-5 bg-muted rounded"></div>
            <div className="w-40 h-5 bg-muted rounded"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-muted rounded-full"></div>
            <div className="w-48 h-4 bg-muted rounded"></div>
          </div>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="w-32 h-8 bg-muted rounded-lg mb-6"></div>
            <div className="w-full h-16 bg-muted rounded mb-8"></div>
            <div className="w-full h-96 bg-muted rounded-xl mb-12"></div>
            <div className="space-y-4">
              <div className="w-full h-4 bg-muted rounded"></div>
              <div className="w-full h-4 bg-muted rounded"></div>
              <div className="w-3/4 h-4 bg-muted rounded"></div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="w-full h-48 bg-muted rounded-xl"></div>
              <div className="w-full h-12 bg-muted rounded-xl"></div>
              <div className="w-full h-24 bg-muted rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const unwrappedParams = use(params as any); // unwrap the promise
  const id = (unwrappedParams as any).id;

  const router = useRouter();
  const { data: blog, isLoading, isError } = useGetSingleBlog(id);

  const [readingProgress, setReadingProgress] = useState(0);
  // const [readingTime, setReadingTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    setStartTime(Date.now());

    // Track reading progress
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blog]);

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatElapsedTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = blog?.data?.title || "Automotive Tips & Guide";

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      copy: url,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } else {
      window.open(shareUrls[platform as keyof typeof shareUrls], "_blank");
    }
    setShowShareMenu(false);
  };

  if (isLoading) return <BlogDetailSkeleton />;
  if (isError) return <DataError />;
  if (!blog || !blog.data) return <div className="p-6">Blog not found</div>;

  const post = blog.data;

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10">
        <div className="bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 border-b border-red-500/20">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="flex items-center gap-2 bg-gradient-to-r from-muted/50 to-muted/30 hover:from-red-500/10 hover:to-red-600/10 border border-border hover:border-red-500/30 px-4 py-2 rounded-lg transition-all duration-300 text-muted-foreground hover:text-red-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span className="font-medium">Back to Tips & Guides</span>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-red-700 rounded-full"></div>
              <span className="text-red-500 font-mono text-sm tracking-wider uppercase">
                Automotive Tips & Guides
              </span>
            </div>
          </div>
        </div>

        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Category Badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg shadow-red-500/25">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    {post.category}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-lg blur-sm opacity-50 -z-10"></div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent mb-8 leading-tight">
                {post.title}
              </h1>

              {/* Image Container */}
              <div className="relative mb-12 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative">
                  {post.image ? (
                    <div className="relative w-full h-96 lg:h-[500px] rounded-xl overflow-hidden bg-muted/50 backdrop-blur-sm border border-red-500/20">
                      <Image
                        src={`${envConfig.base_url}${post.image}`}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full h-96 lg:h-[500px] bg-muted/50 backdrop-blur-sm border border-red-500/20 text-muted-foreground rounded-xl">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-red-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                        <p className="text-lg font-semibold">
                          Automotive Guide Image
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-red-500 to-transparent rounded-full"></div>
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8">
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <div className="text-foreground leading-relaxed text-lg">
                      {post.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Guide Stats Card */}
                <div className="bg-card/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    Guide Stats
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Category</span>
                      <span className="text-red-500 font-semibold">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Published on
                      </span>
                      <span className="text-red-500 font-semibold">
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Time Reading
                      </span>
                      <span className="text-red-500 font-semibold font-mono">
                        {formatElapsedTime(elapsedTime)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Difficulty</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-green-600/20 px-3 py-1 rounded-full border border-green-500/30">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                            Beginner
                          </span>
                        </div>
                        <div className="flex gap-1">
                          {[1, 2].map((i) => (
                            <div
                              key={i}
                              className="w-3 h-3 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-sm"></div>
                          ))}
                          {[3, 4, 5].map((i) => (
                            <div
                              key={i}
                              className="w-3 h-3 bg-muted/60 rounded-full border border-muted-foreground/20"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="relative">
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="w-full bg-muted hover:bg-muted/80 text-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-border hover:border-red-500/50">
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                          />
                        </svg>
                        Share Guide
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${showShareMenu ? "rotate-180" : ""}`}
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
                      </span>
                    </button>

                    {showShareMenu && (
                      <div className="mt-3 bg-card/80 backdrop-blur-sm border border-red-500/20 rounded-xl shadow-lg overflow-hidden">
                        <div className="p-3 space-y-2">
                          <button
                            onClick={() => handleShare("twitter")}
                            className="w-full text-left px-4 py-3 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-3 text-foreground hover:text-red-500">
                            {/* Updated X (Twitter) Icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              viewBox="0 0 512 512">
                              <g clipPath="url(#clip0_84_15698)">
                                <rect
                                  width="512"
                                  height="512"
                                  fill="none"
                                  rx="60"></rect>
                                <path
                                  fill="currentColor"
                                  d="M355.904 100H408.832L293.2 232.16L429.232 412H322.72L239.296 302.928L143.84 412H90.8805L214.56 270.64L84.0645 100H193.28L268.688 199.696L355.904 100ZM337.328 380.32H366.656L177.344 130.016H145.872L337.328 380.32Z"></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_84_15698">
                                  <rect
                                    width="512"
                                    height="512"
                                    fill="none"></rect>
                                </clipPath>
                              </defs>
                            </svg>
                            Share on X
                          </button>
                          <button
                            onClick={() => handleShare("facebook")}
                            className="w-full text-left px-4 py-3 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-3 text-foreground hover:text-red-500">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Share on Facebook
                          </button>
                          <button
                            onClick={() => handleShare("linkedin")}
                            className="w-full text-left px-4 py-3 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-3 text-foreground hover:text-red-500">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            Share on LinkedIn
                          </button>
                          <button
                            onClick={() => handleShare("copy")}
                            className="w-full text-left px-4 py-3 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-3 text-foreground hover:text-red-500">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            Copy Link
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                  <h4 className="text-lg font-bold text-foreground mb-4">
                    Your Progress
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Reading Progress
                      </span>
                      <span className="text-red-500">
                        {Math.round(readingProgress)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${readingProgress}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
