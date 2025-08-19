"use client";

import Image from "next/image";
import { envConfig } from "@/src/config/envConfig";
import { useGetSingleWheel } from "@/src/hooks/wheel.hook";
import { DataError, DataLoading } from "../../_components/DataFetchingStates";

export default function WheelDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const { data: wheel, isLoading, isError } = useGetSingleWheel(id);

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
              className="bg-white/10 backdrop-blur-md p-2 rounded-xl shadow-lg border border-white/20">
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
            { label: "vehicleType", value: vehicleType?.vehicleType },
            { label: "Ratio", value: ratio?.ratio },
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

      {/* Wheel Specifications */}
      <SpecsSection
        title="Wheel Specifications"
        specs={[
          { label: "Wheel Color", value: wheelColor },
          { label: "Material Type", value: materialType },
          { label: "Wheel Size", value: wheelSize },
          { label: "Wheel Accent", value: wheelAccent },
          { label: "Wheel Pieces", value: wheelPieces },
          { label: "Wheel Width", value: width?.width },
          { label: "Rim Diameter", value: diameter?.diameter },
          { label: "Rim Width", value: rimWidth },
          { label: "Bolt Pattern", value: boltPattern },
          { label: "Offset", value: offset },
          { label: "Hub Bore Size", value: hubBoreSize },
          { label: "Number of Bolts", value: numberOFBolts },
          { label: "ATV Offset", value: ATVOffset },
          { label: "Bolts Quantity", value: BoltsQuantity },
        ]}
      />

      {/* Performance & General Info */}
      <SpecsSection
        title="Performance & General Info"
        specs={[
          { label: "GTIN", value: GTIN },
          { label: "Condition Info", value: conditionInfo },
          { label: "Gross Weight", value: grossWeight },
          { label: "Hub Bore", value: hubBore },
          { label: "Load Capacity", value: loadCapacity },
          { label: "Load Rating", value: loadRating },
          { label: "Finish", value: finish },
          { label: "Warranty", value: warranty },
          { label: "Construction Type", value: constructionType },
          { label: "Wheel Type", value: widthType?.widthType },
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
        <p
          key={index}
          className="text-sm text-foreground">
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
          <Spec
            key={idx}
            label={spec.label}
            value={spec.value}
          />
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
