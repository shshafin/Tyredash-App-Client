"use client";

import { Eye } from "lucide-react";
import { DeleteIcon, EditIcon } from "@/src/icons";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import React, { useEffect, useMemo, useState } from "react";
import {
  useGetAppointments,
  useUpdateAppointment,
  useDeleteAppointment,
} from "@/src/hooks/appointment.hook";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AppointmentTable() {
  const router = useRouter();
  const appointments = useGetAppointments(undefined);

  const updateMutation = useUpdateAppointment({
    onSuccess: () => {
      toast.success("Appointment updated successfully!");
      appointments.refetch();
    },
  });

  const deleteMutation = useDeleteAppointment({
    onSuccess: () => {
      toast.success("Appointment deleted successfully!");
      appointments.refetch();
    },
  });

  const list = appointments?.data?.data || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [status, setStatus] = useState("pending");
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // ✅ Filtering
  const filtered = useMemo(() => {
    if (!searchTerm) return list || [];
    const q = searchTerm.toLowerCase();
    return (list || []).filter((item: any) => {
      return (
        (item.status || "").toLowerCase().includes(q) ||
        (item.user?.firstName || "").toLowerCase().includes(q) ||
        (item.user?.lastName || "").toLowerCase().includes(q)
      );
    });
  }, [list, searchTerm]);

  // ✅ Pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const pages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filtered.slice(start, end);
  }, [filtered, page, rowsPerPage]);

  useEffect(() => {
    if (page > pages && pages > 0) {
      setPage(1);
    }
  }, [page, pages]);

  useEffect(() => {
    setPage(1);
  }, [rowsPerPage]);

  // ✅ Handlers
  const handleOpenEdit = (request: any) => {
    setSelectedRequest(request);
    setStatus(request.status || "pending");
    setDeleteConfirm(false);
    onOpen();
  };

  const handleUpdate = async () => {
    if (!selectedRequest) return;

    await updateMutation.mutateAsync({
      id: selectedRequest._id,
      data: { status },
    });

    appointments.refetch();
    onClose();
  };

  const handleDelete = async () => {
    if (!selectedRequest) return;
    await deleteMutation.mutateAsync(selectedRequest._id);
    onClose();
  };

  const renderCell = (item: any, columnKey: string) => {
    switch (columnKey) {
      case "name":
        return (
          <span className="text-sm">
            {item.user?.firstName} {item.user?.lastName}
          </span>
        );

      case "contact":
        return (
          <span className="text-sm font-medium">
            {item.user?.phoneNumber || item.user?.email || "-"}
          </span>
        );

      case "date":
        return <span className="text-sm">{item.schedule?.date || "-"}</span>;

      case "time":
        return <span className="text-sm">{item.schedule?.time || "-"}</span>;

      case "status":
        const getStatusStyle = (status: string) => {
          switch (status) {
            case "pending":
              return "bg-yellow-100 text-yellow-700";
            case "confirmed":
              return "bg-blue-100 text-blue-700";
            case "completed":
              return "bg-green-100 text-green-700";
            case "cancelled":
              return "bg-red-100 text-red-700";
            default:
              return "bg-gray-100 text-gray-700";
          }
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle(
              item.status
            )}`}>
            {item.status}
          </span>
        );

      case "actions":
        return (
          <div className="flex items-center justify-center gap-2">
            <Tooltip content="View">
              <span
                onClick={() => {
                  router.push(`/admin/appointment/${item._id}`);
                }}
                className="text-lg text-blue-500 cursor-pointer active:opacity-60">
                <Eye className="h-4 w-4" />
              </span>
            </Tooltip>
            <Tooltip content="Edit">
              <span
                onClick={() => handleOpenEdit(item)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip
              content="Delete"
              className="bg-rose-600">
              <span
                onClick={() => {
                  setSelectedRequest(item);
                  setDeleteConfirm(true);
                  onOpen();
                }}
                className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return item[columnKey];
    }
  };

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "CONTACT", uid: "contact" },
    { name: "DATE", uid: "date" },
    { name: "TIME", uid: "time" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  return (
    <div className="w-full space-y-4">
      {/* page row */}
      <div className="flex items-center justify-end gap-3">
        <label
          htmlFor="rows"
          className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Rows per page:
        </label>
        <select
          id="rows"
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="h-9 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
          {[5, 10, 20, 50].map((n) => (
            <option
              key={n}
              value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        {appointments.isLoading ? (
          <div className="p-6 text-center">Loading Appointments...</div>
        ) : list.length === 0 ? (
          <div className="p-6 text-center">No Appointments Available</div>
        ) : (
          <Table aria-label="Appointments Table">
            <TableHeader columns={columns}>
              {(column: any) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={items}>
              {(item: any) => (
                <TableRow key={item._id}>
                  {(columnKey: any) => (
                    <TableCell>
                      {renderCell(item, columnKey) as React.ReactNode}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Edit/Delete Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        <ModalContent>
          {(close) => (
            <>
              {!deleteConfirm ? (
                <>
                  <ModalHeader>Edit Appointment Status</ModalHeader>
                  <ModalBody>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full border rounded-lg p-2">
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="bordered"
                      onPress={() => close()}>
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      isLoading={updateMutation.isPending}
                      onPress={handleUpdate}>
                      Update
                    </Button>
                  </ModalFooter>
                </>
              ) : (
                <>
                  <ModalHeader>Delete Appointment</ModalHeader>
                  <ModalBody>
                    <p>Are you sure you want to delete this appointment?</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="bordered"
                      onPress={() => close()}>
                      Cancel
                    </Button>
                    <Button
                      color="danger"
                      isLoading={deleteMutation.isPending}
                      onPress={handleDelete}>
                      Delete
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
      {/* Pagination controls */}
      {pages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className={`py-2 px-2 border rounded-lg text-sm font-medium shadow-sm ${
                page === 1
                  ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
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

              // Ensure pageNumber is within valid range
              pageNumber = Math.max(1, Math.min(pages, pageNumber));

              return (
                <button
                  key={i}
                  onClick={() => setPage(pageNumber)}
                  className={`h-8 w-8 flex items-center justify-center rounded-lg text-sm font-medium shadow-sm ${
                    page === pageNumber
                      ? "bg-gradient-to-r from-purple-600 to-purple-400 text-white"
                      : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}>
                  {pageNumber}
                </button>
              );
            })}

            {pages > 5 && page < pages - 2 && (
              <span className="mx-1 text-gray-500 dark:text-gray-400">...</span>
            )}

            <button
              onClick={() => setPage(Math.min(pages, page + 1))}
              disabled={page === pages}
              className={`py-2 px-2 border rounded-lg text-sm font-medium shadow-sm ${
                page === pages
                  ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="ml-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {Math.min((page - 1) * rowsPerPage + 1, filtered.length)} to{" "}
            {Math.min(page * rowsPerPage, filtered.length)} of {filtered.length}{" "}
            entries
          </div>
        </div>
      )}
    </div>
  );
}
