import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

const ProductCardList = ({ tire }: { tire: any }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col sm:flex-row">
      <div className="relative w-full sm:w-1/3 sm:max-w-[280px]">
        <div
          ref={sliderRef}
          className="keen-slider h-[220px] bg-gray-100 dark:bg-gray-900"
        >
          {tire.images && tire.images.length > 0 ? (
            tire.images.map((image: string, index: number) => (
              <div
                key={index}
                className="keen-slider__slide flex items-center justify-center p-4"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${image}`}
                  alt={`${tire.name} - Image ${index + 1}`}
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

        {tire.images && tire.images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.next();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {tire.images.map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentSlide === idx
                      ? "w-6 bg-gradient-to-r from-orange-600 to-orange-400"
                      : "w-1.5 bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}

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
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3.5 w-3.5 ${
                  star <= 5
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 dark:text-gray-600 fill-gray-300 dark:fill-gray-600"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              5.0
            </span>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              {tire.year.year}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-blue-200">
              {tire.brand.name}
            </span>
          </div>
        </div>

        <h3 className="font-medium text-lg line-clamp-1 mb-2 text-gray-900 dark:text-gray-100">
          {tire.name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 flex-grow">
          {tire.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
              ${(tire.price * 1.2).toFixed(2)}
            </span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${tire.price.toFixed(2)}
            </span>
          </div>
          <div className="flex gap-2">
            <button className="py-2 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to Cart
            </button>
            <button className="py-2 px-3 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg text-sm font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center">
              View Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 ml-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardList;
