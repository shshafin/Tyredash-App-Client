import { Metadata } from "next";
import AdminTyreSizePage from "./_components/AdminTyreSizePage";

export const metadata: Metadata = {
  title: "Tyre Size - Admin",
};

const page = () => {
  return (
    <div>
      <AdminTyreSizePage />
    </div>
  );
};

export default page;
