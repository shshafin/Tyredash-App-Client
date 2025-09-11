"use client";
import { useUser } from "@/src/context/user.provider";
import DealLoginPage from "./deal-login-page";
import Image from "next/image";
import {
  useGetDiscountedTiresByBrand,
  useGetDiscountedWheelsByBrand,
  useGetSingleDeal,
} from "@/src/hooks/deals.hook";
import TireDealsSection from "./tire-deal-section";
import WheelDealsSection from "./wheel-deal-section";
const deal = {
  _id: 1,
  title: "5% Instant Savings",
  description:
    "On tires and wheels with any $599+ total purchase (after discounts)",
  discountPercentage: "5%",
  validTo: "05/01/2025",
  validFrom: "05/01/2025",
  image: "/deals.jpg",
  brand: {
    _id: 4,
    name: "Toyota",
  },
};
const SingleDealsPage = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, isError } = useGetSingleDeal(params.id);
  const { brand, discountPercentage, _id } = data?.data || {};
  const { user } = useUser();
  return (
    <div className="container mx-auto px-4 py-8">
      {user?.email ? (
        <div>
          <TireDealsSection
            brand={{ ...brand, discountPercentage, dealId: _id }}
          />
          <WheelDealsSection
            brand={{ ...brand, discountPercentage, dealId: _id }}
          />
        </div>
      ) : (
        <DealLoginPage dealData={data?.data} />
      )}
      <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3"></section>
    </div>
  );
};

export default SingleDealsPage;
