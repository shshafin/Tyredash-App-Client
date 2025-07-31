"use client"

import { useState } from "react"
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { Search } from "lucide-react"
import { useGetBrands } from "@/src/hooks/brand.hook"

interface BrandSelectorProps {
  setMainStep: (step: any) => void
  selectedBrand: any
  setSelectedBrand: (brand: any) => void
}

const BrandSelector = ({ setMainStep, selectedBrand, setSelectedBrand }: BrandSelectorProps) => {
  const [productType, setProductType] = useState("tire")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrandName, setSelectedBrandName] = useState<any>(null)
  const {data: bd} = useGetBrands({});
  const currentBrands: any[] = bd?.data || [];

  // Filter brands based on search term
  const filteredBrands = currentBrands.filter((brand) => brand?.name?.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleBrandSelect = (brand: string) => {
    setSelectedBrandName(brand)
    setSelectedBrand({
      brand: brand,
      productType,
    })
  }

  const handleViewProducts = () => {
    if (selectedBrandName) {
      setMainStep(3)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Product Type Toggle */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <Button
            className={`px-8 py-2 rounded-md transition-colors ${
              productType === "tire" ? "bg-slate-600 text-white" : "bg-transparent text-gray-600 hover:bg-gray-200"
            }`}
            onPress={() => {
              setProductType("tire")
              setSelectedBrandName("")
              setSearchTerm("")
            }}
          >
            Tire
          </Button>
          <Button
            className={`px-8 py-2 rounded-md transition-colors ${
              productType === "wheel" ? "bg-slate-600 text-white" : "bg-transparent text-gray-600 hover:bg-gray-200"
            }`}
            onPress={() => {
              setProductType("wheel")
              setSelectedBrandName("")
              setSearchTerm("")
            }}
          >
            Wheel
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <Input
          placeholder={`Search ${productType} brands...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          startContent={<Search className="h-4 w-4 text-gray-400" />}
          className="w-full"
        />
      </div>

      {/* Selected Brand Display */}
      {selectedBrandName && (
        <div className="text-center mb-6">
          <div className="text-lg font-semibold text-gray-700">
            Selected Brand: <span className="text-orange-600">{selectedBrandName?.name}</span>
          </div>
        </div>
      )}

      {/* Brand Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {filteredBrands.map((brand, index) => (
          <Button
            key={index}
            variant="bordered"
            className={`h-14 text-sm font-medium ${
              selectedBrandName?.name === brand?.name
                ? "border-orange-500 bg-orange-50 text-orange-600"
                : "border-gray-300 hover:border-gray-400 text-gray-700"
            }`}
            onPress={() => handleBrandSelect(brand)}
          >
            {brand?.name}
          </Button>
        ))}
      </div>

      {/* No Results Message */}
      {filteredBrands.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No brands found matching "{searchTerm}"</p>
          <Button variant="ghost" className="mt-4 text-blue-600" onPress={() => setSearchTerm("")}>
            Clear search
          </Button>
        </div>
      )}

      {/* Brand Count */}
      <div className="text-center text-gray-500 text-sm mb-6">
        Showing {filteredBrands.length} of {currentBrands.length} {productType} brands
      </div>

      {/* View Products Button */}
      {selectedBrandName && (
        <div className="text-center">
          <Button
            color="primary"
            size="lg"
            className="px-12 py-3 bg-red-400 hover:bg-red-500"
            onPress={handleViewProducts}
          >
            VIEW {selectedBrandName.name.toUpperCase()}
          </Button>
        </div>
      )}
    </div>
  )
}

export default BrandSelector
