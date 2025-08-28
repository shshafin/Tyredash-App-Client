import { getBrands } from "@/src/services/brands";
import { getCategories } from "@/src/services/Categories";
import { getDrivingTypes } from "@/src/services/DrivingTypes";
import { getMakes } from "@/src/services/Makes";
import { getModels } from "@/src/services/Models";
import { getTrims } from "@/src/services/Trims";
import { getUsers } from "@/src/services/Users";
import { getYears } from "@/src/services/Years";
import {
  BarChart3,
  Boxes,
  Calendar,
  Car,
  HeartHandshake,
  Layers3,
  LoaderPinwheel,
  Scissors,
  Signature,
  Users,
} from "lucide-react";
import { Suspense } from "react";
import GlassCardSkeleton from "../../../(admin)/admin/_components/GlassCardsCollectionSkeleton";
import GlassCard from "../../../(admin)/admin/_components/GlassCard";
import { DataError } from "../../../(admin)/admin/_components/DataFetchingStates";
import { getTires } from "@/src/services/Tires";
import { getWheels } from "@/src/services/wheels";
import { getAllDeals } from "@/src/services/Deals";

export default async function GlassCardsCollectionUser() {
  try {
    const getTiresPromise = getTires({});
    const getDealsPromise = getAllDeals();
    const getWheelsPromise = getWheels(undefined);
    const getBrandsPromise = getBrands({});

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <Suspense fallback={<GlassCardSkeleton />}>
          <GlassCard
            title="Tires Available"
            dataFetchingPromise={getTiresPromise}
            icon={<Car className="w-6 h-6 text-white" />}
            color="from-indigo-500 to-purple-600"
          />
        </Suspense>
        <Suspense fallback={<GlassCardSkeleton />}>
          <GlassCard
            title="Wheels Available"
            dataFetchingPromise={getWheelsPromise}
            icon={<LoaderPinwheel className="w-6 h-6 text-white" />}
            color="from-blue-500 to-cyan-600"
          />
        </Suspense>
        <Suspense fallback={<GlassCardSkeleton />}>
          <GlassCard
            title="Deals Available"
            dataFetchingPromise={getDealsPromise}
            icon={<HeartHandshake className="w-6 h-6 text-white" />}
            color="from-rose-600 to-rose-900"
          />
        </Suspense>
        <Suspense fallback={<GlassCardSkeleton />}>
          {" "}
          <GlassCard
            title="Tire Brands"
            dataFetchingPromise={getBrandsPromise}
            icon={<Signature className="w-6 h-6 text-white" />}
            color="from-blue-600 to-blue-900"
          />
        </Suspense>{" "}
      </div>
    );
  } catch (error) {
    return <DataError />;
  }
}
