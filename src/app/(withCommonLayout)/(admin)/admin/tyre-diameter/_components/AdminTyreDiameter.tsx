"use client";

import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { Controller, FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  useCreateTireDiameter,
  useDeleteTireDiameter,
  useGetTireDiameters,
  useUpdateTireDiameter,
} from "@/src/hooks/tireDiameter.hook";
import { useState } from "react";
import { DataEmpty, DataError, DataLoading } from "../../_components/DataFetchingStates";
import TyreDiameterTable from "./TyreDiameterTable";
import { Input } from "@heroui/input";

interface ITireDiameter {
  _id: string;
  diameter: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminTyreDiameter() {
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
  const [selectedTireDiameter, setSelectedTireDiameter] = useState<ITireDiameter | null>(null);

  const { mutate: handleCreateTireDiameter, isPending: createTireDiameterPending } = useCreateTireDiameter({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_TIRE_DIAMETER"] });
      toast.success("Tire diameter created successfully");
      methods.reset();
      onClose();
    },
  }); // Tire diameter creation handler
  const { mutate: handleUpdateTireDiameter, isPending: updateTireDiameterPending } = useUpdateTireDiameter({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_TIRE_DIAMETER"] });
      toast.success("Tire diameter updated successfully");
      methods.reset();
      setSelectedTireDiameter(null);
      onEditClose();
    },
    id: selectedTireDiameter?._id,
  }); // Tire diameter update handler
  const { mutate: handleDeleteTireDiameter, isPending: deleteTireDiameterPending } = useDeleteTireDiameter({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_TIRE_DIAMETER"] });
      toast.success("Tire diameter deleted successfully");
      setSelectedTireDiameter(null);
      onDeleteClose();
    },
    id: selectedTireDiameter?._id,
  }); // Tire diameter deletion handler
  const { data: tyreDiameters, isLoading, isError, refetch } = useGetTireDiameters({}); // Get existing tyre diameters
  console.log(tyreDiameters);

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    handleCreateTireDiameter(formData); // Send tire diameter data
  };

  const onEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    handleUpdateTireDiameter(formData); // Send tire diameter data
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">Tyre Diameters</h1>
        <Button
          color="primary"
          className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}
        >
          + Add Tyre Diameter
        </Button>
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {tyreDiameters?.data?.length === 0 && <DataEmpty />}

      {!isLoading && tyreDiameters?.data?.length > 0 && (
        <TyreDiameterTable
          tyreDiameters={tyreDiameters}
          setSelectedDiameter={setSelectedTireDiameter}
          onEditOpen={onEditOpen}
          onDeleteOpen={onDeleteOpen}
        />
      )}

      {/* Modal for adding a new Tire Diameter */}
      <AddTyreDiameterModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createTireDiameterPending={createTireDiameterPending}
      />
      {/* Modal for editing a Tire Diameter */}
      <EditTyreDiameterModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        updateDiameterPending={updateTireDiameterPending}
        defaultValues={selectedTireDiameter}
      />
      {/* Modal for deleting a Tire Diameter */}
      <DeleteTireDiameterModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteDiameter={handleDeleteTireDiameter}
        deleteDiameterPending={deleteTireDiameterPending}
      />
    </div>
  );
}

const AddTyreDiameterModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  createTireDiameterPending,
}: any) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Tire Diameter</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-6">
                  {/* Diameter Input */}
                  <div className=" w-full py-2">
                    <Controller
                      name="diameter"
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "Tire diameter is required" }}
                      render={({ field, fieldState }) => (
                        <Input
                          {...field}
                          label="Tire Diameter"
                          placeholder="Enter tire diameter (e.g., 15, 16, 17, 18)"
                          onChange={(e) => field.onChange(e.target.value)}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                        />
                      )}
                    />
                  </div>

                  <Button color="primary" type="submit" className="w-full rounded" disabled={createTireDiameterPending}>
                    {createTireDiameterPending ? "Creating..." : "Create Tire Diameter"}
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

const EditTyreDiameterModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  updateDiameterPending,
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
            <ModalHeader className="flex flex-col gap-1">Edit Tire Diameter</ModalHeader>
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
                          rules={{ required: "Tire diameter is required" }}
                          render={({ field, fieldState }) => (
                            <Input
                              {...field}
                              label="Tire Diameter"
                              placeholder="Enter tire diameter (e.g., 15, 16, 17, 18)"
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
                  <Button color="primary" type="submit" className="w-full rounded" disabled={updateDiameterPending}>
                    {updateDiameterPending ? "Updating..." : "Update Tire Diameter"}
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

const DeleteTireDiameterModal = ({ isOpen, onOpenChange, handleDeleteDiameter, deleteDiameterPending }: any) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Confirm Delete</ModalHeader>

            <ModalBody>
              <p className="text-sm text-red-500">
                ⚠️ Are you sure you want to delete this tire diameter? This action cannot be undone.
              </p>
            </ModalBody>

            <ModalFooter className="flex justify-end gap-2">
              <Button variant="bordered" className="rounded" onPress={onOpenChange}>
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={handleDeleteDiameter}
                disabled={deleteDiameterPending}
                className="rounded"
              >
                {deleteDiameterPending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
