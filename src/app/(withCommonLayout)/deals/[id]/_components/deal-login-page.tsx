"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  Shield,
  ShoppingBag,
  Star,
  User,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetAllDeals } from "@/src/hooks/deals.hook";

export default function DealLoginPage({ dealData }: any) {
  const router = useRouter();
  const { data, isLoading, isError } = useGetAllDeals();
  const deals = data?.data || [];
  if (deals.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
        <div className="glass-effect rounded-2xl p-8 md:p-12 text-center max-w-md slide-up">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 md:w-10 md:h-10 text-red-600" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
            No Premium Deals Available
          </h2>
          <p className="text-muted-foreground mb-8 text-sm md:text-base">
            Check back soon for exclusive automotive offers
          </p>
          <Link href="/">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 luxury-glow flex items-center gap-3 mx-auto text-sm md:text-base">
              Continue Shopping
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <nav className="glass-effect border-b border-border/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center space-x-2 md:space-x-3 text-xs md:text-sm overflow-x-auto">
            <Link
              href="/"
              className="text-muted-foreground hover:text-red-600 transition-colors font-medium whitespace-nowrap">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground flex-shrink-0" />
            <Link
              href="/deals"
              className="text-muted-foreground hover:text-red-600 transition-colors font-medium whitespace-nowrap">
              Premium Deals
            </Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground flex-shrink-0" />
            <span className="text-foreground font-semibold truncate">
              {dealData?.brand?.name} Collection
            </span>
          </div>
        </div>
      </nav>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-800 to-red-950">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 via-red-800/70 to-red-900/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="slide-up">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
              <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 text-center sm:text-left">
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-2 luxury-glow drop-shadow-2xl">
                    {dealData?.discountPercentage}
                  </div>
                  <div className="text-white/80 font-medium text-base md:text-lg tracking-wider">
                    OFF
                  </div>
                </div>

                <div className="glass-effect px-6 md:px-8 py-4 md:py-6 rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wider">
                    {dealData?.brand?.name?.toUpperCase()}
                  </div>
                  <div className="text-white/80 font-medium mt-2 text-sm md:text-base">
                    PREMIUM COLLECTION
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4 text-white w-full max-w-sm lg:max-w-none">
                <div className="glass-effect p-3 md:p-4 rounded-xl text-center backdrop-blur-xl border border-white/20 hover:bg-white/10 transition-all duration-300">
                  <Star className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-yellow-400 drop-shadow-lg" />
                  <div className="font-semibold text-xs md:text-sm">
                    Premium Quality
                  </div>
                </div>
                <div className="glass-effect p-3 md:p-4 rounded-xl text-center backdrop-blur-xl border border-white/20 hover:bg-white/10 transition-all duration-300">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-green-400 drop-shadow-lg" />
                  <div className="font-semibold text-xs md:text-sm">
                    Warranty Included
                  </div>
                </div>
                <div className="glass-effect p-3 md:p-4 rounded-xl text-center backdrop-blur-xl border border-white/20 hover:bg-white/10 transition-all duration-300">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-blue-400 drop-shadow-lg" />
                  <div className="font-semibold text-xs md:text-sm">
                    Limited Time
                  </div>
                </div>
                <div className="glass-effect p-3 md:p-4 rounded-xl text-center backdrop-blur-xl border border-white/20 hover:bg-white/10 transition-all duration-300">
                  <Zap className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-orange-400 drop-shadow-lg" />
                  <div className="font-semibold text-xs md:text-sm">
                    Fast Delivery
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                <User className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <div className="font-bold text-base md:text-lg">
                  Exclusive Member Access
                </div>
                <div className="text-white/80 text-xs md:text-sm">
                  Sign in to unlock premium deals
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                router.push(`/login?redirect=/deals/${dealData?._id}`)
              }
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-3 premium-shimmer shadow-xl text-sm md:text-base w-full sm:w-auto justify-center">
              <User className="w-4 h-4 md:w-5 md:h-5" />
              Sign In to My Account
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="glass-effect rounded-2xl md:rounded-3xl p-6 md:p-12 slide-up shadow-2xl backdrop-blur-xl border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5 animate-pulse" />
          <div className="relative grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-red-600/10 text-red-600 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6 border border-red-500/20">
                <Star className="w-3 h-3 md:w-4 md:h-4" />
                PREMIUM DEAL
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-4 md:mb-6 leading-tight">
                {dealData?.brand?.name}{" "}
                <span className="text-red-600 drop-shadow-lg">Tire Deals</span>
              </h1>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-muted-foreground mb-4 md:mb-6">
                {dealData?.title}
              </h2>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 md:mb-8">
                <div className="glass-effect px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10 w-full sm:w-auto">
                  <div className="text-xs md:text-sm text-muted-foreground">
                    Valid Period
                  </div>
                  <div className="font-semibold text-foreground text-sm md:text-base">
                    {dealData?.validFrom &&
                      dealData?.validTo &&
                      `${new Date(dealData.validFrom).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )} – ${new Date(dealData.validTo).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}`}
                  </div>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6 mb-8 md:mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                    <span className="text-white font-bold text-sm">%</span>
                  </div>
                  <div>
                    <div className="font-bold text-base md:text-lg text-foreground mb-1">
                      Get {dealData?.discountPercentage} off
                    </div>
                    <div className="text-muted-foreground text-sm md:text-base">
                      {dealData?.description}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  router.push(`/login?redirect=/deals/${dealData?._id}`)
                }
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl text-base md:text-lg font-bold transition-all duration-300 hover:scale-105 luxury-glow shadow-2xl w-full sm:w-auto relative overflow-hidden">
                <span className="relative z-10">UNLOCK EXCLUSIVE ACCESS</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse" />
              </button>
            </div>

            <div className="relative">
              <div className="glass-effect rounded-2xl p-6 md:p-8 text-center backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent animate-pulse" />
                <div className="relative">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center shadow-2xl border border-red-500/30">
                    <ShoppingBag className="w-10 h-10 md:w-12 md:h-12 text-red-600" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">
                    Premium Benefits
                  </h3>
                  <div className="space-y-3 md:space-y-4 text-left">
                    <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg transition-all duration-300">
                      <div className="w-2 h-2 rounded-full bg-red-600 shadow-lg"></div>
                      <span className="text-muted-foreground text-sm md:text-base">
                        Exclusive member pricing
                      </span>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg transition-all duration-300">
                      <div className="w-2 h-2 rounded-full bg-red-500 shadow-lg"></div>
                      <span className="text-muted-foreground text-sm md:text-base">
                        Priority customer support
                      </span>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg transition-all duration-300">
                      <div className="w-2 h-2 rounded-full bg-red-600 shadow-lg"></div>
                      <span className="text-muted-foreground text-sm md:text-base">
                        Free installation services
                      </span>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg transition-all duration-300">
                      <div className="w-2 h-2 rounded-full bg-red-500 shadow-lg"></div>
                      <span className="text-muted-foreground text-sm md:text-base">
                        Extended warranty coverage
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
