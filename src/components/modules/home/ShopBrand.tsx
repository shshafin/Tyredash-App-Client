"use client";

import { envConfig } from "@/src/config/envConfig";
import { useGetBrands } from "@/src/hooks/brand.hook";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@heroui/skeleton";
import { ChevronRight, Star, Shield } from "lucide-react";

const ShopByBrandSection = () => {
  const { data: brands, isError, isLoading } = useGetBrands({ limit: 12 });

  // Render skeleton loading UI
  if (isLoading) {
    return (
      <section className="py-7 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-black dark:via-black dark:to-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading Skeleton */}
          <div className="text-center mb-16">
            <Skeleton className="h-6 w-56 mx-auto mb-4 rounded-full" />
            <Skeleton className="h-14 w-4/5 mx-auto mb-6 rounded-lg" />
            <Skeleton className="h-6 w-3/4 mx-auto mb-2 rounded-full" />
            <Skeleton className="h-6 w-2/3 mx-auto rounded-full" />
          </div>

          {/* Brand Logos Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <Skeleton className="w-20 h-20 mx-auto rounded-xl mb-4" />
                <Skeleton className="h-4 w-16 mx-auto rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className="py-7 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-black dark:via-black dark:to-black overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-red-900 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-red-700 text-lg">
              We're having trouble loading our tire brands. Please refresh the
              page or try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-7 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-black dark:via-black dark:to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,20,29,0.03),transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg shadow-red-500/20">
            <Star className="w-4 h-4 fill-current" />
            <span className="uppercase tracking-wider">
              Premium Tire Brands
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-200 mb-6 leading-tight">
            Choose Your Perfect
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent block sm:inline sm:ml-4">
              Tire Brand
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover premium tire brands trusted by millions of drivers
            worldwide.
            <span className="font-semibold text-gray-800 dark:text-gray-400 block mt-2">
              Quality, performance, and safety – all in one place.
            </span>
          </p>
        </div>

        {/* Brand Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 lg:gap-8">
          {brands?.data?.map((brand: any, index: number) => (
            <Link
              key={brand.id}
              href={`/tire?brand=${encodeURIComponent(brand._id)}`}
              className="group block">
              <div
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-2 relative overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}>
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Brand Logo */}
                <div className="relative z-10">
                  {brand.logo ? (
                    <div className="w-20 h-20 mx-auto mb-4 relative">
                      <div className="w-full h-full rounded-xl bg-gray-50 group-hover:bg-white transition-colors duration-300 flex items-center justify-center overflow-hidden">
                        <Image
                          src={`${envConfig.base_url}${brand.logo}`}
                          alt={brand.name}
                          width={80}
                          height={80}
                          className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Premium Badge */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                        <Star className="w-3 h-3 text-white fill-current" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-gray-50 group-hover:to-gray-100 transition-all duration-300">
                      <span className="text-sm text-gray-700 font-semibold text-center px-2">
                        {brand.name}
                      </span>
                    </div>
                  )}

                  {/* Brand Name */}
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-red-600 transition-colors duration-300">
                      {brand.name}
                    </h3>

                    {/* Explore Text */}
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-500 group-hover:text-red-500 transition-colors duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                      <span>Explore</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <div className="flex-1 text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Can't find your preferred brand?
              </h3>
              <p className="text-gray-600">
                Contact our tire experts for personalized recommendations
              </p>
            </div>
            <a href="/contact">
              <button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 hover:-translate-y-1 flex items-center gap-2">
                <span>Contact Expert</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByBrandSection;
