"use client";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import {
  Controller,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../../_components/DataFetchingStates";

import { Input } from "@heroui/input";
import {
  useCreateWheelWidthType,
  useDeleteWheelWidthType,
  useGetWheelWidthTypes,
  useUpdateWheelWidthType,
} from "@/src/hooks/wheelWhidthType";
import WheelWidthTypeTable from "./WheelWidthTypeTable";

interface IWheelWidthType {
  _id: string;
  widthType: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminWheelWidthType() {
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
  const [selectedWheelWidthType, setSelectedWheelWidthType] =
    useState<IWheelWidthType | null>(null);

  const {
    mutate: handleCreateWheelWidthType,
    isPending: createWheelWidthTypePending,
  } = useCreateWheelWidthType({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_WHEEL_WIDTH_TYPES"] });
      toast.success("Wheel width type created successfully");
      methods.reset();
      onClose();
    },
  }); // Wheel width creation handler
  const {
    mutate: handleUpdateWheelWidthType,
    isPending: updateWheelWidthPendingType,
  } = useUpdateWheelWidthType({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_WHEEL_WIDTH_TYPES"] });
      toast.success("Wheel width type updated successfully");
      methods.reset();
      setSelectedWheelWidthType(null);
      onEditClose();
    },
    id: selectedWheelWidthType?._id,
  }); // Wheel width update handler
  const {
    mutate: handleDeleteWheelWidthType,
    isPending: deleteWheelWidthPendingType,
  } = useDeleteWheelWidthType({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_WHEEL_WIDTH_TYPES"] });
      toast.success("Wheel width type deleted successfully");
      setSelectedWheelWidthType(null);
      onDeleteClose();
    },
    id: selectedWheelWidthType?._id,
  }); // Wheel width deletion handler
  const {
    data: wheelWidthTypes,
    isLoading,
    isError,
    refetch,
  } = useGetWheelWidthTypes({}); // Get existing wheel widths
  console.log(wheelWidthTypes);

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    handleCreateWheelWidthType(formData); // Send wheel width data
  };

  const onEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    handleUpdateWheelWidthType(formData); // Send wheel width data
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Wheel Width Types
        </h1>
        <Button
          color="primary"
          className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}>
          + Add Wheel Width Type
        </Button>
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {wheelWidthTypes?.data?.length === 0 && <DataEmpty />}

      {!isLoading && wheelWidthTypes?.data?.length > 0 && (
        <WheelWidthTypeTable
          wheelWidthTypes={wheelWidthTypes}
          setSelectedWheelWidthType={setSelectedWheelWidthType}
          onEditOpen={onEditOpen}
          onDeleteOpen={onDeleteOpen}
        />
      )}

      {/* Modal for adding a new Wheel Width */}
      <AddWheelWidthTypeModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createWheelWidthTypePending={createWheelWidthTypePending}
      />
      {/* Modal for editing a Wheel Width */}
      <EditWheelWidthTypeModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        updateWheelWidthTypePending={updateWheelWidthPendingType}
        defaultValues={selectedWheelWidthType}
      />
      {/* Modal for deleting a Wheel Width */}
      <DeleteWheelWidthTypeModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteWheelWidthType={handleDeleteWheelWidthType}
        deleteWheelWidthPendingType={deleteWheelWidthPendingType}
      />
    </div>
  );
}

const AddWheelWidthTypeModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  createWheelWidthPendingType,
}: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Wheel Width Type
            </ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  {/* Width Input */}
                  <div className=" w-full py-2">
                    <Controller
                      name="widthType"
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "Wheel width Type is required" }}
                      render={({ field, fieldState }) => (
                        <Input
                          {...field}
                          label="Wheel Width Type"
                          placeholder="Enter wheel width Type (e.g., wide, extra wide, standard)"
                          onChange={(e) => field.onChange(e.target.value)}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                        />
                      )}
                    />
                  </div>

                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={createWheelWidthPendingType}>
                    {createWheelWidthPendingType
                      ? "Creating..."
                      : "Create Wheel Width Type"}
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

const EditWheelWidthTypeModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  updateWheelWidthPendingType,
  defaultValues,
}: any) => {
  if (!defaultValues) return null;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        onOpenChange();
        methods.reset();
      }}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Wheel Width Type
            </ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  <div className="flex flex-wrap gap-4 py-2">
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <Controller
                          name="widthType"
                          control={methods.control}
                          defaultValue={defaultValues?.widthType}
                          rules={{ required: "Wheel width type is required" }}
                          render={({ field, fieldState }) => (
                            <Input
                              {...field}
                              label="Wheel Width Type"
                              placeholder="Enter wheel width Type (e.g., wide, extra wide, standard)"
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
                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={updateWheelWidthPendingType}>
                    {updateWheelWidthPendingType
                      ? "Updating..."
                      : "Update Wheel Width Type"}
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

const DeleteWheelWidthTypeModal = ({
  isOpen,
  onOpenChange,
  handleDeleteWheelWidthType,
  deleteWheelWidthPendingType,
}: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirm Delete
            </ModalHeader>

            <ModalBody>
              <p className="text-sm text-red-500">
                ⚠️ Are you sure you want to delete this width type? This action
                cannot be undone.
              </p>
            </ModalBody>

            <ModalFooter className="flex justify-end gap-2">
              <Button
                variant="bordered"
                className="rounded"
                onPress={onOpenChange}>
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={handleDeleteWheelWidthType}
                disabled={deleteWheelWidthPendingType}
                className="rounded">
                {deleteWheelWidthPendingType ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
