const WheelNotFound = ({ clearFilters }: any) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-6 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-gray-400 dark:text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
        No products found
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
        We couldn't find any products matching your current filters. Try
        adjusting your search or filter criteria.
      </p>
      <button
        onClick={clearFilters}
        className="py-2 px-4 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-sm font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default WheelNotFound;
