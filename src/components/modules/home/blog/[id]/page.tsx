"use client";

import {
  DataError,
  DataLoading,
} from "@/src/app/(withCommonLayout)/(admin)/admin/_components/DataFetchingStates";
import { envConfig } from "@/src/config/envConfig";
import { useGetSingleBlog } from "@/src/hooks/blog.hook";
import Image from "next/image";

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const { data: blog, isLoading, isError } = useGetSingleBlog(id);

  if (isLoading) return <DataLoading />;
  if (isError) return <DataError />;
  if (!blog || !blog.data) return <div className="p-6">Blog not found</div>;

  const post = blog.data;

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      {/* Category Badge */}
      <span className="inline-block bg-red-500 dark:bg-red-700/80 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
        {post.category}
      </span>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
        {post.title}
      </h1>

      {/* Image */}
      {post.image ? (
        <div className="relative w-full h-80 mb-8 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={`${envConfig.base_url}${post.image}`}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-80 mb-8 bg-gray-200 dark:bg-gray-700 text-gray-500 rounded-xl">
          No Image
        </div>
      )}

      {/* Description */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>{post.description}</p>
      </div>
    </section>
  );
}
