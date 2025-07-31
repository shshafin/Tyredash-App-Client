import { Metadata } from "next";
import AdminTrimPage from "./_components/AdminTrimPage";

export const metadata: Metadata = {
  title: "Trim - Admin",
};

const page = () => {
  return (
    <div>
      <AdminTrimPage />
    </div>
  );
};

export default page;
