import { Metadata } from "next";
import ChangePasswordPage from "../_components/change-password-page";
export const metadata: Metadata = {
  title: "Change Password",
};

const page = () => {
  return <ChangePasswordPage />;
};

export default page;
