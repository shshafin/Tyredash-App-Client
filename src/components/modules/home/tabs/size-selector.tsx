"use client"

import { useState, useEffect } from "react"
import { Button } from "@heroui/button"
import { HelpCircle, Loader2 } from 'lucide-react'
import { useGetTireWidths } from "@/src/hooks/tireWidth.hook"
import { useGetTireRatios } from "@/src/hooks/tireRatio.hook"
import { useGetTireDiameters } from "@/src/hooks/tireDiameter.hook"
import { useGetWheelWidths } from "@/src/hooks/wheelWidth.hook"
import { useGetWheelRatios } from "@/src/hooks/wheelRatio.hook"
import { useGetWheelDiameters } from "@/src/hooks/wheelDiameter.hook"

interface SizeSelectorProps {
  setMainStep: (step: any) => void
  selectedSize: any
  setSelectedSize: (size: any) => void
}

const SizeSelector = ({ setMainStep, selectedSize, setSelectedSize }: SizeSelectorProps) => {
  const [activeStep, setActiveStep] = useState(1)
  const [selectedWidth, setSelectedWidth] = useState<any>(null)
  const [selectedRatio, setSelectedRatio] = useState<any>(null)
  const [selectedDiameter, setSelectedDiameter] = useState<any>(null)
  const [productType, setProductType] = useState("tire")
  const [showAllWidths, setShowAllWidths] = useState(false)

  // Tire size hooks
  const {
    data: tireWidths = {},
    isLoading: tireWidthsLoading,
    isError: tireWidthsError,
  } = useGetTireWidths({})

  const {
    data: tireRatios = {},
    isLoading: tireRatiosLoading,
    isError: tireRatiosError,
  } = useGetTireRatios({});

  const {
    data: tireDiameters = {},
    isLoading: tireDiametersLoading,
    isError: tireDiametersError,
  } = useGetTireDiameters({});

  // Wheel size hooks
  const {
    data: wheelWidths = {},
    isLoading: wheelWidthsLoading,
    isError: wheelWidthsError,
  } = useGetWheelWidths({})

  const {
    data: wheelRatios = {},
    isLoading: wheelRatiosLoading,
    isError: wheelRatiosError,
  } = useGetWheelRatios({});

  const {
    data: wheelDiameters = {},
    isLoading: wheelDiametersLoading,
    isError: wheelDiametersError,
  } = useGetWheelDiameters({});

  // Determine current options and loading/error states based on product type
  const widthOptions = productType === "tire" ? tireWidths?.data || [] : wheelWidths?.data || []
  const ratioOptions = productType === "tire" ? tireRatios?.data || [] : wheelRatios?.data || []
  const diameterOptions = productType === "tire" ? tireDiameters?.data || [] : wheelDiameters?.data || []
  const isWidthLoading = productType === "tire" ? tireWidthsLoading : wheelWidthsLoading
  const isRatioLoading = productType === "tire" ? tireRatiosLoading : wheelRatiosLoading
  const isDiameterLoading = productType === "tire" ? tireDiametersLoading : wheelDiametersLoading

  const isWidthError = productType === "tire" ? tireWidthsError : wheelWidthsError
  const isRatioError = productType === "tire" ? tireRatiosError : wheelRatiosError
  const isDiameterError = productType === "tire" ? tireDiametersError : wheelDiametersError

  const isLoading =
    isWidthLoading ||
    (activeStep === 2 && isRatioLoading) ||
    (activeStep === 3 && isDiameterLoading)

  const isError =
    isWidthError ||
    (activeStep === 2 && isRatioError) ||
    (activeStep === 3 && isDiameterError)

  // Limit displayed widths if there are many
  const displayedWidths = showAllWidths ? widthOptions : widthOptions.slice(0, 18)

  // Reset selections when product type changes
  useEffect(() => {
    setSelectedWidth("")
    setSelectedRatio("")
    setSelectedDiameter("")
    setActiveStep(1)
    setShowAllWidths(false)
  }, [productType])

  const handleWidthSelect = (width: string) => {
    setSelectedWidth(width)
    setSelectedRatio("")
    setSelectedDiameter("")
    setActiveStep(2)
  }

  const handleRatioSelect = (ratio: string) => {
    setSelectedRatio(ratio)
    setSelectedDiameter("")
    setActiveStep(3)
  }

  const handleDiameterSelect = (diameter: string) => {
    setSelectedDiameter(diameter)
  }

  const handleViewProducts = () => {
    setSelectedSize({
      width: selectedWidth,
      ratio: selectedRatio,
      diameter: selectedDiameter,
      productType,
    })
    // Navigate to results or next step
    setMainStep(3)
  }

  const canProceed = selectedWidth && selectedRatio && selectedDiameter

  const resetToStep = (step: number) => {
    setActiveStep(step)
    if (step === 1) {
      setSelectedWidth("")
      setSelectedRatio("")
      setSelectedDiameter("")
    } else if (step === 2) {
      setSelectedRatio("")
      setSelectedDiameter("")
    } else if (step === 3) {
      setSelectedDiameter("")
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Product Type Toggle */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <Button
            className={`px-8 py-2 rounded-md transition-colors ${
              productType === "tire" ? "bg-slate-600 text-white" : "bg-transparent text-gray-600 hover:bg-gray-200"
            }`}
            onPress={() => setProductType("tire")}
          >
            Tire
          </Button>
          <Button
            className={`px-8 py-2 rounded-md transition-colors ${
              productType === "wheel" ? "bg-slate-600 text-white" : "bg-transparent text-gray-600 hover:bg-gray-200"
            }`}
            onPress={() => setProductType("wheel")}
          >
            Wheel
          </Button>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-center mb-8 gap-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer ${
              activeStep >= 1 ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"
            }`}
            onClick={() => resetToStep(1)}
          >
            1
          </div>
          <span className={`font-medium ${activeStep >= 1 ? "text-gray-800" : "text-gray-400"}`}>Width</span>
        </div>

        <div className="w-8 h-0.5 bg-gray-300"></div>

        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer ${
              activeStep >= 2 ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"
            }`}
            onClick={() => selectedWidth && resetToStep(2)}
          >
            2
          </div>
          <span className={`font-medium ${activeStep >= 2 ? "text-gray-800" : "text-gray-400"}`}>Ratio</span>
        </div>

        <div className="w-8 h-0.5 bg-gray-300"></div>

        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer ${
              activeStep >= 3 ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"
            }`}
            onClick={() => selectedRatio && resetToStep(3)}
          >
            3
          </div>
          <span className={`font-medium ${activeStep >= 3 ? "text-gray-800" : "text-gray-400"}`}>Diameter</span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="ml-4 text-blue-600 gap-1"
          startContent={<HelpCircle className="h-4 w-4" />}
        >
          need help?
        </Button>
      </div>

      {/* Selected Size Display */}
      {(selectedWidth || selectedRatio || selectedDiameter) && (
        <div className="text-center mb-6">
          <div className="text-lg font-semibold text-gray-700">
            Selected Size:{" "}
            {productType === "tire" ? (
              <>
                {selectedWidth?.width || "___"}/{selectedRatio?.ratio || "__"}R{selectedDiameter?.diameter || "__"}
              </>
            ) : (
              <>
                {selectedWidth?.width || "___"}/{selectedRatio?.ratio || "__"}x{selectedDiameter?.diameter || "__"}
              </>
            )}
          </div>
        </div>
      )}

      {/* Step 1: Width Selection */}
      {activeStep === 1 && (
        <div>
          <h3 className="text-xl font-semibold text-center mb-6">
            Select {productType === "tire" ? "Tire" : "Wheel"} Width
          </h3>

          {isWidthLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : isWidthError ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">Failed to load width options</p>
              <Button color="primary" onPress={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          ) : widthOptions.length > 0 ? (
            <>
              <div className="grid grid-cols-6 gap-3 mb-6">
                {displayedWidths.map((width: any) => (
                  <Button
                    key={width._id}
                    variant="bordered"
                    className={`h-12 ${
                      selectedWidth === width?._id
                        ? "border-orange-500 bg-orange-50 text-orange-600"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onPress={() => handleWidthSelect(width)}
                  >
                    {width?.width}
                    {productType === "wheel" && '"'}
                  </Button>
                ))}
              </div>
              {widthOptions.length > 18 && !showAllWidths && (
                <div className="text-center">
                  <Button variant="ghost" className="text-blue-600" onPress={() => setShowAllWidths(true)}>
                    + see all
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">No width options available</div>
          )}
        </div>
      )}

      {/* Step 2: Ratio Selection (Both Tires and Wheels) */}
      {activeStep === 2 && (
        <div>
          <h3 className="text-xl font-semibold text-center mb-6">
            Select {productType === "tire" ? "Aspect Ratio" : "Wheel Ratio"}
          </h3>

          {isRatioLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : isRatioError ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">Failed to load ratio options</p>
              <Button color="primary" onPress={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          ) : ratioOptions.length > 0 ? (
            <div className="grid grid-cols-6 gap-3 mb-6">
              {ratioOptions.map((ratio: any) => (
                <Button
                  key={ratio?._id}
                  variant="bordered"
                  className={`h-12 ${
                    selectedRatio === ratio?._id
                      ? "border-orange-500 bg-orange-50 text-orange-600"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onPress={() => handleRatioSelect(ratio)}
                >
                  {ratio?.ratio}
                </Button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No ratio options available for the selected width</div>
          )}
        </div>
      )}

      {/* Step 3: Diameter Selection */}
      {activeStep === 3 && (
        <div>
          <h3 className="text-xl font-semibold text-center mb-6">Select Rim Diameter</h3>

          {isDiameterLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : isDiameterError ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">Failed to load diameter options</p>
              <Button color="primary" onPress={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          ) : diameterOptions.length > 0 ? (
            <div className="grid grid-cols-6 gap-3 mb-6">
              {diameterOptions.map((diameter: any) => (
                <Button
                  key={diameter?._id}
                  variant="bordered"
                  className={`h-12 ${
                    selectedDiameter === diameter?._id
                      ? "border-orange-500 bg-orange-50 text-orange-600"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onPress={() => handleDiameterSelect(diameter)}
                >
                  {diameter?.diameter}"
                </Button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No diameter options available for the selected width and ratio
            </div>
          )}
        </div>
      )}

      {/* View Products Button */}
      {canProceed && (
        <div className="text-center mt-8">
          <Button
            color="primary"
            size="lg"
            className="px-12 py-3 bg-red-400 hover:bg-red-500"
            onPress={handleViewProducts}
          >
            VIEW {productType.toUpperCase()}
          </Button>
        </div>
      )}
    </div>
  )
}

export default SizeSelector