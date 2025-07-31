"use client";

import React, { useEffect, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Deal {
  id: number;
  discount: string;
  description: string;
  expires: string;
  cta: string;
  image: string;
}

const DealsCarousel = ({ data }: { data: Deal[] }) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 3,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 12 },
      },
    },
  });

  // Autoplay effect
  useEffect(() => {
    const slider = instanceRef.current;

    const autoplay = () => {
      if (slider) {
        slider.next();
      }
    };

    timerRef.current = setInterval(autoplay, 3000); // every 3 seconds

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [instanceRef]);

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-10 overflow-hidden">
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/30 backdrop-blur-sm border rounded-full shadow-md"
      >
        <ChevronLeft />
      </button>

      <div ref={sliderRef} className="keen-slider">
        {data.map((deal) => (
          <div key={deal.id} className="keen-slider__slide px-1">
            <div className="relative h-full bg-white/10 border border-white/30 backdrop-blur-md rounded-2xl shadow-lg p-0 overflow-hidden flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
              {/* Full Image on top */}
              <div className="relative w-full h-[160px]">
                <Image
                  src={deal.image}
                  alt="deal"
                  fill
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="p-4 text-default-900 flex flex-col items-center text-center">
                <h3 className="text-base font-bold mb-2">{deal.discount}</h3>
                {deal.description && (
                  <p className="text-sm text-default-800 mb-1">
                    {deal.description}
                  </p>
                )}
                <p className="text-xs text-default-700 mb-2">
                  Expires {deal.expires}
                </p>

                <button className="bg-red-600 text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-red-700 transition">
                  {deal.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/30 backdrop-blur-sm border rounded-full shadow-md"
      >
        <ChevronRight />
      </button>

      <div className="text-center mt-6">
        <Link href='/deals'>
          <button className="border-2 border-red-600 text-red-600 font-semibold px-6 py-2 rounded hover:bg-red-50">
            SEE ALL CURRENT DEALS
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DealsCarousel;
