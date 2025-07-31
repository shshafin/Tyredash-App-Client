import { Metadata } from "next";
import AdminCategoryPage from "./_components/AdminCategoryPage";

export const metadata: Metadata = {
  title: "Category - Admin",
};

const page = () => {
  return (
    <div>
      <AdminCategoryPage />
    </div>
  );
};

export default page;
