"use client";

import React from "react";
import DealsCarousel from "../../UI/DealsCaurosel";
import { useGetAllDeals } from "@/src/hooks/deals.hook";
import { Shield, CheckCircle, Star, Zap, Award, Clock } from "lucide-react";

const Deals = () => {
  const { data, isLoading, isError } = useGetAllDeals();
  const deals = data?.data || [];

  const services = [
    { icon: CheckCircle, text: "Rotation", color: "text-emerald-500" },
    { icon: CheckCircle, text: "Rebalancing", color: "text-blue-500" },
    { icon: CheckCircle, text: "Air Checks", color: "text-purple-500" },
    { icon: CheckCircle, text: "Flat Tire Repair", color: "text-orange-500" },
    { icon: CheckCircle, text: "Tire Inspection", color: "text-pink-500" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-green-900/20">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-56 h-56 bg-emerald-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
      </div>

      {/* Premium Price Promise Section */}
      <div className="relative z-10 bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 dark:from-green-700 dark:via-green-800 dark:to-emerald-800 text-white overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative py-6 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Left side - Promise */}
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="bg-green-800/50 backdrop-blur-sm p-3 rounded-full border border-green-400/30">
                    <Shield className="w-6 h-6 text-green-200" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 bg-green-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-green-400/30 mb-2">
                      <Award className="w-4 h-4 text-green-200" />
                      <span className="font-black uppercase text-xs tracking-wider text-green-100">
                        Our Low Price Promise
                      </span>
                    </div>
                    <p className="text-lg font-bold">
                      Found it lower?{" "}
                      <span className="text-green-200 font-normal bg-green-800/40 px-2 py-1 rounded-lg">
                        We'll price match it
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right side - Availability */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 bg-green-800/40 backdrop-blur-sm px-6 py-3 rounded-full border border-green-400/30">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    <span className="font-bold text-green-100">Online</span>
                  </div>
                  <div className="w-px h-4 bg-green-400/50"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse delay-500"></div>
                    <span className="font-bold text-green-100">In-Store</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Services Section */}
      <div className="relative z-10 bg-gradient-to-r from-gray-50 via-white to-blue-50/50 dark:from-black dark:via-black dark:to-black border-y border-red-200/50 dark:border-red-800/30">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-300/30 to-transparent"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-300/30 to-transparent"></div>
        </div>

        <div className="relative py-8 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-red-500/10 dark:from-blue-500/20 dark:to-red-500/20 px-6 py-3 rounded-full mb-4 border border-blue-200/50 dark:border-blue-700/50 backdrop-blur-sm">
                <Star className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
                <span className="font-black uppercase text-sm tracking-wider text-gray-800 dark:text-gray-200">
                  Lifetime Services Included
                </span>
                <Zap className="w-4 h-4 text-red-600 dark:text-red-400 animate-pulse delay-500" />
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
                  Premium Services
                </span>{" "}
                with Every Tire Purchase
              </h3>

              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Get peace of mind with our comprehensive tire care services -
                all included for the life of your tires
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-2xl p-6 hover:shadow-2xl dark:hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105">
                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${service.color.replace("text-", "from-").replace("-500", "-400/20")} to-transparent rounded-2xl blur-xl`}></div>

                  {/* Content */}
                  <div className="relative text-center">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 ${service.color.replace("text-", "bg-").replace("-500", "-100")} dark:${service.color.replace("text-", "bg-").replace("-500", "-900/50")} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon
                        className={`w-6 h-6 ${service.color} group-hover:animate-pulse`}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-red-600 dark:text-red-400 font-black text-sm">
                          FREE
                        </span>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      </div>

                      <h4 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                        {service.text}
                      </h4>
                    </div>
                  </div>

                  {/* Hover accent */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 ${service.color.replace("text-", "bg-")} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`}></div>
                </div>
              ))}
            </div>

            {/* Bottom accent */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Valid for the entire life of your tires</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deals Carousel Section */}
      <div className="relative z-10 bg-gradient-to-br from-gray-50/30 via-white to-gray-50/50 dark:from-black dark:via-black dark:to-black">
        <DealsCarousel data={deals} />
      </div>
    </section>
  );
};

export default Deals;
