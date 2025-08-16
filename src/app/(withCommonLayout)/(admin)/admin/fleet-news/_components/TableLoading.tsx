import { Skeleton } from "@heroui/skeleton";
import React from "react";

const TableLoading = () => {
  return (
    <div className="w-full">
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          {/* Table header skeleton */}
          <div className="flex gap-4 mb-4">
            <Skeleton className="h-6 w-20 rounded" />
            <Skeleton className="h-6 w-32 rounded" />
            <Skeleton className="h-6 w-48 rounded" />
            <Skeleton className="h-6 w-24 rounded" />
            <Skeleton className="h-6 w-20 rounded" />
          </div>

          {/* Table rows skeleton */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex gap-4 mb-3">
              <Skeleton className="h-8 w-20 rounded" />
              <Skeleton className="h-8 w-32 rounded" />
              <Skeleton className="h-8 w-48 rounded" />
              <Skeleton className="h-8 w-24 rounded" />
              <Skeleton className="h-8 w-20 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableLoading;
