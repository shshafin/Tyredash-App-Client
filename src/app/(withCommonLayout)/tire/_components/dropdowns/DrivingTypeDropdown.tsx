import { useState, useEffect, useRef } from "react";

export const DrivingTypeDropdown = ({
  drivingTypes,
  selectedDrivingTypes,
  setSelectedDrivingTypes,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDrivingType = (drivingType: string) => {
    if (selectedDrivingTypes.includes(drivingType)) {
      // Remove make if it's already selected
      setSelectedDrivingTypes(
        selectedDrivingTypes.filter((b: string) => b !== drivingType),
      );
    } else {
      // Add make to selected list
      setSelectedDrivingTypes([...selectedDrivingTypes, drivingType]);
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
          {selectedDrivingTypes.length > 0
            ? `${selectedDrivingTypes.length} selected`
            : "Select Driving Types"}
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
            {drivingTypes.map((drivingType: string) => (
              <div
                key={drivingType}
                className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => toggleDrivingType(drivingType)}
              >
                <span
                  className={`mr-2 w-4 h-4 rounded-full border-2 ${
                    selectedDrivingTypes.includes(drivingType)
                      ? "bg-blue-500 border-blue-500"
                      : "bg-transparent border-gray-300"
                  }`}
                ></span>
                {drivingType}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
