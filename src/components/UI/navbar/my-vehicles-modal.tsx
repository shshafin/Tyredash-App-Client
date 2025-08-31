"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Car, AlertCircle, Trash2 } from "lucide-react";
import { Spinner } from "@heroui/spinner";
import { toast } from "sonner";

interface VehicleInfo {
  year: string;
  make: string;
  model: string;
  trim: string;
  tireSize: string;
}

export function VehicleModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [vehicles, setVehicles] = useState<VehicleInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingIndex, setRemovingIndex] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadVehicles();
    }
  }, [isOpen]);

  const loadVehicles = () => {
    setLoading(true);
    setError(null);

    try {
      // Only run in browser environment
      if (typeof window !== "undefined") {
        const savedVehicles = localStorage.getItem("userVehicles");

        if (savedVehicles) {
          const parsedVehicles = JSON.parse(savedVehicles);
          setVehicles(
            Array.isArray(parsedVehicles) ? parsedVehicles : [parsedVehicles]
          );
        } else {
          setVehicles([]);
        }
      }
    } catch (err) {
      console.error("Error loading vehicles from localStorage:", err);
      setError("Could not load your vehicles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveClick = (index: number) => {
    setRemovingIndex(index);
    setShowConfirmation(true);
  };

  const confirmRemove = () => {
    if (removingIndex === null) return;

    try {
      const updatedVehicles = [...vehicles];
      const removedVehicle = updatedVehicles[removingIndex];
      updatedVehicles.splice(removingIndex, 1);

      // Update localStorage
      localStorage.setItem("userVehicles", JSON.stringify(updatedVehicles));

      // Update state
      setVehicles(updatedVehicles);

      // Dispatch a custom event to notify other components
      window.dispatchEvent(new Event("vehiclesUpdated"));

      // Show success message
      toast.success(`Vehicle removed successfully`);

      // Reset confirmation state
      setShowConfirmation(false);
      setRemovingIndex(null);
    } catch (err) {
      console.error("Error removing vehicle:", err);
      toast.error("Failed to remove vehicle. Please try again.");
    }
  };

  const cancelRemove = () => {
    setShowConfirmation(false);
    setRemovingIndex(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg">
      <ModalContent>
        <ModalHeader className="flex items-center gap-2">
          <Car className="h-5 w-5 text-primary" />
          <span>My Vehicles</span>
        </ModalHeader>

        <ModalBody>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Spinner
                color="primary"
                size="lg"
              />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <AlertCircle className="h-10 w-10 text-danger mb-2" />
              <p className="text-danger">{error}</p>
            </div>
          ) : vehicles.length === 0 ? (
            <div className="text-center py-8">
              <Car className="h-16 w-16 mx-auto text-default-300 mb-4" />
              <h3 className="text-xl font-semibold text-default-700 mb-2">
                No Vehicles Found
              </h3>
              <p className="text-default-500 mb-6">
                You haven't added any vehicles yet. Add your first vehicle to
                see it here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {vehicles.map((vehicle, index) => (
                <Card
                  key={index}
                  className="border border-default-200">
                  <CardBody>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-default-700">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </h3>
                        {vehicle.trim && (
                          <p className="text-default-500 text-sm">
                            Trim: {vehicle.trim}
                          </p>
                        )}
                        {vehicle.tireSize && (
                          <p className="text-default-500 text-sm">
                            Tire Size: {vehicle.tireSize}
                          </p>
                        )}
                      </div>
                      <Button
                        color="danger"
                        variant="light"
                        size="sm"
                        startContent={<Trash2 className="h-4 w-4" />}
                        onPress={() => handleRemoveClick(index)}>
                        Remove
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}

          {/* Confirmation Modal */}
          {showConfirmation && removingIndex !== null && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg text-black font-semibold mb-2">
                  Remove Vehicle
                </h3>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to remove this vehicle?
                  {vehicles[removingIndex] && (
                    <span className="font-medium block mt-2">
                      {vehicles[removingIndex].year}{" "}
                      {vehicles[removingIndex].make}{" "}
                      {vehicles[removingIndex].model}
                    </span>
                  )}
                </p>
                <div className="flex justify-end gap-2">
                  <Button
                    color="success"
                    variant="light"
                    onPress={cancelRemove}>
                    Cancel
                  </Button>
                  <Button
                    color="danger"
                    onPress={confirmRemove}>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            color="default"
            variant="light"
            onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
