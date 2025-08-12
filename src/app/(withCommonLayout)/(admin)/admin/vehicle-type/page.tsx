import { Metadata } from "next";
import AdminVehiclePage from "./_components/AdminVehiclePage";
export const metadata: Metadata = {
  title: "Vehicle Type - Admin",
};

const page = () => {
  return (
    <div>
      <AdminVehiclePage />
    </div>
  );
};

export default page;
