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
  useCreateMake,
  useDeleteMake,
  useGetMakes,
  useUpdateMake,
} from "@/src/hooks/makes.hook";
import MakesTable from "./MakesTable";
import { IMake } from "@/src/types";
import { ChangeEvent, useState } from "react";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../../_components/DataFetchingStates";
import { UploadCloud } from "lucide-react";
import { Divider } from "@heroui/divider";

export default function AdminMakePage() {
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
  const [selectedMake, setSelectedMake] = useState<IMake | null>(null);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]); // Track selected images
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]); // Track image previews

  const { mutate: handleCreateMake, isPending: createMakePending } =
    useCreateMake({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_MAKES"] });
        toast.success("Make created successfully");
        methods.reset();
        onClose();
      },
    }); // make creation handler
  const { mutate: handleUpdateMake, isPending: updateMakePending } =
    useUpdateMake({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_MAKES"] });
        toast.success("Make updated successfully");
        methods.reset();
        setSelectedMake(null);
        onEditClose();
      },
      id: selectedMake?._id,
    }); // make update handler
  const { mutate: handleDeleteMake, isPending: deleteMakePending } =
    useDeleteMake({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_MAKES"] });
        toast.success("Make deleted successfully");
        setSelectedMake(null);
        onDeleteClose();
      },
      id: selectedMake?._id,
    }); // make deletion handler
  const { data: makes, isLoading, isError } = useGetMakes({}) as any; // Get existing makes

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    // Append textual data
    formData.append("make", data.make);

    // Append images to FormData
    imageFiles.forEach((image) => {
      formData.append("file", image);
    });

    handleCreateMake(formData); // Send make data
  };
  const onEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    // Append textual data
    formData.append("make", data.make);

    // Append images to FormData
    imageFiles.forEach((image) => {
      formData.append("file", image);
    });
    handleUpdateMake(formData); // update make data
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Convert FileList to an array and update state with new image files
    const newImageFiles = Array.from(files);
    setImageFiles((prev) => [...prev, ...newImageFiles]);

    // Generate previews for each image file
    newImageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Make
        </h1>
        <Button
          color="primary"
          className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}>
          + Add Make
        </Button>
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {makes?.data?.length === 0 && <DataEmpty />}

      {!isLoading && makes?.data?.length > 0 && (
        <MakesTable
          makes={makes}
          onDeleteOpen={onDeleteOpen}
          onEditOpen={onEditOpen}
          setSelectedMake={setSelectedMake}
        />
      )}

      {/* Modal for adding a new make */}
      <AddMakeModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createMakePending={createMakePending}
        imagePreviews={imagePreviews}
        handleImageChange={handleImageChange}
      />
      {/* Modal for editing a make */}
      <EditMakeModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        updateMakePending={updateMakePending}
        defaultValues={selectedMake}
        imagePreviews={imagePreviews}
        handleImageChange={handleImageChange}
      />
      {/* Modal for deleting a make */}
      <DeleteMakeModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteMake={handleDeleteMake}
        deleteMakePending={deleteMakePending}
      />
    </div>
  );
}

const AddMakeModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  createMakePending,
  imagePreviews,
  handleImageChange,
}: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Make</ModalHeader>
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
                          label="Make"
                          name="make"
                        />
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="image"
                          className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-default-200 bg-default-50 text-default-500 shadow-sm transition hover:border-default-400 hover:bg-default-100">
                          <span className="text-md font-medium">
                            Upload Images
                          </span>
                          <UploadCloud className="size-6" />
                        </label>
                        <input
                          multiple
                          className="hidden"
                          id="image"
                          type="file"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                    {/* Image previews */}
                    {imagePreviews.length > 0 && (
                      <div className="flex gap-5 my-5 flex-wrap">
                        {imagePreviews.map(
                          (imageDataUrl: string, index: number) => (
                            <div
                              key={index}
                              className="relative size-32 rounded-xl border-2 border-dashed border-default-300 p-2">
                              <img
                                alt={`Preview ${index}`}
                                className="h-full w-full object-cover rounded-md"
                                src={imageDataUrl}
                              />
                            </div>
                          )
                        )}
                      </div>
                    )}

                    <Divider className="my-6" />
                  </div>
                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={createMakePending}>
                    {createMakePending ? "Creating..." : "Create Make"}
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

const EditMakeModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  updateMakePending,
  defaultValues,
  imagePreviews,
  handleImageChange,
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
            <ModalHeader className="flex flex-col gap-1">Edit Make</ModalHeader>
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
                          label="Make"
                          name="make"
                          defaultValue={defaultValues.make}
                        />
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="image"
                          className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-default-200 bg-default-50 text-default-500 shadow-sm transition hover:border-default-400 hover:bg-default-100">
                          <span className="text-md font-medium">
                            Upload Images
                          </span>
                          <UploadCloud className="size-6" />
                        </label>
                        <input
                          multiple
                          className="hidden"
                          id="image"
                          type="file"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                    {/* Image previews */}
                    {imagePreviews.length > 0 && (
                      <div className="flex gap-5 my-5 flex-wrap">
                        {imagePreviews.map(
                          (imageDataUrl: string, index: number) => (
                            <div
                              key={index}
                              className="relative size-32 rounded-xl border-2 border-dashed border-default-300 p-2">
                              <img
                                alt={`Preview ${index}`}
                                className="h-full w-full object-cover rounded-md"
                                src={imageDataUrl}
                              />
                            </div>
                          )
                        )}
                      </div>
                    )}

                    <Divider className="my-6" />
                  </div>

                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={updateMakePending}>
                    {updateMakePending ? "Updating..." : "Update Make"}
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

const DeleteMakeModal = ({
  isOpen,
  onOpenChange,
  handleDeleteMake,
  deleteMakePending,
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
                ⚠️ Are you sure you want to delete this make? This action cannot
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
                onPress={handleDeleteMake}
                disabled={deleteMakePending}
                className="rounded">
                {deleteMakePending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
