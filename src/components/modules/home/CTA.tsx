"use client";

import Image from "next/image";
import { ShoppingBag, Wrench, ArrowRight, Sparkles, Clock } from "lucide-react";
import Link from "next/link";

const CTA = ({ setStep }: any) => {
  return (
    <div className="relative pt-10 pb-0 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-black dark:via-black dark:to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(239,68,68,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.03),transparent_50%)]" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg shadow-red-500/20">
            <Sparkles className="w-4 h-4 fill-current" />
            <span className="uppercase tracking-wider">Get Started Today</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Choose Your Perfect
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent block sm:inline sm:ml-3">
              Experience
            </span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Whether you're ready to shop or need expert service, we've got you
            covered with premium solutions.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-12 items-stretch">
          {/* Shop Products Card */}
          <div className="group flex-1 max-w-md mx-auto lg:mx-0">
            <div className="relative bg-white dark:bg-gray-950 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-700 hover:border-gray-200 dark:hover:border-slate-600 transition-all duration-700 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-2 overflow-hidden h-full flex flex-col">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Top Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon Header */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30 rounded-2xl flex items-center justify-center group-hover:from-red-100 group-hover:to-red-200 dark:group-hover:from-red-800/30 dark:group-hover:to-red-700/40 transition-all duration-500 shadow-lg shadow-red-500/20">
                      <ShoppingBag className="w-10 h-10 text-red-600 group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    {/* Premium Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                      <Sparkles className="w-4 h-4 text-white fill-current" />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 transition-colors duration-300">
                    SHOP PRODUCTS
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-center leading-relaxed">
                  Discover premium products and book professional installation
                  at checkout.
                  <span className="font-semibold text-gray-800 dark:text-gray-200 block mt-2">
                    Quality guaranteed, convenience delivered.
                  </span>
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8 flex-grow">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span>Premium product selection</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span>Professional installation included</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span>Warranty protection</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-1 flex items-center justify-center gap-3 group/btn mt-auto">
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Elegant Divider */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="flex flex-col items-center h-full py-8">
              <div className="flex-1 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
              <div className="bg-white dark:bg-gray-950 border-2 border-gray-200 dark:border-slate-600 rounded-full p-4 shadow-lg my-4">
                <span className="text-gray-400 dark:text-gray-500 font-semibold text-lg">
                  AND
                </span>
              </div>
              <div className="flex-1 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
            </div>
          </div>

          {/* Mobile Divider */}
          <div className="lg:hidden flex items-center justify-center py-4">
            <div className="flex items-center w-full max-w-xs">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
              <div className="bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-600 rounded-full px-6 py-2 shadow-lg mx-4">
                <span className="text-gray-400 dark:text-gray-500 font-semibold">
                  AND
                </span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
            </div>
          </div>

          {/* Schedule Service Card */}
          <div className="group flex-1 max-w-md mx-auto lg:mx-0">
            <div className="relative bg-white dark:bg-gray-950 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-700 hover:border-gray-200 dark:hover:border-slate-600 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 overflow-hidden h-full flex flex-col">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Top Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon Header */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 rounded-2xl flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 dark:group-hover:from-blue-800/30 dark:group-hover:to-blue-700/40 transition-all duration-500 shadow-lg shadow-blue-500/20">
                      <Wrench className="w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    {/* Premium Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    SCHEDULE SERVICE
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-center leading-relaxed">
                  Book an in-store visit for expert consultation, repair, and
                  inspection services.
                  <span className="font-semibold text-gray-800 dark:text-gray-200 block mt-2">
                    Professional care, personalized attention.
                  </span>
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8 flex-grow">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>Expert consultation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>Professional repair services</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>Comprehensive inspection</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link href="/appointment">
                  <button
                    // onClick={() => setStep(2)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1 flex items-center justify-center gap-3 group/btn mt-auto">
                    <span>BOOK SERVICE</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-9 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Trusted by 50K+ customers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Same-day service available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>100% satisfaction guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
