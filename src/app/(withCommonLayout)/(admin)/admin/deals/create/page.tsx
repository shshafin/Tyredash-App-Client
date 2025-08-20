"use client";

import { Button } from "@heroui/button";
import FXInput from "@/src/components/form/FXInput";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Divider } from "@heroui/divider";
import { Select, SelectItem } from "@heroui/select";
import { useCreateDeal } from "@/src/hooks/deals.hook";
import { useGetBrands } from "@/src/hooks/brand.hook";
import { useRouter } from "next/navigation";

export default function CreateDealPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const methods = useForm();
  const { handleSubmit } = methods;

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const { mutate: handleCreateDeal, isPending: createDealPending } = useCreateDeal({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_DEALS"] });
      toast.success("Deal created successfully");
      router.push("/admin/deals");
    },
  });

  const { data: brands } = useGetBrands({});

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Validate that an image is selected
    if (imageFiles.length === 0) {
      toast.error("Please select an image for the deal");
      return;
    }

    const formData = new FormData();

    // applicable products will be an array of strings
    const reformApplicableProducts = data.applicableProducts.split(",").map((item: string) => item.trim());

    formData.append(
      "data",
      JSON.stringify({
        title: data.title,
        description: data.description,
        discountPercentage: data.discountPercentage,
        brand: data.brand,
        validFrom: data.validFrom,
        validTo: data.validTo,
        applicableProducts: reformApplicableProducts,
      })
    );

    // Always append the file since we validate it exists above
    formData.append("file", imageFiles[0]);

    console.log(imageFiles);

    handleCreateDeal(formData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImageFiles = Array.from(files);
    setImageFiles(newImageFiles);

    setImagePreviews([]);
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
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">Create New Deal</h1>
        <Button color="default" variant="bordered" onPress={() => router.back()}>
          ← Back
        </Button>
      </div>

      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FXInput label="Deal Title" name="title" required />
              <FXInput label="Description" name="description" required />
              <FXInput label="Discount Percentage" name="discountPercentage" type="number" required />

              <Select label="Brand" isRequired {...methods.register("brand", { required: "Brand is required" })}>
                {brands?.data?.map((brand: any) => <SelectItem key={brand._id}>{brand.name}</SelectItem>)}
              </Select>

              <Select
                label="Applicable Products"
                selectionMode="multiple"
                isRequired
                {...methods.register("applicableProducts", { required: "At least one product type is required" })}
              >
                <SelectItem key="tire">Tires</SelectItem>
                <SelectItem key="wheel">Wheels</SelectItem>
                <SelectItem key="product">Products</SelectItem>
              </Select>

              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <FXInput label="Valid From" name="validFrom" type="date" required />
                <FXInput label="Valid To" name="validTo" type="date" required />
              </div>
            </div>

            <div className="w-full">
              <label
                htmlFor="image"
                className="flex h-20 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-default-200 bg-default-50 text-default-500 shadow-sm transition hover:border-default-400 hover:bg-default-100"
              >
                <span className="text-md font-medium">Upload Deal Image *</span>
                <UploadCloud className="size-6" />
              </label>
              <input className="hidden" id="image" type="file" onChange={handleImageChange} accept="image/*" required />
            </div>

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

            <div className="flex gap-4 justify-end">
              <Button color="default" variant="bordered" onPress={() => router.back()}>
                Cancel
              </Button>
              <Button color="primary" type="submit" disabled={createDealPending} className="px-8">
                {createDealPending ? "Creating..." : "Create Deal"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
