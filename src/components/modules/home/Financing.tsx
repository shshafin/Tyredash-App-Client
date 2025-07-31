import Image from "next/image";

const FinancingSection = () => {
  return (
    <section className="flex flex-col items-center px-4 py-12 ">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold  mb-8 text-center">
        Flexible Financing Options for You
      </h2>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section - Discount Tire Credit Card */}
        <div className="rounded-lg border border-red-500 p-5 shadow-md hover:shadow-lg transition-shadow duration-300 ">
          <div className="mb-3">
            <span className="bg-red-600 text-white  text-xs uppercase px-2 py-1 rounded-full inline-block">
              Limited Time Offer
            </span>
          </div>
          <h3 className="text-lg font-bold  mb-2">
            6, 9 or 12 Months Promotional Financing*
          </h3>
          <p className="text-sm  mb-4">
            On qualifying purchases with your Discount Tire credit card.
          </p>
          <a
            href="#"
            className="text-red-500 font-bold underline text-sm inline-block mb-5 hover:text-blue-700 transition"
          >
            Get Details and Apply
          </a>
          <div className="flex justify-center mb-5">
            <Image
              src="/credit.png"
              alt="Credit Card"
              width={120}
              height={80}
              className="object-contain"
            />
          </div>
          <button className="bg-gradient-to-r from-red-500 to-red-600 text-white  text-sm font-semibold py-2 px-5 rounded shadow hover:shadow-lg hover:bg-red-700 transition duration-200">
            SEE IF YOU PREQUALIFY
          </button>
        </div>

        {/* Right Section - Affirm */}
        <div className="rounded-lg border border-[#4D48F4] p-5 shadow-md hover:shadow-lg transition-shadow duration-300 ">
          <div className="mb-3">
            <span className="bg-[#4D48F4] text-white  text-xs uppercase px-2 py-1 rounded-full inline-block">
              Trusted by Millions
            </span>
          </div>
          <h3 className="text-lg font-bold  mb-2">
            Pay at your own pace with Affirm
          </h3>
          <p className="text-sm  mb-4">
            Select Affirm at checkout to pay over time—and never pay more than
            you agree to.
          </p>
          <a
            href="#"
            className="text-[#4D48F4] font-bold  underline text-sm inline-block mb-5 hover:text-blue-700 transition"
          >
            Learn More
          </a>
          <div className="flex justify-center">
            <Image
              src="/af.jpg"
              alt="Affirm Logo"
              width={250}
              height={250}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancingSection;
