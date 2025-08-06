import { getBrands } from "@/src/services/brands";
import { getCategories } from "@/src/services/Categories";
import { getDrivingTypes } from "@/src/services/DrivingTypes";
import { getMakes } from "@/src/services/Makes";
import { getModels } from "@/src/services/Models";
import { getTires } from "@/src/services/Tires";
import { getTrims } from "@/src/services/Trims";
import { getUsers } from "@/src/services/Users";
import { getWheels } from "@/src/services/wheels";
import { getYears } from "@/src/services/Years";
import { BarChart3, Boxes, Calendar, Car, Layers3, Scissors, Signature, Users } from "lucide-react";
import { DataError } from "./DataFetchingStates";
import GlassCard from "./GlassCard";

export default async function GlassCardsCollection() {
  try {
    const [categories, makes, drivingTypes, years, trims, users, brands, models] = await Promise.all([
      getCategories(undefined),
      getMakes({}),
      getDrivingTypes(),
      getYears({}),
      getTrims({}),
      getUsers(),
      getBrands({}),
      getModels({}),
      getTires({}),
      getWheels({}),
    ]);
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* your GlassCard components here... */}
        <GlassCard
          title="Registered Users"
          value={`${users?.data?.length || 0}`}
          icon={<Users className="w-6 h-6 text-white" />}
          color="from-indigo-500 to-purple-600"
        />
        <GlassCard
          title="Categories Available"
          value={`${categories?.data?.length || 0}`}
          icon={<Layers3 className="w-6 h-6 text-white" />}
          color="from-green-500 to-teal-600"
        />
        <GlassCard
          title="Car Brands (Makes)"
          value={`${makes?.data?.length || 0}`}
          icon={<Car className="w-6 h-6 text-white" />}
          color="from-orange-500 to-pink-600"
        />
        <GlassCard
          title="Drive Types Available"
          value={`${drivingTypes?.data?.length || 0}`}
          icon={<BarChart3 className="w-6 h-6 text-white" />}
          color="from-blue-500 to-cyan-600"
        />
        <GlassCard
          title="Model Years Supported"
          value={`${years?.data?.length || 0}`}
          icon={<Calendar className="w-6 h-6 text-white" />}
          color="from-fuchsia-500 to-rose-500"
        />
        <GlassCard
          title="Trims Available"
          value={`${trims?.data?.length || 0}`}
          icon={<Scissors className="w-6 h-6 text-white" />}
          color="from-teal-500 to-teal-900"
        />
        <GlassCard
          title="Models Available"
          value={`${models?.data?.length || 0}`}
          icon={<Boxes className="w-6 h-6 text-white" />}
          color="from-rose-600 to-rose-900"
        />
        <GlassCard
          title="Tire Brands"
          value={`${brands?.data?.length || 0}`}
          icon={<Signature className="w-6 h-6 text-white" />}
          color="from-blue-600 to-blue-900"
        />
      </div>
    );
  } catch (error) {
    return <DataError />;
  }
}
