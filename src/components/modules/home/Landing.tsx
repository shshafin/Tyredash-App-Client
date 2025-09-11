"use client";

import Image from "next/image";
import ProductsAndServices from "./ProductsAndServices";
import { useGetAllDeals } from "@/src/hooks/deals.hook";

export default function Landing() {
  const { data, isLoading, isError } = useGetAllDeals();
  const deals = data?.data || [];
  return (
    <div className="pb-12">
      {/* Top Banner */}
      <div className="bg-default-900 text-white text-sm px-4 py-2 flex flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
        <Image
          src="/promo.webp"
          alt="Promo Icon"
          width={40}
          height={40}
        />
        <div className="flex flex-wrap items-center justify-center gap-1 text-default-900 text-xs sm:text-lg font-medium">
          <strong className="font-bold text-default-50">
            {deals && deals.length > 0
              ? deals[deals.length - 1].title
              : "5% OFF"}
          </strong>

          <span className="text-sm sm:text-2xl text-default-50">†</span>
        </div>
        <a
          href="/deals"
          className="text-yellow-500 text-sm sm:text-lg font-semibold underline">
          Learn more.
        </a>
      </div>

      {/* Hero Section */}
      <div>
        <video
          className="w-full h-[200px] sm:h-[300px] md:h-[450px] lg:h-[500px] object-cover"
          autoPlay
          muted
          loop
          playsInline>
          <source
            src="/banner.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Action Area */}
        <div className="max-w-5xl mx-auto px-4  text-center">
          <ProductsAndServices />
        </div>
      </div>
    </div>
  );
}
