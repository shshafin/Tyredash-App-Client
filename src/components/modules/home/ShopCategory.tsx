import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

const categories = [
  {
    name: "Tires",
    image: "/t.webp",
    link: "/tire",
    description: "Premium quality tires for all terrains",
    gradient: "from-blue-500/20 to-cyan-500/20",
    hoverGradient: "hover:from-blue-500/30 hover:to-cyan-500/30",
    iconColor: "text-blue-500",
    accentColor: "bg-blue-500",
  },
  {
    name: "Wheels",
    image: "/w.webp",
    link: "/wheel",
    description: "Stylish wheels that make a statement",
    gradient: "from-emerald-500/20 to-green-500/20",
    hoverGradient: "hover:from-emerald-500/30 hover:to-green-500/30",
    iconColor: "text-emerald-500",
    accentColor: "bg-emerald-500",
  },
  {
    name: "Deals",
    image: "/d.webp",
    link: "/deals",
    description: "Unbeatable prices on top products",
    gradient: "from-orange-500/20 to-red-500/20",
    hoverGradient: "hover:from-orange-500/30 hover:to-red-500/30",
    iconColor: "text-orange-500",
    accentColor: "bg-orange-500",
  },
];

const ShopCategory = () => {
  return (
    <section className="py-12 px-4 relative overflow-hidden bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 dark:from-black dark:via-black dark:to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-emerald-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-4 h-4 bg-blue-400/30 rotate-45 animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-emerald-400/30 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/3 right-10 w-2 h-8 bg-orange-400/30 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF141D]/10 to-orange-500/10 dark:from-[#FF141D]/20 dark:to-orange-500/20 px-6 py-3 rounded-full mb-6 border border-[#FF141D]/20 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-[#FF141D] animate-pulse" />
            <span className="text-[#FF141D] font-bold uppercase text-sm tracking-wider">
              Explore by Category
            </span>
            <Sparkles className="w-4 h-4 text-orange-500 animate-pulse delay-500" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
              Find the Perfect Fit
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#FF141D] via-orange-500 to-red-600 bg-clip-text text-transparent animate-pulse">
              for Your Vehicle
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            From premium tires to stunning wheels, we've got your ride covered.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <Link
              href={category.link}
              key={index}
              className="group">
              <div
                className={`
                relative h-full bg-gradient-to-br ${category.gradient} ${category.hoverGradient}
                backdrop-blur-2xl border border-white/30 dark:border-white/10 
                rounded-2xl p-6 flex flex-col items-center 
                shadow-xl hover:shadow-2xl dark:shadow-2xl dark:hover:shadow-3xl
                transition-all duration-700 ease-out transform hover:-translate-y-3 hover:scale-[1.02]
                before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent 
                before:rounded-2xl before:opacity-0 before:transition-all before:duration-500
                hover:before:opacity-100 cursor-pointer overflow-hidden
                after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/5 after:to-transparent
                after:rounded-2xl after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
              `}>
                {/* Top accent line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${category.accentColor} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
                </div>

                {/* Category Icon */}
                <div
                  className={`absolute top-4 right-4 w-8 h-8 ${category.iconColor} opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110`}>
                  <Sparkles className="w-full h-full animate-pulse" />
                </div>

                {/* Image Container */}
                <div className="relative mb-6">
                  <div className="w-44 h-44 lg:w-48 lg:h-48 relative">
                    {/* Multi-layered glow effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-full blur-2xl scale-125 opacity-40 group-hover:opacity-70 transition-all duration-500`}></div>
                    <div
                      className={`absolute inset-0 ${category.accentColor}/20 rounded-full blur-xl scale-110 opacity-0 group-hover:opacity-60 transition-all duration-700`}></div>

                    {/* Image container with enhanced styling */}
                    <div className="relative w-full h-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full p-4 border-2 border-white/60 dark:border-gray-700/60 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-2">
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={200}
                        height={200}
                        className="object-contain w-full h-full transition-all duration-700 group-hover:scale-110 group-hover:-rotate-2"
                      />

                      {/* Inner glow */}
                      <div
                        className={`absolute inset-2 ${category.accentColor}/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    </div>

                    {/* Floating particles */}
                    <div
                      className={`absolute -top-1 -right-1 w-2 h-2 ${category.accentColor} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce delay-100`}></div>
                    <div
                      className={`absolute -bottom-1 -left-1 w-1.5 h-1.5 ${category.accentColor} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce delay-300`}></div>
                    <div
                      className={`absolute top-1/4 -left-2 w-1 h-1 ${category.accentColor} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce delay-500`}></div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-3 flex-1">
                  <h3 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:via-gray-700 group-hover:to-gray-900 dark:group-hover:from-white dark:group-hover:via-gray-200 dark:group-hover:to-white group-hover:bg-clip-text transition-all duration-500">
                    {category.name}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 text-sm leading-relaxed">
                    {category.description}
                  </p>

                  {/* Enhanced CTA */}
                  <div className="inline-flex items-center gap-2 mt-4 text-[#FF141D] font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                    <span className="text-sm uppercase tracking-wider">
                      Shop Now
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </div>

                {/* Bottom gradient accent */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${category.gradient.replace("/20", "")} opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>

                {/* Corner accents */}
                <div
                  className={`absolute bottom-4 left-4 w-6 h-0.5 ${category.accentColor} opacity-0 group-hover:opacity-60 transition-all duration-300 delay-100`}></div>
                <div
                  className={`absolute bottom-4 left-4 w-0.5 h-6 ${category.accentColor} opacity-0 group-hover:opacity-60 transition-all duration-300 delay-200`}></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopCategory;
