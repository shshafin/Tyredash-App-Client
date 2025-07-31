import React from "react";
import Image from "next/image";
import Link from "next/link"; // Importing Link component

const categories = [
  {
    name: "Tires",
    image: "/t.webp",
    link: "/tire", // Add the route for the tires page
  },
  {
    name: "Wheels",
    image: "/w.webp",
    link: "/wheel", // Add the route for the wheels page
  },
  {
    name: "Deals",
    image: "/d.webp",
    link: "#", // Deals page or some other page
  },
];

const ShopCategory = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h3 className="text-[#FF141D] font-semibold uppercase">
            Explore by Category
          </h3>
          <h2 className="downtext-gradient text-3xl md:text-6xl font-bold tracking-tight mb-4">
            Find the Perfect Fit for Your Vehicle
          </h2>
          <p className="downtext-gradient max-w-2xl mx-auto text-base md:text-lg">
            Browse our curated selection of top-quality products tailored to
            your needs.
            <span className="font-bold">
              From tires to wheels, we’ve got your ride covered.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link href={category.link} key={index} passHref>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col items-center shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                <div className="w-40 h-40 mb-4 overflow-hidden rounded-full ">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={160}
                    height={160}
                    className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopCategory;
