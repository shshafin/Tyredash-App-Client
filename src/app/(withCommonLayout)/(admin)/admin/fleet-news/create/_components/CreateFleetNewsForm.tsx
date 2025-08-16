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
import { useCreateFleetNews } from "@/src/hooks/fleetNews";
import { fleetNewsValidationSchema, FleetNewsFormData } from "@/src/schemas/fleetNews.schema";

const statusOptions = [
  { key: "featured", label: "Featured" },
  { key: "recent", label: "Recent" },
];

export default function CreateFleetNewsForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: handleCreateFleetNews, isPending: createPending } = useCreateFleetNews({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_FLEET_NEWS"] });
      toast.success("Fleet news created successfully");
      router.push("/admin/fleet-news");
    },
  });

  const onSubmit: SubmitHandler<FleetNewsFormData> = (data: z.infer<typeof fleetNewsValidationSchema>) => {
    console.log(data);
    const formData = new FormData();

    formData.append("badge", data.badge);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("status", data.status || "recent");

    handleCreateFleetNews(formData);
  };

  const defaultValues = {
    badge: "",
    title: "",
    description: "",
    status: "recent",
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-default-900 mb-2">Create Fleet News</h1>
          <p className="text-default-600">Fill out the form below to create a new fleet news item.</p>
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
              <Button type="button" variant="bordered" onPress={() => router.back()} disabled={createPending}>
                Cancel
              </Button>

              <Button type="submit" color="primary" isLoading={createPending} disabled={createPending}>
                {createPending ? "Creating..." : "Create Fleet News"}
              </Button>
            </div>
          </div>
        </FXForm>
      </div>
    </div>
  );
}
