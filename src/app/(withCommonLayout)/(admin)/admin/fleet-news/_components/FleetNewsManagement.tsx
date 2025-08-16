"use client";

import { SearchIcon } from "@/src/components/icons";
import { IFleetNews } from "@/src/types";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useMemo, useState } from "react";
import AdminFleetNewsTable from "./AdminFleetNewsTable";

type FleetNewsManagementProps = {
  fleetNewsData: IFleetNews[];
};

export default function FleetNewsManagement({ fleetNewsData }: FleetNewsManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFleetNews, setSelectedFleetNews] = useState<IFleetNews | null>(null);

  // Filter fleet news based on search term
  const filteredFleetNews = useMemo(() => {
    if (!searchTerm) return fleetNewsData;

    return fleetNewsData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.badge.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [fleetNewsData, searchTerm]);

  const handleDeleteOpen = () => {
    // Don't do anything as requested
    console.log("Delete functionality will be handled elsewhere");
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="w-full space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-1">
          <div className="w-full sm:w-80">
            <Input
              classNames={{
                base: "max-w-full h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Search fleet news..."
              size="sm"
              startContent={<SearchIcon size={18} />}
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {searchTerm && (
            <Button size="sm" variant="flat" color="secondary" onClick={handleClearSearch}>
              Clear Search
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-default-500">
          <span>
            Showing {filteredFleetNews.length} of {fleetNewsData.length} items
          </span>
        </div>
      </div>

      {/* Table */}
      <AdminFleetNewsTable
        fleetNewsData={filteredFleetNews}
        onDeleteOpen={handleDeleteOpen}
        setSelectedFleetNews={setSelectedFleetNews}
      />
    </div>
  );
}
