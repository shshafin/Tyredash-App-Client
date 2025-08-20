"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetAllDeals } from "@/src/hooks/deals.hook";
import { ArrowRight, Loader2, ShoppingBag } from "lucide-react";
import { Button } from "@heroui/button";
import { useQueryClient } from "@tanstack/react-query";

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
        <p className="text-xl font-semibold text-destructive">Failed to load deals</p>
        <Button onPress={() => queryClient.invalidateQueries({ queryKey: ["GET_ALL_DEALS"] })}>Try Again</Button>
      </div>
    );
  }

  const deals = data?.data || [];
  const totalPages = Math.ceil(deals.length / ITEMS_PER_PAGE);

  // Paginate the deals
  const paginatedDeals = deals.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
            <Button size="lg" className="gap-2">
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
      <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {paginatedDeals.map((deal: any) => (
          <div key={deal._id} className="px-1">
            <div className="relative h-full bg-white/10 border border-white/30 backdrop-blur-md rounded-2xl shadow-lg p-0 overflow-hidden flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
              <div className="relative w-full h-[160px]">
                <Image src={deal.image} alt="deal" fill className="object-cover w-full h-full" />
              </div>
              <div className="p-4 text-default-900 flex flex-col items-center text-center">
                <h3 className="text-base font-bold mb-2">{deal.title}</h3>
                {deal.description && <p className="text-sm text-default-800 mb-1">{deal.description}</p>}
                <p className="text-xs text-default-700 mb-2">Expires {deal.validTo}</p>
                <Link href={`/deals/${deal?._id}`}>
                  <button className="bg-red-600 text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-red-700 transition">
                    SEE DETAILS
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <Button onPress={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button onPress={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default AllDealsPage;
