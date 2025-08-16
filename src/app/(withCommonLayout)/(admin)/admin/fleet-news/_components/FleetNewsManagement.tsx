"use client";

import { SearchIcon } from "@/src/components/icons";
import { IFleetNews } from "@/src/types";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDeleteFleetNews } from "@/src/hooks/fleetNews";
import AdminFleetNewsTable from "./AdminFleetNewsTable";

type FleetNewsManagementProps = {
  fleetNewsData: IFleetNews[];
};

export default function FleetNewsManagement({ fleetNewsData }: FleetNewsManagementProps) {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFleetNews, setSelectedFleetNews] = useState<IFleetNews | null>(null);

  // Modal state for delete confirmation
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
    onClose: onDeleteClose,
  } = useDisclosure();

  // Delete fleet news mutation
  const { mutate: handleDeleteFleetNews, isPending: deleteFleetNewsPending } = useDeleteFleetNews({
    onSuccess: () => {
      toast.success("Fleet news deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["GET_FLEET_NEWS"] });
      onDeleteClose();
      setSelectedFleetNews(null);
    },
    id: selectedFleetNews?._id,
  });

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
    onDeleteOpen();
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

        {/* <div className="flex items-center gap-2 text-sm text-default-500">
          <span>
            Showing {filteredFleetNews.length} of {fleetNewsData.length} items
          </span>
        </div> */}
      </div>

      {/* Table */}
      <AdminFleetNewsTable
        fleetNewsData={filteredFleetNews}
        onDeleteOpen={handleDeleteOpen}
        setSelectedFleetNews={setSelectedFleetNews}
      />

      {/* Delete Confirmation Modal */}
      <DeleteFleetNewsModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteFleetNews={handleDeleteFleetNews}
        deleteFleetNewsPending={deleteFleetNewsPending}
        selectedFleetNews={selectedFleetNews}
      />
    </div>
  );
}

// Delete Fleet News Modal Component
const DeleteFleetNewsModal = ({
  isOpen,
  onOpenChange,
  handleDeleteFleetNews,
  deleteFleetNewsPending,
  selectedFleetNews,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  handleDeleteFleetNews: any;
  deleteFleetNewsPending: boolean;
  selectedFleetNews: IFleetNews | null;
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Confirm Delete</ModalHeader>

            <ModalBody>
              <div className="space-y-3">
                <p className="text-sm text-red-500 font-medium">⚠️ Are you sure you want to delete this fleet news?</p>
                {selectedFleetNews && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="font-semibold text-sm">{selectedFleetNews.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {selectedFleetNews.description.length > 100
                        ? `${selectedFleetNews.description.substring(0, 100)}...`
                        : selectedFleetNews.description}
                    </p>
                  </div>
                )}
                <p className="text-xs text-gray-500">This action cannot be undone.</p>
              </div>
            </ModalBody>

            <ModalFooter className="flex justify-end gap-2">
              <Button variant="bordered" className="rounded" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={() => {
                  handleDeleteFleetNews();
                }}
                disabled={deleteFleetNewsPending}
                className="rounded"
              >
                {deleteFleetNewsPending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
