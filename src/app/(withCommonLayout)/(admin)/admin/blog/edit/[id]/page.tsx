"use client";

import { Button } from "@heroui/button";
import FXInput from "@/src/components/form/FXInput";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Divider } from "@heroui/divider";
import { useGetSingleBlog, useUpdateBlog } from "@/src/hooks/blog.hook";
import { useRouter, useParams } from "next/navigation";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../../../_components/DataFetchingStates";
import { envConfig } from "@/src/config/envConfig";
import Image from "next/image";
import { Textarea } from "@heroui/input";

export default function EditBlogPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams();
  const blogId = params.id as string;

  const methods = useForm();
  const { handleSubmit, reset, register } = methods;

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const { data: blog, isLoading, isError } = useGetSingleBlog(blogId);

  const { mutate: handleUpdateBlog, isPending: updateBlogPending } =
    useUpdateBlog({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_BLOGS"] });
        queryClient.invalidateQueries({
          queryKey: ["GET_SINGLE_BLOG", blogId],
        });
        toast.success("Blog updated successfully");
        router.push("/admin/blog");
      },
      id: blogId,
    });

  // Reset form with blog data when loaded
  useEffect(() => {
    if (blog?.data) {
      reset({
        title: blog.data.title,
        description: blog.data.description,
        category: blog.data.category,
      });
    }
  }, [blog, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);

    if (imageFiles.length > 0) {
      formData.append("file", imageFiles[0]);
    }

    handleUpdateBlog(formData);
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
  if (!blog?.data) return <DataEmpty />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Edit Blog
        </h1>
        <Button
          color="default"
          variant="bordered"
          onPress={() => router.back()}>
          ← Back
        </Button>
      </div>

      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FXInput
                label="Blog Title"
                name="title"
                required
              />
              <FXInput
                label="Category"
                name="category"
                required
              />
            </div>

            <div className="w-full">
              <Textarea
                label="Blog Description"
                placeholder="Enter blog description..."
                minRows={4}
                {...register("description", {
                  required: "Description is required",
                })}
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="image"
                className="flex h-20 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-default-200 bg-default-50 text-default-500 shadow-sm transition hover:border-default-400 hover:bg-default-100">
                <span className="text-md font-medium">
                  Upload New Blog Image (Optional)
                </span>
                <UploadCloud className="size-6" />
              </label>
              <input
                className="hidden"
                id="image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>

            {/* Show current image if no new image is selected */}
            {imagePreviews.length === 0 && blog.data.image && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Current Image:
                </p>
                <div className="flex gap-5 my-5 flex-wrap">
                  <div className="relative size-32 rounded-xl border-2 border-dashed border-default-300 p-2">
                    <Image
                      src={`${envConfig.base_url}${blog.data.image}`}
                      alt="Current blog image"
                      width={120}
                      height={120}
                      className="h-full w-full object-cover rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Show new image previews */}
            {imagePreviews.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  New Image Preview:
                </p>
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
              </div>
            )}

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
                type="submit"
                disabled={updateBlogPending}
                className="px-8">
                {updateBlogPending ? "Updating..." : "Update Blog"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
