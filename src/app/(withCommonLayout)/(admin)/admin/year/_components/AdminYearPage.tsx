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
  useCreateYear,
  useDeleteYear,
  useGetYears,
  useUpdateYear,
} from "@/src/hooks/years.hook";
import { YearSelect } from "@/src/components/form/YearSelect";
import YearsTable from "./YearsTable";
import { IYear } from "@/src/types";
import { useState } from "react";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../../_components/DataFetchingStates";

export default function AdminYearPage() {
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
  const [selectedYear, setSelectedYear] = useState<IYear | null>(null);

  const { mutate: handleCreateYear, isPending: createYearPending } =
    useCreateYear({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_YEARS"] });
        toast.success("Year created successfully");
        methods.reset();
        onClose();
      },
    }); // Year creation handler
  const { mutate: handleUpdateYear, isPending: updateYearPending } =
    useUpdateYear({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_YEARS"] });
        toast.success("Year updated successfully");
        methods.reset();
        setSelectedYear(null);
        onEditClose();
      },
      id: selectedYear?._id,
    }); // Year update handler
  const { mutate: handleDeleteYear, isPending: deleteYearPending } =
    useDeleteYear({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_YEARS"] });
        toast.success("Year deleted successfully");
        setSelectedYear(null);
        onDeleteClose();
      },
      id: selectedYear?._id,
    }); // Year deletion handler
  const { data: years, isLoading, isError, refetch } = useGetYears({}); // Get existing Years

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const YearData = {
      year: Number(data.year?.numeric),
    };

    if (!YearData.year || isNaN(YearData.year)) {
      toast.error("Please select a valid year.");
      return;
    }

    handleCreateYear(YearData as any); // Send DrivingType data
  };

  const onEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    const YearData = {
      year: Number(data.year?.numeric),
    };

    if (!YearData.year || isNaN(YearData.year)) {
      toast.error("Please select a valid year.");
      return;
    }

    handleUpdateYear(YearData as any); // Send DrivingType data
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Year
        </h1>
        <Button
          color="primary"
          className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}
        >
          + Add Year
        </Button>
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {years?.data?.length === 0 && <DataEmpty />}

      {!isLoading && years?.data?.length > 0 && (
        <YearsTable
          years={years}
          setSelectedYear={setSelectedYear}
          onEditOpen={onEditOpen}
          onDeleteOpen={onDeleteOpen}
        />
      )}

      {/* Modal for adding a new Year */}
      <AddYearModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createYearPending={createYearPending}
      />
      {/* Modal for editing a Year */}
      <EditYearModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        updateYearPending={updateYearPending}
        defaultValues={selectedYear}
      />
      {/* Modal for deleting a Year */}
      <DeleteYearModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteYear={handleDeleteYear}
        deleteYearPending={deleteYearPending}
      />
    </div>
  );
}

const AddYearModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  createYearPending,
}: any) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Year</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6"
                >
                  {/* Year & logo Inputs */}
                  <div className=" w-full py-2">
                    <YearSelect />
                  </div>

                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={createYearPending}
                  >
                    {createYearPending ? "Creating..." : "Create Year"}
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

const EditYearModal = ({
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
            <ModalHeader className="flex flex-col gap-1">Edit Year</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6"
                >
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* Year & logo Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <YearSelect defaultValue={defaultValues.year.numeric} />
                      </div>
                    </div>
                  </div>
                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={updateYearPending}
                  >
                    {updateYearPending ? "Updating..." : "Update Year"}
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

const DeleteYearModal = ({
  isOpen,
  onOpenChange,
  handleDeleteYear,
  deleteYearPending,
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
                ⚠️ Are you sure you want to delete this year? This action cannot
                be undone.
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
                onPress={handleDeleteYear}
                disabled={deleteYearPending}
                className="rounded"
              >
                {deleteYearPending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
