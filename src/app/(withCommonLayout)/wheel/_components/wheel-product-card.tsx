"use client";

import { useUser } from "@/src/context/user.provider";
import { useAddItemToCart } from "@/src/hooks/cart.hook";
import { useAddItemToWishlist } from "@/src/hooks/wishlist.hook";
import { useQueryClient } from "@tanstack/react-query";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight, ExternalLink, Heart, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// Product card component with image slider
const ProductCard = ({ wheel }: { wheel: any }) => {
    const queryClient = useQueryClient();
      const { user } = useUser();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });
    const { mutate: handleAddItemToCart, isPending } =
      useAddItemToCart({
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["GET_CART"] });
          toast.success("Cart updated successfully");
        },
        userId: user?._id,
      });
      const { mutate: handleAddItemToWishlist } =
      useAddItemToWishlist({
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["GET_CART"] });
          toast.success("Item added to wishlist successfully");
        },
      });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
      <div className="relative">
        <div
          ref={sliderRef}
          className="keen-slider h-[220px] bg-gray-100 dark:bg-gray-900"
        >
          {wheel.images && wheel.images.length > 0 ? (
            wheel.images.map((image: string, index: number) => (
              <div
                key={index}
                className="keen-slider__slide flex items-center justify-center p-4"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${image}`}
                  alt={`${wheel.name} - Image ${index + 1}`}
                  className="object-contain max-h-full max-w-full"
                />
              </div>
            ))
          ) : (
            <div className="keen-slider__slide flex items-center justify-center">
              <span className="text-gray-400 dark:text-gray-500">
                No Images Available
              </span>
            </div>
          )}
        </div>

        {wheel.images && wheel.images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.next();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {wheel.images.map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentSlide === idx
                      ? "w-6 bg-orange-500"
                      : "w-1.5 bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-2 right-2 flex gap-1.5">
          <button
            onClick={()=>{
              if (!user) {
                                  toast.error("Please login to add items to wishlist")
                                  redirect('/login?redirect=/wheel')
                                }
              handleAddItemToWishlist({
                product: wheel?._id, 
                productType: 'wheel'
              })
            }}
            className="h-8 w-8 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-700 shadow-md"
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4 text-gray-700 dark:text-gray-300 hover:text-pink-500" />
          </button>
        </div>

        {/* Discount badge */}
        <div className="absolute top-2 left-2">
          <div className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
            -20%
          </div>
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className={`h-3.5 w-3.5 ${
                  star <= 5
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 dark:text-gray-600 fill-gray-300 dark:fill-gray-600"
                }`}/>
            ))}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              5.0
            </span>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            {wheel.year.year}
          </span>
        </div>

        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 w-fit mb-2">
          {wheel.brand.name}
        </span>

        <h3 className="font-medium text-base line-clamp-2 mb-2 mt-1.5 text-gray-900 dark:text-gray-100">
          {wheel.name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 flex-grow">
          {wheel.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
              ${(wheel.price * 1.2).toFixed(2)}
            </span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${wheel.price.toFixed(2)}
            </span>
          </div>
          <div className="flex gap-2">
            <button 
            disabled={isPending} 
            onClick={()=>{
              if (!user) {
                                  toast.error("Please login to add items to cart")
                                  redirect('/login?redirect=/wheel')
                                }
              handleAddItemToCart({
                productId: wheel?._id, 
                productType: 'wheel', 
                quantity: 1,
              })
            }} 
            className="py-2 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center">
              <ShoppingCart className="h-4 w-4 mr-1.5" />
              {isPending ? "Adding" : "Add"}
            </button>
            <Link href={`/wheel/${wheel?._id}`}>
              <button className="py-2 px-3 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg text-sm font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center">
                Details
                <ExternalLink className="h-4 w-4 mr-1.5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
