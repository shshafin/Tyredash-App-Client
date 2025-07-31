import React from "react";

const SidebarLoading = () => {
  return (
    <div className="space-y-3">
      {/* Skeleton Loader for Sidebar */}
      <div className="rounded-xl bg-default-100 p-4">
        <div className="h-64 w-full rounded-md bg-gray-300 animate-pulse"></div>
        <div className="mt-4 text-center">
          <div className="h-6 w-24 bg-gray-300 animate-pulse mb-2"></div>
          <div className="h-4 w-32 bg-gray-300 animate-pulse"></div>
        </div>
      </div>
      <div className="rounded-xl bg-default-100 p-4">
        <div className="h-8 w-36 bg-gray-300 animate-pulse"></div>
      </div>
    </div>
  );
};

export default SidebarLoading;
