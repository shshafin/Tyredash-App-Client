"use client";

import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import FXInput from "@/src/components/form/FXInput";
import FXTextArea from "@/src/components/form/FXTextArea";
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
import { useCreateBlog } from "@/src/hooks/blog.hook";

export default function AdminTirePage() {
  const queryClient = useQueryClient();
  const { onClose } = useDisclosure();

  const methods = useForm();
  const { handleSubmit } = methods;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const { mutate: handleCreateBlog, isPending: createBlogPending } =
    useCreateBlog({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_BLOGS"] });
        toast.success("Blog created successfully");
        methods.reset();
        setImageFile(null);
        setImagePreview("");
        onClose();
      },
    });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!imageFile) {
      toast.error("Blog image is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("file", imageFile);

    handleCreateBlog(formData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-10">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-12">
            {/* General Info Section */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Blog Information
              </h2>
              <Divider className="border-gray-300 dark:border-gray-600" />

              <div className="w-full">
                <FXInput
                  label="Title"
                  name="title"
                />
              </div>

              <div className="w-full">
                <FXTextArea
                  label="Description"
                  name="description"
                />
              </div>

              <div className="w-full">
                <FXInput
                  label="Category"
                  name="category"
                />
              </div>
            </div>

            {/* Upload Image Section */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Upload Image
              </h2>
              <Divider className="border-gray-300 dark:border-gray-600" />

              <label
                htmlFor="image"
                className="flex h-16 w-full cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm transition hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600">
                <span className="text-lg font-medium">Upload Image</span>
                <UploadCloud className="size-6 text-gray-600 dark:text-gray-300" />
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              {imagePreview && (
                <div className="flex mt-4">
                  <div className="w-32 h-32 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-1">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="px-10 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-md transition disabled:opacity-50"
                disabled={createBlogPending}>
                {createBlogPending ? "Creating..." : "Create Blog"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
