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
import FXInput from "@/src/components/form/FXInput";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../../_components/DataFetchingStates";
import {
  useCreateVehicleType,
  useDeleteVehicleType,
  useGetVehicleTypes,
  useUpdateVehicleType,
} from "@/src/hooks/vehicleType.hook";
import VehiclesTable from "./VehiclesTable";

export default function AdminVehiclePage() {
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
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);

  const { mutate: handleCreateVehicle, isPending: createVehiclePending } =
    useCreateVehicleType({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_VEHICLE_TYPES"] });
        toast.success("Vehicle Type created successfully");
        methods.reset();
        onClose();
      },
    }); // make creation handler
  const { mutate: handleUpdateVehicle, isPending: updateVehiclePending } =
    useUpdateVehicleType({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_VEHICLE_TYPES"] });
        toast.success("Vehicle Type updated successfully");
        methods.reset();
        setSelectedVehicle(null);
        onEditClose();
      },
      id: selectedVehicle?._id,
    }); // make update handler
  const { mutate: handleDeleteVehicle, isPending: deleteVehiclePending } =
    useDeleteVehicleType({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_VEHICLE_TYPES"] });
        toast.success("Vehicle Type deleted successfully");
        setSelectedVehicle(null);
        onDeleteClose();
      },
      id: selectedVehicle?._id,
    });

  const { data: vehicles, isLoading, isError } = useGetVehicleTypes({}) as any; // Get existing makes

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleCreateVehicle(data as any); // Send make data
  };
  const onEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleUpdateVehicle(data as any); // update make data
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Vehicle Type
        </h1>
        <Button
          color="primary"
          className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}>
          + Add Vehicle Type
        </Button>
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {vehicles?.data?.length === 0 && <DataEmpty />}

      {!isLoading && vehicles?.data?.length > 0 && (
        <VehiclesTable
          vehicles={vehicles}
          onDeleteOpen={onDeleteOpen}
          onEditOpen={onEditOpen}
          setSelectedVehicle={setSelectedVehicle}
        />
      )}

      {/* Modal for adding a new make */}
      <AddVehicleModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createMakePending={createVehiclePending}
      />
      {/* Modal for editing a make */}
      <EditVehicleModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        updateVehiclePending={updateVehiclePending}
        defaultValues={selectedVehicle}
      />
      {/* Modal for deleting a make */}
      <DeleteVehicleModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteVehicle={handleDeleteVehicle}
        deleteVehiclePending={deleteVehiclePending}
      />
    </div>
  );
}

const AddVehicleModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  createVehiclePending,
}: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Vehicle Type
            </ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* make & logo Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Vehicle Type"
                          name="vehicleType"
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={createVehiclePending}>
                    {createVehiclePending
                      ? "Creating..."
                      : "Create Vehicle Type"}
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

const EditVehicleModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  updateVehiclePending,
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
              Edit Vehicle Type
            </ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* make & logo Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Vehicle Type"
                          name="vehicleType"
                          defaultValue={defaultValues.vehicleType}
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={updateVehiclePending}>
                    {updateVehiclePending
                      ? "Updating..."
                      : "Update Vehicle Type"}
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

const DeleteVehicleModal = ({
  isOpen,
  onOpenChange,
  handleDeleteVehicle,
  deleteVehiclePending,
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
                ⚠️ Are you sure you want to delete this Vehicle Type? This
                action cannot be undone.
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
                onPress={handleDeleteVehicle}
                disabled={deleteVehiclePending}
                className="rounded">
                {deleteVehiclePending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
