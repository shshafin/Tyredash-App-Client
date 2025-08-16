"use client";

import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import FXTextArea from "@/src/components/form/FXTextArea";
import FXSelect from "@/src/components/form/FXSelect";
import { useUpdateFleetNews } from "@/src/hooks/fleetNews";
import { fleetNewsValidationSchema, FleetNewsFormData } from "@/src/schemas/fleetNews.schema";

interface EditFleetNewsFormProps {
  fleetNewsData: {
    _id: string;
    badge: string;
    title: string;
    description: string;
    status: string;
  };
}

const statusOptions = [
  { key: "featured", label: "Featured" },
  { key: "recent", label: "Recent" },
];

export default function EditFleetNewsForm({ fleetNewsData }: EditFleetNewsFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: handleUpdateFleetNews, isPending: updatePending } = useUpdateFleetNews({
    id: fleetNewsData._id,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_FLEET_NEWS"] });
      toast.success("Fleet news updated successfully");
      router.push("/admin/fleet-news");
    },
  });

  const onSubmit: SubmitHandler<FleetNewsFormData> = (data: z.infer<typeof fleetNewsValidationSchema>) => {
    console.log(data);
    const formData = new FormData();
    // formData.append("badge", data.badge);
    // formData.append("title", data.title);
    // formData.append("description", data.description);
    // if (data.status) {
    //   formData.append("status", data.status);
    // }

    formData.append(
      "updatedData",
      JSON.stringify({
        badge: data.badge,
        title: data.title,
        description: data.description,
        status: data.status,
      })
    );
    handleUpdateFleetNews(formData);
  };

  const defaultValues = {
    badge: fleetNewsData.badge || "",
    title: fleetNewsData.title || "",
    description: fleetNewsData.description || "",
    status: fleetNewsData.status || "draft",
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-default-900 mb-2">Edit Fleet News</h1>
          <p className="text-default-600">Update the fleet news information below.</p>
        </div>

        <FXForm onSubmit={onSubmit} defaultValues={defaultValues} resolver={zodResolver(fleetNewsValidationSchema)}>
          <div className="space-y-6">
            {/* Basic Information Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-default-900">Basic Information</h2>
              <Divider />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FXInput label="Badge" name="badge" required />

                <FXSelect label="Status" name="status" options={statusOptions} />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <FXInput label="Title" name="title" required />

                <FXTextArea label="Description" name="description" />
              </div>
            </div>

            {/* Action Buttons */}
            <Divider />
            <div className="flex gap-4 justify-end pt-4">
              <Button type="button" variant="bordered" onPress={() => router.back()} disabled={updatePending}>
                Cancel
              </Button>

              <Button type="submit" color="primary" isLoading={updatePending} disabled={updatePending}>
                {updatePending ? "Updating..." : "Update Fleet News"}
              </Button>
            </div>
          </div>
        </FXForm>
      </div>
    </div>
  );
}
