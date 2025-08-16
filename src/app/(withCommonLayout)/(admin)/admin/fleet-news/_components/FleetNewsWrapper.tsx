"use client";

import { useGetAllFleetNews } from "@/src/hooks/fleetNews";
import FleetNewsManagement from "./FleetNewsManagement";
import TableLoading from "./TableLoading";

export default function FleetNewsWrapper() {
  const { data: fleetNewsData, isLoading, error } = useGetAllFleetNews();

  if (isLoading) {
    return <TableLoading />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">Error Loading Fleet News</h3>
          <p className="text-gray-500 dark:text-gray-400">Failed to load fleet news data. Please try again.</p>
        </div>
      </div>
    );
  }

  return <FleetNewsManagement fleetNewsData={fleetNewsData?.data || []} />;
}
