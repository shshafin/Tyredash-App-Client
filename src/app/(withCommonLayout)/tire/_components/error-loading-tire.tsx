const ErrorLoadingTire = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4 max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="text-red-500 text-lg font-medium">
          Error loading products
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          Please try again later or contact support if the problem persists.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="py-2 px-4 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-sm font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 w-full"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default ErrorLoadingTire;
