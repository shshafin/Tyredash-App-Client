import Image from "next/image";

const CTA = ({ setStep }: any) => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
      {/* Shop Products */}
      <div className="flex-1 border p-6 rounded-lg shadow-md bg-white">
        <div className="flex justify-center items-center gap-1 mb-2 py-1 bg-gray-50 rounded-md w-1/4 mx-auto border-x-1 border-red-500">
          <Image src="/shop.webp" alt="Shop Icon" width={25} height={25} />
          <h3 className="md:text-sm lg:text-xl text-black font-semibold">
            SHOP
          </h3>
        </div>
        <p className="text-gray-600 mb-4 text-sm sm:text-base">
          Shop the best products, then book your install at checkout.
        </p>
        <button
          onClick={() => setStep(2)}
          className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-semibold text-sm sm:text-base"
        >
          SHOP PRODUCTS
        </button>
      </div>
      {/* divider */}
      <div className="hidden md:flex items-center justify-center h-40 my-auto">
        <div className="flex flex-col items-center">
          {/* Top half of the divider */}
          <div className="w-[0.5px] h-16 bg-gray-300" />

          {/* "or" text with spacing */}
          <div className="text-gray-400 text-sm py-1">o&nbsp;r</div>

          {/* Bottom half of the divider */}
          <div className="w-[0.5px] h-16 bg-gray-300" />
        </div>
      </div>

      {/* Schedule Service */}
      <div className="flex-1 border p-6 rounded-lg shadow-md bg-white">
        <div className="flex justify-center py-1 items-center gap-1 mb-2 bg-gray-50 rounded-md w-1/3 mx-auto border-x-1 border-red-500">
          <Image src="/service.png" alt="Service Icon" width={25} height={25} />
          <h3 className="md:text-sm lg:text-xl text-black font-semibold">
            SERVICE
          </h3>
        </div>
        <p className="text-gray-600 mb-4 text-sm sm:text-base">
          Schedule an in-store visit for consultation, repair, inspection and
          more.
        </p>
        <button
          onClick={() => setStep(2)}
          className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-semibold text-sm sm:text-base"
        >
          SCHEDULE SERVICE
        </button>
      </div>
    </div>
  );
};

export default CTA;
