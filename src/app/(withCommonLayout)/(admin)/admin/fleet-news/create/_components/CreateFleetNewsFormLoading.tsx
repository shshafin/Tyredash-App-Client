import { Skeleton } from "@heroui/skeleton";
import { Divider } from "@heroui/divider";

const CreateFleetNewsFormLoading = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Skeleton className="h-8 w-48 rounded mb-2" />
          <Skeleton className="h-5 w-80 rounded" />
        </div>

        <div className="space-y-6">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <Skeleton className="h-7 w-40 rounded" />
            <Divider />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16 rounded" />
                <Skeleton className="h-14 w-full rounded" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-16 rounded" />
                <Skeleton className="h-14 w-full rounded" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16 rounded" />
                <Skeleton className="h-14 w-full rounded" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-32 w-full rounded" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <Divider />
          <div className="flex gap-4 justify-end pt-4">
            <Skeleton className="h-10 w-20 rounded" />
            <Skeleton className="h-10 w-40 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFleetNewsFormLoading;
