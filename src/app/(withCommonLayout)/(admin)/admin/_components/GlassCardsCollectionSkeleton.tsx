import React from "react";

const GlassCardSkeleton = () => {
  return (
    <div className="rounded-2xl p-5 bg-gradient-to-br from-gray-300 to-gray-400 bg-opacity-30 backdrop-blur-md shadow-md border border-white/20 flex justify-between items-center animate-pulse">
      <div className="space-y-2">
        {/* Title skeleton */}
        <div className="h-4 bg-white/40 rounded w-24"></div>
        {/* Value skeleton */}
        <div className="h-8 bg-white/50 rounded w-16"></div>
      </div>
      {/* Icon skeleton */}
      <div className="bg-white/30 p-3 rounded-full shadow-inner">
        <div className="w-6 h-6 bg-white/40 rounded"></div>
      </div>
    </div>
  );
};

export default GlassCardSkeleton;

// export default function GlassCardsCollectionSkeleton() {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
//       {/* Generate 8 skeleton cards to match the original component */}
//       {Array.from({ length: 8 }).map((_, index) => (
//         <GlassCardSkeleton key={index} />
//       ))}
//     </div>
//   );
// }
