"use client";

import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { Controller, FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  useCreateWheelRatio,
  useDeleteWheelRatio,
  useGetWheelRatios,
  useUpdateWheelRatio,
} from "@/src/hooks/wheelRatio.hook";
import { useState } from "react";
import { DataEmpty, DataError, DataLoading } from "../../_components/DataFetchingStates";
import WheelRatioTable from "./WheelRatioTable";
import { Input } from "@heroui/input";

interface IWheelRatio {
  _id: string;
  ratio: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminWheelRatio() {
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
  const [selectedWheelRatio, setSelectedWheelRatio] = useState<IWheelRatio | null>(null);

  const { mutate: handleCreateWheelRatio, isPending: createWheelRatioPending } = useCreateWheelRatio({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_WHEEL_RATIO"] });
      toast.success("Wheel ratio created successfully");
      methods.reset();
      onClose();
    },
  }); // Wheel ratio creation handler
  const { mutate: handleUpdateWheelRatio, isPending: updateWheelRatioPending } = useUpdateWheelRatio({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_WHEEL_RATIO"] });
      toast.success("Wheel ratio updated successfully");
      methods.reset();
      setSelectedWheelRatio(null);
      onEditClose();
    },
    id: selectedWheelRatio?._id,
  }); // Wheel ratio update handler
  const { mutate: handleDeleteWheelRatio, isPending: deleteWheelRatioPending } = useDeleteWheelRatio({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_WHEEL_RATIO"] });
      toast.success("Wheel ratio deleted successfully");
      setSelectedWheelRatio(null);
      onDeleteClose();
    },
    id: selectedWheelRatio?._id,
  }); // Wheel ratio deletion handler
  const { data: wheelRatios, isLoading, isError, refetch } = useGetWheelRatios({}); // Get existing wheel ratios
  console.log(wheelRatios);

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    handleCreateWheelRatio(formData); // Send wheel ratio data
  };

  const onEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    handleUpdateWheelRatio(formData); // Send wheel ratio data
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">Wheel Ratios</h1>
        <Button
          color="primary"
          className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}
        >
          + Add Wheel Ratio
        </Button>
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {wheelRatios?.data?.length === 0 && <DataEmpty />}

      {!isLoading && wheelRatios?.data?.length > 0 && (
        <WheelRatioTable
          wheelRatios={wheelRatios}
          setSelectedYear={setSelectedWheelRatio}
          onEditOpen={onEditOpen}
          onDeleteOpen={onDeleteOpen}
        />
      )}

      {/* Modal for adding a new Wheel Ratio */}
      <AddWheelModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createWheelRatioPending={createWheelRatioPending}
      />
      {/* Modal for editing a Wheel Ratio */}
      <EditWheelRatioModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        updateYearPending={updateWheelRatioPending}
        defaultValues={selectedWheelRatio}
      />
      {/* Modal for deleting a Wheel Ratio */}
      <DeleteWheelRatioModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteYear={handleDeleteWheelRatio}
        deleteYearPending={deleteWheelRatioPending}
      />
    </div>
  );
}

const AddWheelModal = ({ isOpen, onOpenChange, methods, handleSubmit, onSubmit, createWheelRatioPending }: any) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Wheel Ratio</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-6">
                  {/* Ratio Input */}
                  <div className=" w-full py-2">
                    <Controller
                      name="ratio"
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "Wheel ratio is required" }}
                      render={({ field, fieldState }) => (
                        <Input
                          {...field}
                          label="Wheel Ratio"
                          placeholder="Enter wheel ratio (e.g., 65, 70, 75)"
                          onChange={(e) => field.onChange(e.target.value)}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                        />
                      )}
                    />
                  </div>

                  <Button color="primary" type="submit" className="w-full rounded" disabled={createWheelRatioPending}>
                    {createWheelRatioPending ? "Creating..." : "Create Wheel Ratio"}
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

const EditWheelRatioModal = ({
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
            <ModalHeader className="flex flex-col gap-1">Edit Wheel Ratio</ModalHeader>
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
                          rules={{ required: "Wheel ratio is required" }}
                          render={({ field, fieldState }) => (
                            <Input
                              {...field}
                              label="Wheel Ratio"
                              placeholder="Enter wheel ratio (e.g., 65, 70, 75)"
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
                    {updateYearPending ? "Updating..." : "Update Wheel Ratio"}
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

const DeleteWheelRatioModal = ({ isOpen, onOpenChange, handleDeleteYear, deleteYearPending }: any) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Confirm Delete</ModalHeader>

            <ModalBody>
              <p className="text-sm text-red-500">
                ⚠️ Are you sure you want to delete this wheel ratio? This action cannot be undone.
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
