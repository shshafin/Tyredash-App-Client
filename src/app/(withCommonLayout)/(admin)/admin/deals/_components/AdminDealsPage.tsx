"use client";

import { useGetBrands } from "@/src/hooks/brand.hook";
import { useDeleteDeal, useGetAllDeals } from "@/src/hooks/deals.hook";
import { IDeal } from "@/src/types";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataEmpty, DataError, DataLoading } from "../../_components/DataFetchingStates";
import DealsTable from "./DealsTable";

export default function AdminDealsPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  //   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
    onClose: onDeleteClose,
  } = useDisclosure();

  const [selectedDeal, setSelectedDeal] = useState<IDeal | null>(null);

  const { mutate: handleDeleteDeal, isPending: deleteDealPending } = useDeleteDeal({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_DEALS"] });
      toast.success("Deal deleted successfully");
      setSelectedDeal(null);
      onDeleteClose();
    },
    id: selectedDeal?._id,
  });

  const { data: deals, isLoading, isError } = useGetAllDeals();
  const { data: brands } = useGetBrands({});

  // Client-side pagination state
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const pageSizeOptions = [5, 10, 25];

  const totalItems = deals?.data?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalItems, pageSize, totalPages, page]);

  const paginatedDeals = deals ? { ...deals, data: deals.data.slice((page - 1) * pageSize, page * pageSize) } : deals;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">Deals Management</h1>
        <div className="flex gap-2">
          <Button
            color="primary"
            variant="bordered"
            className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-white"
            onPress={() => router.push("/admin/deals/create")}
          >
            + Add Deal
          </Button>
        </div>
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {deals?.data?.length === 0 && <DataEmpty />}

      {!isLoading && deals?.data?.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <label className="text-sm">Show</label>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="border rounded px-2 py-1"
              >
                {pageSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <span className="text-sm text-muted">items per page</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">{`Page ${page} of ${totalPages}`}</span>
              <Button
                variant="bordered"
                className="rounded disabled:opacity-50"
                onPress={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </Button>
              <Button
                className="rounded disabled:opacity-50"
                variant="bordered"
                onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </div>

          <DealsTable
            deals={paginatedDeals}
            onDeleteOpen={onDeleteOpen}
            onEditOpen={onEditOpen}
            setSelectedDeal={setSelectedDeal}
          />
        </>
      )}

      {/* Delete Deal Modal */}
      <DeleteDealModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteDeal={handleDeleteDeal}
        deleteDealPending={deleteDealPending}
        selectedDeal={selectedDeal}
      />
    </div>
  );
}

const DeleteDealModal = ({ isOpen, onOpenChange, handleDeleteDeal, deleteDealPending, selectedDeal }: any) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Confirm Delete</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete the deal "{selectedDeal?.title}"?</p>
              <p className="text-sm text-danger">This action cannot be undone.</p>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={() => {
                  handleDeleteDeal();
                }}
                disabled={deleteDealPending}
              >
                {deleteDealPending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
