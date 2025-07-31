"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight, User } from "lucide-react"
import { Button } from "@heroui/button"
import { useRouter } from "next/navigation"

export default function DealLoginPage({dealData}: any) {
  const router = useRouter();
  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav className="px-4 py-3 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/deals" className="">
              Deals
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="">Toyota Deals</span>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded">
        <div className="absolute inset-0 rounded">
          <Image src="/deals.jpg" alt="Tire deals background" fill className="object-cover rounded" priority />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-start">
            {/* Left side - Discount amount */}
            <div className="flex items-center space-x-8">
              {/* Left side - Discount percentage */}
              <div className="text-red-600">
                <span className="text-6xl md:text-8xl font-bold">{dealData.discountPercentage}</span>
              </div>

              {/* Brand logo and text */}
              <div className="bg-black px-8 py-4 text-white">
                <div className="text-2xl md:text-3xl font-bold tracking-wider">{dealData.brand.name.toUpperCase()}</div>
              </div>

              {/* <div className="text-gray-700">
                <div className="text-lg md:text-xl font-medium">Online Special</div>
                <div className="text-2xl md:text-3xl font-bold text-red-600">INSTANT SAVINGS</div>
              </div> */}
            </div>

            {/* Right side - Tire image */}
            {/* <div className="hidden md:block">
              <div className="w-64 h-64 relative">
                <Image src="/placeholder.svg?height=256&width=256" alt="Tire" fill className="object-contain" />
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Sign in bar */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button onPress={()=>router.push(`/login?redirect=/deals/${dealData?.brand?._id}`)} variant="bordered" className="text-white w-full justify-center md:w-auto">
            <User className="w-5 h-5 mr-2" />
            Sign in to my account
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="border rounded-lg shadow-sm p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{dealData.brand.name} Tire Deals:</h1>

          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">{dealData.title}</h2>

          <p className="text-gray-600 italic mb-6">
            {dealData.validFrom} – {dealData.validTo}
          </p>

          <div className="space-y-4 mb-8">
            <p className="text-gray-700">
              <span className="font-semibold">Get {dealData.discountPercentage} off</span>{" "}
              {dealData.description.toLowerCase()}
            </p>
      </div>

          <Button onPress={()=>router.push(`/login?redirect=/deals/${dealData?.brand?._id}`)} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold" size="lg">
            SIGN IN TO MY ACCOUNT
          </Button>
        </div>
      </div>
    </div>
  )
}
