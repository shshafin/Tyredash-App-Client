import { Button } from "@heroui/button";
import Link from "next/link";
import AdminFleetNewsTable from "./_components/AdminFleetNewsTable";
import FleetNewsManagement from "./_components/FleetNewsManagement";
import TableLoading from "./_components/TableLoading";
import { getAllFleetNews } from "@/src/services/News";
import { Suspense } from "react";

export default async function AllFleetNews() {
  const allFleetNews = await getAllFleetNews();
  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">Fleet News</h1>
        <div className="flex items-center gap-3">
          <Link href="/admin/fleet-news/create">
            <Button
              color="primary"
              className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              + Add Fleet News
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <Suspense fallback={<TableLoading />}>
          <FleetNewsManagement fleetNewsData={allFleetNews.data} />
        </Suspense>
      </div>
    </div>
  );
}
