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
import {
  useCreateModel,
  useDeleteModel,
  useGetModels,
  useUpdateModel,
} from "@/src/hooks/model.hook";
import { YearSelect } from "@/src/components/form/YearSelect";
import ModelsTable from "./ModelsTable";
import { IModel } from "@/src/types";
import { useState } from "react";
import { useGetMakes } from "@/src/hooks/makes.hook";
import { useGetYears } from "@/src/hooks/years.hook";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../../_components/DataFetchingStates";

export default function AdminModelPage() {
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
  const [selectedModel, setSelectedModel] = useState<IModel | null>(null);

  const { mutate: handleCreateModel, isPending: createModelPending } =
    useCreateModel({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_MODELS"] });
        toast.success("Model created successfully");
        methods.reset();
        onClose();
      },
    }); // Model creation handler
  const { mutate: handleUpdateModel, isPending: updateModelPending } =
    useUpdateModel({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_MODELS"] });
        toast.success("Model updated successfully");
        methods.reset();
        setSelectedModel(null);
        onEditClose();
      },
      id: selectedModel?._id,
    }); // Model update handler
  const { mutate: handleDeleteModel, isPending: deleteModelPending } =
    useDeleteModel({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_MODELS"] });
        toast.success("Model deleted successfully");
        setSelectedModel(null);
        onDeleteClose();
      },
      id: selectedModel?._id,
    }); // Model deletion handler
  const { data: models, isLoading, isError } = useGetModels({}); // Get existing Models

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleCreateModel(data as any);
  };

  const onEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleUpdateModel(data as any);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Model
        </h1>
        <Button
          color="primary"
          className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}
        >
          + Add Model
        </Button>
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {models?.data?.length === 0 && <DataEmpty />}

      {!isLoading && models?.data?.length > 0 && (
        <ModelsTable
          models={models}
          setSelectedModel={setSelectedModel}
          onEditOpen={onEditOpen}
          onDeleteOpen={onDeleteOpen}
        />
      )}

      {/* Modal for adding a new Model */}
      <AddModelModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createModelPending={createModelPending}
      />
      {/* Modal for editing a Model */}
      <EditModelModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        updateModelPending={updateModelPending}
        defaultValues={selectedModel}
      />
      {/* Modal for deleting a Model */}
      <DeleteModelModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteModel={handleDeleteModel}
        deleteModelPending={deleteModelPending}
      />
    </div>
  );
}

const AddModelModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  createModelPending,
}: any) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Model</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6"
                >
                  {/* Model */}
                  <div className="flex flex-wrap gap-2 w-full">
                    <div className="flex-1 min-w-[150px]">
                      <FXInput label="Model" name="model" required={true} />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* Model & logo Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <MakeSelectForModel
                          defaultValue=""
                          register={methods.register}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <YearSelectForModel
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
                    disabled={createModelPending}
                  >
                    {createModelPending ? "Creating..." : "Create Model"}
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

const EditModelModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  updateModelPending,
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
            <ModalHeader className="flex flex-col gap-1">Add Model</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6"
                >
                  {/* Model */}
                  <div className="flex flex-wrap gap-2 w-full">
                    <div className="flex-1 min-w-[150px]">
                      <FXInput
                        label="Model"
                        name="model"
                        defaultValue={defaultValues?.model}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* Model & logo Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <MakeSelectForModel
                          defaultValue={defaultValues?.make}
                          register={methods.register}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <YearSelectForModel
                          defaultValue={defaultValues?.year}
                          register={methods.register}
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={updateModelPending}
                  >
                    {updateModelPending ? "Updating..." : "Update Model"}
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

const DeleteModelModal = ({
  isOpen,
  onOpenChange,
  handleDeleteModel,
  deleteModelPending,
}: any) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirm Delete
            </ModalHeader>

            <ModalBody>
              <p className="text-sm text-red-500">
                ⚠️ Are you sure you want to delete this model? This action
                cannot be undone.
              </p>
            </ModalBody>

            <ModalFooter className="flex justify-end gap-2">
              <Button
                variant="bordered"
                className="rounded"
                onPress={onOpenChange}
              >
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={handleDeleteModel}
                disabled={deleteModelPending}
                className="rounded"
              >
                {deleteModelPending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const MakeSelectForModel = ({ defaultValue, register }: any) => {
  const { data: makes, isLoading, isError } = useGetMakes({});

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("make", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5"
      >
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
          <option key={m?.make} value={m?._id}>
            {m?.make}
          </option>
        ))}
      </select>
    </div>
  );
};

const YearSelectForModel = ({ defaultValue, register }: any) => {
  const { data: year, isLoading, isError } = useGetYears({});

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("year", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5"
      >
        <option value="">Select Year</option>
        {isLoading && <option value="">Loading Years...</option>}
        {isError && <option value="">Failed to load Years</option>}
        {year?.data?.length === 0 && <option value="">No Years found</option>}
        {year?.data?.map((y: any) => (
          <option key={y?.year} value={y?._id}>
            {y?.year}
          </option>
        ))}
      </select>
    </div>
  );
};
