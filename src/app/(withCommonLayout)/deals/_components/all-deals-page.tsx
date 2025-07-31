"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetAllDeals } from "@/src/hooks/deals.hook";
import { ArrowRight, Loader2, ShoppingBag } from "lucide-react";
import { Button } from "@heroui/button";
import { useQueryClient } from "@tanstack/react-query";

// Here’s your backend's deal structure directly:
const dummyDeals = [
  {
    _id: 1,
    title: "5% Instant Savings",
    description:
      "On tires and wheels with any $599+ total purchase (after discounts)", 
    discountPercentage: "5%", 
    validTo: "05/01/2025",
    validFrom: "05/01/2025",
    image: "/deals.jpg",
    brand: {
        _id: 4,
        name: 'Toyota'
    }
  },
  {
    _id: 3,
    title: "Up to $80 Instant Savings on Michelin Tires",
    description:
      "On tires and wheels with any $599+ total purchase (after discounts)", 
    discountPercentage: "$80",
    validTo: "05/14/2025",
    validFrom: "05/14/2025",
    image: "/deals.jpg",
    brand: {
        _id: 7,
        name: 'Ford'
    }
  },
  {
    _id: 4,
    title: "Up to $80 Instant Savings on Michelin Tires",
    description:
      "On tires and wheels with any $599+ total purchase (after discounts)", 
    discountPercentage: "$80",
    validTo: "05/14/2025",
    validFrom: "05/14/2025",
    image: "/deals.jpg",
    brand: {
        _id: 8,
        name: 'Marcedes'
    }
  },
  {
    _id: 5,
    title: "Up to $80 Instant Savings on Michelin Tires",
    description:
      "On tires and wheels with any $599+ total purchase (after discounts)", 
    discountPercentage: "$80",
    validTo: "05/14/2025",
    validFrom: "05/14/2025",
    image: "/deals.jpg",
    brand: {
        _id: 9,
        name: 'BMW'
    }
  },
  
]

const AllDealsPage = () => {
  const queryClient = useQueryClient();
  const {data, isLoading, isError} = useGetAllDeals();
  console.log({data}, 'deasl')
    if (isLoading) {
      return (
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading deals...</span>
        </div>
      )
    }
  
    if (isError) {
      return (
        <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
          <p className="text-xl font-semibold text-destructive">Failed to load deals</p>
          <Button onPress={() => queryClient.invalidateQueries({ queryKey: ["GET_ALL_DEALS"] })}>Try Again</Button>
        </div>
      )
    }
    const deals = data?.data;
  
    if (deals?.length === 0) {
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
      )
    }
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {deals.map((deal: any) => (
          <div key={deal._id} className="px-1">
            <div className="relative h-full bg-white/10 border border-white/30 backdrop-blur-md rounded-2xl shadow-lg p-0 overflow-hidden flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
              {/* Full Image on top */}
              <div className="relative w-full h-[160px]">
                <Image src={deal.image} alt="deal" fill className="object-cover w-full h-full" />
              </div>

              {/* Content */}
              <div className="p-4 text-default-900 flex flex-col items-center text-center">
                <h3 className="text-base font-bold mb-2">
                   {deal.title}
                </h3>
                {deal.description && (
                   <p className="text-sm text-default-800 mb-1">
                      {deal.description}
                   </p>
                )}

                <p className="text-xs text-default-700 mb-2">
                   Expires {deal.validTo}
                </p>

                {/* You can omit this if you don't need a button, or customize it */}
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
    </div>
  )
}

export default AllDealsPage;
