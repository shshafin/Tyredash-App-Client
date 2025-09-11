import React from "react";
import { Star, ShoppingCart, Loader2 } from "lucide-react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import Image from "next/image";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import {
  useGetDiscountedTiresByBrand,
  useGetDiscountedWheelsByBrand,
} from "@/src/hooks/deals.hook";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { envConfig } from "@/src/config/envConfig";

interface TireProduct {
  _id: string;
  name: string;
  brand: {
    name: string;
    discountPercentage: string;
    _id: string;
  };
  model: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
}

function transformData(tireArray: any, brand: any) {
  return tireArray.slice(0, 4).map((tire: any, idx: number) => ({
    _id: tire?._id,
    brand,
    name: tire.name?.toString(),
    image: tire.images?.[0],
    rating: 5,
    reviewCount: Math.floor(Math.random() * 500),
    price: Math.round(tire.price),
    description: tire.description,
  }));
}

const StarRating = ({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating}</span>
      </div>
    </div>
  );
};

const WheelCard = ({ product }: { product: TireProduct }) => {
  return (
    <Card className="w-full max-w-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-6 bg-red-600 flex items-center justify-center rounded-sm">
            <span className="text-white text-xs font-bold">
              {product?.brand?.name[0]}
            </span>
          </div>
          <span className="text-red-600 font-bold text-sm">
            {product?.brand?.name}
          </span>
        </div>
        <h3 className="font-bold text-lg text-gray-900  dark:text-gray-100">
          {product?.name}
        </h3>
        <StarRating
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      </CardHeader>

      <CardBody className="px-4 pb-4">
        <div className="flex justify-center mb-4">
          <Image
            src={`${envConfig.base_url}${product.image}`}
            alt={product.name}
            width={120}
            height={120}
            className="w-32 h-32 object-cover rounded-lg"
          />
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">$</span>
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-gray-50">
              ${product.price}
            </span>
          </div>
          {product?.brand?.discountPercentage && (
            <span className="text-green-600 font-semibold ml-2">
              {product?.brand?.discountPercentage}% OFF
            </span>
          )}
        </div>

        <Chip
          color="danger"
          variant="flat"
          className="mb-4">
          INSTANT SAVINGS
        </Chip>
        <Link href={`/wheel/${product?._id}`}>
          <Button
            color="danger"
            variant="bordered"
            className="w-full font-semibold border-2 hover:bg-red-50 transition-colors"
            startContent={<ShoppingCart className="w-4 h-4" />}>
            SHOP NOW
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
};

const WheelDealsSection = ({ brand }: any) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useGetDiscountedWheelsByBrand(
    brand?._id
  );
  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading wheels...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold text-destructive">
          Failed to load deal tires
        </p>
        <Button
          onPress={() =>
            queryClient.invalidateQueries({
              queryKey: ["GET_DISCOUNTED_TIRES_BY_BRAND"],
            })
          }>
          Try Again
        </Button>
      </div>
    );
  }

  const tires = data?.data || [];
  console.log({ tires }, "tires");
  const tireData = transformData(tires, brand);

  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            TRENDING {brand?.name?.toUpperCase()} WHEEL DEALS
          </h2>
          <div className="w-24 h-1 bg-red-600 rounded"></div>
        </div>

        {tireData && tireData.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {tireData.map((product: any) => (
                <WheelCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>

            <div className="flex justify-center">
              <Link href={`/deals/${brand?.dealId}/wheels`}>
                <Button
                  color="danger"
                  size="lg"
                  className="px-12 py-3 font-bold text-white bg-red-600 hover:bg-red-700 transition-colors">
                  SHOP {brand?.name?.toUpperCase()} INSTANT SAVINGS
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border rounded-lg">
            {/* fallback icon, you can replace this with a nice SVG or icon */}
            <svg
              className="mb-4 w-16 h-16 text-gray-400"
              fill="none"
              stroke="#9ca3af"
              viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                strokeWidth="2"
              />
              <path
                d="M12 8v4m0 4h.01"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="text-gray-500 text-lg mb-4">
              Currently, there are no wheel deals available for{" "}
              {brand?.name?.toUpperCase()}.
            </p>

            <Button
              color="danger"
              variant="bordered"
              onClick={() => location.reload()}
              className="px-6 py-2 font-semibold transition-colors">
              Reload Deals
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WheelDealsSection;
