"use client";

import { useAssignFleetRef, useGetAllSupportRequests } from "@/src/hooks/fleetSupport.hook";
import { EditIcon } from "@/src/icons";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FleetSupportTable() {
  const queryClient = useQueryClient();
  const supportQuery = useGetAllSupportRequests();
  const list = supportQuery?.data?.data || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

  const methods = useForm<{ phone: string; email: string; note: string }>({
    defaultValues: { phone: "", email: "", note: "" },
  });
  const { control, handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<{ phone: string; email: string; note: string }> = (values) => {
    if (!selectedRequest) return;
    const payload = { fleetRef: { phone: values.phone, email: values.email, note: values.note } };
    assignFleetRef({ id: selectedRequest._id, payload } as any);
  };

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { mutate: assignFleetRef, isPending: assignLoading } = useAssignFleetRef({
    onSuccess: () => {
      toast.success("Fleet reference assigned");
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_SUPPORT_REQUESTS"] });
      onClose();
      setSelectedRequest(null);
    },
  } as any);

  const filtered = useMemo(() => {
    if (!searchTerm) return list || [];
    return (list || []).filter((item: any) => {
      const fv = item.fleetVehicle || {};
      return (
        item.serviceType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fv.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fv.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fv.licensePlate?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [list, searchTerm]);

  // Pagination state (client-side)
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const pages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filtered.slice(start, end);
  }, [filtered, page]);

  // If filtered changes and current page is out of range, reset to 1
  useEffect(() => {
    if (page > pages) setPage(1);
  }, [filtered, pages]);

  // Reset to first page when rows per page changes
  useEffect(() => {
    setPage(1);
  }, [rowsPerPage]);

  const handleOpenEdit = (request: any) => {
    setSelectedRequest(request);
    // initialize form with existing fleetRef
    reset({
      phone: request.fleetRef?.phone || "",
      email: request.fleetRef?.email || "",
      note: request.fleetRef?.note || "",
    });
    onOpen();
  };

  const renderCell = (item: any, columnKey: string) => {
    switch (columnKey) {
      case "vehicle":
        return (
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {item.fleetVehicle?.make} {item.fleetVehicle?.model}
            </span>
            <span className="text-xs text-default-400">{item.fleetVehicle?.licensePlate}</span>
          </div>
        );
      case "serviceType":
        return <span className="text-sm">{item.serviceType}</span>;
      case "dateTime":
        return (
          <div className="flex flex-col">
            <span className="text-sm">{item.date}</span>
            <span className="text-xs text-default-400">{item.time}</span>
          </div>
        );
      case "address":
        return <span className="text-sm">{item.address}</span>;
      case "status":
        return <span className="text-sm">{item.fleetRef ? "Assigned" : "Not Assigned"}</span>;
      case "actions":
        return (
          <div className="flex items-center justify-center gap-2">
            <Tooltip content="Edit">
              <span
                onClick={() => handleOpenEdit(item)}
                className="text-lg text-blue-500 cursor-pointer active:opacity-60"
              >
                <EditIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return item[columnKey];
    }
  };

  const columns = [
    { name: "VEHICLE", uid: "vehicle" },
    { name: "SERVICE", uid: "serviceType" },
    { name: "DATE / TIME", uid: "dateTime" },
    { name: "ADDRESS", uid: "address" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-3">
        <Input
          placeholder="Search support requests..."
          size="sm"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
        <div className="ml-auto flex items-center gap-2">
          <label className="text-sm text-default-500">Rows:</label>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="h-8 px-2 rounded border bg-white dark:bg-gray-800"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg">
        {supportQuery.isLoading ? (
          <div className="p-6 text-center">Loading support requests...</div>
        ) : list.length === 0 ? (
          <div className="p-6 text-center">No support requests available</div>
        ) : (
          <>
            <Table aria-label="Fleet Support Table" className="border rounded-md">
              <TableHeader columns={columns}>
                {(column: any) => (
                  <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={items}>
                {(item: any) => (
                  <TableRow key={item._id}>
                    {(columnKey: any) => <TableCell>{renderCell(item, columnKey) as React.ReactNode}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination controls */}
            {
              <div className="flex justify-center items-center mt-4 gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className={`py-2 px-2 border rounded-lg text-sm font-medium shadow-sm ${
                      page === 1
                        ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {Array.from({ length: Math.min(pages, 5) }, (_, i) => {
                    let pageNumber;
                    if (pages <= 5) {
                      pageNumber = i + 1;
                    } else if (page <= 3) {
                      pageNumber = i + 1;
                    } else if (page >= pages - 2) {
                      pageNumber = pages - 4 + i;
                    } else {
                      pageNumber = page - 2 + i;
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setPage(pageNumber)}
                        className={`h-8 w-8 flex items-center justify-center rounded-lg text-sm font-medium shadow-sm ${
                          page === pageNumber
                            ? "bg-gradient-to-r from-purple-600 to-purple-400 text-white"
                            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  {pages > 5 && page < pages - 2 && <span className="mx-1 text-gray-500 dark:text-gray-400">...</span>}

                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === pages}
                    className={`py-2 px-2 border rounded-lg text-sm font-medium shadow-sm ${
                      page === pages
                        ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                  Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filtered.length)} of{" "}
                  {filtered.length} entries
                </div>
              </div>
            }
          </>
        )}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Support Request</ModalHeader>
              <ModalBody>
                {selectedRequest ? (
                  <form className="space-y-3" onSubmit={handleSubmit(onSubmit as any)}>
                    <div>
                      <label className="text-xs text-default-500">Vehicle</label>
                      <div className="text-sm font-medium">
                        {selectedRequest.fleetVehicle?.make} {selectedRequest.fleetVehicle?.model}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-default-500">Phone (+14123456789)</label>
                      <Controller
                        control={control}
                        name="phone"
                        rules={{ required: "Phone is required" }}
                        render={({ field, fieldState }) => (
                          <Input
                            size="sm"
                            {...field}
                            onChange={(e: any) => field.onChange(e.target.value)}
                            isInvalid={!!fieldState.error}
                            errorMessage={fieldState.error?.message}
                          />
                        )}
                      />
                    </div>

                    <div>
                      <label className="text-xs text-default-500">Email</label>
                      <Controller
                        control={control}
                        name="email"
                        rules={{
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email",
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <Input
                            size="sm"
                            {...field}
                            onChange={(e: any) => field.onChange(e.target.value)}
                            isInvalid={!!fieldState.error}
                            errorMessage={fieldState.error?.message}
                          />
                        )}
                      />
                    </div>

                    <div>
                      <label className="text-xs text-default-500">Note</label>
                      <Controller
                        control={control}
                        name="note"
                        // rules={{ required: "Note is required" }}
                        render={({ field, fieldState }) => (
                          <Textarea
                            size="sm"
                            {...field}
                            onChange={(e: any) => field.onChange(e.target.value)}
                            isInvalid={!!fieldState.error}
                            // errorMessage={fieldState.error?.message}
                          />
                        )}
                      />
                    </div>
                  </form>
                ) : (
                  <div>No request selected</div>
                )}
              </ModalBody>
              <ModalFooter className="flex justify-end gap-2">
                <Button variant="bordered" className="rounded" onPress={() => close()}>
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    void handleSubmit(onSubmit)();
                  }}
                  disabled={assignLoading}
                  className="rounded"
                >
                  {assignLoading ? "Updating..." : "Save"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
