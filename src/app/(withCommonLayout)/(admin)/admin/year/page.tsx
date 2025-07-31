import { Metadata } from "next";
import AdminYearPage from "./_components/AdminYearPage";

export const metadata: Metadata = {
  title: "Year - Admin",
};

const page = () => {
  return (
    <div>
      <AdminYearPage />
    </div>
  );
};

export default page;
