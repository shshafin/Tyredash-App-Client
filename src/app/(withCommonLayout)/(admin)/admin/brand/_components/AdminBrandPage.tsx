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

import { ChangeEvent, useState } from "react";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../../_components/DataFetchingStates";
import { UploadCloud } from "lucide-react";
import { Divider } from "@heroui/divider";
import { IBrand } from "@/src/types";
import {
  useCreateBrand,
  useDeleteBrand,
  useGetBrands,
  useUpdateBrand,
} from "@/src/hooks/brand.hook";
import BrandsTable from "./BrandTable";

export default function AdminBrandPage() {
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
  const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(null);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]); // Track selected images
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]); // Track image previews

  const { mutate: handleCreateBrand, isPending: createBrandPending } =
    useCreateBrand({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_BRANDS"] });
        toast.success("Brand created successfully");
        methods.reset();
        onClose();
      },
    }); // Brand creation handler
  const { mutate: handleUpdateBrand, isPending: updateBrandPending } =
    useUpdateBrand({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_BRANDS"] });
        toast.success("Brand updated successfully");
        methods.reset();
        setSelectedBrand(null);
        onEditClose();
      },
      id: selectedBrand?._id,
    }); // Brand update handler
  const { mutate: handleDeleteBrand, isPending: deleteBrandPending } =
    useDeleteBrand({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_BRANDS"] });
        toast.success("Brand deleted successfully");
        setSelectedBrand(null);
        onDeleteClose();
      },
      id: selectedBrand?._id,
    }); // Brand deletion handler
  const { data: Brands, isLoading, isError } = useGetBrands({}); // Get existing Brands

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    // Append textual data
    formData.append("name", data.name);
    formData.append("description", data.description);

    // Append images to FormData
    imageFiles.forEach((image) => {
      formData.append("file", image);
    });

    handleCreateBrand(formData); // Send Brand data
  };
  const onEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    // Append textual data
    formData.append("name", data.name);
    formData.append("description", data.description);

    // Append images to FormData
    imageFiles.forEach((image) => {
      formData.append("file", image);
    });
    handleUpdateBrand(formData); // update Brand data
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
          Brand
        </h1>
        <Button
          color="primary"
          className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}
        >
          + Add Brand
        </Button>
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {Brands?.data?.length === 0 && <DataEmpty />}

      {!isLoading && Brands?.data?.length > 0 && (
        <BrandsTable
          Brands={Brands}
          onDeleteOpen={onDeleteOpen}
          onEditOpen={onEditOpen}
          setSelectedBrand={setSelectedBrand}
        />
      )}

      {/* Modal for adding a new Brand */}
      <AddBrandModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createBrandPending={createBrandPending}
        imagePreviews={imagePreviews}
        handleImageChange={handleImageChange}
      />
      {/* Modal for editing a Brand */}
      <EditBrandModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        updateBrandPending={updateBrandPending}
        defaultValues={selectedBrand}
        imagePreviews={imagePreviews}
        handleImageChange={handleImageChange}
      />
      {/* Modal for deleting a Brand */}
      <DeleteBrandModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteBrand={handleDeleteBrand}
        deleteBrandPending={deleteBrandPending}
      />
    </div>
  );
}

const AddBrandModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  createBrandPending,
  imagePreviews,
  handleImageChange,
}: any) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Brand</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6"
                >
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* Brand & logo Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <FXInput label="Brand Name" name="name" />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput label="Description" name="description" />
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="image"
                          className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-default-200 bg-default-50 text-default-500 shadow-sm transition hover:border-default-400 hover:bg-default-100"
                        >
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
                              className="relative size-32 rounded-xl border-2 border-dashed border-default-300 p-2"
                            >
                              <img
                                alt={`Preview ${index}`}
                                className="h-full w-full object-cover rounded-md"
                                src={imageDataUrl}
                              />
                            </div>
                          ),
                        )}
                      </div>
                    )}

                    <Divider className="my-6" />
                  </div>
                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={createBrandPending}
                  >
                    {createBrandPending ? "Creating..." : "Create Brand"}
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

const EditBrandModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  updateBrandPending,
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
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Brand
            </ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6"
                >
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* Brand & logo Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Brand Name"
                          name="name"
                          defaultValue={defaultValues.name}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Description"
                          name="description"
                          defaultValue={defaultValues.description}
                        />
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="image"
                          className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-default-200 bg-default-50 text-default-500 shadow-sm transition hover:border-default-400 hover:bg-default-100"
                        >
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
                              className="relative size-32 rounded-xl border-2 border-dashed border-default-300 p-2"
                            >
                              <img
                                alt={`Preview ${index}`}
                                className="h-full w-full object-cover rounded-md"
                                src={imageDataUrl}
                              />
                            </div>
                          ),
                        )}
                      </div>
                    )}

                    <Divider className="my-6" />
                  </div>

                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={updateBrandPending}
                  >
                    {updateBrandPending ? "Updating..." : "Update Brand"}
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

const DeleteBrandModal = ({
  isOpen,
  onOpenChange,
  handleDeleteBrand,
  deleteBrandPending,
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
                ⚠️ Are you sure you want to delete this Brand? This action
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
                onPress={handleDeleteBrand}
                disabled={deleteBrandPending}
                className="rounded"
              >
                {deleteBrandPending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

// const YearSelectForBrand = ({ defaultValue, register }: any) => {
//   const { data: year, isLoading, isError } = useGetYears({});
//   console.log("year", year?.data);

//   return (
//     <div className="flex-1 min-w-[150px]">
//       <select
//         {...register("year", { required: true })}
//         defaultValue={defaultValue ? defaultValue?._id : ""}
//         className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5">
//         <option value="">Select Year</option>
//         {isLoading && <option value="">Loading Years...</option>}
//         {isError && <option value="">Failed to load Years</option>}
//         {year?.data?.length === 0 && <option value="">No Years found</option>}
//         {year?.data?.map((y: any) => (
//           <option
//             key={y?.year}
//             value={y?._id}>
//             {y?.year}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };
