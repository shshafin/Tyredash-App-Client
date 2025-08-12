"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "@heroui/button";
import {
  useCreateCategory,
  useUpdateCategory,
  useGetCategories,
  useDeleteCategory,
} from "@/src/hooks/categories.hook";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Divider } from "@heroui/divider";
import FXInput from "@/src/components/form/FXInput";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import FXTextArea from "@/src/components/form/FXTextArea";
import { toBase64 } from "@/src/helper/toBase64";
import CategoriesTable from "./CategoriesTable";
import { Images, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ICategory } from "@/src/types";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../../_components/DataFetchingStates";

export default function AdminCategoryPage() {
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
  const [imageFiles, setImageFiles] = useState<File[] | []>([]); // Track selected images
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]); // Track image previews
  const methods = useForm(); // Hook form methods
  // const methods as editMethods = useForm();
  const { handleSubmit } = methods;
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  const { mutate: handleCreateCategory, isPending: createCategoryPending } =
    useCreateCategory({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_CATEGORIES"] });
        toast.success("Category created successfully");
        methods.reset();
        onClose();
      },
    });

  const { mutate: handleUpdateCategory, isPending: updateCategoryPending } =
    useUpdateCategory({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_CATEGORIES"] });
        toast.success("Category updated successfully");
        methods.reset();
        setSelectedCategory(null);
        onEditClose();
      },
      id: selectedCategory?._id,
    });
  const { mutate: handleDeleteCategory, isPending: deleteCategoryPending } =
    useDeleteCategory({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_CATEGORIES"] });
        toast.success("Category deleted successfully");
        setSelectedCategory(null);
        onDeleteClose();
      },
      id: selectedCategory?._id,
    });
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetCategories(undefined) as any; // Get existing categories

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    // Append textual data
    formData.append("name", data.name);
    formData.append("slug", data.slug);

    // Append images to FormData
    imageFiles.forEach((image) => {
      formData.append("file", image);
    });

    // Call the function to handle category creation
    handleCreateCategory(formData);
  };

  // Handle form submission
  const onEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    // Append textual data
    formData.append("name", data.name);
    formData.append("slug", data.slug);

    // Append images to FormData
    imageFiles.forEach((image) => {
      formData.append("file", image);
    });
    handleUpdateCategory(formData); // Send category data
  };

  // handle image
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
      {/* Header section with title and button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Category Management
        </h1>
        <Button
          color="primary"
          className="px-7 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}>
          + Add Category
        </Button>
      </div>

      {/* error handling */}
      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {categories?.data?.length === 0 && <DataEmpty />}

      {/* Category table */}
      {!isLoading && categories?.data?.length > 0 && (
        <div className="w-full overflow-x-auto">
          <CategoriesTable
            categories={categories}
            onEditOpen={onEditOpen}
            onDeleteOpen={onDeleteOpen}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      )}

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        handleImageChange={handleImageChange}
        imagePreviews={imagePreviews}
        createCategoryPending={createCategoryPending}
      />

      {/* Edit Category Modal */}
      <EditCategoryModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        handleImageChange={handleImageChange}
        imagePreviews={imagePreviews}
        updateCategoryPending={updateCategoryPending}
        defaultValues={selectedCategory}
      />

      {/* Delete Category Modal */}
      <DeleteCategoryModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteCategory={handleDeleteCategory}
        deleteCategoryPending={deleteCategoryPending}
      />
    </div>
  );
}

const AddCategoryModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  handleImageChange,
  imagePreviews,
  createCategoryPending,
}: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Category
            </ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* Name & Slug Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Name"
                          name="name"
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Slug"
                          name="slug"
                        />
                      </div>
                    </div>

                    {/* Image Upload */}
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

                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={createCategoryPending}>
                    {createCategoryPending ? "Creating..." : "Create Category"}
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

const EditCategoryModal = ({
  defaultValues,
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  handleImageChange,
  imagePreviews,
  updateCategoryPending,
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
              Edit Category
            </ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* Name & Slug Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Name"
                          name="name"
                          defaultValue={defaultValues.name}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Slug"
                          name="slug"
                          defaultValue={defaultValues.slug}
                        />
                      </div>
                    </div>

                    {/* Description TextArea */}
                    {/* <div className="flex w-full">
                      <div className="flex-1 min-w-[150px]">
                        <FXTextArea
                          label="Description"
                          name="description"
                          defaultValue={defaultValues.description}
                        />
                      </div>
                    </div> */}

                    {/* Image Upload */}
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

                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={updateCategoryPending}>
                    {updateCategoryPending ? "Updating..." : "Update Category"}
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

const DeleteCategoryModal = ({
  isOpen,
  onOpenChange,
  handleDeleteCategory,
  deleteCategoryPending,
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
                ⚠️ Are you sure you want to delete this category? This action
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
                onPress={handleDeleteCategory}
                disabled={deleteCategoryPending}
                className="rounded">
                {deleteCategoryPending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
