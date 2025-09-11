"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Star,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle,
  Shield,
  Users,
  Award,
  TrendingUp,
  Heart,
  Zap,
} from "lucide-react";

const TreadWellSection = () => {
  return (
    <section className="relative py-10 lg:py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-black dark:to-black transition-all duration-700 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-medium border border-red-200 dark:border-red-800 mb-6">
            <TrendingUp className="w-4 h-4" />
            <span>Tire Shopping Made Simple</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-200 bg-clip-text text-transparent">
              Tired of Tire
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent">
              Shopping Confusion?
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-light max-w-4xl mx-auto mb-8">
            Skip the overwhelming choices and pushy sales tactics.
            <span className="font-medium text-gray-800 dark:text-gray-100">
              {" "}
              Get personalized tire recommendations
            </span>
            that actually match your car, your budget, and the way you drive.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-950 px-4 py-2 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                75,000+ happy drivers
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-950 px-4 py-2 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
              <Shield className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Expert verified
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-950 px-4 py-2 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
              <Award className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Industry leader
              </span>
            </div>
          </div>
        </div>

        {/* Brand & Visual Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <Image
                src="/deals.jpg"
                alt="TyresDash - Your Trusted Tire Expert"
                width={360}
                height={360}
                className="rounded-2xl border-2 border-red-600 shadow-lg transition-all duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Hero Tire Image */}
          <div className="flex justify-center">
            <div className="relative group cursor-pointer">
              <Image
                src="/tread.jpg"
                alt="Premium tire showcasing advanced tread technology"
                width={400}
                height={400}
                className="w-full h-auto rounded-2xl border-2 border-red-500 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                Premium
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    75K+
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Happy Drivers
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    4.9★
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Rating
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Drivers Choose TyresDash
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              No more second-guessing. No more overpaying. Just the right tires
              for your life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: BarChart3,
                title: "Real Driver Reviews",
                description:
                  "See how tires actually perform in rain, snow, and daily commutes—straight from drivers who've been there.",
                gradient: "from-blue-500 to-blue-600",
                highlight: "No marketing fluff",
              },
              {
                icon: Star,
                title: "Built Just for You",
                description:
                  "Your car model, your driving habits, your local weather—we factor it all in for spot-on recommendations.",
                gradient: "from-purple-500 to-purple-600",
                highlight: "Personalized match",
              },
              {
                icon: Calendar,
                title: "Know What You'll Spend",
                description:
                  "See exactly how long tires will last and what you'll pay per mile—complete transparency, no surprises.",
                gradient: "from-green-500 to-green-600",
                highlight: "Full cost breakdown",
              },
              {
                icon: Clock,
                title: "Reserve & Go",
                description:
                  "Pick your tires online, reserve them, then swing by when it's convenient. No waiting around or pressure.",
                gradient: "from-orange-500 to-orange-600",
                highlight: "Skip the wait",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-red-300 dark:hover:border-red-600 transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-2 py-1 rounded-full border border-red-200 dark:border-red-800">
                      {feature.highlight}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="mb-20">
          <div className="bg-white dark:bg-gray-950 p-8 lg:p-12 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 bg-gradient-to-r from-red-400 to-red-600 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      Join 75,000+ smart drivers
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Who found their perfect tires
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      4.9
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                      out of 5
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 italic text-lg">
                  "Finally, someone who gets it. No pushy sales, just honest
                  recommendations that actually work for my budget and driving."
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  — Sarah M., verified customer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Drivers Everywhere
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Real results from real people who made the switch
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: "75,000",
                label: "Happy Drivers",
                suffix: "+",
                description: "And counting every day",
                icon: Users,
              },
              {
                number: "3.2M",
                label: "Tires Analyzed",
                suffix: "+",
                description: "Real performance data",
                icon: BarChart3,
              },
              {
                number: "98.5",
                label: "Satisfaction Rate",
                suffix: "%",
                description: "Would recommend us",
                icon: Heart,
              },
              {
                number: "$650",
                label: "Average Savings",
                suffix: "+",
                description: "Per tire purchase",
                icon: Zap,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group">
                <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 group-hover:shadow-xl group-hover:border-red-300 dark:group-hover:border-red-600 transition-all duration-500 group-hover:-translate-y-2">
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                        {stat.number}
                        {stat.suffix}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                        {stat.label}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link
            href="/tire"
            className="group inline-block">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-red-800 group-hover:from-red-700 group-hover:via-red-800 group-hover:to-red-900 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <button className="relative w-full px-8 py-6 text-white font-bold text-lg flex items-center justify-center gap-3 transition-all duration-500">
                <span>Find Your Perfect Tires Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          </Link>

          <div className="mt-6 space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ✓ Free personalized recommendations • ✓ No pushy sales calls • ✓
              Takes just 2 minutes
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Over 10,000 drivers found their perfect match this month
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreadWellSection;
