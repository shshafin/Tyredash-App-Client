import ChangePasswordPage from "@/src/app/(withCommonLayout)/(user)/profile/_components/change-password-page";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Change Password",
};

const page = () => {
  return <ChangePasswordPage />;
};

export default page;
