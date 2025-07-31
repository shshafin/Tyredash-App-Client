import { Metadata } from "next";
import CartPage from "./_components/cart-page";

export const metadata: Metadata = {
  title: "Cart",
};

const page = () => {
  return <CartPage />;
};

export default page;
