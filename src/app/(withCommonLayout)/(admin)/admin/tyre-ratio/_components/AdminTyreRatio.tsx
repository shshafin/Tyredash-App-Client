"use client";

import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { Controller, FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  useCreateTireRatio,
  useDeleteTireRatio,
  useGetTireRatios,
  useUpdateTireRatio,
} from "@/src/hooks/tireRatio.hook";
import { useState, useEffect, useMemo } from "react";
import { DataEmpty, DataError, DataLoading } from "../../_components/DataFetchingStates";
import TireRatioTable from "./TyreRatioTable";
import { Input } from "@heroui/input";

interface ITireRatio {
  _id: string;
  ratio: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminTyreRatio() {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure(); // Modal open state
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
  const methods = useForm(); // Hook form methods

  const { handleSubmit } = methods;
  const [selectedTireRatio, setSelectedTireRatio] = useState<ITireRatio | null>(null);

  const { mutate: handleCreateTireRatio, isPending: createTireRatioPending } = useCreateTireRatio({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_TIRE_RATIO"] });
      toast.success("Tire ratio created successfully");
      methods.reset();
      onClose();
    },
  }); // Tire ratio creation handler
  const { mutate: handleUpdateTireRatio, isPending: updateTireRatioPending } = useUpdateTireRatio({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_TIRE_RATIO"] });
      toast.success("Tire ratio updated successfully");
      methods.reset();
      setSelectedTireRatio(null);
      onEditClose();
    },
    id: selectedTireRatio?._id,
  }); // Tire ratio update handler
  const { mutate: handleDeleteTireRatio, isPending: deleteTireRatioPending } = useDeleteTireRatio({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_TIRE_RATIO"] });
      toast.success("Tire ratio deleted successfully");
      setSelectedTireRatio(null);
      onDeleteClose();
    },
    id: selectedTireRatio?._id,
  }); // Tire ratio deletion handler
  const { data: tyreRatios, isLoading, isError, refetch } = useGetTireRatios({}); // Get existing tyre ratios
  console.log(tyreRatios);

  // Client-side pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const totalItems = tyreRatios?.data?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
    if (currentPage < 1) setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  const paginatedRatios = useMemo(() => {
    if (!tyreRatios?.data) return tyreRatios;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return { ...tyreRatios, data: tyreRatios.data.slice(start, end) };
  }, [tyreRatios, currentPage, pageSize]);

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    handleCreateTireRatio(formData); // Send tire ratio data
  };

  const onEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    handleUpdateTireRatio(formData); // Send tire ratio data
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">Tyre Ratios</h1>
        <Button
          color="primary"
          className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}
        >
          + Add Tyre Ratio
        </Button>
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {tyreRatios?.data?.length === 0 && <DataEmpty />}

      {!isLoading && tyreRatios?.data?.length > 0 && (
        <>
          <TireRatioTable
            tyreRatios={paginatedRatios}
            setSelectedYear={setSelectedTireRatio}
            onEditOpen={onEditOpen}
            onDeleteOpen={onDeleteOpen}
          />

          {/* Pagination controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {Math.min(totalItems, (currentPage - 1) * pageSize + 1)} -{" "}
              {Math.min(totalItems, currentPage * pageSize)} of {totalItems}
            </div>

            <div className="flex items-center gap-2">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
                <option value={50}>50 / page</option>
              </select>

              <div className="flex items-center gap-1">
                <Button
                  variant="bordered"
                  size="sm"
                  onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </Button>

                <div className="px-3 text-sm">
                  {currentPage} / {totalPages}
                </div>

                <Button
                  variant="bordered"
                  size="sm"
                  onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal for adding a new Tire Ratio */}
      <AddTyreModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createTireRatioPending={createTireRatioPending}
      />
      {/* Modal for editing a Tire Ratio */}
      <EditTyreRatioModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        updateYearPending={updateTireRatioPending}
        defaultValues={selectedTireRatio}
      />
      {/* Modal for deleting a Tire Ratio */}
      <DeleteTireRatioModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteYear={handleDeleteTireRatio}
        deleteYearPending={deleteTireRatioPending}
      />
    </div>
  );
}

const AddTyreModal = ({ isOpen, onOpenChange, methods, handleSubmit, onSubmit, createTireRatioPending }: any) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Tire Ratio</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-6">
                  {/* Ratio Input */}
                  <div className=" w-full py-2">
                    <Controller
                      name="ratio"
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "Tire ratio is required" }}
                      render={({ field, fieldState }) => (
                        <Input
                          {...field}
                          label="Tire Ratio"
                          placeholder="Enter tire ratio (e.g., 65, 70, 75)"
                          onChange={(e) => field.onChange(e.target.value)}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                        />
                      )}
                    />
                  </div>

                  <Button color="primary" type="submit" className="w-full rounded" disabled={createTireRatioPending}>
                    {createTireRatioPending ? "Creating..." : "Create Tire Ratio"}
                  </Button>
                </form>
              </FormProvider>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const EditTyreRatioModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  updateYearPending,
  defaultValues,
}: any) => {
  if (!defaultValues) return null;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        onOpenChange();
        methods.reset();
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Tire Ratio</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-6">
                  <div className="flex flex-wrap gap-4 py-2">
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <Controller
                          name="ratio"
                          control={methods.control}
                          defaultValue={defaultValues.ratio}
                          rules={{ required: "Tire ratio is required" }}
                          render={({ field, fieldState }) => (
                            <Input
                              {...field}
                              label="Tire Ratio"
                              placeholder="Enter tire ratio (e.g., 65, 70, 75)"
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              isInvalid={!!fieldState.error}
                              errorMessage={fieldState.error?.message}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <Button color="primary" type="submit" className="w-full rounded" disabled={updateYearPending}>
                    {updateYearPending ? "Updating..." : "Update Tire Ratio"}
                  </Button>
                </form>
              </FormProvider>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const DeleteTireRatioModal = ({ isOpen, onOpenChange, handleDeleteYear, deleteYearPending }: any) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Confirm Delete</ModalHeader>

            <ModalBody>
              <p className="text-sm text-red-500">
                ⚠️ Are you sure you want to delete this tire ratio? This action cannot be undone.
              </p>
            </ModalBody>

            <ModalFooter className="flex justify-end gap-2">
              <Button variant="bordered" className="rounded" onPress={onOpenChange}>
                Cancel
              </Button>
              <Button color="danger" onPress={handleDeleteYear} disabled={deleteYearPending} className="rounded">
                {deleteYearPending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
