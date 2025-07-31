import { Metadata } from "next";
import WishlistPage from "./_components/wishlist-page";

export const metadata: Metadata = {
  title: "Wishlist",
};

const page = () => {
  return <WishlistPage />;
};

export default page;
