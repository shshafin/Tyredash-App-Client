"use client";

import { useGetSingleWheel } from "@/src/hooks/wheel.hook";
import { DataError, DataLoading } from "../../_components/DataFetchingStates";
import Image from "next/image";
import { envConfig } from "@/src/config/envConfig";
import clsx from "clsx";
import { useState } from "react";
import {
  Star,
  Shield,
  Truck,
  Award,
  Zap,
  Clock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  Settings,
  Gauge,
  Wrench,
} from "lucide-react";

export default function WheelDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const { data: wheel, isLoading, isError } = useGetSingleWheel(id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  if (isLoading) return <DataLoading />;
  if (isError) return <DataError />;
  if (!wheel || !wheel.data) return <div className="p-6">Wheel not found</div>;

  const {
    name,
    year,
    make,
    model,
    trim,
    tireSize,
    brand,
    category,
    ratio,
    drivingType,
    vehicleType,
    description,
    images,
    productLine,
    unitName,
    grossWeight,
    conditionInfo,
    GTIN,
    ATVOffset,
    BoltsQuantity,
    wheelColor,
    hubBore,
    materialType,
    wheelSize,
    wheelAccent,
    wheelPieces,
    width,
    diameter,
    rimWidth,
    boltPattern,
    offset,
    hubBoreSize,
    numberOFBolts,
    loadCapacity,
    loadRating,
    finish,
    warranty,
    constructionType,
    widthType,
    price,
    discountPrice,
    stockQuantity,
  } = wheel.data;

  const savings = price && discountPrice ? price - discountPrice : 0;
  const savingsPercent =
    price && discountPrice ? Math.round((savings / price) * 100) : 0;

  const nextImage = () => {
    if (images && images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images && images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-6">
              <Settings className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-medium text-white/90">
                Premium Wheel Collection
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent mb-4">
              {name}
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {brand?.name} • {category?.name} • {vehicleType?.vehicleType}
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
            {/* Premium Image Gallery */}
            <div className="lg:col-span-2 space-y-6">
              <div className="relative group">
                <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                  {images && images.length > 0 ? (
                    <div className="relative">
                      <div className="aspect-square relative overflow-hidden rounded-2xl bg-white/5">
                        <Image
                          src={`${envConfig.base_url}${images[currentImageIndex]}`}
                          alt={`${name} - image ${currentImageIndex + 1}`}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                        <button
                          onClick={() => setShowLightbox(true)}
                          className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200">
                          <ZoomIn className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Navigation Controls */}
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100">
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-square flex items-center justify-center bg-white/5 rounded-2xl">
                      <span className="text-white/50">No Images Available</span>
                    </div>
                  )}
                </div>

                {/* Thumbnail Navigation */}
                {images && images.length > 1 && (
                  <div className="flex gap-3 justify-center overflow-x-auto pb-2">
                    {images.map((img: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={clsx(
                          "flex-shrink-0 w-16 h-16 rounded-xl border-2 overflow-hidden transition-all duration-200",
                          currentImageIndex === index
                            ? "border-indigo-400 scale-105"
                            : "border-white/20 hover:border-white/40"
                        )}>
                        <Image
                          src={`${envConfig.base_url}${img}`}
                          alt={`Thumbnail ${index + 1}`}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain bg-white/5"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Premium Info Panel */}
            <div className="lg:col-span-2 space-y-8">
              {/* Pricing Card */}
              <PremiumPricingCard
                price={price}
                discountPrice={discountPrice}
                savings={savings}
                savingsPercent={savingsPercent}
                stockQuantity={stockQuantity}
              />

              {/* Key Specifications */}
              <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-4 sm:p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-indigo-400" />
                  Key Specifications
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* 1st row: Wheel Size + Material */}
                  <SpecItem
                    icon={<Settings className="w-5 h-5" />}
                    label="Wheel Size"
                    value={wheelSize}
                  />
                  <SpecItem
                    icon={<Shield className="w-5 h-5" />}
                    label="Material"
                    value={materialType}
                  />

                  {/* 2nd row: Bolt Pattern (full width) */}
                  <div className="lg:col-span-2">
                    <SpecItem
                      icon={<Gauge className="w-5 h-5" />}
                      label="Bolt Pattern"
                      value={boltPattern}
                    />
                  </div>

                  {/* 3rd row: Warranty (full width) */}
                  <div className="lg:col-span-2">
                    <SpecItem
                      icon={<Clock className="w-5 h-5" />}
                      label="Warranty"
                      value={warranty}
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Compatibility */}
              <div className="bg-gradient-to-r from-green-500/10 to-indigo-500/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  Vehicle Compatibility
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Make</span>
                    <span className="text-white font-semibold">
                      {make?.make || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Model</span>
                    <span className="text-white font-semibold">
                      {model?.model || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Trim</span>
                    <span className="text-white font-semibold">
                      {trim?.trim || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Year</span>
                    <span className="text-white font-semibold">
                      {year?.year || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Technical Specifications
          </h2>
          <p className="text-xl text-white/70">
            Detailed engineering specifications and performance metrics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Wheel Design */}
          <SpecCard
            title="Wheel Design"
            icon={<Settings className="w-6 h-6 text-indigo-400" />}
            specs={[
              { label: "Wheel Color", value: wheelColor },
              { label: "Wheel Accent", value: wheelAccent },
              { label: "Wheel Pieces", value: wheelPieces },
              { label: "Finish", value: finish },
            ]}
            className="from-indigo-500/10 to-purple-500/10 border-indigo-500/20"
          />

          {/* Dimensions */}
          <SpecCard
            title="Dimensions"
            icon={<Gauge className="w-6 h-6 text-blue-400" />}
            specs={[
              { label: "Rim Width", value: rimWidth },
              { label: "Diameter", value: diameter?.diameter },
              { label: "Offset", value: offset },
              { label: "Hub Bore Size", value: hubBoreSize },
            ]}
            className="from-blue-500/10 to-cyan-500/10 border-blue-500/20"
          />
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-8 mt-8">
          {/* Performance */}
          <SpecCard
            title="Performance"
            icon={<Zap className="w-6 h-6 text-yellow-400" />}
            specs={[
              { label: "Load Capacity", value: loadCapacity },
              { label: "Load Rating", value: loadRating },
              { label: "Number of Bolts", value: numberOFBolts },
              { label: "Bolts Quantity", value: BoltsQuantity },
            ]}
            className="from-yellow-500/10 to-orange-500/10 border-yellow-500/20"
          />

          {/* Construction */}
          <SpecCard
            title="Construction"
            icon={<Wrench className="w-6 h-6 text-purple-400" />}
            specs={[
              { label: "Construction Type", value: constructionType },
              { label: "Width Type", value: widthType?.widthType },
              { label: "ATV Offset", value: ATVOffset },
              { label: "Hub Bore", value: hubBore },
            ]}
            className="from-purple-500/10 to-pink-500/10 border-purple-500/20"
          />
        </div>

        {/* Third Row - Single card centered */}
        <div className="flex justify-center mt-8">
          <div className="w-full lg:w-1/2">
            {/* Quality & Info */}
            <SpecCard
              title="Quality & Information"
              icon={<CheckCircle className="w-6 h-6 text-green-400" />}
              specs={[
                { label: "GTIN", value: GTIN },
                { label: "Gross Weight", value: grossWeight },
                { label: "Product Line", value: productLine },
                { label: "Condition", value: conditionInfo },
              ]}
              className="from-green-500/10 to-teal-500/10 border-green-500/20"
            />
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Product Description
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-white/80 leading-relaxed">
              {description ||
                "This premium wheel combines exceptional design, superior engineering, and outstanding performance. Crafted with precision manufacturing and high-quality materials to deliver unmatched style, durability, and driving experience for your vehicle."}
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && images && images.length > 0 && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors">
              <X className="w-8 h-8" />
            </button>
            <Image
              src={`${envConfig.base_url}${images[currentImageIndex]}`}
              alt={`${name} - full size`}
              width={800}
              height={800}
              className="max-w-full max-h-full object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function PremiumPricingCard({
  price,
  discountPrice,
  savings,
  savingsPercent,
  stockQuantity,
}: {
  price: number;
  discountPrice: number;
  savings: number;
  savingsPercent: number;
  stockQuantity: number;
}) {
  return (
    <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-8 shadow-2xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Pricing</h3>
          {savings > 0 && (
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-semibold text-sm">
                Save {savingsPercent}%
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {price && discountPrice && discountPrice < price ? (
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-white">
                ${discountPrice.toFixed(2)}
              </span>
              <span className="text-md xl:text-xl text-white/60 line-through">
                ${price.toFixed(2)}
              </span>
            </div>
            <p className="text-green-400 font-semibold">
              You save ${savings.toFixed(2)}
            </p>
          </div>
        ) : (
          <span className="text-4xl font-black text-white">
            ${(price || 0).toFixed(2)}
          </span>
        )}
      </div>

      {stockQuantity && (
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-white/80">
            {stockQuantity > 10 ? "In Stock" : `Only ${stockQuantity} left`}
          </span>
        </div>
      )}
    </div>
  );
}

function SpecItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: any;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
      <div className="text-indigo-400">{icon}</div>
      <div>
        <div className="text-white/70 text-sm">{label}</div>
        <div className="text-white font-semibold">{value || "N/A"}</div>
      </div>
    </div>
  );
}

function SpecCard({
  title,
  icon,
  specs,
  className,
}: {
  title: string;
  icon: React.ReactNode;
  specs: { label: string; value: any }[];
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "bg-gradient-to-br backdrop-blur-xl border rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]",
        className
      )}>
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="space-y-4">
        {specs.map((spec, index) => (
          <div
            key={index}
            className="flex justify-between items-center">
            <span className="text-white/70 text-sm">{spec.label}</span>
            <span className="text-white font-semibold text-sm">
              {spec.value || "N/A"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
