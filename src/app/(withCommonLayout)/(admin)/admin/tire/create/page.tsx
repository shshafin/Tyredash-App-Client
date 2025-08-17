"use client";

import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
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

import { UploadCloud } from "lucide-react";
import { Divider } from "@heroui/divider";
import { useCreateTire } from "@/src/hooks/tire.hook";
import { useGetYears } from "@/src/hooks/years.hook";
import { useGetTrims } from "@/src/hooks/trim.hook";
import { useGetModels } from "@/src/hooks/model.hook";
import { useGetMakes } from "@/src/hooks/makes.hook";
// import TiresTable from "./TireTable";
import { useGetTyreSizes } from "@/src/hooks/tyreSize.hook";
import { useGetCategories } from "@/src/hooks/categories.hook";
import { useGetBrands } from "@/src/hooks/brand.hook";
import { useGetDrivingTypes } from "@/src/hooks/drivingTypes.hook";
import { useGetVehicleTypes } from "@/src/hooks/vehicleType.hook";
import { useGetTireWidths } from "@/src/hooks/tireWidth.hook";
import { useGetTireRatios } from "@/src/hooks/tireRatio.hook";
import { useGetTireDiameters } from "@/src/hooks/tireDiameter.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { tireSchema } from "@/src/schemas/tire.schema";

export default function AdminTirePage() {
  const queryClient = useQueryClient();
  const { onClose } = useDisclosure(); // Modal open state

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
    });

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
      vehicleType: data.vehicleType,
      width: data.width,
      ratio: data.ratio,
      rimDiameter: data.rimDiameter,
      sectionWidth: Number(data.sectionWidth),
      overallDiameter: Number(data.overallDiameter),
      rimWidthRange: Number(data.rimWidthRange),
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="col-span-full">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-7xl mx-auto space-y-10 p-4">
              {/* General Info Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-default-900">
                  General Information
                </h2>
                <Divider />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FXInput
                    label="Name"
                    name="name"
                  />
                  <FXInput
                    label="Description"
                    name="description"
                  />
                  <FXInput
                    label="Product Line"
                    name="productLine"
                  />
                  <FXInput
                    label="Unit Name"
                    name="unitName"
                  />
                  <FXInput
                    label="Condition Info"
                    name="conditionInfo"
                  />
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
                  <VehicleSelectForTyre
                    defaultValue=""
                    register={methods.register}
                  />
                  <FXInput
                    label="Tread Pattern"
                    name="treadPattern"
                  />
                  <FXInput
                    label="Tire Type"
                    name="tireType"
                  />
                  <FXInput
                    label="Construction Type"
                    name="constructionType"
                  />
                </div>
              </div>

              {/* Dimensions & Measurements */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-default-900">
                  Dimensions & Measurements
                </h2>
                <Divider />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FXInput
                    label="Section Width"
                    name="sectionWidth"
                    type="number"
                    rules={{
                      required: "Section Width is required",
                      valueAsNumber: true,
                      validate: (value: any) =>
                        typeof value === "number" && !isNaN(value)
                          ? true
                          : "Section Width must be a number",
                    }}
                  />
                  <RatioSelectForTyre
                    defaultValue=""
                    register={methods.register}
                  />
                  <DiameterSelectForTyre
                    defaultValue=""
                    register={methods.register}
                  />
                  <FXInput
                    label="Overall Diameter"
                    name="overallDiameter"
                    type="number"
                    rules={{
                      required: "Overall Diameter is required",
                      valueAsNumber: true,
                      validate: (value: any) =>
                        typeof value === "number" && !isNaN(value)
                          ? true
                          : "Overall Diameter must be a number",
                    }}
                  />
                  <FXInput
                    label="Rim Width Range"
                    name="rimWidthRange"
                    type="number"
                    rules={{
                      required: "Rim Width Range is required",
                      valueAsNumber: true,
                      validate: (value: any) =>
                        typeof value === "number" && !isNaN(value)
                          ? true
                          : "Rim Width Range must be a number",
                    }}
                  />

                  <WidthSelectForTyre
                    defaultValue=""
                    register={methods.register}
                  />
                  <FXInput
                    label="Tread Depth"
                    name="treadDepth"
                    type="number"
                    rules={{
                      required: "Tread Depth is required",
                      valueAsNumber: true,
                      validate: (value: any) =>
                        typeof value === "number" && !isNaN(value)
                          ? true
                          : "Tread Depth must be a number",
                    }}
                  />

                  <FXInput
                    label="Load Index"
                    name="loadIndex"
                    type="number"
                    rules={{
                      required: "Load Index is required",
                      valueAsNumber: true,
                      validate: (value: any) =>
                        typeof value === "number" && !isNaN(value)
                          ? true
                          : "Load Index must be a number",
                    }}
                  />

                  <FXInput
                    label="Load Range"
                    name="loadRange"
                  />
                  <FXInput
                    label="Max PSI"
                    name="maxPSI"
                    type="number"
                    rules={{
                      required: "Max PSI is required",
                      valueAsNumber: true,
                      validate: (value: any) =>
                        typeof value === "number" && !isNaN(value)
                          ? true
                          : "Max PSI must be a number",
                    }}
                  />

                  <FXInput
                    label="Warranty"
                    name="warranty"
                  />
                  <FXInput
                    label="Load Capacity"
                    name="loadCapacity"
                    type="number"
                    rules={{
                      required: "Load Capacity is required",
                      valueAsNumber: true,
                      validate: (value: any) =>
                        typeof value === "number" && !isNaN(value)
                          ? true
                          : "Load Capacity must be a number",
                    }}
                  />
                </div>
              </div>

              {/* Range Values */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-default-900">
                  Range Values
                </h2>
                <Divider />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FXInput
                    label="Gross Weight Range"
                    name="grossWeightRange"
                  />
                  <FXInput
                    label="GTIN Range"
                    name="gtinRange"
                  />
                  <FXInput
                    label="Load Index Range"
                    name="loadIndexRange"
                  />
                  <FXInput
                    label="Mileage Warranty Range"
                    name="mileageWarrantyRange"
                  />
                  <FXInput
                    label="Max Air Pressure Range"
                    name="maxAirPressureRange"
                  />
                  <FXInput
                    label="Speed Rating Range"
                    name="speedRatingRange"
                  />
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
                  <FXInput
                    label="Wheel Rim Diameter Range"
                    name="wheelRimDiameterRange"
                  />
                  <FXInput
                    label="Traction Grade Range"
                    name="tractionGradeRange"
                  />
                  <FXInput
                    label="Tread Depth Range"
                    name="treadDepthRange"
                  />
                  <FXInput
                    label="Tread Width Range"
                    name="treadWidthRange"
                  />
                  <FXInput
                    label="Overall Width Range"
                    name="overallWidthRange"
                  />
                  <FXInput
                    label="Treadwear Grade Range"
                    name="treadwearGradeRange"
                  />
                  <FXInput
                    label="Aspect Ratio Range"
                    name="aspectRatioRange"
                  />
                </div>
              </div>

              {/* Pricing and Stock */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-default-900">
                  Pricing & Stock
                </h2>
                <Divider />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FXInput
                    label="Price"
                    name="price"
                    type="number"
                    defaultValue={0 as any}
                    rules={{
                      required: "Price is required",
                      valueAsNumber: true,
                      validate: (value: any) =>
                        typeof value === "number" && !isNaN(value)
                          ? true
                          : "Price must be a number",
                    }}
                  />

                  <FXInput
                    label="Discount Price"
                    name="discountPrice"
                    type="number"
                    defaultValue={0 as any}
                    rules={{
                      required: "Discount Price is required",
                      valueAsNumber: true,
                      validate: (value: any) =>
                        typeof value === "number" && !isNaN(value)
                          ? true
                          : "Discount Price must be a number",
                    }}
                  />

                  <FXInput
                    label="Stock Quantity"
                    name="stockQuantity"
                    type="number"
                    defaultValue={0 as any}
                    rules={{
                      required: "Stock Quantity is required",
                      valueAsNumber: true,
                      validate: (value: any) =>
                        typeof value === "number" && !isNaN(value)
                          ? true
                          : "Stock Quantity must be a number",
                    }}
                  />
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
                    className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-gray-300 bg-gray-50 text-gray-600 shadow-sm transition hover:border-gray-400 hover:bg-gray-100">
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
                            className="relative size-32 rounded-xl border-2 border-dashed border-gray-300 p-2">
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
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-10">
                <Button
                  type="submit"
                  className="w-full rounded bg-rose-600"
                  disabled={createTirePending}>
                  {createTirePending ? "Creating..." : "Create Tire"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

const MakeSelectForTyre = ({ defaultValue, register }: any) => {
  const { data: makes, isLoading, isError } = useGetMakes({}) as any;

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("make", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5">
        <option value="">Select Make</option>
        {isLoading && <option value="">Loading Makes...</option>}
        {isError && <option value="">Failed to load Makes</option>}
        {makes?.data?.length === 0 && <option value="">No Makes found</option>}
        {makes?.data?.map((m: any, index: number) => (
          <option
            key={index}
            value={m?._id}>
            {m?.make}
          </option>
        ))}
      </select>
    </div>
  );
};
const CategorySelectForTyre = ({ defaultValue, register }: any) => {
  const {
    data: category,
    isLoading,
    isError,
  } = useGetCategories(undefined) as any;
  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("category", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5">
        <option value="">Select Category</option>
        {isLoading && <option value="">Loading Categories...</option>}
        {isError && <option value="">Failed to load Categories</option>}
        {category?.data?.length === 0 && (
          <option value="">No Categories found</option>
        )}
        {category?.data?.map((m: any, index: number) => (
          <option
            key={index}
            value={m?._id}>
            {m?.name}
          </option>
        ))}
      </select>
    </div>
  );
};
const DrivingTypeSelectForTyre = ({ defaultValue, register }: any) => {
  const { data: drivingType, isLoading, isError } = useGetDrivingTypes() as any;
  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("drivingType", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5">
        <option value="">Select driving types</option>
        {isLoading && <option value="">Loading driving types...</option>}
        {isError && <option value="">Failed to load driving types</option>}
        {drivingType?.data?.length === 0 && (
          <option value="">No driving types found</option>
        )}
        {drivingType?.data?.map((m: any, index: number) => (
          <option
            key={index}
            value={m?._id}>
            {m?.title}
          </option>
        ))}
      </select>
    </div>
  );
};

const YearSelectForTyre = ({ defaultValue, register }: any) => {
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
        {year?.data?.map((y: any, index: number) => (
          <option
            key={index}
            value={y?._id}>
            {y?.year}
          </option>
        ))}
      </select>
    </div>
  );
};

const BrandSelectForTire = ({ defaultValue, register }: any) => {
  const { data: brand, isLoading, isError } = useGetBrands({}) as any;

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("brand", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5">
        <option value="">Select Brand</option>
        {isLoading && <option value="">Loading Brands...</option>}
        {isError && <option value="">Failed to load Brands</option>}
        {brand?.data?.length === 0 && <option value="">No Brands found</option>}
        {brand?.data?.map((m: any, index: number) => (
          <option
            key={index}
            value={m?._id}>
            {m?.name}
          </option>
        ))}
      </select>
    </div>
  );
};
const ModelSelectForTire = ({ defaultValue, register }: any) => {
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
        {model?.data?.map((m: any, index: number) => (
          <option
            key={index}
            value={m?._id}>
            {m?.model}
          </option>
        ))}
      </select>
    </div>
  );
};

const TyreSizeSelectForTire = ({ defaultValue, register }: any) => {
  const { data: tireSize, isLoading, isError } = useGetTyreSizes({}) as any;

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("tyreSize", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5">
        <option value="">Select Tyre Size</option>
        {isLoading && <option value="">Loading Tyre Sizes...</option>}
        {isError && <option value="">Failed to load Tyre Sizes</option>}
        {tireSize?.data?.length === 0 && (
          <option value="">No Tyre Sizes found</option>
        )}
        {tireSize?.data?.map((m: any, index: number) => (
          <option
            key={index}
            value={m?._id}>
            {m?.tireSize}
          </option>
        ))}
      </select>
    </div>
  );
};

const TrimSelectForTyre = ({ defaultValue, register }: any) => {
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
        {trim?.data?.map((m: any, index: number) => (
          <option
            key={index}
            value={m?._id}>
            {m?.trim}
          </option>
        ))}
      </select>
    </div>
  );
};

const VehicleSelectForTyre = ({ defaultValue, register }: any) => {
  const {
    data: vehicleType,
    isLoading,
    isError,
  } = useGetVehicleTypes({}) as any;

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("vehicleType", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5">
        <option value="">Select Vehicle Type</option>
        {isLoading && <option value="">Loading Types...</option>}
        {isError && <option value="">Failed to load Types</option>}
        {vehicleType?.data?.length === 0 && (
          <option value="">No Types found</option>
        )}
        {vehicleType?.data?.map((m: any, index: number) => (
          <option
            key={index}
            value={m?._id}>
            {m?.vehicleType}
          </option>
        ))}
      </select>
    </div>
  );
};
const WidthSelectForTyre = ({ defaultValue, register }: any) => {
  const { data: width, isLoading, isError } = useGetTireWidths({}) as any;

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("width", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5">
        <option value="">Select Width</option>
        {isLoading && <option value="">Loading Widths...</option>}
        {isError && <option value="">Failed to load Widths</option>}
        {width?.data?.length === 0 && <option value="">No Widths found</option>}
        {width?.data?.map((m: any, index: number) => (
          <option
            key={index}
            value={m?._id}>
            {m?.width}
          </option>
        ))}
      </select>
    </div>
  );
};
const RatioSelectForTyre = ({ defaultValue, register }: any) => {
  const { data: ratio, isLoading, isError } = useGetTireRatios({}) as any;

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("ratio", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5">
        <option value="">Select Aspect Ratio</option>
        {isLoading && <option value="">Loading Ratios...</option>}
        {isError && <option value="">Failed to load Ratios</option>}
        {ratio?.data?.length === 0 && <option value="">No Ratios found</option>}
        {ratio?.data?.map((m: any, index: number) => (
          <option
            key={index}
            value={m?._id}>
            {m?.ratio}
          </option>
        ))}
      </select>
    </div>
  );
};
const DiameterSelectForTyre = ({ defaultValue, register }: any) => {
  const { data: diameter, isLoading, isError } = useGetTireDiameters({}) as any;

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("diameter", { required: true })}
        defaultValue={defaultValue ? defaultValue?._id : ""}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5">
        <option value="">Select Rim Diameter</option>
        {isLoading && <option value="">Loading Diameters...</option>}
        {isError && <option value="">Failed to load Diameters</option>}
        {diameter?.data?.length === 0 && (
          <option value="">No Diameters found</option>
        )}
        {diameter?.data?.map((m: any, index: number) => (
          <option
            key={index}
            value={m?._id}>
            {m?.diameter}
          </option>
        ))}
      </select>
    </div>
  );
};
