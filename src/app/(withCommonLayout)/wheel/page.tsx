import { Metadata } from "next";
import WheelProductPage from "./_components/wheel-product-page";

export const metadata: Metadata = {
  title: "Wheels",
};

const page = () => {
  return <WheelProductPage />;
};

export default page;
