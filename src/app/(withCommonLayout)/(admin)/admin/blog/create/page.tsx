"use client";

import { Button } from "@heroui/button";
import FXInput from "@/src/components/form/FXInput";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Divider } from "@heroui/divider";
import { useCreateBlog } from "@/src/hooks/blog.hook";
import { useRouter } from "next/navigation";
import { Textarea } from "@heroui/input";

export default function CreateBlogPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const methods = useForm();
  const { handleSubmit, register } = methods;

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const { mutate: handleCreateBlog, isPending: createBlogPending } = useCreateBlog({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_BLOGS"] });
      toast.success("Blog created successfully");
      router.push("/admin/blog");
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Validate that an image is selected
    if (imageFiles.length === 0) {
      toast.error("Please select an image for the blog");
      return;
    }

    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        title: data.title,
        description: data.description,
        category: data.category,
      })
    );

    // Always append the file since we validate it exists above
    formData.append("file", imageFiles[0]);

    console.log(imageFiles);

    handleCreateBlog(formData);
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
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">Create New Blog</h1>
        <Button color="default" variant="bordered" onPress={() => router.back()}>
          ← Back
        </Button>
      </div>

      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FXInput label="Blog Title" name="title" required />
              <FXInput label="Category" name="category" required />
            </div>

            <div className="w-full">
              <Textarea
                label="Blog Description"
                placeholder="Enter blog description..."
                minRows={4}
                {...register("description", { required: "Description is required" })}
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="image"
                className="flex h-20 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-default-200 bg-default-50 text-default-500 shadow-sm transition hover:border-default-400 hover:bg-default-100"
              >
                <span className="text-md font-medium">Upload Blog Image *</span>
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
              <Button color="primary" type="submit" disabled={createBlogPending} className="px-8">
                {createBlogPending ? "Creating..." : "Create Blog"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
