"use client";

import { Button } from "@heroui/button";
import FXInput from "@/src/components/form/FXInput";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Divider } from "@heroui/divider";
import { Select, SelectItem } from "@heroui/select";
import { useGetSingleDeal, useUpdateDeal } from "@/src/hooks/deals.hook";
import { useGetBrands } from "@/src/hooks/brand.hook";
import { useRouter, useParams } from "next/navigation";
import { DataEmpty, DataError, DataLoading } from "../../../_components/DataFetchingStates";
import { envConfig } from "@/src/config/envConfig";
import Image from "next/image";

export default function EditDealPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams();
  const dealId = params.id as string;

  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const { data: deal, isLoading, isError } = useGetSingleDeal(dealId);
  const { data: brands } = useGetBrands({});

  const { mutate: handleUpdateDeal, isPending: updateDealPending } = useUpdateDeal({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_DEALS"] });
      queryClient.invalidateQueries({ queryKey: ["GET_SINGLE_DEAL", dealId] });
      toast.success("Deal updated successfully");
      router.push("/admin/deals");
    },
    id: dealId,
  });

  // Reset form with deal data when loaded
  useEffect(() => {
    if (deal?.data) {
      reset({
        title: deal.data.title,
        description: deal.data.description,
        discountPercentage: deal.data.discountPercentage,
        brand: deal.data.brand._id,
        applicableProducts: deal.data.applicableProducts,
        validFrom: new Date(deal.data.validFrom).toISOString().split("T")[0],
        validTo: new Date(deal.data.validTo).toISOString().split("T")[0],
      });
    }
  }, [deal, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    // applicable products will be an array of strings
    const reformApplicableProducts = Array.isArray(data.applicableProducts)
      ? data.applicableProducts
      : data.applicableProducts.split(",").map((item: string) => item.trim());

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

    // Only append file if a new image is selected
    if (imageFiles.length > 0) {
      formData.append("file", imageFiles[0]);
    }

    handleUpdateDeal(formData);
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

  if (isLoading) return <DataLoading />;
  if (isError) return <DataError />;
  if (!deal?.data) return <DataEmpty />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Edit Deal: {deal.data.title}
        </h1>
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

              <Select
                label="Brand"
                isRequired
                defaultSelectedKeys={[deal.data.brand._id]}
                {...methods.register("brand", { required: "Brand is required" })}
              >
                {brands?.data?.map((brand: any) => <SelectItem key={brand._id}>{brand.name}</SelectItem>)}
              </Select>

              <Select
                label="Applicable Products"
                selectionMode="multiple"
                isRequired
                defaultSelectedKeys={deal.data.applicableProducts}
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

            {/* Current Image */}
            {deal.data.image && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Image:</label>
                <div className="flex gap-4">
                  <Image
                    src={`${envConfig.base_url}${deal.data.image}`}
                    alt={deal.data.title}
                    width={120}
                    height={120}
                    className="w-30 h-30 rounded-lg object-cover border-2 border-default-200"
                  />
                </div>
              </div>
            )}

            <div className="w-full">
              <label
                htmlFor="image"
                className="flex h-20 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-default-200 bg-default-50 text-default-500 shadow-sm transition hover:border-default-400 hover:bg-default-100"
              >
                <span className="text-md font-medium">Upload New Image (Optional)</span>
                <UploadCloud className="size-6" />
              </label>
              <input className="hidden" id="image" type="file" onChange={handleImageChange} accept="image/*" />
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
              <Button color="primary" type="submit" disabled={updateDealPending} className="px-8">
                {updateDealPending ? "Updating..." : "Update Deal"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
