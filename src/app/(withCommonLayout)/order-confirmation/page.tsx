import { Metadata } from "next";
import OrderConfirmation from "./_components/OrderConfirmationPage";

export const metadata: Metadata = {
  title: "Order Confirmation",
};

const page = () => {
  return <div><OrderConfirmation /></div>;
};

export default page;
