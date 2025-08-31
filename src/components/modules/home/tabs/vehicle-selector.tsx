"use client";

import { useGetMakes } from "@/src/hooks/makes.hook";
import { useGetModels } from "@/src/hooks/model.hook";
import { useGetTrims } from "@/src/hooks/trim.hook";
import {
  useGetFilteredTyreSizes,
  useGetTyreSizes,
} from "@/src/hooks/tyreSize.hook";
import { useGetYears } from "@/src/hooks/years.hook";
import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { CheckCircle, Car, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const VehicleSelector = ({ setMainStep, vehicle, setVehicle }: any) => {
  const [step, setStep] = useState(1);
  const [vehicleSaved, setVehicleSaved] = useState(false);

  const {
    data: years,
    isLoading: isYearsLoading,
    isError: isYearsError,
  } = useGetYears({});
  const {
    data: makes,
    isLoading: isMakesLoading,
    isError: isMakesError,
  } = useGetMakes({ year: vehicle.year });
  const {
    data: models,
    isLoading: isModelsLoading,
    isError: isModelsError,
  } = useGetModels({ make: vehicle.make });
  const {
    data: trims,
    isLoading: isTrimsLoading,
    isError: isTrimsError,
  } = useGetTrims({ model: vehicle.model });
  const {
    data: tyreSizes,
    isLoading: isTyreSizesLoading,
    isError: isTyreSizesError,
  } = useGetTyreSizes({ trim: vehicle.trim });
  // const {
  //   data: tyreSizes,
  //   isLoading: isTyreSizesLoading,
  //   isError: isTyreSizesError,
  // } = useGetFilteredTyreSizes(
  //   vehicle.year,
  //   vehicle.make,
  //   vehicle.model,
  //   vehicle.trim,
  // );
  const steps = ["Year", "Make", "Model", "Trim", "Tire Size"];

  console.log(tyreSizes);

  const handleStepClick = (stepIndex: number) => {
    // Only allow going back to previous steps or current step
    if (stepIndex <= step) {
      setStep(stepIndex);
    }
  };

  const handleSelectChange = (key: string, value: string) => {
    // Update the vehicle state with the new value
    const updatedVehicle = { ...vehicle, [key]: value };
    setVehicle(updatedVehicle);

    // If this is the last step (tire size), save to localStorage and show the card
    if (key === "tireSize") {
      saveVehicleToLocalStorage(updatedVehicle);
      setVehicleSaved(true);
    } else {
      // Otherwise, move to the next step
      setStep(step + 1);
    }
  };

  const saveVehicleToLocalStorage = (vehicleData: any) => {
    try {
      // Check if localStorage is available
      if (typeof window !== "undefined") {
        // Get existing vehicles from localStorage
        const existingVehiclesJSON = localStorage.getItem("userVehicles");
        let vehicles = [];

        if (existingVehiclesJSON) {
          // Parse existing vehicles
          const existingVehicles = JSON.parse(existingVehiclesJSON);
          // Check if it's an array or a single object
          vehicles = Array.isArray(existingVehicles)
            ? existingVehicles
            : [existingVehicles];
        }

        // Check if this vehicle already exists (by comparing all fields)
        const vehicleExists = vehicles.some(
          (v: any) =>
            v.year === vehicleData.year &&
            v.make === vehicleData.make &&
            v.model === vehicleData.model &&
            v.trim === vehicleData.trim &&
            v.tireSize === vehicleData.tireSize
        );

        if (!vehicleExists) {
          // Add the new vehicle
          vehicles.push(vehicleData);
          // Save back to localStorage
          localStorage.setItem("userVehicles", JSON.stringify(vehicles));

          // Dispatch custom event to notify other components about the change
          window.dispatchEvent(new Event("vehiclesUpdated"));

          // Show success toast
          toast.success("Vehicle added successfully!");
        } else {
          // Vehicle already exists
          toast.info("This vehicle is already saved.");
        }
      }
    } catch (error) {
      console.error("Error saving vehicle to localStorage:", error);
      toast.error("Failed to save your vehicle. Please try again.");
    }
  };

  const handleContinueShopping = () => {
    setMainStep(3);
  };

  const handleReset = () => {
    setVehicle({
      year: "",
      make: "",
      model: "",
      trim: "",
      tireSize: "",
    });
    setVehicleSaved(false);
    setStep(1);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {!vehicleSaved ? (
        <>
          <div className="flex flex-wrap justify-center items-center gap-3 mb-5">
            {steps.map((label, index) => (
              <div
                key={index}
                className={`flex items-center cursor-pointer ${step >= index + 1 ? "text-green-500" : "text-gray-400"}`}
                onClick={() => handleStepClick(index + 1)}>
                <div
                  className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                    step === index + 1
                      ? "border-orange-500"
                      : step > index + 1
                        ? "border-green-500"
                        : "border-gray-400"
                  }`}>
                  {index + 1}
                </div>
                <span className="ml-2 text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <h2 className="text-lg text-gray-700 md:text-xl font-bold mb-2">
              {vehicle?.year} {vehicle?.make}
            </h2>
            <h2 className="text-lg text-gray-700 md:text-xl font-bold mb-2">
              {vehicle?.model} {vehicle?.trim}
            </h2>
            <h2 className="text-lg text-black md:text-xl font-bold mb-4">
              Tire Size: {vehicle?.tireSize}
            </h2>

            {step !== 6 && (
              <p className="mb-2 text-gray-700">
                What is the
                <span className="font-bold">
                  {step === 1 && " year "}
                  {step === 2 && " make "}
                  {step === 3 && " model "}
                  {step === 4 && " trim "}
                  {step === 5 && " tire size "}
                </span>
                of your vehicle?
              </p>
            )}

            <div className="flex justify-center mt-4">
              {step === 1 && (
                <select
                  className="w-[200px] border focus:border-orange-500 focus:outline-none rounded-md px-2 py-2"
                  value={vehicle.year}
                  onChange={(e) => handleSelectChange("year", e.target.value)}>
                  <option value="">*Year</option>
                  {isYearsLoading && <option value="">Loading Years...</option>}
                  {isYearsError && (
                    <option value="">Failed to load Years</option>
                  )}
                  {years?.data?.map((y: any, index: number) => (
                    <option
                      key={index}
                      value={y?.year}>
                      {y?.year}
                    </option>
                  ))}
                </select>
              )}
              {step === 2 && (
                <select
                  className="w-[200px] border focus:border-orange-500 focus:outline-none rounded-md px-2 py-2"
                  value={vehicle.make}
                  onChange={(e) => handleSelectChange("make", e.target.value)}>
                  <option value="">*Make</option>
                  {isMakesLoading && <option value="">Loading Makes...</option>}
                  {isMakesError && (
                    <option value="">Failed to load Makes</option>
                  )}
                  {makes?.data?.map((m: any, index: number) => (
                    <option
                      key={index}
                      value={m?.make}>
                      {m?.make}
                    </option>
                  ))}
                </select>
              )}
              {step === 3 && (
                <select
                  className="w-[200px] border focus:border-orange-500 focus:outline-none rounded-md px-2 py-2"
                  value={vehicle.model}
                  onChange={(e) => handleSelectChange("model", e.target.value)}>
                  <option value="">*Model</option>
                  {isModelsLoading && (
                    <option value="">Loading Models...</option>
                  )}
                  {isModelsError && (
                    <option value="">Failed to load Models</option>
                  )}
                  {models?.data
                    ?.filter((m: any) => {
                      // Filter by selected year and make
                      const yearMatch = m.year?.year === Number(vehicle.year);
                      const makeMatch = m.make?.make === vehicle.make;
                      return yearMatch && makeMatch;
                    })
                    .map((m: any, index: number) => (
                      <option
                        key={index}
                        value={m?.model}>
                        {m?.model}
                      </option>
                    ))}
                </select>
              )}
              {step === 4 && (
                <select
                  className="w-[200px] border focus:border-orange-500 focus:outline-none rounded-md px-2 py-2"
                  value={vehicle.trim}
                  onChange={(e) => handleSelectChange("trim", e.target.value)}>
                  <option value="">*Trim</option>
                  {isTrimsLoading && <option value="">Loading Trims...</option>}
                  {isTrimsError && (
                    <option value="">Failed to load Trims</option>
                  )}
                  {trims?.data
                    ?.filter((t: any) => {
                      // Filter by selected year, make, and model
                      const yearMatch = t.year?.year === Number(vehicle.year);
                      const makeMatch = t.make?.make === vehicle.make;
                      const modelMatch = t.model?.model === vehicle.model;
                      return yearMatch && makeMatch && modelMatch;
                    })
                    .map((t: any, index: number) => (
                      <option
                        key={index}
                        value={t?.trim}>
                        {t?.trim}
                      </option>
                    ))}
                </select>
              )}
              {step === 5 && (
                <select
                  className="w-[200px] border focus:border-orange-500 focus:outline-none rounded-md px-2 py-2"
                  value={vehicle.tireSize}
                  onChange={(e) =>
                    handleSelectChange("tireSize", e.target.value)
                  }>
                  <option value="">*Tire Size</option>
                  {isTyreSizesLoading && (
                    <option value="">Loading Tire Sizes...</option>
                  )}
                  {isTyreSizesError && (
                    <option value="">Failed to load Tire Sizes</option>
                  )}
                  {tyreSizes?.data
                    ?.filter((t: any) => {
                      // Filter by selected year, make, model, and trim
                      const yearMatch = t.year?.year === Number(vehicle.year);
                      const makeMatch = t.make?.make === vehicle.make;
                      const modelMatch = t.model?.model === vehicle.model;
                      const trimMatch = t.trim?.trim === vehicle.trim;
                      return yearMatch && makeMatch && modelMatch && trimMatch;
                    })
                    .map((t: any, index: number) => (
                      <option
                        key={index}
                        value={t?.tireSize}>
                        {t?.tireSize}
                      </option>
                    ))}
                  <option value="Not Found">Didn't find your tire size?</option>
                </select>
              )}
            </div>
          </div>
        </>
      ) : (
        <Card className="shadow-none">
          <CardBody>
            <div className="flex flex-col items-center text-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Vehicle Added Successfully!
              </h3>
              <p className="text-gray-500 mb-4">
                Your vehicle has been saved and is ready for shopping.
              </p>
            </div>

            <div className="rounded-lg p-5 mb-4">
              <div className="flex items-center justify-center mb-4">
                <Car className="h-6 w-6 text-gray-700 mr-2" />
                <h4 className="text-lg text-default-500 font-semibold">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="border p-3 rounded-md shadow-sm">
                  <p className="font-medium">Year</p>
                  <p className="font-bold">{vehicle.year}</p>
                </div>
                <div className="border p-3 rounded-md shadow-sm">
                  <p className="font-medium">Make</p>
                  <p className="font-bold">{vehicle.make}</p>
                </div>
                <div className="border p-3 rounded-md shadow-sm">
                  <p className="font-medium">Model</p>
                  <p className="font-bold">{vehicle.model}</p>
                </div>
                <div className="border p-3 rounded-md shadow-sm">
                  <p className="font-medium">Trim</p>
                  <p className="font-bold">{vehicle.trim || "N/A"}</p>
                </div>
                <div className="border p-3 rounded-md shadow-sm col-span-1 sm:col-span-2">
                  <p className="font-medium">Tire Size</p>
                  <p className="font-bold">{vehicle.tireSize}</p>
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 border-t pt-4">
            <Button
              color="default"
              variant="bordered"
              onPress={handleReset}
              startContent={<ArrowLeft className="h-4 w-4" />}
              className="w-full sm:w-auto">
              Select Another Vehicle
            </Button>
            <Button
              color="primary"
              onPress={handleContinueShopping}
              endContent={<ArrowRight className="h-4 w-4" />}
              className="bg-red-500 hover:bg-red-600 w-full sm:w-auto">
              Continue Shopping
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default VehicleSelector;
