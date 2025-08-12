"use client";

import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { Controller, FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  useCreateWheelDiameter,
  useDeleteWheelDiameter,
  useGetWheelDiameters,
  useUpdateWheelDiameter,
} from "@/src/hooks/wheelDiameter.hook";
import { useState } from "react";
import { DataEmpty, DataError, DataLoading } from "../../_components/DataFetchingStates";
import WheelDiameterTable from "./WheelDiameterTable";
import { Input } from "@heroui/input";

interface IWheelDiameter {
  _id: string;
  diameter: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminWheelDiameter() {
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
  const [selectedWheelDiameter, setSelectedWheelDiameter] = useState<IWheelDiameter | null>(null);

  const { mutate: handleCreateWheelDiameter, isPending: createWheelDiameterPending } = useCreateWheelDiameter({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_WHEEL_DIAMETER"] });
      toast.success("Wheel diameter created successfully");
      methods.reset();
      onClose();
    },
  }); // Wheel diameter creation handler
  const { mutate: handleUpdateWheelDiameter, isPending: updateWheelDiameterPending } = useUpdateWheelDiameter({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_WHEEL_DIAMETER"] });
      toast.success("Wheel diameter updated successfully");
      methods.reset();
      setSelectedWheelDiameter(null);
      onEditClose();
    },
    id: selectedWheelDiameter?._id,
  }); // Wheel diameter update handler
  const { mutate: handleDeleteWheelDiameter, isPending: deleteWheelDiameterPending } = useDeleteWheelDiameter({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_WHEEL_DIAMETER"] });
      toast.success("Wheel diameter deleted successfully");
      setSelectedWheelDiameter(null);
      onDeleteClose();
    },
    id: selectedWheelDiameter?._id,
  }); // Wheel diameter deletion handler
  const { data: wheelDiameters, isLoading, isError, refetch } = useGetWheelDiameters({}); // Get existing wheel diameters
  console.log(wheelDiameters);

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    handleCreateWheelDiameter(formData); // Send wheel diameter data
  };

  const onEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    handleUpdateWheelDiameter(formData); // Send wheel diameter data
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">Wheel Diameters</h1>
        <Button
          color="primary"
          className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}
        >
          + Add Wheel Diameter
        </Button>
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {wheelDiameters?.data?.length === 0 && <DataEmpty />}

      {!isLoading && wheelDiameters?.data?.length > 0 && (
        <WheelDiameterTable
          wheelDiameters={wheelDiameters}
          setSelectedWheelDiameter={setSelectedWheelDiameter}
          onEditOpen={onEditOpen}
          onDeleteOpen={onDeleteOpen}
        />
      )}

      {/* Modal for adding a new Wheel Diameter */}
      <AddWheelDiameterModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createWheelDiameterPending={createWheelDiameterPending}
      />
      {/* Modal for editing a Wheel Diameter */}
      <EditWheelDiameterModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        updateWheelDiameterPending={updateWheelDiameterPending}
        defaultValues={selectedWheelDiameter}
      />
      {/* Modal for deleting a Wheel Diameter */}
      <DeleteWheelDiameterModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteWheelDiameter={handleDeleteWheelDiameter}
        deleteWheelDiameterPending={deleteWheelDiameterPending}
      />
    </div>
  );
}

const AddWheelDiameterModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  createWheelDiameterPending,
}: any) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Wheel Diameter</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-6">
                  {/* Diameter Input */}
                  <div className=" w-full py-2">
                    <Controller
                      name="diameter"
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "Wheel diameter is required" }}
                      render={({ field, fieldState }) => (
                        <Input
                          {...field}
                          label="Wheel Diameter"
                          placeholder="Enter wheel diameter (e.g., 15, 16, 17, 18)"
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
                    disabled={createWheelDiameterPending}
                  >
                    {createWheelDiameterPending ? "Creating..." : "Create Wheel Diameter"}
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

const EditWheelDiameterModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  updateWheelDiameterPending,
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
            <ModalHeader className="flex flex-col gap-1">Edit Wheel Diameter</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-6">
                  <div className="flex flex-wrap gap-4 py-2">
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <Controller
                          name="diameter"
                          control={methods.control}
                          defaultValue={defaultValues.diameter}
                          rules={{ required: "Wheel diameter is required" }}
                          render={({ field, fieldState }) => (
                            <Input
                              {...field}
                              label="Wheel Diameter"
                              placeholder="Enter wheel diameter (e.g., 15, 16, 17, 18)"
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
                    disabled={updateWheelDiameterPending}
                  >
                    {updateWheelDiameterPending ? "Updating..." : "Update Wheel Diameter"}
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

const DeleteWheelDiameterModal = ({
  isOpen,
  onOpenChange,
  handleDeleteWheelDiameter,
  deleteWheelDiameterPending,
}: any) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Confirm Delete</ModalHeader>

            <ModalBody>
              <p className="text-sm text-red-500">
                ⚠️ Are you sure you want to delete this wheel diameter? This action cannot be undone.
              </p>
            </ModalBody>

            <ModalFooter className="flex justify-end gap-2">
              <Button variant="bordered" className="rounded" onPress={onOpenChange}>
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={handleDeleteWheelDiameter}
                disabled={deleteWheelDiameterPending}
                className="rounded"
              >
                {deleteWheelDiameterPending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
