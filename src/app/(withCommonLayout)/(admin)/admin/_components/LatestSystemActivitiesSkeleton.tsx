export default function LatestSystemActivitiesSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Newest Products Section Skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`skeleton-product-${index}`}
            className="p-4 border border-white/20 bg-white/10 backdrop-blur-md rounded-xl shadow-lg animate-pulse"
          >
            <div className="flex items-start justify-between">
              {/* Left section skeleton */}
              <div className="flex flex-col space-y-2 text-left flex-1">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>

              {/* Right section skeleton */}
              <div className="flex flex-col items-end space-y-2 text-right ml-4">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Financial Reports Section Skeleton */}
      <div className="flex items-center justify-center border border-dashed border-gray-400 dark:border-gray-600 rounded-xl p-6 text-center bg-gray-100 dark:bg-gray-900 animate-pulse">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
      </div>

      {/* Sales Section Skeleton */}
      <div className="flex items-center justify-center border border-dashed border-gray-400 dark:border-gray-600 rounded-xl p-6 text-center bg-gray-100 dark:bg-gray-900 animate-pulse">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
      </div>
    </div>
  );
}
