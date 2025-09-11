"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetAllDeals } from "@/src/hooks/deals.hook";
import {
  ArrowRight,
  Loader2,
  ShoppingBag,
  Clock,
  Star,
  Zap,
  TrendingUp,
  Shield,
  Award,
} from "lucide-react";
import { Button } from "@heroui/button";
import { useQueryClient } from "@tanstack/react-query";
import { envConfig } from "@/src/config/envConfig";

const ITEMS_PER_PAGE = 10; // Number of items per page

const AllDealsPage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useGetAllDeals();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading deals...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold text-destructive">
          Failed to load deals
        </p>
        <Button
          onPress={() =>
            queryClient.invalidateQueries({ queryKey: ["GET_ALL_DEALS"] })
          }>
          Try Again
        </Button>
      </div>
    );
  }

  const deals = data?.data || [];
  const totalPages = Math.ceil(deals.length / ITEMS_PER_PAGE);

  // Paginate the deals
  const paginatedDeals = deals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (deals.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
          <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-semibold">No Deals Found</h2>
          <Link href="/">
            <Button
              size="lg"
              className="gap-2">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <Zap className="h-8 w-8 text-red-600 dark:text-red-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">
            Premium Tires & Wheels
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Discover unbeatable deals on premium tires and wheels from top
          automotive brands. Quality guaranteed, performance delivered.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Shield className="h-4 w-4" />
            <span>Lifetime Warranty</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <TrendingUp className="h-4 w-4" />
            <span>Price Match Guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Award className="h-4 w-4" />
            <span>Expert Installation</span>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedDeals?.map((deal: any) => (
          <div
            key={deal._id}
            className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex flex-col">
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-600 text-white animate-pulse">
                🔥 HOT DEAL
              </span>

              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500 text-white">
                LIMITED STOCK
              </span>

              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500 text-white">
                ⭐ BEST SELLER
              </span>
            </div>

            <div className="relative h-48 overflow-hidden">
              <Image
                src={`${envConfig.base_url}${deal.image}`}
                alt={deal.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100">
                  {deal.brand?.name}
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                {deal.title}
              </h3>

              {deal.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {deal.description}
                </p>
              )}

              {/* <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                    ${deal.salePrice}
                  </span>
                  <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                    ${deal.originalPrice}
                  </span>
                </div>
                <div className="text-sm font-medium text-amber-600 dark:text-amber-400">
                  You save ${deal.originalPrice - deal.salePrice}!
                </div>
              </div> */}

              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
                <Clock className="h-4 w-4" />
                <span className="font-medium">
                  Expires{" "}
                  {new Date(deal.validTo).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <Link
                href={`/deals/${deal?._id}`}
                className="block mt-auto">
                <button className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2">
                  VIEW DEAL
                  <Zap className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </section>

      <div className="flex justify-center items-center gap-6 mt-12">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-8 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          Previous
        </button>
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Page {currentPage} of {totalPages}
          </span>
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-8 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          Next
        </button>
      </div>
    </div>
  );
};

export default AllDealsPage;
