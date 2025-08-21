"use client";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Input } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import React, { useCallback, useMemo, useState } from "react";
// Note: Pagination might not be available in your HeroUI version, using simple pagination instead
import {
  useDeleteFleetAppointment,
  useGetAllFleetAppointments,
  useUpdateAppointmentStatus,
  useUpdateFleetRef,
} from "@/src/hooks/fleetAppointments.hook";
import { DeleteIcon, EditIcon, EyeIcon } from "@/src/icons";
import { type FleetRefFormData } from "@/src/schemas/fleetRef.schema";

// Types for better type safety
interface FleetVehicle {
  _id: string;
  year: string;
  make: string;
  model: string;
  vin: string;
  licensePlate: string;
  tireSize: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface FleetRef {
  phone: string;
  email: string;
  note: string;
}

interface FleetAppointment {
  _id: string;
  fleetVehicle: FleetVehicle;
  fleetRef?: FleetRef;
  serviceType: string;
  date: string;
  time: string;
  address: string;
  notes: string;
  files: string[];
  status: "Pending" | "Confirmed" | "In Progress" | "Completed" | "Cancelled";
  createdAt: string;
  updatedAt: string;
  id: string;
}

const statusColorMap = {
  Pending: "warning",
  Confirmed: "primary",
  "In Progress": "secondary",
  Completed: "success",
  Cancelled: "danger",
} as const;

const columns = [
  { name: "VEHICLE", uid: "vehicle" },
  { name: "SERVICE TYPE", uid: "serviceType" },
  { name: "DATE & TIME", uid: "datetime" },
  { name: "STATUS", uid: "status" },
  { name: "CONTACT", uid: "contact" },
  { name: "ACTIONS", uid: "actions" },
];

export default function FleetAppointmentsTable() {
  const { data: appointments, isLoading, error, refetch } = useGetAllFleetAppointments();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modal states
  const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isFleetRefOpen, onOpen: onFleetRefOpen, onClose: onFleetRefClose } = useDisclosure();

  const [selectedAppointment, setSelectedAppointment] = useState<FleetAppointment | null>(null);
  const [appointmentToDelete, setAppointmentToDelete] = useState<string | null>(null);

  // Fleet reference form state
  const [fleetRefForm, setFleetRefForm] = useState<FleetRefFormData>({
    phone: "",
    email: "",
    note: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Mutations
  const deleteAppointmentMutation = useDeleteFleetAppointment({
    onSuccess: () => {
      refetch();
      onDeleteClose();
      setAppointmentToDelete(null);
    },
    id: appointmentToDelete,
  });

  const updateStatusMutation = useUpdateAppointmentStatus({
    onSuccess: () => {
      refetch();
    },
  });

  const updateFleetRefMutation = useUpdateFleetRef({
    onSuccess: () => {
      refetch();
      onFleetRefClose();
      setFleetRefForm({ phone: "", email: "", note: "" });
    },
    id: selectedAppointment?._id,
  });

  // Helper functions
  const handleEditFleetRef = useCallback(
    (appointment: FleetAppointment) => {
      setSelectedAppointment(appointment);
      setFleetRefForm({
        phone: appointment.fleetRef?.phone || "",
        email: appointment.fleetRef?.email || "",
        note: appointment.fleetRef?.note || "",
      });
      onFleetRefOpen();
    },
    [onFleetRefOpen]
  );

  const handleFleetRefSubmit = useCallback(() => {
    if (selectedAppointment) {
      updateFleetRefMutation.mutate({
        fleetRef: fleetRefForm,
      });
    }
  }, [selectedAppointment, fleetRefForm, updateFleetRefMutation]);

  // Filter and pagination logic
  const filteredAppointments = useMemo(() => {
    if (!appointments?.data) return [];

    let filtered = appointments.data;

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (appointment: FleetAppointment) =>
          appointment.fleetVehicle.make.toLowerCase().includes(search.toLowerCase()) ||
          appointment.fleetVehicle.model.toLowerCase().includes(search.toLowerCase()) ||
          appointment.fleetVehicle.licensePlate.toLowerCase().includes(search.toLowerCase()) ||
          appointment.serviceType.toLowerCase().includes(search.toLowerCase()) ||
          appointment.address.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((appointment: FleetAppointment) => appointment.status === statusFilter);
    }

    return filtered;
  }, [appointments?.data, search, statusFilter]);

  const rowsPerPage = 10;
  const pages = Math.ceil(filteredAppointments.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredAppointments.slice(start, end);
  }, [page, filteredAppointments]);

  // Event handlers
  const handleViewDetails = useCallback(
    (appointment: FleetAppointment) => {
      setSelectedAppointment(appointment);
      onDetailsOpen();
    },
    [onDetailsOpen]
  );

  const handleDeleteClick = useCallback(
    (appointmentId: string) => {
      setAppointmentToDelete(appointmentId);
      onDeleteOpen();
    },
    [onDeleteOpen]
  );

  const handleStatusChange = useCallback(
    (appointmentId: string, newStatus: string) => {
      updateStatusMutation.mutate({
        id: appointmentId,
        status: newStatus,
      });
    },
    [updateStatusMutation]
  );

  const handleDeleteConfirm = useCallback(() => {
    if (appointmentToDelete) {
      deleteAppointmentMutation.mutate();
    }
  }, [appointmentToDelete, deleteAppointmentMutation]);

  const renderCell = useCallback(
    (appointment: FleetAppointment, columnKey: React.Key) => {
      switch (columnKey) {
        case "vehicle":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {appointment.fleetVehicle.year} {appointment.fleetVehicle.make} {appointment.fleetVehicle.model}
              </p>
              <p className="text-bold text-sm capitalize text-default-400">{appointment.fleetVehicle.licensePlate}</p>
            </div>
          );
        case "serviceType":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{appointment.serviceType}</p>
            </div>
          );
        case "datetime":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">{new Date(appointment.date).toLocaleDateString()}</p>
              <p className="text-bold text-sm text-default-400">{appointment.time}</p>
            </div>
          );
        case "status":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Chip
                  className="capitalize cursor-pointer"
                  color={statusColorMap[appointment.status]}
                  size="sm"
                  variant="flat"
                >
                  <div className="flex gap-2">
                    <p>{appointment.status}</p> <EditIcon />
                  </div>
                </Chip>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Status actions"
                onAction={(key: React.Key) => {
                  handleStatusChange(appointment._id, key as string);
                }}
              >
                <DropdownItem key="Pending">Pending</DropdownItem>
                <DropdownItem key="Confirmed">Confirmed</DropdownItem>
                <DropdownItem key="In Progress">In Progress</DropdownItem>
                <DropdownItem key="Completed">Completed</DropdownItem>
                <DropdownItem key="Cancelled">Cancelled</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
        case "contact":
          return (
            <div className="flex flex-col">
              {appointment.fleetRef ? (
                <>
                  <p className="text-bold text-sm">{appointment.fleetRef.email}</p>
                  <p className="text-bold text-sm text-default-400">{appointment.fleetRef.phone}</p>
                </>
              ) : (
                <p className="text-sm text-default-400">No contact info</p>
              )}
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="View details">
                <Button isIconOnly size="sm" variant="light" onPress={() => handleViewDetails(appointment)}>
                  <EyeIcon />
                </Button>
              </Tooltip>
              <Tooltip content="Assign a Fleet Ref">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="primary"
                  onPress={() => handleEditFleetRef(appointment)}
                >
                  <EditIcon />
                </Button>
              </Tooltip>
              <Tooltip color="danger" content="Delete appointment">
                <Button
                  isIconOnly
                  size="sm"
                  color="danger"
                  variant="light"
                  onPress={() => handleDeleteClick(appointment._id)}
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return null;
      }
    },
    [handleViewDetails, handleDeleteClick, handleStatusChange, handleEditFleetRef]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardBody>
          <p className="text-center text-danger">Error loading appointments: {error.message}</p>
          <Button className="mt-4 mx-auto" color="primary" onPress={() => refetch()}>
            Retry
          </Button>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Header and Filters */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Fleet Appointments</h1>
          <p className="text-default-500">Manage and track all fleet vehicle appointments</p>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex gap-4 items-end">
        <Input
          className="w-full sm:max-w-[44%]"
          placeholder="Search appointments..."
          value={search}
          onValueChange={setSearch}
        />
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" className="capitalize">
              {statusFilter === "all" ? "All Status" : statusFilter}
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Status filter" onAction={(key: React.Key) => setStatusFilter(key as string)}>
            <DropdownItem key="all">All Status</DropdownItem>
            <DropdownItem key="Pending">Pending</DropdownItem>
            <DropdownItem key="Confirmed">Confirmed</DropdownItem>
            <DropdownItem key="Completed">Completed</DropdownItem>
            <DropdownItem key="Cancelled">Cancelled</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Table */}
      <Table
        aria-label="Fleet appointments table"
        bottomContent={
          pages > 1 ? (
            <div className="flex w-full justify-center gap-2">
              <Button size="sm" variant="flat" onPress={() => setPage(page - 1)} disabled={page === 1}>
                Previous
              </Button>
              <span className="flex items-center px-4">
                Page {page} of {pages}
              </span>
              <Button size="sm" variant="flat" onPress={() => setPage(page + 1)} disabled={page === pages}>
                Next
              </Button>
            </div>
          ) : null
        }
      >
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items} emptyContent="No appointments found">
          {(item: FleetAppointment) => (
            <TableRow key={item._id}>
              {(columnKey: React.Key) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Details Modal */}
      <Modal isOpen={isDetailsOpen} onClose={onDetailsClose} size="2xl" scrollBehavior="inside">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Appointment Details</ModalHeader>
          <ModalBody>
            {selectedAppointment && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <h4 className="text-large font-semibold">Vehicle Information</h4>
                  </CardHeader>
                  <Divider />
                  <CardBody className="space-y-2">
                    <p>
                      <strong>Vehicle:</strong> {selectedAppointment.fleetVehicle.year}{" "}
                      {selectedAppointment.fleetVehicle.make} {selectedAppointment.fleetVehicle.model}
                    </p>
                    <p>
                      <strong>VIN:</strong> {selectedAppointment.fleetVehicle.vin}
                    </p>
                    <p>
                      <strong>License Plate:</strong> {selectedAppointment.fleetVehicle.licensePlate}
                    </p>
                    <p>
                      <strong>Tire Size:</strong> {selectedAppointment.fleetVehicle.tireSize}
                    </p>
                    {selectedAppointment.fleetVehicle.note && (
                      <p>
                        <strong>Vehicle Note:</strong> {selectedAppointment.fleetVehicle.note}
                      </p>
                    )}
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <h4 className="text-large font-semibold">Appointment Details</h4>
                  </CardHeader>
                  <Divider />
                  <CardBody className="space-y-2">
                    <p>
                      <strong>Service Type:</strong> {selectedAppointment.serviceType}
                    </p>
                    <p>
                      <strong>Date:</strong> {new Date(selectedAppointment.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Time:</strong> {selectedAppointment.time}
                    </p>
                    <p>
                      <strong>Address:</strong> {selectedAppointment.address}
                    </p>
                    <p>
                      <strong>Status:</strong>
                      <Chip
                        className="ml-2 capitalize"
                        color={statusColorMap[selectedAppointment.status]}
                        size="sm"
                        variant="flat"
                      >
                        {selectedAppointment.status}
                      </Chip>
                    </p>
                    {selectedAppointment.notes && (
                      <p>
                        <strong>Notes:</strong> {selectedAppointment.notes}
                      </p>
                    )}
                    {selectedAppointment.files.length > 0 && (
                      <div>
                        <strong>Files:</strong>
                        <ul className="list-disc list-inside mt-1">
                          {selectedAppointment.files.map((file, index) => (
                            <li key={index} className="text-sm text-default-600">
                              {file}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardBody>
                </Card>

                {selectedAppointment.fleetRef && (
                  <Card>
                    <CardHeader>
                      <h4 className="text-large font-semibold">Contact Information</h4>
                    </CardHeader>
                    <Divider />
                    <CardBody className="space-y-2">
                      <p>
                        <strong>Email:</strong> {selectedAppointment.fleetRef.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {selectedAppointment.fleetRef.phone}
                      </p>
                      {selectedAppointment.fleetRef.note && (
                        <p>
                          <strong>Contact Note:</strong> {selectedAppointment.fleetRef.note}
                        </p>
                      )}
                    </CardBody>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <h4 className="text-large font-semibold">Timestamps</h4>
                  </CardHeader>
                  <Divider />
                  <CardBody className="space-y-2">
                    <p>
                      <strong>Created:</strong> {new Date(selectedAppointment.createdAt).toLocaleString()}
                    </p>
                    <p>
                      <strong>Last Updated:</strong> {new Date(selectedAppointment.updatedAt).toLocaleString()}
                    </p>
                  </CardBody>
                </Card>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onDetailsClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Fleet Reference Edit Modal */}
      <Modal isOpen={isFleetRefOpen} onClose={onFleetRefClose} size="lg">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Assign a Fleet Ref</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Phone"
                placeholder="Enter phone number"
                value={fleetRefForm.phone}
                onValueChange={(value) => setFleetRefForm((prev) => ({ ...prev, phone: value }))}
              />
              <Input
                label="Email"
                type="email"
                placeholder="Enter email address"
                value={fleetRefForm.email}
                onValueChange={(value) => setFleetRefForm((prev) => ({ ...prev, email: value }))}
                isInvalid={fleetRefForm.email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fleetRefForm.email ?? "")}
                errorMessage={
                  fleetRefForm.email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fleetRefForm.email ?? "")
                    ? "Please enter a valid email address"
                    : ""
                }
              />
              <Input
                label="Note"
                placeholder="Enter additional notes (max 200 characters)"
                value={fleetRefForm.note}
                onValueChange={(value) => setFleetRefForm((prev) => ({ ...prev, note: value }))}
                maxLength={200}
                description={`${(fleetRefForm.note ?? "").length}/200 characters`}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onFleetRefClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleFleetRefSubmit}
              isLoading={updateFleetRefMutation.isPending}
              isDisabled={
                (fleetRefForm.email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fleetRefForm.email ?? "")) ||
                (fleetRefForm.note ?? "").length > 200
              }
            >
              Update Contact
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Confirm Delete</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this appointment? This action cannot be undone.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onDeleteClose}>
              Cancel
            </Button>
            <Button color="danger" onPress={handleDeleteConfirm} isLoading={deleteAppointmentMutation.isPending}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
