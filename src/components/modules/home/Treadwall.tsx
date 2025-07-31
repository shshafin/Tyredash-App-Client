import Image from "next/image";
import { BarChart3, Star, Calendar, Clock } from "lucide-react";

const TreadWellSection = () => {
  return (
    <section className="py-16 px-6 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-24">
        {/* Left: Logo & Tire Image */}
        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Treadwell"
            width={180}
            height={60}
            className="mb-6"
          />
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Image src="/tread.webp" alt="Tires" width={350} height={350} />
          </div>
        </div>

        {/* Right: Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold  mb-4">
            Need help finding tires?
          </h2>
          <p className="text-lg  mb-6">
            Get started with Treadwell, your personalized tire guide. Experience
            the convenience and reliability of buying tires online while
            receiving expert recommendations tailored to your needs.
          </p>

          {/* Features */}
          <ul className="space-y-6 mb-6">
            <li className="flex items-start gap-4 ">
              <BarChart3 className="text-red-600 w-6 h-6" />
              <span className="text-lg">
                Data-backed transparency on each tire's true real-world
                performance
              </span>
            </li>
            <li className="flex items-start gap-4 ">
              <Star className="text-red-600 w-6 h-6" />
              <span className="text-lg">
                Personalized recommendations based on how and where you drive
              </span>
            </li>
            <li className="flex items-start gap-4 ">
              <Calendar className="text-red-600 w-6 h-6" />
              <span className="text-lg">
                Includes tire life and cost stats for confident tire buying
              </span>
            </li>
            <li className="flex items-start gap-4 ">
              <Clock className="text-red-600 w-6 h-6" />
              <span className="text-lg">
                Save time in-store when you buy and book online first!
              </span>
            </li>
          </ul>

          {/* CTA Button */}
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg shadow-md transform transition-all hover:scale-105">
            GET STARTED WITH TREADWELL
          </button>
        </div>
      </div>
    </section>
  );
};

export default TreadWellSection;
