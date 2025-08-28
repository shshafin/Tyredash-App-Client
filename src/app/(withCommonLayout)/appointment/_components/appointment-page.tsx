"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { RadioGroup, Radio } from "@heroui/radio";
import { Select, SelectItem } from "@heroui/select";
import { Divider } from "@heroui/divider";
import { Progress } from "@heroui/progress";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import {
  Calendar,
  User,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Car,
  Wrench,
  Shield,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { useCreateAppointment } from "@/src/hooks/appointment.hook";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface AppointmentData {
  services: {
    mostPopularServices: {
      newTireWheelConsultation: boolean;
      tireInspection: boolean;
      tireRotationAndBalance: boolean;
      flatRepair: boolean;
    };
    otherServices: {
      webOrderInstallationPickUp: boolean;
      tirePressureMonitoringSystemService: boolean;
      winterTireChange: boolean;
      tireBalancing: boolean;
      fleetServices: boolean;
      wiperBladeServices: boolean;
    };
    additionalNotes: string;
  };
  schedule: {
    date: string;
    time: string;
    planTo: "waitInStore" | "dropOff" | "";
    someoneElseWillBringCar: boolean;
  };
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2: string;
    zipCode: string;
    city: string;
    state: string;
    country: string;
  };
}

const AppointmentBookingPage = () => {
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    services: {
      mostPopularServices: {
        newTireWheelConsultation: false,
        tireInspection: false,
        tireRotationAndBalance: false,
        flatRepair: false,
      },
      otherServices: {
        webOrderInstallationPickUp: false,
        tirePressureMonitoringSystemService: false,
        winterTireChange: false,
        tireBalancing: false,
        fleetServices: false,
        wiperBladeServices: false,
      },
      additionalNotes: "",
    },
    schedule: {
      date: "",
      time: "",
      planTo: "",
      someoneElseWillBringCar: false,
    },
    user: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      zipCode: "",
      city: "",
      state: "",
      country: "United States",
    },
  });
  const {
    mutate: handleCreateAppointment,
    isPending: createAppointmentPending,
  } = useCreateAppointment({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_APPOINTMENT"] });
      toast.success("Appointment created successfully");
      setCurrentStep(5); // Success step
    },
  }); // Appointment creation handler

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      handleCreateAppointment(appointmentData);
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-600 mb-2">
            Book Your Appointment
          </h1>
          <p className="text-gray-600">
            Schedule your tire and wheel service with our experts
          </p>
        </div>

        {/* Progress Bar */}
        {currentStep <= totalSteps && (
          <div className="mb-8">
            <Progress
              value={progress}
              className="mb-2"
              color="danger"
              size="sm"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
          </div>
        )}

        {/* Step Content */}
        <Card className="shadow-lg">
          {currentStep === 1 && (
            <ServicesStep
              appointmentData={appointmentData}
              setAppointmentData={setAppointmentData}
              onNext={handleNext}
            />
          )}

          {currentStep === 2 && (
            <ScheduleStep
              appointmentData={appointmentData}
              setAppointmentData={setAppointmentData}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}

          {currentStep === 3 && (
            <UserInfoStep
              appointmentData={appointmentData}
              setAppointmentData={setAppointmentData}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}

          {currentStep === 4 && (
            <ReviewStep
              appointmentData={appointmentData}
              onSubmit={handleSubmit}
              onPrevious={handlePrevious}
              createAppointmentPending={createAppointmentPending}
            />
          )}

          {currentStep === 5 && <SuccessStep />}
        </Card>
      </div>
    </div>
  );
};

// Services Selection Step
const ServicesStep = ({ appointmentData, setAppointmentData, onNext }: any) => {
  const mostPopularServices = [
    {
      key: "newTireWheelConsultation",
      label: "New Tire/Wheel Consultation",
      description: "Expert advice on selecting the right tires and wheels",
      icon: <Car className="h-5 w-5" />,
      price: "Free",
    },
    {
      key: "tireInspection",
      label: "Tire Inspection",
      description: "Comprehensive tire health and safety check",
      icon: <Shield className="h-5 w-5" />,
      price: "$25",
    },
    {
      key: "tireRotationAndBalance",
      label: "Tire Rotation & Balance",
      description: "Extend tire life with professional rotation and balancing",
      icon: <RotateCcw className="h-5 w-5" />,
      price: "$75",
    },
    {
      key: "flatRepair",
      label: "Flat Tire Repair",
      description: "Quick and reliable flat tire repair service",
      icon: <AlertTriangle className="h-5 w-5" />,
      price: "$35",
    },
  ];

  const otherServices = [
    {
      key: "webOrderInstallationPickUp",
      label: "Web Order Installation & Pick Up",
      description: "Installation of online purchased tires/wheels",
    },
    {
      key: "tirePressureMonitoringSystemService",
      label: "TPMS Service",
      description: "Tire Pressure Monitoring System maintenance",
    },
    {
      key: "winterTireChange",
      label: "Winter Tire Change",
      description: "Seasonal tire changeover service",
    },
    {
      key: "tireBalancing",
      label: "Tire Balancing",
      description: "Precision wheel balancing service",
    },
    {
      key: "fleetServices",
      label: "Fleet Services",
      description: "Commercial vehicle tire services",
    },
    {
      key: "wiperBladeServices",
      label: "Wiper Blade Services",
      description: "Wiper blade replacement and maintenance",
    },
  ];

  const hasSelectedService =
    Object.values(appointmentData.services.mostPopularServices).some(Boolean) ||
    Object.values(appointmentData.services.otherServices).some(Boolean);

  return (
    <>
      <CardHeader className="pb-4 gap-4">
        <div className="flex items-center gap-2">
          <Wrench className="h-6 w-6 text-red-600" />
          <h2 className="text-2xl font-bold">Select Services</h2>
        </div>
        <p className="text-gray-600">
          Choose the services you need for your vehicle
        </p>
      </CardHeader>

      <CardBody className="space-y-6">
        {/* Most Popular Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-red-600">
            Most Popular Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mostPopularServices.map((service) => (
              <Card
                key={service.key}
                className={`cursor-pointer transition-all ${
                  appointmentData.services.mostPopularServices[
                    service.key as keyof typeof appointmentData.services.mostPopularServices
                  ]
                    ? "border-red-500 bg-red-50 text-black"
                    : "border-gray-200 hover:border-red-300"
                }`}
                isPressable
                onPress={() => {
                  setAppointmentData({
                    ...appointmentData,
                    services: {
                      ...appointmentData.services,
                      mostPopularServices: {
                        ...appointmentData.services.mostPopularServices,
                        [service.key]:
                          !appointmentData.services.mostPopularServices[
                            service.key as keyof typeof appointmentData.services.mostPopularServices
                          ],
                      },
                    },
                  });
                }}>
                <CardBody className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="text-red-600 mt-1">{service.icon}</div>
                      <div>
                        <h4 className="font-medium">{service.label}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-red-600">
                        {service.price}
                      </span>
                      <Checkbox
                        isSelected={
                          appointmentData.services.mostPopularServices[
                            service.key as keyof typeof appointmentData.services.mostPopularServices
                          ]
                        }
                        className="mt-2"
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        <Divider />

        {/* Other Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Other Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {otherServices.map((service) => (
              <Checkbox
                key={service.key}
                isSelected={
                  appointmentData.services.otherServices[
                    service.key as keyof typeof appointmentData.services.otherServices
                  ]
                }
                onValueChange={(checked) => {
                  setAppointmentData({
                    ...appointmentData,
                    services: {
                      ...appointmentData.services,
                      otherServices: {
                        ...appointmentData.services.otherServices,
                        [service.key]: checked,
                      },
                    },
                  });
                }}>
                <div>
                  <span className="font-medium">{service.label}</span>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </Checkbox>
            ))}
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <Textarea
            label="Additional Notes"
            placeholder="Any specific requirements or additional information..."
            value={appointmentData.services.additionalNotes}
            onValueChange={(value) => {
              setAppointmentData({
                ...appointmentData,
                services: {
                  ...appointmentData.services,
                  additionalNotes: value,
                },
              });
            }}
            minRows={3}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-end pt-4">
          <Button
            color="danger"
            onPress={onNext}
            disabled={!hasSelectedService}
            endContent={<ArrowRight className="h-4 w-4" />}>
            Continue to Schedule
          </Button>
        </div>
      </CardBody>
    </>
  );
};

// Schedule Step
const ScheduleStep = ({
  appointmentData,
  setAppointmentData,
  onNext,
  onPrevious,
}: any) => {
  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const isFormValid =
    appointmentData.schedule.date &&
    appointmentData.schedule.time &&
    appointmentData.schedule.planTo;

  return (
    <>
      <CardHeader className="pb-4 gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-red-600" />
          <h2 className="text-2xl font-bold">Schedule Appointment</h2>
        </div>
        <p className="text-gray-600">Choose your preferred date and time</p>
      </CardHeader>

      <CardBody className="space-y-6">
        {/* Date Selection */}
        <div>
          <Input
            type="date"
            label="Preferred Date"
            value={appointmentData.schedule.date}
            onValueChange={(value) => {
              setAppointmentData({
                ...appointmentData,
                schedule: {
                  ...appointmentData.schedule,
                  date: value,
                },
              });
            }}
            min={new Date().toISOString().split("T")[0]}
            isRequired
          />
        </div>

        {/* Time Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Preferred Time
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={
                  appointmentData.schedule.time === time ? "solid" : "bordered"
                }
                color={
                  appointmentData.schedule.time === time ? "danger" : "default"
                }
                onPress={() => {
                  setAppointmentData({
                    ...appointmentData,
                    schedule: {
                      ...appointmentData.schedule,
                      time: time,
                    },
                  });
                }}
                className="h-12">
                {time}
              </Button>
            ))}
          </div>
        </div>

        {/* Plan To */}
        <div>
          <RadioGroup
            label="How would you like to handle your appointment?"
            value={appointmentData.schedule.planTo}
            onValueChange={(value: any) => {
              setAppointmentData({
                ...appointmentData,
                schedule: {
                  ...appointmentData.schedule,
                  planTo: value as "waitInStore" | "dropOff",
                },
              });
            }}
            isRequired>
            <Radio value="waitInStore">
              <div>
                <span className="font-medium">Wait in Store</span>
                <p className="text-sm text-gray-600">
                  Stay while we service your vehicle
                </p>
              </div>
            </Radio>
            <Radio value="dropOff">
              <div>
                <span className="font-medium">Drop Off</span>
                <p className="text-sm text-gray-600">
                  Leave your vehicle and pick it up later
                </p>
              </div>
            </Radio>
          </RadioGroup>
        </div>

        {/* Someone Else Bringing Car */}
        <div>
          <Checkbox
            isSelected={appointmentData.schedule.someoneElseWillBringCar}
            onValueChange={(checked) => {
              setAppointmentData({
                ...appointmentData,
                schedule: {
                  ...appointmentData.schedule,
                  someoneElseWillBringCar: checked,
                },
              });
            }}>
            Someone else will bring the vehicle
          </Checkbox>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button
            variant="bordered"
            onPress={onPrevious}
            startContent={<ArrowLeft className="h-4 w-4" />}>
            Back
          </Button>
          <Button
            color="danger"
            onPress={onNext}
            disabled={!isFormValid}
            endContent={<ArrowRight className="h-4 w-4" />}>
            Continue to Contact Info
          </Button>
        </div>
      </CardBody>
    </>
  );
};

// User Info Step
const UserInfoStep = ({
  appointmentData,
  setAppointmentData,
  onNext,
  onPrevious,
}: any) => {
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  const isFormValid =
    appointmentData.user.firstName &&
    appointmentData.user.lastName &&
    appointmentData.user.email &&
    appointmentData.user.phoneNumber &&
    appointmentData.user.addressLine1 &&
    appointmentData.user.zipCode &&
    appointmentData.user.city &&
    appointmentData.user.state;

  return (
    <>
      <CardHeader className="pb-4 gap-4">
        <div className="flex items-center gap-2">
          <User className="h-6 w-6 text-red-600" />
          <h2 className="text-2xl font-bold">Contact Information</h2>
        </div>
        <p className="text-gray-600">
          We'll use this information to confirm your appointment
        </p>
      </CardHeader>

      <CardBody className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={appointmentData.user.firstName}
              onValueChange={(value) => {
                setAppointmentData({
                  ...appointmentData,
                  user: {
                    ...appointmentData.user,
                    firstName: value,
                  },
                });
              }}
              isRequired
            />
            <Input
              label="Last Name"
              value={appointmentData.user.lastName}
              onValueChange={(value) => {
                setAppointmentData({
                  ...appointmentData,
                  user: {
                    ...appointmentData.user,
                    lastName: value,
                  },
                });
              }}
              isRequired
            />
            <Input
              type="email"
              label="Email"
              value={appointmentData.user.email}
              onValueChange={(value) => {
                setAppointmentData({
                  ...appointmentData,
                  user: {
                    ...appointmentData.user,
                    email: value,
                  },
                });
              }}
              isRequired
            />
            <Input
              type="tel"
              label="Phone Number"
              value={appointmentData.user.phoneNumber}
              onValueChange={(value) => {
                setAppointmentData({
                  ...appointmentData,
                  user: {
                    ...appointmentData.user,
                    phoneNumber: value,
                  },
                });
              }}
              isRequired
            />
          </div>
        </div>

        <Divider />

        {/* Address Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Address Information</h3>
          <div className="space-y-4">
            <Input
              label="Address Line 1"
              value={appointmentData.user.addressLine1}
              onValueChange={(value) => {
                setAppointmentData({
                  ...appointmentData,
                  user: {
                    ...appointmentData.user,
                    addressLine1: value,
                  },
                });
              }}
              isRequired
            />
            <Input
              label="Address Line 2 (Optional)"
              value={appointmentData.user.addressLine2}
              onValueChange={(value) => {
                setAppointmentData({
                  ...appointmentData,
                  user: {
                    ...appointmentData.user,
                    addressLine2: value,
                  },
                });
              }}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="ZIP Code"
                value={appointmentData.user.zipCode}
                onValueChange={(value) => {
                  setAppointmentData({
                    ...appointmentData,
                    user: {
                      ...appointmentData.user,
                      zipCode: value,
                    },
                  });
                }}
                isRequired
              />
              <Input
                label="City"
                value={appointmentData.user.city}
                onValueChange={(value) => {
                  setAppointmentData({
                    ...appointmentData,
                    user: {
                      ...appointmentData.user,
                      city: value,
                    },
                  });
                }}
                isRequired
              />
              <Select
                label="State"
                selectedKeys={
                  appointmentData.user.state ? [appointmentData.user.state] : []
                }
                onSelectionChange={(keys) => {
                  const selectedState = Array.from(keys)[0] as string;
                  setAppointmentData({
                    ...appointmentData,
                    user: {
                      ...appointmentData.user,
                      state: selectedState,
                    },
                  });
                }}
                isRequired>
                {states.map((state) => (
                  <SelectItem key={state}>{state}</SelectItem>
                ))}
              </Select>
            </div>
            <Input
              label="Country"
              value={appointmentData.user.country}
              onValueChange={(value) => {
                setAppointmentData({
                  ...appointmentData,
                  user: {
                    ...appointmentData.user,
                    country: value,
                  },
                });
              }}
              isRequired
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button
            variant="bordered"
            onPress={onPrevious}
            startContent={<ArrowLeft className="h-4 w-4" />}>
            Back
          </Button>
          <Button
            color="danger"
            onPress={onNext}
            disabled={!isFormValid}
            endContent={<ArrowRight className="h-4 w-4" />}>
            Review Appointment
          </Button>
        </div>
      </CardBody>
    </>
  );
};

// Review Step
const ReviewStep = ({
  appointmentData,
  onSubmit,
  onPrevious,
  createAppointmentPending,
}: any) => {
  const selectedMostPopular = Object.entries(
    appointmentData.services.mostPopularServices
  )
    .filter(([_, selected]) => selected)
    .map(([key, _]) => key);

  const selectedOther = Object.entries(appointmentData.services.otherServices)
    .filter(([_, selected]) => selected)
    .map(([key, _]) => key);

  const formatServiceName = (key: string) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <>
      <CardHeader className="pb-4 gap-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-red-600" />
          <h2 className="text-2xl font-bold">Review Your Appointment</h2>
        </div>
        <p className="text-gray-600">
          Please review your appointment details before confirming
        </p>
      </CardHeader>

      <CardBody className="space-y-6">
        {/* Services Review */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Selected Services</h3>
          <Card className="">
            <CardBody className="p-4">
              {selectedMostPopular.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-red-600 mb-2">
                    Most Popular Services:
                  </h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedMostPopular.map((service) => (
                      <li
                        key={service}
                        className="text-sm">
                        {formatServiceName(service)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedOther.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Other Services:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedOther.map((service) => (
                      <li
                        key={service}
                        className="text-sm">
                        {formatServiceName(service)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {appointmentData.services.additionalNotes && (
                <div>
                  <h4 className="font-medium mb-2">Additional Notes:</h4>
                  <p className="text-sm text-gray-600">
                    {appointmentData.services.additionalNotes}
                  </p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Schedule Review */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Appointment Schedule</h3>
          <Card className="">
            <CardBody className="p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Date:</span>
                  <p>
                    {new Date(
                      appointmentData.schedule.date
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Time:</span>
                  <p>{appointmentData.schedule.time}</p>
                </div>
                <div>
                  <span className="font-medium">Service Type:</span>
                  <p>
                    {appointmentData.schedule.planTo === "waitInStore"
                      ? "Wait in Store"
                      : "Drop Off"}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Vehicle Drop-off:</span>
                  <p>
                    {appointmentData.schedule.someoneElseWillBringCar
                      ? "Someone else will bring"
                      : "I will bring"}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Contact Review */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
          <Card className="">
            <CardBody className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Name:</span>
                  <p>
                    {appointmentData.user.firstName}{" "}
                    {appointmentData.user.lastName}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Email:</span>
                  <p>{appointmentData.user.email}</p>
                </div>
                <div>
                  <span className="font-medium">Phone:</span>
                  <p>{appointmentData.user.phoneNumber}</p>
                </div>
                <div>
                  <span className="font-medium">Address:</span>
                  <p>
                    {appointmentData.user.addressLine1}
                    {appointmentData.user.addressLine2 &&
                      `, ${appointmentData.user.addressLine2}`}
                    <br />
                    {appointmentData.user.city}, {appointmentData.user.state}{" "}
                    {appointmentData.user.zipCode}
                    <br />
                    {appointmentData.user.country}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button
            variant="bordered"
            onPress={onPrevious}
            startContent={<ArrowLeft className="h-4 w-4" />}>
            Back
          </Button>
          <Button
            disabled={createAppointmentPending}
            color="danger"
            onPress={onSubmit}
            size="lg"
            endContent={<CheckCircle className="h-4 w-4" />}>
            {createAppointmentPending ? "Submitting..." : "Confirm Appointment"}
          </Button>
        </div>
      </CardBody>
    </>
  );
};

// Success Step
// const SuccessStep = () => {
//   return (
//     <CardBody className="text-center py-12">
//       <div className="flex flex-col items-center space-y-6">
//         <div className="bg-green-100 p-6 rounded-full">
//           <CheckCircle className="h-16 w-16 text-green-600" />
//         </div>

//         <div>
//           <h2 className="text-3xl font-bold text-gray-600 mb-2">
//             Appointment Confirmed!
//           </h2>
//           <p className="text-gray-600 text-lg">
//             Thank you for booking with us. We'll send you a confirmation email
//             shortly.
//           </p>
//         </div>

//         <Card className="bg-blue-50 border-blue-200 max-w-md">
//           <CardBody className="p-4">
//             <h3 className="font-semibold mb-2 text-black">What's Next?</h3>
//             <ul className="text-sm space-y-1 text-left text-black">
//               <li>• You'll receive a confirmation email within 5 minutes</li>
//               <li>• We'll call you 24 hours before your appointment</li>
//               <li>• Bring your vehicle and any relevant documentation</li>
//               <li>• Our team will be ready to serve you!</li>
//             </ul>
//           </CardBody>
//         </Card>

//         <div className="flex gap-4">
//           <Button
//             color="danger"
//             variant="bordered">
//             Print Confirmation
//           </Button>
//           <Button color="danger">Back to Home</Button>
//         </div>
//       </div>
//     </CardBody>
//   );
// };
const SuccessStep = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = async () => {
    if (!printRef.current) return;

    // Capture the div as canvas
    const canvas = await html2canvas(printRef.current, {
      scale: 2, // higher resolution
    });
    const imgData = canvas.toDataURL("image/png");

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("appointment-confirmation.pdf");
  };

  return (
    <CardBody className="text-center py-12">
      <div
        ref={printRef}
        className="flex flex-col items-center space-y-6 pt-8">
        <div className="bg-green-100 p-6 rounded-full">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-600 mb-2">
            Appointment Confirmed!
          </h2>
          <p className="text-gray-600 text-lg">
            Thank you for booking with us. We'll send you a confirmation email
            shortly.
          </p>
        </div>

        <Card className="bg-blue-50 border-blue-200 max-w-md w-full">
          <CardBody className="p-4">
            <h3 className="font-semibold mb-2 text-black">What's Next?</h3>
            <ul className="text-sm space-y-1 text-left text-black">
              <li>• You'll receive a confirmation email within 5 minutes</li>
              <li>• We'll call you 24 hours before your appointment</li>
              <li>• Bring your vehicle and any relevant documentation</li>
              <li>• Our team will be ready to serve you!</li>
            </ul>
          </CardBody>
        </Card>
      </div>

      <div className="flex gap-4 mt-6 justify-center">
        <Button
          color="danger"
          variant="bordered"
          onClick={handlePrint}>
          Print Confirmation
        </Button>
        <Button
          color="danger"
          onClick={() => {
            window.location.href = "/";
          }}>
          Back to Home
        </Button>
      </div>
    </CardBody>
  );
};

export default AppointmentBookingPage;
