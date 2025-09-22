import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { deleteCookies } from "./DeleteCookies";

export const logoutUser = async (router: AppRouterInstance) => {
  localStorage.removeItem("accessToken");
  await deleteCookies(["accessToken", "refreshToken"]);
  router.push("/login");
  router.refresh();
};
