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
  Layers3,
  Scissors,
  Signature,
  Users,
} from "lucide-react";
import { Suspense } from "react";
import { DataError } from "./DataFetchingStates";
import GlassCard from "./GlassCard";
import GlassCardSkeleton from "./GlassCardsCollectionSkeleton";

export default async function GlassCardsCollection() {
  try {
    const getCategoriesPromise = getCategories(undefined);
    const getMakesPromise = getMakes({});
    const getDrivingTypesPromise = getDrivingTypes();
    const getYearsPromise = getYears({});
    const getTrimsPromise = getTrims({});
    const getUsersPromise = getUsers();
    const getBrandsPromise = getBrands({});
    const getModelsPromise = getModels({});

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <Suspense fallback={<GlassCardSkeleton />}>
          <GlassCard
            dataFetchingPromise={getUsersPromise}
            title="Registered Users"
            icon={<Users className="w-6 h-6 text-white" />}
            color="from-indigo-500 to-purple-600"
          />
        </Suspense>
        <Suspense fallback={<GlassCardSkeleton />}>
          <GlassCard
            title="Categories Available"
            dataFetchingPromise={getCategoriesPromise}
            icon={<Layers3 className="w-6 h-6 text-white" />}
            color="from-green-500 to-teal-600"
          />
        </Suspense>
        <Suspense fallback={<GlassCardSkeleton />}>
          <GlassCard
            title="Car Brands (Makes)"
            dataFetchingPromise={getMakesPromise}
            icon={<Car className="w-6 h-6 text-white" />}
            color="from-orange-500 to-pink-600"
          />
        </Suspense>
        <Suspense fallback={<GlassCardSkeleton />}>
          <GlassCard
            title="Drive Types Available"
            dataFetchingPromise={getDrivingTypesPromise}
            icon={<BarChart3 className="w-6 h-6 text-white" />}
            color="from-blue-500 to-cyan-600"
          />
        </Suspense>
        <Suspense fallback={<GlassCardSkeleton />}>
          {" "}
          <GlassCard
            title="Model Years Supported"
            dataFetchingPromise={getYearsPromise}
            icon={<Calendar className="w-6 h-6 text-white" />}
            color="from-fuchsia-500 to-rose-500"
          />
        </Suspense>
        <Suspense fallback={<GlassCardSkeleton />}>
          <GlassCard
            title="Trims Available"
            dataFetchingPromise={getTrimsPromise}
            icon={<Scissors className="w-6 h-6 text-white" />}
            color="from-teal-500 to-teal-900"
          />
        </Suspense>{" "}
        <Suspense fallback={<GlassCardSkeleton />}>
          {" "}
          <GlassCard
            title="Models Available"
            dataFetchingPromise={getModelsPromise}
            icon={<Boxes className="w-6 h-6 text-white" />}
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
