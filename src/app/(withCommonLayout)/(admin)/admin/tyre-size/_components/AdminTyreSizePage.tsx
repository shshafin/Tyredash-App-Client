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
import { ITyreSize } from "@/src/types";
import { useState } from "react";
import { useGetMakes } from "@/src/hooks/makes.hook";
import { useGetYears } from "@/src/hooks/years.hook";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../../_components/DataFetchingStates";
import {
  useCreateTyreSize,
  useDeleteTyreSize,
  useGetTyreSizes,
  useUpdateTyreSize,
} from "@/src/hooks/tyreSize.hook";
import { useGetModels } from "@/src/hooks/model.hook";
import { useGetTrims } from "@/src/hooks/trim.hook";
import TyreSizesTable from "./TyreSizesTable";

export default function AdminTyreSizePage() {
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
  const [selectedTyreSize, setSelectedTyreSize] = useState<ITyreSize | null>(
    null
  );

  const { mutate: handleCreateTyreSize, isPending: createTyreSizePending } =
    useCreateTyreSize({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_TYRE_SIZES"] });
        toast.success("TyreSize created successfully");
        methods.reset();
        onClose();
      },
    }); // TyreSize creation handler
  const { mutate: handleUpdateTyreSize, isPending: updateTyreSizePending } =
    useUpdateTyreSize({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_TYRE_SIZES"] });
        toast.success("TyreSize updated successfully");
        methods.reset();
        setSelectedTyreSize(null);
        onEditClose();
      },
      id: selectedTyreSize?._id,
    }); // TyreSize update handler
  const { mutate: handleDeleteTyreSize, isPending: deleteTyreSizePending } =
    useDeleteTyreSize({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_TYRE_SIZES"] });
        toast.success("TyreSize deleted successfully");
        setSelectedTyreSize(null);
        onDeleteClose();
      },
      id: selectedTyreSize?._id,
    }); // TyreSize deletion handler
  const { data: tyreSizes, isLoading, isError } = useGetTyreSizes({}) as any; // Get existing TyreSizes

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleCreateTyreSize(data as any);
  };

  const onEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleUpdateTyreSize(data as any);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Tyre Size
        </h1>
        <Button
          color="primary"
          className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}>
          + Add Tyre Size
        </Button>
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {tyreSizes?.data?.length === 0 && <DataEmpty />}

      {!isLoading && tyreSizes?.data?.length > 0 && (
        <TyreSizesTable
          tyreSizes={tyreSizes}
          setSelectedTyreSize={setSelectedTyreSize}
          onEditOpen={onEditOpen}
          onDeleteOpen={onDeleteOpen}
        />
      )}

      {/* Modal for adding a new TyreSize */}
      <AddTyreSizeModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createTyreSizePending={createTyreSizePending}
      />
      {/* Modal for editing a TyreSize */}
      <EditTyreSizeModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        updateTyreSizePending={updateTyreSizePending}
        defaultValues={selectedTyreSize}
      />
      {/* Modal for deleting a TyreSize */}
      <DeleteTyreSizeModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteTyreSize={handleDeleteTyreSize}
        deleteTyreSizePending={deleteTyreSizePending}
      />
    </div>
  );
}

const AddTyreSizeModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  createTyreSizePending,
}: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Tyre Size
            </ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  {/* TyreSize */}
                  <div className="flex flex-wrap gap-2 w-full">
                    <div className="flex-1 min-w-[150px]">
                      <FXInput
                        label="Tyre Size"
                        name="tireSize"
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* TyreSize & logo Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <MakeSelectForTyreSize
                          defaultValue=""
                          register={methods.register}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <YearSelectForTyreSize
                          defaultValue=""
                          register={methods.register}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <ModelSelectForTyreSize
                          defaultValue=""
                          register={methods.register}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <TrimSelectForTyreSize
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
                    disabled={createTyreSizePending}>
                    {createTyreSizePending ? "Creating..." : "Create Tyre Size"}
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

const EditTyreSizeModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  updateTyreSizePending,
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
              Edit Tyre Size
            </ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  {/* TyreSize */}
                  <div className="flex flex-wrap gap-2 w-full">
                    <div className="flex-1 min-w-[150px]">
                      <FXInput
                        label="Tyre Size"
                        name="tireSize"
                        defaultValue={defaultValues?.tireSize}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* TyreSize & logo Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <MakeSelectForTyreSize
                          defaultValue={defaultValues?.make}
                          register={methods.register}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <YearSelectForTyreSize
                          defaultValue={defaultValues?.year}
                          register={methods.register}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <ModelSelectForTyreSize
                          defaultValue={defaultValues?.model}
                          register={methods.register}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <TrimSelectForTyreSize
                          defaultValue={defaultValues?.trim}
                          register={methods.register}
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={updateTyreSizePending}>
                    {updateTyreSizePending ? "Updating..." : "Update Tyre Size"}
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

const DeleteTyreSizeModal = ({
  isOpen,
  onOpenChange,
  handleDeleteTyreSize,
  deleteTyreSizePending,
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
                ⚠️ Are you sure you want to delete this tyre size? This action
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
                onPress={handleDeleteTyreSize}
                disabled={deleteTyreSizePending}
                className="rounded">
                {deleteTyreSizePending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const MakeSelectForTyreSize = ({ defaultValue, register }: any) => {
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

const YearSelectForTyreSize = ({ defaultValue, register }: any) => {
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

const ModelSelectForTyreSize = ({ defaultValue, register }: any) => {
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

const TrimSelectForTyreSize = ({ defaultValue, register }: any) => {
  const { data: trim, isLoading, isError } = useGetTrims({}) as any;

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("trim", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5">
        <option value="">Select Trim</option>
        {isLoading && <option value="">Loading Trims...</option>}
        {isError && <option value="">Failed to load Trims</option>}
        {trim?.data?.length === 0 && <option value="">No Trims found</option>}
        {trim?.data?.map((m: any) => (
          <option
            key={m?.trim}
            value={m?._id}>
            {m?.trim}
          </option>
        ))}
      </select>
    </div>
  );
};
