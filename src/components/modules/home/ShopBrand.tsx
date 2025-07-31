"use client"

import { envConfig } from "@/src/config/envConfig"
import { useGetBrands } from "@/src/hooks/brand.hook"
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "@heroui/skeleton"

const ShopByBrandSection = () => {
  const { data: brands, isError, isLoading } = useGetBrands({limit: 12})

  // Render skeleton loading UI
  if (isLoading) {
    return (
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Section Heading Skeleton */}
          <div className="mb-10">
            <Skeleton className="h-6 w-48 mx-auto mb-4" />
            <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-20 w-2/3 mx-auto" />
          </div>

          {/* Brand Logos Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center p-2">
                <Skeleton className="w-[100px] h-[100px] rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (isError) {
    return (
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-red-600">Unable to load brands</h2>
          <p className="mt-2">Please try again later</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Heading */}
        <div className="mb-10">
          <h3 className="text-[#FF141D] text-sm sm:text-base font-semibold uppercase">Shop by Tire Brand</h3>
          <h2 className="downtext-gradient text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Choose the Best Tires for Your Journey
          </h2>
          <p className="downtext-gradient text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Browse top tire brands and find the perfect fit for your car, truck, or SUV.
            <span className="font-bold block">Get the quality and performance you need for every road.</span>
          </p>
        </div>

        {/* Brand Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands?.data?.map((brand: any) => (
            <Link key={brand.id} href={`/tire?brand=${encodeURIComponent(brand._id)}`} className="group">
              <div className="cursor-pointer transition-all duration-300 hover:scale-105 p-2 rounded-xl hover:shadow-md">
                {brand.logo ? (
                  <div className="relative">
                    <Image
                      src={`${envConfig.base_url}${brand.logo}`}
                      alt={brand.name}
                      width={100}
                      height={100}
                      className="w-full h-auto max-w-[150px] mx-auto rounded-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-full transition-all duration-300"></div>
                  </div>
                ) : (
                  <div className="w-[100px] h-[100px] mx-auto rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm text-gray-600 font-medium">{brand.name}</span>
                  </div>
                )}
                <p className="mt-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {brand.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShopByBrandSection
