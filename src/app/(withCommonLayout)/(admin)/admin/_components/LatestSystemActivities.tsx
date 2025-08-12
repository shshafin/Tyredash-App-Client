import { getTires } from "@/src/services/Tires";
import { getWheels } from "@/src/services/wheels";
import { DataEmpty, DataError } from "./DataFetchingStates";

export default async function LatestSystemActivities() {
  try {
    const [tires, wheels] = await Promise.all([getTires({}), getWheels({})]);

    const latestTires = tires?.data?.slice(-5).reverse() || []; // show last 5 tires
    const latestWheels = wheels?.data?.slice(-5).reverse() || []; // show last 5 wheels
    return (
      <>
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
                    className="p-4 border border-white/20 bg-white/10 backdrop-blur-md rounded-xl shadow-lg text-white">
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
      </>
    );
  } catch (error) {
    return <DataError />;
  }
}
