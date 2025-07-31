import {
  BarChart3,
  Users,
  Layers3,
  Car,
  Calendar,
  Scissors,
  Signature,
  Boxes,
} from "lucide-react";
import { DataEmpty, DataError } from "./_components/DataFetchingStates";
import { getCategories } from "@/src/services/Categories";
import { getMakes } from "@/src/services/Makes";
import { getDrivingTypes } from "@/src/services/DrivingTypes";
import { getYears } from "@/src/services/Years";
import { getTrims } from "@/src/services/Trims";
import { getUsers } from "@/src/services/Users";
import { getBrands } from "@/src/services/brands";
import { getModels } from "@/src/services/Models";
import { getTires } from "@/src/services/Tires";
import { getWheels } from "@/src/services/wheels";
import GlassCard from "./_components/GlassCard";

const Page = async () => {
  try {
    const [
      categories,
      makes,
      drivingTypes,
      years,
      trims,
      users,
      brands,
      models,
      tires,
      wheels,
    ] = await Promise.all([
      getCategories(),
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
    // console.log(users);

    const latestTires = tires?.data?.slice(-5).reverse() || []; // show last 5 tires
    const latestWheels = wheels?.data?.slice(-5).reverse() || []; // show last 5 wheels

    return (
      <div className="w-full">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
          Tiresdash Management Dashboard
        </h1>

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

        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            Latest System Activities
          </h2>

          {latestTires.length === 0 && latestWheels.length === 0 ? (
            <DataEmpty />
          ) : (
            <div className="grid grid-cols-1  lg:grid-cols-3 gap-6">
              {/* Newest Products Section */}
              <div className="space-y-4">
                {latestTires
                  .concat(latestWheels)
                  .slice(0, 6)
                  .map((item: any, index: number) => (
                    <div
                      key={`product-${index}`}
                      className="p-4 border border-white/20 bg-white/10 backdrop-blur-md rounded-xl shadow-lg text-white"
                    >
                      <div className="flex items-start justify-between  shadow-sm ">
                        {/* Left section */}
                        <div className="flex flex-col space-y-1 text-left">
                          <h3 className="text-base font-semibold text-default-900">
                            {item?.name || "Unnamed Product"}
                          </h3>
                          <p className="text-sm text-default-600">
                            {item?.brand?.name || "N/A"}
                          </p>
                        </div>

                        {/* Right section */}
                        <div className="flex flex-col items-end space-y-1 text-right">
                          <p className="text-sm text-default-900">
                            {item?.category?.name || "N/A"}
                          </p>
                          <p className="text-sm font-medium text-rose-700">
                            ${item?.price || "0.00"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Financial Reports Section */}
              <div className="flex items-center justify-center border border-dashed border-gray-400 dark:border-gray-600 rounded-xl p-6 text-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                <span className="text-lg font-semibold">Financial Reports</span>
              </div>

              {/* Sales Section */}
              <div className="flex items-center justify-center border border-dashed border-gray-400 dark:border-gray-600 rounded-xl p-6 text-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                <span className="text-lg font-semibold">Sales</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    return <DataError />;
  }
};

export default Page;
