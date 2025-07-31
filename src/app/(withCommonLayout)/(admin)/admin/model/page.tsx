import { Metadata } from "next";
import AdminModelPage from "./_components/AdminModelPage";

export const metadata: Metadata = {
  title: "Model - Admin",
};

const page = () => {
  return (
    <div>
      <AdminModelPage />
    </div>
  );
};

export default page;
