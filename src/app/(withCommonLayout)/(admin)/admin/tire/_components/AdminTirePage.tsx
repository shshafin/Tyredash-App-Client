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

import { ITire } from "@/src/types";
import { ChangeEvent, useState } from "react";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../../_components/DataFetchingStates";
import { UploadCloud } from "lucide-react";
import { Divider } from "@heroui/divider";
import {
  useCreateTire,
  useDeleteTire,
  useGetTires,
  useUpdateTire,
} from "@/src/hooks/tire.hook";
import { useGetYears } from "@/src/hooks/years.hook";
import { useGetTrims } from "@/src/hooks/trim.hook";
import { useGetModels } from "@/src/hooks/model.hook";
import { useGetMakes } from "@/src/hooks/makes.hook";
import TiresTable from "./TireTable";
import { useGetTyreSizes } from "@/src/hooks/tyreSize.hook";
import { useGetCategories } from "@/src/hooks/categories.hook";
import { useGetBrands } from "@/src/hooks/brand.hook";

export default function AdminTirePage() {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure(); // Modal open state
  // const {
  //   isOpen: isEditOpen,
  //   onOpen: onEditOpen,
  //   onOpenChange: onEditOpenChange,
  //   onClose: onEditClose,
  // } = useDisclosure();
  // const {
  //   isOpen: isDeleteOpen,
  //   onOpen: onDeleteOpen,
  //   onOpenChange: onDeleteOpenChange,
  //   onClose: onDeleteClose,
  // } = useDisclosure();
  const methods = useForm(); // Hook form methods
  const { handleSubmit } = methods;
  // const [selectedTire, setSelectedTire] = useState<ITire | null>(null);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]); // Track selected images
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]); // Track image previews

  const { mutate: handleCreateTire, isPending: createTirePending } =
    useCreateTire({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_TIRES"] });
        toast.success("Tire created successfully");
        methods.reset();
        onClose();
      },
    }); // Tire creation handler
  // const { mutate: handleUpdateTire, isPending: updateTirePending } =
  //   useUpdateTire({
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["GET_TIRES"] });
  //       toast.success("Tire updated successfully");
  //       methods.reset();
  //       setSelectedTire(null);
  //       onEditClose();
  //     },
  //     id: selectedTire?._id,
  //   }); // Tire update handler
  // const { mutate: handleDeleteTire, isPending: deleteTirePending } =
  //   useDeleteTire({
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["GET_TIRES"] });
  //       toast.success("Tire deleted successfully");
  //       setSelectedTire(null);
  //       onDeleteClose();
  //     },
  //     id: selectedTire?._id,
  //   }); // Tire deletion handler
  // const { data: Tires, isLoading, isError } = useGetTires({}); // Get existing Tires

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Make sure the required fields are explicitly set and not empty
    const formData = new FormData();
    const tireData = {
      ...data,
      make: data.make,
      model: data.model,
      year: data.year,
      trim: data.trim,
      tireSize: data.tyreSize,
      category: data.category,
      drivingType: data.drivingType,
      brand: data.brand,
      diameterRange: Number(data.diameterRange),
      sectionWidth: Number(data.sectionWidth),
      aspectRatio: Number(data.aspectRatio),
      rimDiameter: Number(data.rimDiameter),
      overallDiameter: Number(data.overallDiameter),
      rimWidthRange: Number(data.rimWidthRange),
      width: Number(data.width),
      treadDepth: Number(data.treadDepth),
      loadIndex: Number(data.loadIndex),
      maxPSI: Number(data.maxPSI),
      loadCapacity: Number(data.loadCapacity),
      price: Number(data.price),
      discountPrice: Number(data.discountPrice),
      stockQuantity: Number(data.stockQuantity),
    };

    formData.append("data", JSON.stringify(tireData)); // Append tire data to formData

    // Append images separately
    imageFiles.forEach((image) => {
      formData.append("images", image);
    });

    // Submit the form
    handleCreateTire(formData);
  };

  // const onEditSubmit: SubmitHandler<FieldValues> = async (data) => {
  //   const formData = new FormData();

  //   // Dynamically append all fields
  //   Object.keys(data).forEach((key) => {
  //     const value = data[key];
  //     if (value !== undefined && value !== null) {
  //       formData.append(key, value);
  //     }
  //   });

  //   // Append images separately
  //   imageFiles.forEach((image) => {
  //     formData.append("file", image);
  //   });
  //   handleUpdateTire(formData); // update Tire data
  // };

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
      {/* <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Tire
        </h1>
        <Button
          color="primary"
          className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}>
          + Add Tire
        </Button>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="col-span-full">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-7xl mx-auto space-y-10 p-4"
            >
              {/* General Info Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-default-900">
                  General Information
                </h2>
                <Divider />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FXInput label="Name" name="name" />
                  <FXInput label="Description" name="description" />
                  <FXInput label="Product Line" name="productLine" />
                  <FXInput label="Unit Name" name="unitName" />
                  <FXInput label="Condition Info" name="conditionInfo" />
                </div>
              </div>

              {/* Tire Specification */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-default-900">
                  Tire Specifications
                </h2>
                <Divider />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <MakeSelectForTyre
                    defaultValue=""
                    register={methods.register}
                  />
                  <YearSelectForTyre
                    defaultValue=""
                    register={methods.register}
                  />
                  <ModelSelectForTire
                    defaultValue=""
                    register={methods.register}
                  />
                  <TrimSelectForTyre
                    defaultValue=""
                    register={methods.register}
                  />
                  <CategorySelectForTyre
                    defaultValue=""
                    register={methods.register}
                  />
                  <DrivingTypeSelectForTyre
                    defaultValue=""
                    register={methods.register}
                  />

                  <TyreSizeSelectForTire
                    defaultValue=""
                    register={methods.register}
                  />
                  <BrandSelectForTire
                    defaultValue=""
                    register={methods.register}
                  />
                  <FXInput label="Tread Pattern" name="treadPattern" />
                  <FXInput label="Tire Type" name="tireType" />
                  <FXInput label="Construction Type" name="constructionType" />
                </div>
              </div>

              {/* Dimensions & Measurements */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-default-900">
                  Dimensions & Measurements
                </h2>
                <Divider />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FXInput label="Section Width" name="sectionWidth" />
                  <FXInput label="Aspect Ratio" name="aspectRatio" />
                  <FXInput label="Rim Diameter" name="rimDiameter" />
                  <FXInput label="Overall Diameter" name="overallDiameter" />
                  <FXInput label="Rim Width Range" name="rimWidthRange" />
                  <FXInput label="Width" name="width" />
                  <FXInput label="Tread Depth" name="treadDepth" />
                  <FXInput label="Load Index" name="loadIndex" />
                  <FXInput label="Load Range" name="loadRange" />
                  <FXInput label="Max PSI" name="maxPSI" />
                  <FXInput label="Warranty" name="warranty" />
                  <FXInput label="Load Capacity" name="loadCapacity" />
                </div>
              </div>

              {/* Range Values */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-default-900">
                  Range Values
                </h2>
                <Divider />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FXInput label="Gross Weight Range" name="grossWeightRange" />
                  <FXInput label="GTIN Range" name="gtinRange" />
                  <FXInput label="Load Index Range" name="loadIndexRange" />
                  <FXInput
                    label="Mileage Warranty Range"
                    name="mileageWarrantyRange"
                  />
                  <FXInput
                    label="Max Air Pressure Range"
                    name="maxAirPressureRange"
                  />
                  <FXInput label="Speed Rating Range" name="speedRatingRange" />
                  <FXInput
                    label="Sidewall Description Range"
                    name="sidewallDescriptionRange"
                  />
                  <FXInput
                    label="Temperature Grade Range"
                    name="temperatureGradeRange"
                  />
                  <FXInput
                    label="Section Width Range"
                    name="sectionWidthRange"
                  />
                  <FXInput label="Diameter Range" name="diameterRange" />
                  <FXInput
                    label="Wheel Rim Diameter Range"
                    name="wheelRimDiameterRange"
                  />
                  <FXInput
                    label="Traction Grade Range"
                    name="tractionGradeRange"
                  />
                  <FXInput label="Tread Depth Range" name="treadDepthRange" />
                  <FXInput label="Tread Width Range" name="treadWidthRange" />
                  <FXInput
                    label="Overall Width Range"
                    name="overallWidthRange"
                  />
                  <FXInput
                    label="Treadwear Grade Range"
                    name="treadwearGradeRange"
                  />
                  <FXInput label="Aspect Ratio Range" name="aspectRatioRange" />
                </div>
              </div>

              {/* Pricing and Stock */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-default-900">
                  Pricing & Stock
                </h2>
                <Divider />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FXInput label="Price" name="price" />
                  <FXInput label="Discount Price" name="discountPrice" />
                  <FXInput label="Stock Quantity" name="stockQuantity" />
                </div>
              </div>

              {/* Upload Images */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-default-900">
                  Upload Images
                </h2>
                <Divider />
                <div className="space-y-4">
                  <label
                    htmlFor="images"
                    className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-gray-300 bg-gray-50 text-gray-600 shadow-sm transition hover:border-gray-400 hover:bg-gray-100"
                  >
                    <span className="text-md font-medium">Upload Images</span>
                    <UploadCloud className="size-6" />
                  </label>
                  <input
                    multiple
                    className="hidden"
                    id="images"
                    name="images"
                    type="file"
                    onChange={handleImageChange}
                  />
                  {imagePreviews.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                      {imagePreviews.map(
                        (imageDataUrl: string, index: number) => (
                          <div
                            key={index}
                            className="relative size-32 rounded-xl border-2 border-dashed border-gray-300 p-2"
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
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-10">
                <Button
                  type="submit"
                  className="w-full rounded bg-rose-600"
                  disabled={createTirePending}
                >
                  {createTirePending ? "Creating..." : "Create Tire"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>

      {/* {isLoading && <DataLoading />}
      {isError && <DataError />}
      {Tires?.data?.length === 0 && <DataEmpty />}

      {!isLoading && Tires?.data?.length > 0 && (
        <TiresTable
          Tires={Tires}
          onDeleteOpen={onDeleteOpen}
          onEditOpen={onEditOpen}
          setSelectedTire={setSelectedTire}
        />
      )} */}

      {/* Modal for adding a new Tire */}
      {/* <AddTireModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createTirePending={createTirePending}
        imagePreviews={imagePreviews}
        handleImageChange={handleImageChange}
      /> */}
      {/* Modal for editing a Tire */}
      {/* <EditTireModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        updateTirePending={updateTirePending}
        defaultValues={selectedTire}
        imagePreviews={imagePreviews}
        handleImageChange={handleImageChange}
      /> */}
      {/* Modal for deleting a Tire */}
      {/* <DeleteTireModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteTire={handleDeleteTire}
        deleteTirePending={deleteTirePending}
      /> */}
    </div>
  );
}

// const AddTireModal = ({
//   isOpen,
//   onOpenChange,
//   methods,
//   handleSubmit,
//   onSubmit,
//   createTirePending,
//   imagePreviews,
//   handleImageChange,
// }: any) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onOpenChange={onOpenChange}>
//       <ModalContent>
//         {() => (
//           <>
//             <ModalHeader className="flex flex-col gap-1">Add Tire</ModalHeader>
//             <ModalBody className="mb-5">
//               <FormProvider {...methods}>
//                 <form
//                   onSubmit={handleSubmit(onSubmit)}
//                   className="max-w-xl mx-auto space-y-6">
//                   <div className="flex flex-wrap gap-4 py-2">
//                     {/* Tire & logo Inputs */}
//                     <div className="flex flex-wrap gap-2 w-full">
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Name"
//                           name="name"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <MakeSelectForTyre
//                           defaultValue=""
//                           register={methods.register}
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <YearSelectForTyre
//                           defaultValue=""
//                           register={methods.register}
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <ModelSelectForTire
//                           defaultValue=""
//                           register={methods.register}
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <TrimSelectForTyre
//                           defaultValue=""
//                           register={methods.register}
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <CategorySelectForTyre
//                           defaultValue=""
//                           register={methods.register}
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <TyreSizeSelectForTire
//                           defaultValue=""
//                           register={methods.register}
//                         />
//                       </div>

//                       <div className="flex-1 min-w-[150px]">
//                         <BrandSelectForTire
//                           defaultValue=""
//                           register={methods.register}
//                         />
//                       </div>

//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Description"
//                           name="description"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Product Line"
//                           name="productLine"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Unit Name"
//                           name="unitName"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Condition Info"
//                           name="conditionInfo"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Gross Weight Range"
//                           name="grossWeightRange"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="GTIN Range"
//                           name="gtinRange"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Load Index Range"
//                           name="loadIndexRange"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Mileage Warranty Range"
//                           name="mileageWarrantyRange"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Max Air Pressure Range"
//                           name="maxAirPressureRange"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Speed Rating Range"
//                           name="speedRatingRange"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Sidewall Description Range"
//                           name="sidewallDescriptionRange"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Temperature Grade Range"
//                           name="temperatureGradeRange"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Section Width Range"
//                           name="sectionWidthRange"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Diameter Range"
//                           name="diameterRange"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Wheel Rim Diameter Range"
//                           name="wheelRimDiameterRange"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Traction Grade Range"
//                           name="tractionGradeRange"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Tread Depth Range"
//                           name="treadDepthRange"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Tread Width Range"
//                           name="treadWidthRange"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Overall Width Range"
//                           name="overallWidthRange"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Treadwear Grade Range"
//                           name="treadwearGradeRange"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Section Width"
//                           name="sectionWidth"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Aspect Ratio"
//                           name="aspectRatio"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Rim Diameter"
//                           name="rimDiameter"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Overall Diameter"
//                           name="overallDiameter"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Rim Width Range"
//                           name="rimWidthRange"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Width"
//                           name="width"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Tread Depth"
//                           name="treadDepth"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Load Index"
//                           name="loadIndex"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Load Range"
//                           name="loadRange"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Max PSI"
//                           name="maxPSI"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Warranty"
//                           name="warranty"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Aspect Ratio Range"
//                           name="aspectRatioRange"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Tread Pattern"
//                           name="treadPattern"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Load Capacity"
//                           name="loadCapacity"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Construction Type"
//                           name="constructionType"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Tire Type"
//                           name="tireType"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Price"
//                           name="price"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Discount Price"
//                           name="discountPrice"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Stock Quantity"
//                           name="stockQuantity"
//                         />
//                       </div>

//                       <div className="w-full">
//                         <label
//                           htmlFor="images"
//                           className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-default-200 bg-default-50 text-default-9000 shadow-sm transition hover:border-default-400 hover:bg-default-100">
//                           <span className="text-md font-medium">
//                             Upload Images
//                           </span>
//                           <UploadCloud className="size-6" />
//                         </label>
//                         <input
//                           multiple
//                           className="hidden"
//                           id="images"
//                           name="images"
//                           type="file"
//                           onChange={handleImageChange}
//                         />
//                       </div>
//                     </div>
//                     {/* Image previews */}
//                     {imagePreviews.length > 0 && (
//                       <div className="flex gap-5 my-5 flex-wrap">
//                         {imagePreviews.map(
//                           (imageDataUrl: string, index: number) => (
//                             <div
//                               key={index}
//                               className="relative size-32 rounded-xl border-2 border-dashed border-default-300 p-2">
//                               <img
//                                 alt={`Preview ${index}`}
//                                 className="h-full w-full object-cover rounded-md"
//                                 src={imageDataUrl}
//                               />
//                             </div>
//                           )
//                         )}
//                       </div>
//                     )}

//                     <Divider className="my-6" />
//                   </div>
//                   <Button
//                     color="primary"
//                     type="submit"
//                     className="w-full rounded"
//                     disabled={createTirePending}>
//                     {createTirePending ? "Creating..." : "Create Tire"}
//                   </Button>
//                 </form>
//               </FormProvider>
//             </ModalBody>
//           </>
//         )}
//       </ModalContent>
//     </Modal>
//   );
// };

// const EditTireModal = ({
//   isOpen,
//   onOpenChange,
//   methods,
//   handleSubmit,
//   onSubmit,
//   updateTirePending,
//   defaultValues,
//   imagePreviews,
//   handleImageChange,
// }: any) => {
//   if (!defaultValues) return null;
//   return (
//     <Modal
//       isOpen={isOpen}
//       onOpenChange={() => {
//         onOpenChange();
//         methods.reset();
//       }}>
//       <ModalContent>
//         {() => (
//           <>
//             <ModalHeader className="flex flex-col gap-1">Edit Tire</ModalHeader>
//             <ModalBody className="mb-5">
//               <FormProvider {...methods}>
//                 <form
//                   onSubmit={handleSubmit(onSubmit)}
//                   className="max-w-xl mx-auto space-y-6">
//                   <div className="flex flex-wrap gap-4 py-2">
//                     {/* Tire & logo Inputs */}
//                     <div className="flex flex-wrap gap-2 w-full">
//                       <div className="flex-1 min-w-[150px]">
//                         <FXInput
//                           label="Tire"
//                           name="Tire"
//                           defaultValue={defaultValues.Tire}
//                         />
//                       </div>
//                       <div className="w-full">
//                         <label
//                           htmlFor="image"
//                           className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-default-200 bg-default-50 text-default-9000 shadow-sm transition hover:border-default-400 hover:bg-default-100">
//                           <span className="text-md font-medium">
//                             Upload Images
//                           </span>
//                           <UploadCloud className="size-6" />
//                         </label>
//                         <input
//                           multiple
//                           className="hidden"
//                           id="image"
//                           type="file"
//                           onChange={handleImageChange}
//                         />
//                       </div>
//                     </div>
//                     {/* Image previews */}
//                     {imagePreviews.length > 0 && (
//                       <div className="flex gap-5 my-5 flex-wrap">
//                         {imagePreviews.map(
//                           (imageDataUrl: string, index: number) => (
//                             <div
//                               key={index}
//                               className="relative size-32 rounded-xl border-2 border-dashed border-default-300 p-2">
//                               <img
//                                 alt={`Preview ${index}`}
//                                 className="h-full w-full object-cover rounded-md"
//                                 src={imageDataUrl}
//                               />
//                             </div>
//                           )
//                         )}
//                       </div>
//                     )}

//                     <Divider className="my-6" />
//                   </div>

//                   <Button
//                     color="primary"
//                     type="submit"
//                     className="w-full rounded"
//                     disabled={updateTirePending}>
//                     {updateTirePending ? "Updating..." : "Update Tire"}
//                   </Button>
//                 </form>
//               </FormProvider>
//             </ModalBody>
//           </>
//         )}
//       </ModalContent>
//     </Modal>
//   );
// };

// const DeleteTireModal = ({
//   isOpen,
//   onOpenChange,
//   handleDeleteTire,
//   deleteTirePending,
// }: any) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onOpenChange={onOpenChange}>
//       <ModalContent>
//         {() => (
//           <>
//             <ModalHeader className="flex flex-col gap-1">
//               Confirm Delete
//             </ModalHeader>

//             <ModalBody>
//               <p className="text-sm text-red-500">
//                 ⚠️ Are you sure you want to delete this Tire? This action cannot
//                 be undone.
//               </p>
//             </ModalBody>

//             <ModalFooter className="flex justify-end gap-2">
//               <Button
//                 variant="bordered"
//                 className="rounded"
//                 onPress={onOpenChange}>
//                 Cancel
//               </Button>
//               <Button
//                 color="danger"
//                 onPress={handleDeleteTire}
//                 disabled={deleteTirePending}
//                 className="rounded">
//                 {deleteTirePending ? "Deleting..." : "Delete"}
//               </Button>
//             </ModalFooter>
//           </>
//         )}
//       </ModalContent>
//     </Modal>
//   );
// };

const MakeSelectForTyre = ({ defaultValue, register }: any) => {
  const { data: makes, isLoading, isError } = useGetMakes({});

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("make", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5"
      >
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
const CategorySelectForTyre = ({ defaultValue, register }: any) => {
  const { data: category, isLoading, isError } = useGetCategories();
  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("category", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5"
      >
        <option value="">Select Category</option>
        {isLoading && <option value="">Loading Categories...</option>}
        {isError && <option value="">Failed to load Categories</option>}
        {category?.data?.length === 0 && (
          <option value="">No Categories found</option>
        )}
        {category?.data?.map((m: any) => (
          <option key={m?.name} value={m?._id}>
            {m?.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const YearSelectForTyre = ({ defaultValue, register }: any) => {
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

const BrandSelectForTire = ({ defaultValue, register }: any) => {
  const { data: brand, isLoading, isError } = useGetBrands({});

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("brand", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5"
      >
        <option value="">Select Brand</option>
        {isLoading && <option value="">Loading Brands...</option>}
        {isError && <option value="">Failed to load Brands</option>}
        {brand?.data?.length === 0 && <option value="">No Brands found</option>}
        {brand?.data?.map((m: any) => (
          <option key={m?._id} value={m?._id}>
            {m?.name}
          </option>
        ))}
      </select>
    </div>
  );
};
const ModelSelectForTire = ({ defaultValue, register }: any) => {
  const { data: model, isLoading, isError } = useGetModels({});

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("model", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5"
      >
        <option value="">Select Model</option>
        {isLoading && <option value="">Loading Models...</option>}
        {isError && <option value="">Failed to load Models</option>}
        {model?.data?.length === 0 && <option value="">No Models found</option>}
        {model?.data?.map((m: any) => (
          <option key={m?.model} value={m?._id}>
            {m?.model}
          </option>
        ))}
      </select>
    </div>
  );
};

const DrivingTypeSelectForTyre = ({ defaultValue, register }: any) => {
  const { data: drivingType, isLoading, isError } = useGetCategories();
  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("category", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5"
      >
        <option value="">Select driving types</option>
        {isLoading && <option value="">Loading driving types...</option>}
        {isError && <option value="">Failed to load driving types</option>}
        {drivingType?.data?.length === 0 && (
          <option value="">No driving types found</option>
        )}
        {drivingType?.data?.map((m: any) => (
          <option key={m?.title} value={m?._id}>
            {m?.title}
          </option>
        ))}
      </select>
    </div>
  );
};

const TyreSizeSelectForTire = ({ defaultValue, register }: any) => {
  const { data: tireSize, isLoading, isError } = useGetTyreSizes({});

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("tyreSize", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5"
      >
        <option value="">Select Tyre Size</option>
        {isLoading && <option value="">Loading Tyre Sizes...</option>}
        {isError && <option value="">Failed to load Tyre Sizes</option>}
        {tireSize?.data?.length === 0 && (
          <option value="">No Tyre Sizes found</option>
        )}
        {tireSize?.data?.map((m: any) => (
          <option key={m?.tireSize} value={m?._id}>
            {m?.tireSize}
          </option>
        ))}
      </select>
    </div>
  );
};

const TrimSelectForTyre = ({ defaultValue, register }: any) => {
  const { data: trim, isLoading, isError } = useGetTrims({});

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("trim", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5"
      >
        <option value="">Select Trim</option>
        {isLoading && <option value="">Loading Trims...</option>}
        {isError && <option value="">Failed to load Trims</option>}
        {trim?.data?.length === 0 && <option value="">No Trims found</option>}
        {trim?.data?.map((m: any) => (
          <option key={m?.trim} value={m?._id}>
            {m?.trim}
          </option>
        ))}
      </select>
    </div>
  );
};
