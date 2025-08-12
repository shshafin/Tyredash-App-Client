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
import { ITrim } from "@/src/types";
import { useState } from "react";
import { useGetMakes } from "@/src/hooks/makes.hook";
import { useGetYears } from "@/src/hooks/years.hook";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../../_components/DataFetchingStates";
import TrimsTable from "./TrimsTable";
import {
  useCreateTrim,
  useDeleteTrim,
  useGetTrims,
  useUpdateTrim,
} from "@/src/hooks/trim.hook";
import { useGetModels } from "@/src/hooks/model.hook";

export default function AdminTrimPage() {
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
  const [selectedTrim, setSelectedTrim] = useState<ITrim | null>(null);

  const { mutate: handleCreateTrim, isPending: createTrimPending } =
    useCreateTrim({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_TRIMS"] });
        toast.success("Trim created successfully");
        methods.reset();
        onClose();
      },
    }); // Trim creation handler
  const { mutate: handleUpdateTrim, isPending: updateTrimPending } =
    useUpdateTrim({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_TRIMS"] });
        toast.success("Trim updated successfully");
        methods.reset();
        setSelectedTrim(null);
        onEditClose();
      },
      id: selectedTrim?._id,
    }); // Trim update handler
  const { mutate: handleDeleteTrim, isPending: deleteTrimPending } =
    useDeleteTrim({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_TRIMS"] });
        toast.success("Trim deleted successfully");
        setSelectedTrim(null);
        onDeleteClose();
      },
      id: selectedTrim?._id,
    }); // Trim deletion handler
  const { data: trims, isLoading, isError } = useGetTrims({}) as any; // Get existing Trims

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleCreateTrim(data as any);
  };

  const onEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleUpdateTrim(data as any);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Trim
        </h1>
        <Button
          color="primary"
          className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}>
          + Add Trim
        </Button>
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {trims?.data?.length === 0 && <DataEmpty />}

      {!isLoading && trims?.data?.length > 0 && (
        <TrimsTable
          trims={trims}
          setSelectedTrim={setSelectedTrim}
          onEditOpen={onEditOpen}
          onDeleteOpen={onDeleteOpen}
        />
      )}

      {/* Modal for adding a new Trim */}
      <AddTrimModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createTrimPending={createTrimPending}
      />
      {/* Modal for editing a Trim */}
      <EditTrimModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        updateTrimPending={updateTrimPending}
        defaultValues={selectedTrim}
      />
      {/* Modal for deleting a Trim */}
      <DeleteTrimModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteTrim={handleDeleteTrim}
        deleteTrimPending={deleteTrimPending}
      />
    </div>
  );
}

const AddTrimModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  createTrimPending,
}: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Trim</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  {/* Trim */}
                  <div className="flex flex-wrap gap-2 w-full">
                    <div className="flex-1 min-w-[150px]">
                      <FXInput
                        label="Trim"
                        name="trim"
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* Trim & logo Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <MakeSelectForTrim
                          defaultValue=""
                          register={methods.register}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <YearSelectForTrim
                          defaultValue=""
                          register={methods.register}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <ModelSelectForTrim
                          defaultValue=""
                          register={methods.register}
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={createTrimPending}>
                    {createTrimPending ? "Creating..." : "Create Trim"}
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

const EditTrimModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  updateTrimPending,
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
            <ModalHeader className="flex flex-col gap-1">Add Trim</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  {/* Trim */}
                  <div className="flex flex-wrap gap-2 w-full">
                    <div className="flex-1 min-w-[150px]">
                      <FXInput
                        label="Trim"
                        name="trim"
                        defaultValue={defaultValues?.trim}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* Trim & logo Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <MakeSelectForTrim
                          defaultValue={defaultValues?.make}
                          register={methods.register}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <YearSelectForTrim
                          defaultValue={defaultValues?.year}
                          register={methods.register}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <ModelSelectForTrim
                          defaultValue={defaultValues?.model}
                          register={methods.register}
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={updateTrimPending}>
                    {updateTrimPending ? "Updating..." : "Update Trim"}
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

const DeleteTrimModal = ({
  isOpen,
  onOpenChange,
  handleDeleteTrim,
  deleteTrimPending,
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
                ⚠️ Are you sure you want to delete this trim? This action cannot
                be undone.
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
                onPress={handleDeleteTrim}
                disabled={deleteTrimPending}
                className="rounded">
                {deleteTrimPending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const MakeSelectForTrim = ({ defaultValue, register }: any) => {
  const { data: makes, isLoading, isError } = useGetMakes({}) as any;

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("make", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5">
        {/* {
            defaultValue && (
              <option value={defaultValue._id}>{defaultValue.make}</option>
            )
          } */}
        <option value="">Select Make</option>
        {isLoading && <option value="">Loading Makes...</option>}
        {isError && <option value="">Failed to load Makes</option>}
        {makes?.data?.length === 0 && <option value="">No Makes found</option>}
        {makes?.data?.map((m: any) => (
          <option
            key={m?.make}
            value={m?._id}>
            {m?.make}
          </option>
        ))}
      </select>
    </div>
  );
};

const YearSelectForTrim = ({ defaultValue, register }: any) => {
  const { data: year, isLoading, isError } = useGetYears({}) as any;

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("year", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5">
        <option value="">Select Year</option>
        {isLoading && <option value="">Loading Years...</option>}
        {isError && <option value="">Failed to load Years</option>}
        {year?.data?.length === 0 && <option value="">No Years found</option>}
        {year?.data?.map((y: any) => (
          <option
            key={y?.year}
            value={y?._id}>
            {y?.year}
          </option>
        ))}
      </select>
    </div>
  );
};

const ModelSelectForTrim = ({ defaultValue, register }: any) => {
  const { data: model, isLoading, isError } = useGetModels({}) as any;

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("model", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5">
        <option value="">Select Model</option>
        {isLoading && <option value="">Loading Models...</option>}
        {isError && <option value="">Failed to load Models</option>}
        {model?.data?.length === 0 && <option value="">No Models found</option>}
        {model?.data?.map((m: any) => (
          <option
            key={m?.model}
            value={m?._id}>
            {m?.model}
          </option>
        ))}
      </select>
    </div>
  );
};
