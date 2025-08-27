"use client";

import { useState } from "react";
import { NavbarItem } from "@heroui/navbar";
import NextLink from "next/link";
import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";
import { link as linkStyles } from "@heroui/theme";
import { siteConfig } from "@/src/config/site";
import { useGetBrands } from "@/src/hooks/brand.hook";
import { useGetCategories } from "@/src/hooks/categories.hook";
import { useGetTyreSizes } from "@/src/hooks/tyreSize.hook";
import { useGetMakes } from "@/src/hooks/makes.hook";
import { useGetVehicleTypes } from "@/src/hooks/vehicleType.hook";
import { useGetWheelWidthTypes } from "@/src/hooks/wheelWhidthType";

const TireDropdown = () => {
  const [activeTab, setActiveTab] = useState("vehicle");
  const { data: bd } = useGetBrands({ limit: 6 });
  const { data: cd } = useGetCategories({ limit: 6 });
  const { data: vtd } = useGetVehicleTypes({ limit: 6 });
  const { data: tsd } = useGetTyreSizes({});
  const modifiedBrands = bd?.data?.map((brand: any, index: number) => {
    return {
      id: brand?._id,
      name: brand?.name || "",
      href: `/tire?brand=${brand?._id}`,
    };
  });
  const modifiedCategories = cd?.data?.map((cat: any, index: number) => {
    return {
      id: cat?._id,
      name: cat?.name || "",
      href: `/tire?category=${cat?._id}`,
    };
  });
  const modifiedTireSizes = tsd?.data?.map((ts: any, index: number) => {
    return {
      id: ts?._id,
      name: ts?.tireSize || "",
      href: `/tire?tireSize=${ts?._id}`,
    };
  });
  const modifiedVehicleTypes = vtd?.data?.map((vt: any, index: number) => {
    return {
      id: vt?._id,
      name: vt?.vehicleType || "",
      href: `/tire?vehicleType=${vt?._id}`,
    };
  });
  const tireDropdownData = {
    // Tire dropdown data with tabs
    tabs: [
      {
        id: "vehicle",
        title: "SHOP BY VEHICLE",
        content: {
          sections: [
            {
              title: "VEHICLE TYPE",
              items: modifiedVehicleTypes || [],
            },
            {
              title: "Tire Type",
              items: modifiedCategories || [],
            },
          ],
        },
      },
      {
        id: "size",
        title: "SHOP BY SIZE",
        content: {
          sections: [
            {
              title: "POPULAR SIZES",
              items: modifiedTireSizes || [],
            },
          ],
        },
      },
    ],
    brands: modifiedBrands || [],
  };
  const activeTabData = tireDropdownData.tabs.find(
    (tab) => tab.id === activeTab
  );
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-[900px]">
      <div className="grid grid-cols-4 gap-6">
        {/* Left Tabs Section */}
        <div className="space-y-2">
          {tireDropdownData.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "block w-full text-left text-sm font-medium px-3 py-2 rounded transition-colors",
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}>
              {tab.title}
            </button>
          ))}
        </div>

        {/* Right Content Section */}
        <div className="col-span-3">
          {activeTabData && (
            <div className="grid grid-cols-3 gap-6">
              {/* Dynamic Content Sections */}
              {activeTabData.content.sections.map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-800 mb-3 text-sm">
                    {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.items.map((item: any, itemIndex: number) => (
                      <NextLink
                        key={itemIndex}
                        href={item.href}
                        className="block text-sm text-gray-600 hover:text-primary transition-colors">
                        {item.name}
                      </NextLink>
                    ))}
                  </div>
                </div>
              ))}

              {/* Static Brands Column (always show for some tabs) */}
              {(activeTab === "finder" || activeTab === "vehicle") && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 text-sm">
                    TIRE BRANDS
                  </h3>
                  <div className="space-y-2">
                    {tireDropdownData.brands.map((brand: any, index: any) => (
                      <NextLink
                        key={index}
                        href={brand.href}
                        className="block text-sm text-gray-600 hover:text-primary transition-colors">
                        {brand.name}
                      </NextLink>
                    ))}
                    {/* <NextLink
                      href="/tire/brands"
                      className="block text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View All Brands
                    </NextLink> */}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WheelDropdown = () => {
  const [activeTab, setActiveTab] = useState("shop");
  const { data: bd } = useGetBrands({ limit: 6 });
  const { data: tsd } = useGetTyreSizes({});
  const { data: md } = useGetMakes({ limit: 6 });
  const { data: vtd } = useGetVehicleTypes({ limit: 6 });
  const { data: wwt } = useGetWheelWidthTypes({ limit: 6 });
  const modifiedBrands = bd?.data?.map((brand: any, index: number) => {
    return {
      id: brand?._id,
      name: brand?.name || "",
      href: `/wheel?brand=${brand?._id}`,
    };
  });
  const modifiedWheelWidthTypes = wwt?.data?.map((ww: any, index: number) => {
    return {
      id: ww?._id,
      name: ww?.widthType || "",
      href: `/wheel?widthType=${ww?._id}`,
    };
  });
  const modifiedTireSizes = tsd?.data?.map((ts: any, index: number) => {
    return {
      id: ts?._id,
      name: ts?.tireSize || "",
      href: `/wheel?tireSize=${ts?._id}`,
    };
  });
  const modifiedMakes = md?.data?.map((ts: any, index: number) => {
    return {
      id: ts?._id,
      name: ts?.make || "",
      href: `/wheel?make=${ts?._id}`,
    };
  });
  const modifiedVehicleTypes = vtd?.data?.map((vt: any, index: number) => {
    return {
      id: vt?._id,
      name: vt?.vehicleType || "",
      href: `/tire?vehicleType=${vt?._id}`,
    };
  });
  const wheelDropdownData = {
    tabs: [
      {
        id: "shop",
        title: "SHOP WHEELS",
        content: {
          sections: [
            {
              title: "WHEEL STYLE",
              items: modifiedWheelWidthTypes || [],
            },
            {
              title: "VEHICLE TYPES",
              items: modifiedVehicleTypes || [],
            },
          ],
        },
      },
      {
        id: "vehicle",
        title: "SHOP BY VEHICLE",
        content: {
          sections: [
            {
              title: "VEHICLE TYPE",
              items: modifiedVehicleTypes || [],
            },
            {
              title: "POPULAR MAKES",
              items: modifiedMakes || [],
            },
          ],
        },
      },
      {
        id: "size",
        title: "SHOP BY SIZE",
        content: {
          sections: [
            {
              title: "POPULAR SIZES",
              items: modifiedTireSizes || [],
            },
          ],
        },
      },
    ],
    brands: modifiedBrands || [],
  };
  const activeTabData = wheelDropdownData.tabs.find(
    (tab) => tab.id === activeTab
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-[900px]">
      <div className="grid grid-cols-4 gap-6">
        {/* Left Tabs Section */}
        <div className="space-y-2">
          {wheelDropdownData.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "block w-full text-left text-sm font-medium px-3 py-2 rounded transition-colors",
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}>
              {tab.title}
            </button>
          ))}
        </div>

        {/* Right Content Section */}
        <div className="col-span-3">
          {activeTabData && (
            <div className="grid grid-cols-3 gap-6">
              {/* Dynamic Content Sections */}
              {activeTabData.content.sections.map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-800 mb-3 text-sm">
                    {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.items.map((item: any, itemIndex: number) => (
                      <NextLink
                        key={itemIndex}
                        href={item.href}
                        className="block text-sm text-gray-600 hover:text-primary transition-colors">
                        {item.name}
                      </NextLink>
                    ))}
                  </div>
                </div>
              ))}

              {/* Static Brands/Styles Column (always show for some tabs) */}
              {(activeTab === "shop" || activeTab === "vehicle") && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 text-sm">
                    WHEEL BRANDS
                  </h3>
                  <div className="space-y-2">
                    {wheelDropdownData.brands.map(
                      (brand: any, index: number) => (
                        <NextLink
                          key={index}
                          href={brand.href}
                          className="block text-sm text-gray-600 hover:text-primary transition-colors">
                          {brand.name}
                        </NextLink>
                      )
                    )}
                    {/* <NextLink
                      href="/wheel/brands"
                      className="block text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View All Brands
                    </NextLink> */}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AccessoriesDropdown = () => {
  const [activeTab, setActiveTab] = useState("tire-accessories");

  const accessoriesTabs = [
    {
      id: "tire-accessories",
      title: "TIRE ACCESSORIES",
      content: [
        { name: "Tire Pressure Monitors", href: "/accessories/tire/tpms" },
        { name: "Tire Chains", href: "/accessories/tire/chains" },
        { name: "Tire Covers", href: "/accessories/tire/covers" },
        { name: "Valve Stems", href: "/accessories/tire/valve-stems" },
      ],
    },
    {
      id: "wheel-accessories",
      title: "WHEEL ACCESSORIES",
      content: [
        { name: "Lug Nuts", href: "/accessories/wheel/lug-nuts" },
        { name: "Center Caps", href: "/accessories/wheel/center-caps" },
        { name: "Wheel Locks", href: "/accessories/wheel/locks" },
        { name: "Spacers", href: "/accessories/wheel/spacers" },
      ],
    },
    {
      id: "tools",
      title: "TOOLS & EQUIPMENT",
      content: [
        { name: "Tire Irons", href: "/accessories/tools/tire-irons" },
        { name: "Jack Stands", href: "/accessories/tools/jack-stands" },
        { name: "Torque Wrenches", href: "/accessories/tools/torque-wrenches" },
        { name: "Tire Gauges", href: "/accessories/tools/gauges" },
      ],
    },
  ];

  const activeTabData = accessoriesTabs.find((tab) => tab.id === activeTab);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-[600px]">
      <div className="grid grid-cols-3 gap-4">
        {/* Left Tabs */}
        <div className="space-y-2">
          {accessoriesTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "block w-full text-left text-sm font-medium px-3 py-2 rounded transition-colors",
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}>
              {tab.title}
            </button>
          ))}
        </div>

        {/* Right Content */}
        <div className="col-span-2">
          {activeTabData && (
            <div className="space-y-2">
              {activeTabData.content.map((item, index) => (
                <NextLink
                  key={index}
                  href={item.href}
                  className="block text-sm text-gray-600 hover:text-primary transition-colors">
                  {item.name}
                </NextLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FinancingDropdown = () => {
  const [activeTab, setActiveTab] = useState("options");

  const financingTabs = [
    {
      id: "options",
      title: "FINANCING OPTIONS",
      content: [
        { name: "0% APR Financing", href: "/financing/zero-apr" },
        { name: "Low Monthly Payments", href: "/financing/low-payments" },
        { name: "No Credit Check", href: "/financing/no-credit-check" },
        { name: "Bad Credit OK", href: "/financing/bad-credit" },
      ],
    },
    {
      id: "apply",
      title: "APPLY NOW",
      content: [
        { name: "Quick Application", href: "/financing/apply/quick" },
        { name: "Pre-Qualification", href: "/financing/apply/prequalify" },
        { name: "Check Your Rate", href: "/financing/apply/check-rate" },
        { name: "Application Status", href: "/financing/apply/status" },
      ],
    },
    {
      id: "tools",
      title: "TOOLS & CALCULATORS",
      content: [
        { name: "Payment Calculator", href: "/financing/calculator" },
        { name: "Credit Score Check", href: "/financing/credit-check" },
        { name: "Trade-In Value", href: "/financing/trade-in" },
        { name: "Rebates & Offers", href: "/financing/rebates" },
      ],
    },
  ];

  const activeTabData = financingTabs.find((tab) => tab.id === activeTab);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-[500px]">
      <div className="grid grid-cols-2 gap-4">
        {/* Left Tabs */}
        <div className="space-y-2">
          {financingTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "block w-full text-left text-sm font-medium px-3 py-2 rounded transition-colors",
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}>
              {tab.title}
            </button>
          ))}
        </div>

        {/* Right Content */}
        <div>
          {activeTabData && (
            <div className="space-y-2">
              {activeTabData.content.map((item, index) => (
                <NextLink
                  key={index}
                  href={item.href}
                  className="block text-sm text-gray-600 hover:text-primary transition-colors">
                  {item.name}
                </NextLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DeskTopNavItems = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const renderDropdown = (label: string) => {
    switch (label) {
      case "TIRES":
        return <TireDropdown />;
      case "WHEELS":
        return <WheelDropdown />;
      case "ACCESSORIES":
        return <AccessoriesDropdown />;
      case "FINANCING":
        return <FinancingDropdown />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto">
      <ul className="flex gap-3 md:gap-2">
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href}>
            {item.hasDropdown ? (
              <div
                className="relative"
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}>
                <div
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium text-sm md:text-xs bg-default-100 md:px-1 lg:px-2 py-2 rounded-md cursor-pointer flex items-center gap-1"
                  )}>
                  {item.label}
                  <ChevronDown className="h-3 w-3" />
                </div>
                {hoveredItem === item.label && (
                  <div className="absolute top-full left-0 mt-1 z-50">
                    {renderDropdown(item.label)}
                  </div>
                )}
              </div>
            ) : (
              <NextLink
                href={item.href}
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium text-sm md:text-xs bg-default-100 md:px-1 lg:px-2 py-2 rounded-md"
                )}>
                {item.label}
              </NextLink>
            )}
          </NavbarItem>
        ))}
      </ul>
    </div>
  );
};

export default DeskTopNavItems;
