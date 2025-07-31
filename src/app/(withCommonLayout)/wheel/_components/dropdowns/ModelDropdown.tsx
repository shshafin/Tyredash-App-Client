import { useState, useEffect, useRef } from "react";

export const ModelDropdown = ({
  models,
  selectedModels,
  setSelectedModels,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleModel = (model: string) => {
    if (selectedModels.includes(model)) {
      // Remove make if it's already selected
      setSelectedModels(selectedModels.filter((b: string) => b !== model));
    } else {
      // Add make to selected list
      setSelectedModels([...selectedModels, model]);
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
          {selectedModels.length > 0
            ? `${selectedModels.length} selected`
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
            {(models || []).map((model: string) => (
              <div
                key={model}
                className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => toggleModel(model)}
              >
                <span
                  className={`mr-2 w-4 h-4 rounded-full border-2 ${
                    selectedModels.includes(model)
                      ? "bg-blue-500 border-blue-500"
                      : "bg-transparent border-gray-300"
                  }`}
                ></span>
                {model}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
