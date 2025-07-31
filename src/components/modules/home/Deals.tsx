import React from "react";
import DealsCarousel from "../../UI/DealsCaurosel";

const dummyData = [
  {
    id: 1,
    discount: "5% Instant Savings",
    description:
      "On tires and wheels with any $599+ total purchase (after discounts)",
    expires: "05/01/2025",
    cta: "SEE DETAILS",
    image: "/deals.jpg",
  },
  {
    id: 2,
    discount: "Up to $80 Instant Savings on Michelin tires",
    description:
      "On tires and wheels with any $599+ total purchase (after discounts)",
    expires: "05/14/2025",
    cta: "SEE PRODUCTS",
    image: "/deals.jpg",
  },
  {
    id: 3,
    discount: "Up to $80 Instant Savings on Michelin tires",
    description:
      "On tires and wheels with any $599+ total purchase (after discounts)",
    expires: "05/14/2025",
    cta: "SEE PRODUCTS",
    image: "/deals.jpg",
  },
  // ... more items
];

const Deals = () => {
  return (
    <section className="">
      {/* Green Bar */}
      <div className="bg-green-700 text-white py-3 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
          <div className="flex flex-wrap items-center text-center sm:text-left justify-center sm:justify-start font-bold text-xs sm:text-sm">
            <span className="bg-green-900 text-white rounded-full px-3 py-1 text-[10px] sm:text-xs mr-2 mb-1 sm:mb-0">
              OUR LOW PRICE PROMISE
            </span>
            <span>
              Found it lower?{" "}
              <span className="ml-1 font-normal">You can price match</span>
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs sm:text-sm">
            <span className="font-bold">Online</span>
            <span>|</span>
            <span className="font-bold">In-Store</span>
          </div>
        </div>
      </div>

      {/* Services Bar */}
      <div className="bg-default-50 text-xs sm:text-sm py-3 px-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-b border-red-600 text-center">
        <span>
          Life of Tire{" "}
          <span className="text-blue-600 font-semibold">Services</span> Included
          with Every Tire Purchase:
        </span>
        <span className="text-red-600 font-bold">✔ FREE</span> Rotation
        <span className="text-red-600 font-bold">✔ FREE</span> Rebalancing
        <span className="text-red-600 font-bold">✔ FREE</span> Air Checks
        <span className="text-red-600 font-bold">✔ FREE</span> Flat Tire Repair
        <span className="text-red-600 font-bold">✔ FREE</span> Tire Inspection
      </div>

      {/* Deals Carousel (Client Component) */}
      <DealsCarousel data={dummyData} />
    </section>
  );
};

export default Deals;
