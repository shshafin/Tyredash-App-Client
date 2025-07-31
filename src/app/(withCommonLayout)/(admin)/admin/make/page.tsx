import { Metadata } from "next";
import AdminMakePage from "./_components/AdminMakePage";
export const metadata: Metadata = {
  title: "Make - Admin",
};

const page = () => {
  return (
    <div>
      <AdminMakePage />
    </div>
  );
};

export default page;
