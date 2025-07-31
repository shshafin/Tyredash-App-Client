import { Metadata } from "next";
import CheckoutPage from "./_components/checkout-page";

export const metadata: Metadata = {
  title: "Checkout",
};

const page = () => {
  return <CheckoutPage />;
};

export default page;
