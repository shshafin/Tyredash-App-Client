import { Metadata } from "next";
import AdminDrivingTypePage from "./_components/AdminDrivingTypePage";
export const metadata: Metadata = {
  title: "Driving Type - Admin",
};

const page = () => {
  return (
    <div>
      <AdminDrivingTypePage />
    </div>
  );
};

export default page;
