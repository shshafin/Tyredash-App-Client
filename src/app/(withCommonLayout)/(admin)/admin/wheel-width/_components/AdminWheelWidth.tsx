"use client";

import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { Controller, FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  useCreateWheelWidth,
  useDeleteWheelWidth,
  useGetWheelWidths,
  useUpdateWheelWidth,
} from "@/src/hooks/wheelWidth.hook";
import { useState } from "react";
import { DataEmpty, DataError, DataLoading } from "../../_components/DataFetchingStates";

import { Input } from "@heroui/input";
import WheelWidthTable from "./WheelWidthTable";

interface IWheelWidth {
  _id: string;
  width: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminWheelWidth() {
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
  const [selectedWheelWidth, setSelectedWheelWidth] = useState<IWheelWidth | null>(null);

  const { mutate: handleCreateWheelWidth, isPending: createWheelWidthPending } = useCreateWheelWidth({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_WHEEL_WIDTH"] });
      toast.success("Wheel width created successfully");
      methods.reset();
      onClose();
    },
  }); // Wheel width creation handler
  const { mutate: handleUpdateWheelWidth, isPending: updateWheelWidthPending } = useUpdateWheelWidth({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_WHEEL_WIDTH"] });
      toast.success("Wheel width updated successfully");
      methods.reset();
      setSelectedWheelWidth(null);
      onEditClose();
    },
    id: selectedWheelWidth?._id,
  }); // Wheel width update handler
  const { mutate: handleDeleteWheelWidth, isPending: deleteWheelWidthPending } = useDeleteWheelWidth({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_WHEEL_WIDTH"] });
      toast.success("Wheel width deleted successfully");
      setSelectedWheelWidth(null);
      onDeleteClose();
    },
    id: selectedWheelWidth?._id,
  }); // Wheel width deletion handler
  const { data: wheelWidths, isLoading, isError, refetch } = useGetWheelWidths({}); // Get existing wheel widths
  console.log(wheelWidths);

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    handleCreateWheelWidth(formData); // Send wheel width data
  };

  const onEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    handleUpdateWheelWidth(formData); // Send wheel width data
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">Wheel Widths</h1>
        <Button
          color="primary"
          className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}
        >
          + Add Wheel Width
        </Button>
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {wheelWidths?.data?.length === 0 && <DataEmpty />}

      {!isLoading && wheelWidths?.data?.length > 0 && (
        <WheelWidthTable
          wheelWidths={wheelWidths}
          setSelectedWheelWidth={setSelectedWheelWidth}
          onEditOpen={onEditOpen}
          onDeleteOpen={onDeleteOpen}
        />
      )}

      {/* Modal for adding a new Wheel Width */}
      <AddWheelWidthModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createWheelWidthPending={createWheelWidthPending}
      />
      {/* Modal for editing a Wheel Width */}
      <EditWheelWidthModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        updateWheelWidthPending={updateWheelWidthPending}
        defaultValues={selectedWheelWidth}
      />
      {/* Modal for deleting a Wheel Width */}
      <DeleteWheelWidthModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteWheelWidth={handleDeleteWheelWidth}
        deleteWheelWidthPending={deleteWheelWidthPending}
      />
    </div>
  );
}

const AddWheelWidthModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  createWheelWidthPending,
}: any) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Wheel Width</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-6">
                  {/* Width Input */}
                  <div className=" w-full py-2">
                    <Controller
                      name="width"
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "Wheel width is required" }}
                      render={({ field, fieldState }) => (
                        <Input
                          {...field}
                          label="Wheel Width"
                          placeholder="Enter wheel width (e.g., 6.5, 7.0, 8.0)"
                          onChange={(e) => field.onChange(e.target.value)}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                        />
                      )}
                    />
                  </div>

                  <Button color="primary" type="submit" className="w-full rounded" disabled={createWheelWidthPending}>
                    {createWheelWidthPending ? "Creating..." : "Create Wheel Width"}
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

const EditWheelWidthModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  updateWheelWidthPending,
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
            <ModalHeader className="flex flex-col gap-1">Edit Wheel Width</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-6">
                  <div className="flex flex-wrap gap-4 py-2">
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <Controller
                          name="width"
                          control={methods.control}
                          defaultValue={defaultValues.width}
                          rules={{ required: "Wheel width is required" }}
                          render={({ field, fieldState }) => (
                            <Input
                              {...field}
                              label="Wheel Width"
                              placeholder="Enter wheel width (e.g., 6.5, 7.0, 8.0)"
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
                  <Button color="primary" type="submit" className="w-full rounded" disabled={updateWheelWidthPending}>
                    {updateWheelWidthPending ? "Updating..." : "Update Wheel Width"}
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

const DeleteWheelWidthModal = ({ isOpen, onOpenChange, handleDeleteWheelWidth, deleteWheelWidthPending }: any) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Confirm Delete</ModalHeader>

            <ModalBody>
              <p className="text-sm text-red-500">
                ⚠️ Are you sure you want to delete this wheel width? This action cannot be undone.
              </p>
            </ModalBody>

            <ModalFooter className="flex justify-end gap-2">
              <Button variant="bordered" className="rounded" onPress={onOpenChange}>
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={handleDeleteWheelWidth}
                disabled={deleteWheelWidthPending}
                className="rounded"
              >
                {deleteWheelWidthPending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
