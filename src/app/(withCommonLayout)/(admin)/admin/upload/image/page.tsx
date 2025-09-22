"use client";

import { Button } from "@heroui/button";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Divider } from "@heroui/divider";
import { useUploadImages } from "@/src/hooks/upload.hook";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function UploadImagePage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { mutate: handleUploadImage, isPending: uploadImagePending } =
    useUploadImages({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["UPLOAD_IMAGES"] });
        toast.success("Images uploaded successfully");
        router.push("/admin");
      },
    });

  const onSubmit = async () => {
    if (imageFiles.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append("images", file); // backend expects "images"
    });

    handleUploadImage(formData);
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
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Bulk Image Upload
        </h1>
        <Button
          color="default"
          variant="bordered"
          onPress={() => router.back()}>
          ← Back
        </Button>
      </div>

      <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
        <div className="w-full">
          <label
            htmlFor="image"
            className="flex h-20 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-default-200 bg-default-50 text-default-500 shadow-sm transition hover:border-default-400 hover:bg-default-100">
            <span className="text-md font-medium">Upload Images *</span>
            <UploadCloud className="size-6" />
          </label>
          <input
            className="hidden"
            id="image"
            type="file"
            multiple
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>

        {/* {imagePreviews.length > 0 && (
          <div className="flex gap-5 my-5 flex-wrap">
            {imagePreviews.map((imageDataUrl: string, index: number) => (
              <div
                key={index}
                className="relative size-32 rounded-xl border-2 border-dashed border-default-300 p-2">
                <img
                  alt={`Preview ${index}`}
                  className="h-full w-full object-cover rounded-md"
                  src={imageDataUrl}
                />
              </div>
            ))}
          </div>
        )} */}

        <Divider className="my-6" />

        <div className="flex gap-4 justify-end">
          <Button
            color="default"
            variant="bordered"
            onPress={() => router.back()}>
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={onSubmit}
            disabled={uploadImagePending}
            className="px-8">
            {uploadImagePending ? "Uploading..." : "Upload Images"}
          </Button>
        </div>
      </div>
    </div>
  );
}
