import { Metadata } from "next";
import TireProductPage from "./_components/tire-product-page";
export const metadata: Metadata = {
  title: "Tires",
};

const page = () => {
  return <TireProductPage />;
};

export default page;
