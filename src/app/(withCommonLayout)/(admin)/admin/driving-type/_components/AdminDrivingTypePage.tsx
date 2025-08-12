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
  useFieldArray,
  useForm,
} from "react-hook-form";

import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import DrivingTypesTable from "./DrivingTypesTable";
import {
  useCreateDrivingType,
  useGetDrivingTypes,
  useUpdateDrivingType,
  useDeleteDrivingType,
} from "@/src/hooks/drivingTypes.hook";
import { Trash2 } from "lucide-react";
import { IDrivingType } from "@/src/types";
import { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../../_components/DataFetchingStates";

export default function AdminDrivingTypePage() {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
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
  const [selectedDrivingType, setSelectedDrivingType] =
    useState<IDrivingType | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const methods = useForm(); // Hook form methods
  const { control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });
  const {
    mutate: handleDeleteDrivingType,
    isPending: deleteDrivingTypePending,
  } = useDeleteDrivingType({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_DRIVING_TYPES"] });
      toast.success("Driving type deleted successfully");
      setSelectedDrivingType(null);
      onDeleteClose();
    },
    id: selectedDrivingType?._id,
  }); // DrivingType deletion handler
  const {
    mutate: handleCreateDrivingType,
    isPending: createDrivingTypePending,
  } = useCreateDrivingType({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_DRIVING_TYPES"] });
      toast.success("Driving type created successfully");
      methods.reset();
      onClose();
    },
  }); // DrivingType creation handler
  const {
    mutate: handleUpdateDrivingType,
    isPending: updateDrivingTypePending,
  } = useUpdateDrivingType({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_DRIVING_TYPES"] });
      toast.success("Driving type updated successfully");
      methods.reset();
      setSelectedDrivingType(null);
      setOptions([]);
      onEditClose();
    },
    id: selectedDrivingType?._id,
  }); // DrivingType update handler
  const {
    data: drivingTypes,
    isLoading,
    isError,
    refetch,
  } = useGetDrivingTypes() as any; // Get existing DrivingTypes

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const drivingTypeData: any = {
      ...data,
      options: data?.options.map((opt: { value: string }) => opt.value),
    };

    handleCreateDrivingType(drivingTypeData); // Send DrivingType data
  };
  const onEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    const drivingTypeData: any = {
      ...data,
      options,
    };
    handleUpdateDrivingType(drivingTypeData); // Send DrivingType data
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Driving Type Management
        </h1>
        <Button
          color="primary"
          className="px-7 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}>
          + Add Driving Type
        </Button>
      </div>
      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {drivingTypes?.data?.length === 0 && <DataEmpty />}

      {drivingTypes?.data?.length > 0 && (
        <DrivingTypesTable
          drivingTypes={drivingTypes}
          onEditOpen={onEditOpen}
          onDeleteOpen={onDeleteOpen}
          setSelectedDrivingType={setSelectedDrivingType}
          setOptions={setOptions}
        />
      )}

      {/* Modal for adding a new drivingType */}
      <AddDrivingTypeModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createDrivingTypePending={createDrivingTypePending}
        fields={fields}
        append={append}
        remove={remove}
      />
      {/* Modal for editing a drivingType */}
      <EditDrivingTypeModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        updateDrivingTypePending={updateDrivingTypePending}
        options={options}
        setOptions={setOptions}
        defaultValues={selectedDrivingType}
      />
      {/* Modal for deleting a drivingType */}
      <DeleteDrivingTypeModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteDrivingType={handleDeleteDrivingType}
        deleteDrivingTypePending={deleteDrivingTypePending}
      />
    </div>
  );
}

const AddDrivingTypeModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  createDrivingTypePending,
  fields,
  append,
  remove,
}: any) => {
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
              Add Driving Type
            </ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* Title & subTitle Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Title"
                          name="title"
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Sub Title"
                          name="subTitle"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-4 border p-4 rounded-xl bg-muted/30">
                    {fields.length ? (
                      fields.map((field: any, index: number) => (
                        <div
                          key={field.id}
                          className="flex gap-2 items-center">
                          <FXInput
                            label="Option"
                            name={`options.${index}.value`}
                          />
                          <Button
                            isIconOnly
                            className="h-14 w-16"
                            onPress={() => remove(index)}>
                            <Trash2 />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No options added yet.
                      </p>
                    )}

                    <Button
                      className="w-full"
                      onPress={() => append({ name: "options" })}>
                      + Add Option
                    </Button>
                  </div>

                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={createDrivingTypePending}>
                    {createDrivingTypePending
                      ? "Creating..."
                      : "Create Driving Type"}
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

const EditDrivingTypeModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  updateDrivingTypePending,
  options,
  defaultValues,
  setOptions,
}: any) => {
  if (!defaultValues) return null;
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        onOpenChange();
        methods.reset();
        setOptions([]);
      }}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Driving Type
            </ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* Title & subTitle Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Title"
                          name="title"
                          defaultValue={defaultValues.title}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Sub Title"
                          name="subTitle"
                          defaultValue={defaultValues.subTitle}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-4 border p-4 rounded-xl bg-muted/30">
                    {options.length ? (
                      options?.map((field: any, index: number) => (
                        <div
                          key={index}
                          className="flex gap-2 items-center">
                          <Input
                            onChange={(e) => {
                              const val = e.target.value;
                              const newOptions = options.map(
                                (opt: string, i: number) =>
                                  i === index ? val : opt
                              );
                              setOptions(newOptions);
                            }}
                            label="Option"
                            // value={field}
                            defaultValue={field}
                          />
                          <Button
                            isIconOnly
                            className="h-14 w-16"
                            onPress={() => {
                              const newOptions = options.filter(
                                (_: any, i: number) => i !== index
                              );
                              setOptions(newOptions);
                            }}>
                            <Trash2 />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No options added yet.
                      </p>
                    )}

                    <Button
                      className="w-full"
                      onPress={() => {
                        const newOptions = [...options, ""];
                        setOptions(newOptions);
                      }}>
                      + Add Option
                    </Button>
                  </div>

                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={updateDrivingTypePending}>
                    {updateDrivingTypePending
                      ? "Updating..."
                      : "Update Driving Type"}
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

const DeleteDrivingTypeModal = ({
  isOpen,
  onOpenChange,
  handleDeleteDrivingType,
  deleteDrivingTypePending,
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
                ⚠️ Are you sure you want to delete this driving type? This
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
                onPress={handleDeleteDrivingType}
                disabled={deleteDrivingTypePending}
                className="rounded">
                {deleteDrivingTypePending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
