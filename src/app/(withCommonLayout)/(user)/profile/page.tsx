import { Suspense } from "react";

import LatestSystemActivitiesSkeleton from "../../(admin)/admin/_components/LatestSystemActivitiesSkeleton";
import LatestSystemActivities from "../../(admin)/admin/_components/LatestSystemActivities";
import GlassCardsCollectionUser from "./_components/GlassCardCollection";

const Page = async () => {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
        TiresDash's User Panel
      </h1>

      <GlassCardsCollectionUser />

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Latest System Activities
        </h2>

        <Suspense fallback={<LatestSystemActivitiesSkeleton />}>
          <LatestSystemActivities />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
