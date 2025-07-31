import { useState, useEffect, useRef } from "react";

export const TrimDropdown = ({
  trims,
  selectedTrims,
  setSelectedTrims,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleTrim = (trim: string) => {
    if (selectedTrims.includes(trim)) {
      // Remove make if it's already selected
      setSelectedTrims(selectedTrims.filter((b: string) => b !== trim));
    } else {
      // Add make to selected list
      setSelectedTrims([...selectedTrims, trim]);
    }
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Label with 'Select' */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-800 dark:text-white"
      >
        <span>
          {selectedTrims.length > 0
            ? `${selectedTrims.length} selected`
            : "Select Model"}
        </span>
        <svg
          className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto border border-gray-300 rounded-md bg-white shadow-lg dark:bg-gray-700">
          <div className="p-2">
            {(trims || []).map((trim: string) => (
              <div
                key={trim}
                className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => toggleTrim(trim)}
              >
                <span
                  className={`mr-2 w-4 h-4 rounded-full border-2 ${
                    selectedTrims.includes(trim)
                      ? "bg-blue-500 border-blue-500"
                      : "bg-transparent border-gray-300"
                  }`}
                ></span>
                {trim}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
