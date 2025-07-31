const LoadingTire = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute top-0 left-0 right-0 bottom-0 animate-spin rounded-full border-4 border-t-orange-500 border-b-orange-700 border-l-transparent border-r-transparent"></div>
          <div className="absolute top-2 left-2 right-2 bottom-2 animate-ping rounded-full border-2 border-orange-500 opacity-20"></div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 animate-pulse">
          Loading products...
        </p>
      </div>
    </div>
  );
};

export default LoadingTire;
