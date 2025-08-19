"use client";

import FXInput from "@/src/components/form/FXInput";
import { useCreateCategory, useDeleteCategory, useGetCategories, useUpdateCategory } from "@/src/hooks/categories.hook";
import { ICategory } from "@/src/types";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { useQueryClient } from "@tanstack/react-query";
import { UploadCloud } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { DataEmpty, DataError, DataLoading } from "../../_components/DataFetchingStates";
import CategoriesTable from "./CategoriesTable";

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
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

  const { mutate: handleCreateCategory, isPending: createCategoryPending } = useCreateCategory({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_CATEGORIES"] });
      toast.success("Category created successfully");
      methods.reset();
      onClose();
    },
  });

  const { mutate: handleUpdateCategory, isPending: updateCategoryPending } = useUpdateCategory({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_CATEGORIES"] });
      toast.success("Category updated successfully");
      methods.reset();
      setSelectedCategory(null);
      onEditClose();
    },
    id: selectedCategory?._id,
  });
  const { mutate: handleDeleteCategory, isPending: deleteCategoryPending } = useDeleteCategory({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_CATEGORIES"] });
      toast.success("Category deleted successfully");
      setSelectedCategory(null);
      onDeleteClose();
    },
    id: selectedCategory?._id,
  });
  const { data: categories, isLoading, isError } = useGetCategories({}) as any; // Get existing categories

  console.log(categories);

  // Client-side pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  // Reset page when categories change
  useState;

  // compute paginated data
  const paginated: { data: any[]; meta: { page: number; limit: number; total: number; totalPages: number } } = (() => {
    if (!categories?.data) return { data: [], meta: { page: 1, limit: pageSize, total: 0, totalPages: 1 } };
    const total = categories.data.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const page = Math.min(Math.max(1, currentPage), totalPages);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const data = categories.data.slice(start, end);
    return { data, meta: { page, limit: pageSize, total, totalPages } };
  })();

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
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">Category Management</h1>
        <Button
          color="primary"
          className="px-7 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}
        >
          + Add Category
        </Button>
      </div>

      {/* error handling */}
      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {categories?.data?.length === 0 && <DataEmpty />}

      {/* Category table */}
      {!isLoading && categories?.data?.length > 0 && (
        <>
          <div className="w-full overflow-x-auto">
            <CategoriesTable
              categories={paginated}
              onEditOpen={onEditOpen}
              onDeleteOpen={onDeleteOpen}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          {/* Pagination controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-default-500">
              Showing {paginated.data.length} of {categories.data.length} categories
            </div>

            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 rounded border"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={paginated.meta.page <= 1}
              >
                Prev
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: paginated.meta.totalPages }).map((_, idx) => {
                  const page = idx + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded ${page === paginated.meta.page ? "bg-default-800 text-white" : "border"}`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                className="px-3 py-1 rounded border"
                onClick={() => setCurrentPage((p) => Math.min(paginated.meta.totalPages, p + 1))}
                disabled={paginated.meta.page >= paginated.meta.totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </>
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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Category</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-6">
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* Name & Slug Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <FXInput label="Name" name="name" />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput label="Slug" name="slug" />
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="w-full">
                      <label
                        htmlFor="image"
                        className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-default-200 bg-default-50 text-default-500 shadow-sm transition hover:border-default-400 hover:bg-default-100"
                      >
                        <span className="text-md font-medium">Upload Images</span>
                        <UploadCloud className="size-6" />
                      </label>
                      <input multiple className="hidden" id="image" type="file" onChange={handleImageChange} />
                    </div>
                  </div>

                  {/* Image previews */}
                  {imagePreviews.length > 0 && (
                    <div className="flex gap-5 my-5 flex-wrap">
                      {imagePreviews.map((imageDataUrl: string, index: number) => (
                        <div
                          key={index}
                          className="relative size-32 rounded-xl border-2 border-dashed border-default-300 p-2"
                        >
                          <img
                            alt={`Preview ${index}`}
                            className="h-full w-full object-cover rounded-md"
                            src={imageDataUrl}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <Divider className="my-6" />

                  <Button color="primary" type="submit" className="w-full rounded" disabled={createCategoryPending}>
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
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Category</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-6">
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* Name & Slug Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <FXInput label="Name" name="name" defaultValue={defaultValues.name} />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput label="Slug" name="slug" defaultValue={defaultValues.slug} />
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
                        className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-default-200 bg-default-50 text-default-500 shadow-sm transition hover:border-default-400 hover:bg-default-100"
                      >
                        <span className="text-md font-medium">Upload Images</span>
                        <UploadCloud className="size-6" />
                      </label>
                      <input multiple className="hidden" id="image" type="file" onChange={handleImageChange} />
                    </div>
                  </div>

                  {/* Image previews */}
                  {imagePreviews.length > 0 && (
                    <div className="flex gap-5 my-5 flex-wrap">
                      {imagePreviews.map((imageDataUrl: string, index: number) => (
                        <div
                          key={index}
                          className="relative size-32 rounded-xl border-2 border-dashed border-default-300 p-2"
                        >
                          <img
                            alt={`Preview ${index}`}
                            className="h-full w-full object-cover rounded-md"
                            src={imageDataUrl}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <Divider className="my-6" />

                  <Button color="primary" type="submit" className="w-full rounded" disabled={updateCategoryPending}>
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

const DeleteCategoryModal = ({ isOpen, onOpenChange, handleDeleteCategory, deleteCategoryPending }: any) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Confirm Delete</ModalHeader>

            <ModalBody>
              <p className="text-sm text-red-500">
                ⚠️ Are you sure you want to delete this category? This action cannot be undone.
              </p>
            </ModalBody>

            <ModalFooter className="flex justify-end gap-2">
              <Button variant="bordered" className="rounded" onPress={onOpenChange}>
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={handleDeleteCategory}
                disabled={deleteCategoryPending}
                className="rounded"
              >
                {deleteCategoryPending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
