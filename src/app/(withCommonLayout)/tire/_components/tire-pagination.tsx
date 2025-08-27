const TirePagination = ({ currentPage, totalPages, onPageChange }: any) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-12">
      <div className="flex items-center gap-1">
        {/* Prev button */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`py-2 px-2 border rounded-lg ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}>
          ◀
        </button>

        {/* Page numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-8 w-8 flex items-center justify-center border rounded-lg text-sm font-medium shadow-sm
              ${
                currentPage === page
                  ? "bg-gradient-to-r from-orange-600 to-orange-400 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}>
            {page}
          </button>
        ))}

        {/* Next button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`py-2 px-2 border rounded-lg ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}>
          ▶
        </button>
      </div>
    </div>
  );
};

export default TirePagination;
