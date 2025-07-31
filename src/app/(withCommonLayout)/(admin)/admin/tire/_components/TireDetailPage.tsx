"use client";

import { useGetSingleTire } from "@/src/hooks/tire.hook";
import { DataError, DataLoading } from "../../_components/DataFetchingStates";
import Image from "next/image";
import { envConfig } from "@/src/config/envConfig";
import clsx from "clsx";

export default function TireDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const { data: tire, isLoading, isError } = useGetSingleTire(id);

  if (isLoading) return <DataLoading />;
  if (isError) return <DataError />;
  if (!tire || !tire.data) return <div className="p-6">Tire not found</div>;

  const {
    name,
    brand,
    year,
    make,
    model,
    trim,
    tireSize,
    category,
    drivingType,
    images,
    description,
    productLine,
    unitName,
    conditionInfo,
    grossWeightRange,
    gtinRange,
    loadIndexRange,
    mileageWarrantyRange,
    maxAirPressureRange,
    speedRatingRange,
    sidewallDescriptionRange,
    temperatureGradeRange,
    sectionWidthRange,
    diameterRange,
    wheelRimDiameterRange,
    tractionGradeRange,
    treadDepthRange,
    treadWidthRange,
    overallWidthRange,
    treadwearGradeRange,
    sectionWidth,
    aspectRatio,
    rimDiameter,
    overallDiameter,
    rimWidthRange,
    width,
    treadDepth,
    loadIndex,
    loadRange,
    maxPSI,
    warranty,
    aspectRatioRange,
    treadPattern,
    loadCapacity,
    constructionType,
    tireType,
    price,
    discountPrice,
    stockQuantity,
  } = tire.data;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12 bg-default-50">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-purple-700 dark:text-purple-400">
          {name}
        </h1>
        <hr className="border-t border-purple-300 w-32 mx-auto" />
      </div>

      {/* Images */}
      <div className="flex justify-center flex-wrap gap-4">
        {images && images.length > 0 ? (
          images.map((img: any, index: number) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md p-2 rounded-xl shadow-lg border border-white/20"
            >
              <Image
                src={`${envConfig.base_url}${img}`}
                alt={`${name} - image ${index + 1}`}
                width={280}
                height={280}
                className="rounded-md object-contain bg-background"
              />
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground">
            No Images Available
          </div>
        )}
      </div>

      {/* Basic Info & Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard
          title="Basic Information"
          fields={[
            { label: "Brand", value: brand?.name },
            { label: "Category", value: category?.name },
            { label: "Driving Type", value: drivingType?.title },
            { label: "Make", value: make?.make },
            { label: "Model", value: model?.model },
            { label: "Trim", value: trim?.trim },
            { label: "Tire Size", value: tireSize?.tireSize },
            { label: "Year", value: year?.year },
          ]}
        />
        <GlassCard
          title="Pricing & Stock"
          fields={[
            { label: "Price", value: `$${price}` },
            { label: "Discount Price", value: `$${discountPrice}` },
            { label: "Stock Quantity", value: stockQuantity },
            { label: "Unit Name", value: unitName },
          ]}
        />
      </div>

      {/* Technical Specs */}
      <SpecsSection
        title="Technical Specifications"
        specs={[
          { label: "Load Index", value: loadIndex },
          { label: "Speed Rating Range", value: speedRatingRange },
          { label: "Tread Depth", value: treadDepth },
          { label: "Section Width", value: sectionWidth },
          { label: "Width", value: width },
          { label: "Aspect Ratio", value: aspectRatio },
          { label: "Rim Diameter", value: rimDiameter },
          { label: "Overall Diameter", value: overallDiameter },
          { label: "Load Range", value: loadRange },
          { label: "Max PSI", value: maxPSI },
          { label: "Tread Pattern", value: treadPattern },
          { label: "Warranty", value: warranty },
          { label: "Construction Type", value: constructionType },
          { label: "Tire Type", value: tireType },
          { label: "Load Capacity", value: loadCapacity },
        ]}
      />

      {/* Advanced Ranges */}
      <SpecsSection
        title="Advanced Ranges"
        specs={[
          { label: "Gross Weight Range", value: grossWeightRange },
          { label: "GTIN Range", value: gtinRange },
          { label: "Load Index Range", value: loadIndexRange },
          { label: "Mileage Warranty Range", value: mileageWarrantyRange },
          { label: "Max Air Pressure Range", value: maxAirPressureRange },
          {
            label: "Sidewall Description Range",
            value: sidewallDescriptionRange,
          },
          { label: "Temperature Grade Range", value: temperatureGradeRange },
          { label: "Traction Grade Range", value: tractionGradeRange },
          { label: "Tread Depth Range", value: treadDepthRange },
          { label: "Tread Width Range", value: treadWidthRange },
          { label: "Overall Width Range", value: overallWidthRange },
          { label: "Wheel Rim Diameter Range", value: wheelRimDiameterRange },
          { label: "Aspect Ratio Range", value: aspectRatioRange },
          { label: "Treadwear Grade Range", value: treadwearGradeRange },
          { label: "Diameter Range", value: diameterRange },
          { label: "Rim Width Range", value: rimWidthRange },
          { label: "Section Width Range", value: sectionWidthRange },
        ]}
      />

      {/* Description */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Description
        </h2>
        <p className="text-muted-foreground mb-4">
          {description || "No description provided."}
        </p>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>
            <strong>Product Line:</strong> {productLine || "N/A"}
          </p>
          <p>
            <strong>Condition Info:</strong> {conditionInfo || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

// GlassCard component for Basic Info & Pricing
function GlassCard({
  title,
  fields,
}: {
  title: string;
  fields: { label: string; value: any }[];
}) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 space-y-3 shadow-sm">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <hr className="border-white/20" />
      {fields.map((field, index) => (
        <p key={index} className="text-sm text-foreground">
          <strong>{field.label}:</strong> {field.value ?? "N/A"}
        </p>
      ))}
    </div>
  );
}

function SpecsSection({
  title,
  specs,
}: {
  title: string;
  specs: { label: string; value: any }[];
}) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <hr className="border-white/20" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {specs.map((spec, idx) => (
          <Spec key={idx} label={spec.label} value={spec.value} />
        ))}
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 text-center shadow-sm">
      <span className="block font-medium text-muted-foreground text-sm">
        {label}
      </span>
      <div className="text-purple-700 dark:text-purple-400 font-semibold mt-1 text-base">
        {value ?? "N/A"}
      </div>
    </div>
  );
}
