import { Suspense } from "react";
import GlassCardsCollection from "./_components/GlassCardsCollection";
import GlassCardsCollectionSkeleton from "./_components/GlassCardsCollectionSkeleton";
import LatestSystemActivities from "./_components/LatestSystemActivities";
import LatestSystemActivitiesSkeleton from "./_components/LatestSystemActivitiesSkeleton";

const Page = async () => {
  // console.log(users);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">Tiresdash Management Dashboard</h1>

      <GlassCardsCollection />

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Latest System Activities</h2>

        <Suspense fallback={<LatestSystemActivitiesSkeleton />}>
          <LatestSystemActivities />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
