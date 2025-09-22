"use client";
import { useGetWheels } from "@/src/hooks/wheel.hook";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function WheelVisualizer() {
  const { data, isLoading, isError } = useGetWheels(undefined);

  // flatten all wheel images
  const wheelImages = data?.data?.flatMap((wheel: any) => wheel.images) || [];

  const [selectedImage, setSelectedImage] = useState<number>(0);

  useEffect(() => {
    if (wheelImages.length > 0) setSelectedImage(0);
  }, [wheelImages]);

  if (isLoading) return <p>Loading Wheels...</p>;
  if (isError) return <p>Error loading wheels!</p>;

  return (
    <div className="flex flex-col items-center p-4">
      {/* Car with wheels */}
      <div className="relative w-[500px] h-[250px] border rounded-md shadow-lg bg-gray-50">
        {/* Car Image */}
        <Image
          src="/car.png"
          alt="Car"
          fill
          className="object-contain"
        />

        {/* Front Wheel */}
        {wheelImages[selectedImage] && (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${wheelImages[selectedImage]}`}
            alt="Front Wheel"
            width={90}
            height={90}
            className="absolute top-[120px] left-[90px] object-contain"
          />
        )}

        {/* Back Wheel */}
        {wheelImages[selectedImage] && (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${wheelImages[selectedImage]}`}
            alt="Back Wheel"
            width={90}
            height={90}
            className="absolute top-[120px] right-[85px] object-contain"
          />
        )}
      </div>

      {/* Wheel Selection Gallery */}
      <div className="flex flex-wrap gap-4 mt-6 justify-center max-w-[500px]">
        {wheelImages.map((img: string, index: number) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`border rounded-md p-1 hover:scale-105 transition ${
              selectedImage === index ? "border-purple-600" : "border-gray-300"
            }`}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${img}`}
              alt={`Wheel-${index}`}
              width={80}
              height={80}
              className="object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
