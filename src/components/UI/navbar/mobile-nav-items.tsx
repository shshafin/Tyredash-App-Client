"use client"

import { useState } from "react"
import { NavbarMenuItem } from "@heroui/navbar"
import { Link } from "@heroui/link"
import { Accordion, AccordionItem } from "@heroui/accordion"
import { ChevronDown, ChevronRight, Search, Package } from "lucide-react"
import NextLink from "next/link"
import { Divider } from "@heroui/divider"
import { siteConfig } from "@/src/config/site"
import { useGetBrands } from "@/src/hooks/brand.hook"
import { useGetCategories } from "@/src/hooks/categories.hook"
import { useGetTyreSizes } from "@/src/hooks/tyreSize.hook"
import { useGetMakes } from "@/src/hooks/makes.hook"
import { useGetVehicleTypes } from "@/src/hooks/vehicleType.hook"
import { useGetWheelWidthTypes } from "@/src/hooks/wheelWhidthType"

const MobileTabContent = ({ tabs, activeTab, setActiveTab }: any) => (
  <div className="space-y-4">
    {/* Tab Buttons */}
    <div className="grid grid-cols-2 gap-2">
      {tabs.map((tab: any) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`p-3 rounded-lg text-left transition-colors ${
            activeTab === tab.id ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <div className="font-semibold text-xs">{tab.title}</div>
          {/* <div className="text-xs opacity-80 mt-1">{tab.description}</div> */}
        </button>
      ))}
    </div>

    {/* Active Tab Content */}
    <div className="bg-gray-50 rounded-lg p-4">
      {tabs
        .filter((tab: any) => tab.id === activeTab)
        .map((tab: any) => (
          <div key={tab.id} className="space-y-2">
            <h4 className="font-semibold text-sm text-gray-800 mb-3">{tab.title}</h4>
            {tab.content.map((item: any, index: number) => (
              <NextLink key={index} href={item.href}>
                <div className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-white transition-colors">
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </NextLink>
            ))}
          </div>
        ))}
    </div>
  </div>
)

const MobileCategorySection = ({
  title,
  items,
}: {
  title: string
  items: any[]
}) => (
  <div className="mb-6">
    <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">{title}</h3>
    <div className="space-y-2">
      {items.map((item, index) => (
        <NextLink key={index} href={item.href}>
          <div className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-2">
              {item.icon && <span className="text-lg">{item.icon}</span>}
              <span className="text-sm text-gray-700">{item.name}</span>
              {item.popular && (
                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">Popular</span>
              )}
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        </NextLink>
      ))}
      {/* {showViewAll && viewAllHref && (
        <NextLink href={viewAllHref}>
          <div className="py-2 px-3 text-center">
            <span className="text-sm text-primary font-medium">View All {title}</span>
          </div>
        </NextLink>
      )} */}
    </div>
  </div>
)

const TireMobileDropdown = () => {
  const [activeTab, setActiveTab] = useState("vehicle")
  const {data:bd} = useGetBrands({limit: 6});
  const {data:cd} = useGetCategories({limit: 6});
  const {data:vtd} = useGetVehicleTypes({limit: 6});
  const {data:tsd} = useGetTyreSizes({});
  const modifiedBrands = bd?.data?.map((brand: any, index: number) => {
    return {
      id: brand?._id,
      name: brand?.name || '',
      href: `/tire?brand=${brand?._id}`
    };
  });
  const modifiedCategories = cd?.data?.map((cat: any, index: number) => {
    return {
      id: cat?._id,
      name: cat?.name || '',
      href: `/tire?category=${cat?._id}`
    };
  });  
  const modifiedTireSizes = tsd?.data?.map((ts: any, index: number) => {
    return {
      id: ts?._id,
      name: ts?.tireSize || '',
      href: `/tire?tireSize=${ts?._id}`
    };
  });  
  const modifiedVehicleTypes = vtd?.data?.map((vt: any, index: number) => {
    return {
      id: vt?._id,
      name: vt?.vehicleType || '',
      href: `/tire?vehicleType=${vt?._id}`
    };
  });
  const mobileTireData = {
    tabs: [
      {
        id: "vehicle",
        title: "🚗 SHOP BY VEHICLE",
        description: "Browse by your car model",
        content: modifiedVehicleTypes || [],
      },
      {
        id: "size",
        title: "📏 SHOP BY SIZE",
        description: "Search by tire size",
        content: modifiedTireSizes || [],
      },
    ],
    brands: modifiedBrands || [],
    types: modifiedCategories || [],
  }

  return (
    <div className="px-4 py-2">
      <MobileTabContent tabs={mobileTireData.tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <Accordion variant="splitted" className="px-0 mt-6">
        <AccordionItem
          key="brands"
          aria-label="Tire Brands"
          title={
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="font-semibold">Tire Brands</span>
            </div>
          }
        >
          <MobileCategorySection title="Popular Brands" items={mobileTireData.brands} />
        </AccordionItem>

        <AccordionItem
          key="types"
          aria-label="Tire Types"
          title={
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="font-semibold">Tire Types</span>
            </div>
          }
        >
          <MobileCategorySection title="Tire Categories" items={mobileTireData.types} />
        </AccordionItem>
      </Accordion>
    </div>
  )
}

const WheelMobileDropdown = () => {
  const [activeTab, setActiveTab] = useState("shop")
  const {data:bd} = useGetBrands({limit: 6});
  const {data:tsd} = useGetTyreSizes({});
  const {data:md} = useGetMakes({limit: 6});
  const {data:vtd} = useGetVehicleTypes({limit: 6});
  const {data:wwt} = useGetWheelWidthTypes({limit: 6});
  const modifiedBrands = bd?.data?.map((brand: any, index: number) => {
    return {
      id: brand?._id,
      name: brand?.name || '',
      href: `/wheel?brand=${brand?._id}`
    };
  });
  const modifiedWheelWidthTypes = wwt?.data?.map((ww: any, index: number) => {
    return {
      id: ww?._id,
      name: ww?.widthType || '',
      href: `/wheel?widthType=${ww?._id}`
    };
  });
  const modifiedTireSizes = tsd?.data?.map((ts: any, index: number) => {
    return {
      id: ts?._id,
      name: ts?.tireSize || '',
      href: `/wheel?tireSize=${ts?._id}`
    };
  });
  const modifiedMakes = md?.data?.map((ts: any, index: number) => {
    return {
      id: ts?._id,
      name: ts?.make || '',
      href: `/wheel?make=${ts?._id}`
    };
  });
  const modifiedVehicleTypes = vtd?.data?.map((vt: any, index: number) => {
    return {
      id: vt?._id,
      name: vt?.vehicleType || '',
      href: `/tire?vehicleType=${vt?._id}`
    };
  }); 
  const mobileWheelData = {
  tabs: [
    {
      id: "shop",
      title: "🛒 SHOP WHEELS",
      description: "Browse all wheel categories",
      content: modifiedWheelWidthTypes || [],
    },
    {
      id: "vehicle",
      title: "🚗 SHOP BY VEHICLE",
      description: "Browse by your car model",
      content: modifiedVehicleTypes || [],
    },
    {
      id: "size",
      title: "📏 SHOP BY SIZE",
      description: "Search by wheel size",
      content: modifiedTireSizes || [],
    },
  ],
  brands: modifiedBrands || [],
  styles: modifiedWheelWidthTypes || [],
}

  return (
    <div className="px-4 py-2">
      <MobileTabContent tabs={mobileWheelData.tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <Accordion variant="splitted" className="px-0 mt-6">
        <AccordionItem
          key="brands"
          aria-label="Wheel Brands"
          title={
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="font-semibold">Wheel Brands</span>
            </div>
          }
        >
          <MobileCategorySection title="Popular Brands" items={mobileWheelData.brands} />
        </AccordionItem>

        <AccordionItem
          key="styles"
          aria-label="Wheel Styles"
          title={
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="font-semibold">Wheel Styles</span>
            </div>
          }
        >
          <MobileCategorySection title="Wheel Finishes" items={mobileWheelData.styles} />
        </AccordionItem>
      </Accordion>
    </div>
  )
}

const AccessoriesMobileDropdown = () => {
  const [activeTab, setActiveTab] = useState("tire-accessories")

  const accessoriesTabs = [
    {
      id: "tire-accessories",
      title: "🔧 TIRE ACCESSORIES",
      description: "Tire-related accessories",
      content: [
        { name: "Tire Pressure Monitors", href: "/accessories/tire/tpms" },
        { name: "Tire Chains", href: "/accessories/tire/chains" },
        { name: "Tire Covers", href: "/accessories/tire/covers" },
        { name: "Valve Stems", href: "/accessories/tire/valve-stems" },
      ],
    },
    {
      id: "wheel-accessories",
      title: "⚙️ WHEEL ACCESSORIES",
      description: "Wheel-related accessories",
      content: [
        { name: "Lug Nuts", href: "/accessories/wheel/lug-nuts" },
        { name: "Center Caps", href: "/accessories/wheel/center-caps" },
        { name: "Wheel Locks", href: "/accessories/wheel/locks" },
        { name: "Spacers", href: "/accessories/wheel/spacers" },
      ],
    },
    {
      id: "tools",
      title: "🛠️ TOOLS & EQUIPMENT",
      description: "Installation and maintenance tools",
      content: [
        { name: "Tire Irons", href: "/accessories/tools/tire-irons" },
        { name: "Jack Stands", href: "/accessories/tools/jack-stands" },
        { name: "Torque Wrenches", href: "/accessories/tools/torque-wrenches" },
        { name: "Tire Gauges", href: "/accessories/tools/gauges" },
      ],
    },
  ]

  return (
    <div className="px-4 py-2">
      <MobileTabContent tabs={accessoriesTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

const FinancingMobileDropdown = () => {
  const [activeTab, setActiveTab] = useState("options")

  const financingTabs = [
    {
      id: "options",
      title: "💳 FINANCING OPTIONS",
      description: "Available financing plans",
      content: [
        { name: "0% APR Financing", href: "/financing/zero-apr" },
        { name: "Low Monthly Payments", href: "/financing/low-payments" },
        { name: "No Credit Check", href: "/financing/no-credit-check" },
        { name: "Bad Credit OK", href: "/financing/bad-credit" },
      ],
    },
    {
      id: "apply",
      title: "📝 APPLY NOW",
      description: "Start your application",
      content: [
        { name: "Quick Application", href: "/financing/apply/quick" },
        { name: "Pre-Qualification", href: "/financing/apply/prequalify" },
        { name: "Check Your Rate", href: "/financing/apply/check-rate" },
        { name: "Application Status", href: "/financing/apply/status" },
      ],
    },
    {
      id: "tools",
      title: "🧮 TOOLS & CALCULATORS",
      description: "Financial planning tools",
      content: [
        { name: "Payment Calculator", href: "/financing/calculator" },
        { name: "Credit Score Check", href: "/financing/credit-check" },
        { name: "Trade-In Value", href: "/financing/trade-in" },
        { name: "Rebates & Offers", href: "/financing/rebates" },
      ],
    },
  ]

  return (
    <div className="px-4 py-2">
      <MobileTabContent tabs={financingTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

const MobileNavItems = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))
  }

  const renderDropdownContent = (label: string) => {
    switch (label) {
      case "TIRES":
        return <TireMobileDropdown />
      case "WHEELS":
        return <WheelMobileDropdown />
      case "ACCESSORIES":
        return <AccessoriesMobileDropdown />
      case "FINANCING":
        return <FinancingMobileDropdown />
      default:
        return null
    }
  }

  return (
    <div className="w-full">
      {siteConfig.navMenuItems.map((item, index) => (
        <div key={`${item.label}-${index}`}>
          <NavbarMenuItem>
            {item.hasDropdown ? (
              <div className="w-full">
                <button
                  onClick={() => toggleExpanded(item.label)}
                  className="flex items-center justify-between w-full py-3 px-2 text-left rounded-md transition-colors"
                >
                  <span
                    className={`text-lg font-medium ${
                      index === 2
                        ? "text-primary"
                        : index === siteConfig.navMenuItems.length - 1
                          ? "text-danger"
                          : "text-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${expandedItems.includes(item.label) ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedItems.includes(item.label) && (
                  <div className="mt-2 bg-gray-50 rounded-lg">{renderDropdownContent(item.label)}</div>
                )}
              </div>
            ) : (
              <Link
                color={index === 2 ? "primary" : index === siteConfig.navMenuItems.length - 1 ? "danger" : "foreground"}
                href={item.href}
                size="lg"
                className="block py-3 px-2 w-full"
              >
                {item.label}
              </Link>
            )}
          </NavbarMenuItem>
          {index < siteConfig.navMenuItems.length - 1 && <Divider className="my-1" />}
        </div>
      ))}
    </div>
  )
}

export default MobileNavItems
