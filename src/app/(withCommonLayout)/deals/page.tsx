import { Metadata } from "next";
import AllDealsPage from "./_components/all-deals-page";

export const metadata: Metadata = {
  title: "Deals",
};

const page = () => {
  return <AllDealsPage />;
};

export default page;