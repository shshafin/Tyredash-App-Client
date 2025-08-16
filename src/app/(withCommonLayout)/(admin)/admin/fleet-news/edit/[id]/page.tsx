import { getFleetNewsById } from "@/src/services/News";
import EditFleetNewsForm from "./_components/EditFleetNewsForm";
import { Suspense } from "react";
import EditFleetNewsFormLoading from "./_components/EditFleetNewsFormLoading";

interface EditFleetNewsPageProps {
  params: Promise<{
    id: string; // Matches the dynamic segment name
  }>;
}

export default async function EditFleetNewsPage({ params }: EditFleetNewsPageProps) {
  try {
    const { id } = await params;
    const fleetNewsData = await getFleetNewsById(id);

    if (!fleetNewsData?.data) {
      return (
        <div className="p-6">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-red-600 mb-2">Fleet News Not Found</h1>
            <p className="text-gray-600 mb-4">The requested fleet news item could not be found.</p>
            <a href="/admin/fleet-news" className="text-blue-600 hover:text-blue-800 underline">
              ← Back to Fleet News
            </a>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Suspense fallback={<EditFleetNewsFormLoading />}>
          <EditFleetNewsForm fleetNewsData={fleetNewsData.data} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Error fetching fleet news:", error);

    return (
      <div className="p-6">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-2xl font-semibold text-red-600 mb-2">Error Loading Fleet News</h1>
          <p className="text-gray-600 mb-4">There was an error loading the fleet news. Please try again.</p>
          <a href="/admin/fleet-news" className="text-blue-600 hover:text-blue-800 underline">
            ← Back to Fleet News
          </a>
        </div>
      </div>
    );
  }
}
